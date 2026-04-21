import { baseApi } from "@/api/baseApi"

import { ACHIEVEMENT_ENDPOINTS } from "./endpoint"
import type { AchievementResponse, GetAchievementParams } from "./types"

export const achievementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAchievements: build.query<
      AchievementResponse,
      GetAchievementParams | void
    >({
      query: (params) => ({
        url: ACHIEVEMENT_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Achievements"],
    }),
  }),
})

export const { useGetAchievementsQuery } = achievementApi
