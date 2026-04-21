import { useMemo, useRef, useState } from "react"
import type { SwiperRef } from "swiper/react"
import BaseSwiper from "../common/baseSwiper"
import { useGetAllBannersQuery } from "@/features/home/bannerApi"
import type { BannerItem } from "@/features/home/homeTypes"

// import HomeCarouselSkeleton from "./HomeCarouselSkeleton";

function BannerSlide({ item }: { item: BannerItem }) {
  const imageUrl = `${item.banner}`

  return (
    <div className="h-full w-full bg-black">
      {item.banner_type === "image" ? (
        <img
          src={imageUrl}
          alt="banner"
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          src={imageUrl}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </div>
  )
}

export default function HomeCarousel() {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const { data, isLoading, isError } = useGetAllBannersQuery()

  const sortedBanners = useMemo(() => {
    if (!data?.data) return []
    return [...data.data].sort((a, b) => a.banner_position - b.banner_position)
  }, [data])

  if (isLoading || isError || sortedBanners.length === 0) {
    return <HomeCarouselSkeleton />
  }

  const showCarouselNavigation = sortedBanners.length > 1

  const renderNavigation = (className: string) => (
    <div className={className}>
      {sortedBanners.map((item, index) => {
        const isActive = activeSlide === index

        return (
          <button
            key={`${item.banner}-${index}`}
            type="button"
            aria-label={`Go to banner ${index + 1}`}
            aria-current={isActive}
            onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
            className={`h-[15px] w-[15px] rounded-full border-2 border-white transition-colors ${
              isActive ? "bg-[#1f4e79]" : "bg-gray-400"
            }`}
          />
        )
      })}
    </div>
  )

  return (
    <div className="w-full">
      <div className="relative">
        <BaseSwiper
          items={sortedBanners}
          keyExtractor={(item) => item.banner}
          heightClass="h-[400px]"
          className="h-full"
          showNavigation={false}
          showPagination={false}
          swiperRef={swiperRef}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          swiperProps={{
            mousewheel: false,
            keyboard: { enabled: true },
            speed: 1200,
            fadeEffect: { crossFade: true },
            onSlideChange: (swiper) => setActiveSlide(swiper.realIndex),
          }}
          renderSlide={(item) => <BannerSlide item={item} />}
        />

        {showCarouselNavigation &&
          renderNavigation(
            "absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 flex-col gap-3 sm:flex cursor-pointer"
          )}
      </div>

      {showCarouselNavigation &&
        renderNavigation(
          "-mt-6 relative z-[100] sm:mt-4 flex justify-center gap-3 sm:hidden cursor-pointer"
        )}
    </div>
  )
}

export function HomeCarouselSkeleton() {
  return (
    <div className="relative h-[350px] w-full">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6">
        <div className="h-4 w-32 rounded bg-white/70" />
        <div className="h-6 w-48 rounded bg-white/70" />
        <div className="h-4 w-64 rounded bg-white/70" />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>
    </div>
  )
}
