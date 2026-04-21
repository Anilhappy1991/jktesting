import { Link } from "react-router-dom"
import WhatsNewMarquee from "./whatsNewMarquee"

const quickLinks = [
  { label: "Notices", href: "#" },
  { label: "Orders", href: "#" },
  { label: "Circulars", href: "#" },
  { label: "Tenders", href: "#" },
  // { label: "Monthly Newsletter", href: "/newsletter" },
]

export default function WhatsNewBanner() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-none shadow-md sm:-top-[0px] sm:-top-[72px] md:flex-row">
      {/* Left Section */}

      <div className="z-[9] h-[114px] overflow-hidden bg-[#4a8ecb] p-4 pt-2 text-white md:w-1/3">
        {/* <h2 className="mb-2 text-xl font-semibold">Latest Notices</h2> */}
        <WhatsNewMarquee />
      </div>

      {/* Right Section */}
      <div className="relative top-[5px] mt-0 flex h-[50px] flex-1 items-center bg-gradient-to-r from-[#2c5d91] to-[#3f7fc0] px-4 py-2 text-white sm:top-[48px] sm:mt-5">
        <span className="mr-2 ml-0 text-[14px] font-semibold whitespace-nowrap sm:mr-6 sm:ml-7 sm:text-[16px]">
          Quick Links:
        </span>

        <div className="flex flex-wrap gap-4 sm:gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-[12px] transition-colors hover:text-yellow-300 md:text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
