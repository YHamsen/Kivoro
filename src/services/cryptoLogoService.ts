/**
 * Service de gestion des logos cryptomonnaies
 * Gère automatiquement les logos avec système de fallback robuste
 */

export interface LogoSource {
  url: string
  priority: number
  type: 'coingecko' | 'coinmarketcap' | 'cryptologos' | 'local' | 'github' | 'generated'
  verified: boolean
}

export interface CryptoLogo {
  symbol: string
  name: string
  primaryUrl: string
  fallbackUrls: string[]
  localPath?: string
  color: string
  isAvailable: boolean
  lastVerified?: number
}

class CryptoLogoService {
  private logoCache = new Map<string, CryptoLogo>()
  private verificationCache = new Map<string, boolean>()
  private readonly VERIFICATION_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 heures
  
  // Configuration des sources de logos par priorité
  private readonly logoSources = {
    // Sources prioritaires (fiables)
    priority: [
      {
        name: 'local',
        template: '/images/crypto-icons/{symbol}-icon.{ext}',
        extensions: ['png', 'jpg', 'svg', 'webp'],
        priority: 1
      },
      {
        name: 'coingecko',
        template: 'https://coin-images.coingecko.com/coins/images/{id}/large/{name}.png',
        priority: 2
      },
      {
        name: 'github-crypto-icons',
        template: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/{symbol}.png',
        priority: 3
      }
    ],
    // Sources de fallback
    fallback: [
      {
        name: 'cryptologos',
        template: 'https://cryptologos.cc/logos/{symbol}-{name}-logo.png',
        priority: 4
      },
      {
        name: 'coinmarketcap',
        template: 'https://s2.coinmarketcap.com/static/img/coins/64x64/{id}.png',
        priority: 5
      },
      {
        name: 'alternative-github',
        template: 'https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/{symbol}.png',
        priority: 6
      }
    ]
  }

