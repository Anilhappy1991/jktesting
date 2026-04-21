import type { SectionData } from "@/features/home/homeTypes"
import type {
  AnalyticSection,
  AnalyticKpiItem,
  AnalyticLineSeries,
  AnalyticLineLabels,
  AnalyticPieSeries,
  AnalyticMonthlySeries,
  AnalyticTableRow,
} from "@/utils/data"

export default function transformToAnalyticSection(
  sectionData: SectionData
): AnalyticSection {
  const kpis: AnalyticKpiItem[] = sectionData.cards.map((card: any) => ({
    label: card.title,
    value: card.value,
    raw: true,
  }))

  // Helper to get chart data
  const getChartData = (chartType: string) => {
    return sectionData.charts.find((c: any) => c.chartType === chartType)
  }

  // Line chart - primary line chart
  const lineChart = getChartData("line")
  const line: AnalyticLineSeries = {
    labels: lineChart?.series?.[0]?.data?.map((d: any) => d.label) || [],
    target:
      lineChart?.series?.[1]?.data?.map((d: any) => parseFloat(d.value)) || [],
    actual:
      lineChart?.series?.[0]?.data?.map((d: any) => parseFloat(d.value)) || [],
  }

  const lineLabels: AnalyticLineLabels = { actual: "Actual", target: "Target" }

  // Pie chart - can be pie, radial, or doughnut
  const pieChart =
    getChartData("pie") || getChartData("radial") || getChartData("doughnut")
  const pie: AnalyticPieSeries = {
    title: pieChart?.title || "",
    labels: pieChart?.series?.[0]?.data?.map((d: any) => d.label) || [],
    values:
      pieChart?.series?.[0]?.data?.map((d: any) => parseFloat(d.value)) || [],
  }

  // Table
  const table = Array.isArray(sectionData.table)
    ? sectionData.table[0]
    : sectionData.table
  const colName: string[] = table?.columns?.map((c: any) => c.label) || []
  const topUlbs: AnalyticTableRow[] = table?.rows || []

  // Monthly/Bar chart - can be bar, column, area, etc.
  const monthlyChart =
    getChartData("bar") || getChartData("column") || getChartData("area")
  const monthly: AnalyticMonthlySeries = {
    labels: monthlyChart?.xAxisLabel || "",
    values:
      monthlyChart?.series?.[0]?.data?.map((d: any) => parseFloat(d.value)) ||
      [],
  }

  return {
    kpis,
    line,
    lineLabels,
    pie,
    monthly,
    colName,
    topUlbs,
  }
}
