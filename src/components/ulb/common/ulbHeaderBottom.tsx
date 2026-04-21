import * as React from "react"
import { Menu, X } from "lucide-react"

import { routePaths } from "@/routes/routePaths"

import type { TranslationKey } from "@/constants/language/types"
import { UlbLink } from "./ulbLink"
import { useTranslation } from "@/context/languageContext"

interface NavItem {
  title: string
  href: string
}

type TranslateFn = (key: TranslationKey) => string

export const getOrdersCircularsItems = (t: TranslateFn): NavItem[] => [
  { title: t("nav.governmentOrders"), href: "governmentorders?tab=orders" },
  { title: t("nav.officeCirculars"), href: "governmentorders?tab=circulars" },
  { title: t("nav.publicNotices"), href: "governmentorders?tab=notices" },
  { title: t("nav.notifications"), href: routePaths.notifications },
]

/* ---------------- Desktop Link ---------------- */
function DesktopLink({
  to,
  children,
  className = "",
  active = false,
}: {
  to: string
  children: React.ReactNode
  className?: string
  active?: boolean
}) {
  return (
    <UlbLink
      to={to}
      className={`hidden px-4 py-3 text-[16px] font-medium ${active ? "text-orange-400" : "text-white"} hover:bg-white/10 lg:flex ${className}`}
    >
      {children}
    </UlbLink>
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
    <UlbLink
      to={to}
      onClick={onNavigate}
      className="block border-b border-white/10 px-5 py-3 text-sm text-white hover:bg-white/5"
    >
      {children}
    </UlbLink>
  )
}

/* ---------------- Header Bottom ---------------- */
export default function UlbHeaderBottom() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // const [menuOpen, setMenuOpen] = React.useState("")
  const [isFixed, setIsFixed] = React.useState(false)

  const { t } = useTranslation()
  // const ordersCircularsItems = getOrdersCircularsItems(t)

  const closeMobileMenu = () => setMobileOpen(false)

  React.useEffect(() => {
    // 144px = HeaderTop + HeaderMid combined height
    const onScroll = () => setIsFixed(window.scrollY > 144)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Spacer — prevents content jump when bar goes fixed */}
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
          <DesktopLink active={true} className="bg-white/10" to="">
            {t("ulbNav.home")}
          </DesktopLink>
          <DesktopLink to="#ulbesservices">{t("ulbNav.eServices")}</DesktopLink>

          <DesktopLink to="#informationKiosk">
            {t("ulbNav.informationKiosk")}
          </DesktopLink>

          <DesktopLink to="#orders">{t("ulbNav.orders")}</DesktopLink>
          {/* <DesktopLink to="#newsletter">
            {t("ulbNav.monthlyNewsletter")}
          </DesktopLink> */}
          <DesktopLink to="#photogallery">
            {t("ulbNav.photoGallery")}
          </DesktopLink>
          <DesktopLink to="#ulbcontactus">{t("ulbNav.contactUs")}</DesktopLink>
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
            <MobileLink to="" onNavigate={closeMobileMenu}>
              {t("ulbNav.home")}
            </MobileLink>
            <MobileLink to="#ulbesservices" onNavigate={closeMobileMenu}>
              {t("ulbNav.eServices")}
            </MobileLink>
            <MobileLink to="#informationKiosk" onNavigate={closeMobileMenu}>
              {t("ulbNav.informationKiosk")}
            </MobileLink>

            <MobileLink to="#orders" onNavigate={closeMobileMenu}>
              {t("ulbNav.orders")}
            </MobileLink>

            <MobileLink to="#photogallery" onNavigate={closeMobileMenu}>
              {t("ulbNav.photoGallery")}
            </MobileLink>
            <MobileLink to="#ulbcontactus" onNavigate={closeMobileMenu}>
              {t("ulbNav.contactUs")}
            </MobileLink>

            {/* <MobileLink to="#newsletter" onNavigate={closeMobileMenu}>
              {t("ulbNav.monthlyNewsletter")}
            </MobileLink> */}
            {/* 
            <MobileAccordion
              label={t("nav.ordersCirculars")}
              items={ordersCircularsItems}
              openMenu={menuOpen}
              setOpenMenu={setMenuOpen}
              onNavigate={closeMobileMenu}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
