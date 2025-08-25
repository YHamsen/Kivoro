import axios from 'axios';

// Configuration API Binance
const BINANCE_API_KEY = 'mMBtCpA9egYFnxNmLyuIVETEuGkAwzRxCGlRjjpZaVxrO2hAjPI1UKJem4utyXWp'
const BINANCE_API_SECRET = 'GMAbGZ9AFTFSpjPWlnNA141ms3oRxybAN45O2sTvOtMlqSc7HIDtcOhmLHIQSB0O'
const BINANCE_BASE_URL = 'https://data-api.binance.vision'
const BINANCE_TESTNET_URL = 'https://testnet.binance.vision'

// Interfaces Binance
export interface BinanceTicker {
  symbol: string
  price: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  count: number
}

export interface BinanceOrderBook {
  lastUpdateId: number
  bids: string[][]
  asks: string[][]
}

export interface BinanceKline {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
  quoteAssetVolume: string
  numberOfTrades: number
  takerBuyBaseAssetVolume: string
  takerBuyQuoteAssetVolume: string
}

export interface BinanceBalance {
  asset: string
  free: string
  locked: string
}

export interface BinanceExchangeInfo {
  timezone: string
  serverTime: number
  rateLimits: any[]
  symbols: BinanceSymbolInfo[]
}

export interface BinanceSymbolInfo {
  symbol: string
  status: string
  baseAsset: string
  baseAssetPrecision: number
  quoteAsset: string
  quotePrecision: number
  quoteAssetPrecision: number
  orderTypes: string[]
  icebergAllowed: boolean
  ocoAllowed: boolean
  isSpotTradingAllowed: boolean
  isMarginTradingAllowed: boolean
  filters: any[]
  permissions: string[]
}

class BinanceApiService {
  private baseUrl: string
  
  constructor(testnet: boolean = false) {
    this.baseUrl = testnet ? BINANCE_TESTNET_URL : BINANCE_BASE_URL
  }

  // === ENDPOINTS PUBLICS ===

