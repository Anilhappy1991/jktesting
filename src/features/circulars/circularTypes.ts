import type { Pagination } from "../notices/noticeTypes"

export interface CircularItem {
  id: number
  title: string
  subtitle: string | null
  document_url: string
  doc_date: string
  formatted_date: string
  is_rtl: boolean
}

export interface CircularResponse {
  success: boolean
  data: CircularItem[]
  pagination: Pagination
}

/**
 * Query Params
 */
export interface GetCircularParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
  search?: string
  year?: number | string
  month?: number | string
}
