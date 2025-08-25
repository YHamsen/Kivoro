import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Search, Eye, EyeOff, RefreshCw, Plus, Minus, 
  ArrowUpDown, RotateCcw, Gift, ChevronDown, Info, DollarSign 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { bybitApi, BybitBalance, BybitTicker } from '../services/bybitApi'
import toast from 'react-hot-toast'

interface CryptoAsset {
  symbol: string
  name: string
  balance: string
  eurValue: string
  icon: string
  color: string
}

interface FiatCurrency {
  code: string
  name: string
  balance: string
  eurValue: string
  icon: string
  color: string
}

const BybitSpot: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('crypto')
  const [hideZeroBalances, setHideZeroBalances] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [balances, setBalances] = useState<BybitBalance[]>([])
  const [tickers, setTickers] = useState<BybitTicker[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [totalBalance, setTotalBalance] = useState({ eur: '0.96', btc: '0.00001046' })

  // Données crypto avec vraies icônes et couleurs Bybit
  const cryptoAssets: Record<string, { name: string; icon: string; color: string }> = {
    'USDT': { name: 'Tether USDT', icon: '/images/crypto-icons/usdt-icon.jpg', color: '#26A17B' },
    'BTC': { name: 'Bitcoin', icon: '/images/crypto-icons/btc-icon.png', color: '#F7931A' },
    'ETH': { name: 'Ethereum', icon: '/images/crypto-icons/eth-icon.png', color: '#627EEA' },
    'BNB': { name: 'Binance Coin', icon: '/images/crypto-icons/bnb-icon.png', color: '#F3BA2F' },
    'SOL': { name: 'Solana', icon: '/images/crypto-icons/sol-icon.jpg', color: '#9945FF' },
    'ADA': { name: 'Cardano', icon: '/images/crypto-icons/ada-icon.jpg', color: '#0033AD' },
    'XRP': { name: 'XRP', icon: '/images/crypto-icons/xrp-icon.jpg', color: '#23292F' },
    'DOT': { name: 'Polkadot', icon: '/images/crypto-icons/dot-icon.jpg', color: '#E6007A' },
    'USDC': { name: 'USD Coin', icon: '/images/crypto-icons/usdc-icon.jpg', color: '#2775CA' },
    'DOGE': { name: 'Dogecoin', icon: '/images/crypto-icons/doge-icon.jpg', color: '#C2A633' }
  }

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

  // Charger les données initiales
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [balanceData, tickerData] = await Promise.all([
        bybitApi.getWalletBalance('SPOT'),
        bybitApi.getMarketTickers('spot')
      ])
      setBalances(balanceData || [])
      setTickers(tickerData || [])
      
      // Calculer le solde total (simulation pour la démo)
      calculateTotalBalance(balanceData || [], tickerData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      toast.error('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
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

  // Calculer la valeur EUR des actifs
  const calculateEurValue = (coin: string, balance: string): string => {
    const ticker = tickers.find(t => t.symbol === `${coin}USDT`)
    if (!ticker) return '≈ 0.00 EUR'
    
    const price = parseFloat(ticker.lastPrice)
    const amount = parseFloat(balance)
    const eurRate = 0.92 // Taux EUR/USD approximatif
    
    return `≈ ${(price * amount * eurRate).toFixed(2)} EUR`
  }

  // Filtrer les actifs selon la recherche et les soldes nuls
  const filteredAssets = balances.filter(asset => {
    const matchesSearch = asset.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cryptoAssets[asset.coin]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const hasBalance = hideZeroBalances ? parseFloat(asset.walletBalance) > 0 : true
    return matchesSearch && hasBalance
  })

  // Filtrer les devises fiat
  const filteredFiat = fiatCurrencies.filter(currency => {
    const matchesSearch = currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    const hasBalance = hideZeroBalances ? parseFloat(currency.balance) > 0 : true
    return matchesSearch && hasBalance
  })

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
          
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
            <span>≈ {showBalance ? totalBalance.btc : '****'} BTC</span>
            <Info className="w-3 h-3" />
          </div>

          <div className="border-t border-gray-700 pt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 text-sm">Available Balance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">
                {showBalance ? totalBalance.eur : '****'}
              </span>
              <span className="text-gray-400">EUR</span>
            </div>
            <div className="text-sm text-gray-400">
              ≈ {showBalance ? totalBalance.btc : '****'} BTC
            </div>
          </div>
        </motion.div>

        {/* Bannière Promotionnelle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 mt-3 flex items-center justify-between cursor-pointer hover:bg-[#1f1f1f] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <span className="text-white text-sm font-medium">HODL USDe to Enjoy Up to 4.00% APR!</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
        </motion.div>
      </div>

      {/* Boutons d'Actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-5 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800"
          >
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-300">Deposit</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800"
          >
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <Minus className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-300">Withdraw</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800"
          >
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-300">Transfer</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800"
          >
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-300">Convert</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800"
          >
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-300">Giveaway</span>
          </motion.button>
        </div>
      </div>

      {/* Onglets Crypto/Fiat */}
      <div className="px-4">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('crypto')}
            className={`pb-3 px-1 mr-6 relative font-medium ${
              activeTab === 'crypto' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Crypto
            {activeTab === 'crypto' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7931A]" 
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('fiat')}
            className={`pb-3 px-1 relative font-medium ${
              activeTab === 'fiat' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Fiat
            {activeTab === 'fiat' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7931A]" 
              />
            )}
          </button>
        </div>
      </div>

      {/* Options et Recherche */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={hideZeroBalances}
              onChange={(e) => setHideZeroBalances(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-transparent border text-[#F7931A] focus:ring-[#F7931A]"
            />
            Hide zero balances
          </label>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A]"
          />
        </div>
      </div>

      {/* Liste des actifs */}
      <div className="px-4 pb-20">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg animate-pulse border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div className="space-y-2">
                      <div className="w-16 h-4 bg-gray-700 rounded" />
                      <div className="w-24 h-3 bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="w-20 h-4 bg-gray-700 rounded" />
                    <div className="w-16 h-3 bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {activeTab === 'crypto' ? (
                <>
                  {filteredAssets.map((asset) => {
                    const assetInfo = cryptoAssets[asset.coin] || { 
                      name: asset.coin, 
                      icon: `/images/crypto-icons/${asset.coin.toLowerCase()}-icon.png`, 
                      color: '#6B7280' 
                    }
                    
                    return (
                      <motion.div
                        key={asset.coin}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-800">
                            <img 
                              src={assetInfo.icon} 
                              alt={asset.coin}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                // Fallback en cas d'erreur de chargement d'image
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                target.parentElement!.innerHTML = `<div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style="background-color: ${assetInfo.color}">${asset.coin[0]}</div>`
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{asset.coin}</div>
                            <div className="text-sm text-gray-400">{assetInfo.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white">
                            {parseFloat(asset.walletBalance) > 0 
                              ? parseFloat(asset.walletBalance).toFixed(asset.coin === 'BTC' || asset.coin === 'ETH' ? 8 : 4)
                              : '0.0000'
                            }
                          </div>
                          <div className="text-sm text-gray-400">
                            {calculateEurValue(asset.coin, asset.walletBalance)}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  
                  {filteredAssets.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-lg">Aucun actif trouvé</p>
                      {hideZeroBalances && (
                        <p className="text-sm mt-2">Essayez de désactiver "Hide zero balances"</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {filteredFiat.map((currency) => (
                    <motion.div
                      key={currency.code}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1f1f1f] transition-colors border border-gray-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: currency.color }}
                        >
                          {currency.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{currency.code}</div>
                          <div className="text-sm text-gray-400">{currency.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{currency.balance}</div>
                        <div className="text-sm text-gray-400">{currency.eurValue}</div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredFiat.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-lg">Aucune devise trouvée</p>
                      {hideZeroBalances && (
                        <p className="text-sm mt-2">Essayez de désactiver "Hide zero balances"</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BybitSpot
