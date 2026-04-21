import { useParams } from "react-router-dom"
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/routes/routePaths"

//get current language url
export function useLang(): Lang {
  const { lang } = useParams<{ lang: string }>()
  return SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG
}
