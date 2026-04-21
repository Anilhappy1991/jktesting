import AccessibilityBar from "@/components/common/accessibilityBar"
import type { ReactNode } from "react"
// import AccessibilityBar from "./accessibilityBar"

interface HeaderTopSectionProps {
  leftText?: ReactNode
  className?: string
}

const HeaderTopSection = ({
  leftText = "जम्मू और कश्मीर सरकार | Government of Jammu and Kashmir",
  className = "bg-[#0b4a78]",
}: HeaderTopSectionProps) => {
  return (
    <div>
      <div
        className={`flex flex-col items-center justify-between gap-2 px-3 py-1 text-[10px] text-white sm:flex-row sm:gap-4 sm:px-4 sm:text-xs ${className}`}
      >
        {/* Left Text */}
        <span className="text-center leading-tight sm:text-left">
          {leftText}
        </span>

        {/* Right Accessibility */}
        <div className="flex w-full justify-center sm:w-auto sm:justify-end">
          <AccessibilityBar />
        </div>
      </div>
    </div>
  )
}

export default HeaderTopSection
