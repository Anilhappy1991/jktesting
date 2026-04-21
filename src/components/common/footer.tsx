import { Button } from "@/components/ui/button"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import { routePaths } from "@/routes/routePaths"

import FooterBottom from "./footerBottom"
import { AppLink } from "./appLink"
// import { useGetFooterLinksQuery } from "@/features/footer/footerApi"
import { useLang } from "@/hooks/useLang"
// import type { FooterLinkItem } from "@/features/footer/footerTypes"
import { useTranslation } from "@/context/languageContext"
import type { FooterLinkItem } from "@/features/footer/footerTypes"
import { useGetFooterLinksQuery } from "@/features/footer/footerApi"

// type FooterNavItem = {
//   label: string
//   to?: string
//   href?: string
//   disabled?: boolean
// }

// type FooterLinkConfig = {
//   label: string
//   url: string
// }

// const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

// const toFooterNavItem = ({ label, url }: FooterLinkConfig): FooterNavItem =>
//   isExternalUrl(url)
//     ? { label, href: url }
//     : url
//       ? { label, to: url }
//       : { label, disabled: true }

/* ---------------- Links ---------------- */

// const subordinateDepartmentLinks: FooterNavItem[] = [
//   { label: "Jammu Municipal Corporation", url: "https://jmc.jk.gov.in" },
//   { label: "Directorate ULB Kashmir", url: "" },
//   { label: "Directorate ULB Jammu", url: "https://ulbjammu.jk.gov.in/" },
//   {
//     label: "Srinagar Development Authority",
//     url: "https://sdasrinagar.jk.gov.in/",
//   },
//   { label: "Jammu Development Authority", url: "https://www.jda.jk.gov.in/" },
// ].map(toFooterNavItem)

// const importantLinks: FooterNavItem[] = [
//   { label: "Swachh Bharat Mission", url: "https://swachh.jk.gov.in/" },
//   {
//     label: "Ministry of Housing and Urban Affairs (MHUA)",
//     url: "https://mohua.gov.in/",
//   },
//   {
//     label: "Jammu and Kashmir General Administration Department",
//     url: "https://jkgad.nic.in/",
//   },
//   {
//     label: "Srinagar Smart City Limited",
//     url: "https://sdasrinagar.jk.gov.in/",
//   },
//   { label: "Jammu Smart City Limited", url: "https://myjammu.jk.gov.in/" },
//   {
//     label: "Jammu & Kashmir Housing Board",
//     url: "https://jkhousingboard.jk.gov.in/",
//   },
//   {
//     label: "Jammu and Kashmir Real Estate Regulatory Authority",
//     url: "https://rera.jk.gov.in/",
//   },
// ].map(toFooterNavItem)

// const additionalInformationLinks: FooterNavItem[] = [
//   { label: "FAQs", url: "faqs" },
//   { label: "Resources", url: "" },
//   { label: "Guidelines", url: "" },
//   { label: "Contact Us", url: "contact-us" },
//   {
//     label: "Helpdesk",
//     url: "https://hudd.jk.gov.in/assets/document/HelpdeskOBPS.pdf",
//   },
// ].map(toFooterNavItem)

/* ---------------- Social ---------------- */

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18Mb3vSxSa/?mibextid=wwXIfr",
    icon: FaFacebook,
  },
  {
    label: "X",
    href: "https://x.com/jkhudd1?s=11",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jkhudd1?igsh=MW05NTdiZ3VyaTdncw==",
    icon: FaInstagram,
  },
]
/* ---------------- Footer Link ---------------- */

function FooterLink({ item }: { item: FooterLinkItem }) {
  const activeClasses =
    "text-sm text-white transition-colors hover:text-white hover:underline"

  const disabledClasses = "text-sm text-white cursor-default"

  //  Disabled or empty
  if (item.url && item.url === "") {
    return (
      <li>
        <span className={disabledClasses}>{item.text}</span>
      </li>
    )
  }

  //  Internal
  if (item.url) {
    return (
      <li>
        <AppLink to={item.url} className={activeClasses}>
          {item.text}
        </AppLink>
      </li>
    )
  }

  //  External
  if (item.url) {
    return (
      <li>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={activeClasses}
        >
          {item.text}
        </a>
      </li>
    )
  }

  return null
}

/* ---------------- Section ---------------- */

function FooterSection({
  title,
  items,
}: {
  title: string
  items: FooterLinkItem[]
}) {
  return (
    <div>
      <h3 className="text-[17px] font-semibold text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <FooterLink key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

/* ---------------- Footer ---------------- */

export default function Footer() {
  const lang = useLang()
  const { t } = useTranslation()
  const { data: footerLinks } = useGetFooterLinksQuery({ lang })
  return (
    <footer className="flex flex-col bg-[url('/images/footer-bg-img.png')] bg-cover bg-no-repeat text-white lg:bg-center">
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Social */}
          <div>
            <AppLink to={routePaths.home}>
              <img
                src="/images/footerlogo.png"
                alt="logo"
                className="w-40 sm:w-48 lg:w-56"
              />
            </AppLink>

            <p className="mt-4 text-xs text-white sm:text-sm">
              {lang == "en"
                ? `Empowering urban local bodies and building sustainable,
              citizen-focused cities.`
                : `शहरी स्थानीय निकायों को सशक्त बनाना और सतत, नागरिक-केंद्रित शहरों का निर्माण करना।`}
            </p>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.label}
                    asChild
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>

          <FooterSection
            title={t("headings.subordinateDepartments")}
            items={footerLinks?.data?.departments || []}
          />

          <FooterSection
            title={t("headings.importantLinks")}
            items={footerLinks?.data?.important_links || []}
          />

          <FooterSection
            title={t("headings.additionalInformation")}
            items={footerLinks?.data?.additional_info || []}
          />
        </div>
      </div>

      <FooterBottom />
    </footer>
  )
}
