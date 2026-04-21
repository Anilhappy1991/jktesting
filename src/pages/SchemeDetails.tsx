import { skipToken } from "@reduxjs/toolkit/query"
import { useNavigate, useParams } from "react-router-dom"

import DetailCard, { WrongPageState } from "@/components/common/detailCard"
import { useGetSchemeBySlugQuery } from "@/features/home/schemaApi"
import { routePaths } from "@/routes/routePaths"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useLang } from "@/hooks/useLang"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"

const getSchemeImageSrc = (logo?: string | null) => {
  const imageSource = logo

  if (!imageSource) {
    return undefined
  }

  try {
    return new URL(imageSource, ASSET_BASE_URL).toString()
  } catch {
    return undefined
  }
}

export default function SchemeDetails() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const lang = useLang()
  const { data, isLoading, isError } = useGetSchemeBySlugQuery(
    slug ? { lang, slug } : skipToken
  )

  const scheme = data?.data

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(routePaths.schemes)
  }

  if (!slug || (!isLoading && (isError || !scheme))) {
    return (
      <WrongPageState
        description="The scheme you are looking for was not found."
        onGoBack={handleGoBack}
      />
    )
  }

  return (
    <>
      <MetaTagGenerator
        title="Scheme Details"
        description={scheme?.description}
      />
      <div className="px-4 py-8 sm:px-6 lg:px-10 xl:px-20">
        <DetailCard
          isLoading={isLoading}
          title={scheme?.title ?? "Scheme"}
          subtitle={scheme?.subtitle}
          imageUrl={getSchemeImageSrc(scheme?.logo)}
          description={scheme?.description || scheme?.short_description}
          websiteLinks={scheme?.links}
          tagLabel="Scheme"
        />
      </div>
    </>
  )
}
