import { FileText, ArrowRight } from "lucide-react"

const dummyNewsData = [
  {
    id: 1,
    title: "Update information on engagement of PMU under AMRUT 2.0",
    image: "/images/information.png",
    link: "#",
    thumbVariant: "doc",
  },
  {
    id: 2,
    title:
      "Provisional Select list for engagement (Retirees) of PMU under AMRUT 2.0",
    image: "/images/Provisional.png",
    link: "#",
    thumbVariant: "list",
  },
  {
    id: 3,
    title:
      "Advisory on Secure Use of Official Email Accounts and compliance with Cyber security guidelines",
    image: "/images/Advisory.png",
    link: "#",
    thumbVariant: "cyber",
  },
  {
    id: 4,
    title:
      "Notification regarding Infrastructure Development Projects under Smart Cities Mission 2024–25",
    image: "/images/information.png",
    link: "#",
    thumbVariant: "infra",
  },
  {
    id: 5,
    title:
      "Tender Notice: Expression of Interest for appointment of Urban Planning Consultants",
    image: "/images/Provisional.png",
    link: "#",
    thumbVariant: "tender",
  },
  {
    id: 6,
    title:
      "Minutes of the 14th National Level Steering Committee Meeting on AMRUT 2.0 Urban Reforms",
    image: "/images/Advisory.png",
    link: "#",
    thumbVariant: "meet",
  },
]

const thumbStyles: Record<string, string> = {
  doc: "from-blue-100 to-blue-200",
  list: "from-yellow-100 to-yellow-200",
  cyber: "from-green-100 to-green-200",
  infra: "from-pink-100 to-pink-200",
  tender: "from-purple-100 to-purple-200",
  meet: "from-orange-100 to-orange-200",
}

function NewsThumb({ variant }: { variant: string }) {
  return (
    <div
      className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${thumbStyles[variant] ?? thumbStyles.doc}`}
    >
      <FileText className="h-7 w-7 opacity-40" />
    </div>
  )
}

export default function LatestNewsCards() {
  return (
    <div className="w-[100%] overflow-hidden rounded-2xl bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <span className="rounded-md bg-[#1f4e79] px-3 py-1.5 text-sm font-semibold text-white">
          Latest News
        </span>
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-[#1f4e79]"
        >
          View all
        </a>
      </div>

      {/* Scrollable list */}
      <div className="no-scrollbar max-h-[380px] overflow-y-auto">
        {dummyNewsData.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="flex gap-3.5 border-b border-gray-100 px-5 py-4 transition last:border-none hover:bg-slate-50"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-[72px] w-[72px] shrink-0 rounded-lg object-cover"
              />
            ) : (
              <NewsThumb variant={item.thumbVariant} />
            )}
            <div className="flex flex-col gap-2">
              <p className="line-clamp-3 text-left text-[12.5px] leading-snug font-semibold text-gray-800">
                {item.title}
              </p>
              <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
