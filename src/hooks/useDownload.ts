import { useCallback } from "react"

const getFileNameFromUrl = (url: string) => {
  try {
    return url.split("/").pop() || "download"
  } catch {
    return "download"
  }
}

export const useDownload = () => {
  const downloadFile = useCallback(async (url: string, fileName?: string) => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = fileName || getFileNameFromUrl(url)

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }, [])

  return [downloadFile] as const
}
