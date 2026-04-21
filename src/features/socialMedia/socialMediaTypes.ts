export interface SocialMedia {
  social_media: string
  link: string
  image: string | null
}

export interface SocialMediaResponse {
  status: boolean
  data: SocialMedia[]
}

export interface GetSocialParams {
  [key: string]: string | number | boolean
}
