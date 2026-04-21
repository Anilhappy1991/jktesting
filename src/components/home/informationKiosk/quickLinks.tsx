import { routePaths } from "@/routes/routePaths"

import { QuickLinkCard, type QuickLinkItem } from "./quickLinkCard"
import { useTranslation } from "@/context/languageContext"

export const getQuickLinksData = (t: any): QuickLinkItem[] => [
  {
    id: 1,
    title: t("quickLinks.brap"),
    icon: "/images/BRAP.png",
    href: routePaths.brap,
  },
  {
    id: 2,
    title: t("quickLinks.schemes"),
    icon: "/images/ql-blue-2.png",
    href: routePaths.schemes,
  },
  {
    id: 3,
    title: t("quickLinks.iec"),
    icon: "/images/IEC.png",
    href: "https://swachh.jk.gov.in/",
    external: true,
  },
  {
    id: 4,
    title: t("quickLinks.tenders"),
    icon: "/images/ql-blue-4.jpg",
    href: "https://jktenders.gov.in",
    external: true,
  },
  {
    id: 5,
    title: t("quickLinks.sanjy"),
    icon: "/images/SANJY.png",
    href: routePaths.sanjy,
  },
  {
    id: 6,
    title: t("quickLinks.monthlyNewsletter"),
    icon: "/images/ml-1.png",
    href: routePaths.newsLetter,
  },
]

export default function QuickLinks() {
  const { t } = useTranslation()

  const quickLinksData = getQuickLinksData(t)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
      {quickLinksData.map((item) => (
        <QuickLinkCard key={item.id} item={item} />
      ))}
    </div>
  )
}
