import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"

export function BrapModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full bg-[#1f4e79] px-4 py-5 text-white hover:bg-[#163c60] sm:w-auto">
            J&K H&UDD BRAP Compliances
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[100vh] overflow-y-auto lg:max-w-5xl [&>button:last-child]:rounded-2xl [&>button:last-child]:border-2 [&>button:last-child]:border-[#000] [&>button:last-child]:p-3 [&>button:last-child]:py-3">
          <DialogHeader></DialogHeader>
          <FieldGroup>
            <div className="w-full">
              <img
                src="/images/D_BRAP_2025.png"
                alt="BRAP"
                className="mx-auto mb-4 w-auto object-contain"
              />
            </div>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  )
}
