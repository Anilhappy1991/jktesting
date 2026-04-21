import { Card, CardContent } from "@/components/ui/card"

const leaders = [
  {
    name: "Mr. Manoj Sinha",
    role: "Hon'ble Lieutenant Governor\nJammu and Kashmir",
    image: "/images/manoj.jpeg",
  },
  {
    name: "Mr. Omar Abdullah",
    role: "Hon'ble Chief Minister\nChairman, JKHB",
    image: "/images/cm.jpg",
  },
  {
    name: "Mrs. Mandeep Kaur, IAS",
    role: "Commissioner/Secretary to Government\nJKHUDD",
    image: "/images/cs.jpg",
  },
  {
    name: "Mr. Shahbaz Ahmed Mirza",
    role: "Managing Director, Jammu & Kashmir Housing Board",
    image: "/images/md.jpeg",
  },
]

export default function InfoCard() {
  return (
    <Card className="custom-scrollbar h-[450px] overflow-auto rounded-none border bg-[#396ce315]">
      <CardContent className="p-0">
        {leaders.map((item, index) => (
          <div key={index}>
            <div className="flex gap-4 p-4">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-[120px] w-[120px] rounded object-cover"
              />

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-black">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm whitespace-pre-line text-[#1b3060]">
                  {item.role}
                </p>

                {/* Progress Line */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-[3px] w-[60px] bg-[#1b3060]" />
                  <div className="h-[3px] w-[40px] bg-gray-300" />
                </div>
              </div>
            </div>

            {/* Divider */}
            {index !== leaders.length - 1 && (
              <div className="border-t border-gray-300" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
