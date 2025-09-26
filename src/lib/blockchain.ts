import { ethers } from 'ethers'

export interface TokenInfo {
  address: string
  name: string
  symbol: string
  decimals: number
  totalSupply: string
  currentPrice: string
  maxSupply: string
}

export interface TradeResult {
  success: boolean
  transactionHash?: string
  blockNumber?: number
  gasUsed?: number
  tokensReceived?: string
  newPrice?: string
  error?: string
}

export interface BondingCurveParams {
  initialPrice: string
  priceIncrement: string
  maxSupply: string
  reserveRatio: number
}

export class BlockchainService {
  private provider: ethers.Provider
  private signer: ethers.Signer | null = null
  private network: string

  constructor(network: string = 'sepolia') {
    this.network = network
    this.provider = this.getProvider()
  }

  private getProvider(): ethers.Provider {
    const rpcUrl = this.getRpcUrl()
    return new ethers.JsonRpcProvider(rpcUrl)
  }

  private getRpcUrl(): string {
    switch (this.network) {
      case 'mainnet':
        return process.env.ETHEREUM_MAINNET_RPC || 'https://eth.llamarpc.com'
      case 'sepolia':
        return process.env.ETHEREUM_SEPOLIA_RPC || 'https://sepolia.infura.io/v3/your-project-id'
      case 'polygon':
        return process.env.POLYGON_RPC || 'https://polygon-rpc.com'
      case 'base':
        return process.env.BASE_RPC || 'https://mainnet.base.org'
      default:
        throw new Error(`Unsupported network: ${this.network}`)
    }
  }

