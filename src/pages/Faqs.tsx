import parse from "html-react-parser"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerWithPlusIcon,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetFaqsQuery } from "@/features/faqs/faqsApi"
import MetaTagGenerator from "@/components/common/seoMetaGenerator"
import { useLang } from "@/hooks/useLang"
import { useTranslation } from "@/context/languageContext"

export default function Faqs() {
  const lang = useLang()
  const { data: faqResponse, isLoading, isError } = useGetFaqsQuery({ lang })
  const { t } = useTranslation()
  const faqs = faqResponse?.data ?? []

  return (
    <>
      <MetaTagGenerator title="FAQs" />
      <div className="w-full px-4 py-7 pb-15 sm:px-6 lg:px-10 xl:px-20">
        <Card className="mt-0 pt-0">
          <CardHeader className="border-b border-slate-200 pt-3">
            <CardTitle className="font-midium text-left text-[20px]">
              {t("headings.frequentlyAskedQuestion")}
            </CardTitle>
          </CardHeader>

          {isLoading ? (
            <CardContent className="space-y-3 px-4 pt-4 pb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </CardContent>
          ) : isError ? (
            <CardContent className="px-4 pt-4 pb-6">
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                Failed to load FAQs.
              </p>
            </CardContent>
          ) : faqs.length === 0 ? (
            <CardContent className="px-4 pt-4 pb-6">
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                No FAQs available right now.
              </p>
            </CardContent>
          ) : (
            <CardContent className="px-4 pt-1 pb-6">
              <Accordion
                type="single"
                collapsible
                defaultValue={`item-${faqs[0]?.id ?? 0}`}
                className="w-full"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${faq.id}`}
                    className="mb-2 border-b border-slate-200"
                  >
                    <AccordionTriggerWithPlusIcon className="cursor-pointer rounded-none rounded-t-md bg-[#1f4e79] p-4 pb-1.5 text-center font-bold text-white hover:no-underline [&_a]:no-underline">
                      <span className="flex items-start gap-2">
                        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#1f4e79] text-xs text-white">
                          {index + 1}
                        </span>

                        <span className="text-left">{faq.question}</span>
                      </span>
                    </AccordionTriggerWithPlusIcon>

                    <AccordionContent className="prose rounded-b-md border border-[#1f4e79] bg-gray-100 p-4 text-sm leading-relaxed text-slate-600 [&_li]:list-item [&_ul]:list-disc [&_ul]:pl-6">
                      {parse(faq.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  )
}
