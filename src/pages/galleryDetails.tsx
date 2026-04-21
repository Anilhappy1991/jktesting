import { skipToken } from "@reduxjs/toolkit/query"
import { useEffect, useMemo, useRef } from "react"
import { useParams } from "react-router-dom"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

import { useGetGalleryBySlugQuery } from "@/features/home/galleryApi"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { getImageUrl } from "@/utils/getImageUrl"
import { useLang } from "@/hooks/useLang"

export default function GalleryDetails() {
  const lang = useLang()
  const { slug } = useParams<{ slug: string }>()
  const galleryRef = useRef<HTMLDivElement>(null)

  const galleryQuery = useGetGalleryBySlugQuery(
    slug ? { lang, slug } : skipToken
  )

  const images = useMemo(() => {
    return (
      galleryQuery.data?.data.map((item) => ({
        ...item,
        image_url: getImageUrl(item.image_url),
      })) ?? []
    )
  }, [galleryQuery.data?.data])

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      Toolbar: { display: ["close"] },
      dragToClose: true,
      infinite: true,
    } as any)

    return () => Fancybox.destroy()
  }, [])

  if (!slug) {
    return (
      <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Wrong page</h1>
        <p className="mt-3 text-sm text-slate-600">
          The gallery page you are trying to open is not available.
        </p>
      </div>
    )
  }

  if (galleryQuery.isLoading) {
    return (
      <section className="space-y-8 px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-56 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </section>
    )
  }

  if (galleryQuery.isError || images.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Wrong page</h1>
        <p className="mt-3 text-sm text-slate-600">
          No gallery images were found for this page.
        </p>
      </div>
    )
  }

  return (
    <>
      <MetaTagGenerator title={"Gallery Details"} />
      <section className="w-full px-4 py-7 text-black sm:px-6 lg:px-10 xl:px-20">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          ref={galleryRef}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <a
                data-fancybox="gallery"
                href={image.image_url}
                data-caption={image.title}
                className="block aspect-[4/3] overflow-hidden bg-slate-100"
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
