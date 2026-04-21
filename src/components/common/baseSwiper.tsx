import { useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
  Thumbs,
  FreeMode,
  Keyboard,
  Mousewheel,
} from "swiper/modules"
import type { SwiperRef, SwiperProps } from "swiper/react"
import type { AutoplayOptions, PaginationOptions } from "swiper/types"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "swiper/css/effect-coverflow"
import "swiper/css/thumbs"
import "swiper/css/free-mode"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SwiperEffect = "slide" | "fade" | "coverflow"

export interface BaseSwiperProps<T> {
  /** Array of data items to render as slides */
  items: T[]

  /** Render function for each slide */
  renderSlide: (item: T, index: number) => React.ReactNode

  /** Optional render function for thumbnail slides (if showThumbs is true) */
  thumbRenderSlide?: (item: T, index: number) => React.ReactNode

  /** Unique key extractor for each item */
  keyExtractor?: (item: T, index: number) => string | number

  // ── Layout ──────────────────────────────────────────────────────────────
  /** Number of slides visible at once. Use "auto" to size by slide width */
  slidesPerView?: number | "auto"
  /** Space between slides in px */
  spaceBetween?: number
  /** Extra class on the outer wrapper div */
  className?: string
  /** Height of the swiper (Tailwind class, e.g. "h-64") */
  heightClass?: string

  // ── Behaviour ───────────────────────────────────────────────────────────
  effect?: SwiperEffect
  loop?: boolean
  autoplay?: boolean | AutoplayOptions
  freeMode?: boolean
  centeredSlides?: boolean
  /** Expose the swiper instance via a ref */
  swiperRef?: React.RefObject<SwiperRef | null>

  // ── UI Controls ─────────────────────────────────────────────────────────
  showNavigation?: boolean
  showPagination?: boolean | PaginationOptions
  /** Show a thumbnail strip below the main swiper */
  showThumbs?: boolean
  /** Slides visible in the thumbnail strip */
  thumbsPerView?: number

  // ── Passthrough ─────────────────────────────────────────────────────────
  /** Any extra Swiper props not covered above */
  swiperProps?: Omit<SwiperProps, "modules">
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EFFECT_MODULES = {
  slide: [],
  fade: [EffectFade],
  coverflow: [EffectCoverflow],
} as const

// ─── Component ────────────────────────────────────────────────────────────────

export function BaseSwiper<T>({
  items,
  renderSlide,
  thumbRenderSlide,
  keyExtractor,
  slidesPerView = 1,
  spaceBetween = 0,
  className = "",
  heightClass = "h-64",
  effect = "slide",
  loop = false,
  autoplay = false,
  freeMode = false,
  centeredSlides = false,
  swiperRef,
  showNavigation = true,
  showPagination = true,
  showThumbs = false,
  thumbsPerView = 4,
  swiperProps,
}: BaseSwiperProps<T>) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const canLoop = loop && items.length > 1
  const { effect: swiperPropsEffect, ...restSwiperProps } = swiperProps ?? {}
  const resolvedEffect: SwiperEffect =
    swiperPropsEffect === "fade" ||
    swiperPropsEffect === "coverflow" ||
    swiperPropsEffect === "slide"
      ? (swiperPropsEffect as SwiperEffect)
      : effect

  const modules = [
    Navigation,
    Pagination,
    Autoplay,
    Thumbs,
    FreeMode,
    Keyboard,
    Mousewheel,
    ...EFFECT_MODULES[resolvedEffect],
  ]

  const autoplayConfig: AutoplayOptions | false =
    autoplay === true
      ? { delay: 3000, disableOnInteraction: false }
      : autoplay === false
        ? false
        : autoplay

  const paginationConfig =
    showPagination === true
      ? { clickable: true }
      : showPagination === false
        ? false
        : showPagination

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* ── Main Swiper ── */}
      <Swiper
        ref={swiperRef}
        modules={modules}
        effect={resolvedEffect}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={canLoop}
        centeredSlides={centeredSlides}
        freeMode={freeMode}
        autoplay={items.length > 1 ? autoplayConfig || undefined : undefined}
        navigation={showNavigation}
        pagination={paginationConfig || undefined}
        thumbs={
          showThumbs && thumbsSwiper && !thumbsSwiper.destroyed
            ? { swiper: thumbsSwiper }
            : undefined
        }
        className={`w-full ${heightClass}`}
        {...restSwiperProps}
      >
        {items.map((item, i) => (
          <SwiperSlide
            key={keyExtractor ? keyExtractor(item, i) : i}
            className="h-full"
          >
            {renderSlide(item, i)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Thumb Strip ── */}
      {showThumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          slidesPerView={thumbsPerView}
          spaceBetween={8}
          freeMode
          watchSlidesProgress
          slideToClickedSlide
          className="h-20 w-full rounded-lg"
        >
          {items.map((item, i) => (
            <SwiperSlide
              key={keyExtractor ? keyExtractor(item, i) : i}
              className="h-full cursor-pointer opacity-50 transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
            >
              {thumbRenderSlide
                ? thumbRenderSlide(item, i)
                : renderSlide(item, i)}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default BaseSwiper
