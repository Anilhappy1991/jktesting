import { baseApi } from "@/api/baseApi"
import { WHATSNEW_BLOCK_ENDPOINTS } from "./endpoint"
import type { LanguageParams, WhatsNewBlockResponse } from "./homeTypes"

export const whatsNewBlockApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWhatsNewBlocks: build.query<
      WhatsNewBlockResponse,
      LanguageParams | void
    >({
      query: () => ({
        url: WHATSNEW_BLOCK_ENDPOINTS.GET_ALL,
        method: "GET",
      }),
      providesTags: ["WhatsNewBlocks"],

      transformResponse: (response: WhatsNewBlockResponse) => ({
        ...response,
        data: [...response.data].sort((a, b) => a.show_order - b.show_order),
      }),
    }),
  }),
})

export const { useGetWhatsNewBlocksQuery } = whatsNewBlockApi
