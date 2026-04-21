import type { WhatsNewBlockItem } from "@/features/home/homeTypes"
const WhatsNewCard: React.FC<WhatsNewBlockItem> = ({ image, title }) => {
  return (
    <li className="flex items-center gap-5 rounded-md bg-white p-3 shadow-sm">
      <div className="h-20 w-25 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded object-cover"
        />
      </div>

      <div className="line-clamp-2 text-sm font-medium text-gray-800">
        {title}
      </div>
    </li>
  )
}

export default WhatsNewCard
