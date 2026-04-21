export default function ScreenReaderBanner() {
  return (
    <div className="relative h-[220px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/inner-banner.jpg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Blur + Overlay */}
      <div className="absolute inset-0" />

      {/* Optional Gradient (for smooth fade effect) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-8">
        <h1 className="text-3xl font-bold tracking-wide text-[#0b4a78] md:text-4xl">
          SCREEN READER ACCESS
        </h1>
      </div>
    </div>
  )
}
