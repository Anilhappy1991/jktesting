import { baseApi } from "@/api/baseApi"
import type { FooterResponse } from "./footerTypes"
import type { LanguageParams } from "../home/homeTypes"
import { FOOTER_ENDPOINTS } from "./enpoint"
// import { FOOTER_ENDPOINTS } from "./endpoint"

export const footerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFooterLinks: build.query<FooterResponse, LanguageParams | void>({
      query: (params) => ({
        url: FOOTER_ENDPOINTS.GET_FOOTER_LINKS,
        method: "GET",
        ...(params ? params : {}),
      }),
      providesTags: ["footerLinks"],
    }),
  }),
})

export const { useGetFooterLinksQuery } = footerApi
