import { Card, CardContent } from "@/components/ui/card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const services = [
  { title: "Property Tax", img: "/images/service1.png" },
  { title: "Birth/Death Certificate", img: "/images/service2.png" },
  { title: "Register Complaint", img: "/images/service3.png" },
  { title: "Public Notices", img: "/images/service4.png" },
  { title: "Public Grievance", img: "/images/public.png" },
  { title: "Building Permission", img: "/images/service6.png" },
  { title: "Jammu Smart City", img: "/images/service7.png" },
  { title: "Council Update", img: "/images/service8.png" },
]

export default function CitizeneServicesSection() {
  return (
    <section id="ulbesservices" className="px-4 sm:px-6 lg:px-10 xl:px-18">
      <div className="container mx-auto pt-0 sm:pt-10">
        <div className="text-center">
          <div className="container mx-auto px-4 py-5 text-center">
            <p className="mb-2 text-xs font-semibold tracking-widest text-orange-500 uppercase">
              Services
            </p>
            <h2 className="text-2xl font-bold text-[#1f4e79] md:text-3xl">
              Quick Citizen <span className="text-[#1f4e79]">Services</span>
            </h2>
          </div>

          <Swiper
            spaceBetween={10}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 8 },
            }}
          >
            {services.map((item, index) => (
              <SwiperSlide key={index}>
                <Card className="mt-2.5 mr-1 mb-12 ml-1 h-[150px] cursor-pointer rounded-xl border-none bg-[#eef2f6] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <CardContent className="flex flex-col items-center justify-center px-2 py-2 text-center">
                    {/* Image Circle */}
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#dbe7f3]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    {/* Title */}
                    <p className="text-sm leading-tight font-medium text-gray-700">
                      {item.title}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
