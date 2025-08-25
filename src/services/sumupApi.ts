import axios from 'axios'

const SUMUP_BASE_URL = 'https://api.sumup.com'

interface SumUpCredentials {
  secretKey: string
  publicKey: string
}

interface SumUpPayment {
  amount: number
  currency: string
  description?: string
  merchant_reference?: string
  customer_email?: string
  customer_phone?: string
}

interface SumUpCheckout {
  id: string
  amount: number
  currency: string
  status: string
  checkout_reference: string
  description?: string
  merchant_reference?: string
  payment_type: string
  checkout_url?: string
  qr_code_url?: string
}

interface SumUpPaymentResult {
  id: string
  transaction_code: string
  amount: number
  currency: string
  status: string
  timestamp: string
  merchant_reference?: string
  payment_type: string
  card?: {
    last_4_digits: string
    type: string
  }
}

class SumUpApiService {
  private credentials: SumUpCredentials
  private accessToken: string | null = null
  private tokenExpiry: Date | null = null

  constructor() {
    // SÉCURISÉ: Les clés API doivent venir des variables d'environnement
    this.credentials = {
      secretKey: process.env.VITE_SUMUP_SECRET_KEY || import.meta.env?.VITE_SUMUP_SECRET_KEY || 'sk_test_YOUR_SECRET_KEY_HERE',
      publicKey: process.env.VITE_SUMUP_PUBLIC_KEY || import.meta.env?.VITE_SUMUP_PUBLIC_KEY || 'pk_test_YOUR_PUBLIC_KEY_HERE'
    }
  }

  private async authenticate(): Promise<string> {
    try {
      if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
        return this.accessToken
      }

      // SumUp uses OAuth2 client credentials flow
      const formData = new FormData()
      formData.append('grant_type', 'client_credentials')
      formData.append('client_id', this.credentials.publicKey)
      formData.append('client_secret', this.credentials.secretKey)
      formData.append('scope', 'payments')

      const response = await axios.post(`${SUMUP_BASE_URL}/token`, formData, {
        headers: {
          'Accept': 'application/json'
        }
      })

      this.accessToken = response.data.access_token
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000))
      
      return this.accessToken
    } catch (error: any) {
      console.error('SumUp authentication failed:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
      }
      throw new Error('Failed to authenticate with SumUp API')
    }
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) {
    const token = await this.authenticate()
    
    try {
      const response = await axios({
        method,
        url: `${SUMUP_BASE_URL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data
      })
      
      return response.data
    } catch (error: any) {
      console.error(`SumUp API request failed:`, error)
      throw new Error(error.response?.data?.message || 'SumUp API request failed')
    }
  }

  async createCheckout(payment: SumUpPayment): Promise<SumUpCheckout> {
    try {
      const checkoutData = {
        checkout_reference: `kivoro_${Date.now()}`,
        amount: payment.amount,
        currency: payment.currency,
        pay_to_email: 'support@kivoro.com', // Replace with your merchant email
        description: payment.description || 'eSIM Package Purchase',
        merchant_reference: payment.merchant_reference,
        return_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/cancel`
      }

      const response = await this.makeRequest('/v0.1/checkouts', 'POST', checkoutData)
      
      return {
        id: response.id || response.checkout_reference,
        amount: response.amount,
        currency: response.currency,
        status: response.status || 'PENDING',
        checkout_reference: response.checkout_reference,
        description: response.description,
        merchant_reference: response.merchant_reference,
        payment_type: 'CARD',
        checkout_url: response._links?.checkout?.href,
        qr_code_url: response._links?.qr_code?.href
      }
    } catch (error) {
      console.error('Failed to create SumUp checkout:', error)
      throw error
    }
  }

  async getCheckoutStatus(checkoutId: string): Promise<SumUpCheckout> {
    try {
      const response = await this.makeRequest(`/v0.1/checkouts/${checkoutId}`)
      
      return {
        id: response.id || response.checkout_reference,
        amount: response.amount,
        currency: response.currency,
        status: response.status,
        checkout_reference: response.checkout_reference,
        description: response.description,
        merchant_reference: response.merchant_reference,
        payment_type: response.payment_type || 'CARD'
      }
    } catch (error) {
      console.error('Failed to get SumUp checkout status:', error)
      throw error
    }
  }

  async getTransactions(limit: number = 10): Promise<SumUpPaymentResult[]> {
    try {
      const response = await this.makeRequest(`/v0.1/me/transactions?limit=${limit}`)
      
      if (response && Array.isArray(response)) {
        return response.map((transaction: any) => ({
          id: transaction.id,
          transaction_code: transaction.transaction_code,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          timestamp: transaction.timestamp,
          merchant_reference: transaction.merchant_reference,
          payment_type: transaction.payment_type,
          card: transaction.card ? {
            last_4_digits: transaction.card.last_4_digits,
            type: transaction.card.type
          } : undefined
        }))
      }
      
      return []
    } catch (error) {
      console.error('Failed to get SumUp transactions:', error)
      throw error
    }
  }

  async processPayment(checkoutId: string, paymentData: any): Promise<SumUpPaymentResult> {
    try {
      const response = await this.makeRequest(`/v0.1/checkouts/${checkoutId}/complete`, 'PUT', paymentData)
      
      return {
        id: response.id,
        transaction_code: response.transaction_code,
        amount: response.amount,
        currency: response.currency,
        status: response.status,
        timestamp: response.timestamp,
        merchant_reference: response.merchant_reference,
        payment_type: response.payment_type,
        card: response.card ? {
          last_4_digits: response.card.last_4_digits,
          type: response.card.type
        } : undefined
      }
    } catch (error) {
      console.error('Failed to process SumUp payment:', error)
      throw error
    }
  }

  async refundPayment(transactionId: string, amount?: number): Promise<any> {
    try {
      const refundData = amount ? { amount } : {}
      const response = await this.makeRequest(`/v0.1/me/refund/${transactionId}`, 'POST', refundData)
      return response
    } catch (error) {
      console.error('Failed to refund SumUp payment:', error)
      throw error
    }
  }

  // Helper method to calculate SumUp fees (typically 2.75% + fixed fee)
  calculateFees(amount: number, currency: string = 'USD'): number {
    const feePercentage = 0.0275 // 2.75%
    const fixedFee = currency === 'EUR' ? 0.25 : 0.30 // Fixed fee varies by currency
    return Math.round((amount * feePercentage + fixedFee) * 100) / 100
  }

  // Method to validate payment amount (SumUp minimum amounts)
  validatePaymentAmount(amount: number, currency: string): boolean {
    const minimumAmounts: { [key: string]: number } = {
      'USD': 1.00,
      'EUR': 1.00,
      'GBP': 1.00,
      'CAD': 1.00,
      'AUD': 1.00
    }
    
    const minAmount = minimumAmounts[currency] || 1.00
    return amount >= minAmount
  }
}

export const sumupApi = new SumUpApiService()
export type { SumUpPayment, SumUpCheckout, SumUpPaymentResult }