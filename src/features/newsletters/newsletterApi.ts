import { baseApi } from "@/api/baseApi"
import { NEWSLETTER_ENDPOINTS } from "./endpoints"
import type { GetNewsletterParams, NewsletterResponse } from "./newsletterTypes"

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Latest Newsletters
     */
    getNewsletters: build.query<NewsletterResponse, GetNewsletterParams | void>(
      {
        query: (params) => ({
          url: NEWSLETTER_ENDPOINTS.GET_LATEST,
          method: "GET",
          ...(params ? { params } : {}),
        }),
        providesTags: ["Newsletters"],
      }
    ),

    /**
     *  Archived Newsletters
     */
    getArchivedNewsletters: build.query<
      NewsletterResponse,
      GetNewsletterParams | void
    >({
      query: (params) => ({
        url: NEWSLETTER_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Newsletters"],
    }),
  }),
})

export const { useGetNewslettersQuery, useGetArchivedNewslettersQuery } =
  newsletterApi
