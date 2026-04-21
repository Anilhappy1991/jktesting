import { Card, CardContent } from "@/components/ui/card"

interface KpiCardProps {
  title?: string
  value?: string | number
}
export default function KpiCard({ title = "Total ULBs", value }: KpiCardProps) {
  return (
    <Card className="w-auto rounded-md border border-gray-200 bg-white py-2 shadow-sm sm:w-full">
      <CardContent className="flex flex-col justify-between p-0 px-2">
        <p className="font-medium text-gray-600">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </CardContent>
    </Card>
  )
}
