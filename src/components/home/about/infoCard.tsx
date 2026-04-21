type InfoCardProps = {
  title: string
  icon: string
}

export default function InfoCard({ title, icon }: InfoCardProps) {
  return (
    <div className="flex items-center justify-start gap-3 rounded-2xl bg-[#ffffff] p-4 shadow-sm transition-transform duration-300 hover:scale-105 sm:gap-4 sm:p-5">
      {/* Image */}
      <img
        src={icon}
        alt={title}
        className="h-18 w-18 object-contain sm:h-12 sm:h-14 sm:w-12 sm:w-14 md:h-16 md:w-16"
      />

      {/* Title */}
      <h3 className="text-sm leading-snug font-medium text-[#04294b] sm:text-sm md:text-sm">
        {title}
      </h3>
    </div>
  )
}
