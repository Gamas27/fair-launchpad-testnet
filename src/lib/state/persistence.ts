'use client'

import { G8AppState } from './types'

export interface PersistenceConfig {
  enabled: boolean
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB'
  key: string
  version: string
  selective: boolean
  exclude: (keyof G8AppState)[]
  include: (keyof G8AppState)[]
  encryption?: boolean
  compression?: boolean
}

export interface PersistenceResult {
  success: boolean
  error?: string
  data?: any
  size?: number
}

export interface StateSnapshot {
  state: Partial<G8AppState>
  timestamp: number
  version: string
  checksum: string
}

/**
 * Enhanced State Persistence Service
 * Provides selective data saving and restoration with encryption and compression
 */
export class StatePersistenceService {
  private static instance: StatePersistenceService
  private config: PersistenceConfig
  private db: IDBDatabase | null = null
  
  private constructor() {
    this.config = {
      enabled: true,
      storage: 'localStorage',
      key: 'g8-app-state',
      version: '1.0.0',
      selective: true,
      exclude: ['user', 'tokens', 'chatRooms', 'selectedToken', 'selectedChatRoom'],
      include: ['theme', 'animations', 'notifications', 'activeTab', 'showOnboarding'],
      encryption: false,
      compression: false
    }
  }
  
  static getInstance(): StatePersistenceService {
    if (!StatePersistenceService.instance) {
      StatePersistenceService.instance = new StatePersistenceService()
    }
    return StatePersistenceService.instance
  }
  
  /**
   * Configure persistence settings
   */
  configure(config: Partial<PersistenceConfig>) {
    this.config = { ...this.config, ...config }
  }
  
  /**
   * Save state with selective persistence
   */
  async saveState(state: G8AppState): Promise<PersistenceResult> {
    if (!this.config.enabled) {
      return { success: true }
    }
    
    try {
      // Create selective state
      const selectiveState = this.createSelectiveState(state)
      
      // Create snapshot
      const snapshot: StateSnapshot = {
        state: selectiveState,
        timestamp: Date.now(),
        version: this.config.version,
        checksum: this.generateChecksum(selectiveState)
      }
      
      // Serialize data
      const serializedData = await this.serializeData(snapshot)
      
      // Save to storage
      const result = await this.saveToStorage(serializedData)
      
      return {
        success: true,
        data: snapshot,
        size: serializedData.length
      }
      
    } catch (error) {
      console.error('Failed to save state:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
  
  /**
   * Load state with validation
   */
  async loadState(): Promise<PersistenceResult> {
    if (!this.config.enabled) {
      return { success: true }
    }
    
    try {
      // Load from storage
      const serializedData = await this.loadFromStorage()
      if (!serializedData) {
        return { success: true }
      }
      
      // Deserialize data
      const snapshot = await this.deserializeData(serializedData)
      
      // Validate snapshot
      const validation = this.validateSnapshot(snapshot)
      if (!validation.valid) {
        console.warn('State validation failed:', validation.errors)
        return {
          success: false,
          error: `State validation failed: ${validation.errors.join(', ')}`
        }
      }
      
      return {
        success: true,
        data: snapshot.state
      }
      
    } catch (error) {
      console.error('Failed to load state:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
  
  /**
   * Clear persisted state
   */
  async clearState(): Promise<PersistenceResult> {
    try {
      await this.clearStorage()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear state'
      }
    }
  }
  
  /**
   * Get state size
   */
  async getStateSize(): Promise<number> {
    try {
      const data = await this.loadFromStorage()
      return data ? data.length : 0
    } catch {
      return 0
    }
  }
  
  /**
   * Create selective state based on configuration
   */
  private createSelectiveState(state: G8AppState): Partial<G8AppState> {
    if (!this.config.selective) {
      return state
    }
    
    const selectiveState: Partial<G8AppState> = {}
    
    if (this.config.include.length > 0) {
      // Include only specified fields
      this.config.include.forEach(key => {
        if (key in state) {
          selectiveState[key] = state[key]
        }
      })
    } else {
      // Exclude specified fields
      Object.keys(state).forEach(key => {
        if (!this.config.exclude.includes(key as keyof G8AppState)) {
          selectiveState[key as keyof G8AppState] = state[key as keyof G8AppState]
        }
      })
    }
    
    return selectiveState
  }
  
  /**
   * Serialize data with optional compression and encryption
   */
  private async serializeData(data: StateSnapshot): Promise<string> {
    let serialized = JSON.stringify(data)
    
    if (this.config.compression) {
      // Simple compression (in production, use a proper compression library)
      serialized = this.compress(serialized)
    }
    
    if (this.config.encryption) {
      // Simple encryption (in production, use proper encryption)
      serialized = this.encrypt(serialized)
    }
    
    return serialized
  }
  
  /**
   * Deserialize data with optional decryption and decompression
   */
  private async deserializeData(data: string): Promise<StateSnapshot> {
    let deserialized = data
    
    if (this.config.encryption) {
      deserialized = this.decrypt(deserialized)
    }
    
    if (this.config.compression) {
      deserialized = this.decompress(deserialized)
    }
    
    return JSON.parse(deserialized)
  }
  
  /**
   * Save to appropriate storage
   */
  private async saveToStorage(data: string): Promise<void> {
    switch (this.config.storage) {
      case 'localStorage':
        localStorage.setItem(this.config.key, data)
        break
      case 'sessionStorage':
        sessionStorage.setItem(this.config.key, data)
        break
      case 'indexedDB':
        await this.saveToIndexedDB(data)
        break
    }
  }
  
  /**
   * Load from appropriate storage
   */
  private async loadFromStorage(): Promise<string | null> {
    switch (this.config.storage) {
      case 'localStorage':
        return localStorage.getItem(this.config.key)
      case 'sessionStorage':
        return sessionStorage.getItem(this.config.key)
      case 'indexedDB':
        return await this.loadFromIndexedDB()
      default:
        return null
    }
  }
  
  /**
   * Clear storage
   */
  private async clearStorage(): Promise<void> {
    switch (this.config.storage) {
      case 'localStorage':
        localStorage.removeItem(this.config.key)
        break
      case 'sessionStorage':
        sessionStorage.removeItem(this.config.key)
        break
      case 'indexedDB':
        await this.clearIndexedDB()
        break
    }
  }
  
  /**
   * Save to IndexedDB
   */
  private async saveToIndexedDB(data: string): Promise<void> {
    if (!this.db) {
      await this.initIndexedDB()
    }
    
    const transaction = this.db!.transaction(['state'], 'readwrite')
    const store = transaction.objectStore('state')
    await store.put({ key: this.config.key, data, timestamp: Date.now() })
  }
  
  /**
   * Load from IndexedDB
   */
  private async loadFromIndexedDB(): Promise<string | null> {
    if (!this.db) {
      await this.initIndexedDB()
    }
    
    const transaction = this.db!.transaction(['state'], 'readonly')
    const store = transaction.objectStore('state')
    const result = await store.get(this.config.key)
    return result?.data || null
  }
  
  /**
   * Clear IndexedDB
   */
  private async clearIndexedDB(): Promise<void> {
    if (!this.db) {
      await this.initIndexedDB()
    }
    
    const transaction = this.db!.transaction(['state'], 'readwrite')
    const store = transaction.objectStore('state')
    await store.delete(this.config.key)
  }
  
  /**
   * Initialize IndexedDB
   */
  private async initIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('G8AppState', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('state')) {
          db.createObjectStore('state', { keyPath: 'key' })
        }
      }
    })
  }
  
  /**
   * Validate snapshot
   */
  private validateSnapshot(snapshot: StateSnapshot): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!snapshot.state) {
      errors.push('Missing state data')
    }
    
