export interface AchievementItem {
  id: number
  year: string
  title: string
  content: string
  image: string
}

export interface AchievementResponse {
  status: boolean
  data: AchievementItem[]
}

export interface GetAchievementParams {
  lang?: "en" | "hi" | "ur" | string
}
