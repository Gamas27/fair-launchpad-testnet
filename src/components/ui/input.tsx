'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'filled' | 'outlined'
}

export function Input({
  className = "",
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  variant = 'default',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
  const variants = {
    default: "border-input",
    filled: "border-transparent bg-muted",
    outlined: "border-2 border-input"
  }
  
  const errorClasses = error ? "border-destructive focus-visible:ring-destructive" : ""
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            baseClasses,
            variants[variant],
            errorClasses,
            iconClasses,
            className
          )}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  )
}

// Specialized input variants
export function TextInput(props: InputProps) {
  return <Input type="text" {...props} />
}

export function EmailInput(props: InputProps) {
  return <Input type="email" {...props} />
}

export function PasswordInput(props: InputProps) {
  return <Input type="password" {...props} />
}

export function NumberInput(props: InputProps) {
  return <Input type="number" {...props} />
}

export function SearchInput(props: InputProps) {
  return <Input type="search" {...props} />
}

export function UrlInput(props: InputProps) {
  return <Input type="url" {...props} />
}