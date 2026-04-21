import { useTranslation } from "@/context/languageContext"
import type { WhatsNewItem } from "@/features/home/homeTypes"
import { useGetWhatsNewQuery } from "@/features/home/whatsNewApi"
import { useLang } from "@/hooks/useLang"
// import { Bell } from "lucide-react"
import { useState } from "react"

export default function WhatsNewBar() {
  const lang = useLang()
  const { t } = useTranslation()
  const { data: whatsNewData } = useGetWhatsNewQuery({ lang })
  const [isPaused, setIsPaused] = useState(false)
  // console.log("whats new", whatsNewData)
  return (
    <div className="flex h-13 items-center bg-[#1f4e79] text-sm text-white">
      {/* Left Section */}
      <div className="z-[99] flex items-center bg-[#65a6e3] px-2 py-2.5 pr-10 [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]">
        <img
          src="/images/announcementicon.png"
          alt="icon"
          className="mr-2 h-8 w-8"
        />
        <span className="pr-2 text-[14px] font-medium sm:text-lg">
          {t("headings.whatsNew")}
        </span>
      </div>

      {/* Marquee / Content */}
      <div
        className="-ml-[80px] flex-1 overflow-hidden whitespace-nowrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="animate-marquee flex gap-10 px-4 py-2"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {whatsNewData?.data?.map((item: WhatsNewItem) => (
            <div key={item.id} className="flex items-center gap-2">
              {/* <Bell size={20} color="#f3aa44" /> */}
              <span className="font-[20px]">🔔</span>
              <span className="text-[14px] hover:text-[#f3aa44]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
