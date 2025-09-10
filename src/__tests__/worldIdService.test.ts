import { worldIdService, WorldIdConfig } from '@/services/worldIdService'
import { MiniKit } from '@worldcoin/minikit-js'

// Mock the MiniKit module
jest.mock('@worldcoin/minikit-js', () => ({
  MiniKit: {
    init: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    getAccount: jest.fn(),
    signMessage: jest.fn(),
    sendTransaction: jest.fn(),
  },
}))

const mockMiniKit = MiniKit as jest.Mocked<typeof MiniKit>

describe('WorldIdService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset the service state by creating a new instance
    Object.defineProperty(worldIdService, 'isInitialized', {
      value: false,
      writable: true,
    })
  })

  describe('initialize', () => {
    it('should initialize successfully with valid config', async () => {
      const config: WorldIdConfig = {
        appId: 'test-app-id',
        action: 'test-action',
        signal: 'test-signal',
      }

      mockMiniKit.init.mockResolvedValue(undefined)

      await expect(worldIdService.initialize(config)).resolves.not.toThrow()
      expect(mockMiniKit.init).toHaveBeenCalledWith({
        appId: config.appId,
        action: config.action,
        signal: config.signal,
      })
    })

    it('should throw error when initialization fails', async () => {
      const config: WorldIdConfig = {
        appId: 'test-app-id',
        action: 'test-action',
      }

      mockMiniKit.init.mockRejectedValue(new Error('Initialization failed'))

      await expect(worldIdService.initialize(config)).rejects.toThrow('Failed to initialize World ID service')
    })
  })

  describe('connect', () => {
    it('should connect successfully and return verification info', async () => {
      const mockResult = {
        worldId: 'test-world-id',
        orbVerified: true,
        phoneVerified: false,
      }

      mockMiniKit.connect.mockResolvedValue(mockResult)

      // Mock the service as initialized
      Object.defineProperty(worldIdService, 'isInitialized', {
        value: true,
        writable: true,
      })

      const result = await worldIdService.connect()

      expect(result).toEqual({
        isVerified: true,
        verificationLevel: 'Orb',
        worldId: 'test-world-id',
      })
    })

    it('should return error when connection fails', async () => {
      mockMiniKit.connect.mockRejectedValue(new Error('Connection failed'))

      // Mock the service as initialized
      Object.defineProperty(worldIdService, 'isInitialized', {
        value: true,
        writable: true,
      })

      const result = await worldIdService.connect()

      expect(result).toEqual({
        isVerified: false,
        verificationLevel: 'Device',
        worldId: null,
        error: 'Connection failed',
      })
    })

    it('should throw error when service is not initialized', async () => {
      // Ensure service is not initialized
      Object.defineProperty(worldIdService, 'isInitialized', {
        value: false,
        writable: true,
      })

      await expect(worldIdService.connect()).rejects.toThrow('World ID service not initialized')
    })
  })

  describe('disconnect', () => {
    it('should disconnect successfully', async () => {
      mockMiniKit.disconnect.mockResolvedValue(undefined)

      await expect(worldIdService.disconnect()).resolves.not.toThrow()
      expect(mockMiniKit.disconnect).toHaveBeenCalled()
    })

    it('should throw error when disconnect fails', async () => {
      mockMiniKit.disconnect.mockRejectedValue(new Error('Disconnect failed'))

      await expect(worldIdService.disconnect()).rejects.toThrow('Failed to disconnect from World ID')
    })
  })

  describe('getAccount', () => {
    it('should return account information', async () => {
      const mockAccount = {
        address: '0x1234567890abcdef',
        balance: '1000',
      }

      mockMiniKit.getAccount.mockResolvedValue(mockAccount)

      const result = await worldIdService.getAccount()

      expect(result).toEqual(mockAccount)
      expect(mockMiniKit.getAccount).toHaveBeenCalled()
    })

    it('should return null when getAccount fails', async () => {
      mockMiniKit.getAccount.mockRejectedValue(new Error('Failed to get account'))

      const result = await worldIdService.getAccount()

      expect(result).toBeNull()
    })
  })

  describe('signMessage', () => {
    it('should sign message successfully', async () => {
      const message = 'test message'
      const signature = 'test-signature'

      mockMiniKit.signMessage.mockResolvedValue(signature)

      const result = await worldIdService.signMessage(message)

      expect(result).toBe(signature)
      expect(mockMiniKit.signMessage).toHaveBeenCalledWith(message)
    })

    it('should throw error when signing fails', async () => {
      const message = 'test message'

      mockMiniKit.signMessage.mockRejectedValue(new Error('Signing failed'))

      await expect(worldIdService.signMessage(message)).rejects.toThrow('Failed to sign message')
    })
  })

  describe('sendTransaction', () => {
    it('should send transaction successfully', async () => {
      const transaction = { to: '0x123', value: '1000' }
      const txHash = '0xabcdef123456'

      mockMiniKit.sendTransaction.mockResolvedValue(txHash)

      const result = await worldIdService.sendTransaction(transaction)

      expect(result).toBe(txHash)
      expect(mockMiniKit.sendTransaction).toHaveBeenCalledWith(transaction)
    })

    it('should throw error when transaction fails', async () => {
      const transaction = { to: '0x123', value: '1000' }

      mockMiniKit.sendTransaction.mockRejectedValue(new Error('Transaction failed'))

      await expect(worldIdService.sendTransaction(transaction)).rejects.toThrow('Failed to send transaction')
    })
  })
})
