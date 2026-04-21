import { skipToken } from "@reduxjs/toolkit/query"
import { useEffect, useMemo, useState } from "react"
import { Archive, Download, Eye } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  useGetArchivedCircularsQuery,
  useGetCircularsQuery,
} from "@/features/circulars/circularApi"
import {
  useGetArchivedNoticesQuery,
  useGetNoticesQuery,
} from "@/features/notices/noticeApi"
import {
  useGetArchivedOrdersQuery,
  useGetOrdersQuery,
} from "@/features/orders/ordersApi"
import type { OrderItem } from "@/features/orders/orderTypes"
import { useDownload } from "@/hooks/useDownload"
import { usePagination } from "@/hooks/usePagination"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

export type DocumentListItem = Pick<
  OrderItem,
  "id" | "title" | "subtitle" | "document_url" | "doc_date" | "formatted_date"
>

interface DocumentListProps {
  tab: string
  type: "orders" | "circulars" | "notices"
}

const ITEMS_PER_PAGE = 10
const PER_PAGE_OPTIONS = ["10", "20", "50", "100"] as const
const ORDER_ARCHIVE_START_YEAR = 2019
const ORDER_ARCHIVE_END_YEAR = 2026
const ORDER_ARCHIVE_YEAR_OPTIONS = [
  { label: "All", value: "all" },
  ...Array.from(
    { length: ORDER_ARCHIVE_END_YEAR - ORDER_ARCHIVE_START_YEAR + 1 },
    (_, index) => {
      const year = ORDER_ARCHIVE_END_YEAR - index

      return {
        label: String(year),
        value: String(year),
      }
    }
  ),
]

const normalizeItems = (
  items:
    | Array<{
        id: number
        title: string
        subtitle?: string | null
        document_url: string
        doc_date: string
        formatted_date: string
      }>
    | undefined
): DocumentListItem[] =>
  (items ?? []).map((item) => ({
    ...item,
    subtitle: item.subtitle ?? "",
  }))

