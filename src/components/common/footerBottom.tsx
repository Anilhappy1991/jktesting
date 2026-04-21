import ScrollPageToTop from "./scrollToTop"
import VisitorCounter from "./visitCounter"
import { AppLink } from "./appLink"

const footerLinks = [
  { label: "Site Map", href: "" },
  { label: "Archive", href: "" },
  {
    label: "Cancellation Refund Policy",
    href: "https://jkhudd.mycitydemo.in/assets/footer_document/Cancellation_Policy_New.pdf",
  },
  {
    label: "Privacy Policy",
    href: "https://jkhudd.mycitydemo.in/assets/footer_document/Privacy_Policy_New.pdf",
  },
  {
    label: "Hyper Linking Policy",
    href: "https://jkhudd.mycitydemo.in/assets/footer_document/Hyper_Linking_Policy_New.pdf",
  },
  {
    label: "Terms & Conditions",
    href: "https://jkhudd.mycitydemo.in/assets/footer_document/Terms%20&%20Conditions.pdf",
  },
  {
    label: "Disclaimer",
    href: "https://jkhudd.mycitydemo.in/assets/footer_document/Disclaimer.pdf",
  },
  { label: "Help", href: "" },
]

export default function FooterBottom() {
  return (
    <footer className="w-full">
      <div className="flex justify-end bg-white px-6 py-1 pb-0">
        <VisitorCounter />
      </div>
      <div className="border-t-[5px] border-r-[10px] border-b-[10px] border-l-[10px] border-white bg-[#333333] text-[12px] text-white sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 px-3 py-2 text-[13px] sm:gap-2 sm:px-4 sm:py-3">
          {footerLinks.map((item, index) => (
            <span key={index} className="flex flex-wrap items-center">
              {item.href ? (
                <AppLink
                  to={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  className="whitespace-nowrap transition-colors duration-200 hover:text-gray-200 hover:underline"
                >
                  {item.label}
                </AppLink>
              ) : (
                <span className="cursor-default whitespace-nowrap text-white">
                  {item.label}
                </span>
              )}

              {index !== footerLinks.length - 1 && (
                <span className="mx-1 text-gray-300 sm:mx-2">|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <ScrollPageToTop />
      <div className="bg-[#ffffff] px-2 py-1 text-center text-[11px] text-gray-600 sm:text-sm">
        © {new Date().getFullYear()} | All rights reserved. Housing & Urban
        Development Department Govt. of J&K.
      </div>
    </footer>
  )
}
