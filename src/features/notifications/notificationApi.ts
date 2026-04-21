import { baseApi } from "@/api/baseApi"
import type {
  GetNotificationParams,
  NotificationResponse,
} from "./notificationTypes"
import { NOTIFICATION_ENDPOINTS } from "./endpoints"

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<
      NotificationResponse,
      GetNotificationParams | void
    >({
      query: (params) => ({
        url: NOTIFICATION_ENDPOINTS.GET_LATEST,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Notifications"],
    }),

    getArchivedNotifications: build.query<
      NotificationResponse,
      GetNotificationParams | void
    >({
      query: (params) => ({
        url: NOTIFICATION_ENDPOINTS.GET_ARCHIVED,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Notifications"],
    }),
  }),
})

export const { useGetNotificationsQuery, useGetArchivedNotificationsQuery } =
  notificationApi
