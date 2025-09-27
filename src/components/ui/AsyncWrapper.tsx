'use client'

import React from 'react'
import { ErrorDisplay, LoadingState, EmptyState } from './ErrorDisplay'

interface AsyncWrapperProps {
  loading: boolean
  error: string | null
  data: any
  loadingMessage?: string
  errorTitle?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: React.ReactNode
  emptyAction?: React.ReactNode
  onRetry?: () => void
  onDismissError?: () => void
  children: React.ReactNode
  className?: string
}

export function AsyncWrapper({
  loading,
  error,
  data,
  loadingMessage = "Loading...",
  errorTitle = "Something went wrong",
  emptyTitle = "No data available",
  emptyDescription = "There's nothing to show here yet.",
  emptyIcon,
  emptyAction,
  onRetry,
  onDismissError,
  children,
  className = ""
}: AsyncWrapperProps) {
  if (loading) {
    return <LoadingState message={loadingMessage} className={className} />
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title={errorTitle}
        onRetry={onRetry}
        onDismiss={onDismissError}
        className={className}
      />
    )
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        action={emptyAction}
        className={className}
      />
    )
  }

  return <div className={className}>{children}</div>
}

// Specialized wrapper for lists
interface AsyncListWrapperProps {
  loading: boolean
  error: string | null
  items: any[]
  loadingMessage?: string
  errorTitle?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: React.ReactNode
  emptyAction?: React.ReactNode
  onRetry?: () => void
  onDismissError?: () => void
  children: React.ReactNode
  className?: string
}

export function AsyncListWrapper({
  loading,
  error,
  items,
  loadingMessage = "Loading items...",
  errorTitle = "Failed to load items",
  emptyTitle = "No items found",
  emptyDescription = "There are no items to display.",
  emptyIcon,
  emptyAction,
  onRetry,
  onDismissError,
  children,
  className = ""
}: AsyncListWrapperProps) {
  return (
    <AsyncWrapper
      loading={loading}
      error={error}
      data={items}
      loadingMessage={loadingMessage}
      errorTitle={errorTitle}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      emptyIcon={emptyIcon}
      emptyAction={emptyAction}
      onRetry={onRetry}
      onDismissError={onDismissError}
      className={className}
    >
      {children}
    </AsyncWrapper>
  )
}

// Specialized wrapper for forms
interface AsyncFormWrapperProps {
  loading: boolean
  error: string | null
  success: boolean
  loadingMessage?: string
  errorTitle?: string
  onRetry?: () => void
  onDismissError?: () => void
  children: React.ReactNode
  className?: string
}

export function AsyncFormWrapper({
  loading,
  error,
  success,
  loadingMessage = "Submitting...",
  errorTitle = "Submission failed",
  onRetry,
  onDismissError,
  children,
  className = ""
}: AsyncFormWrapperProps) {
  if (loading) {
    return <LoadingState message={loadingMessage} className={className} />
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title={errorTitle}
        onRetry={onRetry}
        onDismiss={onDismissError}
        className={className}
      />
    )
  }

  return <div className={className}>{children}</div>
}
