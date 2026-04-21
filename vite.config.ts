import { defineConfig, loadEnv } from "vite" // ← add loadEnv
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "vite-plugin-sitemap"

interface ApiResponse {
  status: boolean
  message: string
  data: { slug: string; [key: string]: unknown }[]
}

const staticRoutes = [
  "/",
  "/about",
  "/organization-setup",
  "/functions",
  "/departments",
  "/brap",
  "/sanjy",
  "/acts-rules-bye-laws",
  "/faqs",
  "/government-orders",
  "/notifications",
  "/tenders",
  "/schemes",
  "/newsletter",
  "/newsletter-archive",
  "/contact-us",
]

async function fetchDynamicRoutes(
  apiBase: string,
  apiKey: string
): Promise<string[]> {
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("x-api-key", apiKey)

  const apiFetch = async (url: string) => {
    const res = await fetch(url, { headers })
    const json = (await res.json()) as ApiResponse
    if (!json.status) throw new Error(json.message) // ← use the API's own status flag
    return json.data // ← unwrap .data directly
  }

  try {
    const [departments, schemes, galleries] = await Promise.allSettled([
      apiFetch(`${apiBase}/departments`),
      apiFetch(`${apiBase}/schemes`),
      apiFetch(`${apiBase}/gallery/categories`),
    ])

    const extractRoutes = (
      result: PromiseSettledResult<any[]>,
      prefix: string
    ) => {
      if (result.status !== "fulfilled") {
        console.warn(`[sitemap] ${prefix} failed:`, result.reason)
        return []
      }
      return result.value
        .filter((item) => item?.slug)
        .map((item) => `${prefix}/${item.slug}`)
    }

    return [
      ...extractRoutes(departments, "/departments"),
      ...extractRoutes(schemes, "/schemes"),
      ...extractRoutes(galleries, "/gallery"),
    ]
  } catch (err) {
    console.error("[sitemap] Unexpected error:", err)
    return []
  }
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const apiBase = env.VITE_API_BASE_URL
  const siteUrl = env.VITE_APP_SITE_URL
  const apiKey = env.VITE_API_KEY

  let dynamicRoutes: string[] = []

  if (apiBase) {
    dynamicRoutes = await fetchDynamicRoutes(apiBase, apiKey)
  } else {
    console.warn(
      "[sitemap] VITE_API_BASE_URL not set — skipping dynamic routes"
    )
  }

  const allRoutes = [...staticRoutes, ...dynamicRoutes]
  // console.log(
  //   `[sitemap] ${allRoutes.length} total routes (${dynamicRoutes.length} dynamic)`
  // )

  return {
    base: "/",

    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: siteUrl,
        dynamicRoutes: allRoutes,
        exclude: ["/404", "*"],
        changefreq: "weekly",
        priority: 0.8,
        readable: true,
        generateRobotsTxt: true,
        robots: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            redux: ["@reduxjs/toolkit", "react-redux"],
          },
        },
      },
    },

    server: {
      proxy: {
        "/api": {
          target: apiBase,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
