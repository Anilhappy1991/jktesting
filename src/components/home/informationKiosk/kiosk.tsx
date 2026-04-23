import { useEffect, useState } from "react"

import { Tabs } from "@/components/ui/tabs"
import { useGetKioskTabsQuery } from "@/features/home/kioskApi"

import KioskInformation from "./kioskInformation"
import KioskTabsNav from "./kioskTabsNav"
import QuickLinks from "./quickLinks"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

export default function Kiosk() {
  const lang = useLang()
  const { t } = useTranslation()
  const { data, isLoading, isError } = useGetKioskTabsQuery({ lang })
  const tabs = data?.data ?? []

  const [activeTabValue, setActiveTabValue] = useState("")

  useEffect(() => {
    if (tabs.length === 0) {
      setActiveTabValue("")
      return
    }

    setActiveTabValue((currentValue) => {
      const hasCurrentTab = tabs.some((tab) => String(tab.id) === currentValue)
      return hasCurrentTab ? currentValue : String(tabs[0].id)
    })
  }, [tabs])

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-10">
      <section className="py-6 sm:py-10 md:py-14 lg:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-5 lg:grid-cols-1 lg:gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,1.1fr)]">
            {/*  Left Section */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-left text-xl font-medium tracking-tight text-[#1f4e79] sm:text-2xl md:text-3xl">
                {t("headings.informationKiosk")}
              </h2>

              <div className="h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,76,129,0.08)] sm:p-4 sm:shadow-[0_16px_50px_rgba(15,76,129,0.08)]">
                {isLoading ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex gap-2 overflow-hidden sm:gap-3">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-12 w-24 shrink-0 animate-pulse rounded-[12px] bg-slate-200 sm:h-12 sm:w-32 sm:rounded-[16px] md:h-20 md:w-35"
                        />
                      ))}
                    </div>

                    <div className="h-[200px] animate-pulse rounded-[16px] bg-slate-100 sm:h-[260px] sm:rounded-[20px] md:h-[320px] lg:h-[340px]" />
                  </div>
                ) : isError ? (
                  <div className="rounded-[16px] border border-rose-200 bg-rose-50 px-4 py-5 text-center text-xs font-medium text-rose-600 sm:rounded-[24px] sm:px-5 sm:py-6 sm:text-sm">
                    Failed to load kiosk tabs.
                  </div>
                ) : tabs.length === 0 ? (
                  <div className="rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs font-medium text-slate-500 sm:rounded-[24px] sm:px-5 sm:py-6 sm:text-sm">
                    No kiosk tabs found.
                  </div>
                ) : (
                  <Tabs
                    value={activeTabValue}
                    onValueChange={setActiveTabValue}
                  >
                    <KioskTabsNav tabs={tabs} />
                    <KioskInformation tabId={Number(activeTabValue)} />
                  </Tabs>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex h-full flex-col justify-between sm:space-y-5 xl:sticky xl:top-6">
              <h2 className="py-2 text-left text-xl font-medium tracking-tight text-[#1f4e79] sm:text-2xl md:text-3xl">
                {t("headings.quickLinks")}
              </h2>

              <QuickLinks />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
