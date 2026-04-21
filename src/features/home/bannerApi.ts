import { baseApi } from "@/api/baseApi"
import type { BannerResponse } from "./homeTypes"
import { BANNER_ENDPOINTS } from "./endpoint"

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBanners: build.query<BannerResponse, void>({
      query: () => BANNER_ENDPOINTS.getallBanners,
      providesTags: ["Banners"],
    }),
  }),
})

export const { useGetAllBannersQuery } = bannerApi
