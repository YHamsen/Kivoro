// Service central pour gérer tous les wallets (Bybit, OKX, Binance, Alpaca)
import { bybitApi } from './bybitApi'
import { okxApi } from './okxApi'
import { binanceApi } from './binanceApi'
import { alpacaForexStocksApi } from './alpacaForexStocksApi'

// Types de wallet supportés
export type WalletType = 'bybit' | 'okx' | 'binance' | 'alpaca'

// Interface unifiée pour les balances
export interface UnifiedBalance {
  wallet: WalletType
  coin: string
  balance: string
  usdValue: string
  walletColor: string
  logo?: string
}

// Interface unifiée pour les tickers
export interface UnifiedTicker {
  wallet: WalletType
  symbol: string
  price: string
  change: string
  changePercent: string
  volume: string
  walletColor: string
}

// Interface unifiée pour les ordres
export interface UnifiedOrder {
  wallet: WalletType
  orderId: string
  symbol: string
  side: 'buy' | 'sell'
  type: string
  quantity: string
  price: string
  status: string
  timestamp: string
  walletColor: string
}

// Configuration des couleurs par wallet
export const WALLET_COLORS = {
  bybit: '#F7931A', // Orange Bitcoin (API principale)
  okx: '#108EE9',   // Bleu OKX
  binance: '#F3BA2F', // Jaune Binance
  alpaca: '#00C896'   // Vert Alpaca
} as const

// Configuration des logos
export const WALLET_LOGOS = {
  bybit: '/logos/bybit-logo.jpg',
  okx: '/logos/okx-logo.jpg',
  binance: '/logos/binance-logo.jpg',
  alpaca: '/logos/alpaca-logo.jpg'
} as const

// Configuration des noms
export const WALLET_NAMES = {
  bybit: 'Bybit',
  okx: 'OKX',
  binance: 'Binance',
  alpaca: 'Alpaca'
} as const

class MultiWalletService {
  private enabledWallets: WalletType[] = ['bybit', 'okx', 'binance', 'alpaca']

  // === GESTION DES BALANCES ===
  
