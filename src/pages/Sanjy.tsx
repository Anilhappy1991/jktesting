import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/context/languageContext"

function Sanjy() {
  const { t } = useTranslation()

  return (
    <>
      <MetaTagGenerator
        title={t("sanjy.title1")}
        description={t("sanjy.subtitle1")}
      />
      <div className="w-full px-4 py-7 sm:px-6 lg:px-10 xl:px-30">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src="/images/shriamarnathjiyatra.png"
              alt="img"
              className="w-[400px] rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div>
            <h4 className="mb-3 text-2xl font-semibold">{t("sanjy.title1")}</h4>
            <p className="mb-2 text-sm leading-relaxed text-gray-600">
              {t("sanjy.subtitle1")}
            </p>
            <p className="text-justify text-sm leading-relaxed text-gray-600">
              {t("sanjy.desc1")}
            </p>
          </div>
        </div>

        <div className="grid items-center gap-6 py-5 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-2xl font-semibold">{t("sanjy.title2")}</h4>
            <p className="text-justify text-sm leading-relaxed text-gray-600">
              {t("sanjy.desc2")}
            </p>
          </div>

          <div>
            <img
              src="/images/Tawi-AartiIlluminates.png"
              alt="img"
              className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://shriamarnathjiyatra.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="w-full bg-[#1f4e79] text-white hover:bg-[#163c60] sm:w-auto">
              {t("sanjy.visitOfficial")}
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}

export default Sanjy
