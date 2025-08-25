import axios from 'axios'
import CryptoJS from 'crypto-js'

// OKX API Configuration
const OKX_API_KEY = 'fc7d6ecf-e007-4a8b-85f4-13d5c5e2743a'
const OKX_API_SECRET = '8F249B9E010BD830B8FC88B126E11644'
const OKX_PASSPHRASE = 'kivoro2025'
const OKX_BASE_URL = 'https://www.okx.com'
const OKX_SANDBOX_URL = 'https://www.okx.com' // OKX utilise la même URL

// Interfaces OKX
export interface OKXTicker {
  instId: string
  last: string
  lastSz: string
  askPx: string
  askSz: string
  bidPx: string
  bidSz: string
  open24h: string
  high24h: string
  low24h: string
  vol24h: string
  volCcy24h: string
  sodUtc0: string
  sodUtc8: string
  ts: string
}

export interface OKXOrderBook {
  asks: string[][]
  bids: string[][]
  ts: string
}

export interface OKXCandle {
  ts: string
  o: string
  h: string
  l: string
  c: string
  vol: string
  volCcy: string
}

export interface OKXBalance {
  ccy: string
  bal: string
  frozenBal: string
  availBal: string
  cashBal?: string
}

export interface OKXOrder {
  ordId: string
  clOrdId: string
  tag: string
  instId: string
  side: string
  ordType: string
  sz: string
  px: string
  state: string
  cTime: string
  uTime: string
  fillSz: string
  fillPx: string
  avgPx: string
}

export interface OKXDepositAddress {
  ccy: string
  chain: string
  addr: string
  tag?: string
  memo?: string
  to: string
}

// Fonction de signature pour OKX
function createOKXSignature(timestamp: string, method: string, requestPath: string, body: string = ''): string {
  const message = timestamp + method.toUpperCase() + requestPath + body
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, OKX_API_SECRET))
}

// Configuration des headers authentifiés
function getOKXHeaders(method: string, requestPath: string, body: string = ''): Record<string, string> {
  const timestamp = new Date().toISOString()
  const signature = createOKXSignature(timestamp, method, requestPath, body)
  
  return {
    'OK-ACCESS-KEY': OKX_API_KEY,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': OKX_PASSPHRASE,
    'Content-Type': 'application/json'
  }
}

class OKXApiService {
  private baseUrl: string
  
  constructor(sandbox: boolean = false) {
    this.baseUrl = sandbox ? OKX_SANDBOX_URL : OKX_BASE_URL
  }

