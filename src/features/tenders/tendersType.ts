export interface TenderItem {
  id: number
  reference_no: string | null
  tender_detail: string
  opening_date: string | null
  closing_date: string | null
  document_url: string
}

export interface TenderPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface TenderResponse {
  status: boolean
  lang: string
  pagination?: TenderPagination
  data: TenderItem[]
}

/**
 * Query Params
 */
export interface GetTenderParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
  search?: string
}
