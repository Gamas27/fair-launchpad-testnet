import React from 'react'
import { cn } from '@/lib/utils'

export interface InputV2Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'outlined' | 'filled' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  label?: string
  helperText?: string
  errorText?: string
}

const inputVariants = {
  default: 'bg-gray-800 border border-gray-600 focus:border-cyan-500',
  outlined: 'bg-transparent border-2 border-gray-600 focus:border-cyan-500',
  filled: 'bg-gray-800 border-0 focus:ring-2 focus:ring-cyan-500',
  neon: 'bg-gray-800 border border-cyan-500/50 focus:border-cyan-500 focus:shadow-cyan-500/20',
}

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}

export const InputV2 = React.forwardRef<HTMLInputElement, InputV2Props>(
  ({
    className,
    variant = 'default',
    size = 'md',
    error = false,
    icon,
    iconPosition = 'left',
    label,
    helperText,
    errorText,
    ...props
  }, ref) => {
    const baseStyles = 'w-full rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    const variantStyles = error ? 'border-red-500 focus:border-red-500' : inputVariants[variant]
    const sizeStyles = inputSizes[size]
    const iconStyles = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{icon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              baseStyles,
              variantStyles,
              sizeStyles,
              iconStyles,
              className
            )}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{icon}</span>
            </div>
          )}
        </div>
        
        {(helperText || errorText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-red-400' : 'text-gray-400'
          )}>
            {error ? errorText : helperText}
          </p>
        )}
      </div>
    )
  }
)

InputV2.displayName = 'InputV2'

// Textarea Component
export interface TextareaV2Props extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant?: 'default' | 'outlined' | 'filled' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  label?: string
  helperText?: string
  errorText?: string
}

export const TextareaV2 = React.forwardRef<HTMLTextAreaElement, TextareaV2Props>(
  ({
    className,
    variant = 'default',
    size = 'md',
    error = false,
    label,
    helperText,
    errorText,
    ...props
  }, ref) => {
    const baseStyles = 'w-full rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none'
    const variantStyles = error ? 'border-red-500 focus:border-red-500' : inputVariants[variant]
    const sizeStyles = inputSizes[size]
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles,
            sizeStyles,
            className
          )}
          {...props}
        />
        
        {(helperText || errorText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-red-400' : 'text-gray-400'
          )}>
            {error ? errorText : helperText}
          </p>
        )}
      </div>
    )
  }
)

TextareaV2.displayName = 'TextareaV2'
