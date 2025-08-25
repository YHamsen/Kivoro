import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Eye, EyeOff, RefreshCw, Plus, Minus, 
  ArrowUpDown, RotateCcw, Gift, ChevronDown, Info, DollarSign,
  Filter, Layers
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { binanceApi } from '../services/binanceApi'
import toast from 'react-hot-toast'

interface BinanceCrypto {
  symbol: string
  name: string
  price_usdt: number
  price_change_24h: number
  volume_24h_usdt: number
  high_24h: number
  low_24h: number
  logo_path?: string
  logo_url?: string
  trading_pairs: string[]
  status: string
  exchange: string
  spot_trading: boolean
  margin_trading: boolean
  futures_trading: boolean
}

interface FiatCurrency {
  code: string
  name: string
  balance: string
  eurValue: string
  icon: string
  color: string
}

const BinanceSpot: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('crypto')
  const [hideZeroBalances, setHideZeroBalances] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'balance' | 'value' | 'volume'>('volume')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // États pour les données
  const [binanceCryptos, setBinanceCryptos] = useState<BinanceCrypto[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [totalBalance, setTotalBalance] = useState({ eur: '0.00', btc: '0.00000000' })

  // Données fiat avec icônes colorées
  const fiatCurrencies: FiatCurrency[] = [
    { code: 'EUR', name: 'Euro', balance: '0.00', eurValue: '≈ 0 EUR', icon: '€', color: '#003399' },
    { code: 'USD', name: 'United States Dollar', balance: '0.00', eurValue: '≈ 0 EUR', icon: '$', color: '#006600' },
    { code: 'GBP', name: 'British Pound', balance: '0.00', eurValue: '≈ 0 EUR', icon: '£', color: '#1F4E79' },
    { code: 'JPY', name: 'Japanese Yen', balance: '0.00', eurValue: '≈ 0 EUR', icon: '¥', color: '#B22222' },
    { code: 'CAD', name: 'Canadian Dollar', balance: '0.00', eurValue: '≈ 0 EUR', icon: 'C$', color: '#FF0000' },
    { code: 'AUD', name: 'Australian Dollar', balance: '0.00', eurValue: '≈ 0 EUR', icon: 'A$', color: '#0066CC' },
    { code: 'CHF', name: 'Swiss Franc', balance: '0.00', eurValue: '≈ 0 EUR', icon: '₣', color: '#D52B1E' },
    { code: 'CNY', name: 'Chinese Yuan', balance: '0.00', eurValue: '≈ 0 EUR', icon: '¥', color: '#DE2910' },
  ]

  // Chargement initial des données
  useEffect(() => {
    loadBinanceData()
  }, [])

  const loadBinanceData = async () => {
    try {
      setLoading(true)
      
      // Charger les données depuis le fichier généré
      const response = await fetch('/data/binance_cryptocurrencies_official.json')
      if (response.ok) {
        const data = await response.json()
        
        // Récupérer les prix en temps réel pour enrichir les données
        const tickers = await binanceApi.getAllTickers()
        const tickerMap = (tickers || []).reduce((acc: any, ticker: any) => {
          acc[ticker.symbol] = ticker
          return acc
        }, {})
        
        // Transformer les données pour inclure les prix
        const enrichedAssets = (data.assets || []).map((asset: any) => {
          const usdtTicker = tickerMap[`${asset.symbol}USDT`]
          return {
            symbol: asset.symbol,
            name: asset.name || asset.symbol,
            price_usdt: usdtTicker ? parseFloat(usdtTicker.lastPrice) : 0,
            price_change_24h: usdtTicker ? parseFloat(usdtTicker.priceChangePercent) : 0,
            volume_24h_usdt: usdtTicker ? parseFloat(usdtTicker.quoteVolume) : 0,
            high_24h: usdtTicker ? parseFloat(usdtTicker.highPrice) : 0,
            low_24h: usdtTicker ? parseFloat(usdtTicker.lowPrice) : 0,
            logo_path: `/imgs/binance_logos/${asset.symbol.toLowerCase()}.png`,
            logo_url: `/imgs/binance_logos/${asset.symbol.toLowerCase()}.png`,
            trading_pairs: asset.trading_pairs || [],
            status: asset.status || 'active',
            exchange: 'binance',
            spot_trading: true,
            margin_trading: false,
            futures_trading: false
          }
        })
        
        setBinanceCryptos(enrichedAssets)
        toast.success(`${data.total_assets} cryptomonnaies Binance chargées avec prix temps réel`)
      } else {
        // Fallback: essayer de récupérer via l'API
        await refreshBinanceData()
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données Binance:', error)
      // Fallback avec données simulées
      await createFallbackData()
    } finally {
      setLoading(false)
    }
  }

  const refreshBinanceData = async () => {
    try {
      setRefreshing(true)
      
      // Récupérer les tickers en temps réel
      const tickers = await binanceApi.getAllTickers()
      const exchangeInfo = await binanceApi.getExchangeInfo()
      
      if (tickers && exchangeInfo) {
        // Traiter les données
        const processedCryptos = processTickerData(tickers, exchangeInfo)
        setBinanceCryptos(processedCryptos)
        toast.success('Données mises à jour depuis l\'API Binance')
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      toast.error('Erreur lors de la mise à jour des données')
    } finally {
      setRefreshing(false)
    }
  }

  const processTickerData = (tickers: any[], exchangeInfo: any): BinanceCrypto[] => {
    const symbols = exchangeInfo.symbols || []
    const tickerMap = tickers.reduce((acc, ticker) => {
      acc[ticker.symbol] = ticker
      return acc
    }, {})

    const cryptoMap: { [key: string]: BinanceCrypto } = {}

    symbols.forEach((symbolInfo: any) => {
      if (symbolInfo.status === 'TRADING' && symbolInfo.isSpotTradingAllowed) {
        const baseAsset = symbolInfo.baseAsset
        const symbol = symbolInfo.symbol
        
        if (!cryptoMap[baseAsset]) {
          const usdtTicker = tickerMap[`${baseAsset}USDT`]
          
          cryptoMap[baseAsset] = {
            symbol: baseAsset,
            name: baseAsset,
            price_usdt: usdtTicker ? parseFloat(usdtTicker.lastPrice) : 0,
            price_change_24h: usdtTicker ? parseFloat(usdtTicker.priceChangePercent) : 0,
            volume_24h_usdt: usdtTicker ? parseFloat(usdtTicker.quoteVolume) : 0,
            high_24h: usdtTicker ? parseFloat(usdtTicker.highPrice) : 0,
            low_24h: usdtTicker ? parseFloat(usdtTicker.lowPrice) : 0,
            trading_pairs: [],
            status: 'active',
            exchange: 'binance',
            spot_trading: true,
            margin_trading: symbolInfo.isMarginTradingAllowed || false,
            futures_trading: true
          }
        }
        
        cryptoMap[baseAsset].trading_pairs.push(symbol)
      }
    })

    return Object.values(cryptoMap).sort((a, b) => b.volume_24h_usdt - a.volume_24h_usdt)
  }

  const createFallbackData = async () => {
    try {
      console.log('🔄 Création de données de démonstration Binance')
      
      // Données de démonstration avec les principales cryptomonnaies
      const fallbackCryptos: BinanceCrypto[] = [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          price_usdt: 42000.00,
          price_change_24h: 2.45,
          volume_24h_usdt: 1500000000,
          high_24h: 43000.00,
          low_24h: 41000.00,
          logo_path: '/imgs/binance_logos/btc.png',
          logo_url: '/imgs/binance_logos/btc.png',
          trading_pairs: ['BTCUSDT', 'BTCEUR', 'BTCTUSD'],
          status: 'active',
          exchange: 'binance',
          spot_trading: true,
          margin_trading: true,
          futures_trading: true
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          price_usdt: 2500.00,
          price_change_24h: -1.23,
          volume_24h_usdt: 800000000,
          high_24h: 2600.00,
          low_24h: 2450.00,
          logo_path: '/imgs/binance_logos/eth.png',
          logo_url: '/imgs/binance_logos/eth.png',
          trading_pairs: ['ETHUSDT', 'ETHEUR', 'ETHBTC'],
          status: 'active',
          exchange: 'binance',
          spot_trading: true,
          margin_trading: true,
          futures_trading: true
        },
        {
          symbol: 'BNB',
          name: 'BNB',
          price_usdt: 320.00,
          price_change_24h: 0.87,
          volume_24h_usdt: 200000000,
          high_24h: 325.00,
          low_24h: 315.00,
          logo_path: '/imgs/binance_logos/bnb.png',
          logo_url: '/imgs/binance_logos/bnb.png',
          trading_pairs: ['BNBUSDT', 'BNBEUR', 'BNBBTC'],
          status: 'active',
          exchange: 'binance',
          spot_trading: true,
          margin_trading: true,
          futures_trading: true
        },
        {
          symbol: 'ADA',
          name: 'Cardano',
          price_usdt: 0.45,
          price_change_24h: 3.21,
          volume_24h_usdt: 150000000,
          high_24h: 0.47,
          low_24h: 0.43,
          logo_path: '/imgs/binance_logos/ada.png',
          logo_url: '/imgs/binance_logos/ada.png',
          trading_pairs: ['ADAUSDT', 'ADAEUR', 'ADABTC'],
          status: 'active',
          exchange: 'binance',
          spot_trading: true,
          margin_trading: false,
          futures_trading: true
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          price_usdt: 95.00,
          price_change_24h: 5.67,
          volume_24h_usdt: 400000000,
          high_24h: 98.00,
          low_24h: 92.00,
          logo_path: '/imgs/binance_logos/sol.png',
          logo_url: '/imgs/binance_logos/sol.png',
          trading_pairs: ['SOLUSDT', 'SOLEUR', 'SOLBTC'],
          status: 'active',
          exchange: 'binance',
          spot_trading: true,
          margin_trading: true,
          futures_trading: true
        }
      ]
      
      setBinanceCryptos(fallbackCryptos)
      toast.success('Données de démonstration Binance chargées')
      
    } catch (error) {
      console.error('Erreur lors de la création des données de fallback:', error)
      toast.error('Impossible de charger les données Binance')
    }
  }

  // Filtrage et tri des cryptomonnaies
  const filteredAndSortedCryptos = useMemo(() => {
    let filtered = binanceCryptos.filter(crypto => {
      const matchesSearch = crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'top10' && binanceCryptos.indexOf(crypto) < 10) ||
                             (selectedCategory === 'defi' && ['UNI', 'AAVE', 'COMP', 'SUSHI', 'CRV'].includes(crypto.symbol)) ||
                             (selectedCategory === 'layer1' && ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'ATOM'].includes(crypto.symbol))
      
      const matchesBalance = !hideZeroBalances || crypto.price_usdt > 0
      
      return matchesSearch && matchesCategory && matchesBalance
    })

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.symbol.localeCompare(b.symbol)
          break
        case 'value':
          comparison = a.price_usdt - b.price_usdt
          break
        case 'volume':
          comparison = a.volume_24h_usdt - b.volume_24h_usdt
          break
        default:
          comparison = a.symbol.localeCompare(b.symbol)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [binanceCryptos, searchQuery, selectedCategory, hideZeroBalances, sortBy, sortOrder])

  // Catégories disponibles
  const categories = [
    { id: 'all', name: 'Tous', count: binanceCryptos.length },
    { id: 'top10', name: 'Top 10', count: Math.min(10, binanceCryptos.length) },
    { id: 'defi', name: 'DeFi', count: binanceCryptos.filter(c => ['UNI', 'AAVE', 'COMP', 'SUSHI', 'CRV'].includes(c.symbol)).length },
    { id: 'layer1', name: 'Layer 1', count: binanceCryptos.filter(c => ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'AVAX', 'ATOM'].includes(c.symbol)).length }
  ]

  const renderCryptoItem = (crypto: BinanceCrypto) => {
    const logoUrl = crypto.logo_path ? crypto.logo_path.replace('/workspace', '') : 
                   crypto.logo_url || 
                   `/images/crypto-icons/${crypto.symbol.toLowerCase()}-icon.png`
    
    return (
      <motion.div
        key={crypto.symbol}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              <img 
                src={logoUrl}
                alt={crypto.symbol}
                className="w-8 h-8 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><text y="18" font-size="14" text-anchor="middle" x="12">${crypto.symbol[0]}</text></svg>`
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{crypto.symbol}</div>
              <div className="text-sm text-gray-500">{crypto.name}</div>
              <div className="text-xs text-gray-400">{crypto.trading_pairs.length} paires</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {showBalance ? `$${crypto.price_usdt.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}` : '••••••'}
            </div>
            <div className={`text-sm font-medium ${crypto.price_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {crypto.price_change_24h >= 0 ? '+' : ''}{crypto.price_change_24h.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500">
              Vol: ${(crypto.volume_24h_usdt / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
        
        {/* Badges de fonctionnalités */}
        <div className="flex space-x-2 mt-3">
          {crypto.spot_trading && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Spot</span>
          )}
          {crypto.margin_trading && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Margin</span>
          )}
          {crypto.futures_trading && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Futures</span>
          )}
        </div>
      </motion.div>
    )
  }

  const renderFiatItem = (fiat: FiatCurrency) => (
    <motion.div
      key={fiat.code}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: fiat.color }}
          >
            {fiat.icon}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{fiat.code}</div>
            <div className="text-sm text-gray-500">{fiat.name}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-gray-900">
            {showBalance ? fiat.balance : '••••••'}
          </div>
          <div className="text-sm text-gray-500">{fiat.eurValue}</div>
        </div>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-yellow-500" size={32} />
          <p className="text-gray-600">Chargement des données Binance...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/assets')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Binance Spot</h1>
              <p className="text-sm opacity-90">{binanceCryptos.length} actifs disponibles</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
            <button
              onClick={refreshBinanceData}
              disabled={refreshing}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Balance total */}
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-center">
            <div className="text-sm opacity-90 mb-1">Balance Total Estimé</div>
            <div className="text-2xl font-bold">
              {showBalance ? `${totalBalance.eur} EUR` : '••••••••'}
            </div>
            <div className="text-sm opacity-75">
              ≈ {showBalance ? `${totalBalance.btc} BTC` : '••••••••'}
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'crypto' 
                ? 'text-yellow-600 border-b-2 border-yellow-600' 
                : 'text-gray-500'
            }`}
          >
            Crypto ({filteredAndSortedCryptos.length})
          </button>
          <button
            onClick={() => setActiveTab('fiat')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'fiat' 
                ? 'text-yellow-600 border-b-2 border-yellow-600' 
                : 'text-gray-500'
            }`}
          >
            Fiat ({fiatCurrencies.length})
          </button>
        </div>
      </div>

      {/* Contrôles */}
      <div className="bg-white p-4 border-b space-y-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une cryptomonnaie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        {/* Filtres et tri */}
        {activeTab === 'crypto' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setHideZeroBalances(!hideZeroBalances)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  hideZeroBalances 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Masquer balances nulles
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="volume">Volume</option>
                <option value="name">Nom</option>
                <option value="value">Prix</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-200 rounded-lg"
              >
                <ArrowUpDown size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'crypto' ? (
            <div className="space-y-3">
              {filteredAndSortedCryptos.map(renderCryptoItem)}
              {filteredAndSortedCryptos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucune cryptomonnaie trouvée
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {fiatCurrencies.map(renderFiatItem)}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BinanceSpot
