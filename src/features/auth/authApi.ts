import { baseApi } from "@/api/baseApi"
import type { LoginResponse } from "./authTypes"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    getMe: build.query<LoginResponse, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi
