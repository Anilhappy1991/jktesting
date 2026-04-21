import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LatestMedia from "./ulblatestMedia"

interface NoticeItem {
  id: string
  title: string
}

interface NoticesApiData {
  orders: NoticeItem[]
  notices: NoticeItem[]
  circulars: NoticeItem[]
  tenders: NoticeItem[]
  newsletters: NoticeItem[]
  notifications: NoticeItem[]
}

const dummyApiData: NoticesApiData = {
  orders: [
    {
      id: "o1",
      title: "e-auction of plots/strips in Housing Colony Ompora, Budgam.",
    },
    {
      id: "o2",
      title:
        "Online applications from eligible applicants for the allotment of 1BHK Affordable Rental Housing flats at Bhalwal, Jammu",
    },
    {
      id: "o3",
      title:
        "Constitution of Internal Complaint Committee and implementation of Sexual Harassment Act 2013.",
    },
    {
      id: "o4",
      title: "e-auction of Halls at Housing Colony Channi Himmat, Jammu",
    },
    {
      id: "o5",
      title: "Extension notice: e-Auction of Hall at Channi Himmat, Jammu",
    },
    {
      id: "o6",
      title:
        "Extension notice: e-Auction of commercial sites at Botakadal, Srinagar",
    },
  ],
  notices: [
    { id: "n1", title: "Notices release regarding new housing scheme." },
    { id: "n2", title: "Government launches new urban development policy." },
    { id: "n3", title: "Smart city updates and infrastructure news." },
  ],
  circulars: [
    { id: "c1", title: "Circular regarding new housing scheme." },
    { id: "c2", title: "Government launches new urban development policy." },
    { id: "c3", title: "Smart city updates and infrastructure news." },
  ],
  tenders: [
    { id: "t1", title: "Tender notice regarding new housing scheme." },
    { id: "t2", title: "Government launches new urban development policy." },
    { id: "t3", title: "Smart city updates and infrastructure news." },
  ],
  newsletters: [
    { id: "nl1", title: "Newsletter regarding new housing scheme." },
    { id: "nl2", title: "Government launches new urban development policy." },
    { id: "nl3", title: "Smart city updates and infrastructure news." },
  ],
  notifications: [
    { id: "nf1", title: "Notification regarding new housing scheme." },
    { id: "nf2", title: "Government launches new urban development policy." },
    { id: "nf3", title: "Smart city updates and infrastructure news." },
  ],
}

const MarqueeList = ({ items }: { items: NoticeItem[] }) => {
  return (
    <div className="infosection bg-white p-0">
      <div className="marquee-container h-[375px] overflow-hidden">
        <div className="marquee flex flex-col">
          {[...items, ...items].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="flex items-start gap-3 border-b px-4 py-3"
            >
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#1f4e79]" />
              <p className="text-sm text-gray-800 transition hover:text-[#dc8839]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NoticesSection() {
  // TODO: Swap with your actual RTK Query hook later
  // const { data } = useGetNoticesQuery()
  const data = dummyApiData

  const tabsConfig = [
    { value: "orders", label: "ORDERS", items: data.orders },
    { value: "notices", label: "NOTICES", items: data.notices },
    { value: "circulars", label: "CIRCULARS", items: data.circulars },
    { value: "tenders", label: "TENDERS", items: data.tenders },
    {
      value: "newsletters",
      label: "MONTHLY NEWSLETTERS",
      items: data.newsletters,
    },
    {
      value: "notifications",
      label: "NOTIFICATIONS",
      items: data.notifications,
    },
  ]

  return (
    <section
      id="notifications"
      className="relative w-full bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-10 xl:px-20"
    >
      <div className="relative container mx-auto grid-cols-3 px-4 sm:grid">
        <div className="relative col-span-2 container mx-auto sm:px-4 md:px-8">
          <Card className="overflow-hidden rounded-none border-0 py-0 shadow-none">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="flex h-auto max-w-full flex-wrap justify-start overflow-hidden rounded-none border-b border-[#396ce315] bg-gray-200 p-0">
                {tabsConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none px-4 py-3 text-sm font-semibold text-[#1f4e79] focus-visible:ring-0 data-[state=active]:bg-[#1f4e79] data-[state=active]:text-white"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabsConfig.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="m-0 border-0 p-0"
                >
                  <MarqueeList items={tab.items} />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        <LatestMedia />
      </div>

      <style>
        {`
          .infosection .marquee {
            animation: marquee1 20s linear infinite;
          }
          .infosection .marquee:hover {
            animation-play-state: paused;
          }
          @keyframes marquee1 {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); } 
          }
        `}
      </style>
    </section>
  )
}
