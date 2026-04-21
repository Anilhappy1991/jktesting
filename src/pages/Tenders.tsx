import { skipToken } from "@reduxjs/toolkit/query"
import { useEffect, useMemo, useState } from "react"

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useGetArchivedTendersQuery,
  useGetTendersQuery,
} from "@/features/tenders/tendersApi"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useDownload } from "@/hooks/useDownload"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"
const ITEMS_PER_PAGE = 10

const getDocumentUrl = (documentUrl: string) => {
  if (!documentUrl) {
    return ""
  }

  try {
    return new URL(documentUrl, ASSET_BASE_URL).toString()
  } catch {
    return documentUrl
  }
}

const getVisiblePages = (currentPage: number, lastPage: number) => {
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", lastPage] as const
  }

  if (currentPage >= lastPage - 2) {
    return [
      1,
      "ellipsis",
      lastPage - 3,
      lastPage - 2,
      lastPage - 1,
      lastPage,
    ] as const
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    lastPage,
  ] as const
}

export default function Tenders() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showArchived, setShowArchived] = useState(false)
  const [downloadFile] = useDownload()
  const lang = useLang()
  const { t } = useTranslation()
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [searchInput])

  useEffect(() => {
    setCurrentPage(1)
  }, [showArchived])

  const queryParams = useMemo(
    () => ({
      lang,
      page: currentPage,
      per_page: ITEMS_PER_PAGE,
      ...(searchQuery ? { search: searchQuery } : {}),
    }),
    [currentPage, searchQuery]
  )

  const latestQuery = useGetTendersQuery(
    !showArchived ? queryParams : skipToken
  )
  const archivedQuery = useGetArchivedTendersQuery(
    showArchived ? queryParams : skipToken
  )

  const activeQuery = showArchived ? archivedQuery : latestQuery
  const tenders = activeQuery.data?.data ?? []
  const pagination = activeQuery.data?.pagination
  const resolvedCurrentPage = pagination?.current_page ?? currentPage
  const lastPage = Math.max(pagination?.last_page ?? 1, 1)
  const totalItems = pagination?.total ?? tenders.length
  const startIndex =
    tenders.length === 0
      ? 0
      : pagination
        ? (resolvedCurrentPage - 1) * (pagination.per_page || ITEMS_PER_PAGE) +
          1
        : 1
  const endIndex =
    tenders.length === 0
      ? 0
      : pagination
        ? Math.min(totalItems, startIndex + tenders.length - 1)
        : tenders.length
  const visiblePages = useMemo(
    () => getVisiblePages(resolvedCurrentPage, lastPage),
    [lastPage, resolvedCurrentPage]
  )

  const canGoPrevious = resolvedCurrentPage > 1
  const canGoNext = Boolean(pagination && resolvedCurrentPage < lastPage)
  const showPagination = Boolean(pagination && lastPage > 1)

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > lastPage ||
      page === resolvedCurrentPage ||
      activeQuery.isFetching
    ) {
      return
    }

    setCurrentPage(page)
  }

  return (
    <>
      <MetaTagGenerator title="Tenders" description="" />
      <div className="w-full px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
        <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="flex-1 text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-2xl">
            {showArchived ? t("headings.archived") : ""} {t("headings.tenders")}
          </h2>

          <div className="flex flex-wrap gap-3">
            <Input
              placeholder={t("headings.searchTenders") + "..."}
              className="w-56"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value)
                setCurrentPage(1)
              }}
            />
            <Button
              className="bg-[#1f4e79] hover:bg-[#173b5c]"
              onClick={() => setShowArchived((previous) => !previous)}
            >
              {showArchived
                ? t("headings.viewLatest")
                : t("headings.viewLatest")}
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow">
          {activeQuery.isLoading ? (
            <div className="space-y-3 p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          ) : activeQuery.isError ? (
            <div className="p-6">
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                Failed to load {showArchived ? "archived tenders" : "tenders"}.
              </p>
            </div>
          ) : tenders.length === 0 ? (
            <div className="p-6">
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {searchQuery
                  ? "No tenders matched your search."
                  : `No ${showArchived ? "archived tenders" : "tenders"} available right now.`}
              </p>
            </div>
          ) : (
            <Table className="w-full table-fixed">
              <TableHeader className="border border-slate-200">
                <TableRow className="border border-slate-200 bg-[#1f4e79] text-white hover:bg-[#1f4e79]">
                  <TableHead className="w-[80px] border text-white">
                    {t("tendersTableHeaders.srNo")}
                  </TableHead>
                  <TableHead className="w-[200px] border text-white">
                    {t("tendersTableHeaders.referenceNo")}
                  </TableHead>
                  <TableHead className="w-[280px] border text-white">
                    {t("tendersTableHeaders.tenderDetails")}
                  </TableHead>
                  <TableHead className="w-[120px] border text-white">
                    {t("tendersTableHeaders.openingDate")}
                  </TableHead>
                  <TableHead className="w-[120px] border text-white">
                    {t("tendersTableHeaders.closingDate")}
                  </TableHead>
                  <TableHead className="w-[150px] border text-center text-white">
                    {t("tendersTableHeaders.downloadDetails")}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tenders.map((item, index) => {
                  const documentUrl = getDocumentUrl(item.document_url)
                  const hasDocument = Boolean(documentUrl)

                  return (
                    <TableRow key={item.id} className="align-top">
                      <TableCell className="border text-center whitespace-normal">
                        {startIndex + index}
                      </TableCell>
                      <TableCell className="border font-semibold whitespace-normal">
                        {item.reference_no ?? "-"}
                      </TableCell>
                      <TableCell className="border break-words whitespace-normal">
                        {item.tender_detail}
                      </TableCell>
                      <TableCell className="border whitespace-normal">
                        {item.opening_date || "-"}
                      </TableCell>
                      <TableCell className="border whitespace-normal">
                        {item.closing_date || "-"}
                      </TableCell>
                      <TableCell className="border">
                        <div className="flex flex-col items-center gap-2">
                          <a
                            href={hasDocument ? documentUrl : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-disabled={!hasDocument}
                            className={
                              !hasDocument
                                ? "pointer-events-none opacity-50"
                                : undefined
                            }
                          >
                            <Button
                              className="w-24 cursor-pointer bg-[#1f4e79] hover:bg-[#173b5c]"
                              disabled={!hasDocument}
                            >
                              {t("headings.view")}
                            </Button>
                          </a>

                          <Button
                            className="w-24 cursor-pointer bg-[#1f4e79] hover:bg-[#173b5c]"
                            disabled={!hasDocument}
                            onClick={() => downloadFile(item.document_url)}
                          >
                            {t("headings.download")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex} to {endIndex} of {totalItems} entries
          </p>

          {showPagination && (
            <Pagination className="mx-0 w-auto justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      handlePageChange(resolvedCurrentPage - 1)
                    }}
                    className={
                      !canGoPrevious || activeQuery.isFetching
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {visiblePages.map((page, index) => (
                  <PaginationItem key={`${page}-${index}`}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={page === resolvedCurrentPage}
                        onClick={(event) => {
                          event.preventDefault()
                          handlePageChange(page)
                        }}
                        className={
                          page === resolvedCurrentPage
                            ? "border-[#1f4e79] bg-[#1f4e79] text-white hover:bg-[#173b5c] hover:text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      handlePageChange(resolvedCurrentPage + 1)
                    }}
                    className={
                      !canGoNext || activeQuery.isFetching
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  )
}
