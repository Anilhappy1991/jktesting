import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { BrapModal } from "@/components/home/brapPopup"
import { useTranslation } from "@/context/languageContext"

const getBrapServices = (t: any) => [
  {
    id: 1,
    img: "/images/Signage-Permission.png",
    name: t("brap.services.signage"),
    status: "na",
  },
  {
    id: 2,
    img: "/images/Certificate-of-Vending.png",
    name: t("brap.services.streetVendor"),
    status: "active",
  },
  {
    id: 3,
    img: "/images/Municipal-Trade-License-NOC-for-Commercial-Establishment.png",
    name: t("brap.services.tradeLicense"),
    status: "active",
  },
  {
    id: 4,
    img: "/images/Sewerage-Connection.png",
    name: t("brap.services.sewerage"),
    status: "active",
  },
  {
    id: 5,
    img: "/images/Fleet-Depot-Parking-Permission.png",
    name: t("brap.services.fleetParking"),
    status: "na",
  },
  {
    id: 6,
    img: "/images/Parking-Staging-and-Zonal-Clearances.png",
    name: t("brap.services.zonalClearances"),
    status: "na",
  },
  {
    id: 7,
    img: "/images/Building-Plan-Approval.png",
    name: t("brap.services.buildingPlan"),
    status: "active",
  },
  {
    id: 8,
    img: "/images/Revalidation.png",
    name: t("brap.services.revalidation"),
    status: "active",
  },
  {
    id: 9,
    img: "/images/Permission-for-Demolition-and-Reconstruction.png",
    name: t("brap.services.demolition"),
    status: "active",
  },
  {
    id: 10,
    img: "/images/approved.png",
    name: t("brap.services.plinth"),
    status: "active",
  },
  {
    id: 11,
    img: "/images/OccupancyCompletion-Certificate.png",
    name: t("brap.services.occupancy"),
    status: "active",
  },
]

const Brap = () => {
  const { t } = useTranslation()

  const services = getBrapServices(t)

  return (
    <div className="w-full bg-[#f9fafb] px-4 py-7 sm:px-6 lg:px-10 xl:px-20">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="items-center">
          <img
            src="/images/brap-img.png"
            alt="BRAP"
            className="w-full rounded-lg shadow"
          />
        </div>
        <div>
          <h4 className="mb-3 text-2xl font-semibold">{t("brap.title")}</h4>
          <p className="text-[16px] leading-relaxed text-black">
            {t("brap.description")}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-gray-50">
        <div className="bg-gradient-to-r from-[#1f4e79] to-[#3b6c96] py-3 text-center text-lg font-semibold text-white">
          {t("brap.tableTitle")}
        </div>

        <div className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow className="border border-slate-200 bg-gray-200">
                <TableHead className="w-[80px] border text-center">
                  {t("brap.tableHeaders.sno")}
                </TableHead>
                <TableHead className="border text-center"></TableHead>
                <TableHead className="border text-center">
                  {t("brap.tableHeaders.services")}
                </TableHead>
                <TableHead className="border text-center">
                  {t("brap.tableHeaders.status")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((item) => (
                <TableRow key={item.id} className="bg-white hover:bg-gray-50">
                  <TableCell className="order-slate-200 border text-center font-medium">
                    {item.id}
                  </TableCell>

                  <TableCell className="order-slate-200 border text-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="mx-auto h-10 w-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/images/default.png"
                      }}
                    />
                  </TableCell>

                  <TableCell className="order-slate-200 border text-sm font-medium text-gray-700">
                    {item.name}
                  </TableCell>

                  <TableCell className="order-slate-200 border text-center">
                    {item.status === "active" ? (
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#2ea44f] text-white">
                        <Check size={16} />
                      </span>
                    ) : (
                      <Badge
                        variant="outline"
                        className="h-8 w-8 rounded-full border-orange-400 px-3 py-1 text-xs text-orange-500"
                      >
                        NA
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <p className="mt-4 text-xs text-gray-500">{t("brap.footerNote")}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
        <BrapModal />
        <a
          href="https://eodb.dpiit.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="w-full border-[#1f4e79] px-6 py-5 text-[#1f4e79] hover:bg-[#1f4e79] hover:text-white sm:w-auto"
          >
            {t("brap.visitWebsite")}
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Brap