  // Informations sur l'exchange
  async getExchangeInfo(): Promise<BinanceExchangeInfo> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v3/exchangeInfo`)
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'exchange Binance:", error)
      throw error
    }
  }

  // Récupérer tous les tickers 24h
  async getAllTickers(): Promise<BinanceTicker[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v3/ticker/24hr`)
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération de tous les tickers Binance:", error)
      throw error
    }
  }

  // Tickers pour un symbole spécifique
  async getMarketTickers(symbol?: string): Promise<BinanceTicker[]> {
    try {
      const params = symbol ? { symbol } : {}
      const response = await axios.get(`${this.baseUrl}/api/v3/ticker/24hr`, { params })
      return Array.isArray(response.data) ? response.data : [response.data]
    } catch (error) {
      console.error("Erreur lors de la récupération des tickers Binance:", error)
      throw error
    }
  }

  // Prix des symboles
  async getTickerPrices(symbol?: string): Promise<any[]> {
    try {
      const params = symbol ? { symbol } : {}
      const response = await axios.get(`${this.baseUrl}/api/v3/ticker/price`, { params })
      return Array.isArray(response.data) ? response.data : [response.data]
    } catch (error) {
      console.error("Erreur lors de la récupération des prix Binance:", error)
      throw error
    }
  }

  // Order book
  async getOrderBook(symbol: string, limit: number = 100): Promise<BinanceOrderBook> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v3/depth`, {
        params: { symbol, limit }
      })
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération de l'order book Binance:", error)
      throw error
    }
  }

  // Données Kline (OHLC)
  async getKlineData(
    symbol: string,
    interval: string = '1m',
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<BinanceKline[]> {
    try {
      const params: any = { symbol, interval, limit }
      if (startTime) params.startTime = startTime
      if (endTime) params.endTime = endTime
      
      const response = await axios.get(`${this.baseUrl}/api/v3/klines`, { params })
      
      return response.data.map((kline: any[]) => ({
        openTime: kline[0],
        open: kline[1],
        high: kline[2],
        low: kline[3],
        close: kline[4],
        volume: kline[5],
        closeTime: kline[6],
        quoteAssetVolume: kline[7],
        numberOfTrades: kline[8],
        takerBuyBaseAssetVolume: kline[9],
        takerBuyQuoteAssetVolume: kline[10]
      }))
    } catch (error) {
      console.error("Erreur lors de la récupération des données Kline Binance:", error)
      throw error
    }
  }

  // === MÉTHODES UTILITAIRES POUR L'INTERFACE ===

  // Paires populaires
  async getPopularPairs(): Promise<BinanceTicker[]> {
    const tickers = await this.getAllTickers()
    const popularSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'DOTUSDT', 'BNBUSDT', 'XRPUSDT', 'LTCUSDT']
    return tickers.filter(ticker => popularSymbols.includes(ticker.symbol))
  }

  // Cryptomonnaies par volume
  async getTopByVolume(limit: number = 50): Promise<BinanceTicker[]> {
    const tickers = await this.getAllTickers()
    return tickers
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, limit)
  }

  // Cryptomonnaies par variation
  async getTopGainers(limit: number = 20): Promise<BinanceTicker[]> {
    const tickers = await this.getAllTickers()
    return tickers
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
      .slice(0, limit)
  }

  // Plus grosses baisses
  async getTopLosers(limit: number = 20): Promise<BinanceTicker[]> {
    const tickers = await this.getAllTickers()
    return tickers
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent))
      .slice(0, limit)
  }

  // Récupérer les cryptos depuis le fichier local (optimisé)
  async getLocalCryptosData(): Promise<any> {
    try {
      const response = await fetch('/data/binance_cryptocurrencies_official.json')
      if (response.ok) {
        return await response.json()
      }
      throw new Error('Fichier local non trouvé')
    } catch (error) {
      console.error('Erreur lors de la récupération des données locales:', error)
      return null
    }
  }

  // Statut du système
  async getSystemStatus(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/sapi/v1/system/status`)
      return response.data
    } catch (error) {
      console.error("Erreur lors de la vérification du statut Binance:", error)
      return { status: 0, msg: 'System normal' } // Fallback
    }
  }

  // Informations sur le serveur
  async getServerTime(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v3/time`)
      return response.data.serverTime
    } catch (error) {
      console.error("Erreur lors de la récupération de l'heure du serveur:", error)
      return Date.now()
    }
  }

  // Méthodes supplémentaires pour compatibilité
  async getOrderHistory(symbol?: string, limit: number = 50): Promise<any[]> {
    try {
      console.log(`📊 Simulation de l'historique des ordres pour ${symbol || 'tous les symboles'}`)
      // Simulation de données d'ordres pour démonstration
      return []
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'historique des ordres:', error)
      return []
    }
  }

  async getDepositAddress(coin: string): Promise<any> {
    try {
      console.log(`🏦 Simulation de l'adresse de dépôt pour ${coin}`)
      // Simulation d'adresse de dépôt pour démonstration
      return {
        address: 'demo_address_' + coin.toLowerCase(),
        tag: '',
        coin: coin,
        url: ''
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'adresse de dépôt:', error)
      throw error
    }
  }

  async placeOrder(symbol: string, side: 'BUY' | 'SELL', type: string, quantity: string, price?: string): Promise<any> {
    try {
      console.log(`📊 Simulation d'ordre: ${side} ${quantity} ${symbol} (${type}) ${price ? 'à ' + price : ''}`)
      // Simulation d'ordre pour démonstration
      return {
        orderId: Date.now(),
        symbol: symbol,
        side: side,
        type: type,
        quantity: quantity,
        status: 'FILLED',
        price: price || '0.00',
        executedQty: quantity
      }
    } catch (error) {
      console.error('❌ Erreur lors du placement de l\'ordre:', error)
      throw error
    }
  }

  async getFormattedBalance(): Promise<any> {
    try {
      console.log('💰 Simulation du solde formaté')
      // Simulation de solde pour démonstration
      return {
        total_balance_eur: 0,
        total_balance_usd: 0,
        balances: []
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du solde formaté:', error)
      return {
        total_balance_eur: 0,
        total_balance_usd: 0,
        balances: []
      }
    }
  }
}

// Export singleton
export const binanceApi = new BinanceApiService(false) // Production
export const binanceTestApi = new BinanceApiService(true) // Testnet

export default BinanceApiService
