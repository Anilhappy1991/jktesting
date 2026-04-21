import * as React from "react"
import { ChevronDown, Menu, X } from "lucide-react"
// import { AppLink } from "@/components/common/AppLink"
import { routePaths } from "@/routes/routePaths"
import { AppLink } from "./appLink"
import type { TranslationKey } from "@/constants/language/types"
import { useTranslation } from "@/context/languageContext"
interface NavItem {
  title: string
  href: string
}

type TranslateFn = (key: TranslationKey) => string
export const getAboutItems = (t: TranslateFn): NavItem[] => [
  { title: t("nav.profile"), href: "#home-about" },
  { title: t("nav.organizationSetup"), href: routePaths.organizationsetup },
  { title: t("nav.functions"), href: routePaths.functions },
]
export const getInformationItems = (t: TranslateFn): NavItem[] => [
  { title: t("nav.actsRulesByelaws"), href: routePaths.actsrulesbyelaws },
  { title: t("nav.achievements"), href: "#achievements" },
  { title: t("nav.brapCompliance"), href: routePaths.brap },
  { title: t("nav.faqs"), href: routePaths.faqs },
]
export const getOrdersCircularsItems = (t: TranslateFn): NavItem[] => [
  { title: t("nav.governmentOrders"), href: "governmentorders?tab=orders" },
  { title: t("nav.officeCirculars"), href: "governmentorders?tab=circulars" },
  { title: t("nav.publicNotices"), href: "governmentorders?tab=notices" },
  { title: t("nav.notifications"), href: routePaths.notifications },
]
export const getLoginsItems = (t: TranslateFn): NavItem[] => [
  { title: t("nav.officialLogin"), href: "" },
  { title: t("nav.publicLogin"), href: "" },
]

/* ---------------- Desktop Dropdown ---------------- */
function DesktopDropdown({
  label,
  items,
}: {
  label: string
  items: NavItem[]
}) {
  return (
    <div className="group relative hidden lg:block">
      <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-white hover:bg-white/10">
        {label}
        <ChevronDown
          size={15}
          className="transition-transform group-hover:rotate-180"
        />
      </button>

      {/* hover bridge */}
      <div className="absolute top-full left-0 h-2 w-full" />

      <div className="pointer-events-none absolute top-full left-0 z-50 w-[190px] origin-top scale-y-95 overflow-hidden rounded-b-lg border bg-background opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:scale-y-100 group-hover:opacity-100">
        {items.map((item) => (
          <AppLink
            key={item.title}
            to={item.href}
            className="block border-b px-4 py-3 text-[13px] font-semibold text-[#1f4e79] last:border-b-0 hover:bg-blue-50"
          >
            {item.title}
          </AppLink>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Desktop Link ---------------- */
function DesktopLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <AppLink
      to={to}
      className="hidden px-4 py-3 text-sm font-medium text-white hover:bg-white/10 lg:flex"
    >
      {children}
    </AppLink>
  )
}

/* ---------------- Mobile Accordion ---------------- */
function MobileAccordion({
  label,
  items,
  openMenu,
  setOpenMenu,
  onNavigate,
}: {
  label: string
  items: NavItem[]
  openMenu: string
  setOpenMenu: React.Dispatch<React.SetStateAction<string>>
  onNavigate: () => void
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpenMenu((cur) => (cur === label ? "" : label))}
        className="flex w-full justify-between px-5 py-3 text-sm text-white"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${
            openMenu === label ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          openMenu === label ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item) => (
          <AppLink
            key={item.title}
            to={item.href}
            onClick={onNavigate}
            className="block bg-[#163c60] px-7 py-3 text-sm text-white hover:bg-[#0f2f4d]"
          >
            {item.title}
          </AppLink>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Mobile Link ---------------- */
function MobileLink({
  to,
  children,
  onNavigate,
}: {
  to: string
  children: React.ReactNode
  onNavigate: () => void
}) {
  return (
    <AppLink
      to={to}
      onClick={onNavigate}
      className="block border-b border-white/10 px-5 py-3 text-sm text-white hover:bg-white/5"
    >
      {children}
    </AppLink>
  )
}

/* ---------------- Header Bottom ---------------- */
export default function HeaderBottom() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState("")
  const [isFixed, setIsFixed] = React.useState(false)

  //translation functions
  const { t } = useTranslation()

  const aboutItems = getAboutItems(t)
  const informationItems = getInformationItems(t)
  const ordersCircularsItems = getOrdersCircularsItems(t)
  const loginsItems = getLoginsItems(t)
  const closeMobileMenu = () => setMobileOpen(false)

  React.useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 144)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {isFixed && <div className="h-[48px]" />}

      <div
        className={`z-50 w-full bg-[#1f4e79] transition-shadow duration-300 ${
          isFixed
            ? "fixed top-0 right-0 left-0 shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            : "relative"
        } `}
      >
        {/* ── Desktop nav ── */}
        <nav className="hidden justify-center lg:flex">
          <DesktopLink to={routePaths.home}>{t("nav.home")}</DesktopLink>
          <DesktopDropdown label={t("nav.aboutUs")} items={aboutItems} />
          <DesktopLink to={routePaths.departments}>
            {t("nav.departments")}
          </DesktopLink>
          <DesktopDropdown
            label={t("nav.informations")}
            items={informationItems}
          />
          <DesktopLink to="#citizen-services">
            {t("nav.citizenServices")}
          </DesktopLink>
          <DesktopLink to={routePaths.tenders}>{t("nav.eTenders")}</DesktopLink>
          <DesktopLink to={routePaths.schemes}>{t("nav.schemes")}</DesktopLink>
          <DesktopDropdown
            label={t("nav.ordersCirculars")}
            items={ordersCircularsItems}
          />
        </nav>

        {/* ── Mobile toggle ── */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen((c) => !c)}
            aria-label="Toggle menu"
            className="rounded p-1.5 text-white transition-colors hover:bg-white/10"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/20">
            <MobileLink to={routePaths.home} onNavigate={closeMobileMenu}>
              {t("nav.home")}
            </MobileLink>
            <MobileAccordion
              label={t("nav.aboutUs")}
              items={aboutItems}
              openMenu={menuOpen}
              setOpenMenu={setMenuOpen}
              onNavigate={closeMobileMenu}
            />
            <MobileLink
              to={routePaths.departments}
              onNavigate={closeMobileMenu}
            >
              {t("nav.departments")}
            </MobileLink>
            <MobileAccordion
              label={t("nav.informations")}
              items={informationItems}
              openMenu={menuOpen}
              setOpenMenu={setMenuOpen}
              onNavigate={closeMobileMenu}
            />
            <MobileLink to="#citizen-services" onNavigate={closeMobileMenu}>
              {t("nav.citizenServices")}
            </MobileLink>
            <MobileLink to={routePaths.tenders} onNavigate={closeMobileMenu}>
              {t("nav.eTenders")}
            </MobileLink>
            <MobileLink to={routePaths.schemes} onNavigate={closeMobileMenu}>
              {t("nav.schemes")}
            </MobileLink>
            <MobileAccordion
              label={t("nav.ordersCirculars")}
              items={ordersCircularsItems}
              openMenu={menuOpen}
              setOpenMenu={setMenuOpen}
              onNavigate={closeMobileMenu}
            />
            <MobileAccordion
              label={t("nav.logins")}
              items={loginsItems}
              openMenu={menuOpen}
              setOpenMenu={setMenuOpen}
              onNavigate={closeMobileMenu}
            />
          </div>
        </div>
      </div>
    </>
  )
}
