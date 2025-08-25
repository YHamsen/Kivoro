// Kivoro Internal Balance API Service
export interface KivoroBalance {
  userId: string
  totalBalance: number
  availableBalance: number
  lockedBalance: number
  currency: 'USD' | 'EUR' | 'XOF'
  lastUpdated: string
}

export interface BalanceTransaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'dividend'
  amount: number
  symbol?: string
  description: string
  timestamp: string
  status: 'pending' | 'completed' | 'failed'
}

export interface BuyOrderRequest {
  symbol: string
  amountUSD: number
  estimatedShares: number
  currentPrice: number
}

export interface SellOrderRequest {
  symbol: string
  quantity: number
  estimatedAmount: number
  currentPrice: number
}

class KivoroBalanceService {
  private storageKey = 'kivoro_balance'
  private transactionsKey = 'kivoro_transactions'

  // Initialize with demo balance for testing
  private defaultBalance: KivoroBalance = {
    userId: 'demo_user',
    totalBalance: 5000.00,
    availableBalance: 5000.00,
    lockedBalance: 0.00,
    currency: 'USD',
    lastUpdated: new Date().toISOString()
  }

  // Get current balance
  async getBalance(): Promise<KivoroBalance> {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        return JSON.parse(stored)
      }
      
      // Initialize with default balance
      await this.updateBalance(this.defaultBalance)
      return this.defaultBalance
    } catch (error) {
      console.error('Error getting balance:', error)
      return this.defaultBalance
    }
  }

  // Update balance
  private async updateBalance(balance: KivoroBalance): Promise<void> {
    balance.lastUpdated = new Date().toISOString()
    localStorage.setItem(this.storageKey, JSON.stringify(balance))
  }

  // Check if user has sufficient balance
  async hasSufficientBalance(amount: number): Promise<boolean> {
    const balance = await this.getBalance()
    return balance.availableBalance >= amount
  }

  // Process buy order
  async processBuyOrder(order: BuyOrderRequest): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const balance = await this.getBalance()
      
      // Check sufficient balance
      if (balance.availableBalance < order.amountUSD) {
        return {
          success: false,
          error: 'Insufficient balance. Please top up your Kivoro balance.'
        }
      }

      // Deduct from available balance
      balance.availableBalance -= order.amountUSD
      balance.totalBalance -= order.amountUSD
      await this.updateBalance(balance)

      // Create transaction record
      const transaction: BalanceTransaction = {
        id: this.generateTransactionId(),
        type: 'buy',
        amount: -order.amountUSD,
        symbol: order.symbol,
        description: `Bought ${order.estimatedShares.toFixed(4)} shares of ${order.symbol}`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }

      await this.addTransaction(transaction)

      return {
        success: true,
        transactionId: transaction.id
      }
    } catch (error) {
      console.error('Error processing buy order:', error)
      return {
        success: false,
        error: 'Failed to process buy order. Please try again.'
      }
    }
  }

  // Process sell order
  async processSellOrder(order: SellOrderRequest): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const balance = await this.getBalance()
      
      // Credit to available balance
      balance.availableBalance += order.estimatedAmount
      balance.totalBalance += order.estimatedAmount
      await this.updateBalance(balance)

      // Create transaction record
      const transaction: BalanceTransaction = {
        id: this.generateTransactionId(),
        type: 'sell',
        amount: order.estimatedAmount,
        symbol: order.symbol,
        description: `Sold ${order.quantity.toFixed(4)} shares of ${order.symbol}`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }

      await this.addTransaction(transaction)

      return {
        success: true,
        transactionId: transaction.id
      }
    } catch (error) {
      console.error('Error processing sell order:', error)
      return {
        success: false,
        error: 'Failed to process sell order. Please try again.'
      }
    }
  }

  // Add dividend payment
  async addDividendPayment(symbol: string, amount: number): Promise<void> {
    try {
      const balance = await this.getBalance()
      
      balance.availableBalance += amount
      balance.totalBalance += amount
      await this.updateBalance(balance)

      const transaction: BalanceTransaction = {
        id: this.generateTransactionId(),
        type: 'dividend',
        amount: amount,
        symbol: symbol,
        description: `Dividend payment from ${symbol}`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }

      await this.addTransaction(transaction)
    } catch (error) {
      console.error('Error adding dividend payment:', error)
    }
  }

  // Top up balance (for testing)
  async topUpBalance(amount: number): Promise<{ success: boolean; error?: string }> {
    try {
      const balance = await this.getBalance()
      
      balance.availableBalance += amount
      balance.totalBalance += amount
      await this.updateBalance(balance)

      const transaction: BalanceTransaction = {
        id: this.generateTransactionId(),
        type: 'deposit',
        amount: amount,
        description: `Top up balance`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }

      await this.addTransaction(transaction)

      return { success: true }
    } catch (error) {
      console.error('Error topping up balance:', error)
      return {
        success: false,
        error: 'Failed to top up balance. Please try again.'
      }
    }
  }

  // Get transaction history
  async getTransactions(limit: number = 50): Promise<BalanceTransaction[]> {
    try {
      const stored = localStorage.getItem(this.transactionsKey)
      if (stored) {
        const transactions: BalanceTransaction[] = JSON.parse(stored)
        return transactions
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, limit)
      }
      return []
    } catch (error) {
      console.error('Error getting transactions:', error)
      return []
    }
  }

  // Add transaction to history
  private async addTransaction(transaction: BalanceTransaction): Promise<void> {
    try {
      const stored = localStorage.getItem(this.transactionsKey)
      const transactions: BalanceTransaction[] = stored ? JSON.parse(stored) : []
      
      transactions.push(transaction)
      
      // Keep only last 1000 transactions
      if (transactions.length > 1000) {
        transactions.splice(0, transactions.length - 1000)
      }
      
      localStorage.setItem(this.transactionsKey, JSON.stringify(transactions))
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  // Generate unique transaction ID
  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Format currency
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  // Reset balance (for testing)
  async resetBalance(): Promise<void> {
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem(this.transactionsKey)
    await this.updateBalance(this.defaultBalance)
  }
}

export const kivoroBalanceApi = new KivoroBalanceService()
