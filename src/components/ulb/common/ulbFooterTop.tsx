import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Button } from "@/components/ui/button"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import {
  // MapPin,
  // Phone,
  // Mail,

  ChevronRight,
} from "lucide-react"

/* ---------------- Types ---------------- */
interface SocialLink {
  label: string
  href: string
  icon: React.ElementType
}

interface NavLink {
  label: string
  // href?: string
}

/* ---------------- Social ---------------- */

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebook,
  },
  {
    label: "X",
    href: "#",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
]

const quickLinks: NavLink[] = [
  { label: "Tenders" },
  { label: "Orders" },
  { label: "Notifications" },
  { label: "e-Services" },
  { label: "Photo Gallery" },
]

const contactLinks: NavLink[] = [
  { label: "Address: Town Hall Jammu, Jammu and Kashmir 180001" },
  { label: "Toll Free: 18001807207 (10:00 AM - 05:00 PM on working days)" },
  // { label: "Guidelines" },
  // { label: "Contact Us" },
  // { label: "Helpdesk" },
]

/* ---------------- Sub-components ---------------- */
function SocialButton({ link }: { link: SocialLink }) {
  const Icon = link.icon
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-200 hover:border-white/40 hover:bg-white/25"
    >
      <Icon className="h-4 w-4 text-white/80 transition-colors group-hover:text-white" />
    </a>
  )
}

function FooterNavItem({ label }: { label: string }) {
  return (
    <li>
      <a
        href="#"
        className="group flex items-center gap-1 text-sm text-gray-300 transition-colors duration-150 hover:text-white"
      >
        <ChevronRight className="-ml-4 h-3 w-3 opacity-0 transition-all duration-150 group-hover:ml-0 group-hover:opacity-100" />
        {label}
      </a>
    </li>
  )
}

function ContactItem({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-2 last:border-0">
      <span className="text-sm text-gray-300 transition-colors duration-150 hover:text-white">
        {label}
      </span>
      {/* <ExternalLink className="h-3.5 w-3.5 text-gray-500 transition-colors hover:text-gray-300" /> */}
    </div>
  )
}

/* ---------------- Main Component ---------------- */
export default function UlbFooterSection() {
  return (
    <footer
      id="ulbcontactus"
      className="relative flex flex-col overflow-hidden text-white"
    >
      {/* Background */}
      <div
        className="absolute inset-0 h-24 w-24 bg-cover bg-center bg-no-repeat opacity-20"
        aria-hidden="true"
      />
      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 flex flex-col bg-[url('/images/footer-bg-img.png')] bg-cover bg-no-repeat text-white lg:bg-center"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* ── LEFT: Brand ── */}
          <div className="flex flex-col gap-2">
            <a href="/" aria-label="Go to homepage">
              <img
                src="/images/jmc-logo.jpg"
                alt="Jammu Municipal Corporation"
                className="w-[100px] rounded-sm"
              />
            </a>

            <p className="max-w-xs text-sm leading-relaxed text-gray-300">
              Empowering urban local bodies and building sustainable,
              citizen-focused cities across Jammu & Kashmir.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((link) => (
                <SocialButton key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* ── CENTRE: Quick Links ── */}
          <div>
            <h2 className="mb-5 text-base font-semibold tracking-widest text-white/70 uppercase">
              Quick Links
            </h2>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <FooterNavItem key={link.label} label={link.label} />
              ))}
            </ul>
          </div>

          {/* ── RIGHT: Contact ── */}
          <div>
            <h2 className="mb-5 text-base font-semibold tracking-widest text-white/70 uppercase">
              Contact & Support
            </h2>

            <Card className="rounded-xl border border-white/10 bg-white/5 shadow-none">
              <CardContent className="p-4">
                {contactLinks.map((link) => (
                  <ContactItem key={link.label} label={link.label} />
                ))}
              </CardContent>
            </Card>

            {/* Optional contact detail chips */}
            {/* <div className="mt-4 flex flex-col gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                support@jkhudd.gov.in
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                1800-XXX-XXXX (Toll Free)
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Housing & Urban Development Dept., J&K
              </span>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        {/* <Separator className="mt-10 mb-0 bg-white/10" /> */}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 bg-black/60 px-6 py-4">
        <p className="text-center text-xs text-gray-400">
          © 2026 | All rights reserved.{" "}
          <span className="font-medium text-gray-300">
            Jammu Municipal Corporation
          </span>
        </p>
      </div>
    </footer>
  )
}
