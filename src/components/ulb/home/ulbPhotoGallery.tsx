import { useEffect } from "react"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import GalleryContent from "./ulbGalleryContent"
// import GalleryContent from "./galleryContent"

const galleryItems = [
  {
    title: "Swachh Jammu Abhiyan ",
    image: "/images/SwachhJammuAbhiyan.jpg",
  },
  {
    title: "Miscellaneous",
    image: "/images/Miscellaneous.jpeg",
  },
  {
    title: "Anti Encroachment Drives ",
    image: "/images/AntiEncroachmentDrives.jpg",
  },
  {
    title: "Sanitation Drives ",
    image: "/images/SanitationDrives.jpg",
  },
  {
    title: "Maintenance of Rotaries/Triangles ",
    image: "/images/MaintenanceofRotaries.jpg",
  },
  {
    title: "Jammu at a Glance ",
    image: "/images/JammuatGlance.jpeg",
  },
]

export default function PhotoGallery() {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {})
    return () => Fancybox.destroy()
  }, [])

  return (
    <section
      id="photogallery"
      className="px-4 pt-10 pb-10 sm:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto p-4 px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="">
            <GalleryContent />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {galleryItems.map((item, index) => (
                <a
                  key={index}
                  href={item.image}
                  data-fancybox="gallery"
                  className="group relative block overflow-hidden rounded-md shadow-md"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/40" />

                  {/* Title */}
                  <div className="text-md absolute right-4 bottom-4 left-4 leading-snug font-semibold text-white">
                    {item.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
