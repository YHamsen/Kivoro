import axios from 'axios'

// Alpaca API Configuration (pour Forex et Actions)
const ALPACA_API_KEY = 'CKCCET2NRP4ML38C52CG'
const ALPACA_SECRET_KEY = 'UhBuD4E2tTmQbfI07ry6mFKufD0H9R1TU3wV5UXv'
const ALPACA_BASE_URL = 'https://paper-api.alpaca.markets' // Paper trading pour sécurité
const ALPACA_DATA_URL = 'https://data.alpaca.markets'

// Interfaces Forex
export interface ForexTicker {
  symbol: string
  bid: number
  ask: number
  spread: number
  change: number
  changePercent: number
  timestamp: string
}

export interface ForexCandle {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface ForexPosition {
  symbol: string
  side: 'long' | 'short'
  qty: number
  market_value: number
  unrealized_pl: number
  unrealized_plpc: number
  avg_entry_price: number
}

// Interfaces Actions
export interface StockTicker {
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

export interface StockCandle {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface StockPosition {
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

// Interface Portfolio Alpaca
export interface AlpacaPortfolio {
  equity: number
  buying_power: number
  cash: number
  portfolio_value: number
  long_market_value: number
  short_market_value: number
  day_trade_count: number
}

// Interface Ordre Alpaca
export interface AlpacaOrder {
  id: string
  symbol: string
  asset_class: 'us_equity' | 'crypto' | 'forex'
  qty: number
  side: 'buy' | 'sell'
  order_type: 'market' | 'limit' | 'stop' | 'stop_limit'
  time_in_force: 'day' | 'gtc' | 'ioc' | 'fok'
  limit_price?: number
  stop_price?: number
  status: string
  submitted_at: string
  filled_at?: string
  filled_qty: number
  filled_avg_price?: number
}

class AlpacaForexStocksService {
  private headers: Record<string, string>
  
  constructor() {
    this.headers = {
      'APCA-API-KEY-ID': ALPACA_API_KEY,
      'APCA-API-SECRET-KEY': ALPACA_SECRET_KEY,
      'Content-Type': 'application/json'
    }
  }

  // Méthode générique pour les requêtes
  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', data?: any, useDataApi = false): Promise<any> {
    const baseUrl = useDataApi ? ALPACA_DATA_URL : ALPACA_BASE_URL
    const url = `${baseUrl}${endpoint}`
    
    try {
      const response = await axios({
        method,
        url,
        headers: this.headers,
        data
      })
      return response.data
    } catch (error) {
      console.error(`Erreur API Alpaca (${method} ${endpoint}):`, error)
      throw error
    }
  }

  // === FOREX METHODS ===

