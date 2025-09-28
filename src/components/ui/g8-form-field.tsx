'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8FormFieldProps {
  label: string
  placeholder?: string
  value?: string
  help?: string
  error?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'textarea'
  multiline?: boolean
  rows?: number
  disabled?: boolean
  required?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
}

export const G8FormField = ({
  label,
  placeholder,
  value = '',
  help,
  error,
  type = 'text',
  multiline = false,
  rows = 3,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  onFocus,
  className
}: G8FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  const inputType = type === 'password' && showPassword ? 'text' : type
  const hasError = !!error
  const hasValue = !!value
  const isSuccess = hasValue && !hasError && !isFocused

  const inputClasses = cn(
    "w-full px-g8-md py-g8-sm rounded-g8-md border transition-all duration-200",
    "bg-g8-surface text-g8-text-primary placeholder:text-g8-text-secondary",
    "focus:outline-none focus:ring-2 focus:ring-g8-text-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      "border-g8-stroke": !hasError && !isFocused,
      "border-g8-text-primary/20": isFocused && !hasError,
      "border-g8-error": hasError,
      "border-g8-success": isSuccess,
    }
  )

  const labelClasses = cn(
    "text-g8-body font-medium transition-colors duration-200",
    {
      "text-g8-text-primary": !hasError,
      "text-g8-error": hasError,
    }
  )

  const helpClasses = cn(
    "text-g8-caption transition-colors duration-200",
    {
      "text-g8-text-secondary": !hasError,
      "text-g8-error": hasError,
    }
  )

  return (
    <div className={cn("space-y-g8-sm", className)}>
      {/* Label */}
      <label className={labelClasses}>
        {label}
        {required && <span className="text-g8-error ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(inputClasses, "resize-none")}
          />
        ) : (
          <input
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />
        )}

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-g8-sm top-1/2 -translate-y-1/2 text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Status Icons */}
        <div className="absolute right-g8-sm top-1/2 -translate-y-1/2">
          {hasError && (
            <AlertCircle className="h-4 w-4 text-g8-error" />
          )}
          {isSuccess && (
            <CheckCircle className="h-4 w-4 text-g8-success" />
          )}
        </div>
      </div>

      {/* Help Text / Error Message */}
      {(help || error) && (
        <div className="flex items-center gap-g8-xs">
          {hasError && <AlertCircle className="h-3 w-3 text-g8-error flex-shrink-0" />}
          <p className={helpClasses}>
            {error || help}
          </p>
        </div>
      )}
    </div>
  )
}
