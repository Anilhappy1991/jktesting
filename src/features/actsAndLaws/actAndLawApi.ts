import { baseApi } from "@/api/baseApi"
import type { ActsResponse, GetActsParams } from "./actsTypes"
import { ACTS_ENDPOINTS } from "./endpoint"

export const actsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActs: build.query<ActsResponse, GetActsParams | void>({
      query: (params) => ({
        url: ACTS_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Acts"],

      // optional: sort by show_order
      transformResponse: (response: ActsResponse) => ({
        ...response,
        data: [...response.data].sort((a, b) => a.show_order - b.show_order),
      }),
    }),
  }),
})

export const { useGetActsQuery } = actsApi