  // Obtenir les tickers Forex populaires
  async getForexTickers(): Promise<ForexTicker[]> {
    try {
      const majorPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD']
      const symbols = majorPairs.join(',')
      
      const response = await this.makeRequest(
        `/v1beta1/forex/latest/rates?currency_pairs=${symbols}`,
        'GET',
        undefined,
        true
      )
      
      return majorPairs.map(pair => {
        const rate = response.rates?.[pair.replace('/', '')]
        return {
          symbol: pair,
          bid: rate?.bid || 0,
          ask: rate?.ask || 0,
          spread: rate ? (rate.ask - rate.bid) : 0,
          change: 0, // TODO: Calculer avec données historiques
          changePercent: 0,
          timestamp: response.timestamp || new Date().toISOString()
        }
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des tickers Forex:', error)
      return this.getMockForexTickers()
    }
  }

  // Obtenir données OHLC Forex
  async getForexCandles(symbol: string, timeframe: '1Min' | '5Min' | '15Min' | '1Hour' | '1Day' = '1Hour', limit = 100): Promise<ForexCandle[]> {
    try {
      const response = await this.makeRequest(
        `/v1beta1/forex/${symbol.replace('/', '')}/bars?timeframe=${timeframe}&limit=${limit}`,
        'GET',
        undefined,
        true
      )
      
      return (response.bars || []).map((bar: any) => ({
        timestamp: bar.t,
        open: bar.o,
        high: bar.h,
        low: bar.l,
        close: bar.c,
        volume: bar.v || 0
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des données Forex:', error)
      return this.generateMockForexCandles()
    }
  }

  // === STOCKS METHODS ===

  // Rechercher des actions
  async searchStocks(query: string): Promise<StockTicker[]> {
    try {
      const response = await this.makeRequest(`/v2/assets?status=active&asset_class=us_equity&search=${query}`)
      
      const symbols = response.slice(0, 10).map((asset: any) => asset.symbol)
      const quotes = await this.getStockQuotes(symbols)
      
      return response.slice(0, 10).map((asset: any) => {
        const quote = quotes[asset.symbol] || {}
        return {
          symbol: asset.symbol,
          name: asset.name,
          price: quote.latest_trade?.p || 0,
          change: 0,
          changePercent: 0,
          volume: quote.latest_trade?.s || 0,
          exchange: asset.exchange,
          logo: `https://logo.clearbit.com/${asset.name.toLowerCase().replace(/\s+/g, '')}.com`
        }
      })
    } catch (error) {
      console.error('Erreur lors de la recherche d\'actions:', error)
      return this.getMockStockTickers()
    }
  }

  // Obtenir cotations en temps réel
  async getStockQuotes(symbols: string[]): Promise<any> {
    try {
      const symbolsStr = symbols.join(',')
      return await this.makeRequest(`/v2/stocks/quotes/latest?symbols=${symbolsStr}`, 'GET', undefined, true)
    } catch (error) {
      console.error('Erreur lors de la récupération des cotations:', error)
      return {}
    }
  }

  // Obtenir données OHLC Actions
  async getStockCandles(symbol: string, timeframe: '1Min' | '5Min' | '15Min' | '1Hour' | '1Day' = '1Day', limit = 100): Promise<StockCandle[]> {
    try {
      const response = await this.makeRequest(
        `/v2/stocks/${symbol}/bars?timeframe=${timeframe}&limit=${limit}`,
        'GET',
        undefined,
        true
      )
      
      return (response.bars || []).map((bar: any) => ({
        timestamp: bar.t,
        open: bar.o,
        high: bar.h,
        low: bar.l,
        close: bar.c,
        volume: bar.v
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des données Actions:', error)
      return this.generateMockStockCandles()
    }
  }

  // === PORTFOLIO & TRADING METHODS ===

  // Obtenir informations du portfolio
  async getPortfolio(): Promise<AlpacaPortfolio> {
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
      console.error('Erreur lors de la récupération du portfolio:', error)
      return this.getMockPortfolio()
    }
  }

  // Obtenir positions (Actions)
  async getStockPositions(): Promise<StockPosition[]> {
    try {
      const positions = await this.makeRequest('/v2/positions')
      return positions.map((pos: any) => ({
        symbol: pos.symbol,
        name: pos.symbol,
        qty: parseFloat(pos.qty),
        side: pos.side,
        market_value: parseFloat(pos.market_value),
        cost_basis: parseFloat(pos.cost_basis),
        unrealized_pl: parseFloat(pos.unrealized_pl),
        unrealized_plpc: parseFloat(pos.unrealized_plpc),
        avg_entry_price: parseFloat(pos.avg_entry_price)
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des positions:', error)
      return []
    }
  }

  // Placer un ordre (Actions/Forex)
  async placeOrder(
    symbol: string,
    qty: number,
    side: 'buy' | 'sell',
    type: 'market' | 'limit' | 'stop' | 'stop_limit' = 'market',
    time_in_force: 'day' | 'gtc' | 'ioc' | 'fok' = 'gtc',
    limit_price?: number,
    stop_price?: number
  ): Promise<AlpacaOrder> {
    try {
      const orderData: any = {
        symbol,
        qty,
        side,
        type,
        time_in_force
      }
      
      if (type === 'limit' && limit_price) {
        orderData.limit_price = limit_price
      }
      if ((type === 'stop' || type === 'stop_limit') && stop_price) {
        orderData.stop_price = stop_price
      }
      if (type === 'stop_limit' && limit_price) {
        orderData.limit_price = limit_price
      }
      
      const response = await this.makeRequest('/v2/orders', 'POST', orderData)
      return response
    } catch (error) {
      console.error('Erreur lors de la création de l\'ordre:', error)
      throw error
    }
  }

  // Obtenir historique des ordres
  async getOrderHistory(status?: string, limit = 100): Promise<AlpacaOrder[]> {
    try {
      const params = new URLSearchParams({ limit: limit.toString() })
      if (status) params.append('status', status)
      
      const response = await this.makeRequest(`/v2/orders?${params.toString()}`)
      return response || []
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error)
      return []
    }
  }

  // === MOCK DATA METHODS ===

  private getMockForexTickers(): ForexTicker[] {
    return [
      { symbol: 'EUR/USD', bid: 1.0875, ask: 1.0877, spread: 0.0002, change: 0.0012, changePercent: 0.11, timestamp: new Date().toISOString() },
      { symbol: 'GBP/USD', bid: 1.2645, ask: 1.2647, spread: 0.0002, change: -0.0023, changePercent: -0.18, timestamp: new Date().toISOString() },
      { symbol: 'USD/JPY', bid: 149.85, ask: 149.87, spread: 0.02, change: 0.45, changePercent: 0.30, timestamp: new Date().toISOString() },
      { symbol: 'USD/CHF', bid: 0.8756, ask: 0.8758, spread: 0.0002, change: 0.0034, changePercent: 0.39, timestamp: new Date().toISOString() },
      { symbol: 'AUD/USD', bid: 0.6534, ask: 0.6536, spread: 0.0002, change: -0.0012, changePercent: -0.18, timestamp: new Date().toISOString() }
    ]
  }

  private getMockStockTickers(): StockTicker[] {
    return [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 195.42, change: 2.34, changePercent: 1.21, volume: 45678900, exchange: 'NASDAQ', logo: 'https://logo.clearbit.com/apple.com' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.78, change: -1.23, changePercent: -0.30, volume: 23456780, exchange: 'NASDAQ', logo: 'https://logo.clearbit.com/microsoft.com' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 145.67, change: 3.45, changePercent: 2.43, volume: 34567890, exchange: 'NASDAQ', logo: 'https://logo.clearbit.com/google.com' }
    ]
  }

  private getMockPortfolio(): AlpacaPortfolio {
    return {
      equity: 50000,
      buying_power: 25000,
      cash: 15000,
      portfolio_value: 52000,
      long_market_value: 35000,
      short_market_value: 0,
      day_trade_count: 2
    }
  }

  private generateMockForexCandles(): ForexCandle[] {
    const candles = []
    const basePrice = 1.0875
    let currentPrice = basePrice
    
    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 0.002
      currentPrice += change
      
      candles.push({
        timestamp: new Date(Date.now() - (100 - i) * 60000).toISOString(),
        open: currentPrice - change,
        high: currentPrice + Math.random() * 0.001,
        low: currentPrice - Math.random() * 0.001,
        close: currentPrice,
        volume: Math.floor(Math.random() * 1000000)
      })
    }
    
    return candles
  }

  private generateMockStockCandles(): StockCandle[] {
    const candles = []
    const basePrice = 195.42
    let currentPrice = basePrice
    
    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 5
      currentPrice += change
      
      candles.push({
        timestamp: new Date(Date.now() - (100 - i) * 86400000).toISOString(), // Daily candles
        open: currentPrice - change,
        high: currentPrice + Math.random() * 3,
        low: currentPrice - Math.random() * 3,
        close: currentPrice,
        volume: Math.floor(Math.random() * 10000000)
      })
    }
    
    return candles
  }

  // Méthodes utilitaires pour le multi-wallet
  async getFormattedForexBalance(): Promise<{ pair: string; position: string; pnl: string }[]> {
    // TODO: Implémenter avec de vraies données Forex
    return [
      { pair: 'EUR/USD', position: '10,000 EUR', pnl: '+125.50 USD' },
      { pair: 'GBP/USD', position: '5,000 GBP', pnl: '-45.30 USD' }
    ]
  }

  async getFormattedStockBalance(): Promise<{ symbol: string; shares: string; value: string }[]> {
    try {
      const positions = await this.getStockPositions()
      return positions.map(pos => ({
        symbol: pos.symbol,
        shares: pos.qty.toString(),
        value: `$${pos.market_value.toFixed(2)}`
      }))
    } catch (error) {
      return [
        { symbol: 'AAPL', shares: '50', value: '$9,771.00' },
        { symbol: 'MSFT', shares: '25', value: '$10,319.50' }
      ]
    }
  }
}

// Export singleton
export const alpacaForexStocksApi = new AlpacaForexStocksService()

export default AlpacaForexStocksService
