import { Helmet } from "react-helmet"

export default function MetaTagGenerator({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  const defaultTitle = "Housing and Urban DD"
  const fullTitle = title ? `${title}` : defaultTitle

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={description || "Housing and Urban DD"}
      />
    </Helmet>
  )
}
