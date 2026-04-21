import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode
  /** Optional custom fallback UI */
  fallback?: ReactNode
  /** Optional callback called when an error is caught */
  onError?: (error: Error, info: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

// ─── Error Boundary Class Component ──────────────────────────────────────────

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorInfo: info })
    this.props.onError?.(error, info)

    // Log to your error monitoring service (Sentry, Datadog, etc.)
    console.error("[ErrorBoundary] Caught error:", error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

// ─── Fallback UI ──────────────────────────────────────────────────────────────

interface ErrorFallbackProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset: () => void
}

function ErrorFallback({ error, errorInfo, onReset }: ErrorFallbackProps) {
  const isDev = import.meta.env.DEV

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            An unexpected error occurred. You can try to recover by clicking the
            button below.
          </p>
        </div>

        {/* Error details (dev only) */}
        {isDev && error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-left">
            <p className="mb-1 text-xs font-semibold tracking-widest text-destructive uppercase">
              Error
            </p>
            <p className="mb-3 font-mono text-sm text-destructive">
              {error.message}
            </p>
            {errorInfo?.componentStack && (
              <>
                <p className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Component Stack
                </p>
                <pre className="max-h-40 overflow-auto font-mono text-xs whitespace-pre-wrap text-muted-foreground">
                  {errorInfo.componentStack}
                </pre>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
