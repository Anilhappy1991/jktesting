import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const ScrollPageToTop = () => {
  const [showButton, setShowButton] = useState(false)

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {showButton && (
        <Button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 z-50 h-9 w-9 rounded-full bg-[#1b3f6b] text-white shadow-lg hover:bg-[#1a2230]"
        >
          ↑
        </Button>
      )}
    </>
  )
}

export default ScrollPageToTop
