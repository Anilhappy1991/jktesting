import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/context/languageContext"
import { useGetSocialMediaQuery } from "@/features/socialMedia/socialmediaApi"
import type { SocialMedia } from "@/features/socialMedia/socialMediaTypes"

const fallbackNewsData: SocialMedia[] = [
  {
    social_media: "Twitter",
    image: "/images/latestmedia.png",
    link: "https://x.com/jkhudd1?s=11",
  },
  {
    social_media: "Facebook",
    image: "/images/facebook.jpeg",
    link: "https://www.facebook.com/share/18Mb3vSxSa/?mibextid=wwXIfr",
  },
  {
    social_media: "Instagram",
    image: "/images/instagram.jpeg",
    link: "https://www.instagram.com/jkhudd1?igsh=MW05NTdiZ3VyaTdncw==",
  },
]

export default function SocialMedia() {
  const { data, isLoading, isError } = useGetSocialMediaQuery()
  const socialMediaItems = data?.data ?? fallbackNewsData
  const { t } = useTranslation()
  return (
    <div className="mx-auto mb-10 px-4 text-center sm:px-6 lg:px-10 xl:px-30">
      {/* Section Heading */}
      <div className="mt-8 px-4 py-8">
        {/* <p className="mb-2 text-xs font-semibold tracking-widest text-orange-500 uppercase">
          {t("headings.media")}
        </p> */}
        <h2 className="font-medium tracking-tight text-[#1f4e79] sm:text-2xl md:text-3xl">
          {t("headings.social")}{" "}
          <span className="text-[#1f4e79]">
            {t("headings.mediaAnnouncements")}
          </span>
        </h2>
      </div>

      {isLoading && (
        <p className="mb-4 text-sm text-gray-600">Loading social media...</p>
      )}
      {isError && (
        <p className="mb-4 text-sm text-red-600">
          Unable to load social media. Showing default items.
        </p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {socialMediaItems.map((item, index) => (
          <a
            key={`${item.link}-${index}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-[10px] transition-all duration-300 ease-in-out hover:shadow-md"
          >
            <Card className="mb-0 cursor-pointer overflow-hidden rounded-md border-0 bg-transparent py-0 shadow-none transition">
              {/* Card Heading */}
              <div className="px-2 pt-4 text-left text-[18px] font-semibold text-[#1f4e79] transition-colors duration-300 group-hover:text-blue-900">
                {item.social_media}
              </div>

              <CardContent className="no-scrollbar h-[400px] overflow-hidden p-0">
                <img
                  src={item.image ?? "/images/latestmedia.png"}
                  alt={item.social_media}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
