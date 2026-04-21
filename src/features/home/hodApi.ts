import { baseApi } from "@/api/baseApi"
import type { GetHodParams, HodResponse } from "./homeTypes"
import { HOD_ENDPOINTS } from "./endpoint"

export const hodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopHods: build.query<HodResponse, GetHodParams | void>({
      query: (params) => ({
        url: HOD_ENDPOINTS.GET_TOP_HODS,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Hods"],
    }),
    getBottomHods: build.query<HodResponse, GetHodParams | void>({
      query: (params) => ({
        url: HOD_ENDPOINTS.GET_BOTTOM_HODS,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Hods"],
    }),
  }),
})

export const { useGetTopHodsQuery, useGetBottomHodsQuery } = hodApi
