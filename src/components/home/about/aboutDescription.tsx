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
    <div className="mx-auto flex w-full max-w-[1200px] flex-col py-4 lg:pt-4 lg:pb-8">
      <h2 className="m-0 pb-0 text-xl font-medium sm:text-2xl lg:text-2xl">
        {t("about.title")}
      </h2>

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="">
          <p className="py-4 text-justify text-[15px] leading-[22px] text-[#333333] sm:text-sm">
            {t("about.description")}
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {infoCards.map((card, idx) => (
              <InfoCard key={idx} title={card.title} icon={card.icon} />
            ))}
          </div>
        </div>
        <LeaderCarousel />
      </div>
    </div>
  )
}
