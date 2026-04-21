import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg space-y-8 text-center">
        {/* 404 number */}
        <div className="relative select-none">
          <span className="text-[10rem] leading-none font-black tracking-tighter text-muted/20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-9 w-9 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
          <Button onClick={() => navigate("/")} className="gap-2">
            <Home className="h-4 w-4" />
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}
