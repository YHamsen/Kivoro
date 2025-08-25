import axios from 'axios'
import CryptoJS from 'crypto-js'

// Bybit API Configuration (API principale de Kivoro)
const BYBIT_API_KEY = 'mMBtCpA9egYFnxNmLyuIVETEuGkAwzRxCGlRjjpZaVxrO2hAjPI1UKJem4utyXWp'
const BYBIT_API_SECRET = 'GMAbGZ9AFTFSpjPWlnNA141ms3oRxybAN45O2sTvOtMlqSc7HIDtcOhmLHIQSB0O'
const BYBIT_BASE_URL = 'https://api.bybit.com'
const BYBIT_TESTNET_URL = 'https://api-testnet.bybit.com'

// Interfaces Bybit
export interface BybitTicker {
  symbol: string
  lastPrice: string
  priceChangePercent: string
  highPrice24h: string
  lowPrice24h: string
  volume24h: string
  turnover24h: string
  bid1Price: string
  ask1Price: string
}

export interface BybitOrderBook {
  symbol: string
  bids: [string, string][] // [price, size]
  asks: [string, string][] // [price, size]
  ts: number
}

export interface BybitKline {
  symbol: string
  category: string
  list: [string, string, string, string, string, string][] // [timestamp, open, high, low, close, volume]
}

export interface BybitBalance {
  accountType: string
  coin: string
  walletBalance: string
  transferBalance: string
  bonus: string
}

export interface BybitOrder {
  orderId: string
  orderLinkId: string
  symbol: string
  side: 'Buy' | 'Sell'
  orderType: string
  qty: string
  price: string
  timeInForce: string
  orderStatus: string
  createTime: string
  updateTime: string
}

export interface BybitDepositAddress {
  coin: string
  chain: string
  address: string
  tag?: string
}

// Fonction de signature pour Bybit
function createBybitSignature(timestamp: string, apiKey: string, recvWindow: string, queryString: string): string {
  const param = timestamp + apiKey + recvWindow + queryString
  return CryptoJS.HmacSHA256(param, BYBIT_API_SECRET).toString(CryptoJS.enc.Hex)
}

// Configuration des headers authentifiés
function getBybitHeaders(queryString: string = ''): Record<string, string> {
  const timestamp = Date.now().toString()
  const recvWindow = '5000'
  const signature = createBybitSignature(timestamp, BYBIT_API_KEY, recvWindow, queryString)
  
  return {
    'X-BAPI-API-KEY': BYBIT_API_KEY,
    'X-BAPI-SIGN': signature,
    'X-BAPI-SIGN-TYPE': '2',
    'X-BAPI-TIMESTAMP': timestamp,
    'X-BAPI-RECV-WINDOW': recvWindow,
    'Content-Type': 'application/json'
  }
}

class BybitApiService {
  private baseUrl: string
  
  constructor(testnet: boolean = false) {
    this.baseUrl = testnet ? BYBIT_TESTNET_URL : BYBIT_BASE_URL
  }