    if (!snapshot.timestamp || typeof snapshot.timestamp !== 'number') {
      errors.push('Invalid timestamp')
    }
    
    if (!snapshot.version || snapshot.version !== this.config.version) {
      errors.push('Version mismatch')
    }
    
    if (!snapshot.checksum || snapshot.checksum !== this.generateChecksum(snapshot.state)) {
      errors.push('Checksum validation failed')
    }
    
    // Check if data is too old (7 days)
    const maxAge = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - snapshot.timestamp > maxAge) {
      errors.push('Data too old')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Generate checksum for data integrity
   */
  private generateChecksum(data: any): string {
    const str = JSON.stringify(data)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }
  
  /**
   * Simple compression (base64 encoding for demo)
   */
  private compress(data: string): string {
    return btoa(data)
  }
  
  /**
   * Simple decompression
   */
  private decompress(data: string): string {
    return atob(data)
  }
  
  /**
   * Simple encryption (XOR for demo)
   */
  private encrypt(data: string): string {
    const key = 'g8-app-key'
    let encrypted = ''
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    return btoa(encrypted)
  }
  
  /**
   * Simple decryption
   */
  private decrypt(data: string): string {
    const encrypted = atob(data)
    const key = 'g8-app-key'
    let decrypted = ''
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    return decrypted
  }
}

// Export singleton instance
export const statePersistenceService = StatePersistenceService.getInstance()

/**
 * Enhanced persistence hook
 */
export function useStatePersistence() {
  const saveState = async (state: G8AppState) => {
    return statePersistenceService.saveState(state)
  }
  
  const loadState = async () => {
    return statePersistenceService.loadState()
  }
  
  const clearState = async () => {
    return statePersistenceService.clearState()
  }
  
  const getStateSize = async () => {
    return statePersistenceService.getStateSize()
  }
  
  const configure = (config: Partial<PersistenceConfig>) => {
    statePersistenceService.configure(config)
  }
  
  return {
    saveState,
    loadState,
    clearState,
    getStateSize,
    configure
  }
}
