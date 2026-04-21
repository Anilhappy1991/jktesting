import { Card, CardContent } from "@/components/ui/card"

const data = [
  {
    id: 1,
    name: "Screen Access For All (SAFA)",
    website: "http://www.nabdelhi.org/NAB_SAFA.html",
    type: "Free",
  },
  {
    id: 2,
    name: "Non Visual Desktop Access (NVDA)",
    website: "http://www.nvda-project.org/",
    type: "Free",
  },
  {
    id: 3,
    name: "System Access To Go",
    website: "http://www.satogo.com/",
    type: "Free",
  },
]

export default function ScreenReaderTable() {
  return (
    <div className="p-4 pb-7">
      {/* Heading */}
      <h2 className="mb-4 text-xl font-semibold text-[#0b4a78] md:text-2xl">
        For your convenience, links of various Screen Readers are available here
        for download.
      </h2>

      <Card className="rounded-none bg-[#eef3f7] py-0">
        <CardContent className="overflow-auto p-0">
          <table className="w-full border-collapse text-sm">
            {/* Header */}
            <thead className="bg-[#8fa9b7] text-black">
              <tr>
                <th className="w-[60px] border px-4 py-3 text-left">No</th>
                <th className="border px-4 py-3 text-left">Screen Reader</th>
                <th className="border px-4 py-3 text-left">Website</th>
                <th className="w-[180px] border px-4 py-3 text-left">
                  Free / Commercial
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border bg-[#dfe6ec]">
                  <td className="border border-white px-4 py-3">{item.id}</td>
                  <td className="border border-white px-4 py-3">{item.name}</td>
                  <td className="border border-white px-4 py-3 text-[#0b4a78] underline">
                    <a href={item.website} target="_blank">
                      {item.website}
                    </a>
                  </td>
                  <td className="border border-white px-4 py-3">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
