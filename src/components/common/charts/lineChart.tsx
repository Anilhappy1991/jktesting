import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
)

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
})

export interface LineDataset {
  label: string
  data: number[]
  borderColor: string
  backgroundColor?: string
  fill?: boolean
  tension?: number
  pointRadius?: number
  pointBackgroundColor?: string
  pointBorderColor?: string
  pointBorderWidth?: number
  pointHoverBackgroundColor?: string
  pointHoverBorderWidth?: number
  borderDash?: number[]
}

export interface LineChartData {
  labels: string[]
  datasets: LineDataset[]
}

export interface LineChartProps {
  data: LineChartData
  title?: string
  height?: number
  yStepSize?: number
  yBeginAtZero?: boolean
  showLegend?: boolean
  showGrid?: boolean
  options?: ChartOptions<"line">
}

const LineChart = ({
  data,
  title,
  height = 380,
  yStepSize = 12,
  yBeginAtZero = true,
  showLegend = true,
  showGrid = false,
  options: overrideOptions,
}: LineChartProps) => {
  const allValues = data.datasets.flatMap((dataset) => dataset.data)
  const suggestedMin =
    !yBeginAtZero && allValues.length > 0
      ? Math.floor(Math.min(...allValues) / yStepSize) * yStepSize
      : undefined
  const suggestedMax =
    !yBeginAtZero && allValues.length > 0
      ? Math.ceil(Math.max(...allValues) / yStepSize) * yStepSize
      : undefined

  const defaultOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    animation: {
      duration: 1600,
      easing: "easeOutQuart",
    },
    animations: {
      x: {
        duration: 900,
        easing: "easeOutCubic",
        from: 0,
      },
      y: {
        duration: 1600,
        easing: "easeOutQuart",
        from: 0,
      },
    },
    elements: {
      line: {
        tension: 0.28,
        borderWidth: 3,
      },
      point: {
        radius: 5,
        hoverRadius: 6,
        borderWidth: 3,
        backgroundColor: "#38BDF8",
        pointStyle: "circle",
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: showLegend,
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 12,
          boxHeight: 12,
          padding: 24,
          color: "#111827",
          font: {
            family: "Poppins, sans-serif",
            size:
              typeof window !== "undefined" && window.innerWidth >= 1024
                ? 12
                : 10,
            weight: 600,
          },
        },
      },

      tooltip: {
        enabled: true,
        usePointStyle: true,
        backgroundColor: "rgba(36, 36, 36, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
        displayColors: true,
        titleFont: {
          family: "Poppins, sans-serif",
          size: 12,
          weight: 600,
        },
        bodyFont: {
          family: "Poppins, sans-serif",
          size: 12,
          weight: 600,
        },
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${numberFormatter.format(context.parsed.y ?? 0)}`
          },
          labelColor: (context) => {
            const color = String(context.dataset.borderColor ?? "#36A2EB")

            return {
              borderColor: color,
              backgroundColor: color,
              borderWidth: 0,
              borderRadius: 2,
            }
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#374151",
          font: {
            family: "Poppins, sans-serif",
            size: 12,
            weight: 500,
          },
        },
      },
      y: {
        beginAtZero: yBeginAtZero,
        suggestedMin,
        suggestedMax,
        border: {
          display: false,
        },
        grid: {
          display: showGrid,
          color: "#e5e7eb",
          drawTicks: false,
        },
        ticks: {
          stepSize: yStepSize,
          padding: 10,
          color: "#374151",
          font: {
            family: "Poppins, sans-serif",
            size: 12,
            weight: 600,
          },
          callback: (value) => numberFormatter.format(Number(value)),
        },
      },
    },
  }

  const mergedOptions: ChartOptions<"line"> = {
    ...defaultOptions,
    ...overrideOptions,
    animation: {
      ...defaultOptions.animation,
      ...overrideOptions?.animation,
    },
    animations: {
      ...defaultOptions.animations,
      ...overrideOptions?.animations,
    },
    elements: {
      ...defaultOptions.elements,
      ...overrideOptions?.elements,
    },
    plugins: {
      ...defaultOptions.plugins,
      ...overrideOptions?.plugins,
    },
    scales: {
      ...defaultOptions.scales,
      ...overrideOptions?.scales,
    },
  }

  console.log("LineChart Rendered with data:", data)

  return (
    <div className="w-full rounded-[18px] bg-white" style={{ height }}>
      {title && (
        <h3 className="text-[16px] font-semibold text-slate-900 sm:text-[16px]">
          {title}
        </h3>
      )}

      <div style={{ height: title ? height - 44 : height }}>
        <Line data={data} options={mergedOptions} />
      </div>
    </div>
  )
}

export default LineChart
