import { baseApi } from "@/api/baseApi"
import type { VisitorCountResponse, GetVisitorParams } from "./counterTypes"
import { VISITOR_ENDPOINTS } from "./endpoints"
import { CIRCULAR_ENDPOINTS } from "../circulars/endpoint"

export const visitorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getVisitorCount: build.query<VisitorCountResponse, GetVisitorParams | void>(
      {
        query: (params) => ({
          url: VISITOR_ENDPOINTS.GET_VISITOR_COUNT,
          method: "GET",
          ...(params ? { params } : {}),
        }),
        providesTags: ["VisitorCount"],
      }
    ),

    getArchivedCirculars: build.query<
      VisitorCountResponse,
      GetVisitorParams | void
    >({
      query: (params) => ({
        url: CIRCULAR_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["VisitorCount"],
    }),
  }),
})

export const { useGetVisitorCountQuery } = visitorApi
