import { useState, useEffect } from 'react'
import { apiClient, API_ENDPOINTS, buildUrl } from '../api'

export interface ChatRoom {
  id: number
  type: 'group' | 'dm' | 'coin'
  name: string
  icon: string
  description: string
  lastMessage: string
  timestamp: string
  unread: number
  repRequired: number
  members: number
  isOnline: boolean
  isPrivate: boolean
  tags: string[]
}

export interface ChatMessage {
  id: number
  roomId: number
  user: string
  avatar: string
  message: string
  timestamp: string
  repScore: number
  isVerified: boolean
  glowColor: string
  type: string
  attachments: any[]
}

export interface ChatFilters {
  type?: string
  search?: string
  repMin?: number
}

export function useChat() {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [activeRoom, setActiveRoom] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRooms = async (filters: ChatFilters = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value))
        }
      })

      const response = await apiClient.get(`${buildUrl(API_ENDPOINTS.CHAT.ROOMS)}?${params}`)
      
      if (response.success) {
        const roomsData = response.data as ChatRoom[]
        setRooms(roomsData)
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to fetch chat rooms')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch chat rooms'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (roomId: number, page: number = 1, limit: number = 50) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        roomId: String(roomId),
        page: String(page),
        limit: String(limit),
      })

      const response = await apiClient.get(`${buildUrl(API_ENDPOINTS.CHAT.MESSAGES)}?${params}`)
      
      if (response.success) {
        const messagesData = response.data as { messages: ChatMessage[]; pagination: any }
        if (page === 1) {
          setMessages(messagesData.messages)
        } else {
          setMessages(prev => [...messagesData.messages, ...prev])
        }
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to fetch messages')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (roomId: number, message: string, type: string = 'text', attachments: any[] = []) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.CHAT.MESSAGES), {
        roomId,
        message,
        type,
        attachments,
      })
      
      if (response.success) {
        // Add message to current messages
        const messageData = response.data as ChatMessage
        setMessages(prev => [...prev, messageData])
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to send message')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const createRoom = async (roomData: Partial<ChatRoom>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.CHAT.ROOMS), roomData)
      
      if (response.success) {
        const roomData = response.data as ChatRoom
        setRooms(prev => [...prev, roomData])
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to create chat room')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create chat room'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = async (roomId: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.CHAT.JOIN), { roomId })
      
      if (response.success) {
        setActiveRoom(roomId)
        await fetchMessages(roomId)
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to join room')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join room'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const leaveRoom = async (roomId: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.CHAT.LEAVE), { roomId })
      
      if (response.success) {
        if (activeRoom === roomId) {
          setActiveRoom(null)
          setMessages([])
        }
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to leave room')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to leave room'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Fetch rooms on mount
  useEffect(() => {
    fetchRooms()
  }, [])

  return {
    rooms,
    messages,
    activeRoom,
    loading,
    error,
    fetchRooms,
    fetchMessages,
    sendMessage,
    createRoom,
    joinRoom,
    leaveRoom,
    setActiveRoom,
  }
}
