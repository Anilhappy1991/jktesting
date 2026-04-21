import { useNavigate, useParams } from "react-router-dom"
import { type Lang, DEFAULT_LANG, SUPPORTED_LANGS } from "@/routes/routePaths"
import { useCallback } from "react"

export function useAppNavigate() {
  const navigate = useNavigate()
  const { lang: urlLang } = useParams<{ lang: string }>()

  const lang: Lang = SUPPORTED_LANGS.includes(urlLang as Lang)
    ? (urlLang as Lang)
    : DEFAULT_LANG

  const appNavigate = useCallback(
    (to: string, options?: { replace?: boolean; state?: unknown }) => {
      const fullPath = to === "" || to === "/" ? `/${lang}` : `/${lang}/${to}`
      navigate(fullPath, options)
    },
    [lang, navigate]
  )

  return appNavigate
}
