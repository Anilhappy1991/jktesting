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
          className="arrowdown relative inline-block h-[35px] cursor-pointer rounded-xl rounded-t-md rounded-b-none border border-slate-200 bg-[#dddddd] px-1 px-5 py-3 text-center text-[11px] font-semibold text-slate-900 shadow-none transition-colors hover:bg-[#1f3f77] hover:text-[#ffffff] sm:px-2 sm:text-xs data-active:bg-[#0f4c81] data-active:text-white data-active:shadow-none"
        >
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
