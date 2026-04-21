import { Button } from "@/components/ui/button"
import { decrease, increase, reset } from "@/features/fontSize/fontSizeSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { useLocation, useNavigate } from "react-router-dom"
// import { ModeToggle } from "../mode-toggle"
import LanguageSwitcher from "./langSwitcher"
import { useLang } from "@/hooks/useLang"
import { AppLink } from "./appLink"
import { Accessibility } from "lucide-react"
import { routePaths } from "@/routes"
import { Separator } from "../ui/separator"
import { useTranslation } from "@/context/languageContext"

const bannerButtonClasses =
  "cursor-pointer  rounded-none border-0 bg-transparent px-0 py-0 text-white shadow-none hover:bg-transparent hover:text-white focus-visible:ring-0 focus-visible:outline-none"

export default function AccessibilityBar() {
  const dispatch = useAppDispatch()
  const size = useAppSelector((state) => state.FontSize.fontSize)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const ABOUT_SECTION_ID = "home-about"

  const handleSkipToMainContent = () => {
    const lang = useLang()

    // Check if on home page: pathname is "/{lang}" or "/{lang}/"
    const isHomePage =
      location.pathname === `/${lang}` || location.pathname === `/${lang}/`
    if (isHomePage) {
      const section = document.getElementById(ABOUT_SECTION_ID)
      section?.scrollIntoView({ behavior: "smooth", block: "start" })
      if (location.hash !== `#${ABOUT_SECTION_ID}`) {
        navigate(`/${lang}#${ABOUT_SECTION_ID}`, { replace: true })
      }
      return
    }
  }

  const fontButtons = [
    {
      label: "A-",
      ariaLabel: "Decrease font size",
      onClick: () => dispatch(decrease()),
      isActive: size === "small",
    },
    {
      label: "A",
      ariaLabel: "Default font size",
      onClick: () => dispatch(reset()),
      isActive: size === "medium",
    },
    {
      label: "A+",
      ariaLabel: "Increase font size",
      onClick: () => dispatch(increase()),
      isActive: size === "large",
    },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-[0.95rem] sm:justify-end">
      {/* <ModeToggle /> */}
      <LanguageSwitcher />
      <Separator orientation="vertical" className="my-auto h-4" />
      <AppLink to={routePaths.screenReader}>
        <Accessibility size={16} />
      </AppLink>
      <Separator orientation="vertical" className="my-auto h-4" />
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => handleSkipToMainContent()}
        className={`${bannerButtonClasses} text-[10px] tracking-wide uppercase hover:text-[#f3aa44] sm:font-medium`}
      >
        {t("common.skipToMainContent")}
      </Button>

      <Separator orientation="vertical" className="my-auto h-4" />

      {fontButtons.map((button, index) => (
        <div
          key={button.label}
          className="flex items-center gap-2 text-[10px] md:text-[12px]"
        >
          <Button
            type="button"
            variant="ghost"
            size="xs"
            aria-label={button.ariaLabel}
            aria-pressed={button.isActive}
            onClick={button.onClick}
            className={`${bannerButtonClasses} text-[10px]`}
          >
            {button.label}
          </Button>

          {index < fontButtons.length - 1 && (
            <Separator orientation="vertical" className="my-auto h-4" />
          )}
        </div>
      ))}
    </div>
  )
}
