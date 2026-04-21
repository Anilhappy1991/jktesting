import { useState } from "react"
import { UlbLink } from "../common/ulbLink"

const notices = [
  {
    text: "S.O - 18 dated: 27.01.2026 regarding amendments in the J&K Municipal Elections Rules 2003.",
    href: "#",
  },
  {
    text: "New urban development policy released for public review.",
    href: "#",
  },
  {
    text: "Guidelines issued for smart city infrastructure updates.",
    href: "#",
  },
  {
    text: "Tender notice for road construction in Ward No. 5, Jammu.",
    href: "#",
  },
  { text: "Public hearing scheduled for revised Master Plan 2035.", href: "#" },
]

export default function LatestNotices() {
  const [paused, setPaused] = useState(false)

  return (
    <div>
      <h2 className="mb-2 text-[14px] font-semibold sm:text-xl">
        Latest Notices{" "}
        <span className="animate-pulse rounded-sm bg-green-600 px-2 py-[4px] text-[12px] text-white">
          New
        </span>
      </h2>

      <div
        className="relative h-[80px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks top & bottom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-[#4a8ecb] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-t from-[#4a8ecb] to-transparent" />

        {/* Marquee container */}
        <div
          className="animate-marquee-up"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[...notices, ...notices].map((notice, i) => (
            <UlbLink
              key={i}
              to={notice.href}
              className="mb-3 block text-[12px] leading-relaxed hover:!text-[#f4a550] hover:opacity-100 sm:text-sm"
            >
              <span className="mr-1 font-bold">›</span>
              {notice.text}
            </UlbLink>
          ))}
        </div>
      </div>
    </div>
  )
}
