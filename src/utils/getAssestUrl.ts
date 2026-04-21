const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL
export const getAssetUrl = (assetUrl: string | null) => {
  if (!assetUrl) {
    return ""
  }

  try {
    return new URL(assetUrl, ASSET_BASE_URL).toString()
  } catch {
    return assetUrl
  }
}
