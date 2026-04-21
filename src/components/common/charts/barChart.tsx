import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
})

/* ================= TYPES ================= */

export interface Dataset {
  label: string
  data: number[]
}

export interface BarChartProps {
  title?: string
  labels: string[]
  datasets: Dataset[]
  height?: number
  yStepSize?: number
  stacked?: boolean
  horizontal?: boolean
  showLegend?: boolean
}

/* ================= COLOR THEME ================= */

const getDatasetColor = (label: string, index: number) => {
  const l = label.toLowerCase()

  if (l.includes("allocated")) return "#2E75B6" // blue
  if (l.includes("utilized") || l.includes("utilised")) return "#ED7D31" // orange

  const fallback = ["#2E75B6", "#ED7D31", "#70AD47", "#A5A5A5"]
  return fallback[index]
}

/* ================= COMPONENT ================= */

export default function BarChart({
  title,
  labels,
  datasets,
  height = 360,
  yStepSize,
  // stacked = false,
  horizontal = false,
  showLegend = true,
}: BarChartProps) {
  const data: ChartData<"bar"> = {
    labels,
    datasets: datasets.map((ds, idx) => {
      const color = getDatasetColor(ds.label, idx)

      return {
        label: ds.label,
        data: ds.data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.9,
        categoryPercentage: 0.7,
        hoverBorderWidth: 2,
        hoverBorderColor: "#00000020",
      }
    }),
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },

    animations: {
      y: {
        duration: 1000,
        easing: "easeOutCubic",
        from: (ctx) => {
          const chart = ctx.chart
          const yScale = chart.scales.y
          return yScale.getPixelForValue(0)
        },
        delay: (ctx) => ctx.datasetIndex * 250,
      },
    },

    plugins: {
      legend: {
        display: showLegend,
        position: "top",
        align: "start",
        labels: {
          padding: 5,
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

      // datalabels: {
      //   color: "#000000",
      //   anchor: "end",
      //   align: "top",
      //   rotation: horizontal ? 0 : 90,

      //   font: {
      //     weight: "normal",
      //     size:
      //       typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 12,
      //   },
      //   formatter: (value: number) => numberFormatter.format(value),
      // },
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#374151",
          font: {
            family: "Poppins, sans-serif",
            size: 12,
            weight: 600,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          stepSize: yStepSize,
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

  return (
    <div
      className="w-full rounded-[18px] bg-white p-1 sm:p-4"
      style={{ height }}
    >
      {title && (
        <h3 className="text[16px] mb-4 text-[16px] font-semibold">{title}</h3>
      )}

      <div style={{ height: title ? height - 50 : height }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
