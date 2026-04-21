import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useGetArchivedNotificationsQuery,
  useGetNotificationsQuery,
} from "@/features/notifications/notificationApi"
import type { NotificationItem } from "@/features/notifications/notificationTypes"
import { useDownload } from "@/hooks/useDownload"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const ITEMS_PER_PAGE = 10

export default function NotificationTable() {
  const [showArchive, setShowArchive] = useState(false)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [downloadFile] = useDownload()
  const lang = useLang()
  const { t } = useTranslation()
  const latestQuery = useGetNotificationsQuery(
    { lang },
    {
      skip: showArchive,
    }
  )
  const archivedQuery = useGetArchivedNotificationsQuery(
    { lang },
    {
      skip: !showArchive,
    }
  )

  const notifications = useMemo<NotificationItem[]>(() => {
    return showArchive
      ? (archivedQuery.data?.data ?? [])
      : (latestQuery.data?.data ?? [])
  }, [archivedQuery.data, latestQuery.data, showArchive])

  const isLoading = showArchive
    ? archivedQuery.isLoading
    : latestQuery.isLoading
  const isError = showArchive ? archivedQuery.isError : latestQuery.isError

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    if (!searchValue) {
      return notifications
    }

    return notifications.filter((item) => {
      const originalName = item.document_og_name?.toLowerCase() ?? ""

      return (
        item.notification_detail.toLowerCase().includes(searchValue) ||
        originalName.includes(searchValue)
      )
    })
  }, [notifications, search])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  )

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, filteredItems])

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  // const getFileNameFromUrl = (url: string) => {
  //   return url.split("/").pop()?.split("?")[0] || "document.pdf"
  // }

  return (
    <div className="w-full px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
      <div className="w-full">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div />

          <h1 className="text-[22px] font-medium tracking-tight text-[#212529]">
            {showArchive ? t("headings.archived") : ""}{" "}
            {t("headings.notifications")}
          </h1>
          <div className="mb-2 flex justify-center md:justify-end">
            <Button
              type="button"
              onClick={() => {
                setShowArchive((current) => !current)
                setCurrentPage(1)
              }}
              className="h-10 rounded-md bg-[#0f4c81] px-4 text-sm text-white hover:bg-[#0b3a63]"
            >
              {showArchive
                ? t("headings.viewLatest")
                : t("headings.viewArchive")}
            </Button>
          </div>
        </div>

        <div className="mb-1 flex justify-end">
          <div className="flex h-10 w-[200px] justify-end">
            <Input
              placeholder={t("headings.searchDocuments")}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setCurrentPage(1)
              }}
              className="h-10 w-full max-w-sm rounded-lg border-slate-300 bg-white px-4 text-lg placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-[#0f4c81]/20"
            />
          </div>
        </div>

        <div className="overflow-hidden overflow-x-auto border border-slate-300 bg-white">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-[#1f4e79] hover:bg-[#1f4e79]">
                <TableHead className="w-[14%] w-[60px] border-r border-slate-300 px-3 font-bold text-[#ffffff] sm:w-[60px] sm:text-center">
                  {t("headings.serialNumber")}
                </TableHead>

                <TableHead className="w-[75%] w-[400px] border-r border-slate-300 px-4 font-bold text-[#ffffff]">
                  {t("headings.title")}
                </TableHead>

                <TableHead className="w-[140px] min-w-[100px] px-4 text-center font-bold text-[#ffffff] sm:w-[120px]">
                  {t("headings.action")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow className="hover:bg-[#1f4e79]">
                  <TableCell colSpan={3} className="px-4 py-10 text-center">
                    Loading notifications...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={3}
                    className="px-4 py-10 text-center text-red-500"
                  >
                    Failed to load notifications.
                  </TableCell>
                </TableRow>
              ) : paginatedItems.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={3}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No notifications found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((item, index) => (
                  <TableRow key={item.id} className="border-slate-200">
                    <TableCell className="border-r border-slate-200 px-5 py-6 align-top whitespace-normal">
                      <span className="font-small text-base text-slate-900">
                        {startIndex + index + 1}.
                      </span>
                    </TableCell>

                    <TableCell className="border-r border-slate-200 px-5 py-6 whitespace-normal">
                      <div className="flex items-start gap-4">
                        <FileText className="mt-0.5 h-7 w-7 shrink-0 text-red-500" />
                        <div className="min-w-0">
                          <p className="text-md sm:text-md max-w-[850px] truncate font-medium text-slate-900">
                            {item.notification_detail}
                          </p>
                          {/* {item.document_og_name && (
                            <p className="mt-1 text-sm text-slate-500">
                              {item.document_og_name}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="gap-4 px-4 py-5 whitespace-normal">
                      <div className="items-center justify-center gap-4 sm:block sm:text-center md:flex">
                        <Button
                          asChild
                          className="h-8 bg-[#1d4d79] px-3 text-xs text-slate-600 text-white hover:bg-[#1d4d79] hover:bg-transparent hover:text-[#fff]"
                        >
                          <a
                            href={item.document_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white hover:bg-blue-900"
                          >
                            <Eye className="h-3.5 w-3.5 text-white" />
                            View
                          </a>
                        </Button>

                        <Button
                          onClick={() => downloadFile(item.document_url)}
                          className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-[#1d4d79] px-3 text-xs text-white hover:bg-[#1d4d79]"
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="h-10 w-8 rounded-lg border-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {pageNumbers.map((pageNumber) => {
              const isActive = currentPage === pageNumber

              return (
                <Button
                  key={pageNumber}
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`h-10 min-w-4 rounded-lg px-4 text-base ${
                    isActive
                      ? "border-[#0f4c81] bg-[#0f4c81] text-white hover:bg-[#0b3a63] hover:text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </Button>
              )
            })}

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="h-10 w-8 rounded-lg border-slate-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
