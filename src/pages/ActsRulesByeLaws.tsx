import { Eye, Download, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetActsQuery } from "@/features/actsAndLaws/actAndLawApi"
import type { ActItem } from "@/features/actsAndLaws/actsTypes"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useDownload } from "@/hooks/useDownload"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

const ASSET_BASE_URL = "https://jkhudd.vibescom.co.in"

const getDocumentUrl = (documentUrl: string) => {
  if (!documentUrl) {
    return ""
  }

  try {
    return new URL(documentUrl, ASSET_BASE_URL).toString()
  } catch {
    return documentUrl
  }
}

function ActRow({ item, index }: { item: ActItem; index: number }) {
  const documentUrl = getDocumentUrl(item.document_url)
  const { t } = useTranslation()
  const hasDocument = Boolean(documentUrl)
  const [downloadFile] = useDownload()
  return (
    <TableRow className="border-b border-slate-100 transition-colors duration-150 hover:bg-blue-50/50">
      <TableCell className="w-16 border border-slate-200 pl-6 text-sm font-medium whitespace-normal text-slate-500">
        {index + 1}.
      </TableCell>
      <TableCell className="border border-slate-200 whitespace-normal">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-red-100 bg-red-50">
            <FileText className="h-4 w-4 text-red-500" />
          </div>
          <div className="line-he" dir={item.is_rtl ? "rtl" : "ltr"}>
            <span className="block text-[13px] leading-snug font-medium text-[#1b1a1a]">
              {item.title}
            </span>
            {item.formatted_date ? (
              <Badge variant="secondary" className="text-xs">
                {item.formatted_date}
              </Badge>
            ) : null}
          </div>
        </div>
      </TableCell>
      <TableCell className="border border-slate-200 pr-5 whitespace-normal sm:pr-6">
        <div className="flex items-center justify-end gap-2 sm:flex sm:items-center sm:justify-center">
          <a
            href={hasDocument ? documentUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!hasDocument}
            className={!hasDocument ? "pointer-events-none opacity-50" : ""}
          >
            <Button
              size="sm"
              className="h-8 cursor-pointer gap-1.5 bg-[#1f4e79] px-3 text-xs text-white hover:bg-slate-800"
              disabled={!hasDocument}
            >
              <Eye className="h-3.5 w-3.5" />
              {t("headings.view")}
            </Button>
          </a>

          <Button
            size="sm"
            className="h-8 cursor-pointer gap-1.5 bg-[#1f4e79] px-3 text-xs text-white hover:bg-slate-800"
            disabled={!hasDocument}
            onClick={() => downloadFile(documentUrl)}
          >
            <Download className="h-3.5 w-3.5" />
            {t("headings.download")}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default function ActsRulesByeLaws() {
  const lang = useLang()
  const { t } = useTranslation()
  const { data: actsResponse, isLoading, isError } = useGetActsQuery({ lang })
  const acts = actsResponse?.data ?? []

  return (
    <>
      <MetaTagGenerator title="Acts, Rules & Bye-Laws" />
      <div className="w-full bg-[#f9fafb] px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
        <Card className="">
          <CardHeader className="border-b border-slate-200 pb-4">
            <CardTitle className="text-center text-[22px] font-semibold tracking-tight text-slate-800">
              {t("headings.actsRulesByeLaws")}
            </CardTitle>
          </CardHeader>

          {isLoading ? (
            <CardContent className="space-y-3 p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </CardContent>
          ) : isError ? (
            <CardContent className="p-6">
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                Failed to load acts, rules and bye-laws.
              </p>
            </CardContent>
          ) : acts.length === 0 ? (
            <CardContent className="p-6">
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                No acts, rules or bye-laws available right now.
              </p>
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="w-full table-fixed border border-slate-200">
                  <TableHeader>
                    <TableRow className="bg-[#1f4e79] text-[#ffffff] hover:bg-[#1f4e79]">
                      <TableHead className="w-[65px] border border-slate-200 pl-6 text-sm font-bold text-[#ffffff] sm:w-[70px]">
                        S.No
                      </TableHead>
                      <TableHead className="w-[500px] border border-slate-200 text-sm font-bold text-[#ffffff]">
                        Title
                      </TableHead>
                      <TableHead className="w-[220px] border border-slate-200 pr-6 text-center text-sm font-bold text-[#ffffff] sm:w-[220px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {acts.map((item, index) => (
                      <ActRow key={item.id} item={item} index={index} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  )
}
