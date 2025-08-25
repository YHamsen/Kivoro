import axios from 'axios'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const FALLBACK_BTC_PRICE = 38000 // Prix de secours en cas d'échec API

interface CachedPrice {
  price: number
  timestamp: number
}

class CryptoExchangeService {
  private cache: Map<string, CachedPrice> = new Map()

  /**
   * Récupère le prix du Bitcoin en USD depuis CoinGecko
   */
  async getBtcPriceInUsd(): Promise<number> {
    try {
      // Vérifier le cache
      const cached = this.cache.get('btc-usd')
      const now = Date.now()
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        return cached.price
      }

      // Appel API avec timeout
      const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd'
        },
        timeout: 10000 // 10 secondes
      })

      if (response.data?.bitcoin?.usd) {
        const price = response.data.bitcoin.usd
        
        // Mettre en cache
        this.cache.set('btc-usd', {
          price,
          timestamp: now
        })
        
        console.log(`✅ Prix BTC mis à jour: $${price}`)
        return price
      }
      
      throw new Error('Prix BTC non trouvé dans la réponse API')
    } catch (error) {
      console.warn('⚠️ Impossible de récupérer le prix BTC en temps réel:', error)
      
      // Retourner le prix de secours
      const fallbackPrice = this.getFallbackPrice()
      console.log(`🔄 Utilisation du prix de secours: $${fallbackPrice}`)
      return fallbackPrice
    }
  }

  /**
   * Récupère les prix de plusieurs cryptomonnaies
   */
  async getMultipleCryptoPrices(cryptoIds: string[] = ['bitcoin', 'ethereum']): Promise<Record<string, number>> {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids: cryptoIds.join(','),
          vs_currencies: 'usd'
        },
        timeout: 10000
      })

      const prices: Record<string, number> = {}
      
      for (const id of cryptoIds) {
        if (response.data[id]?.usd) {
          prices[id] = response.data[id].usd
        }
      }
      
      return prices
    } catch (error) {
      console.warn('⚠️ Impossible de récupérer les prix crypto:', error)
      return {
        bitcoin: FALLBACK_BTC_PRICE,
        ethereum: 2500 // Prix de secours pour ETH
      }
    }
  }

  /**
   * Convertit un montant USD en Bitcoin
   */
  async convertUsdToBtc(usdAmount: number): Promise<number> {
    const btcPrice = await this.getBtcPriceInUsd()
    return usdAmount / btcPrice
  }

  /**
   * Convertit un montant USD en Ethereum
   */
  async convertUsdToEth(usdAmount: number): Promise<number> {
    const prices = await this.getMultipleCryptoPrices(['ethereum'])
    const ethPrice = prices.ethereum || 2500
    return usdAmount / ethPrice
  }

  /**
   * Formate le prix en crypto avec les unités appropriées
   */
  formatCryptoPrice(btcAmount: number, crypto: 'bitcoin' | 'ethereum' = 'bitcoin'): string {
    if (crypto === 'ethereum') {
      if (btcAmount >= 1) {
        return `${btcAmount.toFixed(4)} ETH`
      } else if (btcAmount >= 0.001) {
        return `${(btcAmount * 1000).toFixed(2)} mETH`
      } else {
        return `${(btcAmount * 1000000).toFixed(0)} μETH`
      }
    }
    
    // Bitcoin par défaut
    if (btcAmount >= 0.01) {
      return `${btcAmount.toFixed(4)} BTC`
    } else if (btcAmount >= 0.00001) {
      return `${(btcAmount * 1000).toFixed(2)} mBTC`
    } else {
      return `${(btcAmount * 100000000).toFixed(0)} sats`
    }
  }

  /**
   * Prix de secours en cas d'échec
   */
  private getFallbackPrice(): number {
    // Utilise le cache si disponible, sinon le prix de secours
    const cached = this.cache.get('btc-usd')
    if (cached) {
      return cached.price
    }
    return FALLBACK_BTC_PRICE
  }

  /**
   * Vérifie la santé de l'API CoinGecko
   */
  async checkApiHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}/ping`, {
        timeout: 5000
      })
      return response.status === 200
    } catch {
      return false
    }
  }

  /**
   * Vide le cache (utile pour les tests)
   */
  clearCache(): void {
    this.cache.clear()
    console.log('🧹 Cache crypto vidé')
  }
}

// Instance singleton
export const cryptoExchangeService = new CryptoExchangeService()
export default cryptoExchangeService
