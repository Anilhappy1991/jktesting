export const SUPPORTED_LANGS = ["en", "hi"] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: Lang = "en"

export const routePaths = {
  root: "/",
  langRoot: "/:lang",
  home: "",
  about: "about",
  organizationsetup: "organizationsetup",
  functions: "functions",
  brap: "brap",
  departments: "departments",
  departmentDetail: "departments/:slug",
  sanjy: "Sanjy",
  actsrulesbyelaws: "ActsRulesByeLaws",
  faqs: "Faqs",
  govermentOrders: "governmentorders",
  notifications: "notifications",
  tenders: "tenders",
  schemes: "schemes",
  schemeDetail: "schemes/:slug",
  newsLetter: "newsletter",
  newsLetterArchive: "newsletter/archieve",
  contactUs: "contact-us",
  galleryDetail: "gallery/:slug",
  screenReader: "screenreader",
} as const

export const withSlug = (path: string, slug: string) =>
  path.replace(":slug", slug)
