'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseAsyncStateOptions {
  initialData?: any
  onError?: (error: Error) => void
  onSuccess?: (data: any) => void
}

export function useAsyncState<T = any>(
  options: UseAsyncStateOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: options.initialData || null,
    loading: false,
    error: null
  })

  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    if (!isMountedRef.current) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await asyncFn()
      
      if (!isMountedRef.current) return

      setState({ data: result, loading: false, error: null })
      options.onSuccess?.(result)
    } catch (error) {
      if (!isMountedRef.current) return

      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      options.onError?.(error instanceof Error ? error : new Error(errorMessage))
    }
  }, [options])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data, error: null }))
  }, [])

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error, loading: false }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    setData,
    setError
  }
}

// Specialized hook for API calls
export function useApiCall<T = any>(options: UseAsyncStateOptions = {}) {
  const asyncState = useAsyncState<T>(options)

  const call = useCallback(async (apiFn: () => Promise<T>) => {
    return asyncState.execute(apiFn)
  }, [asyncState.execute])

  return {
    ...asyncState,
    call
  }
}

// Hook for handling form submissions
export function useFormSubmission<T = any>(options: UseAsyncStateOptions = {}) {
  const asyncState = useAsyncState<T>(options)

  const submit = useCallback(async (submitFn: () => Promise<T>) => {
    return asyncState.execute(submitFn)
  }, [asyncState.execute])

  return {
    ...asyncState,
    submit
  }
}
