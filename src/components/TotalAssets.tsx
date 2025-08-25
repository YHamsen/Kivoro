import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, TrendingUp, Eye, EyeOff } from 'lucide-react'
import { useAccountData } from '../hooks/useMarketData'

const TotalAssets: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [showBalance, setShowBalance] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: accountData } = useAccountData()

  const currencies = ['XOF', 'EUR', 'USD', 'GBP', 'RUB']
  const balances = {
    EUR: { fiat: accountData?.totalBalance || '11,236.29', crypto: accountData?.btcEquivalent || '0.11586374 BTC' },
    USD: { fiat: accountData?.alpacaBalance || '12,547.83', crypto: accountData?.btcEquivalent || '0.11586374 BTC' },
    GBP: { fiat: '9,876.54', crypto: accountData?.btcEquivalent || '0.11586374 BTC' },
    XOF: { fiat: '7,365,432', crypto: accountData?.btcEquivalent || '0.11586374 BTC' },
    RUB: { fiat: '1,156,789', crypto: accountData?.btcEquivalent || '0.11586374 BTC' }
  }

  const currentBalance = balances[selectedCurrency as keyof typeof balances]

  return (
    <div className="px-4 py-4 bg-[#0a0a0a]">
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Total Assets</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-white">
                    {showBalance ? `${currentBalance.fiat}` : '••••••'}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-1 text-[#F7931A] hover:text-[#FFA500] transition-colors"
                    >
                      <span className="text-sm font-medium">{selectedCurrency}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-1 left-0 bg-[#2d2d2d] border border-gray-700 rounded-lg py-1 z-10 min-w-[80px]"
                      >
                        {currencies.map((currency) => (
                          <button
                            key={currency}
                            onClick={() => {
                              setSelectedCurrency(currency)
                              setShowDropdown(false)
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#3d3d3d] transition-colors"
                          >
                            {currency}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {showBalance ? `≈ ${currentBalance.crypto}` : '≈ ••••••••••••'}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            className="bg-[#F7931A] hover:bg-[#FFA500] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Deposit
          </motion.button>
        </div>

        {/* Balance Trend Chart Placeholder */}
        <div className="mt-4 h-12 bg-gradient-to-r from-[#F7931A]/10 to-[#FFA500]/10 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-[#F7931A]" />
        </div>
      </div>
    </div>
  )
}

export default TotalAssets
