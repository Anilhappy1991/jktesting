import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import GovOrdersCircularsNotices from "@/components/ordersAndCirculars/tabs"
// import React from "react"

export default function GovermentOrders() {
  return (
    <>
      <MetaTagGenerator title="Orders" />
      <div className="">
        <GovOrdersCircularsNotices />
      </div>
    </>
  )
}
