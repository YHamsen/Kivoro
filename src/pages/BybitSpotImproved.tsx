import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Eye, EyeOff, RefreshCw, Plus, Minus, 
  ArrowUpDown, RotateCcw, Gift, ChevronDown, Info, DollarSign,
  Filter, Layers
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { bybitApi, BybitBalance, BybitTicker } from '../services/bybitApi'
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

const BybitSpotImproved: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('crypto')
  const [hideZeroBalances, setHideZeroBalances] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'balance' | 'value'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // États pour les données
  const [balances, setBalances] = useState<BybitBalance[]>([])
  const [tickers, setTickers] = useState<BybitTicker[]>([])
  const [cryptoAssets, setCryptoAssets] = useState<ExtendedCryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [totalBalance, setTotalBalance] = useState({ eur: '0.96', btc: '0.00001046' })
  const [servicesInitialized, setServicesInitialized] = useState(false)

  // Données fiat avec icônes colorées (inchangées)
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
        console.log('🔄 Initialisation des services crypto...')
        await cryptoDataService.initialize()
        // cryptoLogoService est déjà initialisé
        
        // Charger les cryptomonnaies Bybit supportées
        const bybitCryptos = cryptoDataService.getAllBybitSupportedCryptos()
        console.log(`✅ ${bybitCryptos.length} cryptomonnaies Bybit chargées`)
        
        setCryptoAssets(bybitCryptos)
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
        bybitApi.getWalletBalance('SPOT'),
        bybitApi.getMarketTickers('spot')
      ])
      setBalances(balanceData || [])
      setTickers(tickerData || [])
      
      // Calculer le solde total
      calculateTotalBalance(balanceData || [], tickerData || [])
      
      // Enrichir les données crypto avec les balances et prix
      await enrichCryptoData(balanceData || [], tickerData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      toast.error('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  // Enrichir les données crypto avec balances et prix
  const enrichCryptoData = async (balances: BybitBalance[], tickers: BybitTicker[]) => {
    try {
      const enrichedCryptos = await Promise.all(
        cryptoAssets.map(async (crypto) => {
          // Trouver le solde pour cette crypto
          const balance = balances.find(b => b.coin === crypto.symbol)
          const ticker = tickers.find(t => t.symbol === `${crypto.symbol}USDT`)
          
          // Calculer les valeurs
          const balanceAmount = balance ? parseFloat(balance.walletBalance) : 0
          const price = ticker ? parseFloat(ticker.lastPrice) : 0
          const eurRate = 0.92 // Taux EUR/USD approximatif
          const usdValue = price * balanceAmount
          const eurValue = usdValue * eurRate
          const change24h = ticker ? ticker.priceChangePercent : '0'

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
      console.error('Erreur lors de l\'enrichissement des données crypto:', error)
    }
  }

  const calculateTotalBalance = (balances: BybitBalance[], tickers: BybitTicker[]) => {
    let totalEur = 0
    
    balances.forEach(balance => {
      const ticker = tickers.find(t => t.symbol === `${balance.coin}USDT`)
      if (ticker && parseFloat(balance.walletBalance) > 0) {
        const price = parseFloat(ticker.lastPrice)
        const amount = parseFloat(balance.walletBalance)
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
    toast.success('Données actualisées')
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
      
      // Filtre des soldes nuls
      const hasBalance = hideZeroBalances ? parseFloat(asset.balance || '0') > 0 : true
      
      return matchesSearch && matchesCategory && hasBalance
    })

    // Tri
    filtered.sort((a, b) => {
      let compareValue = 0
      
      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name)
          break
        case 'balance':
          compareValue = parseFloat(b.balance || '0') - parseFloat(a.balance || '0')
          break
        case 'value':
          const aValue = parseFloat(a.eurValue?.replace(/[^0-9.-]/g, '') || '0')
          const bValue = parseFloat(b.eurValue?.replace(/[^0-9.-]/g, '') || '0')
          compareValue = bValue - aValue
          break
      }
      
      return sortOrder === 'desc' ? -compareValue : compareValue
    })

    return filtered
  }, [cryptoAssets, searchQuery, selectedCategory, hideZeroBalances, sortBy, sortOrder])

  // Filtrer les devises fiat (inchangé)
  const filteredFiat = fiatCurrencies.filter(currency => {
    const matchesSearch = currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    const hasBalance = hideZeroBalances ? parseFloat(currency.balance) > 0 : true
    return matchesSearch && hasBalance
  })

  const toggleSort = (newSortBy: 'name' | 'balance' | 'value') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }

  if (!servicesInitialized || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">
            {!servicesInitialized ? 'Initialisation des services crypto...' : 'Chargement des données...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/assets')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Funding Account</h1>
          <div className="text-xs bg-green-600 px-2 py-1 rounded-full">
            {cryptoAssets.length} cryptos
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">?</span>
            </div>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-4 h-3 border border-gray-400 rounded-sm"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Section Solde Total */}
      <div className="p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Total Assets</span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              {showBalance ? <Eye className="w-4 h-4 text-gray-400" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold">
              {showBalance ? totalBalance.eur : '****'}
            </span>
            <div className="flex items-center gap-1 text-gray-400">
              <span>EUR</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            ≈ {showBalance ? totalBalance.btc : '****'} BTC
          </div>
        </motion.div>
      </div>

      {/* Statistiques d'amélioration */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg p-3 border border-blue-800/30">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Système amélioré :</span>
            <span className="text-white">123 cryptomonnaies Bybit</span>
            <span className="text-gray-400">vs 10 avant</span>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2 hover:border-gray-600 transition-colors"
          >
            <Plus className="w-5 h-5 text-green-400" />
            <span className="text-xs">Dépôt</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2 hover:border-gray-600 transition-colors"
          >
            <Minus className="w-5 h-5 text-red-400" />
            <span className="text-xs">Retrait</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2 hover:border-gray-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-xs">Actualiser</span>
          </motion.button>
        </div>
      </div>

      {/* Onglets */}
      <div className="px-4 mb-4">
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800">
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'crypto' 
                ? 'bg-[#2a2a2a] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setActiveTab('fiat')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'fiat' 
                ? 'bg-[#2a2a2a] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Fiat
          </button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="px-4 mb-4">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'crypto' ? 'Rechercher une cryptomonnaie...' : 'Rechercher une devise...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-600"
            />
          </div>
          <button
            onClick={() => setHideZeroBalances(!hideZeroBalances)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
              hideZeroBalances 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-[#1a1a1a] border-gray-800 text-gray-400 hover:border-gray-600'
            }`}
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>

        {/* Filtres par catégorie (pour crypto uniquement) */}
        {activeTab === 'crypto' && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cryptoCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <category.icon className="w-3 h-3" />
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Options de tri (pour crypto uniquement) */}
        {activeTab === 'crypto' && (
          <div className="flex gap-2 mt-3">
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <span>Trier par:</span>
              <button
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-1 px-2 py-1 rounded ${
                  sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400'
                }`}
              >
                Nom {sortBy === 'name' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button
                onClick={() => toggleSort('balance')}
                className={`flex items-center gap-1 px-2 py-1 rounded ${
                  sortBy === 'balance' ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400'
                }`}
              >
                Solde {sortBy === 'balance' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button
                onClick={() => toggleSort('value')}
                className={`flex items-center gap-1 px-2 py-1 rounded ${
                  sortBy === 'value' ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400'
                }`}
              >
                Valeur {sortBy === 'value' && <ArrowUpDown className="w-3 h-3" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Liste des actifs */}
      <div className="px-4 pb-20">
        <AnimatePresence>
          {activeTab === 'crypto' ? (
            <div className="space-y-3">
              {filteredAndSortedAssets.length > 0 ? (
                filteredAndSortedAssets.map((asset, index) => (
                  <motion.div
                    key={asset.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={asset.logo_url || '/images/crypto-icons/default-crypto-icon.svg'} 
                            alt={asset.name}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/images/crypto-icons/default-crypto-icon.svg'
                            }}
                          />
                          {asset.bybit_supported && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{asset.symbol}</span>
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: asset.color }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-400">{asset.name}</div>
                          <div className="text-xs text-gray-500 capitalize">{asset.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {parseFloat(asset.balance || '0') > 0 ? asset.balance : '0.00'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {asset.eurValue}
                        </div>
                        {asset.price && asset.price !== 'N/A' && (
                          <div className="text-xs text-gray-500">
                            {asset.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune cryptomonnaie trouvée</p>
                  <p className="text-sm">Essayez de modifier vos filtres</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFiat.map((currency, index) => (
                <motion.div
                  key={currency.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: currency.color }}
                      >
                        {currency.icon}
                      </div>
                      <div>
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-sm text-gray-400">{currency.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{currency.balance}</div>
                      <div className="text-sm text-gray-400">{currency.eurValue}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Statistiques en bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 p-4">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {activeTab === 'crypto' 
              ? `${filteredAndSortedAssets.length} / ${cryptoAssets.length} cryptomonnaies`
              : `${filteredFiat.length} devises fiat`
            }
          </span>
          <span>Dernière mise à jour: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default BybitSpotImproved
