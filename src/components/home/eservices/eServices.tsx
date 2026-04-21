import { useGetEServicesQuery } from "@/features/home/eserviceApi"
import { EServiceCard } from "./eServiceCard"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const EServices = () => {
  const lang = useLang()
  const { data: eServices } = useGetEServicesQuery({ lang })
  const { t } = useTranslation()
  return (
    <div className="bg-[#f4f5f7] md:px-6">
      <section
        id="citizen-services"
        className="container mx-auto scroll-mt-32 px-4 py-6 sm:px-6 sm:py-10 lg:px-15"
      >
        {/* Heading */}
        <h2 className="text-center text-xl font-medium tracking-tight text-[#0c3b5e] sm:text-2xl md:text-3xl">
          {t("headings.citizenEServices")}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {eServices?.data?.map((service) => (
            <EServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.img_file}
              redirectLink={service.redirect_link}
              buttonText={t("headings.clickMore")}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default EServices
