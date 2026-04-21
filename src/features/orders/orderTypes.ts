import type { Pagination } from "../notices/noticeTypes"

export interface OrderItem {
  id: number
  title: string
  subtitle: string
  document_url: string
  doc_date: string
  formatted_date: string
  is_rtl: boolean
}

export interface OrderResponse {
  success: boolean
  data: OrderItem[]
  pagination: Pagination
}

/**
 * Query Params
 */
export interface GetOrdersParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
  search?: string
  year?: number | string
  month?: number | string
}
