export interface ActItem {
  id: number
  title: string
  document_url: string
  act_date: string
  formatted_date: string
  is_rtl: boolean
  show_order: number
}

export interface ActsResponse {
  status: boolean
  data: ActItem[]
}

/**
 * Query Params
 */
export interface GetActsParams {
  lang?: "en" | "hi" | "ur" | string
}
