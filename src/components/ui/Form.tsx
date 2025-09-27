'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useFormSubmission } from '@/hooks/useAsyncState'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: FormData) => Promise<any>
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  loadingText?: string
  submitText?: string
  resetOnSuccess?: boolean
}

export function Form({
  className = "",
  onSubmit,
  onSuccess,
  onError,
  loadingText = "Submitting...",
  submitText = "Submit",
  resetOnSuccess = false,
  children,
  ...props
}: FormProps) {
  const { loading, error, execute, reset } = useFormSubmission({
    onSuccess,
    onError
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await execute(() => onSubmit(formData))
      if (resetOnSuccess) {
        e.currentTarget.reset()
        reset()
      }
    } catch (error) {
      // Error is handled by the hook
    }
  }

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
      
      {error && (
        <div className="text-sm text-destructive">
          {error}
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {loading ? loadingText : submitText}
        </button>
        
        {loading && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

export function FormField({ children, className = "" }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  )
}

interface FormLabelProps {
  children: React.ReactNode
  htmlFor?: string
  className?: string
  required?: boolean
}

export function FormLabel({ 
  children, 
  htmlFor, 
  className = "", 
  required = false 
}: FormLabelProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  )
}

interface FormErrorProps {
  children: React.ReactNode
  className?: string
}

export function FormError({ children, className = "" }: FormErrorProps) {
  return (
    <p className={cn("text-sm text-destructive", className)}>
      {children}
    </p>
  )
}

interface FormHelperTextProps {
  children: React.ReactNode
  className?: string
}

export function FormHelperText({ children, className = "" }: FormHelperTextProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}
