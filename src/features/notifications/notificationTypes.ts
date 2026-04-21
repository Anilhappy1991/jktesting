export interface NotificationItem {
  id: number
  notification_detail: string
  document_url: string
  document_og_name: string
  is_new: boolean
}

export interface NotificationResponse {
  status: boolean
  lang: string
  data: NotificationItem[]
}

/**
 * Query Params
 */
export interface GetNotificationParams {
  lang?: "en" | "hi" | "ur" | string
  page?: number
  per_page?: number
  search?: string
  year?: number | string
  month?: number | string
}
