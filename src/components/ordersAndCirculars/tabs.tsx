import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabsData from "./tabsContent"
import { useTranslation } from "@/context/languageContext"

const VALID_TABS = ["orders", "circulars", "notices"] as const
type OrdersTabValue = (typeof VALID_TABS)[number]
const isValidTab = (value: string | null): value is OrdersTabValue =>
  VALID_TABS.includes(value as OrdersTabValue)

const getTabConfig = (t: any) => [
  {
    value: "orders",
    label: t("ordertabs.orders"),
    type: "orders" as const,
  },
  {
    value: "circulars",
    label: t("ordertabs.circulars"),
    type: "circulars" as const,
  },
  {
    value: "notices",
    label: t("ordertabs.notices"),
    type: "notices" as const,
  },
]

export default function GovOrdersCircularsNotices() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const tabConfig = getTabConfig(t)

  const activeTab = useMemo<OrdersTabValue>(() => {
    const tabParam = searchParams.get("tab")
    return isValidTab(tabParam) ? tabParam : "orders"
  }, [searchParams])

  useEffect(() => {
    const tabParam = searchParams.get("tab")

    if (isValidTab(tabParam)) {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set("tab", "orders")
    setSearchParams(nextSearchParams, { replace: true })
  }, [searchParams, setSearchParams])

  return (
    <div className="w-full px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
      <div className="full">
        <div className="flex items-center justify-between">
          <h1 className="py-5 text-xl font-semibold tracking-tight text-blue-950">
            {t("headings.govOrdersCircularsNotices")}
          </h1>
        </div>

        <div className="overflow-hidden bg-[#f9fafb]">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              if (!isValidTab(value)) {
                return
              }

              const nextSearchParams = new URLSearchParams(searchParams)
              nextSearchParams.set("tab", value)
              setSearchParams(nextSearchParams)
            }}
          >
            <div className="border-b px-0 pt-2 pb-0">
              <TabsList className="m-1 h-18 gap-2 bg-transparent p-0">
                {tabConfig.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="rounded-0 relative h-auto cursor-pointer rounded rounded-t-lg rounded-b-none border px-4 py-2 text-sm font-semibold text-slate-500 shadow-none transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-transparent after:transition-colors hover:text-blue-950 data-[state=active]:bg-transparent data-[state=active]:text-blue-950 group-data-[variant=default]/tabs-list:data-active:border-slate-200 group-data-[variant=default]/tabs-list:data-active:border-b-transparent group-data-[variant=default]/tabs-list:data-active:bg-white group-data-[variant=default]/tabs-list:data-active:shadow-none"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="border border-b border-slate-200 bg-white p-6 pt-2 pb-2 shadow-sm">
              {tabConfig.map(({ value, label, type }) => (
                <TabsContent key={value} value={value} className="mt-0">
                  <TabsData tab={label} type={type} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