  async connectWallet(): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('Wallet connection only available in browser')
    }

    if (!window.ethereum) {
      throw new Error('MetaMask not detected')
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Create signer
      this.signer = new ethers.BrowserProvider(window.ethereum).getSigner()
      
      return accounts[0]
    } catch (error) {
      console.error('Wallet connection failed:', error)
      throw new Error('Failed to connect wallet')
    }
  }

  async getTokenInfo(tokenAddress: string): Promise<TokenInfo> {
    try {
      // ERC20 token contract
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function decimals() view returns (uint8)',
          'function totalSupply() view returns (uint256)',
          'function balanceOf(address) view returns (uint256)',
        ],
        this.provider
      )

      const [name, symbol, decimals, totalSupply] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.totalSupply(),
      ])

      // Get bonding curve info (this would be from a custom contract)
      const bondingCurveContract = new ethers.Contract(
        this.getBondingCurveAddress(),
        [
          'function getCurrentPrice(address) view returns (uint256)',
          'function getMaxSupply(address) view returns (uint256)',
        ],
        this.provider
      )

      const [currentPrice, maxSupply] = await Promise.all([
        bondingCurveContract.getCurrentPrice(tokenAddress),
        bondingCurveContract.getMaxSupply(tokenAddress),
      ])

      return {
        address: tokenAddress,
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply: ethers.formatUnits(totalSupply, decimals),
        currentPrice: ethers.formatEther(currentPrice),
        maxSupply: ethers.formatUnits(maxSupply, decimals),
      }
    } catch (error) {
      console.error('Failed to get token info:', error)
      throw new Error('Failed to fetch token information')
    }
  }

  async buyTokens(
    tokenAddress: string,
    amount: string,
    maxSlippage: number = 5
  ): Promise<TradeResult> {
    if (!this.signer) {
      throw new Error('Wallet not connected')
    }

    try {
      const bondingCurveContract = new ethers.Contract(
        this.getBondingCurveAddress(),
        [
          'function buyTokens(address token, uint256 minTokensOut) payable returns (uint256 tokensReceived, uint256 newPrice)',
          'function calculateTokensOut(address token, uint256 ethAmount) view returns (uint256 tokensOut, uint256 newPrice)',
        ],
        this.signer
      )

      // Calculate expected tokens out
      const ethAmount = ethers.parseEther(amount)
      const [expectedTokens, expectedPrice] = await bondingCurveContract.calculateTokensOut(
        tokenAddress,
        ethAmount
      )

      // Apply slippage tolerance
      const minTokensOut = (expectedTokens * BigInt(100 - maxSlippage)) / BigInt(100)

      // Execute buy transaction
      const tx = await bondingCurveContract.buyTokens(tokenAddress, minTokensOut, {
        value: ethAmount,
        gasLimit: 500000, // Set appropriate gas limit
      })

      const receipt = await tx.wait()

      if (!receipt) {
        throw new Error('Transaction failed')
      }

      // Parse transaction logs to get actual results
      const [tokensReceived, newPrice] = await this.parseTradeLogs(receipt)

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: Number(receipt.gasUsed),
        tokensReceived: ethers.formatUnits(tokensReceived, 18),
        newPrice: ethers.formatEther(newPrice),
      }
    } catch (error) {
      console.error('Buy transaction failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async sellTokens(
    tokenAddress: string,
    tokenAmount: string,
    maxSlippage: number = 5
  ): Promise<TradeResult> {
    if (!this.signer) {
      throw new Error('Wallet not connected')
    }

    try {
      const bondingCurveContract = new ethers.Contract(
        this.getBondingCurveAddress(),
        [
          'function sellTokens(address token, uint256 tokenAmount, uint256 minEthOut) returns (uint256 ethReceived, uint256 newPrice)',
          'function calculateEthOut(address token, uint256 tokenAmount) view returns (uint256 ethOut, uint256 newPrice)',
        ],
        this.signer
      )

      // Calculate expected ETH out
      const tokenAmountWei = ethers.parseUnits(tokenAmount, 18)
      const [expectedEth, expectedPrice] = await bondingCurveContract.calculateEthOut(
        tokenAddress,
        tokenAmountWei
      )

      // Apply slippage tolerance
      const minEthOut = (expectedEth * BigInt(100 - maxSlippage)) / BigInt(100)

      // Execute sell transaction
      const tx = await bondingCurveContract.sellTokens(tokenAddress, tokenAmountWei, minEthOut, {
        gasLimit: 500000,
      })

      const receipt = await tx.wait()

      if (!receipt) {
        throw new Error('Transaction failed')
      }

      // Parse transaction logs
      const [ethReceived, newPrice] = await this.parseTradeLogs(receipt)

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: Number(receipt.gasUsed),
        tokensReceived: ethers.formatEther(ethReceived), // ETH received for sell
        newPrice: ethers.formatEther(newPrice),
      }
    } catch (error) {
      console.error('Sell transaction failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async deployToken(
    name: string,
    symbol: string,
    initialSupply: string,
    bondingCurveParams: BondingCurveParams
  ): Promise<{ tokenAddress: string; transactionHash: string }> {
    if (!this.signer) {
      throw new Error('Wallet not connected')
    }

    try {
      const tokenFactory = new ethers.Contract(
        this.getTokenFactoryAddress(),
        [
          'function createToken(string name, string symbol, uint256 initialSupply, uint256 initialPrice, uint256 priceIncrement, uint256 maxSupply, uint256 reserveRatio) returns (address tokenAddress)',
        ],
        this.signer
      )

      const tx = await tokenFactory.createToken(
        name,
        symbol,
        ethers.parseUnits(initialSupply, 18),
        ethers.parseEther(bondingCurveParams.initialPrice),
        ethers.parseEther(bondingCurveParams.priceIncrement),
        ethers.parseUnits(bondingCurveParams.maxSupply, 18),
        bondingCurveParams.reserveRatio,
        {
          gasLimit: 2000000,
        }
      )

      const receipt = await tx.wait()

      if (!receipt) {
        throw new Error('Token deployment failed')
      }

      // Extract token address from logs
      const tokenAddress = await this.parseTokenDeploymentLogs(receipt)

      return {
        tokenAddress,
        transactionHash: receipt.hash,
      }
    } catch (error) {
      console.error('Token deployment failed:', error)
      throw new Error('Failed to deploy token')
    }
  }

  async getBalance(tokenAddress: string, userAddress: string): Promise<string> {
    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function balanceOf(address) view returns (uint256)'],
        this.provider
      )

      const balance = await tokenContract.balanceOf(userAddress)
      return ethers.formatUnits(balance, 18)
    } catch (error) {
      console.error('Failed to get balance:', error)
      return '0'
    }
  }

  async getEthBalance(userAddress: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(userAddress)
      return ethers.formatEther(balance)
    } catch (error) {
      console.error('Failed to get ETH balance:', error)
      return '0'
    }
  }

  private getBondingCurveAddress(): string {
    // This would be the deployed bonding curve contract address
    return process.env.BONDING_CURVE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  }

  private getTokenFactoryAddress(): string {
    // This would be the deployed token factory contract address
    return process.env.TOKEN_FACTORY_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
  }

  private async parseTradeLogs(receipt: ethers.TransactionReceipt): Promise<[bigint, bigint]> {
    // Parse transaction logs to extract trade results
    // This would depend on the specific event structure of your contracts
    const tokensReceived = BigInt(0) // Parse from logs
    const newPrice = BigInt(0) // Parse from logs
    return [tokensReceived, newPrice]
  }

  private async parseTokenDeploymentLogs(receipt: ethers.TransactionReceipt): Promise<string> {
    // Parse transaction logs to extract deployed token address
    // This would depend on the specific event structure of your contracts
    return '0x0000000000000000000000000000000000000000' // Parse from logs
  }
}

// Global instance
export const blockchainService = new BlockchainService()

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}



