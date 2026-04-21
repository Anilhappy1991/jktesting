import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { KioskTabItem } from "@/features/home/homeTypes"

interface KioskTabsNavProps {
  tabs: KioskTabItem[]
}

export default function KioskTabsNav({ tabs }: KioskTabsNavProps) {
  return (
    <TabsList className="group/tabs-list flex w-full flex-shrink-0 items-center gap-1 overflow-x-auto scroll-smooth rounded-lg bg-transparent pt-2 pb-2 pl-56 whitespace-nowrap text-muted-foreground [-webkit-overflow-scrolling:touch] group-data-[orientation=horizontal]/tabs:h-8 sm:gap-2 sm:pt-1 sm:pl-67 md:overflow-visible md:pl-0 md:whitespace-normal">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={String(tab.id)}
          className="h-[35px] cursor-pointer rounded-t-md rounded-b-none border border-slate-200 bg-[#dfdfdf] px-1 py-3 text-left text-[11px] font-semibold text-slate-900 shadow-none transition-colors hover:bg-[#dfdfdf] hover:text-blue-500 sm:px-2 sm:text-xs data-active:bg-[#0f4c81] data-active:text-white data-active:shadow-none"
        >
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
