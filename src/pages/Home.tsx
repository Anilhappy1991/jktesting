import HomeCarousel from "@/components/home/carousel"
import WhatsNewBar from "@/components/home/whatsNewBar"
// import { Button } from "@/components/ui/button"
import HomeAbout from "@/components/home/about/homeAbout"
// import { useEffect } from "react"
import Kiosk from "@/components/home/informationKiosk/kiosk"
import EServices from "@/components/home/eservices/eServices"
import StakeHolders from "@/components/home/stakeHolders"
import ExploreGallery from "@/components/home/gallery/gallery"
import AchievementsSlider from "@/components/home/achievements/achievments"
import OurSchemes from "@/components/home/ourSchemes"
import WhatsNew from "@/components/home/whatsNew/whatsNewSection"
import AnalyticDashboard from "@/components/home/analyticDashboard/analyticDashboard"
import OurHods from "@/components/home/ourHods/ourHods"
import SocialMedia from "@/components/home/socialMedia"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"

export default function Home() {
  return (
    <>
      <MetaTagGenerator
        title="JKHUDD | Housing & Urban Development Department J&K | Official Portal"
        description="Official portal of the Housing & Urban Development Department, Jammu & Kashmir. Apply for building permissions, trade licences, municipal certificates, and urban services online. Explore AMRUT, SBM 2.0, and Smart City schemes."
      />
      <HomeCarousel />
      <WhatsNewBar />
      <HomeAbout />
      <Kiosk />
      <AnalyticDashboard />
      <OurSchemes />
      <WhatsNew />
      <SocialMedia />
      <EServices />
      <OurHods />
      <AchievementsSlider />
      <ExploreGallery />
      <StakeHolders />
    </>
  )
}
