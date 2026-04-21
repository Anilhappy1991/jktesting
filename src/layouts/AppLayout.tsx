import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
// import { Helmet } from "react-helmet"
// import { routePaths } from "@/routes/routePaths"

import PageBreadcrumb from "@/components/common/pageBreadcrumb"
// import { Footer } from "@/components/common/footer"
import Footer from "@/components/common/footer"
import { useAppSelector } from "@/hooks/useAppDispatch"
import Header from "@/components/common/header"

export function AppLayout() {
  const location = useLocation()
  const { value } = useAppSelector((state) => state.FontSize)

  useEffect(() => {
    if (location.hash) {
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [location.hash, location.pathname, location.search])

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const id = decodeURIComponent(location.hash.slice(1))

    window.requestAnimationFrame(() => {
      const section = document.getElementById(id)

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  }, [location.hash, location.pathname])

  useEffect(() => {
    document.documentElement.style.fontSize = `${value}px`

    return () => {
      document.documentElement.style.removeProperty("font-size")
    }
  }, [value])

  return (
    <>
      <div className="mx-auto max-w-[1792px] bg-[#f9fafb]">
        <Header />
        <PageBreadcrumb />
        <Outlet />
        {/* <VisitorCounter /> */}
        <Footer />
      </div>
    </>
  )
}
