import { Button } from "@/components/ui/button"

export default function GalleryContent() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full" />
      </div>

      <div className="relative container mx-auto">
        {/* Top Label */}
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-wide text-orange-500 uppercase">
            Gallery
          </p>
          <div className="mt-2 h-[3px] w-16 rounded-full bg-orange-500" />
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-[16px] leading-tight font-bold sm:text-2xl md:text-3xl">
          <span className="text-[#1f4e79]">Glimpses of </span>{" "}
          <span className="mt-2 block text-[#1f4e79]">
            Jammu Municipal Corporation
          </span>
        </h1>

        {/* Small Plus Icon */}
        {/* <div className="mt-6 text-3xl text-blue-200">+</div> */}

        {/* Button */}
        <div className="mt-10">
          <Button className="rounded-md bg-[#1f4e79] px-6 py-6 text-lg text-white shadow-md hover:bg-[#1a3d5c]">
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
