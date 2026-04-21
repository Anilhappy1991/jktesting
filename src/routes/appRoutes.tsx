import type { RouteObject } from "react-router-dom"
import { Navigate, Outlet } from "react-router-dom"

import { AppLayout } from "@/layouts/AppLayout"
import Home from "@/pages/Home"
import OrganizationSetup from "@/pages/OrganizationSetup"
import Functions from "@/pages/Functions"
import Departments from "@/pages/Departments"
import DepartmentDetails from "@/pages/DepartmentDetails"
import Brap from "@/pages/Brap"
import Sanjy from "@/pages/Sanjy"
import ActsRulesByeLaws from "@/pages/ActsRulesByeLaws"
import Faqs from "@/pages/Faqs"
import GovermentOrders from "@/pages/GovermentOrders"
import Notifications from "@/pages/Notifications"
import Tenders from "@/pages/Tenders"
import Schemes from "@/pages/Schemes"
import SchemeDetails from "@/pages/SchemeDetails"
import NewsLetter from "@/pages/NewsLetter"
import NewsLetterArchive from "@/pages/NewsLetterArchive"
import GalleryDetails from "@/pages/galleryDetails"
import ContactUs from "@/pages/ContactUs"
import NotFound from "@/pages/NotFound"
import RootErrorBoundary from "@/components/common/rootErrorBoundary"

import { routePaths, DEFAULT_LANG } from "./routePaths"
import { LanguageProvider } from "@/context/languageContext"
import { UlbLayout } from "@/layouts/UlbLayout"
import UlbHome from "@/pages/ulb/Home"
import ScreenReader from "@/pages/ScreenReader"

export const appRoutes: RouteObject[] = [
  // "/" → redirect to "/en"
  {
    path: routePaths.root,
    element: <Navigate to={`/${DEFAULT_LANG}`} replace />,
  },

  // "/:lang" → wraps EVERYTHING in language
  {
    path: routePaths.langRoot,
    element: (
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    ),
    errorElement: <RootErrorBoundary />,
    children: [
      // ==========================================
      // BRANCH 1: Main Website (uses AppLayout)
      // ==========================================
      {
        path: "", // Empty path means it triggers directly on /en
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          // {
          //   path: routePaths.about,
          //   element: <About />,
          // },
          {
            path: routePaths.organizationsetup,
            element: <OrganizationSetup />,
          },
          {
            path: routePaths.functions,
            element: <Functions />,
          },
          {
            path: routePaths.brap,
            element: <Brap />,
          },
          {
            path: routePaths.departments,
            element: <Departments />,
          },
          {
            path: routePaths.departmentDetail,
            element: <DepartmentDetails />,
          },
          {
            path: routePaths.sanjy,
            element: <Sanjy />,
          },
          {
            path: routePaths.actsrulesbyelaws,
            element: <ActsRulesByeLaws />,
          },
          {
            path: routePaths.faqs,
            element: <Faqs />,
          },
          {
            path: routePaths.govermentOrders,
            element: <GovermentOrders />,
          },
          {
            path: routePaths.notifications,
            element: <Notifications />,
          },
          {
            path: routePaths.tenders,
            element: <Tenders />,
          },
          {
            path: routePaths.schemes,
            element: <Schemes />,
          },
          {
            path: routePaths.schemeDetail,
            element: <SchemeDetails />,
          },
          {
            path: routePaths.newsLetter,
            element: <NewsLetter />,
          },
          {
            path: routePaths.newsLetterArchive,
            element: <NewsLetterArchive />,
          },
          {
            path: routePaths.galleryDetail,
            element: <GalleryDetails />,
          },
          {
            path: routePaths.contactUs,
            element: <ContactUs />,
          },
          {
            path: routePaths.screenReader,
            element: <ScreenReader />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },

      // ==========================================
      // BRANCH 2: ULB Microsite (uses UlbLayout)
      // ==========================================
      {
        path: "ulb/:ulbSlug",
        element: <UlbLayout />,
        children: [
          {
            index: true,
            element: <UlbHome />,
          },
          {
            path: routePaths.organizationsetup,
            element: <OrganizationSetup />,
          },
          {
            path: routePaths.functions,
            element: <Functions />,
          },
          {
            path: routePaths.brap,
            element: <Brap />,
          },
          {
            path: routePaths.departments,
            element: <Departments />,
          },
          {
            path: routePaths.departmentDetail,
            element: <DepartmentDetails />,
          },
          {
            path: routePaths.sanjy,
            element: <Sanjy />,
          },
          {
            path: routePaths.actsrulesbyelaws,
            element: <ActsRulesByeLaws />,
          },
          {
            path: routePaths.faqs,
            element: <Faqs />,
          },
          {
            path: routePaths.govermentOrders,
            element: <GovermentOrders />,
          },
          {
            path: routePaths.notifications,
            element: <Notifications />,
          },
          {
            path: routePaths.tenders,
            element: <Tenders />,
          },
          {
            path: routePaths.schemes,
            element: <Schemes />,
          },
          {
            path: routePaths.schemeDetail,
            element: <SchemeDetails />,
          },
          {
            path: routePaths.newsLetter,
            element: <NewsLetter />,
          },
          {
            path: routePaths.newsLetterArchive,
            element: <NewsLetterArchive />,
          },
          {
            path: routePaths.galleryDetail,
            element: <GalleryDetails />,
          },
          {
            path: routePaths.contactUs,
            element: <ContactUs />,
          },
          {
            path: routePaths.screenReader,
            element: <ScreenReader />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]
