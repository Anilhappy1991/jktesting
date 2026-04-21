import { baseApi } from "@/api/baseApi"
import { FAQ_ENDPOINTS } from "./endpoint"
import type { FaqResponse, GetFaqParams } from "./faqsTypes"

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqs: build.query<FaqResponse, GetFaqParams | void>({
      query: (params) => ({
        url: FAQ_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Faqs"],
    }),
  }),
})

export const { useGetFaqsQuery } = faqApi
