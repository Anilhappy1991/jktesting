import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { useGetHomeSchemesQuery } from "@/features/home/schemaApi"
import parse from "html-react-parser"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const OurSchemes = () => {
  const lang = useLang()
  const { t } = useTranslation()
  const { data: schemesData } = useGetHomeSchemesQuery({ lang })

  return (
    <div className="relative overflow-hidden py-12">
      {/*  Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#d8e3f8] via-[#f0f6ff] to-[#d8e3f8]"></div> */}

      {/*  Animated Overlay */}
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20%_20%,#1f4e79_2px,transparent_2px),url('/images/jk_bg.jpg')] bg-[length:40px_40px,cover] bg-center bg-no-repeat"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="mb-5 text-center text-2xl font-medium tracking-tight text-[#1f4e79] sm:text-2xl md:text-3xl">
          {t("headings.ourSchemes")}
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="pb-10"
        >
          {schemesData?.data?.map((item, index) => {
            if (!item?.short_description?.trim()) return null

            return (
              <SwiperSlide key={index}>
                <div className="px-4 py-6 sm:px-6 lg:px-10 xl:px-20">
                  {/*  Card Animation */}
                  <div className="grid items-center gap-10 rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:grid-cols-3">
                    {/* Left Content */}
                    <div className="animate-fadeInUp col-span-2 text-center md:text-left">
                      <h3 className="mb-4 text-2xl font-semibold text-[#1f3f77]">
                        {item.title}
                      </h3>

                      <div className="mb-4 text-justify leading-relaxed text-gray-700 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
                        {parse(item.short_description)}
                      </div>

                      <button
                        onClick={() => window.open(item.link, "_blank")}
                        className="mt-4 rounded-md bg-[#1f4e79] px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-900 active:scale-95"
                      >
                        {t("headings.exploreMore")}
                      </button>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center">
                      <img
                        src={item?.home_image}
                        alt="scheme"
                        className="w-[320px] rounded-xl shadow-md transition-all duration-500 hover:scale-105 hover:rotate-1"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default OurSchemes
