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

    while (repeated.length < 7) {
      repeated = [...repeated, ...hodData]
    }

    return repeated
  }, [hodData])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 px-4 py-14">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl"></div>

      {/* Header */}
      <div className="mb-10 space-y-3 text-center">
        <h2 className="animate-fadeIn text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
          {t("headings.ourHODs")}
        </h2>
      </div>

      {/* Slider */}
      <div className="mx-auto max-w-5xl">
        <BaseSwiper
          items={loopData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500, // smoother than 1000
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
          className="hod-swiper pt-5 pb-12"
          swiperProps={{
            spaceBetween: 20,
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
