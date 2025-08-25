import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Eye, EyeOff, RefreshCw, Plus, Minus, 
  ArrowUpDown, RotateCcw, Gift, ChevronDown, Info, DollarSign,
  Filter, Layers, HelpCircle, History
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { okxApi, OKXBalance, OKXTicker } from '../services/okxApi'
import { cryptoDataService, ExtendedCryptoAsset } from '../services/cryptoDataService'
import { cryptoLogoService } from '../services/cryptoLogoService'
import toast from 'react-hot-toast'

interface FiatCurrency {
  code: string
  name: string
  balance: string
  eurValue: string
  icon: string
  color: string
}

const OKXSpot: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('crypto')
  const [hideZeroBalances, setHideZeroBalances] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'balance' | 'value'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // États pour les données
  const [balances, setBalances] = useState<OKXBalance[]>([])
  const [tickers, setTickers] = useState<OKXTicker[]>([])
  const [cryptoAssets, setCryptoAssets] = useState<ExtendedCryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [totalBalance, setTotalBalance] = useState({ eur: '1.23', btc: '0.00001342' })
  const [servicesInitialized, setServicesInitialized] = useState(false)

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
    { code: 'KRW', name: 'South Korean Won', balance: '0.00', eurValue: '≈ 0 EUR', icon: '₩', color: '#003478' },
    { code: 'BRL', name: 'Brazilian Real', balance: '0.00', eurValue: '≈ 0 EUR', icon: 'R$', color: '#009639' },
    { code: 'IDR', name: 'Indonesian Rupiah', balance: '0.00', eurValue: '≈ 0 EUR', icon: 'Rp', color: '#CE1126' }
  ]

  // Catégories de cryptomonnaies
  const cryptoCategories = [
    { value: 'all', label: 'Toutes', icon: Layers },
    { value: 'bitcoin', label: 'Bitcoin', icon: DollarSign },
    { value: 'ethereum', label: 'Ethereum', icon: DollarSign },
    { value: 'stablecoin', label: 'Stablecoins', icon: DollarSign },
    { value: 'defi', label: 'DeFi', icon: DollarSign },
    { value: 'layer1', label: 'Layer 1', icon: DollarSign },
    { value: 'exchange', label: 'Exchange', icon: DollarSign }
  ]

  // Initialiser les services crypto
  useEffect(() => {
    const initializeServices = async () => {
      try {
        console.log('🔄 Initialisation des services crypto OKX...')
        await cryptoDataService.initialize()
        // cryptoLogoService est déjà initialisé
        
        // Charger les cryptomonnaies OKX supportées
        const okxCryptos = cryptoDataService.getAllOKXSupportedCryptos()
        console.log(`✅ ${okxCryptos.length} cryptomonnaies OKX chargées`)
        
        setCryptoAssets(okxCryptos)
        setServicesInitialized(true)
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation des services:', error)
        toast.error('Erreur lors du chargement des cryptomonnaies')
      }
    }

    initializeServices()
  }, [])

  // Charger les données initiales
  useEffect(() => {
    if (servicesInitialized) {
      loadData()
    }
  }, [servicesInitialized])

  const loadData = async () => {
    try {
      setLoading(true)
      const [balanceData, tickerData] = await Promise.all([
        okxApi.getAccountBalance(),
        okxApi.getMarketTickers()
      ])
      setBalances(balanceData || [])
      setTickers(tickerData || [])
      
      // Calculer le solde total
      calculateTotalBalance(balanceData || [], tickerData || [])
      
      // Enrichir les données crypto avec les balances et prix
      await enrichCryptoData(balanceData || [], tickerData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des données OKX:', error)
      toast.error('Erreur lors du chargement des données OKX')
    } finally {
      setLoading(false)
    }
  }

  // Enrichir les données crypto avec balances et prix
  const enrichCryptoData = async (balances: OKXBalance[], tickers: OKXTicker[]) => {
    try {
      const enrichedCryptos = await Promise.all(
        cryptoAssets.map(async (crypto) => {
          // Trouver le solde pour cette crypto
          const balance = balances.find(b => b.ccy === crypto.symbol)
          const ticker = tickers.find(t => t.instId === `${crypto.symbol}-USDT`)
          
          // Calculer les valeurs
          const balanceAmount = balance ? parseFloat(balance.bal) : 0
          const price = ticker ? parseFloat(ticker.last) : 0
          const eurRate = 0.92 // Taux EUR/USD approximatif
          const usdValue = price * balanceAmount
          const eurValue = usdValue * eurRate
          const change24h = ticker ? ((parseFloat(ticker.last) - parseFloat(ticker.open24h)) / parseFloat(ticker.open24h) * 100).toFixed(2) : '0'

          // Charger le logo avec fallback
          let logoInfo
          try {
            logoInfo = await cryptoLogoService.getCryptoLogo(crypto.symbol, crypto.name)
          } catch (error) {
            console.warn(`Logo non trouvé pour ${crypto.symbol}:`, error)
            logoInfo = {
              primaryUrl: '/images/crypto-icons/default-crypto-icon.svg',
              color: crypto.color || '#666666'
            }
          }

          return {
            ...crypto,
            balance: balanceAmount.toString(),
            eurValue: `≈ ${eurValue.toFixed(2)} EUR`,
            usdValue: `≈ ${usdValue.toFixed(2)} USD`,
            price: price > 0 ? `$${price.toLocaleString()}` : 'N/A',
            change24h: change24h,
            logo_url: logoInfo.primaryUrl,
            color: logoInfo.color || crypto.color
          }
        })
      )

      setCryptoAssets(enrichedCryptos)
    } catch (error) {
      console.error('Erreur lors de l\'enrichissement des données crypto OKX:', error)
    }
  }

  const calculateTotalBalance = (balances: OKXBalance[], tickers: OKXTicker[]) => {
    let totalEur = 0
    
    balances.forEach(balance => {
      const ticker = tickers.find(t => t.instId === `${balance.ccy}-USDT`)
      if (ticker && parseFloat(balance.bal) > 0) {
        const price = parseFloat(ticker.last)
        const amount = parseFloat(balance.bal)
        const eurRate = 0.92 // Taux EUR/USD approximatif
        totalEur += price * amount * eurRate
      }
    })

    setTotalBalance({
      eur: totalEur.toFixed(2),
      btc: (totalEur / (45000 * 0.92)).toFixed(8) // Prix BTC estimé
    })
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
    toast.success('Données OKX actualisées')
  }

  // Filtrer et trier les actifs crypto avec performances optimisées
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = cryptoAssets.filter(asset => {
      // Filtre de recherche
      const matchesSearch = searchQuery === '' || 
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtre par catégorie
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory

      // Filtre des soldes zéro
      const hasBalance = !hideZeroBalances || (asset.balance && parseFloat(asset.balance) > 0)

      return matchesSearch && matchesCategory && hasBalance
    })

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'balance':
          aValue = parseFloat(a.balance || '0')
          bValue = parseFloat(b.balance || '0')
          break
        case 'value':
          aValue = parseFloat(a.usdValue?.replace(/[≈$,\s]/g, '') || '0')
          bValue = parseFloat(b.usdValue?.replace(/[≈$,\s]/g, '') || '0')
          break
        default:
          aValue = a.symbol
          bValue = b.symbol
      }
      
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
    })

    return filtered
  }, [cryptoAssets, searchQuery, selectedCategory, hideZeroBalances, sortBy, sortOrder])

  const handleSort = (newSortBy: 'name' | 'balance' | 'value') => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header avec navigation */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => navigate('/assets')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-white">OKX Exchange</h1>
              <p className="text-sm text-gray-400">Portefeuille Spot</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <History className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleRefresh}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Solde total */}
      <div className="px-4 py-6 bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-b border-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Solde Total Estimé</p>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">
              {showBalance ? `${totalBalance.eur} EUR` : '****'}
            </p>
            <p className="text-sm text-gray-400">
              {showBalance ? `≈ ${totalBalance.btc} BTC` : '****'}
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex justify-center space-x-3 mt-6">
          <motion.button
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Dépôt</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Minus className="w-4 h-4" />
            <span>Retrait</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Transfert</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Convertir</span>
          </motion.button>
          
          <motion.button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </motion.button>
        </div>
      </div>

      {/* Informations OKX style moderne */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-orange-900/20 to-blue-900/20 rounded-lg p-3 border border-orange-800/30">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-orange-400 font-medium">En ligne</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">OKX Trading</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">Spot Actif</span>
          </div>
        </div>
      </div>

      {/* Onglets Crypto/Fiat */}
      <div className="px-4 py-4">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <motion.button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'crypto'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Crypto
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('fiat')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'fiat'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Fiat
          </motion.button>
        </div>
      </div>

      {/* Contenu selon l'onglet sélectionné */}
      <AnimatePresence mode="wait">
        {activeTab === 'crypto' ? (
          <motion.div
            key="crypto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4"
          >
            {/* Recherche et filtres crypto */}
            <div className="space-y-4 mb-6">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une cryptomonnaie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Catégories */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {cryptoCategories.map((category) => (
                  <motion.button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Options de tri et filtres */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setHideZeroBalances(!hideZeroBalances)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      hideZeroBalances
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Masquer soldes zéro</span>
                  </motion.button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Trier par:</span>
                  <motion.button
                    onClick={() => handleSort('name')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'name' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </motion.button>
                  <motion.button
                    onClick={() => handleSort('balance')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'balance' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Solde {sortBy === 'balance' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </motion.button>
                  <motion.button
                    onClick={() => handleSort('value')}
                    className={`px-3 py-1 rounded text-sm ${
                      sortBy === 'value' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Valeur {sortBy === 'value' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Liste des cryptomonnaies */}
            <div className="space-y-2 pb-20">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredAndSortedAssets.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Aucune cryptomonnaie trouvée</p>
                </div>
              ) : (
                filteredAndSortedAssets.map((asset, index) => (
                  <motion.div
                    key={asset.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={asset.logo_url || '/images/crypto-icons/default-crypto-icon.svg'}
                            alt={asset.name}
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: asset.color }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/images/crypto-icons/default-crypto-icon.svg'
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{asset.symbol}</h3>
                          <p className="text-sm text-gray-400">{asset.name}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-white">
                          {showBalance ? asset.balance || '0.00' : '****'}
                        </p>
                        <p className="text-sm text-gray-400">
                          {showBalance ? asset.eurValue || '≈ 0 EUR' : '****'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-white">{asset.price || 'N/A'}</p>
                        <p className={`text-sm ${
                          parseFloat(asset.change24h || '0') >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {parseFloat(asset.change24h || '0') >= 0 ? '+' : ''}{asset.change24h || '0'}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="fiat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4"
          >
            {/* Liste des devises fiat */}
            <div className="space-y-2 pb-20">
              {fiatCurrencies.map((currency, index) => (
                <motion.div
                  key={currency.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: currency.color }}
                      >
                        {currency.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{currency.code}</h3>
                        <p className="text-sm text-gray-400">{currency.name}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-white">
                        {showBalance ? currency.balance : '****'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {showBalance ? currency.eurValue : '****'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OKXSpot
