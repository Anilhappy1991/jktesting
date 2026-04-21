import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json")
    headers.set("x-api-key", import.meta.env.VITE_API_KEY)
    return headers
  },
})

/**
 * Interceptor — reads lang from URL and injects into every request automatically.
 * No component or endpoint needs to pass lang manually.
 *
 * URL: /hi/departments  →  API call: GET /departments?lang=hi
 */
const baseQueryWithLang: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Extract lang from browser URL: /en/about → "en"
  const pathSegments = window.location.pathname.split("/")
  const lang = pathSegments[1] || "en"

  if (typeof args === "string") {
    // String URL form: "departments" extracting here
    const separator = args.includes("?") ? "&" : "?"
    args = `${args}${separator}lang=${lang}`
  } else {
    //creating a common object
    // Object form: { url: "departments", params: { ... } }
    args = {
      ...args,
      params: { ...args.params, lang },
    }
  }

  return rawBaseQuery(args, api, extraOptions)
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLang,
  tagTypes: [
    "Auth",
    "Todo",
    "User",
    "Banners",
    "WhatsNew",
    "Hods",
    "KioskTabs",
    "KioskTabData",
    "Schemes",
    "EServices",
    "Stakeholders",
    "Gallery",
    "WhatsNewBlocks",
    "Orders",
    "Circulars",
    "Notices",
    "Notifications",
    "Departments",
    "Acts",
    "Faqs",
    "Tenders",
    "Achievements",
    "Newsletters",
    "VisitorCount",
    "Analytics",
    "SocialMedia",
    "footerLinks",
  ],
  endpoints: () => ({}),
})
