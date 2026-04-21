import { Card, CardContent } from "@/components/ui/card"
import { useGetDepartmentsQuery } from "@/features/departments/departmentApi"
import type { DepartmentItem } from "@/features/departments/departmentTypes"
import { routePaths, withSlug } from "@/routes/routePaths"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { AppLink } from "@/components/common/appLink"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"
const FALLBACK_LOGO = "/images/govlogo.png"

const getDepartmentLogoSrc = (logo: string) => {
  if (!logo) {
    return FALLBACK_LOGO
  }

  try {
    return new URL(logo, ASSET_BASE_URL).toString()
  } catch {
    return FALLBACK_LOGO
  }
}

function DepartmentCard({ department }: { department: DepartmentItem }) {
  return (
    <Card className="mb-0 overflow-hidden border py-0 pb-0 transition hover:shadow-lg">
      <AppLink
        to={withSlug(routePaths.departmentDetail, department.slug)}
        // to={routePaths.departmentsBySlug(department.slug)}
        className="flex flex-col justify-between"
      >
        <div className="flex h-35 items-center justify-center bg-white px-4">
          <img
            src={getDepartmentLogoSrc(department.logo)}
            alt={department.title}
            className="h-35 w-full object-contain"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_LOGO
            }}
          />
        </div>

        <CardContent className="mb-0 bg-[#cfe0f5] px-2 py-6 text-center">
          <p className="mb-0 h-10 text-sm font-[900] text-[#1f4e79]">
            {department.title}
          </p>
        </CardContent>
      </AppLink>
    </Card>
  )
}

export default function Departments() {
  const lang = useLang()
  const { t } = useTranslation()
  const {
    data: departmentsResponse,
    isLoading,
    isError,
  } = useGetDepartmentsQuery({ lang })

  const departments = departmentsResponse?.data ?? []

  return (
    <>
      <MetaTagGenerator
        title="Departments"
        description="Explore the various departments under the Housing and Urban Development Department, J&K. Find information about their functions, services, and contact details."
      />
      <div className="w-full bg-[#f9fafb] px-4 py-7 text-black sm:px-6 lg:px-10 xl:px-20">
        <div className="px-4">
          <h4 className="text-[20px] font-bold text-[#0c3c78]">
            {t("headings.subordinateDepartments")}
          </h4>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={index}
                className="animate-pulse overflow-hidden border"
              >
                <div className="flex h-36 items-center justify-center px-4">
                  <div className="h-20 w-20 rounded-full bg-slate-200" />
                </div>
                <CardContent className="bg-[#cfe0f5] px-2 py-3 text-center">
                  <div className="mx-auto h-4 w-3/4 rounded bg-slate-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="px-7 py-10">
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Failed to load departments.
            </p>
          </div>
        ) : departments.length === 0 ? (
          <div className="px-7 py-10">
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              No departments available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 py-4 sm:grid-cols-2 sm:px-7 sm:py-7 md:grid-cols-3 lg:grid-cols-4">
            {departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
