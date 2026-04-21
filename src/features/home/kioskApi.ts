import { baseApi } from "@/api/baseApi"

// import { KIOSK_ENDPOINTS } from "./constants/endpoints"
import type { GetKioskTabsParams, KioskTabResponse } from "./homeTypes"
import { KIOSK_ENDPOINTS } from "./endpoint"

export const kioskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getKioskTabs: build.query<KioskTabResponse, GetKioskTabsParams | void>({
      query: (params) => ({
        url: KIOSK_ENDPOINTS.GET_TABS,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["KioskTabs"],
    }),
  }),
})

export const { useGetKioskTabsQuery } = kioskApi
