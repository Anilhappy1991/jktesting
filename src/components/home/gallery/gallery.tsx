import { useMemo } from "react"

import { useGetGalleryCategoriesQuery } from "@/features/home/galleryApi"

import GalleryCard, { type GalleryUIItem } from "./galleryCard"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

export default function ExploreGallery() {
  const lang = useLang()
  const { t } = useTranslation()
  const {
    data: galleryData,
    isLoading,
    isError,
  } = useGetGalleryCategoriesQuery({ lang })

  const galleryItems = useMemo<GalleryUIItem[]>(() => {
    return (
      galleryData?.data?.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.top_image,
        slug: item.slug,
      })) || []
    )
  }, [galleryData])

  if (isLoading) {
    return <p className="py-10 text-center">Loading...</p>
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-red-500">Failed to load gallery</p>
    )
  }

  return (
    <section className="w-full bg-[#f4f5f7] px-4 py-14 md:px-20">
      <div className="mb-10 text-center">
        <h2 className="text-center text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
          {t("headings.exploreGallery")}
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
