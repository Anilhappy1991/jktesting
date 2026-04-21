import { Card, CardContent } from "@/components/ui/card"
import { useGetSchemesQuery } from "@/features/home/schemaApi"
import type { SchemeItem } from "@/features/home/homeTypes"
import { routePaths, withSlug } from "@/routes/routePaths"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { AppLink } from "@/components/common/appLink"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"
const FALLBACK_IMAGE = "/images/govlogo.png"

const getSchemeImageSrc = (scheme: SchemeItem) => {
  const imageSource = scheme.logo

  if (!imageSource) {
    return FALLBACK_IMAGE
  }

  try {
    return new URL(imageSource, ASSET_BASE_URL).toString()
  } catch {
    return FALLBACK_IMAGE
  }
}

function SchemeCard({ scheme }: { scheme: SchemeItem }) {
  return (
    <AppLink
      to={withSlug(routePaths.schemeDetail, scheme.slug)}
      className="block"
    >
      <Card className="overflow-hidden rounded-xl border border-blue-200 py-0 shadow-sm transition hover:shadow-md">
        <CardContent className="flex h-full flex-col p-0">
          <div className="flex h-28 items-center justify-center bg-white px-4 sm:h-35">
            <img
              src={getSchemeImageSrc(scheme)}
              alt={scheme.title}
              className="h-20 w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_IMAGE
              }}
            />
          </div>

          <div className="h-20 bg-blue-100 px-2 py-3 text-center text-[12px] font-[900] text-blue-900 sm:text-[14px]">
            {scheme.title}
          </div>
        </CardContent>
      </Card>
    </AppLink>
  )
}

export default function Schemes() {
  const lang = useLang()
  const { t } = useTranslation()
  const {
    data: schemesResponse,
    isLoading,
    isError,
  } = useGetSchemesQuery({ lang })
  const schemes = schemesResponse?.data ?? []

  return (
    <>
      <MetaTagGenerator title="Schemes" />
      <section className="w-full px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
        <h2 className="mb-5 text-[20px] font-bold text-[#0c3c78]">
          {t("headings.schemesOfHUDD")}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-blue-200 shadow-sm"
              >
                <CardContent className="flex h-full flex-col p-0">
                  <div className="flex h-32 items-center justify-center bg-white px-4">
                    <div className="h-20 w-20 rounded-full bg-slate-200" />
                  </div>
                  <div className="bg-blue-100 px-2 py-3 text-center">
                    <div className="mx-auto h-4 w-3/4 rounded bg-slate-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Failed to load schemes.
          </div>
        ) : schemes.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            No schemes available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {schemes.map((scheme) => {
              return <SchemeCard key={scheme.id} scheme={scheme} />
            })}
          </div>
        )}
      </section>
    </>
  )
}
