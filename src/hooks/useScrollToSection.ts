import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useScrollToSection = () => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.replace("#", "")
    const element = document.getElementById(id)

    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }, [location])
}
