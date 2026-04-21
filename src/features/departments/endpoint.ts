export const DEPARTMENT_ENDPOINTS = {
  GET_ALL: "/departments",
  GET_BY_SLUG: (slug: string) => `/departments/${slug}`,
} as const
