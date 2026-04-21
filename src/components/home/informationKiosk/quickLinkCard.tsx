import { AppLink } from "@/components/common/appLink"

type QuickLinkCardProps = {
  item: QuickLinkItem
}

export interface QuickLinkItem {
  id: number
  title: string
  icon: string
  href: string
  external?: boolean
}

export const QuickLinkCard = ({ item }: QuickLinkCardProps) => {
  const { title, icon, href, external = false } = item

  const cardClassName =
    "flex  flex-col items-center justify-center rounded-[5px] bg-[#dddddd] px-2 py-4 text-center shadow-[0_10px_28px_rgba(15,76,129,0.06)] transition-transform duration-300 hover:scale-105 hover:bg-[#0f3d69] text-black hover:text-white border w-auto h-38 md:h-38  md:w-38  hover:text-white"

  const content = (
    <>
      <div className="mb-2 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(15,76,129,0.08)]">
        <img src={icon} alt={title} className="h-10 w-10 object-contain" />
      </div>

      <h3 className="text-[16px] font-bold tracking-tight">{title}</h3>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cardClassName}>
        {content}
      </a>
    )
  }

  return (
    <AppLink to={href} className={cardClassName}>
      {content}
    </AppLink>
  )
}