  // Mapping des IDs CoinGecko pour les principales cryptomonnaies
  private readonly coingeckoIds: { [symbol: string]: string } = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum', 
    'USDT': 'tether',
    'USDC': 'usd-coin',
    'BNB': 'binancecoin',
    'SOL': 'solana',
    'ADA': 'cardano',
    'XRP': 'ripple',
    'DOT': 'polkadot',
    'DOGE': 'dogecoin',
    'AVAX': 'avalanche-2',
    'MATIC': 'polygon',
    'SHIB': 'shiba-inu',
    'UNI': 'uniswap',
    'LINK': 'chainlink',
    'ATOM': 'cosmos',
    'LTC': 'litecoin',
    'BCH': 'bitcoin-cash',
    'NEAR': 'near',
    'FTM': 'fantom',
    'ALGO': 'algorand',
    'VET': 'vechain',
    'ICP': 'internet-computer',
    'FIL': 'filecoin',
    'TRX': 'tron',
    'ETC': 'ethereum-classic',
    'XLM': 'stellar',
    'HBAR': 'hedera-hashgraph',
    'APE': 'apecoin',
    'SAND': 'the-sandbox',
    'MANA': 'decentraland',
    'CRO': 'crypto-com-chain',
    'APT': 'aptos',
    'ARB': 'arbitrum',
    'OP': 'optimism',
    'SUI': 'sui',
    'SEI': 'sei-network',
    'INJ': 'injective-protocol',
    'TIA': 'celestia',
    'PYTH': 'pyth-network'
  }

  // Mapping des IDs CoinMarketCap
  private readonly coinMarketCapIds: { [symbol: string]: string } = {
    'BTC': '1',
    'ETH': '1027',
    'USDT': '825',
    'BNB': '1839',
    'SOL': '5426',
    'USDC': '3408',
    'XRP': '52',
    'DOGE': '74',
    'ADA': '2010',
    'TRX': '1958',
    'AVAX': '5805',
    'DOT': '6636',
    'MATIC': '3890',
    'SHIB': '5994',
    'LTC': '2',
    'UNI': '7083',
    'LINK': '1975',
    'ATOM': '3794',
    'BCH': '1831',
    'NEAR': '6535'
  }

  // Couleurs officielles des cryptomonnaies
  private readonly cryptoColors: { [symbol: string]: string } = {
    'BTC': '#F7931A',
    'ETH': '#627EEA',
    'USDT': '#26A17B',
    'USDC': '#2775CA',
    'BNB': '#F3BA2F',
    'SOL': '#9945FF',
    'ADA': '#0033AD',
    'XRP': '#23292F',
    'DOT': '#E6007A',
    'DOGE': '#C2A633',
    'AVAX': '#E84142',
    'MATIC': '#8247E5',
    'SHIB': '#FFA409',
    'UNI': '#FF007A',
    'LINK': '#375BD2',
    'ATOM': '#2E3148',
    'LTC': '#BFBBBB',
    'BCH': '#8DC351',
    'NEAR': '#00C08B',
    'FTM': '#13B5EC'
  }

  /**
   * Récupère le logo d'une cryptomonnaie avec système de fallback
   */
  async getCryptoLogo(symbol: string, name?: string): Promise<CryptoLogo> {
    const upperSymbol = symbol.toUpperCase()
    
    // Vérifier le cache d'abord
    if (this.logoCache.has(upperSymbol)) {
      const cached = this.logoCache.get(upperSymbol)!
      
      // Vérifier si le cache n'est pas expiré
      if (cached.lastVerified && Date.now() - cached.lastVerified < this.VERIFICATION_CACHE_TTL) {
        return cached
      }
    }

    // Construire les URLs de logos
    const logoUrls = await this.buildLogoUrls(upperSymbol, name)
    
    // Tester la disponibilité des URLs
    const primaryUrl = await this.findWorkingUrl(logoUrls)
    
    // Créer l'objet logo
    const logo: CryptoLogo = {
      symbol: upperSymbol,
      name: name || this.getCryptoName(upperSymbol),
      primaryUrl,
      fallbackUrls: logoUrls.filter(url => url !== primaryUrl),
      color: this.cryptoColors[upperSymbol] || this.generateColorFromSymbol(upperSymbol),
      isAvailable: primaryUrl !== this.generateFallbackSvg(upperSymbol),
      lastVerified: Date.now()
    }

    // Mettre en cache
    this.logoCache.set(upperSymbol, logo)
    
    return logo
  }

  /**
   * Construit la liste des URLs possibles pour un logo
   */
  private async buildLogoUrls(symbol: string, name?: string): Promise<string[]> {
    const urls: string[] = []
    const lowerSymbol = symbol.toLowerCase()
    const cryptoName = (name || this.getCryptoName(symbol)).toLowerCase().replace(/\s+/g, '-')
    
    // 1. Sources locales (priorité maximale)
    this.logoSources.priority[0].extensions?.forEach(ext => {
      urls.push(`/images/crypto-icons/${lowerSymbol}-icon.${ext}`)
    })

    // 2. CoinGecko (si ID disponible)
    const coingeckoId = this.coingeckoIds[symbol]
    if (coingeckoId) {
      urls.push(`https://coin-images.coingecko.com/coins/images/${this.getCoinGeckoImageId(symbol)}/large/${coingeckoId}.png`)
    }

    // 3. GitHub cryptocurrency-icons (très fiable)
    urls.push(`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${lowerSymbol}.png`)
    urls.push(`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/${lowerSymbol}.png`)

    // 4. Cryptologos
    urls.push(`https://cryptologos.cc/logos/${lowerSymbol}-${cryptoName}-logo.png`)
    urls.push(`https://cryptologos.cc/logos/${lowerSymbol}-logo.png`)

    // 5. CoinMarketCap (si ID disponible)
    const cmcId = this.coinMarketCapIds[symbol]
    if (cmcId) {
      urls.push(`https://s2.coinmarketcap.com/static/img/coins/64x64/${cmcId}.png`)
    }

    // 6. Sources alternatives
    urls.push(`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/${lowerSymbol}.png`)
    urls.push(`https://raw.githubusercontent.com/coinwink/cryptocurrency-icons/master/128/${lowerSymbol}.png`)

    return urls
  }

  /**
   * Trouve la première URL qui fonctionne
   */
  private async findWorkingUrl(urls: string[]): Promise<string> {
    for (const url of urls) {
      try {
        const isWorking = await this.verifyImageUrl(url)
        if (isWorking) {
          return url
        }
      } catch {
        // Continue avec l'URL suivante
      }
    }
    
    // Si aucune URL ne fonctionne, retourner un SVG généré
    return this.generateFallbackSvg(urls[0]?.includes('/') ? 
      urls[0].split('/').pop()?.split('-')[0]?.toUpperCase() || 'CRYPTO' : 'CRYPTO')
  }

  /**
   * Vérifie si une URL d'image est accessible
   */
  private async verifyImageUrl(url: string): Promise<boolean> {
    // Vérifier le cache de vérification
    if (this.verificationCache.has(url)) {
      return this.verificationCache.get(url)!
    }

    try {
      // Pour les images locales, vérifier différemment
      if (url.startsWith('/')) {
        return this.verifyLocalImage(url)
      }

      // Pour les URLs externes, utiliser fetch avec HEAD
      const response = await fetch(url, { 
        method: 'HEAD', 
        mode: 'no-cors',
        signal: AbortSignal.timeout(5000)
      })
      
      const isValid = response.ok || response.status === 0 // no-cors renvoie status 0
      this.verificationCache.set(url, isValid)
      
      return isValid
    } catch {
      this.verificationCache.set(url, false)
      return false
    }
  }

  /**
   * Vérifie l'existence d'une image locale
   */
  private async verifyLocalImage(path: string): Promise<boolean> {
    try {
      const response = await fetch(path, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * Génère un SVG de fallback avec les initiales
   */
  private generateFallbackSvg(symbol: string): string {
    const color = this.cryptoColors[symbol.toUpperCase()] || this.generateColorFromSymbol(symbol)
    const initials = symbol.substring(0, 2).toUpperCase()
    
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="${color}"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
          ${initials}
        </text>
      </svg>
    `.trim()
    
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  /**
   * Génère une couleur cohérente basée sur le symbole
   */
  private generateColorFromSymbol(symbol: string): string {
    const colors = [
      '#F7931A', '#627EEA', '#26A17B', '#2775CA', '#F3BA2F', '#9945FF',
      '#0033AD', '#23292F', '#E6007A', '#C2A633', '#E84142', '#8247E5',
      '#FFA409', '#FF007A', '#375BD2', '#2E3148', '#BFBBBB', '#8DC351',
      '#00C08B', '#13B5EC', '#000000', '#15BDFF', '#F15A24', '#0090FF'
    ]
    
    let hash = 0
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  /**
   * Récupère le nom complet d'une crypto par son symbole
   */
  private getCryptoName(symbol: string): string {
    const names: { [key: string]: string } = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'USDT': 'Tether',
      'USDC': 'USD Coin',
      'BNB': 'Binance Coin',
      'SOL': 'Solana',
      'ADA': 'Cardano',
      'XRP': 'XRP',
      'DOT': 'Polkadot',
      'DOGE': 'Dogecoin',
      'AVAX': 'Avalanche',
      'MATIC': 'Polygon',
      'SHIB': 'Shiba Inu',
      'UNI': 'Uniswap',
      'LINK': 'Chainlink',
      'ATOM': 'Cosmos',
      'LTC': 'Litecoin',
      'BCH': 'Bitcoin Cash',
      'NEAR': 'NEAR Protocol',
      'FTM': 'Fantom'
    }
    
    return names[symbol.toUpperCase()] || symbol.toUpperCase()
  }

  /**
   * Récupère l'ID d'image CoinGecko (approximatif)
   */
  private getCoinGeckoImageId(symbol: string): string {
    const ids: { [key: string]: string } = {
      'BTC': '1',
      'ETH': '279', 
      'USDT': '325',
      'BNB': '825',
      'SOL': '4128',
      'USDC': '6319',
      'XRP': '44',
      'DOGE': '5',
      'ADA': '975',
      'DOT': '12171'
    }
    
    return ids[symbol] || '1'
  }

  /**
   * Pré-charge les logos des cryptomonnaies principales
   */
  async preloadMainCryptos(): Promise<void> {
    const mainCryptos = [
      'BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'ADA', 'XRP', 'DOT', 'DOGE',
      'AVAX', 'MATIC', 'SHIB', 'UNI', 'LINK', 'ATOM', 'LTC', 'BCH', 'NEAR', 'FTM'
    ]

    console.log('🔄 Pré-chargement des logos crypto principales...')
    
    const promises = mainCryptos.map(symbol => this.getCryptoLogo(symbol))
    await Promise.all(promises)
    
    console.log(`✅ ${mainCryptos.length} logos crypto pré-chargés`)
  }

  /**
   * Nettoie le cache de vérification
   */
  clearVerificationCache(): void {
    this.verificationCache.clear()
  }

  /**
   * Obtient les statistiques du cache
   */
  getCacheStats(): {
    logosCached: number
    verificationsChached: number
    hitRate: number
  } {
    return {
      logosCached: this.logoCache.size,
      verificationsChached: this.verificationCache.size,
      hitRate: this.logoCache.size > 0 ? 
        Array.from(this.logoCache.values()).filter(l => l.isAvailable).length / this.logoCache.size : 0
    }
  }

  /**
   * Force la mise à jour d'un logo
   */
  async refreshLogo(symbol: string): Promise<CryptoLogo> {
    const upperSymbol = symbol.toUpperCase()
    this.logoCache.delete(upperSymbol)
    
    // Nettoyer le cache de vérification pour ce symbole
    Array.from(this.verificationCache.keys())
      .filter(url => url.includes(symbol.toLowerCase()))
      .forEach(url => this.verificationCache.delete(url))
    
    return this.getCryptoLogo(upperSymbol)
  }
}

// Instance singleton
export const cryptoLogoService = new CryptoLogoService()

// Pré-charger les logos principaux
cryptoLogoService.preloadMainCryptos().catch(console.error)

export default cryptoLogoService
