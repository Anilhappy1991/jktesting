import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAnalyticsQuery } from "@/features/home/analyticApis"
import AnalyticKpis from "./kpis"
import ChartGrid from "./chartGrid"
import AnalyticTable from "./table"
import { useLang } from "@/hooks/useLang"

export function AnalyticTabs() {
  const lang = useLang()
  const { data, isLoading, error } = useGetAnalyticsQuery({ lang })

  if (isLoading) return <div>Loading...</div>
  if (error)
    return <div className="text-red-500">Error loading analytics data</div>

  return (
    <Tabs
      defaultValue={data?.tabs?.[0]?.title.en ?? ""}
      className="flex flex-col gap-6"
    >
      <TabsList className="grid h-auto w-full grid-cols-1 justify-between gap-4 border-0 bg-transparent px-8 shadow-none md:grid-cols-2 md:pl-0 lg:px-0 xl:grid-cols-5">
        {data?.tabs?.map((tab) => (
          <TabsTrigger
            key={tab.title.en}
            value={tab.title.en}
            className="cursor-pointer rounded-none rounded-t-[10px] border-0 bg-[#dddddd] py-3 text-center leading-snug font-bold whitespace-normal text-black shadow-none transition-colors duration-200 hover:bg-[#0f4c81] hover:text-white data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            {tab.title_text}
          </TabsTrigger>
        ))}
      </TabsList>

      <div>
        {data?.tabs?.map((tab) => {
          const sectionData = data?.data?.find(
            (item) =>
              item.title.en.trim().toLowerCase() ===
              tab.title.en.trim().toLowerCase()
          )
          if (!sectionData) return null

          return (
            <TabsContent
              key={tab.title.en}
              value={tab.title.en}
              className="mt-5 flex flex-col gap-6"
            >
              {sectionData.cards?.length > 0 && (
                <AnalyticKpis items={sectionData.cards} />
              )}

              <ChartGrid charts={sectionData.charts} />

              {sectionData.table && !Array.isArray(sectionData.table) && (
                <AnalyticTable
                  title={sectionData.table.title}
                  headers={sectionData.table.columns}
                  rows={sectionData.table.rows}
                />
              )}
            </TabsContent>
          )
        })}
      </div>
    </Tabs>
  )
}
