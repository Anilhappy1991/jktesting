import { baseApi } from "@/api/baseApi"
import type { GetKioskTabDataParams, KioskTabDataResponse } from "./homeTypes"
import { KIOSK_TABS_ENDPOINTS } from "./endpoint"

export const kioskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getKioskTabData: build.query<KioskTabDataResponse, GetKioskTabDataParams>({
      query: ({ tabId, ...params }) => ({
        url: KIOSK_TABS_ENDPOINTS.GET_TAB_DATA(tabId),
        method: "GET",
        ...(Object.keys(params).length ? { params } : {}),
      }),
      providesTags: ["KioskTabData"],
    }),
  }),
})

export const { useGetKioskTabDataQuery } = kioskApi
