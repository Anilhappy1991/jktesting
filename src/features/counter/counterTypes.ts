export interface VisitorCountResponse {
  success: boolean
  message: string
  data: VisitorData
}

export interface VisitorData {
  unique_visitors: number
  date: string
}

export interface GetVisitorParams {}
