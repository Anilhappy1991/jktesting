export const BANNER_ENDPOINTS = {
  getallBanners: "/home-page-banner",
} as const

export const WHATS_NEW_ENDPOINTS = {
  GET_ALL: "/home-whats-new",
} as const

export const HOD_ENDPOINTS = {
  GET_TOP_HODS: "/top-hods",
  GET_BOTTOM_HODS: "/hods",
} as const

export const KIOSK_ENDPOINTS = {
  GET_TABS: "/kiosks-tab",
} as const

export const KIOSK_TABS_ENDPOINTS = {
  GET_TABS: "/kiosks-tab",
  GET_TAB_DATA: (tabId: number | string) => `/kiosks-tab-data/${tabId}`,
} as const

export const SCHEME_ENDPOINTS = {
  GET_ALL: "/schemes",
  GET_HOME_SCHEMES: "/home-schemes",
  GET_BY_SLUG: (slug: string) => `/schemes/${slug}`,
} as const

export const E_SERVICE_ENDPOINTS = {
  GET_ALL: "/e-services",
} as const

export const STAKEHOLDER_ENDPOINTS = {
  GET_ALL: "/stakeholders",
} as const

export const GALLERY_ENDPOINTS = {
  GET_CATEGORIES: "/gallery/categories",
  GET_BY_SLUG: (slug: string) => `/gallery/${slug}`,
} as const

export const WHATSNEW_BLOCK_ENDPOINTS = {
  GET_ALL: "/whatsnew-block",
} as const
export const ANALYTICS_ENDPOINTS = {
  GET_ANALYTICS: "/analytical-dashboard",
} as const

export const CONTACT_ENDPOINTS = {
  SEND_MESSAGE: "/contact",
} as const