function DocumentListShimmer({
  tab,
  isSearching,
}: {
  tab: string
  isSearching: boolean
}) {
  return (
    <div className="space-y-4 py-2" aria-busy="true" aria-live="polite">
      {isSearching && (
        <p className="text-sm font-medium text-slate-500">
          Searching {tab.toLowerCase()}...
        </p>
      )}

      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 rounded-xl border border-slate-100 px-0 py-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="h-8 w-20 animate-pulse rounded-md bg-slate-200" />
            <div className="h-8 w-24 animate-pulse rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TabsData({ tab, type }: DocumentListProps) {
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showArchive, setShowArchive] = useState(false)
  const [selectedYear, setSelectedYear] = useState("all")
  const [itemsPerPage, setItemsPerPage] = useState(String(ITEMS_PER_PAGE))
  const [downloadFile] = useDownload()
  const lang = useLang()
  const { t } = useTranslation()
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [searchInput])

  const showOrdersYearFilter = type === "orders" && showArchive

  const queryParams = useMemo(
    () => ({
      lang,
      page: currentPage,
      per_page: Number(itemsPerPage),
      ...(searchQuery ? { search: searchQuery } : {}),
      ...(showOrdersYearFilter && selectedYear !== "all"
        ? { year: selectedYear }
        : {}),
    }),
    [currentPage, itemsPerPage, searchQuery, selectedYear, showOrdersYearFilter]
  )

  const latestOrdersQuery = useGetOrdersQuery(
    type === "orders" && !showArchive ? queryParams : skipToken
  )
  const archivedOrdersQuery = useGetArchivedOrdersQuery(
    type === "orders" && showArchive ? queryParams : skipToken
  )

  const latestCircularsQuery = useGetCircularsQuery(
    type === "circulars" && !showArchive ? queryParams : skipToken
  )
  const archivedCircularsQuery = useGetArchivedCircularsQuery(
    type === "circulars" && showArchive ? queryParams : skipToken
  )

  const latestNoticesQuery = useGetNoticesQuery(
    type === "notices" && !showArchive ? queryParams : skipToken
  )
  const archivedNoticesQuery = useGetArchivedNoticesQuery(
    type === "notices" && showArchive ? queryParams : skipToken
  )

  const activeQuery = useMemo(() => {
    if (type === "orders") {
      return showArchive ? archivedOrdersQuery : latestOrdersQuery
    }

    if (type === "circulars") {
      return showArchive ? archivedCircularsQuery : latestCircularsQuery
    }

    return showArchive ? archivedNoticesQuery : latestNoticesQuery
  }, [
    archivedCircularsQuery,
    archivedNoticesQuery,
    archivedOrdersQuery,
    latestCircularsQuery,
    latestNoticesQuery,
    latestOrdersQuery,
    showArchive,
    type,
  ])

  const { items, lastPage, hasNextPage } = useMemo(() => {
    const pagination = activeQuery.data?.pagination ?? null

    const items = normalizeItems(activeQuery.data?.data)
    // const requestedPage = currentPage
    // const apiCurrentPage = pagination?.current_page ?? requestedPage
    const lastPage = pagination?.last_page ?? 1
    const perPage = pagination?.per_page ?? 0
    const total = pagination?.total ?? 0

    const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 0

    const hasNextPage = !!pagination?.next_page_url
    const hasPrevPage = !!pagination?.prev_page_url

    const nextPage = hasNextPage ? currentPage + 1 : null
    const prevPage = hasPrevPage ? currentPage - 1 : null

    return {
      items,
      pagination,
      currentPage,
      lastPage,
      perPage,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    }
  }, [activeQuery.data])
  // const paginations = useMemo(() => {
  //   return normalizeItems(activeQuery.data?.paginations)
  // }, [activeQuery.data?.data])

  const normalizedSearchInput = searchInput.trim()
  const hasSearchValue =
    normalizedSearchInput.length > 0 || searchQuery.length > 0
  const isSearchPending = normalizedSearchInput !== searchQuery
  const isSearchLoading =
    hasSearchValue && (isSearchPending || activeQuery.isFetching)
  const isBusy =
    activeQuery.isLoading || activeQuery.isFetching || isSearchPending
  // const hasNextPage = items.length === Number(itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, itemsPerPage, selectedYear])

  useEffect(() => {
    if (type !== "orders" || !showArchive) {
      setSelectedYear("all")
    }
  }, [showArchive, type])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  // const pages = useMemo(() => {
  //   const maxVisible = 5

  //   let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  //   let end = start + maxVisible - 1

  //   // Adjust if exceeding lastPage
  //   if (end > lastPage) {
  //     end = lastPage
  //     start = Math.max(1, end - maxVisible + 1)
  //   }

  //   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  // }, [currentPage, lastPage])

  const pages = usePagination({
    currentPage,
    totalPages: lastPage,
    siblingCount: 1,
  })

  return (
    <div className="space-y-6 pt-0">
      <div className="mb-0 flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setShowArchive((current) => !current)
            setCurrentPage(1)
          }}
          className="h-10 w-fit gap-2 rounded-md bg-[#1d4d79] px-4 text-sm text-white hover:bg-[#173b5c]"
        >
          <Archive className="h-3.5 w-3.5" />
          {showArchive ? t("headings.viewLatest") : t("headings.viewArchive")}
        </Button>

        <div className="flex w-full flex-col justify-end gap-3 sm:w-auto sm:flex-row">
          {showOrdersYearFilter && (
            <Select
              value={selectedYear}
              onValueChange={(value) => {
                setSelectedYear(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger
                size="default"
                aria-label="Filter archived orders by year"
                className="w-full bg-white data-[size=default]:h-10 sm:w-[140px]"
              >
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ORDER_ARCHIVE_YEAR_OPTIONS.map((yearOption) => (
                    <SelectItem key={yearOption.value} value={yearOption.value}>
                      {yearOption.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger
              size="default"
              aria-label="Set items per page"
              className="w-full bg-white data-[size=default]:h-10 sm:w-[120px]"
            >
              Show:
              <SelectValue
                defaultValue={"show" + itemsPerPage}
                placeholder="Per page"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PER_PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option} className="">
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex h-10 w-full justify-end sm:w-[260px]">
            <Input
              placeholder={`Search ${tab.toLowerCase()}`}
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value)
                setCurrentPage(1)
              }}
              className="h-10 w-full rounded-md border-slate-300 bg-white px-5 text-lg shadow-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-950/15"
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {activeQuery.isLoading || isSearchLoading ? (
          <DocumentListShimmer tab={tab} isSearching={isSearchLoading} />
        ) : activeQuery.isError ? (
          <p className="py-10 text-center text-sm text-red-500">
            Failed to load {showArchive ? "archived " : ""}
            {tab.toLowerCase()}.
          </p>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No {showArchive ? "archived " : ""}
            {tab.toLowerCase()} found.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm leading-snug font-semibold text-blue-950">
                  {item.title}
                </p>

                {item.subtitle && (
                  <p className="text-sm text-slate-600">{item.subtitle}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  {item.formatted_date || item.doc_date}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-8 bg-[#1d4d79] px-3 text-xs text-slate-600 text-white hover:bg-[#1d4d79] hover:text-[#fff]"
                >
                  <a
                    href={item.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:bg-blue-900"
                  >
                    <Eye className="h-3.5 w-3.5 text-white" />
                    {t("headings.view")}
                  </a>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="h-8 bg-[#1d4d79] px-3 text-xs text-white hover:bg-[#1d4d79]"
                >
                  <button
                    onClick={() => downloadFile(item.document_url)}
                    className="flex cursor-pointer items-center"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    {t("headings.download")}
                  </button>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {(currentPage > 1 || hasNextPage) && !isSearchLoading && (
        <Pagination className="border-t border-slate-200 pt-6">
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.max(1, p - 1))
                }}
                className={
                  currentPage === 1 || isBusy
                    ? "pointer-events-none opacity-50"
                    : "text-slate-700 hover:bg-slate-50"
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pages.map((page, index) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) => p + 1)
                }}
                className={
                  !hasNextPage || isBusy
                    ? "pointer-events-none opacity-50"
                    : "text-slate-700 hover:bg-slate-50"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
