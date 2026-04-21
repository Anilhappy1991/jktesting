// import React from "react"
import { useLang } from "@/hooks/useLang"
import WhatsNewCard from "./whatsNewCard"
import { useGetWhatsNewBlocksQuery } from "@/features/home/whatsNewBlockApi"
import { useTranslation } from "@/context/languageContext"

const WhatsNewInformation = () => {
  const lang = useLang()
  const { t } = useTranslation()
  const { data } = useGetWhatsNewBlocksQuery({ lang })
  return (
    <div className="mx-auto mt-10 h-[300px] w-full max-w-md rounded-md bg-[#0000005a] sm:mt-22 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="px-2 sm:px-4">
        {/* Title */}
        <h2 className="sm:text-2md p-2 pb-1 text-xl font-semibold text-white">
          {t("headings.whatsNew")}
        </h2>
        {/* Scroll Area */}
        <div className="custom-scrollbar h-[250px] overflow-y-auto pr-2 sm:h-[200px] md:h-[240px]">
          <ul className="m-2 flex flex-col gap-2">
            {data?.data?.map((item, index) => (
              <WhatsNewCard key={index} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WhatsNewInformation
