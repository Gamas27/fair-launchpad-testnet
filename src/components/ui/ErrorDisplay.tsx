'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, X } from 'lucide-react'

interface ErrorDisplayProps {
  error: string | Error
  onRetry?: () => void
  onDismiss?: () => void
  title?: string
  className?: string
  showDetails?: boolean
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  onDismiss, 
  title = "Something went wrong",
  className = "",
  showDetails = false
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message
  const errorStack = typeof error === 'object' ? error.stack : undefined

  return (
    <div className={`bg-red-500/10 border border-red-500/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-red-400">{title}</h3>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-red-300 mt-1">{errorMessage}</p>
          
          {showDetails && errorStack && process.env.NODE_ENV === 'development' && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-red-400 hover:text-red-300">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-red-300 bg-red-900/20 p-2 rounded overflow-auto max-h-32">
                {errorStack}
              </pre>
            </details>
          )}
        </div>
      </div>
      
      {onRetry && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ 
  message = "Loading...", 
  className = "" 
}: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="text-muted-foreground">{message}</span>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action, 
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center p-8 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
