import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Plus, TrendingUp, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { kivoroBalanceApi, KivoroBalance } from '../services/kivoroBalanceApi'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface KivoroBalanceCardProps {
  refreshTrigger?: number
}

const KivoroBalanceCard: React.FC<KivoroBalanceCardProps> = ({ refreshTrigger = 0 }) => {
  const [balance, setBalance] = useState<KivoroBalance | null>(null)
  const [loading, setLoading] = useState(true)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadBalance()
  }, [refreshTrigger])

  const loadBalance = async () => {
    try {
      setLoading(true)
      const currentBalance = await kivoroBalanceApi.getBalance()
      setBalance(currentBalance)
    } catch (error) {
      console.error('Failed to load balance:', error)
      toast.error('Failed to load balance')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = withHaptic(async () => {
    setRefreshing(true)
    await loadBalance()
    setTimeout(() => setRefreshing(false), 500)
  }, 'light')

  const handleTopUp = withHaptic(() => {
    // For demo purposes, add $500 to balance
    kivoroBalanceApi.topUpBalance(500).then((result) => {
      if (result.success) {
        toast.success('Balance topped up successfully!')
        loadBalance()
      } else {
        toast.error(result.error || 'Failed to top up balance')
      }
    })
  }, 'medium')

  const toggleBalanceVisibility = withHaptic(() => {
    setBalanceVisible(!balanceVisible)
  }, 'light')

  const formatBalanceDisplay = (amount: number) => {
    if (!balanceVisible) return '••••••'
    return kivoroBalanceApi.formatCurrency(amount)
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-800 rounded-2xl p-6 mb-6"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
              <div>
                <div className="w-20 h-4 bg-gray-700 rounded mb-2"></div>
                <div className="w-16 h-3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="w-16 h-8 bg-gray-700 rounded"></div>
          </div>
          <div className="w-32 h-8 bg-gray-700 rounded"></div>
        </div>
      </motion.div>
    )
  }

  if (!balance) return null

  const isLowBalance = balance.availableBalance < 100

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-800 rounded-2xl p-6 mb-6 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00D4AA] to-[#00B893] rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Kivoro Balance</h3>
            <p className="text-gray-400 text-xs">
              Updated {new Date(balance.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={toggleBalanceVisibility}
            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {balanceVisible ? (
              <Eye className="w-4 h-4 text-white" />
            ) : (
              <EyeOff className="w-4 h-4 text-white" />
            )}
          </motion.button>
          
          <motion.button
            onClick={handleRefresh}
            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={refreshing ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Balance Display */}
      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-sm mb-1">Available Balance</p>
          <h2 className="text-white text-3xl font-bold">
            {formatBalanceDisplay(balance.availableBalance)}
          </h2>
        </div>

        {balance.lockedBalance > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Locked Balance</span>
            <span className="text-gray-300">
              {formatBalanceDisplay(balance.lockedBalance)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Balance</span>
          <span className="text-white font-medium">
            {formatBalanceDisplay(balance.totalBalance)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 mt-6">
        <motion.button
          onClick={handleTopUp}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-colors ${
            isLowBalance
              ? 'bg-[#F7931A] hover:bg-[#e8851a] text-white'
              : 'bg-[#00D4AA] hover:bg-[#00B893] text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span>Top Up</span>
        </motion.button>

        <motion.button
          onClick={() => toast.success('Transaction history coming soon!')}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TrendingUp className="w-4 h-4" />
          <span>History</span>
        </motion.button>
      </div>

      {/* Low Balance Warning */}
      {isLowBalance && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-lg"
        >
          <p className="text-[#F7931A] text-sm">
            💡 Low balance detected. Top up to continue trading seamlessly.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default KivoroBalanceCard
