import { useTranslation } from "@/context/languageContext"
import { Link, useParams, type LinkProps } from "react-router-dom"
// import { useTranslation } from "@/context/LanguageContext"

interface UlbLinkProps extends Omit<LinkProps, "to"> {
  to: string
}

export function UlbLink({ to, ...props }: UlbLinkProps) {
  const { lang } = useTranslation()
  const { ulbSlug } = useParams<{ ulbSlug: string }>()

  const buildFullPath = () => {
    // If 'to' is empty ("" or "/"), point precisely to this specific ULB's home page
    if (to === "" || to === "/") return `/${lang}/ulb/${ulbSlug}`

    // Otherwise append the page route inside the ULB
    return `/${lang}/ulb/${ulbSlug}/${to}`
  }

  return <Link to={buildFullPath()} {...props} />
}
