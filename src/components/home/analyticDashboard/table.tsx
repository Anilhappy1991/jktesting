import type { AnalyticTableRow } from "@/utils/data"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TableColumn } from "@/features/home/homeTypes"
// import type { TableColumn } from "@/features/home/analyticsTypes"

interface AnalyticTableProps {
  title: string
  headers: TableColumn[]
  rows: AnalyticTableRow[]
}

const getColumnNumber = (key: string) => Number(key.replace("col", ""))

const getOrderedRowValues = (row: AnalyticTableRow) =>
  Object.entries(row)
    .sort(([leftKey], [rightKey]) => {
      return getColumnNumber(leftKey) - getColumnNumber(rightKey)
    })
    .map(([, value]) => value ?? "")

export default function AnalyticTable({
  title,
  headers,
  rows,
}: AnalyticTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white">
      <h2 className="px-4 py-3 text-lg font-semibold">{title}</h2>

      <div className="mx-4 mb-5 overflow-x-auto rounded-md border border-b-stone-200">
        <Table>
          <TableHeader className="bg-[#1f4e79] hover:bg-[#1f4e79]">
            <TableRow>
              {headers?.map((header) => (
                <TableHead
                  key={header.key}
                  className="border text-center font-semibold text-white"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows?.map((row, rowIndex) => {
              const rowValues = getOrderedRowValues(row)

              return (
                <TableRow
                  key={`${rowValues[0] ?? "row"}-${rowIndex}`}
                  className="text-center even:bg-muted/30"
                >
                  {headers?.map((header, cellIndex) => (
                    <TableCell
                      key={`${header}-${cellIndex}`}
                      className={cellIndex === 0 ? "font-medium" : undefined}
                    >
                      {rowValues[cellIndex] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
