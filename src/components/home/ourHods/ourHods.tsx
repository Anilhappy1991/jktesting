import "@/ourhod.css"
import { useRef, useMemo } from "react"
import type { SwiperRef } from "swiper/react"
import BaseSwiper from "@/components/common/baseSwiper"
import { useGetBottomHodsQuery } from "@/features/home/hodApi"
import HodCard from "./hodCard"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

export default function OurHods() {
  const swiperRef = useRef<SwiperRef>(null)
  const lang = useLang()
  const { t } = useTranslation()
  const { data } = useGetBottomHodsQuery({ lang })
  const hodData = data?.data || []

  const loopData = useMemo(() => {
    if (!hodData.length) return []

    let repeated = [...hodData]

    // minimum 9 slides required for stable centered loop
    while (repeated.length < 7) {
      repeated = [...repeated, ...hodData]
    }

    return repeated
  }, [hodData])

  return (
    <section className="bg-[slate-50] px-4 py-10">
      {/* Header */}
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-center text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
          {t("headings.ourHODs")}
        </h2>
      </div>

      {/* Slider */}
      <div className="mx-auto max-w-5xl">
        <BaseSwiper
          items={loopData}
          keyExtractor={(item, index) => `${item.id}-${index}`} // ✅ prevent duplicate key issue
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          showNavigation={true}
          showPagination={false}
          heightClass="h-auto"
          swiperRef={swiperRef}
          renderSlide={(hodData) => (
            <HodCard
              {...hodData}
              profile_image_url={hodData.profile_image_url ?? undefined}
            />
          )}
          className="hod-swiper pt-5 pb-10"
          swiperProps={{
            // loop: true,
            // centeredSlides: true,
            spaceBetween: 20,
            // loopAdditionalSlides: loopData.length,
            // watchSlidesProgress: false,
            breakpoints: {
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            },
          }}
        />
      </div>
    </section>
  )
}
