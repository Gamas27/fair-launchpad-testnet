'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Mini App Error:', error, errorInfo)
    console.error('Error stack:', error.stack)
    console.error('Error info:', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-red-900">
          <div className="text-center text-white p-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Mini App Error</h2>
            <p className="mb-4">Something went wrong with the mini app.</p>
            {this.state.error && (
              <div className="mb-4 p-4 bg-red-800 rounded text-left text-sm">
                <p className="font-semibold">Error Details:</p>
                <p className="break-all">{this.state.error.message}</p>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">Stack Trace</summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="bg-white text-red-900 px-4 py-2 rounded hover:bg-gray-100"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
