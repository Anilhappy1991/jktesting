import { skipToken } from "@reduxjs/toolkit/query"
import { useNavigate, useParams } from "react-router-dom"

import DetailCard, { WrongPageState } from "@/components/common/detailCard"
import { useGetDepartmentBySlugQuery } from "@/features/departments/departmentApi"
import { routePaths } from "@/routes/routePaths"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useLang } from "@/hooks/useLang"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"

const getDepartmentLogoSrc = (logo?: string | null) => {
  if (!logo) {
    return undefined
  }

  try {
    return new URL(logo, ASSET_BASE_URL).toString()
  } catch {
    return undefined
  }
}

export default function DepartmentDetails() {
  const navigate = useNavigate()
  const lang = useLang()
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading, isError } = useGetDepartmentBySlugQuery(
    slug ? { slug, lang } : skipToken
  )

  const department = data?.data

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(routePaths.departments)
  }

  if (!slug || (!isLoading && (isError || !department))) {
    return (
      <WrongPageState
        description="The department you are looking for was not found."
        onGoBack={handleGoBack}
      />
    )
  }

  return (
    <>
      <MetaTagGenerator
        title={"Department"}
        description={department?.description}
      />
      <div className="bg-[#f9fafb] px-4 py-8 sm:px-6 lg:px-10 xl:px-20">
        <DetailCard
          isLoading={isLoading}
          title={department?.title ?? "Department"}
          imageUrl={getDepartmentLogoSrc(department?.logo)}
          description={department?.description}
          websiteLinks={department?.links}
          tagLabel="Department"
        />
      </div>
    </>
  )
}
