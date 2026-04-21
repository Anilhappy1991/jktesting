export type AnalyticTabKey = "bd" | "bp" | "tl" | "pt" | "clu"

export interface AnalyticKpiItem {
  label: string
  value: number | string
  raw?: boolean
  format?: "money" | "number" | "percent"
}

export interface AnalyticLineSeries {
  labels: string[]
  target: number[]
  actual: number[]
}

export interface AnalyticMonthlySeries {
  labels: string[] | string
  values: number[]
}

export interface AnalyticLineLabels {
  actual: string
  target: string
}

export interface AnalyticPieSeries {
  title: string
  labels: string[]
  values: number[]
}

export type AnalyticTableRow = Partial<Record<`col${number}`, string>>

export interface AnalyticSection {
  kpis: AnalyticKpiItem[]
  line: AnalyticLineSeries
  lineLabels: AnalyticLineLabels
  pie: AnalyticPieSeries
  monthly: AnalyticMonthlySeries
  colName: string[]
  topUlbs: AnalyticTableRow[]
}

export interface AnalyticTabConfig {
  key: AnalyticTabKey
  value: string
  label: string
  lineTitle: string
  tableTitle: string
  secondaryChartType: "pie" | "bar"
  secondaryChartTitle?: string
}

/* ---------------- Static Data (no APIs) ---------------- */
export const AnalyticData: Record<AnalyticTabKey, AnalyticSection> = {
  // Here 'bd' refers to Revenue Collection by ULB's
  bd: {
    kpis: [
      { label: "Total ULBs", value: 80 },
      { label: "Top Performing ULB", value: "JMC", raw: true },
      { label: "Total Revenue Collected in (Cr)", value: 265, format: "money" },
      {
        label: "Top Revenue Collection Head",
        value: "User Charges",
        raw: true,
      },
      // { label: "Closed Applications", value: 87_000 },
      { label: "SLA Achievement", value: 82, format: "percent" },
    ],
    line: {
      labels: ["2022", "2023", "2024", "2025", "2026"],
      target: [60, 80, 120, 110, 95],
      actual: [40, 55, 65, 85, 58],
    },
    lineLabels: {
      actual: "Actual Collection",
      target: "Target Collection",
    },
    pie: {
      title: "Service-wise Revenue Collection (In Cr.)",
      labels: [
        "Trade License",
        "Building Plan Approval",
        "User Charges",
        "Water & Sewerage",
        "Advertisement",
      ],
      values: [76.85, 42.4, 92.75, 23.85, 29.15],
    },
    monthly: {
      labels: "months",
      values: [
        800, 1200, 980, 1400, 1600, 1500, 1300, 1700, 1900, 1750, 1500, 1650,
      ],
    },
    colName: [
      "ULB",
      "Total Revenue Collected (₹ Cr)",
      "Collection Growth (%)",
      "SLA Achievement (%)",
    ],
    topUlbs: [
      { col1: "JMC", col2: "170", col4: "80", col5: "83" },
      { col1: "SMC", col2: "20", col4: "78", col5: "81" },
      { col1: "KMC", col2: "10", col4: "65", col5: "79" },
      { col1: "RMC", col2: "20", col4: "62", col5: "80" },
      { col1: "BMC", col2: "5", col4: "60", col5: "80" },
    ],
    // topUlbs: [
    //   { name: "JMC", apps: 15420, rate: 0.92, collection: 265 * 1e7 },
    //   { name: "KMC", apps: 14330, rate: 0.88, collection: 241 * 1e7 },
    //   { name: "SMC", apps: 12210, rate: 0.85, collection: 214 * 1e7 },
    //   { name: "DMC", apps: 10105, rate: 0.83, collection: 178 * 1e7 },
    //   { name: "RMC", apps: 8920, rate: 0.8, collection: 156 * 1e7 },
    // ],
    // footnote: "FY 2025–26 provisional figures",
  },
  // Here 'bp' refers to Expenditure incurred by ULB's
  bp: {
    kpis: [
      { label: "Total ULBs", value: 80 },
      { label: "Highest Spending ULB", value: "SMC", raw: true },
      {
        label: "Total Budget Allocated in (Cr)",
        value: 4_061.3,
        format: "number",
      },
      {
        label: "Total Budget Utilized in (Cr)",
        value: 4_030.15,
        format: "number",
      },
      { label: "Budget Utilization in (%)", value: 99, format: "percent" },
    ],

    line: {
      labels: ["2022-2023", "2023-2024", "2024-2025", "2025-2026"],
      target: [3498, 3752, 3919, 4030],
      actual: [3501, 3753, 3920, 4061],
    },
    lineLabels: {
      actual: "Budget Allocated",
      target: "Budget Utilized",
    },
    pie: {
      title: "Distribution of Expenditure (Cr)",
      labels: [
        "Salaries & Staff Costs",
        "Capital Works",
        "Material Procurement",
        "Vehicle Repairs & Maintenance",
        "Office & Administrative Costs",
      ],
      values: [1260, 980, 840, 530, 420],
    },
    monthly: {
      labels: "months",
      values: [
        420, 560, 700, 820, 900, 980, 1040, 1200, 1300, 1250, 1180, 1400,
      ],
    },
    colName: [
      "ULB",
      "Budget Allocated (₹ Cr)",
      "Budget Utilised (₹ Cr)",
      "Budget Utilisation (%)",
    ],
    topUlbs: [
      { col1: "SMC", col2: "2,012", col3: "1975.45", col4: "98" },
      { col1: "JMC", col2: "1,022", col3: "974.57", col4: "95" },
      { col1: "KMC", col2: "700", col3: "699.25", col4: "99" },
      { col1: "RMC", col2: "202", col3: "201.75", col4: "99" },
      { col1: "BMC", col2: "98", col3: "97.8", col4: "99" },
    ],
    // topUlbs: [
    //   { name: "KMC", apps: 10200, rate: 0.89, collection: 19 * 1e7 },
    //   { name: "JMC", apps: 9800, rate: 0.86, collection: 18 * 1e7 },
    //   { name: "SMC", apps: 8700, rate: 0.84, collection: 16 * 1e7 },
    //   { name: "RMC", apps: 6900, rate: 0.79, collection: 12 * 1e7 },
    //   { name: "DMC", apps: 6100, rate: 0.77, collection: 11 * 1e7 },
    // ],
    // footnote: "FY 2025–26 provisional figures",
  },

  // Here 'tl' refers to GIS Mapped Assets
  tl: {
    kpis: [
      { label: "Total ULBs", value: 80 },
      { label: "Total GIS layers", value: 103, format: "number" },
      { label: "Total GIS Mapped Assets", value: 52_546, format: "number" },
      { label: "GIS Attributes Captured", value: 718, format: "number" },
      { label: "GIS Coverage %", value: 88, format: "percent" },
      { label: "ULB with most GIS Mapped ", value: "JMC", raw: true },
    ],
    line: {
      labels: ["2022", "2023", "2024", "2025"],
      target: [10415, 19795, 38790, 52546],
      actual: [11513, 20765, 40790, 53234],
    },
    lineLabels: {
      actual: "Mapped Assets",
      target: "Planned Assets",
    },
    pie: {
      title: "GIS Asset Category Distribution",
      labels: [
        "Roads & Drains",
        "Water Infrastructure",
        "Street Lighting",
        "Buildings",
        "Public Amenities",
      ],
      values: [18400, 11850, 9350, 7420, 5526],
    },
    monthly: {
      labels: "months",
      values: [300, 410, 520, 580, 640, 700, 720, 760, 820, 880, 920, 960],
    },

    colName: [
      "ULB",
      "GIS Mapped Assets",
      "GIS Attributes Captured",
      "GIS Coverage (%)",
    ],
    topUlbs: [
      { col1: "JMC", col3: "23,456", col4: "220", col5: "90" },
      { col1: "SMC", col3: "12,120", col4: "120", col5: "89" },
      { col1: "KMC", col3: "4,900", col4: "110", col5: "88" },
      { col1: "RMC", col3: "1,200", col4: "76", col5: "86" },
      { col1: "BMC", col3: "520", col4: "70", col5: "85" },
    ],
    // topUlbs: [
    //   { name: "SMC", apps: 11800, rate: 0.93, collection: 16 * 1e7 },
    //   { name: "JMC", apps: 10850, rate: 0.9, collection: 14 * 1e7 },
    //   { name: "KMC", apps: 9900, rate: 0.88, collection: 13 * 1e7 },
    //   { name: "RMC", apps: 7600, rate: 0.84, collection: 10 * 1e7 },
    //   { name: "DMC", apps: 7400, rate: 0.82, collection: 9 * 1e7 },
    // ],
    // footnote: "FY 2025–26 provisional figures",
  },

  // Here pt refers to Building Permission
  pt: {
    // Property Tax
    kpis: [
      { label: "Total ULBs", value: 80 },
      { label: "Top Performing ULB", value: "SMC", raw: true },
      { label: "Total Applications Received", value: 160_11 },
      { label: "Total Applications Approved", value: 100_20 },
      { label: "Total Applications Rejected", value: 20_10 },
      { label: "Total Applications Pending", value: 3981 },
      { label: "SLA Achievement", value: 83, format: "percent" },
    ],
    line: {
      labels: ["2022", "2023", "2024", "2025"],
      target: [2050, 2327, 2521, 3122],
      actual: [3810, 3907, 4061, 4233],
    },
    lineLabels: {
      actual: "Applications Received",
      target: "Applications Approved",
    },
    pie: {
      title: "Building Permission Type Distribution",
      labels: [
        "Residential",
        "Commercial",
        "Institutional",
        "Industrial",
        "Mixed Use",
      ],
      values: [7200, 4300, 2200, 1500, 811],
    },
    monthly: {
      labels: "months",
      values: [
        1200, 1350, 1500, 1600, 1700, 1650, 1500, 1450, 1550, 1700, 1900, 2100,
      ],
    },
    colName: [
      "ULB",
      "Applications Received",
      "Applications Approved",
      "Applications Rejected",
      "Pending Applications",
      "SLA Achievement (%)",
    ],
    topUlbs: [
      {
        col1: "SMC",
        col2: "5,066",
        col3: "3,310",
        col4: "541",
        col5: "1,215",
        col7: "85",
      },
      {
        col1: "JMC",
        col2: "3,201",
        col3: "2,080",
        col4: "346",
        col5: "775",
        col7: "84",
      },
      {
        col1: "KMC",
        col2: "2,808",
        col3: "1,810",
        col4: "308",
        col5: "690",
        col7: "83",
      },
      {
        col1: "RMC",
        col2: "1,897",
        col3: "1,225",
        col4: "207",
        col5: "465",
        col7: "82",
      },
      {
        col1: "BMC",
        col2: "907",
        col3: "652",
        col4: "132",
        col5: "123",
        col7: "82",
      },
    ],
    // topUlbs: [
    //   { name: "KMC", apps: 30800, rate: 0.94, collection: 98 * 1e7 },
    //   { name: "JMC", apps: 29850, rate: 0.92, collection: 92 * 1e7 },
    //   { name: "SMC", apps: 27010, rate: 0.9, collection: 85 * 1e7 },
    //   { name: "RMC", apps: 22000, rate: 0.88, collection: 74 * 1e7 },
    //   { name: "DMC", apps: 20000, rate: 0.85, collection: 66 * 1e7 },
    // ],
    // footnote: "FY 2025–26 provisional figures",
  },
  // Here clu refers to Change of Land Use (CLU)
  clu: {
    // Property Tax
    kpis: [
      { label: "Total ULBs", value: 80 },
      { label: "Top Performing ULB", value: "JDA", raw: true },
      { label: "Total Applications Received", value: 6435 },
      { label: "Total Applications Approved", value: 5124 },
      { label: "Total Applications Rejected", value: 799 },
      { label: "Total Applications Pending", value: 512 },
      {
        label: "Application Processed within PSGA",
        value: 84,
        format: "percent",
      },
    ],
    line: {
      labels: ["2022", "2023", "2024", "2025"],
      target: [701, 847, 1479, 2088],
      actual: [1015, 1210, 1819, 2391],
    },
    lineLabels: {
      actual: "Applications Received",
      target: "Applications Approved",
    },
    pie: {
      title: "CLU Request Category Distribution",
      labels: [
        "Residential Conversion",
        "Commercial Conversion",
        "Industrial Conversion",
        "Mixed Use",
        "Other",
      ],
      values: [2140, 1710, 1185, 920, 480],
    },
    monthly: {
      labels: "months",
      values: [
        1200, 1350, 1500, 1600, 1700, 1650, 1500, 1450, 1550, 1700, 1900, 2100,
      ],
    },
    colName: [
      "ULB",
      "Applications Received",
      "Applications Approved",
      "Applications Rejected",
      "Pending Applications",
      "PSGA Compliance (%)",
    ],
    topUlbs: [
      {
        col1: "JDA",
        col2: "1,590",
        col3: "1,180",
        col4: "212",
        col5: "198",
        col7: "85",
      },
      {
        col1: "JMC",
        col2: "1,268",
        col3: "960",
        col4: "160",
        col5: "148",
        col7: "83",
      },
      {
        col1: "SMC",
        col2: "1,097",
        col3: "845",
        col4: "154",
        col5: "98",
        col7: "81",
      },
      {
        col1: "RMC",
        col2: "781",
        col3: "620",
        col4: "122",
        col5: "39",
        col7: "78",
      },
      {
        col1: "BMC",
        col2: "92",
        col3: "50",
        col4: "20",
        col5: "22",
        col7: "78",
      },
    ],
    // topUlbs: [
    //   { name: "KMC", apps: 30800, rate: 0.94, collection: 98 * 1e7 },
    //   { name: "JMC", apps: 29850, rate: 0.92, collection: 92 * 1e7 },
    //   { name: "SMC", apps: 27010, rate: 0.9, collection: 85 * 1e7 },
    //   { name: "RMC", apps: 22000, rate: 0.88, collection: 74 * 1e7 },
    //   { name: "DMC", apps: 20000, rate: 0.85, collection: 66 * 1e7 },
    // ],
    // footnote: "FY 2025–26 provisional figures",
  },
}

