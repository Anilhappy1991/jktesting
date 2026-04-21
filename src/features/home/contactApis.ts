import { baseApi } from "@/api/baseApi"
import type { ContactBodyRequest } from "./homeTypes"

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendContactData: build.mutation({
      query: (contactData: ContactBodyRequest) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
})

export const { useSendContactDataMutation } = contactApi
