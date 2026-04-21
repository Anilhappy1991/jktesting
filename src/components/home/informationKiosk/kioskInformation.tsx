import { useMemo, useState } from "react"

import type { KioskTabDataItem } from "@/features/home/homeTypes"
import { useGetKioskTabDataQuery } from "@/features/home/kioskTabApi"
import { useLang } from "@/hooks/useLang"

interface KioskInformationProps {
  tabId: number
}

const getItemHref = (item: {
  document_url: string | null
  link: string | null
}) => item.document_url || item.link

const splitContent = (title: string) => {
  const [heading, ...rest] = title.split(":")

  if (rest.length === 0) {
    return {
      heading: title,
      description: "",
    }
  }

  return {
    heading: `${heading.trim()}:`,
    description: rest.join(":").trim(),
  }
}

const isExternalUrl = (href: string) => /^https?:\/\//i.test(href)

function KioskInformationItem({ item }: { item: KioskTabDataItem }) {
  const href = getItemHref(item)
  const { heading, description } = splitContent(item.title)
  const isExternal = href ? isExternalUrl(href) : false

  return (
    <li className="rounded-xl transition hover:bg-slate-50">
      <a
        href={href || "#"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="flex items-start gap-3 px-0 py-0 sm:gap-4"
      >
        <span className="mt-2 h-2 w-2 rounded-full bg-[#0f4c81]" />

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#1f4e79] sm:text-sm">{heading}</p>

          {description && (
            <p className="md:text-md text-md mb-1 text-sm leading-5 font-normal text-[#323031] hover:text-[#f3aa44] md:leading-6">
              {description}
              {item.is_new && (
                <span className="ml-1.5 animate-pulse rounded rounded-sm bg-[#198754] px-2 py-[2px] text-[10px] text-white transition-all duration-200 sm:text-[12px]">
                  New
                </span>
              )}
            </p>
          )}
        </div>
      </a>
    </li>
  )
}

function KioskInformationMarquee({ items }: { items: KioskTabDataItem[] }) {
  const shouldAnimate = items.length > 1
  const animationDuration = `${Math.max(items.length * 4, 16)}s`
  const [isPaused, setIsPaused] = useState(false)

  return (
    <>
      <style>
        {`
          @keyframes kiosk-vertical-marquee {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
        `}
      </style>

      <div
        className="tabssec h-[300px] overflow-hidden rounded-[22px] bg-white px-4 py-3 sm:h-[320px] sm:px-4 sm:py-4 md:h-[400px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex flex-col motion-reduce:animate-none"
          style={
            shouldAnimate
              ? {
                  animation: `kiosk-vertical-marquee ${animationDuration} linear infinite`,
                  animationPlayState: isPaused ? "paused" : "running",
                }
              : undefined
          }
        >
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <KioskInformationItem key={item.id} item={item} />
            ))}
          </ul>

          {shouldAnimate && (
            <ul aria-hidden="true" className="flex flex-col gap-2">
              {items.map((item) => (
                <KioskInformationItem
                  key={`${item.id}-duplicate`}
                  item={item}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default function KioskInformation({ tabId }: KioskInformationProps) {
  const lang = useLang()
  const { data, isLoading, isError } = useGetKioskTabDataQuery(
    { tabId, lang },
    { skip: !tabId }
  )

  const items = useMemo(() => {
    const kioskItems = data?.data ?? []

    return [...kioskItems].sort(
      (firstItem, secondItem) =>
        firstItem.display_order - secondItem.display_order
    )
  }, [data])

  return (
    <div className="rounded-[20px] bg-white pt-1">
      {isLoading ? (
        <div className="space-y-2 rounded-[22px] bg-white px-4 py-4 sm:px-7">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-2 h-3 w-3 shrink-0 animate-pulse rounded-full bg-[#0f4c81]" />
              <div className="w-full space-y-3">
                <div className="h-7 w-3/4 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-7 w-full animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="py-16 text-center text-sm font-medium text-rose-600">
          Failed to load kiosk information.
        </p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-sm font-medium text-slate-500">
          No information available for this tab.
        </p>
      ) : (
        <KioskInformationMarquee items={items} />
      )}
    </div>
  )
}