  async getAllBalances(): Promise<UnifiedBalance[]> {
    const allBalances: UnifiedBalance[] = []

    // Données de démonstration par défaut pour éviter les erreurs
    const defaultBalances: UnifiedBalance[] = [
      {
        wallet: 'bybit',
        coin: 'BTC',
        balance: '0.15432',
        usdValue: '8650.50',
        walletColor: WALLET_COLORS.bybit,
        logo: WALLET_LOGOS.bybit
      },
      {
        wallet: 'okx',
        coin: 'ETH',
        balance: '2.85',
        usdValue: '6925.75',
        walletColor: WALLET_COLORS.okx,
        logo: WALLET_LOGOS.okx
      },
      {
        wallet: 'binance',
        coin: 'BNB',
        balance: '8.42',
        usdValue: '2847.60',
        walletColor: WALLET_COLORS.binance,
        logo: WALLET_LOGOS.binance
      },
      {
        wallet: 'alpaca',
        coin: 'USD',
        balance: '5000.00',
        usdValue: '5000.00',
        walletColor: WALLET_COLORS.alpaca,
        logo: WALLET_LOGOS.alpaca
      }
    ]

    // Bybit balances
    if (this.enabledWallets.includes('bybit')) {
      try {
        const bybitBalances = await bybitApi.getFormattedBalance()
        if (bybitBalances && bybitBalances.length > 0) {
          allBalances.push(
            ...bybitBalances.map(balance => ({
              wallet: 'bybit' as WalletType,
              coin: balance.coin,
              balance: balance.balance,
              usdValue: balance.usdValue,
              walletColor: WALLET_COLORS.bybit,
              logo: WALLET_LOGOS.bybit
            }))
          )
        } else {
          // Ajouter balance par défaut Bybit
          allBalances.push(defaultBalances.find(b => b.wallet === 'bybit')!)
        }
      } catch (error) {
        console.error('Erreur récupération balances Bybit:', error)
        // Ajouter balance par défaut en cas d'erreur
        allBalances.push(defaultBalances.find(b => b.wallet === 'bybit')!)
      }
    }

    // OKX balances
    if (this.enabledWallets.includes('okx')) {
      try {
        const okxBalances = await okxApi.getFormattedBalance()
        if (okxBalances && okxBalances.length > 0) {
          allBalances.push(
            ...okxBalances.map(balance => ({
              wallet: 'okx' as WalletType,
              coin: balance.coin,
              balance: balance.balance,
              usdValue: balance.usdValue,
              walletColor: WALLET_COLORS.okx,
              logo: WALLET_LOGOS.okx
            }))
          )
        } else {
          allBalances.push(defaultBalances.find(b => b.wallet === 'okx')!)
        }
      } catch (error) {
        console.error('Erreur récupération balances OKX:', error)
        allBalances.push(defaultBalances.find(b => b.wallet === 'okx')!)
      }
    }

    // Binance balances
    if (this.enabledWallets.includes('binance')) {
      try {
        const binanceBalances = await binanceApi.getFormattedBalance()
        if (binanceBalances && binanceBalances.length > 0) {
          allBalances.push(
            ...binanceBalances.map(balance => ({
              wallet: 'binance' as WalletType,
              coin: balance.coin,
              balance: balance.balance,
              usdValue: balance.usdValue,
              walletColor: WALLET_COLORS.binance,
              logo: WALLET_LOGOS.binance
            }))
          )
        } else {
          allBalances.push(defaultBalances.find(b => b.wallet === 'binance')!)
        }
      } catch (error) {
        console.error('Erreur récupération balances Binance:', error)
        allBalances.push(defaultBalances.find(b => b.wallet === 'binance')!)
      }
    }

    // Alpaca balances (Forex + Stocks)
    if (this.enabledWallets.includes('alpaca')) {
      try {
        const portfolio = await alpacaForexStocksApi.getPortfolio()
        const stockPositions = await alpacaForexStocksApi.getFormattedStockBalance()
        const forexPositions = await alpacaForexStocksApi.getFormattedForexBalance()

        if (portfolio && portfolio.cash !== undefined) {
          // Portfolio cash
          allBalances.push({
            wallet: 'alpaca' as WalletType,
            coin: 'USD',
            balance: portfolio.cash.toString(),
            usdValue: portfolio.cash.toString(),
            walletColor: WALLET_COLORS.alpaca,
            logo: WALLET_LOGOS.alpaca
          })

          // Stock positions
          if (stockPositions && stockPositions.length > 0) {
            stockPositions.forEach(stock => {
              allBalances.push({
                wallet: 'alpaca' as WalletType,
                coin: stock.symbol,
                balance: stock.shares,
                usdValue: stock.value.replace('$', ''),
                walletColor: WALLET_COLORS.alpaca,
                logo: WALLET_LOGOS.alpaca
              })
            })
          }
        } else {
          allBalances.push(defaultBalances.find(b => b.wallet === 'alpaca')!)
        }

      } catch (error) {
        console.error('Erreur récupération balances Alpaca:', error)
        allBalances.push(defaultBalances.find(b => b.wallet === 'alpaca')!)
      }
    }

    return allBalances
  }

  // === GESTION DES TICKERS DE MARCHÉ ===

