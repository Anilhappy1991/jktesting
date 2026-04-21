import { baseApi } from "@/api/baseApi"

// import { SCHEME_ENDPOINTS } from "./constants/endpoints"
import type {
  GetSchemeBySlugParams,
  GetSchemesParams,
  SchemeDetailResponse,
  SchemeListResponse,
} from "./homeTypes"
import { SCHEME_ENDPOINTS } from "./endpoint"

export const schemeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSchemes: build.query<SchemeListResponse, GetSchemesParams | void>({
      query: (params) => ({
        url: SCHEME_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Schemes"],
    }),
    getHomeSchemes: build.query<SchemeListResponse, GetSchemesParams | void>({
      query: (params) => ({
        url: SCHEME_ENDPOINTS.GET_HOME_SCHEMES,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Schemes"],
    }),

    /**
     *  Get Scheme Detail by Slug
     */
    getSchemeBySlug: build.query<SchemeDetailResponse, GetSchemeBySlugParams>({
      query: ({ slug, ...params }) => ({
        url: SCHEME_ENDPOINTS.GET_BY_SLUG(slug),
        method: "GET",
        ...(Object.keys(params).length ? { params } : {}),
      }),
      providesTags: (_result, _error, { slug }) => [
        { type: "Schemes", id: slug },
      ],
    }),
  }),
})

export const {
  useGetSchemesQuery,
  useGetSchemeBySlugQuery,
  useGetHomeSchemesQuery,
} = schemeApi
