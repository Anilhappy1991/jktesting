// import { AppLink } from "./appLink"

import { UlbLink } from "./ulbLink"

interface HeaderMidSectionProps {
  // Left Logo
  leftLogoSrc?: string
  leftLogoAlt?: string
  homeLink?: string

  // Center Text
  title1?: string
  title2?: string
  subtitle?: string

  // Right Logo (Optional)
  rightLogoSrc?: string
  rightLogoAlt?: string

  // Container styling just in case
  className?: string
}

export const HeaderMidSection = ({
  leftLogoSrc = "/images/govlogo.png",
  leftLogoAlt = "Gov Logo",
  homeLink = "/", // By default goes to global root
  title1 = "आवास और शहरी विकास विभाग",
  title2 = "Housing & Urban Development Department",
  subtitle = "Government of Jammu & Kashmir",
  rightLogoSrc = "/images/digitalindia.png",
  rightLogoAlt = "Digital India",
  className = "bg-background",
}: HeaderMidSectionProps) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 px-3 py-2 text-foreground sm:gap-4 sm:px-4 lg:px-6 ${className}`}
    >
      {/* ── Left Logo ── */}
      <div className="flex-shrink-0">
        {/* We use AppLink here, but for ULBs you might pass a normal <Link> or UlbLink from the parent */}
        <UlbLink to={homeLink}>
          <img
            src={leftLogoSrc}
            alt={leftLogoAlt}
            className="w-10 sm:w-20 md:w-24"
          />
        </UlbLink>
      </div>

      {/* ── Center Content ── */}
      <div className="flex-1 px-1 text-center sm:px-2">
        {/* Only render if string is provided */}
        {title1 && (
          <h1 className="text-sm leading-tight font-semibold text-foreground sm:text-lg md:text-2xl">
            {title1}
          </h1>
        )}

        {title2 && (
          <h2 className="mt-0.5 text-xs leading-tight font-bold text-foreground sm:mt-1 sm:text-base md:text-xl lg:text-2xl">
            {title2}
          </h2>
        )}

        {subtitle && (
          <p className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:mt-1 sm:text-sm md:text-lg lg:text-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Right Logo (Conditionally Rendered) ── */}
      <div className="flex-shrink-0">
        {rightLogoSrc && (
          <img
            src={rightLogoSrc}
            alt={rightLogoAlt}
            className="w-20 sm:w-28 md:w-36 lg:w-38"
          />
        )}
      </div>
    </div>
  )
}
