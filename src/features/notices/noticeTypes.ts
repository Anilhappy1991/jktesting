export interface NoticeItem {
  id: number
  title: string
  subtitle: string | null
  document_url: string
  doc_date: string
  formatted_date: string
  is_rtl: boolean
}

export interface NoticeResponse {
  success: boolean
  data: NoticeItem[]
  pagination: Pagination
}
export interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url: string | null
  prev_page_url: string | null
}
/**
 * Query Params
 */
export interface GetNoticeParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
  search?: string
  year?: number | string
  month?: number | string
}
