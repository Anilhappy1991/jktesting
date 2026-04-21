import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Globe, ChevronDown, Check } from "lucide-react"

import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/routes/routePaths"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const langLabels: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
}

export default function LanguageSwitcher() {
  const { lang: urlLang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const currentLang: Lang = SUPPORTED_LANGS.includes(urlLang as Lang)
    ? (urlLang as Lang)
    : DEFAULT_LANG

  const switchLanguage = (newLang: Lang) => {
    if (newLang === currentLang) return

    const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`)
    navigate(newPath + location.search + location.hash, { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex h-8 items-center gap-1.5 px-0 py-1 text-white transition-colors hover:bg-[#1f4e79] hover:text-white sm:px-2"
        >
          <Globe size={16} />
          <span className="text-[11px] font-medium sm:text-sm">
            {langLabels[currentLang]}
          </span>
          <ChevronDown size={14} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[120px]">
        {SUPPORTED_LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={`flex cursor-pointer items-center justify-between ${
              currentLang === lang ? "bg-gray-100 font-bold text-[#1f4e79]" : ""
            }`}
          >
            {langLabels[lang]}

            {currentLang === lang && (
              <Check size={14} className="text-[#dc8839]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
