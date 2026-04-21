// import React from "react"

interface HodCardProps {
  name: string
  profile_image_url?: string
  department: string
  designation: string
}
export default function HodCard({
  name,
  profile_image_url,
  department,
  designation,
}: HodCardProps) {
  // console.log("Hod card data === >", profile_image_url)
  return (
    <div className="py-5">
      <div className="h-full pt-11 pb-2 transition-transform duration-500 [.swiper-slide-active_&]:scale-109">
        <div className="hod-card mx-3 flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 pt-0 pb-7 text-center shadow-md transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]">
          {/* Avatar */}
          <div className="relative -mt-11 mb-3 flex-shrink-0">
            <div className="h-[98px] w-[98px] rounded-full p-[3px] shadow-md sm:h-[105px] sm:w-[105px]">
              <img
                src={profile_image_url}
                alt={name}
                className="h-full w-full rounded-full border-4 border-[#f5b800] object-cover object-top"
              />
            </div>
          </div>

          <p className="hod-name mb-1.5 text-[1rem] leading-snug font-semibold text-slate-800 transition-colors duration-500">
            {name}
          </p>
          <p className="hod-designation mb-1 text-[14px] font-normal text-amber-500 transition-colors duration-500">
            {designation}
          </p>
          <p className="hod-department text-sm leading-relaxed text-slate-400 transition-colors duration-500">
            ({department})
          </p>
        </div>
      </div>
    </div>
  )
}
