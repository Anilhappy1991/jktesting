import { useMemo, useState } from "react"
import { Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { useGetArchivedNewslettersQuery } from "@/features/newsletters/newsletterApi"
import { useDownload } from "@/hooks/useDownload"
import { getAssetUrl } from "@/utils/getAssestUrl"
import { useLang } from "@/hooks/useLang"

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

export default function NewsLetterArchive() {
  const [currentPage, setCurrentPage] = useState(1)
  const [downloadFile] = useDownload()
  const ITEMS_PER_PAGE = 4
  const lang = useLang()

  const queryParams = useMemo(
    () => ({
      lang,
      page: currentPage,
      per_page: ITEMS_PER_PAGE,
    }),
    [currentPage, lang]
  )

  const {
    data: archivedNewslettersResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetArchivedNewslettersQuery(queryParams)

  const archivedNewsletters = archivedNewslettersResponse?.data ?? []
  const pagination = archivedNewslettersResponse?.pagination
  const resolvedCurrentPage = pagination?.current_page ?? currentPage
  const lastPage = Math.max(pagination?.last_page ?? 1, 1)
  const totalItems = pagination?.total ?? archivedNewsletters.length
  const startIndex =
    archivedNewsletters.length === 0
      ? 0
      : pagination
        ? (resolvedCurrentPage - 1) * (pagination.per_page || ITEMS_PER_PAGE) +
          1
        : 1
  const endIndex =
    archivedNewsletters.length === 0
      ? 0
      : pagination
        ? Math.min(totalItems, startIndex + archivedNewsletters.length - 1)
        : archivedNewsletters.length
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
      isFetching
    ) {
      return
    }

    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid items-center gap-4">
          <h1 className="text-center text-xl font-bold tracking-tight text-blue-950 sm:text-2xl">
            Archive News Letters
          </h1>
        </div>

        <div className="overflow-hidden overflow-x-auto border border-slate-300 bg-white">
          {isLoading ? (
            <div className="space-y-3 p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="p-6">
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                Failed to load archived newsletters.
              </p>
            </div>
          ) : archivedNewsletters.length === 0 ? (
            <div className="p-6">
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                No archived newsletters available right now.
              </p>
            </div>
          ) : (
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[14%] border-r border-slate-300 px-3 font-bold text-black sm:w-[60px] sm:text-center">
                    S.No
                  </TableHead>

                  <TableHead className="w-[70%] min-w-[400px] border-r border-slate-300 px-4 font-bold text-black">
                    Title
                  </TableHead>

                  <TableHead className="w-[16%] min-w-[100px] px-4 text-center font-bold text-black">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {archivedNewsletters.map((item, index) => {
                  const documentUrl = getAssetUrl(item.document_url)
                  const newsletterTitle =
                    item.title?.trim() ||
                    `News Letter for the Month of ${item.formatted_date}`

                  return (
                    <TableRow key={item.id} className="border-slate-200">
                      <TableCell className="border-r border-slate-200 px-5 py-6 align-top whitespace-normal">
                        <span className="font-small text-base text-slate-900">
                          {startIndex + index}.
                        </span>
                      </TableCell>

                      <TableCell className="border-r border-slate-200 px-5 py-6 whitespace-normal">
                        <div className="flex items-start gap-4">
                          <FileText className="mt-0.5 h-7 w-7 shrink-0 text-red-500" />
                          <div className="min-w-0">
                            <p
                              dir={item.is_rtl ? "rtl" : "ltr"}
                              className="text-md sm:text-md max-w-[850px] truncate font-medium text-slate-900"
                            >
                              {newsletterTitle}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-5 whitespace-normal">
                        <div className="text-center">
                          {documentUrl ? (
                            <Button
                              asChild
                              className="h-8 bg-[#1d4d79] px-3 text-xs text-white hover:bg-[#1d4d79]"
                              onClick={() => downloadFile(documentUrl)}
                            >
                              <div>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Download
                              </div>
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="h-8 bg-[#1d4d79] px-3 text-xs text-white hover:bg-[#1d4d79]"
                            >
                              <Download className="mr-1.5 h-3.5 w-3.5" />
                              Download
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>

        {!isLoading && !isError && archivedNewsletters.length > 0 && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                        !canGoPrevious || isFetching
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
                        !canGoNext || isFetching
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
