import { Card, CardContent } from "@/components/ui/card"

export interface EServiceCardProps {
  title: string
  description: string
  icon: string
  redirectLink?: string | null
  buttonText?: string
  onClick?: () => void
}

export const EServiceCard = ({
  title,
  description,
  icon,
  redirectLink,
  buttonText = "Click Here",
  onClick,
}: EServiceCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative h-[100%] cursor-pointer overflow-hidden rounded-md border-0 border-b-2 border-b-[#1f4e79] pt-0 pb-5 shadow-md transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1f4e79]/40 to-[#1f4e79] pt-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="relative z-10 flex flex-col gap-3 pt-2 pb-0">
        {/* Top Content */}
        <div className="group flex h-[100px] items-start gap-3 pt-4 sm:gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 rounded-full bg-[#e2f2fcf7] p-[10px] transition-colors duration-300 group-hover:bg-[#ffffff] group-hover:shadow-[0px_0px_0px_1px_#2c588078]">
            <img
              src={icon}
              alt={title}
              className="h-12 w-12 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
            />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h3 className="md:text-md text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-white sm:text-base">
              {title}
            </h3>

            <p className="mt-1 line-clamp-2 overflow-hidden text-[11px] leading-4 text-gray-600 transition-colors duration-300 group-hover:text-gray-100 sm:text-xs sm:leading-4">
              {description}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          {redirectLink ? (
            <a
              href={redirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-sm bg-gray-200 px-2 py-1 text-[12px] text-gray-800 transition-all duration-300 group-hover:bg-white group-hover:text-black sm:px-2 sm:py-2"
              onClick={(event) => event.stopPropagation()}
            >
              {buttonText}
            </a>
          ) : (
            <button
              type="button"
              className="cursor-not-allowed rounded-md bg-gray-200 px-3 py-1.5 text-xs text-gray-500 sm:px-4 sm:py-2 sm:text-sm"
              disabled
            >
              {buttonText}
            </button>
          )}
        </div>
      </CardContent>

      {/* Bottom Line */}
      {/* <div className="absolute bottom-2 left-0 h-[1px] w-full bg-[#1f4e79] transition-colors duration-300 group-hover:bg-blue-900 sm:h-1 md:h-1" /> */}
    </Card>
  )
}
