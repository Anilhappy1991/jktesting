import { baseApi } from "@/api/baseApi"
import { ORDER_ENDPOINTS } from "./endpoint"
import type { GetOrdersParams, OrderResponse } from "./orderTypes"

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrderResponse, GetOrdersParams | void>({
      query: (params) => ({
        url: ORDER_ENDPOINTS.GET_LATEST,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Orders"],
    }),

    getArchivedOrders: build.query<OrderResponse, GetOrdersParams | void>({
      query: (params) => ({
        url: ORDER_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Orders"],
    }),
  }),
})

export const { useGetOrdersQuery, useGetArchivedOrdersQuery } = orderApi
