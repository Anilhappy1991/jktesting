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
    <div
      className="bg-cover bg-center py-8"
      style={{
        backgroundImage: "url('/images/jk_bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
          {t("headings.ourSchemes")}
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {schemesData?.data?.map((item, index) => {
            if (
              item.short_description == null ||
              item.short_description.trim() === ""
            ) {
              return null // Skip rendering if short_description is null or empty
            }
            return (
              <SwiperSlide key={index}>
                <div>
                  <div className="w-full px-4 py-7 sm:px-6 lg:px-10 xl:px-20">
                    <div className="grid-cols-1 items-center gap-10 sm:grid-cols-2 md:grid md:grid-cols-3">
                      {/* Left Content */}
                      <div className="order-2 col-span-2 text-center md:order-1 md:text-left">
                        <h3 className="mb-4 text-2xl font-semibold">
                          {item.title}
                        </h3>

                        {item?.short_description != null &&
                        item.short_description.trim() !== "" ? (
                          <div className="mb-2 text-justify leading-relaxed text-gray-700 sm:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
                            {parse(item.short_description)}
                          </div>
                        ) : null}

                        <button
                          onClick={() => window.open(item.link, "_blank")}
                          className="mt-4 mb-4 cursor-pointer rounded-md bg-[#1f4e79] px-6 py-2 text-white hover:bg-blue-900 sm:mt-6 sm:mb-1"
                        >
                          {t("headings.exploreMore")}
                        </button>
                      </div>

                      {/* Right Image */}
                      <div className="order-1 flex justify-center md:order-2">
                        <img
                          src={item?.home_image}
                          alt="scheme"
                          className="h-auto w-[320px] rounded-md shadow-md"
                        />
                      </div>
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
