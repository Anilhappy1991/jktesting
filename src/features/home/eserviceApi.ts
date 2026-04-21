import { baseApi } from "@/api/baseApi"
import type { EServiceResponse, GetEServiceParams } from "./homeTypes"
import { E_SERVICE_ENDPOINTS } from "./endpoint"

export const eServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEServices: build.query<EServiceResponse, GetEServiceParams | void>({
      query: (params) => ({
        url: E_SERVICE_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["EServices"],
    }),
  }),
})

export const { useGetEServicesQuery } = eServiceApi
