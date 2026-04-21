export interface FaqItem {
  id: number
  question: string
  answer: string
}

export interface FaqResponse {
  status: boolean
  message: string
  data: FaqItem[]
}

/**
 * Query Params
 */
export interface GetFaqParams {
  lang?: "en" | "hi" | "ur" | string
}
