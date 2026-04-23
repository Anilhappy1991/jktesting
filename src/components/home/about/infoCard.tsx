type InfoCardProps = {
  title: string
  icon: string
}

export default function InfoCard({ title, icon }: InfoCardProps) {
  return (
    <div className="mt-5 h-[165px] items-center justify-center gap-3 rounded-md bg-[#ffffff] p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-[#8ec5ff] sm:gap-4 sm:p-2">
      <div className="flex justify-center">
        {/* Image */}
        <img
          src={icon}
          alt={title}
          className="mt-4 h-12 w-12 rounded-full bg-[#d8e3f8] object-contain p-[7px] sm:h-12 sm:h-14 sm:w-14 md:h-14 md:w-14"
        />
      </div>
      {/* Title */}
      <h3 className="mt-4 text-center text-sm leading-snug font-medium text-[#04294b] sm:text-sm md:text-sm">
        {title}
      </h3>
    </div>
  )
}
