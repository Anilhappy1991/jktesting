import { Link, useParams, type LinkProps } from "react-router-dom"
import { type Lang, DEFAULT_LANG, SUPPORTED_LANGS } from "@/routes/routePaths"

interface AppLinkProps extends Omit<LinkProps, "to"> {
  to: string
  lang?: Lang
}

export function AppLink({ to, lang: overrideLang, ...props }: AppLinkProps) {
  const { lang: urlLang } = useParams<{ lang: string }>()

  const lang =
    overrideLang ??
    (SUPPORTED_LANGS.includes(urlLang as Lang)
      ? (urlLang as Lang)
      : DEFAULT_LANG)

  const buildFullPath = () => {
    if (to === "" || to === "/") return `/${lang}`

    if (to.startsWith("#")) return `/${lang}${to}`

    if (
      SUPPORTED_LANGS.some((l) => to.startsWith(`/${l}/`) || to === `/${l}`)
    ) {
      return to
    }

    if (to.startsWith("http")) return to

    return `/${lang}/${to}`
  }

  return <Link to={buildFullPath()} {...props} />
}
