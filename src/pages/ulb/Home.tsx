import StakeHolders from "@/components/home/stakeHolders"
import About from "@/components/ulb/home/ulbAbout"
import UlbBannerSlider from "@/components/ulb/home/ulbBannerSlider"
import CitizeneServicesSection from "@/components/ulb/home/ulbCitizenServices"
// import SocialMedia from "@/components/home/socialMedia"
// import NoticesSection from "@/components/ulb/home/ulbInformationTabs"
import NoticeMarquee from "@/components/ulb/home/ulbNoticeMarquee"
import PhotoGallery from "@/components/ulb/home/ulbPhotoGallery"
import ServiceInformation from "@/components/ulb/home/ulbServiceInformation"
import UlbSocialMediaSection from "@/components/ulb/home/ulbSocialMedia"
// import UlbSocialMediaSection from "@/components/ulb/home/ulbSocialMedia"

export default function UlbHome() {
  return (
    <>
      <div className="relative h-auto w-full sm:h-[250px] lg:h-[444px]">
        <UlbBannerSlider />
        <NoticeMarquee />
      </div>

      <div className="relative mt-2 h-auto w-full bg-[url('/images/ulbbackground.jpeg')] bg-cover bg-center bg-top sm:mt-12">
        <CitizeneServicesSection />
        <About />

        <ServiceInformation />
        {/* <NoticesSection /> */}
        <UlbSocialMediaSection />
        {/* <SocialMedia /> */}
        <PhotoGallery />
        <StakeHolders />
      </div>
    </>
  )
}
