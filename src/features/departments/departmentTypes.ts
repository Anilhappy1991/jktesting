/**
 * List Item
 */
export interface DepartmentItem {
  id: number
  slug: string
  title: string
  logo: string
}

export interface DepartmentLinkItem {
  text: string
  url: string
}

/**
 * List Response
 */
export interface DepartmentListResponse {
  status: boolean
  message: string
  data: DepartmentItem[]
}

/**
 * Detail Item
 */
export interface DepartmentDetail extends DepartmentItem {
  description: string
  links?: DepartmentLinkItem[]
}

/**
 * Detail Response
 */
export interface DepartmentDetailResponse {
  status: boolean
  message: string
  data: DepartmentDetail
}

/**
 * Query Params
 */
export interface GetDepartmentParams {
  lang?: "en" | "hi" | "ur" | string
}

/**
 * Detail Params
 */
export interface GetDepartmentBySlugParams extends GetDepartmentParams {
  slug: string
}
