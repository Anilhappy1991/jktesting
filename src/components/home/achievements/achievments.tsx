import parse from "html-react-parser"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
// import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { useGetAchievementsQuery } from "@/features/achievements/achievementsApi"
import type { AchievementItem } from "@/features/achievements/types"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/utils/getImageUrl"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

function AchievementCard({ item }: { item: AchievementItem }) {
  return (
    <div className="flex flex-1 animate-in flex-col gap-6 overflow-hidden duration-400 fade-in slide-in-from-bottom-3 md:flex-row">
      <div className="h-auto w-full flex-shrink-0 sm:h-[320px] sm:w-[60%] md:w-[50%] lg:w-[45%]">
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className="h-auto w-full rounded-sm object-cover sm:h-74 md:h-full"
        />
      </div>

      <div className="flex flex-col justify-center px-0 py-4 sm:px-2 sm:pr-4 md:py-6 lg:px-4 lg:pr-8">
        <h3 className="mb-5 text-xl leading-snug font-bold text-[#1b1a1a] sm:text-[20px] lg:text-[25px]">
          {item.title}
        </h3>

        <div className="space-y-3 text-[14px] leading-relaxed text-slate-700 sm:text-[17px] [&_li]:ml-4 [&_li]:list-disc [&_li]:pl-1 [&_p]:mb-3 [&_ul]:space-y-3">
          {parse(item.content || "")}
        </div>
      </div>
    </div>
  )
}

export default function AchievementsSlider() {
  const lang = useLang()
  const { t } = useTranslation()
  const { data, isLoading, isError } = useGetAchievementsQuery({ lang })
  const isPaused = useRef(false)
  const achievements = useMemo(() => data?.data ?? [], [data?.data])

  const [active, setActive] = useState(0)

  useEffect(() => {
    if (achievements.length === 0) {
      setActive(0)
      return
    }

    setActive((current) =>
      current < achievements.length ? current : achievements.length - 1
    )
  }, [achievements.length])
  useEffect(() => {
    if (achievements.length <= 1) return
    const id = setInterval(() => {
      if (!isPaused.current) {
        setActive((index) => (index < achievements.length - 1 ? index + 1 : 0))
      }
    }, 2000)
    return () => clearInterval(id)
  }, [achievements.length])
  const prev = () => setActive((index) => Math.max(0, index - 1))
  const next = () =>
    setActive((index) => Math.min(achievements.length - 1, index + 1))

  const item = achievements[active]

  return (
    <section
      id="achievements"
      className="relative w-full bg-[#f4f5f7] px-4 py-14 transition-all duration-700 ease-in-out fade-in slide-in-from-bottom-3 sm:px-10 md:px-10 lg:px-20"
      style={{
        backgroundImage: "url('/images/jk_bg.jpg')",
      }}
      onMouseEnter={() => {
        isPaused.current = true
      }}
      onMouseLeave={() => {
        isPaused.current = false
      }}
    >
      <h2 className="pb-5 text-center text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
        {t("headings.achievements")}
      </h2>

      {isLoading ? (
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="h-16 animate-pulse rounded-md" />
          <div className="h-[380px] animate-pulse rounded-md" />
        </div>
      ) : isError ? (
        <div className="mx-auto max-w-5xl rounded-2xl border border-rose-200 bg-white/70 px-6 py-12 text-center text-sm font-medium text-rose-600">
          Failed to load achievements.
        </div>
      ) : achievements.length === 0 || !item ? (
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/70 px-6 py-12 text-center text-sm font-medium text-slate-500">
          No achievements available right now.
        </div>
      ) : (
        <>
          <div className="relative mx-auto mb-10 max-w-7xl px-4">
            <div className="absolute top-1/2 right-0 left-0 mt-4 h-[2px] -translate-y-1/2 bg-[#1b3f6b]" />

            <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-2">
              {achievements.map((achievement, index) => (
                <button
                  key={achievement.id}
                  onClick={() => setActive(index)}
                  className="group z-10 flex flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      "md:text-md mb-6 text-[13px] font-semibold transition-colors sm:text-[16px]",
                      index === active
                        ? "text-[#1b3f6b]"
                        : "text-[#000] group-hover:text-[#1b3f6b]"
                    )}
                  >
                    {achievement.year}
                  </span>

                  <div
                    className={cn(
                      "absolute top-[30px] h-4 w-4 rounded-full border-2 transition-all duration-300 sm:top-[28px] sm:top-[31px]",
                      index === active
                        ? "scale-125 border-[#1b3f6b] bg-[#1b3f6b]"
                        : "border-[#1b3f6b] bg-white group-hover:bg-[#1b3f6b]"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-2 sm:px-0">
            <Button
              variant="default"
              size="icon"
              onClick={prev}
              disabled={active === 0}
              className="hidden h-11 w-11 shrink-0 rounded-full bg-[#1b3060] text-white shadow-lg hover:bg-[#14254a] disabled:opacity-30 md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <AchievementCard key={item.id} item={item} />

            <Button
              variant="default"
              size="icon"
              onClick={next}
              disabled={active === achievements.length - 1}
              className="hidden h-11 w-11 shrink-0 rounded-full bg-[#1b3060] text-white shadow-lg hover:bg-[#14254a] disabled:opacity-30 md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
