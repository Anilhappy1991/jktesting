import { useGetVisitorCountQuery } from "@/features/counter/counterApi"

export default function VisitorCounter() {
  const { data } = useGetVisitorCountQuery()

  return (
    <div className="flex w-fit gap-2 px-1 text-[14px] text-[#000]">
      Visitor No. {data?.data.unique_visitors} Last updated : {data?.data.date}
    </div>
  )
}
