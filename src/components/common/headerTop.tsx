import AccessibilityBar from "./accessibilityBar"

const HeaderTopSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-2 bg-[#0b4a78] px-3 py-1 text-[10px] text-white sm:flex-row sm:gap-4 sm:px-4 sm:text-xs">
        {/* Left Text */}
        <span className="text-center leading-tight sm:text-left">
          जम्मू और कश्मीर सरकार | Government of Jammu and Kashmir
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