export const analyticTabs: AnalyticTabConfig[] = [
  {
    key: "bd",
    value: "revenue-collection",
    label: "Revenue Collection by ULBs",
    lineTitle: "Target vs Actual Collection",
    tableTitle: "Top Performing ULBs",
    secondaryChartType: "pie",
  },
  {
    key: "bp",
    value: "expenditure-incurred",
    label: "Expenditure Incurred by ULBs",
    lineTitle: "Budget Allocation vs Utilization",
    tableTitle: "Highest Spending ULBs",
    secondaryChartType: "pie",
  },
  {
    key: "tl",
    value: "gis-mapped-assets",
    label: "GIS Mapped Assets",
    lineTitle: "Planned vs Actual GIS Mapping",
    tableTitle: "Top GIS Mapped ULBs",
    secondaryChartType: "bar",
    secondaryChartTitle: "Monthly GIS Mapped Assets",
  },
  {
    key: "pt",
    value: "building-permission",
    label: "Building Permission",
    lineTitle: "Building Permission Trend",
    tableTitle: "Top Performing ULBs",
    secondaryChartType: "bar",
    secondaryChartTitle: "Monthly Applications",
  },
  {
    key: "clu",
    value: "change-of-land-use",
    label: "Change of Land Use (CLU)",
    lineTitle: "CLU Application Trend",
    tableTitle: "Top Performing ULBs",
    secondaryChartType: "bar",
    secondaryChartTitle: "Monthly Applications",
  },
]
