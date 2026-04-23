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
      className="group relative block rounded-2xl focus-visible:ring-2 focus-visible:ring-[#1b3060] focus-visible:outline-none"
    >
      {/*  Gradient Border Wrapper */}
      <div className="group-hover:shadow-1md rounded-2xl bg-gradient-to-br from-[#1b3060]/20 via-white/40 to-[#1b3060]/20 p-[1px] transition-all duration-500">
        <Card className="relative h-[250px] gap-0 overflow-hidden rounded-2xl border-0 bg-white/60 py-0 shadow-md backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
          {/*  Shine Effect */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            <div className="absolute top-0 -left-[120%] h-full w-[60%] rotate-12 bg-white/40 blur-xl transition-all duration-700 group-hover:left-[120%]" />
          </div>

          {/* Image */}
          <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />

            {/*  Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b3060]/70 via-[#1b3060]/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

            {/*  Center Icon */}
            <div className="absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <div className="rounded-full bg-white/90 p-3 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1b3060]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-4.553M19 5h-4m4 0v4M10 14l-4.553 4.553M5 19h4m-4 0v-4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/*  Caption */}
          <div className="relative bg-white/70 px-4 py-3 backdrop-blur-md">
            <p className="text-center text-sm font-semibold tracking-tight text-slate-700 transition-all duration-300 group-hover:text-[#1b3060]">
              {item.title}
            </p>

            {/*  Bottom underline animation */}
            <div className="mx-auto mt-2 h-[2px] w-0 bg-[#1b3060] transition-all duration-500 group-hover:w-10" />
          </div>
        </Card>
      </div>
    </AppLink>
  )
}
