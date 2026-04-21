export interface BannerItem {
  banner_type: "image" | "video" | string
  banner: string
  banner_position: number
}

export interface BannerResponse {
  success: boolean
  data: BannerItem[]
}

export interface WhatsNewItem {
  id: string
  title: string
  description: string | null
  redirect_link: string | null
}

export interface WhatsNewResponse {
  status: boolean
  message: string
  data: WhatsNewItem[]
}

/**
 * Query Params Type (important for scalability)
 */
export interface GetWhatsNewParams {
  lang?: string
  search?: string
  per_page?: number
  page?: number
}

export interface HodItem {
  id: number
  name: string
  profile_image_url?: string | null
  designation: string
  department: string
  email: string | null
  phone: string | null
  description: string | null
}

export interface HodResponse {
  status: boolean
  lang: string
  data: HodItem[]
}

/**
 * Query Params
 */
export interface GetHodParams {
  lang?: "en" | "hi" | "ur" | string
}

export interface KioskTabItem {
  id: number
  title: string
}

export interface KioskTabResponse {
  status: boolean
  lang: string
  data: KioskTabItem[]
}

/**
 * Query Params
 */
export interface GetKioskTabsParams {
  lang?: "en" | "hi" | string
}

export interface KioskTabDataItem {
  id: number
  title: string
  item_type: "document" | "link" | string
  link: string | null
  document_url: string | null
  is_new: boolean
  display_order: number
}

export interface KioskTabDataResponse {
  status: boolean
  lang: string
  data: KioskTabDataItem[]
}

/**
 * Path + Query Params
 */
export interface GetKioskTabDataParams {
  tabId: number | string
  lang?: "en" | "hi" | "ur" | string
}

/**
 * List Item
 */
export interface SchemeItem {
  link: string | URL | undefined
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  home_image: string
  short_description: string
  logo: string
}

export interface SchemeLinkItem {
  text: string
  url: string
}

/**
 * List Response
 */
export interface SchemeListResponse {
  status: boolean
  message: string
  data: SchemeItem[]
}

/**
 * Detail Item (usually richer than list)
 * Keep flexible for future expansion
 */
export interface SchemeDetail extends SchemeItem {
  // description?: string | null
  benefits?: string | null
  eligibility?: string | null
  documents?: string[] | null
  links?: SchemeLinkItem[]
}

/**
 * Detail Response
 */
export interface SchemeDetailResponse {
  status: boolean
  message: string
  data: SchemeDetail
}

/**
 * Query Params (List)
 */
export interface GetSchemesParams {
  lang?: "en" | "hi" | "ur" | string
  search?: string
  page?: number
  per_page?: number
}

/**
 * Detail Params
 */
export interface GetSchemeBySlugParams {
  slug: string
  lang?: "en" | "hi" | "ur" | string
}

export interface EServiceItem {
  id: string
  title: string
  description: string
  redirect_link: string
  img_file: string
}

export interface EServiceResponse {
  status: boolean
  message: string
  data: EServiceItem[]
}

export interface GetEServiceParams {
  lang?: "en" | "hi" | "ur" | string
}
export interface LanguageParams {
  lang?: "en" | "hi" | "ur" | string
}

export interface StakeholderItem {
  id: number
  logo_url: string
  website_link: string | null
}

export interface StakeholderResponse {
  status: boolean
  data: StakeholderItem[]
}

/**
 * Categories (Top Images)
 */
export interface GalleryCategoryItem {
  id: number
  category: string
  title: string
  slug: string
  top_image: string
}

export interface GalleryCategoryResponse {
  status: boolean
  lang: string
  data: GalleryCategoryItem[]
}

/**
 * Category Images (by slug)
 */
export interface GalleryItem {
  id: number
  title: string
  category: string
  image_url: string
}

export interface GalleryBySlugResponse {
  status: boolean
  lang: string
  category: string
  data: GalleryItem[]
}

/**
 * Common Params
 */
export interface GalleryParams {
  lang?: "en" | "hi" | "ur" | string
}

export interface LanguageParams extends GalleryParams {}

/**
 * Slug Params
 */
export interface GetGalleryBySlugParams extends GalleryParams {
  slug: string
}

export interface WhatsNewBlockItem {
  id: number
  title: string
  image: string
  show_order: number
}

export interface WhatsNewBlockResponse {
  status: boolean
  message: string
  data: WhatsNewBlockItem[]
}

export interface scheme {
  status: boolean
  message: string
  data: WhatsNewBlockItem[]
}

//analytic
import type { ChartSubType } from "@/components/home/analyticDashboard/chartRenderer"

// Common multilingual text
export interface MultiLangText {
  en: string
  hi: string
  ur: string
}

// Tabs
export interface Tab {
  id: number
  title: MultiLangText
  title_text: string
  is_active: boolean
}

// Chart Data
export interface ChartDataPoint {
  label: string
  value: string
}

export interface ChartSeries {
  name: string
  data: ChartDataPoint[]
}

export type ChartType = "line" | "bar" | "pie"

export type ChartLayout = "full" | "half"

export interface Chart {
  id: string
  title: string
  chartType: ChartType
  subType: ChartSubType
  layout: ChartLayout
  xAxisLabel: string
  yAxisLabel: string
  showLegend: boolean
  series: ChartSeries[]
}

// Table
export interface TableColumn {
  key: string
  label: string
}

export interface TableRow {
  [key: string]: string
}

export interface Table {
  title: string
  columns: TableColumn[]
  rows: TableRow[]
}

// Cards
export interface Card {
  id: number
  title: string
  value: string
}

// Section Data
export interface SectionData {
  id: number
  title: MultiLangText
  title_text: string
  charts: Chart[]
  table: Table | Table[] | []
  cards: Card[]
}

// Root Response
export interface DashboardResponse {
  status: boolean
  tabs: Tab[]
  data: SectionData[]
}

//contact types
export type ContactBodyRequest = {
  contact: string
  is_phone: boolean
}
