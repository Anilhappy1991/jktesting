import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/context/languageContext"
import { useLang } from "@/hooks/useLang"
const functionsList = {
  en: [
    "Directorate of Urban Local Bodies, Kashmir / Jammu",
    "Urban Environmental Engineering Department (UEED)",
    "J&K Housing Board",
    "Jammu Municipal Corporation / Srinagar Municipal Corporation",
    "Town Planning Organizations",
    "Jammu Development Authority / Srinagar Development Authority",
    "Lakes And Waterways Development Authority (LDA)",
    "Urban Development Agencies",
  ],
  hi: [
    "शहरी स्थानीय निकाय निदेशालय, कश्मीर / जम्मू",
    "शहरी पर्यावरण अभियांत्रिकी विभाग (UEED)",
    "जम्मू और कश्मीर आवास बोर्ड",
    "जम्मू नगर निगम / श्रीनगर नगर निगम",
    "नगर नियोजन संगठन",
    "जम्मू विकास प्राधिकरण / श्रीनगर विकास प्राधिकरण",
    "झील एवं जलमार्ग विकास प्राधिकरण (LDA)",
    "शहरी विकास एजेंसियां",
  ],
}
export default function FunctionsList() {
  const lang = useLang()
  const { t } = useTranslation()
  const functions = functionsList[lang]
  return (
    <div className="mx-auto max-w-5xl p-4">
      <Card className="rounded-sm border bg-gray-50 shadow-md">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-[20px] font-semibold text-gray-800">
            {t("headings.functions")}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-3">
          {functions.map((item, index) => (
            <div
              key={index}
              className="hover:[#e2eefab0] flex cursor-pointer items-center gap-3 border-b-1 border-[#7c7c7c] bg-[#e2eefab0] px-4 py-2 transition"
            >
              {/* Bullet */}
              <div className="h-[8px] w-[8px] rounded-sm bg-gray-800 px-1 sm:h-2 sm:w-2" />

              {/* Text */}
              <p className="text-[13px] text-gray-700 sm:text-[14px]">{item}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
