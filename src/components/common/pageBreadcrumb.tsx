import { ChevronRight } from "lucide-react"
import { useLocation, useParams } from "react-router-dom"

import { SUPPORTED_LANGS, type Lang, DEFAULT_LANG } from "@/routes/routePaths"
import { AppLink } from "./appLink"

const segmentLabels: Record<string, string> = {
  about: "About",
  organizationsetup: "Organization Setup",
  functions: "Functions",
  brap: "BRAP",
  departments: "Departments",
  sanjy: "SANJY",
  actsrulesbyelaws: "Acts Rules & Bye-Laws",
  faqs: "FAQs",
  governmentorders: "Government Orders",
  notifications: "Notifications",
  tenders: "Tenders",
  schemes: "Schemes",
  newsletter: "Newsletter",
  archieve: "Archive",
  "contact-us": "Contact Us",
}

const wordLabels: Record<string, string> = {
  amrut: "AMRUT",
  brap: "BRAP",
  citiis: "CITIIS",
  clu: "CLU",
  dulbj: "DULBJ",
  faqs: "FAQs",
  hudd: "HUDD",
  jda: "JDA",
  jmc: "JMC",
  lcma: "LCMA",
  ncap: "NCAP",
  nulm: "NULM",
  pm: "PM",
  pmay: "PMAY",
  rera: "RERA",
  sanjy: "SANJY",
  sda: "SDA",
  smc: "SMC",
  uklb: "UKLB",
  "iec-review": "IEC REVIEW",
}

const normalize = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase()

const formatBreadcrumbLabel = (value: string) => {
  const normalized = normalize(value)

  if (segmentLabels[normalized]) return segmentLabels[normalized]
  if (wordLabels[normalized]) return wordLabels[normalized]

  const words = normalized.split(/[-_]+/)
  const formattedWords = words.map((word) => {
    if (wordLabels[word]) return wordLabels[word]
    return isNaN(Number(word))
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word
  })

  return formattedWords.join(" ")
}

export default function PageBreadcrumb() {
  const location = useLocation()
  const { lang: urlLang } = useParams<{ lang: string }>()

  const lang: Lang = SUPPORTED_LANGS.includes(urlLang as Lang)
    ? (urlLang as Lang)
    : DEFAULT_LANG

  const pathSegments = location.pathname.split("/").filter(Boolean)

  // Strip the lang segment and "gallery" from breadcrumb display
  const filteredSegments = pathSegments.filter(
    (seg) => seg !== lang && seg !== "gallery"
  )

  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get("tab")

  // No breadcrumb on home page
  if (filteredSegments.length === 0) return null

  // Build crumbs with relative paths (AppLink will add /:lang)
  const crumbs = filteredSegments.map((segment, index) => ({
    label: formatBreadcrumbLabel(segment),
    path: filteredSegments.slice(0, index + 1).join("/"),
  }))

  if (tab) {
    crumbs.push({
      label: formatBreadcrumbLabel(tab),
      path: `${filteredSegments.join("/")}?tab=${tab}`,
    })
  }

  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-12 flex-wrap items-center gap-2 text-[11px] sm:text-[16px]"
        >
          {/* Home */}
          <AppLink
            to=""
            className="font-medium text-[#6b7a90] hover:text-[#1f4e79]"
          >
            Home
          </AppLink>

          {/* Dynamic Breadcrumbs */}
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1

            return (
              <div key={crumb.path} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[#6b7a90]" />

                {isLast ? (
                  <span className="font-medium text-slate-900">
                    {crumb.label}
                  </span>
                ) : (
                  <AppLink
                    to={crumb.path}
                    className="text-[#6b7a90] hover:text-[#1f4e79]"
                  >
                    {crumb.label}
                  </AppLink>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
