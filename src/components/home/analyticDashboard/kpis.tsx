// import type { AnalyticKpiItem } from "@/utils/data"

import type { Card } from "@/features/home/homeTypes"
import KpiCard from "./kpiCard"
// import type { Card } from "@/features/home/analyticsTypes"

interface AnalyticKpisProps {
  items: Card[]
}

export default function AnalyticKpis({ items }: AnalyticKpisProps) {
  return (
    <div className="flex gap-2 overflow-x-auto md:block">
      <div className="mobileviewdesign mt-64 flex w-full justify-between gap-4 overflow-x-auto sm:flex-wrap md:mt-0 md:w-full md:overflow-x-hidden lg:flex-nowrap">
        {items.map((item) => (
          <KpiCard key={item.id} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  )
}
