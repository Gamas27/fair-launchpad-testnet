'use client'

import { G8AppState, G8Action, G8User, G8Token, G8ChatRoom } from './types'

export interface ValidationError {
  field: string
  message: string
  code: string
  severity: 'error' | 'warning' | 'info'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
  info: ValidationError[]
}

export interface StateRecoveryOptions {
  autoRecover: boolean
  maxRetries: number
  fallbackState: Partial<G8AppState>
  logErrors: boolean
}

export interface RecoveryResult {
  success: boolean
  recoveredState?: Partial<G8AppState>
  errors: ValidationError[]
  actions: string[]
}

/**
 * State Validation and Error Recovery Service
 * Provides comprehensive state validation and automatic error recovery
 */
export class StateValidationService {
  private static instance: StateValidationService
  private recoveryOptions: StateRecoveryOptions
  
  private constructor() {
    this.recoveryOptions = {
      autoRecover: true,
      maxRetries: 3,
      fallbackState: {
        theme: 'dark',
        animations: true,
        activeTab: 'home',
        showOnboarding: true,
        notifications: {
          enabled: true,
          priceAlerts: true,
          chatMessages: true,
          campaignUpdates: true
        }
      },
      logErrors: true
    }
  }
  
  static getInstance(): StateValidationService {
    if (!StateValidationService.instance) {
      StateValidationService.instance = new StateValidationService()
    }
    return StateValidationService.instance
  }
  
  /**
   * Configure recovery options
   */
  configure(options: Partial<StateRecoveryOptions>) {
    this.recoveryOptions = { ...this.recoveryOptions, ...options }
  }
  
  /**
   * Validate complete application state
   */
  validateState(state: G8AppState): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    // Validate user state
    if (state.user) {
      const userValidation = this.validateUser(state.user)
      errors.push(...userValidation.errors)
      warnings.push(...userValidation.warnings)
      info.push(...userValidation.info)
    }
    
    // Validate navigation state
    const navValidation = this.validateNavigationState(state)
    errors.push(...navValidation.errors)
    warnings.push(...navValidation.warnings)
    info.push(...navValidation.info)
    
    // Validate data state
    const dataValidation = this.validateDataState(state)
    errors.push(...dataValidation.errors)
    warnings.push(...dataValidation.warnings)
    info.push(...dataValidation.info)
    
    // Validate UI state
    const uiValidation = this.validateUIState(state)
    errors.push(...uiValidation.errors)
    warnings.push(...uiValidation.warnings)
    info.push(...uiValidation.info)
    
