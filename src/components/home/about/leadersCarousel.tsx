import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Controller } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import type { HodItem } from "@/features/home/homeTypes"
import { useGetTopHodsQuery } from "@/features/home/hodApi"
import { useLang } from "@/hooks/useLang"

const getLeaderImage = (leader: HodItem) => leader.profile_image_url || ""

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string")
      return error.message
    if ("status" in error)
      return `Failed to load leaders (${String(error.status)})`
  }
  return "Failed to load leaders."
}

function LeaderCard({ leader }: { leader: HodItem }) {
  return (
    <div className="h-full rounded-2xl bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-4">
      <div className="flex h-full flex-col items-center gap-4 md:flex-row">
        <div className="h-54 w-50 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow">
          <img
            src={getLeaderImage(leader)}
            alt={leader.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#0f3d69] md:text-[22px]">
            {leader.name}
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#0f3d69]">
            {leader.designation}
          </p>
          <p className="mt-1 max-w-md text-sm text-[#0f3d69]">
            {leader.department}
          </p>
        </div>
      </div>
    </div>
  )
}

const LeaderCarousel = () => {
  const lang = useLang()
  const {
    data: leaders,
    isLoading,
    isError,
    error,
  } = useGetTopHodsQuery({ lang })
  const [activeIndex, setActiveIndex] = useState(0)
  const mainSwiperRef = useRef<SwiperType | null>(null)
  const leaderItems = leaders?.data ?? []

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading...</div>
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        {getErrorMessage(error)}
      </div>
    )
  if (leaderItems.length === 0)
    return (
      <div className="p-6 text-center text-gray-400">No leaders found.</div>
    )

  const thumbCount = Math.min(4, leaderItems.length)

  return (
    <div className="flex w-[100%] flex-col justify-start gap-4 sm:w-[90%]">
      {/* ── Main Slide ── */}
      <div className="">
        <Swiper
          modules={[Autoplay, Controller]}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          // loop={leaderItems.length > 1}
          // autoplay={
          //   leaderItems.length > 1
          //     ? { delay: 3000, disableOnInteraction: false }
          //     : false
          // }
          className="h-[410px] rounded-2xl md:h-[260px]"
        >
          {leaderItems.map((item) => (
            <SwiperSlide key={item.id}>
              <LeaderCard leader={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* ── Thumbnail Strip ── */}
      <div
        className="flex justify-between gap-2"
        style={{ gridTemplateColumns: `repeat(${thumbCount}, minmax(0, 1fr))` }}
      >
        {leaderItems.map((item, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveIndex(index)
                // slideTo uses real index; loop duplicates offset by 1
                mainSwiperRef.current?.slideToLoop(index)
              }}
              className={`overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none sm:h-[100px] sm:w-[110px] ${
                isActive
                  ? "scale-105 border-blue-500 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <img
                src={getLeaderImage(item)}
                alt={item.name}
                className="h-auto w-full rounded-[12px] object-cover sm:h-28 sm:object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LeaderCarousel
