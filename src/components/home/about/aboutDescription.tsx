import { useTranslation } from "@/context/languageContext"
import InfoCard from "./infoCard"
import LeaderCarousel from "./leadersCarousel"

type InfoCardItem = {
  title: string
  icon: string
}

export const getInfoCards = (t: any): InfoCardItem[] => [
  {
    title: t("about.cards.urbanGrowth"),
    icon: "/images/Urban-Growth-&-Planning.png",
  },
  {
    title: t("about.cards.digitalServices"),
    icon: "/images/Digital-Urban-Services-new.png",
  },
  {
    title: t("about.cards.urbanGovernance"),
    icon: "/images/Strengthening-Urban-Governance-new.png",
  },
  {
    title: t("about.cards.citizenReforms"),
    icon: "/images/Citizen-Centric-Urban-Reforms-new.png",
  },
]

export default function AboutDescription() {
  const { t } = useTranslation()

  const infoCards = getInfoCards(t)

  return (
    <div className="mx-auto flex w-full flex-col py-4 lg:pt-4 lg:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-10">
          <div className="w-[60%]">
            <h2 className="m-0 pb-0 text-xl font-medium text-[#1f4e79] sm:text-2xl md:text-3xl">
              {t("about.title")}
            </h2>
            <p className="py-4 text-justify text-[15px] leading-[22px] text-[#333333] sm:text-sm">
              {t("about.description")}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
              {infoCards.map((card, idx) => (
                <InfoCard key={idx} title={card.title} icon={card.icon} />
              ))}
            </div>
          </div>
          <div className="w-[40%]">
            <LeaderCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}
