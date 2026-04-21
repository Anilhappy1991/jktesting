export interface NewsletterItem {
  id: number
  title: string
  document_url: string
  thumbnail_url: string | null
  formatted_date: string
  is_rtl: boolean
}

export interface NewsletterPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface NewsletterResponse {
  success: boolean
  pagination?: NewsletterPagination
  data: NewsletterItem[]
}

/**
 * Query Params
 */
export interface GetNewsletterParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
}
