import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ChevronDown, BarChart3, Eye, EyeOff } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import { useAccountData } from '../../hooks/useMarketData'

interface AssetTotalCardProps {
  showBalance: boolean
  onAction?: (actionId: string) => void
  className?: string
}

const AssetTotalCard: React.FC<AssetTotalCardProps> = ({ 
  showBalance, 
  onAction, 
  className = '' 
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [showDropdown, setShowDropdown] = useState(false)
  const { withHaptic } = useHapticFeedback()
  const { data: accountData } = useAccountData()

  const currencies = ['EUR', 'USD', 'XOF', 'GBP', 'RUB']
  
  const balances = {
    EUR: { 
      fiat: accountData?.totalBalance || '11,236.29', 
      crypto: accountData?.btcEquivalent || '0.11586374 BTC',
      change: '+2.47%',
      changeValue: '+€267.83'
    },
    USD: { 
      fiat: '12,547.83', 
      crypto: '0.11586374 BTC',
      change: '+2.47%',
      changeValue: '+$298.45'
    },
    XOF: { 
      fiat: '7,365,432', 
      crypto: '0.11586374 BTC',
      change: '+2.47%',
      changeValue: '+176,234 F'
    },
    GBP: { 
      fiat: '9,876.54', 
      crypto: '0.11586374 BTC',
      change: '+2.47%',
      changeValue: '+£234.12'
    },
    RUB: { 
      fiat: '1,156,789', 
      crypto: '0.11586374 BTC',
      change: '+2.47%',
      changeValue: '+28,567 ₽'
    }
  }

  const currentBalance = balances[selectedCurrency as keyof typeof balances]
  const isPositive = currentBalance.change.startsWith('+')

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      EUR: '€',
      USD: '$',
      XOF: 'F',
      GBP: '£',
      RUB: '₽'
    }
    return symbols[currency as keyof typeof symbols] || currency
  }

  return (
    <div className={className}>
      <Card className="bg-[#1a1a1a] border-gray-800 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Total des Actifs</span>
            <motion.div
              className="p-1 bg-[#F7931A]/10 rounded"
              whileHover={{ scale: 1.1 }}
            >
              <TrendingUp className="w-4 h-4 text-[#F7931A]" />
            </motion.div>
          </div>
        </div>

        {/* Balance Display */}
        <div className="flex items-end justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-3xl font-bold text-white">
                {showBalance ? 
                  `${getCurrencySymbol(selectedCurrency)}${currentBalance.fiat}` : 
                  '••••••••'
                }
              </span>
              
              {/* Currency Selector */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-1 text-[#F7931A] hover:text-[#FFA500] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">{selectedCurrency}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-1 left-0 bg-[#2a2a2a] border border-gray-700 rounded-lg py-1 z-20 min-w-[80px] shadow-lg"
                  >
                    {currencies.map((currency) => (
                      <motion.button
                        key={currency}
                        onClick={() => {
                          setSelectedCurrency(currency)
                          setShowDropdown(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors"
                        whileHover={{ backgroundColor: '#3a3a3a' }}
                      >
                        {currency}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* BTC Equivalent */}
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm text-gray-400">
                {showBalance ? `≈ ${currentBalance.crypto}` : '≈ ••••••••••••'}
              </span>
            </div>

            {/* Change */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {showBalance ? currentBalance.change : '••••'}
              </span>
              <span className={`text-xs ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {showBalance ? currentBalance.changeValue : '••••••'}
              </span>
            </div>
          </div>

          {/* Chart Icon */}
          <motion.div
            className="p-3 bg-gradient-to-br from-[#F7931A]/20 to-[#FFA500]/10 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction?.('portfolio-chart')}
          >
            <BarChart3 className="w-8 h-8 text-[#F7931A]" />
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-4">
          <motion.div 
            className="h-16 bg-gradient-to-r from-[#F7931A]/5 via-[#F7931A]/10 to-[#FFA500]/5 rounded-lg flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => onAction?.('detailed-chart')}
          >
            {/* Simulated Chart Line */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 300 60"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M10,45 Q75,30 150,35 T290,20"
                stroke="#F7931A"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M10,45 Q75,30 150,35 T290,20 L290,60 L10,60 Z"
                fill="url(#gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7931A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F7931A" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="relative z-10 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#F7931A]" />
              <span className="text-xs text-[#F7931A] font-medium">
                Performance 24h
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}

export default AssetTotalCard
