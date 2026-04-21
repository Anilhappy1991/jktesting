import { baseApi } from "@/api/baseApi"
import { SOCIAL_MEDIA_ENDPOINTS } from "./endpoints"
import type { GetSocialParams, SocialMediaResponse } from "./socialMediaTypes"
// import { SOCIAL_MEDIA_ENDPOINTS } from "./endpoint"
// import type { GetSocialParams, SocialMediaResponse } from "./socialmediaType"

export const socialMediaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Get Social Media
     */
    getSocialMedia: build.query<SocialMediaResponse, void>({
      query: () => ({
        url: SOCIAL_MEDIA_ENDPOINTS.GET_LATEST,
        method: "GET",
      }),
      providesTags: ["SocialMedia"],
    }),

    /**
     *  Get Archived Social Media
     */
    getArchivedSocialMedia: build.query<
      SocialMediaResponse,
      GetSocialParams | void
    >({
      query: (params) => ({
        url: SOCIAL_MEDIA_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["SocialMedia"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetSocialMediaQuery, useGetArchivedSocialMediaQuery } =
  socialMediaApi
