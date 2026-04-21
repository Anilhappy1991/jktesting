import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useTranslation } from "@/context/languageContext"
import { useLang } from "@/hooks/useLang"
// import { Meta } from "react-router-dom"

const OrganizationSetup = () => {
  const lang = useLang()
  const { t } = useTranslation()

  return (
    <>
      <MetaTagGenerator title="Organization Setup" description="" />
      <div className="w-full px-4 py-7 text-black sm:px-6 lg:px-10 xl:px-20">
        <h2 className="px-4 text-[14px] font-medium sm:text-xl sm:font-semibold">
          {t("headings.organizationSetup")}
        </h2>
        <div className="px-5 sm:px-20">
          <img
            src={
              lang == "en"
                ? "/images/OrganizationSetup.png"
                : "/images/organisation_setup_img_hindi.png"
            }
            alt="Logo"
            className="w-full"
          />
        </div>
      </div>
    </>
  )
}

export default OrganizationSetup
