import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"

import { Card, CardContent } from "@/components/ui/card"

const slides = [
  {
    id: 1,
    image: "/images/ulb_banner1.jpg",
    mobileImage: "/images/ulb_banner1_mobile.jpeg",
    title: "Property Management Portal",
  },
  {
    id: 2,
    image: "/images/ulb_banner2.jpg",
    mobileImage: "/images/ulb_banner2_mobile.jpeg",
    title: "Meeting Conference",
  },
]

export default function UlbBannerSlider() {
  return (
    <div className="w-full" id="home">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        fadeEffect={{ crossFade: true }}
        loop
        className="rounded-0 py-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Card className="overflow-hidden rounded-none py-0 shadow-lg">
              <CardContent className="rounded-0 p-0">
                <div className="relative h-auto w-full sm:h-[250px] lg:h-[450px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hidden h-full w-full object-cover md:block"
                  />
                  <img
                    src={slide.mobileImage}
                    alt={slide.title}
                    className="block h-full w-full object-cover md:hidden"
                  />
                  {/* <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  /> */}
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
