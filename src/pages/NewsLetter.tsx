import { useMemo, useState } from "react"
import { Archive, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useGetNewslettersQuery } from "@/features/newsletters/newsletterApi"
import { routePaths } from "@/routes/routePaths"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useDownload } from "@/hooks/useDownload"
import { AppLink } from "@/components/common/appLink"
import { getImageUrl } from "@/utils/getImageUrl"
import { useLang } from "@/hooks/useLang"

export default function MonthlyNewsletter() {
  const [currentPage] = useState(1)
  const [downloadFile] = useDownload()
  // Control visible cards
  const [visibleCount, setVisibleCount] = useState(4)
  const ITEMS_PER_PAGE = 4
  const lang = useLang()
  const queryParams = useMemo(
    () => ({
      lang,
      page: currentPage,
      per_page: ITEMS_PER_PAGE,
    }),
    [currentPage]
  )

  const {
    data: newslettersResponse,
    isLoading,
    isError,
  } = useGetNewslettersQuery(queryParams)

  const newsletters = newslettersResponse?.data ?? []

  return (
    <>
      <MetaTagGenerator title="NewsLetters" />
      <section className="min-h-screen w-full bg-slate-50 px-6 py-10">
        {/* Header */}
        <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
          <h2 className="text-xl font-medium text-[#0c3b5e] sm:text-2xl md:text-3xl">
            Monthly News Letter
          </h2>

          <Button
            asChild
            className="gap-2 rounded-lg bg-[#1f4e79] text-white hover:bg-[#1f4e79] hover:text-[#f89d2c]"
          >
            <AppLink to={routePaths.newsLetterArchive}>
              <Archive className="hover:text[#f89d2c] h-4 w-4 hover:bg-[#1f4e79]" />
              View Archive
            </AppLink>
          </Button>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[310px] animate-pulse rounded-2xl border bg-white"
              />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load newsletters.
          </p>
        ) : newsletters.length === 0 ? (
          <p className="text-center text-gray-500">No newsletters available.</p>
        ) : (
          <>
            {/* Cards */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-4">
              {newsletters.slice(0, visibleCount).map((item) => {
                const thumbnailUrl = getImageUrl(item.thumbnail_url)
                const documentUrl = getImageUrl(item.document_url)
                const newsletterMonth =
                  item.formatted_date?.trim() || "Date unavailable"

                return (
                  <Card
                    key={item.id}
                    className="flex flex-col rounded-2xl border bg-white shadow-sm hover:shadow-md"
                  >
                    <CardContent className="flex flex-1 flex-col gap-3 p-4">
                      {/* Image */}
                      <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-md bg-slate-100">
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-slate-500">
                            <FileText className="h-8 w-8" />
                            <span className="text-xs">No Preview</span>
                          </div>
                        )}
                      </div>

                      {/* Month */}
                      <div className="rounded-md border bg-slate-50 py-2 text-center text-xs font-bold">
                        NEWS LETTER OF {newsletterMonth.toUpperCase()}
                      </div>

                      {/* Title */}
                      <p className="line-clamp-2 text-sm font-semibold">
                        {item.title}
                      </p>
                    </CardContent>

                    {/* Download */}
                    <CardFooter className="p-4 pt-0">
                      {documentUrl ? (
                        <Button
                          asChild
                          className="mt-1.5 w-full cursor-pointer bg-[#1f4e79] text-white hover:text-[#f89d2c]"
                          onClick={() => downloadFile(documentUrl)}
                        >
                          <div>
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </div>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-full cursor-pointer hover:text-[#f89d2c]"
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3">
              {/* Load More */}
              {visibleCount < newsletters.length && (
                <Button
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + 4, newsletters.length)
                    )
                  }
                  className="cursor-pointer bg-[#1f4e79] text-white hover:bg-[#173b5c]"
                >
                  Load More
                </Button>
              )}

              {/* Load Less (only when ALL cards visible) */}
              {visibleCount >= newsletters.length && newsletters.length > 4 && (
                <Button variant="outline" onClick={() => setVisibleCount(4)}>
                  Load Less
                </Button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  )
}
