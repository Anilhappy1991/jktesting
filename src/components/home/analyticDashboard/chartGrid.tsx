import { Card } from "@/components/ui/card"
import type { ChartConfig } from "./chartRenderer"
import ChartRenderer from "./chartRenderer"

interface ChartGridProps {
  charts: ChartConfig[]
}

export default function ChartGrid({ charts }: ChartGridProps) {
  if (!charts || charts.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 pb-0 md:grid-cols-2 md:gap-6 lg:gap-8">
      {charts.map((chart) => (
        <Card
          key={chart.id}
          className={[
            "w-full overflow-hidden p-4 md:p-6",
            chart.layout === "full" ? "md:col-span-2" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ChartRenderer chart={chart} />
        </Card>
      ))}
    </div>
  )
}
