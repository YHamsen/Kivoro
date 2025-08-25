import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, DollarSign, BarChart3, RefreshCw, Users, Send, History } from 'lucide-react'
import { multiWalletService, UnifiedBalance, UnifiedTicker, WalletType, WALLET_COLORS, WALLET_NAMES } from '../services/multiWalletService'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'
import BybitWalletSection from './BybitWalletSection'
import OKXWalletSection from './OKXWalletSection'
import BinanceWalletSection from './BinanceWalletSection'
import AlpacaWalletSection from './AlpacaWalletSection'
import WalletBalanceCard from './WalletBalanceCard'
import MultiWalletTransfer from './MultiWalletTransfer'
import UnifiedOrderHistory from './UnifiedOrderHistory'

interface MultiWalletDashboardProps {
  refreshTrigger?: number
}

const MultiWalletDashboard: React.FC<MultiWalletDashboardProps> = ({ refreshTrigger = 0 }) => {
  const [allBalances, setAllBalances] = useState<UnifiedBalance[]>([])
  const [allTickers, setAllTickers] = useState<UnifiedTicker[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'bybit' | 'okx' | 'binance' | 'alpaca' | 'transfer' | 'history'>('overview')
  const { withHaptic } = useHapticFeedback()

  // Calcul du total en USD de tous les wallets
  const totalUsdValue = allBalances.reduce((sum, balance) => {
    return sum + parseFloat(balance.usdValue || '0')
  }, 0)

  // Statistiques par wallet
  const walletStats = Object.keys(WALLET_COLORS).map(wallet => {
    const walletBalances = allBalances.filter(b => b.wallet === wallet)
    const walletTotal = walletBalances.reduce((sum, b) => sum + parseFloat(b.usdValue || '0'), 0)
    return {
      wallet: wallet as WalletType,
      name: WALLET_NAMES[wallet as WalletType],
      color: WALLET_COLORS[wallet as WalletType],
      total: walletTotal,
      percentage: totalUsdValue > 0 ? (walletTotal / totalUsdValue) * 100 : 0,
      assetsCount: walletBalances.length
    }
  }).filter(stat => stat.total > 0) // Filtrer les wallets sans balance

  useEffect(() => {
    loadAllData()
  }, [refreshTrigger])

  const loadAllData = async () => {
    try {
      setLoading(true)
      const [balances, tickers] = await Promise.all([
        multiWalletService.getAllBalances(),
        multiWalletService.getAllMarketTickers()
      ])
      setAllBalances(balances)
      setAllTickers(tickers)
    } catch (error) {
      console.error('Erreur lors du chargement des données multi-wallet:', error)
      toast.error('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = withHaptic(async () => {
    setRefreshing(true)
    await loadAllData()
    setTimeout(() => setRefreshing(false), 500)
  }, 'light')

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-8 h-8 text-blue-500" />
        </motion.div>
        <p className="text-slate-400">Chargement des données multi-wallet...</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* En-tête avec statistiques globales */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-3 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Multi-Wallet Kivoro</h1>
              <p className="text-slate-400">Gestion unifiée de vos actifs</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-white ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Valeur totale */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">
            ${totalUsdValue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-slate-400">Valeur totale portfolio</p>
        </div>

        {/* Répartition par wallet */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {walletStats.map((stat) => (
            <motion.div
              key={stat.wallet}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-600"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-sm font-medium text-white">{stat.name}</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">
                ${stat.total.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-slate-400">
                {stat.percentage.toFixed(1)}% • {stat.assetsCount} actifs
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-slate-900 rounded-xl p-2 border border-slate-700">
        <div className="grid grid-cols-7 gap-1">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
            { id: 'bybit', label: 'Bybit', icon: DollarSign },
            { id: 'okx', label: 'OKX', icon: TrendingUp },
            { id: 'binance', label: 'Binance', icon: Wallet },
            { id: 'alpaca', label: 'Alpaca', icon: BarChart3 },
            { id: 'transfer', label: 'Transfert', icon: Send },
            { id: 'history', label: 'Historique', icon: History }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cartes de balance par wallet */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {walletStats.map((stat) => (
                <WalletBalanceCard
                  key={stat.wallet}
                  wallet={stat.wallet}
                  balances={allBalances.filter(b => b.wallet === stat.wallet)}
                  totalValue={stat.total}
                />
              ))}
            </div>

            {/* Top assets par valeur */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Top Assets par Valeur
              </h3>
              <div className="space-y-3">
                {allBalances
                  .filter(balance => parseFloat(balance.usdValue) > 1)
                  .sort((a, b) => parseFloat(b.usdValue) - parseFloat(a.usdValue))
                  .slice(0, 8)
                  .map((balance, index) => (
                    <div key={`${balance.wallet}-${balance.coin}`} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-slate-400 text-sm w-6">#{index + 1}</div>
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: balance.walletColor }}
                        />
                        <div>
                          <div className="text-white font-medium">{balance.coin}</div>
                          <div className="text-slate-400 text-sm">{WALLET_NAMES[balance.wallet]}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${parseFloat(balance.usdValue).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</div>
                        <div className="text-slate-400 text-sm">{balance.balance}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bybit' && <BybitWalletSection balances={allBalances.filter(b => b.wallet === 'bybit')} tickers={allTickers.filter(t => t.wallet === 'bybit')} />}
        {activeTab === 'okx' && <OKXWalletSection balances={allBalances.filter(b => b.wallet === 'okx')} tickers={allTickers.filter(t => t.wallet === 'okx')} />}
        {activeTab === 'binance' && <BinanceWalletSection balances={allBalances.filter(b => b.wallet === 'binance')} tickers={allTickers.filter(t => t.wallet === 'binance')} />}
        {activeTab === 'alpaca' && <AlpacaWalletSection balances={allBalances.filter(b => b.wallet === 'alpaca')} tickers={allTickers.filter(t => t.wallet === 'alpaca')} />}
        {activeTab === 'transfer' && <MultiWalletTransfer />}
        {activeTab === 'history' && <UnifiedOrderHistory />}
      </motion.div>
    </div>
  )
}

export default MultiWalletDashboard
