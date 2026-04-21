import { useEffect, useState } from "react"
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

// ─── Types ────────────────────────────────────────────────────────────────────

export type PieChartType = "pie" | "doughnut" | "radial"
type LegendPosition = "top" | "bottom" | "left" | "right"

export interface PieDataset {
  data: number[]
  backgroundColor: string[]
  borderWidth?: number
  borderColor?: string | string[]
}

export interface PieChartData {
  labels: string[]
  datasets: PieDataset[]
}

export interface PieChartProps {
  data: PieChartData
  title?: string
  type?: PieChartType
  maxWidth?: number
  height?: number
  legendPosition?: LegendPosition
  mobileLegendPosition?: LegendPosition
  mobileLegendBreakpoint?: number
  showLegend?: boolean
  showTooltip?: boolean
  showDataLabels?: boolean
  dataLabelColor?: string
  dataLabelFontSize?: number
  dataLabelFormatter?: (value: number, total: number) => string
  options?: ChartOptions<"pie"> | ChartOptions<"doughnut">
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const defaultFormatter = (value: number) => `${value}%`

const getIsMobileViewport = (breakpoint: number) =>
  typeof window !== "undefined" && window.innerWidth < breakpoint

// Cutout % per variant
const CUTOUT: Record<PieChartType, string | undefined> = {
  pie: undefined, // no cutout
  doughnut: "60%",
  radial: "80%",
}

// ─── Component ────────────────────────────────────────────────────────────────
const DEFAULT_COLORS = [
  "#2E75B6", // blue
  "#ED7D31", // orange
  "#70AD47", // green
  "#A5A5A5", // grey
  "#5B9BD5", // light blue
  "#FFC000", // yellow
]

const PieChart = ({
  data,
  title,
  type = "pie",
  maxWidth = 550,
  height = 360,
  legendPosition = "right",
  mobileLegendPosition = "bottom",
  mobileLegendBreakpoint = 450,
  showLegend = true,
  showTooltip = true,
  showDataLabels = true,
  dataLabelColor = "#fff",
  dataLabelFontSize = 11,
  dataLabelFormatter,
  options: overrideOptions,
}: PieChartProps) => {
  const [isMobileLegendLayout, setIsMobileLegendLayout] = useState(() =>
    getIsMobileViewport(mobileLegendBreakpoint)
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia(`(max-width: ${mobileLegendBreakpoint - 1}px)`)
    const update = () => setIsMobileLegendLayout(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [mobileLegendBreakpoint])

  const formatter = dataLabelFormatter
    ? (value: number) => {
        const total = data.datasets[0]?.data.reduce((a, b) => a + b, 0) ?? 1
        return dataLabelFormatter(value, total)
      }
    : defaultFormatter

  const resolvedLegendPosition = isMobileLegendLayout
    ? mobileLegendPosition
    : legendPosition

  const isDoughnutVariant = type === "doughnut" || type === "radial"
  const cutout = CUTOUT[type]

  // For radial/doughnut, hide data labels inside the thin ring — use legend only
  const resolvedShowDataLabels = type === "radial" ? false : showDataLabels

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    ...(cutout ? { cutout } : {}),
    plugins: {
      legend: {
        display: showLegend,
        position: resolvedLegendPosition,
        labels: {
          usePointStyle: true,
          padding: isMobileLegendLayout ? 10 : 5,
          boxWidth: isMobileLegendLayout ? 5 : 5,
          font: { size: isMobileLegendLayout ? 8 : 10 },
        },
      },
      tooltip: { enabled: showTooltip },
      datalabels: {
        display: resolvedShowDataLabels,
        color: dataLabelColor,
        font: { weight: "bold" as const, size: dataLabelFontSize },
        formatter,
      },
      layout: {
        padding: 5,
      },
    },
  }

  const mergedOptions = {
    ...defaultOptions,
    ...overrideOptions,
    plugins: {
      ...defaultOptions.plugins,
      ...(overrideOptions as any)?.plugins,
    },
  }
  const processedData: PieChartData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      backgroundColor:
        ds.backgroundColor && ds.backgroundColor.length > 0
          ? ds.backgroundColor
          : data.labels.map(
              (_, i) => DEFAULT_COLORS[i % DEFAULT_COLORS.length]
            ),

      borderColor: "#ffffff",
      borderWidth: 2,
    })),
  }
  const titleHeight = title ? 28 : 0
  const chartHeight = height - titleHeight

  // Doughnut component handles doughnut + radial; Pie for standard pie
  const ChartComponent = isDoughnutVariant ? Doughnut : Pie

  return (
    <div
      className={isMobileLegendLayout ? "px-3 sm:px-4" : undefined}
      style={{
        padding: isMobileLegendLayout ? "0" : "0 0px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: `${maxWidth}px`,
        margin: "0",
      }}
    >
      {title && (
        <h3
          className="font-semibold"
          style={{
            margin: "0 0 4px 0",
            lineHeight: "28px",
            fontSize: isMobileLegendLayout ? 14 : 16,
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ height: `${chartHeight}px`, position: "relative" }}>
        <ChartComponent
          data={processedData as any}
          options={mergedOptions as any}
        />
      </div>
    </div>
  )
}

export default PieChart
