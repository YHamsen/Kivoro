/**
 * Service de données crypto étendu pour Bybit Spot
 * Gère la liste complète des cryptomonnaies avec logos automatiques
 */

export interface CryptoMetadata {
  symbol: string
  name: string
  logo_url: string | null
  category: 'bitcoin' | 'ethereum' | 'stablecoin' | 'exchange' | 'defi' | 'layer1' | 'meme' | 'gaming' | 'privacy' | 'other'
  bybit_supported: boolean
  okx_supported: boolean
  binance_supported: boolean
  color?: string
}

export interface ExtendedCryptoAsset extends CryptoMetadata {
  balance?: string
  eurValue?: string
  usdValue?: string
  price?: string
  change24h?: string
  marketCap?: string
  volume24h?: string
}

class CryptoDataService {
  private cryptoDatabase: Map<string, CryptoMetadata> = new Map()
  private initialized: boolean = false

  // Base de données des couleurs officielles des cryptomonnaies
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
    'FTM': '#13B5EC',
    'ALGO': '#000000',
    'VET': '#15BDFF',
    'ICP': '#F15A24',
    'FIL': '#0090FF',
    'TRX': '#FF060A',
    'ETC': '#328332',
    'XLM': '#000000',
    'HBAR': '#000000',
    'APE': '#0052FF',
    'SAND': '#00D4FF',
    'MANA': '#FF2D55',
    'CRO': '#002D74'
  }

  /**
   * Initialise le service avec la base de données complète
   */
  async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      // Charger la base de données simplifiée depuis le fichier généré
      const cryptoData = await this.loadCryptoDatabase()
      
      if (cryptoData && cryptoData.cryptos) {
        // Populer la Map avec les données
        Object.entries(cryptoData.cryptos).forEach(([symbol, data]: [string, any]) => {
          this.cryptoDatabase.set(symbol, {
            ...data,
            color: this.cryptoColors[symbol] || this.generateColorFromSymbol(symbol)
          })
        })
        
        console.log(`✅ CryptoDataService initialisé avec ${this.cryptoDatabase.size} cryptomonnaies`)
        this.initialized = true
      } else {
        throw new Error('Format de données invalide')
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation du CryptoDataService:', error)
      // Fallback vers les données par défaut
      this.initializeWithFallbackData()
    }
  }

  /**
   * Charge la base de données crypto depuis le fichier JSON
   */
  private async loadCryptoDatabase(): Promise<any> {
    try {
      // En production, ces données seraient récupérées depuis un API ou fichier statique
      const response = await fetch('/data/crypto_database_simple.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.warn('Impossible de charger la base de données crypto, utilisation des données par défaut')
      return null
    }
  }

  /**
   * Initialise avec les données de base en cas d'échec
   */
  private initializeWithFallbackData(): void {
    const fallbackCryptos = [
      { symbol: 'BTC', name: 'Bitcoin', category: 'bitcoin' as const },
      { symbol: 'ETH', name: 'Ethereum', category: 'ethereum' as const },
      { symbol: 'USDT', name: 'Tether USDT', category: 'stablecoin' as const },
      { symbol: 'USDC', name: 'USD Coin', category: 'stablecoin' as const },
      { symbol: 'BNB', name: 'Binance Coin', category: 'exchange' as const },
      { symbol: 'SOL', name: 'Solana', category: 'layer1' as const },
      { symbol: 'ADA', name: 'Cardano', category: 'layer1' as const },
      { symbol: 'XRP', name: 'XRP', category: 'other' as const },
      { symbol: 'DOT', name: 'Polkadot', category: 'layer1' as const },
      { symbol: 'DOGE', name: 'Dogecoin', category: 'meme' as const }
    ]

    fallbackCryptos.forEach(crypto => {
      this.cryptoDatabase.set(crypto.symbol, {
        ...crypto,
        logo_url: `/images/crypto-icons/${crypto.symbol.toLowerCase()}-icon.jpg`,
        bybit_supported: true,
        okx_supported: true, // OKX supporte généralement les mêmes cryptos populaires
        binance_supported: true,
        color: this.cryptoColors[crypto.symbol] || this.generateColorFromSymbol(crypto.symbol)
      })
    })

    this.initialized = true
    console.log('✅ CryptoDataService initialisé avec les données de fallback')
  }

  /**
   * Génère une couleur cohérente basée sur le symbole
   */
  private generateColorFromSymbol(symbol: string): string {
    const colors = [
      '#F7931A', '#627EEA', '#26A17B', '#2775CA', '#F3BA2F', '#9945FF',
      '#0033AD', '#23292F', '#E6007A', '#C2A633', '#E84142', '#8247E5',
      '#FFA409', '#FF007A', '#375BD2', '#2E3148', '#BFBBBB', '#8DC351'
    ]
    
    let hash = 0
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  /**
   * Récupère les métadonnées d'une cryptomonnaie
   */
  getCryptoMetadata(symbol: string): CryptoMetadata | null {
    if (!this.initialized) {
      console.warn('CryptoDataService non initialisé')
      return null
    }
    
    return this.cryptoDatabase.get(symbol.toUpperCase()) || null
  }

  /**
   * Récupère toutes les cryptomonnaies supportées par Bybit
   */
  getAllBybitSupportedCryptos(): CryptoMetadata[] {
    if (!this.initialized) return []
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => crypto.bybit_supported)
      .sort((a, b) => {
        // Priorité: Bitcoin, Ethereum, puis stablecoins, puis par nom
        const priority = { 'bitcoin': 0, 'ethereum': 1, 'stablecoin': 2 }
        const aPriority = priority[a.category] ?? 10
        const bPriority = priority[b.category] ?? 10
        
        if (aPriority !== bPriority) return aPriority - bPriority
        return a.name.localeCompare(b.name)
      })
  }

  /**
   * Récupère toutes les cryptomonnaies supportées par OKX
   */
  getAllOKXSupportedCryptos(): CryptoMetadata[] {
    if (!this.initialized) return []
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => crypto.okx_supported)
      .sort((a, b) => {
        // Priorité: Bitcoin, Ethereum, puis stablecoins, puis par nom
        const priority = { 'bitcoin': 0, 'ethereum': 1, 'stablecoin': 2 }
        const aPriority = priority[a.category] ?? 10
        const bPriority = priority[b.category] ?? 10
        
        if (aPriority !== bPriority) return aPriority - bPriority
        return a.name.localeCompare(b.name)
      })
  }

  /**
   * Récupère toutes les cryptomonnaies supportées par Binance
   */
  getAllBinanceSupportedCryptos(): CryptoMetadata[] {
    if (!this.initialized) return []
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => crypto.binance_supported)
      .sort((a, b) => {
        // Priorité: Bitcoin, Ethereum, puis stablecoins, puis par nom
        const priority = { 'bitcoin': 0, 'ethereum': 1, 'stablecoin': 2 }
        const aPriority = priority[a.category] ?? 10
        const bPriority = priority[b.category] ?? 10
        
        if (aPriority !== bPriority) return aPriority - bPriority
        return a.name.localeCompare(b.name)
      })
  }

  /**
   * Recherche des cryptomonnaies par nom ou symbole
   */
  searchCryptos(query: string, bybitOnly: boolean = true): CryptoMetadata[] {
    if (!this.initialized || !query.trim()) return []
    
    const searchTerm = query.toLowerCase().trim()
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => {
        const matchesSearch = crypto.symbol.toLowerCase().includes(searchTerm) ||
                            crypto.name.toLowerCase().includes(searchTerm)
        const supportedFilter = bybitOnly ? crypto.bybit_supported : true
        return matchesSearch && supportedFilter
      })
      .sort((a, b) => {
        // Priorité aux correspondances exactes de symbole
        const aExactSymbol = a.symbol.toLowerCase() === searchTerm
        const bExactSymbol = b.symbol.toLowerCase() === searchTerm
        if (aExactSymbol && !bExactSymbol) return -1
        if (!aExactSymbol && bExactSymbol) return 1
        
        // Puis par nom
        return a.name.localeCompare(b.name)
      })
      .slice(0, 50) // Limiter les résultats
  }

  /**
   * Recherche des cryptomonnaies OKX par nom ou symbole
   */
  searchOKXCryptos(query: string, okxOnly: boolean = true): CryptoMetadata[] {
    if (!this.initialized || !query.trim()) return []
    
    const searchTerm = query.toLowerCase().trim()
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => {
        const matchesSearch = crypto.symbol.toLowerCase().includes(searchTerm) ||
                            crypto.name.toLowerCase().includes(searchTerm)
        const supportedFilter = okxOnly ? crypto.okx_supported : true
        return matchesSearch && supportedFilter
      })
      .sort((a, b) => {
        // Priorité aux correspondances exactes de symbole
        const aExactSymbol = a.symbol.toLowerCase() === searchTerm
        const bExactSymbol = b.symbol.toLowerCase() === searchTerm
        if (aExactSymbol && !bExactSymbol) return -1
        if (!aExactSymbol && bExactSymbol) return 1
        
        // Puis par nom
        return a.name.localeCompare(b.name)
      })
      .slice(0, 50) // Limiter les résultats
  }

  /**
   * Filtre les cryptomonnaies par catégorie
   */
  getCryptosByCategory(category: CryptoMetadata['category'], bybitOnly: boolean = true): CryptoMetadata[] {
    if (!this.initialized) return []
    
    return Array.from(this.cryptoDatabase.values())
      .filter(crypto => {
        const matchesCategory = crypto.category === category
        const supportedFilter = bybitOnly ? crypto.bybit_supported : true
        return matchesCategory && supportedFilter
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Récupère les statistiques de la base de données
   */
  getStatistics(): {
    total: number
    bybitSupported: number
    categories: { [key: string]: number }
  } {
    if (!this.initialized) return { total: 0, bybitSupported: 0, categories: {} }
    
    const all = Array.from(this.cryptoDatabase.values())
    const bybitSupported = all.filter(c => c.bybit_supported).length
    
    const categories: { [key: string]: number } = {}
    all.forEach(crypto => {
      categories[crypto.category] = (categories[crypto.category] || 0) + 1
    })
    
    return {
      total: all.length,
      bybitSupported,
      categories
    }
  }

  /**
   * Génère l'URL du logo avec fallback
   */
  getLogoUrl(symbol: string, fallbackColor?: string): string {
    const crypto = this.getCryptoMetadata(symbol)
    
    if (crypto?.logo_url) {
      return crypto.logo_url
    }
    
    // URLs de fallback par ordre de priorité
    const fallbackUrls = [
      `/images/crypto-icons/${symbol.toLowerCase()}-icon.jpg`,
      `/images/crypto-icons/${symbol.toLowerCase()}-icon.png`,
      `https://cryptologos.cc/logos/${symbol.toLowerCase()}-${symbol.toLowerCase()}-logo.png`,
      `https://assets.coingecko.com/coins/images/1/large/${symbol.toLowerCase()}.png`
    ]
    
    return fallbackUrls[0]
  }

  /**
   * Crée un asset crypto étendu avec les données de marché
   */
  createExtendedAsset(
    symbol: string, 
    balance: string = '0', 
    marketData?: {
      price?: string
      change24h?: string
      volume24h?: string
      marketCap?: string
    }
  ): ExtendedCryptoAsset | null {
    const metadata = this.getCryptoMetadata(symbol)
    if (!metadata) return null
    
    return {
      ...metadata,
      balance,
      eurValue: '0.00', // À calculer avec les taux de change
      usdValue: '0.00', // À calculer avec les taux de change
      price: marketData?.price || '0',
      change24h: marketData?.change24h || '0',
      marketCap: marketData?.marketCap || '0',
      volume24h: marketData?.volume24h || '0'
    }
  }

  /**
   * Vérifie si le service est initialisé
   */
  isInitialized(): boolean {
    return this.initialized
  }

  /**
   * Force la réinitialisation du service
   */
  async reinitialize(): Promise<void> {
    this.initialized = false
    this.cryptoDatabase.clear()
    await this.initialize()
  }
}

// Instance singleton
export const cryptoDataService = new CryptoDataService()

// Initialisation automatique
cryptoDataService.initialize().catch(console.error)

export default cryptoDataService
