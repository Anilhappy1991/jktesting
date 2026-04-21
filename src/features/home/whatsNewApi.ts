import { baseApi } from "@/api/baseApi"
import type { GetWhatsNewParams, WhatsNewResponse } from "./homeTypes"
import { WHATS_NEW_ENDPOINTS } from "./endpoint"

export const whatsNewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWhatsNew: build.query<WhatsNewResponse, GetWhatsNewParams | void>({
      query: (params) => ({
        url: WHATS_NEW_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["WhatsNew"],
    }),
  }),
})

export const { useGetWhatsNewQuery } = whatsNewApi
