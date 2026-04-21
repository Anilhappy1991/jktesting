import { useEffect, useState } from "react"

import parse from "html-react-parser"
import { ArrowLeft, ExternalLink, X } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface DetailCardLink {
  text: string
  url: string
}

interface DetailCardProps {
  title: string
  imageUrl?: string | null
  description?: string | null
  subtitle?: string | null
  tagLabel?: string
  websiteLinks?: DetailCardLink[]
  isLoading?: boolean
}

interface WrongPageStateProps {
  description: string
  onGoBack: () => void
}

function ImagePlaceholder({ title }: { title: string }) {
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-[#e7eef7] text-2xl font-semibold text-[#1f4e79]">
      {initials || "NA"}
    </div>
  )
}

export function WrongPageState({ description, onGoBack }: WrongPageStateProps) {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <Card className="mx-auto max-w-xl border border-slate-200 shadow-sm">
        <CardContent className="space-y-4 p-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Wrong page</h1>
          <p className="text-sm leading-relaxed text-slate-600">
            {description}
          </p>
          <div className="flex justify-center">
            <Button
              onClick={onGoBack}
              className="gap-2 bg-[#1f4e79] text-white hover:bg-[#173b5c]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DetailCard({
  title,
  imageUrl,
  description,
  subtitle,
  // tagLabel,
  websiteLinks = [],
  isLoading = false,
}: DetailCardProps) {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false)
  const validWebsiteLinks = websiteLinks.filter(
    (link) => link.text?.trim() && link.url?.trim()
  )

  useEffect(() => {
    if (!isLinksModalOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLinksModalOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isLinksModalOpen])

  const handleOfficialWebsiteClick = () => {
    if (validWebsiteLinks.length === 0) {
      return
    }

    if (validWebsiteLinks.length === 1) {
      window.open(validWebsiteLinks[0].url, "_blank", "noopener,noreferrer")
      return
    }

    setIsLinksModalOpen(true)
  }

  if (isLoading) {
    return (
      <Card className="mx-auto w-full animate-pulse border border-slate-200 shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="h-6 w-1/2 rounded bg-slate-200" />
          <div className="h-4 w-1/4 rounded bg-slate-200" />
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-2xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-3 border-b border-slate-100 bg-white px-6 py-4 pt-2 text-center">
        {/* <div className="flex flex-wrap items-center gap-3">
          {tagLabel ? (
            <Badge variant="secondary" className="bg-[#e7eef7] text-[#1f4e79]">
              {tagLabel}
            </Badge>
          ) : null}
          {subtitle ? (
            <span className="text-sm   font-medium text-slate-500">
              {subtitle}
            </span>
          ) : null}
        </div> */}
        <h1 className="mb-0 text-[22px] font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        <h2 className="font-medium italic">{subtitle}</h2>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex justify-center md:justify-start">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="h-38 w-38 flex-shrink-0 rounded-2xl border border-slate-200 bg-white object-contain p-2"
              />
            ) : (
              <ImagePlaceholder title={title} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 [&_a]:text-[#1f4e79] [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
              {description?.trim() ? (
                parse(description)
              ) : (
                <p>Details are not available for this item right now.</p>
              )}
            </div>
            <div className="mt-6 flex justify-center md:justify-start">
              <Button
                type="button"
                onClick={handleOfficialWebsiteClick}
                disabled={validWebsiteLinks.length === 0}
                className="bg-[#1f4e79] px-6 text-white hover:bg-[#173b5c] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
              >
                Click Here to go to Official Website.
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {isLinksModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6"
          onClick={() => setIsLinksModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-[22px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h2 className="leading-none font-semibold text-[#173b5c]">
                Go to
              </h2>
              <button
                type="button"
                onClick={() => setIsLinksModalOpen(false)}
                className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close official website links modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                {validWebsiteLinks.map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 border-b border-slate-200 px-6 py-5 font-medium text-[#7a2669] transition-colors last:border-b-0 hover:bg-[#f8fbff] hover:text-[#5f1f52]"
                  >
                    <span
                      className="text-sm leading-none text-[#1f4e79]"
                      aria-hidden="true"
                    >
                      &bull;
                    </span>
                    <span className="flex-1">{link.text}</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
