import BarChart from "@/components/common/charts/barChart"
import type { LineChartData } from "@/components/common/charts/lineChart"
import LineChart from "@/components/common/charts/lineChart"
import type { PieChartData } from "@/components/common/charts/pieChart"
import PieChart from "@/components/common/charts/pieChart"

export type ChartType = "line" | "bar" | "pie"
export type LineSubType = "area" | "smooth" | ""
export type BarSubType = "stacked" | "horizontal" | "column" | ""
export type PieSubType = "donut" | "doughnut" | "radial" | "round" | ""

export type ChartSubType = LineSubType | BarSubType | PieSubType

export interface ChartSeriesDataPoint {
  label: string
  value: string | number
}

export interface ChartSeries {
  name: string
  data: ChartSeriesDataPoint[]
}

export interface ChartConfig {
  id: string
  title: string
  chartType: ChartType
  subType: ChartSubType
  layout?: "half" | "full"
  xAxisLabel?: string
  yAxisLabel?: string
  showLegend?: boolean
  series: ChartSeries[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PIE_COLORS = ["#5DA5DA", "#60D2A5", "#F5C266", "#F17C8B", "#9B8AD3"]

const LINE_SERIES_STYLES: Array<{
  borderColor: string
  backgroundColor: string
  fill: boolean
  borderDash?: number[]
}> = [
  {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56,189,248,0.18)",
    fill: true,
  },
  {
    borderColor: "#F59E0B",
    backgroundColor: "rgba(245,158,11,0.10)",
    borderDash: [7, 5],
    fill: false,
  },
  {
    borderColor: "#60D2A5",
    backgroundColor: "rgba(96,210,165,0.12)",
    fill: false,
  },
]

const BAR_COLORS = ["#38BDF8", "#F59E0B", "#60D2A5", "#F17C8B", "#9B8AD3"]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toNumbers = (data: ChartSeriesDataPoint[]): number[] =>
  data.map((d) => Number(d.value))

const getStepSize = (values: number[]): number => {
  const max = Math.max(...values)
  if (max <= 100) return 20
  if (max <= 500) return 50
  if (max <= 1000) return 100
  if (max <= 5000) return 500
  if (max <= 10000) return 1000
  const rough = max / 5
  const mag = 10 ** Math.floor(Math.log10(rough))
  const norm = rough / mag
  if (norm <= 1) return mag
  if (norm <= 2) return 2 * mag
  if (norm <= 5) return 5 * mag
  return 10 * mag
}

// ─── Data Builders ────────────────────────────────────────────────────────────

const buildLineData = (
  series: ChartSeries[],
  subType: ChartSubType
): LineChartData => ({
  labels: series[0]?.data.map((d) => d.label) ?? [],
  datasets: series.map((s, i) => {
    const style = LINE_SERIES_STYLES[i % LINE_SERIES_STYLES.length]
    return {
      label: s.name,
      data: toNumbers(s.data),
      borderColor: style.borderColor,
      backgroundColor: style.backgroundColor,
      // area subType forces fill on every series
      fill: subType === "area" ? true : style.fill,
      borderDash: style.borderDash,
      tension: 0.28,
      pointRadius: 5,
      pointBackgroundColor: style.borderColor,
      pointBorderColor: style.borderColor,
      pointBorderWidth: 0,
    }
  }),
})

const buildBarData = (series: ChartSeries[]) => ({
  labels: series[0]?.data.map((d) => d.label) ?? [],
  datasets: series.map((s, i) => ({
    label: s.name,
    data: toNumbers(s.data),
    backgroundColor: BAR_COLORS[i % BAR_COLORS.length],
    borderRadius: 4,
  })),
})

const buildPieData = (series: ChartSeries[]): PieChartData => {
  const slices = series[0]?.data ?? []
  return {
    labels: slices.map((d) => d.label),
    datasets: [
      {
        data: toNumbers(slices),
        backgroundColor: PIE_COLORS.slice(0, slices.length),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ChartRendererProps {
  chart: ChartConfig
  yStepSize?: number
}

export default function ChartRenderer({
  chart,
  yStepSize,
}: ChartRendererProps) {
  const { chartType, subType, title, series, showLegend } = chart
  console.log("Debugging ChartRenderer - Props:", {
    chartType,
    subType,
    title,
    series,
    showLegend,
    yStepSize,
  })
  // ── LINE ────────────────────────────────────────────────────────────────────
  if (chartType === "line") {
    const allValues = series.flatMap((s) => toNumbers(s.data))
    const lineData = buildLineData(series, subType)

    return (
      <LineChart
        key={`${title}-${subType}-${series.map((s) => s.name).join("-")}`}
        data={lineData}
        title={title}
        yStepSize={yStepSize ?? getStepSize(allValues)}
        yBeginAtZero={false}
        showGrid
        showLegend={showLegend ?? true}
      />
    )
  }

  // ── BAR ─────────────────────────────────────────────────────────────────────
  if (chartType === "bar") {
    const barData = buildBarData(series)
    const allValues = series.flatMap((s) => toNumbers(s.data))

    return (
      <BarChart
        key={`${title}-${subType}-${barData.labels.join("-")}`}
        title={title}
        labels={barData.labels}
        datasets={barData.datasets}
        yStepSize={yStepSize ?? getStepSize(allValues)}
        stacked={subType === "stacked"}
        horizontal={subType === "horizontal"}
        showLegend={showLegend ?? true}
      />
    )
  }

  //   ── PIE / DONUT / RADIAL ─────────────────────────────────────────────────────
  if (chartType === "pie") {
    const pieData = buildPieData(series)
    const values = (pieData.datasets[0]?.data as number[]) ?? []
    const total = values.reduce((a, b) => a + b, 0)

    const isDoughnut = subType === "donut" || subType === "doughnut"
    const isRadial = subType === "radial"
    console.log("Debugging ChartRenderer - Pie Chart Data:", isDoughnut)
    return (
      <PieChart
        key={`${title}-${subType}-${pieData.labels?.join("-")}`}
        data={pieData}
        title={title}
        legendPosition="right"
        showDataLabels
        // Pass variant to PieChart so it can switch between pie / doughnut / radial
        type={isDoughnut ? "doughnut" : isRadial ? "radial" : "pie"}
        dataLabelFormatter={(value: number) =>
          `${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%`
        }
      />
    )
  }

  // ── FALLBACK ─────────────────────────────────────────────────────────────────
  console.warn(
    `[ChartRenderer] Unknown chartType: "${chartType}"` +
      (subType ? ` / subType: "${subType}"` : "")
  )
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
      Unsupported chart:{" "}
      <span className="ml-1 font-mono font-semibold">
        {chartType}
        {subType ? `/${subType}` : ""}
      </span>
    </div>
  )
}