    // Validate settings state
    const settingsValidation = this.validateSettingsState(state)
    errors.push(...settingsValidation.errors)
    warnings.push(...settingsValidation.warnings)
    info.push(...settingsValidation.info)
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      info
    }
  }
  
  /**
   * Validate user state
   */
  private validateUser(user: G8User): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!user.id || typeof user.id !== 'string') {
      errors.push({
        field: 'user.id',
        message: 'User ID is required and must be a string',
        code: 'USER_ID_INVALID',
        severity: 'error'
      })
    }
    
    if (!user.walletAddress || typeof user.walletAddress !== 'string') {
      errors.push({
        field: 'user.walletAddress',
        message: 'Wallet address is required',
        code: 'WALLET_ADDRESS_MISSING',
        severity: 'error'
      })
    } else if (!this.isValidWalletAddress(user.walletAddress)) {
      errors.push({
        field: 'user.walletAddress',
        message: 'Invalid wallet address format',
        code: 'WALLET_ADDRESS_INVALID',
        severity: 'error'
      })
    }
    
    if (user.reputationScore < 0 || user.reputationScore > 1000) {
      warnings.push({
        field: 'user.reputationScore',
        message: 'Reputation score should be between 0 and 1000',
        code: 'REPUTATION_SCORE_OUT_OF_RANGE',
        severity: 'warning'
      })
    }
    
    if (user.totalTrades < 0) {
      errors.push({
        field: 'user.totalTrades',
        message: 'Total trades cannot be negative',
        code: 'NEGATIVE_TRADES',
        severity: 'error'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Validate navigation state
   */
  private validateNavigationState(state: G8AppState): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!state.currentRoute || typeof state.currentRoute !== 'string') {
      errors.push({
        field: 'currentRoute',
        message: 'Current route is required',
        code: 'CURRENT_ROUTE_MISSING',
        severity: 'error'
      })
    }
    
    if (!Array.isArray(state.navigationHistory)) {
      errors.push({
        field: 'navigationHistory',
        message: 'Navigation history must be an array',
        code: 'NAVIGATION_HISTORY_INVALID',
        severity: 'error'
      })
    } else if (state.navigationHistory.length === 0) {
      warnings.push({
        field: 'navigationHistory',
        message: 'Navigation history is empty',
        code: 'EMPTY_NAVIGATION_HISTORY',
        severity: 'warning'
      })
    }
    
    if (typeof state.isLoading !== 'boolean') {
      errors.push({
        field: 'isLoading',
        message: 'Loading state must be a boolean',
        code: 'LOADING_STATE_INVALID',
        severity: 'error'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Validate data state
   */
  private validateDataState(state: G8AppState): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!Array.isArray(state.tokens)) {
      errors.push({
        field: 'tokens',
        message: 'Tokens must be an array',
        code: 'TOKENS_INVALID_TYPE',
        severity: 'error'
      })
    } else {
      state.tokens.forEach((token, index) => {
        const tokenValidation = this.validateToken(token)
        tokenValidation.errors.forEach(error => {
          errors.push({
            ...error,
            field: `tokens[${index}].${error.field}`
          })
        })
        tokenValidation.warnings.forEach(warning => {
          warnings.push({
            ...warning,
            field: `tokens[${index}].${warning.field}`
          })
        })
      })
    }
    
    if (!Array.isArray(state.chatRooms)) {
      errors.push({
        field: 'chatRooms',
        message: 'Chat rooms must be an array',
        code: 'CHAT_ROOMS_INVALID_TYPE',
        severity: 'error'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Validate token
   */
  private validateToken(token: G8Token): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!token.id || typeof token.id !== 'string') {
      errors.push({
        field: 'id',
        message: 'Token ID is required',
        code: 'TOKEN_ID_MISSING',
        severity: 'error'
      })
    }
    
    if (!token.name || typeof token.name !== 'string') {
      errors.push({
        field: 'name',
        message: 'Token name is required',
        code: 'TOKEN_NAME_MISSING',
        severity: 'error'
      })
    }
    
    if (!token.ticker || typeof token.ticker !== 'string') {
      errors.push({
        field: 'ticker',
        message: 'Token ticker is required',
        code: 'TOKEN_TICKER_MISSING',
        severity: 'error'
      })
    }
    
    if (token.price < 0) {
      errors.push({
        field: 'price',
        message: 'Token price cannot be negative',
        code: 'NEGATIVE_PRICE',
        severity: 'error'
      })
    }
    
    if (token.priceChange < -100 || token.priceChange > 1000) {
      warnings.push({
        field: 'priceChange',
        message: 'Price change seems unusual',
        code: 'UNUSUAL_PRICE_CHANGE',
        severity: 'warning'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Validate UI state
   */
  private validateUIState(state: G8AppState): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!state.activeTab || typeof state.activeTab !== 'string') {
      errors.push({
        field: 'activeTab',
        message: 'Active tab is required',
        code: 'ACTIVE_TAB_MISSING',
        severity: 'error'
      })
    }
    
    if (typeof state.showOnboarding !== 'boolean') {
      errors.push({
        field: 'showOnboarding',
        message: 'Show onboarding must be a boolean',
        code: 'SHOW_ONBOARDING_INVALID',
        severity: 'error'
      })
    }
    
    if (typeof state.showCreateToken !== 'boolean') {
      errors.push({
        field: 'showCreateToken',
        message: 'Show create token must be a boolean',
        code: 'SHOW_CREATE_TOKEN_INVALID',
        severity: 'error'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Validate settings state
   */
  private validateSettingsState(state: G8AppState): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []
    const info: ValidationError[] = []
    
    if (!state.notifications || typeof state.notifications !== 'object') {
      errors.push({
        field: 'notifications',
        message: 'Notifications object is required',
        code: 'NOTIFICATIONS_MISSING',
        severity: 'error'
      })
    } else {
      const requiredNotificationKeys = ['enabled', 'priceAlerts', 'chatMessages', 'campaignUpdates']
      requiredNotificationKeys.forEach(key => {
        if (typeof state.notifications[key as keyof typeof state.notifications] !== 'boolean') {
          errors.push({
            field: `notifications.${key}`,
            message: `Notification ${key} must be a boolean`,
            code: `NOTIFICATION_${key.toUpperCase()}_INVALID`,
            severity: 'error'
          })
        }
      })
    }
    
    if (!['light', 'dark', 'auto'].includes(state.theme)) {
      errors.push({
        field: 'theme',
        message: 'Theme must be light, dark, or auto',
        code: 'THEME_INVALID',
        severity: 'error'
      })
    }
    
    if (typeof state.animations !== 'boolean') {
      errors.push({
        field: 'animations',
        message: 'Animations must be a boolean',
        code: 'ANIMATIONS_INVALID',
        severity: 'error'
      })
    }
    
    return { valid: errors.length === 0, errors, warnings, info }
  }
  
  /**
   * Recover state from errors
   */
  async recoverState(state: G8AppState, errors: ValidationError[]): Promise<RecoveryResult> {
    const actions: string[] = []
    const recoveredState: Partial<G8AppState> = { ...state }
    const recoveryErrors: ValidationError[] = []
    
    try {
      // Group errors by field
      const errorsByField = this.groupErrorsByField(errors)
      
      for (const [field, fieldErrors] of errorsByField) {
        const recovery = this.recoverField(field, fieldErrors, state)
        if (recovery.success) {
          Object.assign(recoveredState, recovery.recoveredData)
          actions.push(`Recovered ${field}: ${recovery.action}`)
        } else {
          recoveryErrors.push(...recovery.errors)
        }
      }
      
      // Apply fallback state for critical errors
      if (recoveryErrors.length > 0) {
        const criticalErrors = recoveryErrors.filter(e => e.severity === 'error')
        if (criticalErrors.length > 0) {
          Object.assign(recoveredState, this.recoveryOptions.fallbackState)
          actions.push('Applied fallback state for critical errors')
        }
      }
      
      return {
        success: recoveryErrors.length === 0,
        recoveredState,
        errors: recoveryErrors,
        actions
      }
      
    } catch (error) {
      return {
        success: false,
        errors: [{
          field: 'recovery',
          message: error instanceof Error ? error.message : 'Recovery failed',
          code: 'RECOVERY_ERROR',
          severity: 'error'
        }],
        actions: ['Recovery failed']
      }
    }
  }
  
  /**
   * Group errors by field
   */
  private groupErrorsByField(errors: ValidationError[]): Map<string, ValidationError[]> {
    const grouped = new Map<string, ValidationError[]>()
    
    errors.forEach(error => {
      const field = error.field.split('.')[0] // Get top-level field
      if (!grouped.has(field)) {
        grouped.set(field, [])
      }
      grouped.get(field)!.push(error)
    })
    
    return grouped
  }
  
  /**
   * Recover a specific field
   */
  private recoverField(
    field: string, 
    errors: ValidationError[], 
    state: G8AppState
  ): { success: boolean; recoveredData?: any; action?: string; errors: ValidationError[] } {
    const recoveryErrors: ValidationError[] = []
    
    try {
      switch (field) {
        case 'user':
          return this.recoverUserField(errors, state)
        case 'currentRoute':
          return this.recoverCurrentRouteField(errors, state)
        case 'tokens':
          return this.recoverTokensField(errors, state)
        case 'notifications':
          return this.recoverNotificationsField(errors, state)
        case 'theme':
          return this.recoverThemeField(errors, state)
        default:
          return {
            success: false,
            errors: [{
              field,
              message: `No recovery strategy for field: ${field}`,
              code: 'NO_RECOVERY_STRATEGY',
              severity: 'error'
            }]
          }
      }
    } catch (error) {
      return {
        success: false,
        errors: [{
          field,
          message: error instanceof Error ? error.message : 'Recovery failed',
          code: 'FIELD_RECOVERY_ERROR',
          severity: 'error'
        }]
      }
    }
  }
  
  /**
   * Recover user field
   */
  private recoverUserField(errors: ValidationError[], state: G8AppState) {
    if (errors.some(e => e.code === 'USER_ID_INVALID')) {
      return {
        success: true,
        recoveredData: { user: null },
        action: 'Cleared invalid user data',
        errors: [] as ValidationError[]
      }
    }
    return { success: true, errors: [] as ValidationError[] }
  }
  
  /**
   * Recover current route field
   */
  private recoverCurrentRouteField(errors: ValidationError[], state: G8AppState) {
    return {
      success: true,
      recoveredData: { currentRoute: 'home' },
      action: 'Reset to home route',
      errors: [] as ValidationError[]
    }
  }
  
  /**
   * Recover tokens field
   */
  private recoverTokensField(errors: ValidationError[], state: G8AppState) {
    return {
      success: true,
      recoveredData: { tokens: [] },
      action: 'Cleared invalid tokens',
      errors: [] as ValidationError[]
    }
  }
  
  /**
   * Recover notifications field
   */
  private recoverNotificationsField(errors: ValidationError[], state: G8AppState) {
    return {
      success: true,
      recoveredData: {
        notifications: {
          enabled: true,
          priceAlerts: true,
          chatMessages: true,
          campaignUpdates: true
        }
      },
      action: 'Reset to default notifications',
      errors: [] as ValidationError[]
    }
  }
  
  /**
   * Recover theme field
   */
  private recoverThemeField(errors: ValidationError[], state: G8AppState) {
    return {
      success: true,
      recoveredData: { theme: 'dark' },
      action: 'Reset to dark theme',
      errors: [] as ValidationError[]
    }
  }
  
  /**
   * Check if wallet address is valid
   */
  private isValidWalletAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
}

// Export singleton instance
export const stateValidationService = StateValidationService.getInstance()

/**
 * State validation hook
 */
export function useStateValidation() {
  const validateState = (state: G8AppState) => {
    return stateValidationService.validateState(state)
  }
  
  const recoverState = async (state: G8AppState, errors: ValidationError[]) => {
    return stateValidationService.recoverState(state, errors)
  }
  
  const configure = (options: Partial<StateRecoveryOptions>) => {
    stateValidationService.configure(options)
  }
  
  return {
    validateState,
    recoverState,
    configure
  }
}
