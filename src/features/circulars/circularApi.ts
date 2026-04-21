import { baseApi } from "@/api/baseApi"
import type { CircularResponse, GetCircularParams } from "./circularTypes"
import { CIRCULAR_ENDPOINTS } from "./endpoint"

export const circularApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCirculars: build.query<CircularResponse, GetCircularParams | void>({
      query: (params) => ({
        url: CIRCULAR_ENDPOINTS.GET_LATEST,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Circulars"],
    }),

    getArchivedCirculars: build.query<
      CircularResponse,
      GetCircularParams | void
    >({
      query: (params) => ({
        url: CIRCULAR_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Circulars"],
    }),
  }),
})

export const { useGetCircularsQuery, useGetArchivedCircularsQuery } =
  circularApi
