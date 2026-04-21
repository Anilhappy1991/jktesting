import { AppLink } from "./appLink"

export const HeaderMidSection = () => {
  return (
    <div className="flex items-center justify-between gap-2 bg-background px-3 py-2 text-foreground sm:gap-4 sm:px-4 lg:px-6">
      {/* Left Logo */}
      <div className="flex-shrink-0">
        <AppLink to={"/"}>
          <img
            src="/images/govlogo.png"
            alt="Gov Logo"
            className="w-10 sm:w-12 md:w-14"
          />
        </AppLink>
      </div>

      {/* Center Content */}
      <div className="flex-1 px-1 text-center sm:px-2">
        <h1 className="text-sm leading-tight font-semibold text-foreground sm:text-lg md:text-2xl">
          आवास और शहरी विकास विभाग
        </h1>

        <h2 className="mt-0.5 text-xs leading-tight font-bold text-foreground sm:mt-1 sm:text-base md:text-xl lg:text-2xl">
          Housing & Urban Development Department
        </h2>

        <p className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:mt-1 sm:text-sm md:text-lg lg:text-xl">
          Government of Jammu & Kashmir
        </p>
      </div>

      {/* Right Logo */}
      <div className="flex-shrink-0">
        <img
          src="/images/digitalindia.png"
          alt="Digital India"
          className="w-20 sm:w-28 md:w-36 lg:w-38"
        />
      </div>
    </div>
  )
}
