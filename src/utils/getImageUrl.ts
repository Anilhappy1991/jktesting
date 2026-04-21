const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL

export const getImageUrl = (path?: string | null): string | undefined => {
  if (!path) return undefined

  // Already a full URL — return as-is
  if (path.startsWith("http")) return path

  // Relative path — prepend base
  return `${ASSET_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}
