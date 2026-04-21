import { createContext, useContext, useMemo, type ReactNode } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import en from "@/constants/language/en.json"
import hi from "@/constants/language/hi.json"
// import ur from "@/constants/language/ur.json"

// import type { TranslationKey, LocaleDictionary } from "@/types/locale"
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/routes/routePaths"
import type {
  LocaleDictionary,
  TranslationKey,
} from "@/constants/language/types"

const dictionaries: Record<Lang, LocaleDictionary> = {
  en,
  hi: hi as LocaleDictionary, // TS will error if hi.json is missing keys
  // ur: ur as LocaleDictionary,
}

interface LanguageContextValue {
  lang: Lang
  setLanguage: (lang: Lang) => void
  t: (key: TranslationKey) => string // ← type-safe!
  supportedLangs: typeof SUPPORTED_LANGS
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang: urlLang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const lang: Lang = SUPPORTED_LANGS.includes(urlLang as Lang)
    ? (urlLang as Lang)
    : DEFAULT_LANG

  const setLanguage = (newLang: Lang) => {
    if (newLang === lang) return
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`)
    navigate(newPath + location.search + location.hash, { replace: true })
  }

  const t = useMemo(() => {
    const dict = dictionaries[lang]

    return (key: TranslationKey): string => {
      const value = key.split(".").reduce<unknown>((obj, k) => {
        if (obj && typeof obj === "object") {
          return (obj as Record<string, unknown>)[k]
        }
        return undefined
      }, dict)

      return typeof value === "string" ? value : key
    }
  }, [lang])

  return (
    <LanguageContext.Provider
      value={{ lang, setLanguage, t, supportedLangs: SUPPORTED_LANGS }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider")
  }
  return ctx
}
