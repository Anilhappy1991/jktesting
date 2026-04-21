export type FooterLinkItem = {
  id: number
  text: string
  url: string
  is_external: boolean
}

export interface FooterResponse {
  status: boolean
  data: {
    departments: FooterLinkItem[]
    important_links: FooterLinkItem[]
    additional_info: FooterLinkItem[]
  }
}
