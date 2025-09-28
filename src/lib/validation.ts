// G8 Form Validation Utilities
import React from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export class G8Validator {
  private rules: Record<string, ValidationRule> = {}

  addRule(field: string, rule: ValidationRule) {
    this.rules[field] = rule
  }

  validateField(field: string, value: string): string | null {
    const rule = this.rules[field]
    if (!rule) return null

    // Required validation
    if (rule.required && (!value || value.trim().length === 0)) {
      return 'This field is required'
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim().length === 0) {
      return null
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Invalid format'
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }

  validateForm(data: Record<string, string>): ValidationResult {
    const errors: Record<string, string> = {}

    Object.keys(this.rules).forEach(field => {
      const error = this.validateField(field, data[field] || '')
      if (error) {
        errors[field] = error
      }
    })

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// Common validation rules
export const commonRules = {
  required: { required: true },
  
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
      return null
    }
  },

  tokenName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s]+$/,
    custom: (value: string) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        return 'Token name can only contain letters, numbers, and spaces'
      }
      if (value.trim().length < 2) {
        return 'Token name must be at least 2 characters'
      }
      if (value.trim().length > 50) {
        return 'Token name must be no more than 50 characters'
      }
      return null
    }
  },

  tokenSymbol: {
    required: true,
    minLength: 2,
    maxLength: 10,
    pattern: /^[A-Z0-9]+$/,
    custom: (value: string) => {
      if (!/^[A-Z0-9]+$/.test(value)) {
        return 'Symbol must be uppercase letters and numbers only'
      }
      if (value.length < 2) {
        return 'Symbol must be at least 2 characters'
      }
      if (value.length > 10) {
        return 'Symbol must be no more than 10 characters'
      }
      return null
    }
  },

  url: {
    pattern: /^https?:\/\/.+/,
    custom: (value: string) => {
      if (value && !/^https?:\/\/.+/.test(value)) {
        return 'Please enter a valid URL starting with http:// or https://'
      }
      return null
    }
  },

  positiveNumber: {
    pattern: /^\d+(\.\d+)?$/,
    custom: (value: string) => {
      if (value && !/^\d+(\.\d+)?$/.test(value)) {
        return 'Please enter a valid positive number'
      }
      const num = parseFloat(value)
      if (value && (isNaN(num) || num <= 0)) {
        return 'Please enter a positive number'
      }
      return null
    }
  },

  walletAddress: {
    required: true,
    pattern: /^0x[a-fA-F0-9]{40}$/,
    custom: (value: string) => {
      if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
        return 'Please enter a valid wallet address'
      }
      return null
    }
  }
}

// Token creation specific validation
export const createTokenValidator = () => {
  const validator = new G8Validator()
  
  validator.addRule('tokenName', commonRules.tokenName)
  validator.addRule('symbol', commonRules.tokenSymbol)
  validator.addRule('description', {
    maxLength: 500,
    custom: (value: string) => {
      if (value && value.length > 500) {
        return 'Description must be no more than 500 characters'
      }
      return null
    }
  })
  validator.addRule('totalSupply', {
    required: true,
    ...commonRules.positiveNumber,
    custom: (value: string) => {
      const num = parseFloat(value)
      if (isNaN(num) || num <= 0) {
        return 'Total supply must be a positive number'
      }
      if (num > 1000000000) {
        return 'Total supply must be no more than 1 billion'
      }
      return null
    }
  })
  validator.addRule('initialPrice', {
    required: true,
    ...commonRules.positiveNumber,
    custom: (value: string) => {
      const num = parseFloat(value)
      if (isNaN(num) || num <= 0) {
        return 'Initial price must be a positive number'
      }
      if (num > 1000) {
        return 'Initial price must be no more than 1000 WLD'
      }
      return null
    }
  })
  validator.addRule('website', commonRules.url)
  validator.addRule('twitter', {
    pattern: /^@?[a-zA-Z0-9_]+$/,
    custom: (value: string) => {
      if (value && !/^@?[a-zA-Z0-9_]+$/.test(value)) {
        return 'Please enter a valid Twitter handle'
      }
      return null
    }
  })
  validator.addRule('telegram', {
    pattern: /^@?[a-zA-Z0-9_]+$/,
    custom: (value: string) => {
      if (value && !/^@?[a-zA-Z0-9_]+$/.test(value)) {
        return 'Please enter a valid Telegram handle'
      }
      return null
    }
  })

  return validator
}

// Form data types
export interface TokenCreationData {
  tokenName: string
  symbol: string
  description: string
  totalSupply: string
  initialPrice: string
  website?: string
  twitter?: string
  telegram?: string
  logo?: File[]
}

export interface ValidationState {
  isValid: boolean
  errors: Record<string, string>
  touched: Record<string, boolean>
}

export const useFormValidation = (validator: G8Validator) => {
  const [state, setState] = React.useState<ValidationState>({
    isValid: false,
    errors: {},
    touched: {}
  })

  const validateField = (field: string, value: string) => {
    const error = validator.validateField(field, value)
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error || '' },
      touched: { ...prev.touched, [field]: true }
    }))
    return error
  }

  const validateForm = (data: Record<string, string>) => {
    const result = validator.validateForm(data)
    setState(prev => ({
      ...prev,
      isValid: result.isValid,
      errors: result.errors
    }))
    return result
  }

  const resetValidation = () => {
    setState({
      isValid: false,
      errors: {},
      touched: {}
    })
  }

  return {
    ...state,
    validateField,
    validateForm,
    resetValidation
  }
}
