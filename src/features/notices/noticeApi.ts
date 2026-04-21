import { baseApi } from "@/api/baseApi"
import type { GetNoticeParams, NoticeResponse } from "./noticeTypes"
import { NOTICE_ENDPOINTS } from "./endpoints"

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotices: build.query<NoticeResponse, GetNoticeParams | void>({
      query: (params) => ({
        url: NOTICE_ENDPOINTS.GET_LATEST,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Notices"],
    }),

    getArchivedNotices: build.query<NoticeResponse, GetNoticeParams | void>({
      query: (params) => ({
        url: NOTICE_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Notices"],
    }),
  }),
})

export const { useGetNoticesQuery, useGetArchivedNoticesQuery } = noticeApi