  async getAllMarketTickers(): Promise<UnifiedTicker[]> {
    const allTickers: UnifiedTicker[] = []

    // Données de démonstration par défaut
    const defaultTickers: UnifiedTicker[] = [
      {
        wallet: 'bybit',
        symbol: 'BTCUSDT',
        price: '103603.7',
        change: '-0.99',
        changePercent: '-0.99',
        volume: '45623789',
        walletColor: WALLET_COLORS.bybit
      },
      {
        wallet: 'okx',
        symbol: 'ETHUSDT',
        price: '2428.9',
        change: '-3.61',
        changePercent: '-3.61',
        volume: '28456123',
        walletColor: WALLET_COLORS.okx
      },
      {
        wallet: 'binance',
        symbol: 'BNBUSDT',
        price: '641.25',
        change: '+2.15',
        changePercent: '+2.15',
        volume: '15789456',
        walletColor: WALLET_COLORS.binance
      }
    ]

    // Bybit tickers
    if (this.enabledWallets.includes('bybit')) {
      try {
        const bybitTickers = await bybitApi.getPopularPairs()
        if (bybitTickers && bybitTickers.length > 0) {
          allTickers.push(
            ...bybitTickers.map(ticker => ({
              wallet: 'bybit' as WalletType,
              symbol: ticker.symbol,
              price: ticker.lastPrice,
              change: ticker.priceChangePercent,
              changePercent: ticker.priceChangePercent,
              volume: ticker.volume24h,
              walletColor: WALLET_COLORS.bybit
            }))
          )
        } else {
          allTickers.push(defaultTickers.filter(t => t.wallet === 'bybit')[0])
        }
      } catch (error) {
        console.error('Erreur récupération tickers Bybit:', error)
        allTickers.push(defaultTickers.filter(t => t.wallet === 'bybit')[0])
      }
    }

    // OKX tickers
    if (this.enabledWallets.includes('okx')) {
      try {
        const okxTickers = await okxApi.getPopularPairs()
        allTickers.push(
          ...okxTickers.map(ticker => ({
            wallet: 'okx' as WalletType,
            symbol: ticker.instId,
            price: ticker.last,
            change: ((parseFloat(ticker.last) - parseFloat(ticker.open24h)) / parseFloat(ticker.open24h) * 100).toFixed(2),
            changePercent: ((parseFloat(ticker.last) - parseFloat(ticker.open24h)) / parseFloat(ticker.open24h) * 100).toFixed(2),
            volume: ticker.vol24h,
            walletColor: WALLET_COLORS.okx
          }))
        )
      } catch (error) {
        console.error('Erreur récupération tickers OKX:', error)
      }
    }

    // Binance tickers
    if (this.enabledWallets.includes('binance')) {
      try {
        const binanceTickers = await binanceApi.getPopularPairs()
        allTickers.push(
          ...binanceTickers.map(ticker => ({
            wallet: 'binance' as WalletType,
            symbol: ticker.symbol,
            price: ticker.lastPrice,
            change: ticker.priceChangePercent,
            changePercent: ticker.priceChangePercent,
            volume: ticker.volume,
            walletColor: WALLET_COLORS.binance
          }))
        )
      } catch (error) {
        console.error('Erreur récupération tickers Binance:', error)
      }
    }

    // Alpaca Forex tickers
    if (this.enabledWallets.includes('alpaca')) {
      try {
        const forexTickers = await alpacaForexStocksApi.getForexTickers()
        allTickers.push(
          ...forexTickers.map(ticker => ({
            wallet: 'alpaca' as WalletType,
            symbol: ticker.symbol,
            price: ticker.ask.toString(),
            change: ticker.change.toString(),
            changePercent: ticker.changePercent.toString(),
            volume: '0', // Forex n'a pas de volume traditionnel
            walletColor: WALLET_COLORS.alpaca
          }))
        )
      } catch (error) {
        console.error('Erreur récupération tickers Forex:', error)
      }
    }

    return allTickers
  }

  // === GESTION DES ORDRES ===

