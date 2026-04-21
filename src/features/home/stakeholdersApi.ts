import { baseApi } from "@/api/baseApi"
import { STAKEHOLDER_ENDPOINTS } from "./endpoint"
import type { StakeholderResponse } from "./homeTypes"
// import type { StakeholderResponse } from "./stakeholder.types"
// import { STAKEHOLDER_ENDPOINTS } from "./constants/endpoints"

export const stakeholderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStakeholders: build.query<StakeholderResponse, void>({
      query: () => ({
        url: STAKEHOLDER_ENDPOINTS.GET_ALL,
        method: "GET",
      }),
      providesTags: ["Stakeholders"],
    }),
  }),
})

export const { useGetStakeholdersQuery } = stakeholderApi
