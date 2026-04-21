import { useMemo } from "react"
import { useGetStakeholdersQuery } from "@/features/home/stakeholdersApi"

const MIN_MARQUEE_ITEMS = 10

export default function StakeHolders() {
  const { data: stakeholdersData } = useGetStakeholdersQuery()

  const items = stakeholdersData?.data || []

  const marqueeItems = useMemo(() => {
    if (!items.length) return []

    let repeated = [...items]

    while (repeated.length < MIN_MARQUEE_ITEMS) {
      repeated = [...repeated, ...items]
    }

    return repeated
  }, [items])

  if (!marqueeItems.length) {
    return null
  }

  const animationDuration = Math.max(18, marqueeItems.length * 2.4)

  return (
    <section className="stakeholders-marquee overflow-hidden py-2 pb-10">
      <div
        className="stakeholders-marquee-track flex w-max items-center"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            aria-hidden={copyIndex === 1}
            className="stakeholders-marquee-sequence flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5 lg:gap-6 lg:pr-6"
          >
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${copyIndex}-${index}`}
                className="flex h-24 w-[132px] shrink-0 items-center justify-center rounded-xl bg-white px-4 sm:w-[150px] lg:w-[170px]"
              >
                <img
                  src={item.logo_url}
                  alt="stakeholder"
                  className="max-h-28 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
