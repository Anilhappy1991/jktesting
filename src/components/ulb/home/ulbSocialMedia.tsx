import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/context/languageContext"
import type { SocialMedia } from "@/features/socialMedia/socialMediaTypes"
import LatestNewsCards from "./latestNews"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import type { IconType } from "react-icons"

const socialMediaIcons: Record<string, { icon: IconType; color: string }> = {
  Instagram: { icon: FaInstagram, color: "#E1306C" },
  LinkedIn: { icon: FaLinkedin, color: "#0077B5" },
  Twitter: { icon: FaTwitter, color: "#1DA1F2" }, // Placeholder for Twitter icon
}

const fallbackNewsData: SocialMedia[] = [
  {
    social_media: "Twitter",
    image: "/images/latestmedia.png",
    link: "#",
  },
  {
    social_media: "Instagram",
    image: "/images/instagram.jpeg",
    link: "#",
  },
]

export default function UlbSocialMediaSection() {
  const { t } = useTranslation()
  const socialMediaItems = fallbackNewsData

  return (
    <div className="mx-auto mb-10 px-4 text-center sm:px-6 lg:px-10 xl:px-30">
      {/* Section Heading */}
      <div className="mt-8 px-4 py-8">
        <p className="mb-2 text-xs font-semibold tracking-widest text-orange-500 uppercase">
          {t("headings.media")}
        </p>
        <h2 className="text-2xl font-bold text-[#1f4e79] md:text-3xl">
          {t("headings.social")}{" "}
          <span className="text-[#1f4e79]">
            {t("headings.mediaAnnouncements")}
          </span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {socialMediaItems.map((item, index) => {
          const socialIcon = socialMediaIcons[item.social_media]
          const Icon = socialIcon?.icon
          return (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="mb-0 cursor-pointer overflow-hidden rounded-md border-0 bg-transparent py-0 shadow-none transition">
                {/* Card Heading */}
                <div className="flex items-center gap-2 px-2 py-0 pt-4 text-left text-[18px] font-semibold text-[#1f4e79]">
                  {Icon && <Icon style={{ color: socialIcon.color }} />}
                  {item.social_media}
                </div>

                <CardContent className="no-scrollbar h-[400px] overflow-auto p-0">
                  <img
                    src={item.image ?? "/images/latestmedia.png"}
                    alt={item.social_media}
                    className="h-auto w-full object-cover"
                  />
                </CardContent>
              </Card>
            </a>
          )
        })}
        <LatestNewsCards />
      </div>
    </div>
  )
}
