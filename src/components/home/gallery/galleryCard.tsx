import { routePaths, withSlug } from "@/routes/routePaths"
import { Card } from "@/components/ui/card"
import { AppLink } from "@/components/common/appLink"

export type GalleryItem = {
  id: number
  title: string
  category: string
  image_url: string
}

export type GalleryUIItem = {
  id: number
  title: string
  image: string
  slug: string
}

export default function GalleryCard({ item }: { item: GalleryUIItem }) {
  return (
    <AppLink
      to={withSlug(routePaths.galleryDetail, item.slug)}
      className="group relative block rounded-2xl focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <Card className="card_design h-[270px] overflow-hidden rounded-sm border border-[#cce3f7] bg-[#E2F2FC] p-0 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-xl">
        {/* Image container */}
        <div className="relative aspect-[4/3] h-[275px] overflow-hidden pt-[6px] pr-[6px] pb-0 pl-[6px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:mt-[6px] hover:mr-[6px] hover:ml-[6px] hover:pb-0"
            loading="lazy"
          />

          {/* Overlay — hidden by default, fades in on hover */}
          <div className="absolute inset-0 bg-[#1b3060]/0 transition-colors duration-300" />

          {/* "Open Gallery" pill — slides up on hover */}
          {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1b3060] shadow-lg hover:bg-white"
            >
              <ExternalLink className="h-3 w-3" />
              Open Gallery
            </Badge>
          </div> */}
        </div>

        {/* Caption */}
        <div className="bg-[#E2F2FC] px-4 py-3 pt-0">
          <p className="text-center text-sm leading-snug font-medium text-slate-700 transition-colors duration-200 group-hover:text-[#1b3060]">
            {item.title}
          </p>
        </div>
      </Card>
    </AppLink>
  )
}