  // 🔹 Ticker + données de marché
  async getMarketTickers(instType: string = 'SPOT'): Promise<OKXTicker[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v5/market/tickers`, {
        params: { instType }
      })
      return response.data.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des tickers OKX:', error)
      throw error
    }
  }

  // 🔹 Order book (carnet d'ordres)
  async getOrderBook(instId: string, sz: number = 20): Promise<OKXOrderBook> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v5/market/books`, {
        params: { instId, sz }
      })
      return response.data.data?.[0] || { asks: [], bids: [], ts: '' }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'order book OKX:', error)
      throw error
    }
  }

  // 🔹 Données OHLC (candlestick)
  async getCandleData(instId: string, bar: string = '1m', limit: string = '100'): Promise<OKXCandle[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v5/market/candles`, {
        params: { instId, bar, limit }
      })
      
      return (response.data.data || []).map((candle: string[]) => ({
        ts: candle[0],
        o: candle[1],
        h: candle[2],
        l: candle[3],
        c: candle[4],
        vol: candle[5],
        volCcy: candle[6]
      }))
    } catch (error) {
      console.error('Erreur lors de la récupération des données OHLC OKX:', error)
      throw error
    }
  }

  // 🔹 Solde portefeuille (/account/balance)
  async getAccountBalance(ccy?: string): Promise<OKXBalance[]> {
    try {
      const requestPath = '/api/v5/account/balance'
      const params = ccy ? `?ccy=${ccy}` : ''
      
      const response = await axios.get(`${this.baseUrl}${requestPath}${params}`, {
        headers: getOKXHeaders('GET', requestPath + params)
      })
      
      return response.data.data?.[0]?.details || []
    } catch (error) {
      console.error('Erreur lors de la récupération du solde OKX:', error)
      throw error
    }
  }

  // 🔹 Dépôt (/asset/deposit-address)
  async getDepositAddress(ccy: string): Promise<OKXDepositAddress[]> {
    try {
      const requestPath = `/api/v5/asset/deposit-address?ccy=${ccy}`
      
      const response = await axios.get(`${this.baseUrl}${requestPath}`, {
        headers: getOKXHeaders('GET', requestPath)
      })
      
      return response.data.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adresse de dépôt OKX:', error)
      throw error
    }
  }

  // 🔹 Retrait (/asset/withdrawal)
  async createWithdrawal(
    ccy: string,
    amt: string,
    dest: string, // 3: internal transfer, 4: on-chain
    toAddr: string,
    fee: string,
    chain?: string,
    memo?: string
  ): Promise<any> {
    try {
      const requestPath = '/api/v5/asset/withdrawal'
      const body = JSON.stringify({
        ccy,
        amt,
        dest,
        toAddr,
        fee,
        ...(chain && { chain }),
        ...(memo && { memo })
      })
      
      const response = await axios.post(
        `${this.baseUrl}${requestPath}`,
        JSON.parse(body),
        { headers: getOKXHeaders('POST', requestPath, body) }
      )
      
      return response.data.data?.[0] || {}
    } catch (error) {
      console.error('Erreur lors de la création du retrait OKX:', error)
      throw error
    }
  }

  // 🔹 Trading spot (/trade/order)
  async placeOrder(
    instId: string,
    tdMode: string, // 'cash', 'cross', 'isolated'
    side: 'buy' | 'sell',
    ordType: 'market' | 'limit',
    sz: string,
    px?: string,
    clOrdId?: string
  ): Promise<OKXOrder> {
    try {
      const requestPath = '/api/v5/trade/order'
      const orderData: any = {
        instId,
        tdMode,
        side,
        ordType,
        sz
      }
      
      if (ordType === 'limit' && px) {
        orderData.px = px
      }
      if (clOrdId) {
        orderData.clOrdId = clOrdId
      }
      
      const body = JSON.stringify(orderData)
      
      const response = await axios.post(
        `${this.baseUrl}${requestPath}`,
        orderData,
        { headers: getOKXHeaders('POST', requestPath, body) }
      )
      
      return response.data.data?.[0] || {}
    } catch (error) {
      console.error('Erreur lors de la création de l\'ordre OKX:', error)
      throw error
    }
  }

  // 🔹 Historique des ordres
  async getOrderHistory(instType: string = 'SPOT', state?: string, limit: string = '100'): Promise<OKXOrder[]> {
    try {
      const params = new URLSearchParams({ instType, limit })
      if (state) params.append('state', state)
      
      const requestPath = `/api/v5/trade/orders-history?${params.toString()}`
      
      const response = await axios.get(`${this.baseUrl}${requestPath}`, {
        headers: getOKXHeaders('GET', requestPath)
      })
      
      return response.data.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique OKX:', error)
      throw error
    }
  }

  // Méthodes utilitaires pour l'interface
  async getPopularPairs(): Promise<OKXTicker[]> {
    const tickers = await this.getMarketTickers('SPOT')
    const popularSymbols = ['BTC-USDT', 'ETH-USDT', 'SOL-USDT', 'ADA-USDT', 'DOT-USDT']
    return tickers.filter(ticker => popularSymbols.includes(ticker.instId))
  }

  async getFormattedBalance(): Promise<{ coin: string; balance: string; usdValue: string }[]> {
    const balances = await this.getAccountBalance()
    return balances.map(balance => ({
      coin: balance.ccy,
      balance: balance.availBal,
      usdValue: '0' // TODO: Calculer la valeur USD avec les taux de change
    }))
  }

  // Paiement OKX ↔ OKX (instantané, sans frais)
  async internalTransfer(
    ccy: string,
    amt: string,
    from: string, // '6': funding, '18': trading
    to: string,
    toSubAcct?: string
  ): Promise<any> {
    try {
      const requestPath = '/api/v5/asset/transfer'
      const body = JSON.stringify({
        ccy,
        amt,
        from,
        to,
        ...(toSubAcct && { toSubAcct })
      })
      
      const response = await axios.post(
        `${this.baseUrl}${requestPath}`,
        JSON.parse(body),
        { headers: getOKXHeaders('POST', requestPath, body) }
      )
      
      return response.data.data?.[0] || {}
    } catch (error) {
      console.error('Erreur lors du transfert interne OKX:', error)
      throw error
    }
  }
}

// Export singleton
export const okxApi = new OKXApiService(false) // Production
export const okxSandboxApi = new OKXApiService(true) // Sandbox

export default OKXApiService
