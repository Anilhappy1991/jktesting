import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"

export default function RootErrorBoundary() {
  const error = useRouteError()

  let title = "Something went wrong"
  let message = "An unexpected error occurred."

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
          <h1 className="text-2xl font-semibold text-red-600">{title}</h1>
          <p className="mt-2 text-gray-600">{message}</p>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Go Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
