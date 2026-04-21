import { baseApi } from "@/api/baseApi"
import type { GetTenderParams, TenderResponse } from "./tendersType"
import { TENDER_ENDPOINTS } from "./endpoint"

export const tenderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Latest Tenders
     */
    getTenders: build.query<TenderResponse, GetTenderParams | void>({
      query: (params) => ({
        url: TENDER_ENDPOINTS.GET_LATEST,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Tenders"],
    }),

    /**
     *  Archived Tenders
     */
    getArchivedTenders: build.query<TenderResponse, GetTenderParams | void>({
      query: (params) => ({
        url: TENDER_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Tenders"],
    }),
  }),
})

export const { useGetTendersQuery, useGetArchivedTendersQuery } = tenderApi
