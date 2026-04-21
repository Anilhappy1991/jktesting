import { baseApi } from "@/api/baseApi"
import { ANALYTICS_ENDPOINTS } from "./endpoint"
import type { DashboardResponse, LanguageParams } from "./homeTypes"

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<DashboardResponse, LanguageParams | void>({
      query: () => ANALYTICS_ENDPOINTS.GET_ANALYTICS,
      providesTags: ["Analytics"],
    }),
  }),
})

export const { useGetAnalyticsQuery } = analyticsApi