  // 🔹 GET /v5/market/tickers – Données des paires crypto (BTC/USDT, etc.)
  async getMarketTickers(category: string = 'spot'): Promise<BybitTicker[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/v5/market/tickers`, {
        params: { category }
      })
      return response.data.result.list || []
    } catch (error) {
      console.error('Erreur lors de la récupération des tickers:', error)
      throw error
    }
  }

  // 🔹 GET /v5/market/orderbook – Order book (profondeur)
  async getOrderBook(symbol: string, category: string = 'spot'): Promise<BybitOrderBook> {
    try {
      const response = await axios.get(`${this.baseUrl}/v5/market/orderbook`, {
        params: { category, symbol, limit: 25 }
      })
      return response.data.result
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'order book:', error)
      throw error
    }
  }

  // 🔹 GET /v5/market/kline – Graphique OHLC
  async getKlineData(symbol: string, interval: string = '1', category: string = 'spot', limit: number = 200): Promise<BybitKline> {
    try {
      const response = await axios.get(`${this.baseUrl}/v5/market/kline`, {
        params: { category, symbol, interval, limit }
      })
      return response.data.result
    } catch (error) {
      console.error('Erreur lors de la récupération des données Kline:', error)
      throw error
    }
  }

  // 🔹 POST /v5/order/create – Placer un ordre (market/limit)
  async placeOrder(
    symbol: string,
    side: 'Buy' | 'Sell',
    orderType: 'Market' | 'Limit',
    qty: string,
    price?: string,
    category: string = 'spot'
  ): Promise<BybitOrder> {
    try {
      const orderData: any = {
        category,
        symbol,
        side,
        orderType,
        qty
      }
      
      if (orderType === 'Limit' && price) {
        orderData.price = price
      }
      
      const queryString = Object.keys(orderData)
        .sort()
        .map(key => `${key}=${orderData[key]}`)
        .join('&')
      
      const response = await axios.post(
        `${this.baseUrl}/v5/order/create`,
        orderData,
        { headers: getBybitHeaders(queryString) }
      )
      
      return response.data.result
    } catch (error) {
      console.error('Erreur lors de la création de l\'ordre:', error)
      throw error
    }
  }

  // 🔹 GET /v5/order/history – Historique des trades
  async getOrderHistory(category: string = 'spot', limit: number = 20): Promise<BybitOrder[]> {
    try {
      const queryString = `category=${category}&limit=${limit}`
      
      const response = await axios.get(`${this.baseUrl}/v5/order/history`, {
        params: { category, limit },
        headers: getBybitHeaders(queryString)
      })
      
      return response.data.result.list || []
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error)
      throw error
    }
  }

  // 🔹 GET /v5/account/wallet-balance – Solde utilisateur
  async getWalletBalance(accountType: string = 'SPOT'): Promise<BybitBalance[]> {
    try {
      const queryString = `accountType=${accountType}`
      
      const response = await axios.get(`${this.baseUrl}/v5/account/wallet-balance`, {
        params: { accountType },
        headers: getBybitHeaders(queryString)
      })
      
      return response.data.result.list?.[0]?.coin || []
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error)
      throw error
    }
  }

  // 🔹 GET /v5/asset/deposit/query – Adresses de dépôt
  async getDepositAddress(coin: string, chainType?: string): Promise<BybitDepositAddress> {
    try {
      const params: any = { coin }
      if (chainType) params.chainType = chainType
      
      const queryString = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&')
      
      const response = await axios.get(`${this.baseUrl}/v5/asset/deposit/query-address`, {
        params,
        headers: getBybitHeaders(queryString)
      })
      
      return response.data.result.chains?.[0] || {}
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse de dépôt:', error)
      throw error
    }
  }

  // 🔹 POST /v5/asset/withdraw/create – Retrait crypto
  async createWithdrawal(
    coin: string,
    chain: string,
    address: string,
    amount: string,
    tag?: string
  ): Promise<any> {
    try {
      const withdrawData: any = {
        coin,
        chain,
        address,
        amount
      }
      
      if (tag) withdrawData.tag = tag
      
      const queryString = Object.keys(withdrawData)
        .sort()
        .map(key => `${key}=${withdrawData[key]}`)
        .join('&')
      
      const response = await axios.post(
        `${this.baseUrl}/v5/asset/withdraw/create`,
        withdrawData,
        { headers: getBybitHeaders(queryString) }
      )
      
      return response.data.result
    } catch (error) {
      console.error('Erreur lors de la création du retrait:', error)
      throw error
    }
  }

  // Méthodes utilitaires pour l'interface
  async getPopularPairs(): Promise<BybitTicker[]> {
    const tickers = await this.getMarketTickers('spot')
    const popularSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'DOTUSDT']
    return tickers.filter(ticker => popularSymbols.includes(ticker.symbol))
  }

  async getFormattedBalance(): Promise<{ coin: string; balance: string; usdValue: string }[]> {
    const balances = await this.getWalletBalance()
    return balances.map(balance => ({
      coin: balance.coin,
      balance: balance.walletBalance,
      usdValue: '0' // TODO: Calculer la valeur USD avec les taux de change
    }))
  }
}

// Export singleton
export const bybitApi = new BybitApiService(false) // Production
export const bybitTestApi = new BybitApiService(true) // Testnet

export default BybitApiService
