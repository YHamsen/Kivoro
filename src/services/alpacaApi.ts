import axios from 'axios'

// Alpaca API Configuration
const ALPACA_API_KEY = 'CKCCET2NRP4ML38C52CG'
const ALPACA_SECRET_KEY = 'UhBuD4E2tTmQbfI07ry6mFKufD0H9R1TU3wV5UXv'
const ALPACA_BASE_URL = 'https://paper-api.alpaca.markets' // Using paper trading for safety
const ALPACA_DATA_URL = 'https://data.alpaca.markets'

// Interfaces
export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  logo?: string
  exchange: string
}

export interface WatchlistItem {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  chart: number[] // Mini chart data
}

export interface Position {
  symbol: string
  name: string
  qty: number
  side: 'long' | 'short'
  market_value: number
  cost_basis: number
  unrealized_pl: number
  unrealized_plpc: number
  avg_entry_price: number
}

export interface Order {
  id: string
  symbol: string
  qty: number
  side: 'buy' | 'sell'
  order_type: string
  time_in_force: string
  status: string
  filled_price?: number
  submitted_at: string
}

export interface Portfolio {
  equity: number
  buying_power: number
  cash: number
  portfolio_value: number
  long_market_value: number
  short_market_value: number
  day_trade_count: number
}

export interface Dividend {
  symbol: string
  amount: number
  ex_date: string
  pay_date: string
  record_date: string
}

class AlpacaApiService {
  private baseHeaders = {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_SECRET_KEY,
    'Content-Type': 'application/json'
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', data?: any, useDataUrl = false) {
    const baseUrl = useDataUrl ? ALPACA_DATA_URL : ALPACA_BASE_URL
    
    try {
      const response = await axios({
        method,
        url: `${baseUrl}${endpoint}`,
        headers: this.baseHeaders,
        data
      })
      
      return response.data
    } catch (error: any) {
      console.error(`Alpaca API request failed:`, error)
      throw new Error(error.response?.data?.message || 'Alpaca API request failed')
    }
  }

  // Search stocks
  async searchStocks(query: string): Promise<Stock[]> {
    try {
      // Use Alpaca's assets endpoint to search
      const response = await this.makeRequest(`/v2/assets?status=active&asset_class=us_equity&search=${query}`)
      
      // Get quotes for the found assets
      const symbols = response.slice(0, 10).map((asset: any) => asset.symbol)
      const quotes = await this.getQuotes(symbols)
      
      return response.slice(0, 10).map((asset: any) => {
        const quote = quotes[asset.symbol] || {}
        return {
          symbol: asset.symbol,
          name: asset.name,
          price: quote.latest_trade?.p || 0,
          change: 0, // Will be calculated with historical data
          changePercent: 0,
          volume: quote.latest_trade?.s || 0,
          exchange: asset.exchange,
          logo: `https://assets.alpha-pulse.com/logos/${asset.symbol.toLowerCase()}.png`
        }
      })
    } catch (error) {
      console.error('Search failed:', error)
      // Return mock data for development
      return this.getMockSearchResults(query)
    }
  }

  // Get stock quotes
  async getQuotes(symbols: string[]): Promise<any> {
    try {
      const symbolsStr = symbols.join(',')
      return await this.makeRequest(`/v2/stocks/quotes/latest?symbols=${symbolsStr}`, 'GET', undefined, true)
    } catch (error) {
      console.error('Get quotes failed:', error)
      return {}
    }
  }

  // Get stock bars (for charts)
  async getStockBars(symbol: string, timeframe: '1Day' | '1Hour' | '1Min' = '1Day', limit = 30): Promise<number[]> {
    try {
      const response = await this.makeRequest(
        `/v2/stocks/${symbol}/bars?timeframe=${timeframe}&limit=${limit}&asof=2024-01-01`,
        'GET',
        undefined,
        true
      )
      
      return response.bars?.map((bar: any) => bar.c) || []
    } catch (error) {
      console.error('Get bars failed:', error)
      // Return mock chart data
      return this.generateMockChartData()
    }
  }

  // Get portfolio information
  async getPortfolio(): Promise<Portfolio> {
    try {
      const account = await this.makeRequest('/v2/account')
      return {
        equity: parseFloat(account.equity),
        buying_power: parseFloat(account.buying_power),
        cash: parseFloat(account.cash),
        portfolio_value: parseFloat(account.portfolio_value),
        long_market_value: parseFloat(account.long_market_value),
        short_market_value: parseFloat(account.short_market_value),
        day_trade_count: parseInt(account.day_trade_count)
      }
    } catch (error) {
      console.error('Get portfolio failed:', error)
      // Return mock portfolio
      return {
        equity: 10000,
        buying_power: 5000,
        cash: 2000,
        portfolio_value: 12000,
        long_market_value: 8000,
        short_market_value: 0,
        day_trade_count: 0
      }
    }
  }

