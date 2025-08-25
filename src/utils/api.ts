import axios from 'axios'

// API configuration
const BYBIT_API = {
  key: 'AWh3OBAmkUe5K5wNOt',
  secret: 'KNA1N2aM50z8BoEnMoQjLJDlozrEgHB2UNzF',
  baseURL: 'https://api.bybit.com'
}

const ALPACA_API = {
  key: 'CKCCET2NRP4ML38C52CG',
  secret: 'UhBuD4E2tTmQbfI07ry6mFKufD0H9R1TU3wV5UXv',
  baseURL: 'https://paper-api.alpaca.markets'
}

// Create axios instances
export const bybitAPI = axios.create({
  baseURL: BYBIT_API.baseURL,
  headers: {
    'X-BAPI-API-KEY': BYBIT_API.key,
    'Content-Type': 'application/json'
  }
})

export const alpacaAPI = axios.create({
  baseURL: ALPACA_API.baseURL,
  headers: {
    'APCA-API-KEY-ID': ALPACA_API.key,
    'APCA-API-SECRET-KEY': ALPACA_API.secret,
    'Content-Type': 'application/json'
  }
})

// Bybit API functions
export const fetchCryptoTickers = async () => {
  try {
    // Use local data for demo purposes (external API has CORS issues)
    const fallbackResponse = await fetch('/data/crypto-pairs.json')
    const data = await fallbackResponse.json()
    console.log('Loaded crypto pairs data:', data)
    return data
  } catch (error) {
    console.error('Error fetching crypto tickers:', error)
    // Return empty structure if even local data fails
    return {
      favorites: [],
      hot: [],
      new: [],
      gainers: [],
      losers: [],
      volume: []
    }
  }
}

export const fetchKlineData = async (symbol: string, interval: string = '1h') => {
  try {
    const response = await bybitAPI.get('/v5/market/kline', {
      params: {
        category: 'spot',
        symbol: symbol.replace('/', ''),
        interval,
        limit: 200
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching kline data:', error)
    return null
  }
}

// Alpaca API functions (for forex data)
export const fetchForexRates = async () => {
  try {
    // Use local data for demo purposes (external API has CORS issues)
    const fallbackResponse = await fetch('/data/forex-pairs.json')
    const data = await fallbackResponse.json()
    console.log('Loaded forex pairs data:', data)
    return data
  } catch (error) {
    console.error('Error fetching forex rates:', error)
    // Return empty structure if even local data fails
    return {
      favorites: [],
      hot: [],
      new: [],
      gainers: [],
      losers: [],
      volume: []
    }
  }
}

export const fetchAccountInfo = async () => {
  try {
    const response = await alpacaAPI.get('/v2/account')
    return response.data
  } catch (error) {
    console.error('Error fetching account info:', error)
    return {
      equity: '5247.83',
      currency: 'USD'
    }
  }
}

// Utility functions
export const formatPrice = (price: number | string, decimals: number = 2): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return '0.00'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else if (num < 1) {
    return num.toFixed(6)
  } else {
    return num.toFixed(decimals)
  }
}

export const formatPercentage = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0.00%'
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`
}

export const formatCurrency = (amount: number | string, currency: string = 'USD'): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return `0.00 ${currency}`
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num).replace(currency, '').trim() + ` ${currency}`
}

// WebSocket connections for real-time data
export class RealtimeDataManager {
  private wsConnections: Map<string, WebSocket> = new Map()
  
  connectBybitWS(callback: (data: any) => void) {
    const ws = new WebSocket('wss://stream.bybit.com/v5/public/spot')
    
    ws.onopen = () => {
      console.log('Connected to Bybit WebSocket')
      // Subscribe to ticker data
      ws.send(JSON.stringify({
        op: 'subscribe',
        args: ['tickers.BTCUSDT', 'tickers.ETHUSDT', 'tickers.SOLUSDT']
      }))
    }
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        callback(data)
      } catch (error) {
        console.error('Error parsing WebSocket data:', error)
      }
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    ws.onclose = () => {
      console.log('WebSocket connection closed')
      // Reconnect after 5 seconds
      setTimeout(() => this.connectBybitWS(callback), 5000)
    }
    
    this.wsConnections.set('bybit', ws)
    return ws
  }
  
  disconnect(connectionName: string) {
    const ws = this.wsConnections.get(connectionName)
    if (ws) {
      ws.close()
      this.wsConnections.delete(connectionName)
    }
  }
  
  disconnectAll() {
    this.wsConnections.forEach((ws) => ws.close())
    this.wsConnections.clear()
  }
}

export const realtimeManager = new RealtimeDataManager()
