import { useTranslation } from "@/context/languageContext"
import { AnalyticTabs } from "./tabs"

export default function AnalyticDashboard() {
  const { t } = useTranslation()
  return (
    <div className="bg-[#f4f5f7]">
      <div className="mx-auto min-h-[100vh] w-full px-4 py-10 sm:px-6 lg:px-15">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-[#0c3b5e] sm:text-2xl md:text-2xl">
          {t("headings.analyticDashboard")}
        </h2>
        <AnalyticTabs />
      </div>
    </div>
  )
}