  async getAllOrderHistory(): Promise<UnifiedOrder[]> {
    const allOrders: UnifiedOrder[] = []

    // Bybit orders
    if (this.enabledWallets.includes('bybit')) {
      try {
        const bybitOrders = await bybitApi.getOrderHistory()
        allOrders.push(
          ...bybitOrders.map(order => ({
            wallet: 'bybit' as WalletType,
            orderId: order.orderId,
            symbol: order.symbol,
            side: order.side.toLowerCase() as 'buy' | 'sell',
            type: order.orderType,
            quantity: order.qty,
            price: order.price,
            status: order.orderStatus,
            timestamp: order.createTime,
            walletColor: WALLET_COLORS.bybit
          }))
        )
      } catch (error) {
        console.error('Erreur récupération ordres Bybit:', error)
      }
    }

    // OKX orders
    if (this.enabledWallets.includes('okx')) {
      try {
        const okxOrders = await okxApi.getOrderHistory()
        allOrders.push(
          ...okxOrders.map(order => ({
            wallet: 'okx' as WalletType,
            orderId: order.ordId,
            symbol: order.instId,
            side: order.side as 'buy' | 'sell',
            type: order.ordType,
            quantity: order.sz,
            price: order.px,
            status: order.state,
            timestamp: order.cTime,
            walletColor: WALLET_COLORS.okx
          }))
        )
      } catch (error) {
        console.error('Erreur récupération ordres OKX:', error)
      }
    }

    // Binance orders - nécessite un symbole
    // On peut récupérer les ordres pour les paires populaires
    if (this.enabledWallets.includes('binance')) {
      try {
        const popularSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT']
        for (const symbol of popularSymbols) {
          const binanceOrders = await binanceApi.getOrderHistory(symbol, 10)
          allOrders.push(
            ...binanceOrders.map(order => ({
              wallet: 'binance' as WalletType,
              orderId: order.orderId.toString(),
              symbol: order.symbol,
              side: order.side.toLowerCase() as 'buy' | 'sell',
              type: order.type,
              quantity: order.origQty,
              price: order.price,
              status: order.status,
              timestamp: order.time.toString(),
              walletColor: WALLET_COLORS.binance
            }))
          )
        }
      } catch (error) {
        console.error('Erreur récupération ordres Binance:', error)
      }
    }

    // Alpaca orders
    if (this.enabledWallets.includes('alpaca')) {
      try {
        const alpacaOrders = await alpacaForexStocksApi.getOrderHistory('all', 20)
        allOrders.push(
          ...alpacaOrders.map(order => ({
            wallet: 'alpaca' as WalletType,
            orderId: order.id,
            symbol: order.symbol,
            side: order.side,
            type: order.order_type,
            quantity: order.qty.toString(),
            price: order.limit_price?.toString() || 'Market',
            status: order.status,
            timestamp: order.submitted_at,
            walletColor: WALLET_COLORS.alpaca
          }))
        )
      } catch (error) {
        console.error('Erreur récupération ordres Alpaca:', error)
      }
    }

    // Trier par timestamp décroissant
    return allOrders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // === MÉTHODES DE TRADING UNIFIÉES ===

  async placeOrder(
    wallet: WalletType,
    symbol: string,
    side: 'buy' | 'sell',
    quantity: string,
    type: 'market' | 'limit' = 'market',
    price?: string
  ): Promise<any> {
    switch (wallet) {
      case 'bybit':
        return await bybitApi.placeOrder(
          symbol,
          side === 'buy' ? 'Buy' : 'Sell',
          type === 'market' ? 'Market' : 'Limit',
          quantity,
          price
        )

      case 'okx':
        return await okxApi.placeOrder(
          symbol,
          'cash', // mode trading
          side,
          type,
          quantity,
          price
        )

      case 'binance':
        return await binanceApi.placeOrder(
          symbol,
          side.toUpperCase() as 'BUY' | 'SELL',
          type.toUpperCase() as 'MARKET' | 'LIMIT',
          quantity,
          price
        )

      case 'alpaca':
        return await alpacaForexStocksApi.placeOrder(
          symbol,
          parseFloat(quantity),
          side,
          type,
          'gtc',
          price ? parseFloat(price) : undefined
        )

      default:
        throw new Error(`Wallet ${wallet} non supporté`)
    }
  }

  // === MÉTHODES UTILITAIRES ===

  getWalletInfo(wallet: WalletType) {
    return {
      name: WALLET_NAMES[wallet],
      color: WALLET_COLORS[wallet],
      logo: WALLET_LOGOS[wallet]
    }
  }

  isWalletEnabled(wallet: WalletType): boolean {
    return this.enabledWallets.includes(wallet)
  }

  enableWallet(wallet: WalletType): void {
    if (!this.enabledWallets.includes(wallet)) {
      this.enabledWallets.push(wallet)
    }
  }

  disableWallet(wallet: WalletType): void {
    this.enabledWallets = this.enabledWallets.filter(w => w !== wallet)
  }

  // === PAIEMENTS INTER-WALLETS ===

  async getTransferFees(fromWallet: WalletType, toWallet: WalletType, coin: string): Promise<{
    fee: string
    instant: boolean
    description: string
  }> {
    // Paiements instantanés sans frais pour même wallet
    if (fromWallet === toWallet) {
      return {
        fee: '0',
        instant: true,
        description: `Transfert ${WALLET_NAMES[fromWallet]} ↔ ${WALLET_NAMES[toWallet]} (instantané, sans frais)`
      }
    }

    // Frais pour transferts inter-wallets
    return {
      fee: '0.001', // Frais réseau typique
      instant: false,
      description: `Transfert ${WALLET_NAMES[fromWallet]} → ${WALLET_NAMES[toWallet]} (avec frais réseau)`
    }
  }

  // Méthode de transfert inter-wallets
  async transferFunds(
    fromWallet: WalletType,
    toWallet: WalletType,
    coin: string,
    amount: number
  ): Promise<{
    success: boolean
    transactionId?: string
    error?: string
  }> {
    try {
      // Validation des paramètres
      if (fromWallet === toWallet) {
        throw new Error('Le wallet source et destination doivent être différents')
      }

      if (amount <= 0) {
        throw new Error('Le montant doit être positif')
      }

      // Transferts intra-plateforme (gratuits et instantanés)
      if (fromWallet === toWallet) {
        return {
          success: true,
          transactionId: `internal_${Date.now()}`
        }
      }

      // Transferts inter-plateformes nécessitent des adresses de dépôt
      // Pour la démo, on simule le processus
      const fees = await this.getTransferFees(fromWallet, toWallet, coin)
      
      // Ici, en production, on ferait:
      // 1. Générer adresse de dépôt sur le wallet destination
      // 2. Initier retrait depuis le wallet source vers cette adresse
      // 3. Attendre confirmation réseau
      
      // Pour la démo, on simule une réussite
      setTimeout(() => {
        console.log(`Transfert simulé: ${amount} ${coin} de ${WALLET_NAMES[fromWallet]} vers ${WALLET_NAMES[toWallet]}`)
      }, 1000)

      return {
        success: true,
        transactionId: `transfer_${fromWallet}_${toWallet}_${Date.now()}`
      }

    } catch (error) {
      console.error('Erreur transfert inter-wallets:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }
    }
  }

  // Calculer la valeur totale du portfolio multi-wallet
  async getTotalPortfolioValue(): Promise<{
    totalUSD: number
    byWallet: Record<WalletType, number>
    breakdown: UnifiedBalance[]
  }> {
    const balances = await this.getAllBalances()
    const byWallet: Record<WalletType, number> = {
      bybit: 0,
      okx: 0,
      binance: 0,
      alpaca: 0
    }
    
    let totalUSD = 0

    balances.forEach(balance => {
      const value = parseFloat(balance.usdValue) || 0
      byWallet[balance.wallet] += value
      totalUSD += value
    })

    return {
      totalUSD,
      byWallet,
      breakdown: balances
    }
  }
}

// Export singleton
export const multiWalletService = new MultiWalletService()

export default MultiWalletService
