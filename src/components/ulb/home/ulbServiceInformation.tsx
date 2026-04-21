import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Jammu Suraksha Yojana",
    desc: "Safety scheme for citizens of jammu",
    img: "/images/yojana.png",
  },
  {
    title: "Pay Online",
    desc: "Online payment via J&K Bank for taxes and services",
    img: "/images/online-payment.png",
  },
  {
    title: "Feedback",
    desc: "Lodge grievances & track status",
    img: "/images/feedback.png",
  },
  {
    title: "Commissioner Desk",
    desc: "Direct communication with Municipal Commissioner",
    img: "/images/desk.png",
  },
  {
    title: "Salary Certificate",
    desc: "Apply and download salary certificate",
    img: "/images/salarycertificate.png",
  },
  {
    title: "Water Connection Bill",
    desc: "View and pay water bills",
    img: "/images/waterbill.png",
  },
]

export default function ServiceInformation() {
  return (
    <section
      id="informationKiosk"
      className="px-4 py-12 sm:px-6 lg:px-10 xl:px-20"
    >
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold tracking-wide text-orange-500 uppercase">
          Information Kiosk
        </p>
        <h2 className="text-2xl font-bold text-[#1f4e79] md:text-3xl">
          Online Services & <span className="text-[#1f4e79]">Information</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item, i) => {
          const Icon = item.img
          return (
            <Card
              key={i}
              className="relative rounded-xl border-none shadow-md transition-all hover:shadow-lg"
            >
              {/* Left Accent */}
              <div className="absolute top-0 left-0 h-full w-[6px] rounded-l-xl bg-[#1f4e79]" />

              <CardContent className="flex items-center gap-3 p-3">
                {/* Icon */}
                <div className="flex h-15 w-15 items-center justify-center rounded-full bg-blue-100 lg:h-14 lg:w-14">
                  <img
                    src={Icon}
                    alt={item.title}
                    className="h-7 w-7 text-blue-600"
                  />
                </div>

                {/* Text */}
                <div className="w-67">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
