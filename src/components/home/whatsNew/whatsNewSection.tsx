// import React from "react"
import MobileAppDownload from "./mobileAppDownload"
import WhatsNewInformation from "./whatsNewInformation"

export default function WhatsNewSection() {
  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-10 xl:px-30">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">
        <div className="col-span-5 w-full">
          <WhatsNewInformation />
        </div>

        <div className="col-span-7">
          <MobileAppDownload />
        </div>
      </div>
    </div>
  )
}
