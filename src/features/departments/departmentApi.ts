import { baseApi } from "@/api/baseApi"
import type {
  DepartmentDetailResponse,
  DepartmentListResponse,
  GetDepartmentBySlugParams,
  GetDepartmentParams,
} from "./departmentTypes"
// import { DEPARTMENT_ENDPOINTS } from "./endpoint"
import { DEPARTMENT_ENDPOINTS } from "./endpoint"

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Get All Departments
     */
    getDepartments: build.query<
      DepartmentListResponse,
      GetDepartmentParams | void
    >({
      query: (params) => ({
        url: DEPARTMENT_ENDPOINTS.GET_ALL,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Departments"],
    }),

    /**
     *  Get Department By Slug
     */
    getDepartmentBySlug: build.query<
      DepartmentDetailResponse,
      GetDepartmentBySlugParams
    >({
      query: ({ slug, ...params }) => ({
        url: DEPARTMENT_ENDPOINTS.GET_BY_SLUG(slug),
        method: "GET",
        ...(Object.keys(params).length ? { params } : {}),
      }),
      providesTags: (_result, _error, { slug }) => [
        { type: "Departments", id: slug },
      ],
    }),
  }),
})

export const { useGetDepartmentsQuery, useGetDepartmentBySlugQuery } =
  departmentApi
