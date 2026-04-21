import { baseApi } from "@/api/baseApi"
import { GALLERY_ENDPOINTS } from "./endpoint"
import type {
  GalleryBySlugResponse,
  GalleryCategoryResponse,
  GalleryParams,
  GetGalleryBySlugParams,
} from "./homeTypes"

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     *  Get Gallery Categories
     */
    getGalleryCategories: build.query<
      GalleryCategoryResponse,
      GalleryParams | void
    >({
      query: (params) => ({
        url: GALLERY_ENDPOINTS.GET_CATEGORIES,
        method: "GET",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Gallery"],
    }),

    /**
     *  Get Gallery Images by Slug
     */
    getGalleryBySlug: build.query<
      GalleryBySlugResponse,
      GetGalleryBySlugParams
    >({
      query: ({ slug, ...params }) => ({
        url: GALLERY_ENDPOINTS.GET_BY_SLUG(slug),
        method: "GET",
        ...(Object.keys(params).length ? { params } : {}),
      }),
      providesTags: (_result, _error, { slug }) => [
        { type: "Gallery", id: slug },
      ],
    }),
  }),
})

export const { useGetGalleryCategoriesQuery, useGetGalleryBySlugQuery } =
  galleryApi
