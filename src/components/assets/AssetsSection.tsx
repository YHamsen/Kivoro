import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  QrCode, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Plus, 
  Minus, 
  ArrowUpDown, 
  Send,
  CreditCard,
  Wallet,
  Building2,
  BarChart3,
  Coins,
  Banknote,
  Settings,
  History,
  Bell,
  Shield,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import { useAccountData } from '../../hooks/useMarketData'
import { COLORS, TAILWIND_COLORS } from '../../constants/colors'
import AssetTotalCard from './AssetTotalCard'
import MyCardSection from './MyCardSection'
import QuickActionsAssets from './QuickActionsAssets'
import MultiWalletSection from './MultiWalletSection'
import AssetPortfolioStats from './AssetPortfolioStats'

interface AssetsSectionProps {
  onAction?: (actionId: string) => void
  className?: string
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ onAction, className = '' }) => {
  const [showBalance, setShowBalance] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'account' | 'asset'>('asset')
  const [refreshing, setRefreshing] = useState(false)
  const { withHaptic } = useHapticFeedback()
  const { data: accountData } = useAccountData()

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simuler un refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
    onAction?.('refresh')
  }

  const handleToggleBalance = () => {
    withHaptic(() => setShowBalance(!showBalance), 'selection')()
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0a] ${className}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <motion.button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QrCode className="w-6 h-6" />
            </motion.button>
            <h1 className="text-xl font-bold text-white">Mes Actifs</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleToggleBalance}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
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
            
            <motion.button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QrCode className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Total Assets Card */}
        <AssetTotalCard 
          showBalance={showBalance}
          onAction={onAction}
          className="px-4 pt-4"
        />

        {/* My Card Section */}
        <MyCardSection 
          className="px-4 py-4"
          onAction={onAction}
        />

        {/* Quick Actions */}
        <QuickActionsAssets 
          className="px-4 pb-4"
          onAction={onAction}
        />

        {/* Account/Asset Toggle */}
        <div className="px-4 pb-4">
          <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800">
            <motion.button
              onClick={() => setSelectedTab('account')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                selectedTab === 'account'
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Comptes
            </motion.button>
            <motion.button
              onClick={() => setSelectedTab('asset')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                selectedTab === 'asset'
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Actifs
            </motion.button>
          </div>
        </div>

        {/* Multi-Wallet Section */}
        <MultiWalletSection 
          selectedTab={selectedTab}
          showBalance={showBalance}
          onAction={onAction}
          className="px-4"
        />

        {/* Portfolio Stats */}
        <AssetPortfolioStats 
          showBalance={showBalance}
          className="px-4 py-4"
        />

        {/* Additional Features */}
        <div className="px-4 py-4 space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3">Fonctionnalités</h3>
          
          {/* Savings Account */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Banknote className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Compte d'Épargne</h4>
                  <p className="text-sm text-gray-400">Rendement 4.5% APY</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {showBalance ? '€2,450.00' : '••••••'}
                </p>
                <p className="text-xs text-green-500">+€12.50 ce mois</p>
              </div>
            </div>
          </motion.div>

          {/* Staking */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Coins className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Staking</h4>
                  <p className="text-sm text-gray-400">3 actifs en staking</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {showBalance ? '€1,847.92' : '••••••'}
                </p>
                <p className="text-xs text-purple-500">+8.2% APY</p>
              </div>
            </div>
          </motion.div>

          {/* DeFi Lending */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Prêt DeFi</h4>
                  <p className="text-sm text-gray-400">Compound, Aave</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {showBalance ? '€5,234.67' : '••••••'}
                </p>
                <p className="text-xs text-blue-500">+12.8% APY</p>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Sécurité</h4>
                  <p className="text-sm text-gray-400">2FA activé</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Alerts & Notifications */}
          <motion.div
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Bell className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Alertes Prix</h4>
                  <p className="text-sm text-gray-400">5 alertes actives</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AssetsSection