  // Get positions (holdings)
  async getPositions(): Promise<Position[]> {
    try {
      const positions = await this.makeRequest('/v2/positions')
      return positions.map((pos: any) => ({
        symbol: pos.symbol,
        name: pos.symbol, // We'll enhance with company names later
        qty: parseFloat(pos.qty),
        side: pos.side,
        market_value: parseFloat(pos.market_value),
        cost_basis: parseFloat(pos.cost_basis),
        unrealized_pl: parseFloat(pos.unrealized_pl),
        unrealized_plpc: parseFloat(pos.unrealized_plpc),
        avg_entry_price: parseFloat(pos.avg_entry_price)
      }))
    } catch (error) {
      console.error('Get positions failed:', error)
      // Return mock positions
      return [
        {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          qty: 10,
          side: 'long',
          market_value: 3963,
          cost_basis: 3691,
          unrealized_pl: 272,
          unrealized_plpc: 0.0737,
          avg_entry_price: 369.1
        },
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          qty: 5,
          side: 'long',
          market_value: 841,
          cost_basis: 800,
          unrealized_pl: 41,
          unrealized_plpc: 0.0512,
          avg_entry_price: 160.0
        }
      ]
    }
  }

  // Place order
  async placeOrder(symbol: string, qty: number, side: 'buy' | 'sell', type: 'market' | 'limit' = 'market', limitPrice?: number): Promise<Order> {
    try {
      const orderData: any = {
        symbol,
        qty: qty.toString(),
        side,
        type,
        time_in_force: 'day'
      }
      
      if (type === 'limit' && limitPrice) {
        orderData.limit_price = limitPrice.toString()
      }
      
      const response = await this.makeRequest('/v2/orders', 'POST', orderData)
      
      return {
        id: response.id,
        symbol: response.symbol,
        qty: parseFloat(response.qty),
        side: response.side,
        order_type: response.type,
        time_in_force: response.time_in_force,
        status: response.status,
        filled_price: response.filled_avg_price ? parseFloat(response.filled_avg_price) : undefined,
        submitted_at: response.submitted_at
      }
    } catch (error) {
      console.error('Place order failed:', error)
      throw error
    }
  }

  // Get orders
  async getOrders(status: 'open' | 'closed' | 'all' = 'all'): Promise<Order[]> {
    try {
      const orders = await this.makeRequest(`/v2/orders?status=${status}`)
      return orders.map((order: any) => ({
        id: order.id,
        symbol: order.symbol,
        qty: parseFloat(order.qty),
        side: order.side,
        order_type: order.type,
        time_in_force: order.time_in_force,
        status: order.status,
        filled_price: order.filled_avg_price ? parseFloat(order.filled_avg_price) : undefined,
        submitted_at: order.submitted_at
      }))
    } catch (error) {
      console.error('Get orders failed:', error)
      return []
    }
  }

  // Cancel order
  async cancelOrder(orderId: string): Promise<void> {
    try {
      await this.makeRequest(`/v2/orders/${orderId}`, 'DELETE')
    } catch (error) {
      console.error('Cancel order failed:', error)
      throw error
    }
  }

  // Get dividends (mock for now)
  async getDividends(): Promise<Dividend[]> {
    // Alpaca doesn't provide dividend history in their API directly
    // This would typically come from a different data source
    return [
      {
        symbol: 'MSFT',
        amount: 0.68,
        ex_date: '2024-02-14',
        pay_date: '2024-03-14',
        record_date: '2024-02-15'
      },
      {
        symbol: 'AAPL',
        amount: 0.24,
        ex_date: '2024-02-09',
        pay_date: '2024-02-16',
        record_date: '2024-02-12'
      }
    ]
  }

  // Helper methods for mock data
  private getMockSearchResults(query: string): Stock[] {
    const mockStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 168.28, change: 1.38, changePercent: 0.83 },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: 146.14, change: 2.18, changePercent: 1.51 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 183.49, change: 1.80, changePercent: 0.99 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 396.30, change: -2.15, changePercent: -0.54 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2842.33, change: 15.20, changePercent: 0.54 }
    ]
    
    return mockStocks
      .filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
      .map(stock => ({
        ...stock,
        volume: Math.floor(Math.random() * 1000000),
        exchange: 'NASDAQ',
        logo: `https://assets.alpha-pulse.com/logos/${stock.symbol.toLowerCase()}.png`
      }))
  }

  private generateMockChartData(): number[] {
    const basePrice = 100 + Math.random() * 100
    const data = []
    let currentPrice = basePrice
    
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.5) * 10
      currentPrice += change
      data.push(Math.max(10, currentPrice))
    }
    
    return data
  }

  // Watchlist management (stored locally for now)
  private watchlistKey = 'alpaca_watchlist'

  getWatchlist(): WatchlistItem[] {
    try {
      const stored = localStorage.getItem(this.watchlistKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  async addToWatchlist(symbol: string): Promise<void> {
    try {
      const watchlist = this.getWatchlist()
      if (watchlist.find(item => item.symbol === symbol)) {
        return // Already in watchlist
      }

      // Get stock data
      const quotes = await this.getQuotes([symbol])
      const chart = await this.getStockBars(symbol, '1Day', 7)
      
      const quote = quotes[symbol]
      if (quote) {
        const newItem: WatchlistItem = {
          id: Date.now().toString(),
          symbol,
          name: symbol, // Would be enhanced with company name
          price: quote.latest_trade?.p || 0,
          change: 0, // Would be calculated
          changePercent: 0,
          chart
        }
        
        watchlist.push(newItem)
        localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist))
      }
    } catch (error) {
      console.error('Add to watchlist failed:', error)
    }
  }

  removeFromWatchlist(symbol: string): void {
    try {
      const watchlist = this.getWatchlist()
      const filtered = watchlist.filter(item => item.symbol !== symbol)
      localStorage.setItem(this.watchlistKey, JSON.stringify(filtered))
    } catch (error) {
      console.error('Remove from watchlist failed:', error)
    }
  }
}

export const alpacaApi = new AlpacaApiService()
export default alpacaApi
