import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Filter } from 'lucide-react'

interface P2PFiltersProps {
  filters: {
    crypto: string
    fiatCurrency: string
    amount: string
    paymentMethod: 'all' | 'revolut' | 'sepa' | 'bank' | 'wise' | 'western'
  }
  setFilters: (filters: any) => void
  transactionType: 'buy' | 'sell'
}

const cryptoOptions = ['USDT', 'BTC', 'ETH', 'BNB', 'ADA']
const fiatOptions = ['EUR', 'USD', 'GBP', 'RUB', 'CNY']
const paymentMethods = [
  { value: 'all', label: 'Toutes méthodes' },
  { value: 'revolut', label: 'Revolut' },
  { value: 'sepa', label: 'SEPA Instant' },
  { value: 'bank', label: 'Virement bancaire' },
  { value: 'wise', label: 'Wise' },
  { value: 'western', label: 'Western Union' }
]

const P2PFilters: React.FC<P2PFiltersProps> = ({ filters, setFilters, transactionType }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  return (
    <div className="px-4 mb-4">
      {/* Filtres principaux */}
      <div className="flex items-center space-x-2 mb-3">
        {/* Crypto selector */}
        <div className="relative">
          <select
            value={filters.crypto}
            onChange={(e) => setFilters({ ...filters, crypto: e.target.value })}
            className="bg-[#2d2d2d] text-white px-3 py-2 pr-8 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
          >
            {cryptoOptions.map(crypto => (
              <option key={crypto} value={crypto}>{crypto}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Amount */}
        <motion.button
          className="bg-[#2d2d2d] text-gray-400 px-3 py-2 rounded-lg text-sm flex items-center space-x-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Montant</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>

        {/* Payment methods */}
        <div className="relative flex-1">
          <select
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
            className="w-full bg-[#2d2d2d] text-white px-3 py-2 pr-8 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
          >
            {paymentMethods.map(method => (
              <option key={method.value} value={method.value}>{method.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Fiat currency */}
        <div className="relative">
          <select
            value={filters.fiatCurrency}
            onChange={(e) => setFilters({ ...filters, fiatCurrency: e.target.value })}
            className="bg-[#2d2d2d] text-white px-3 py-2 pr-8 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
          >
            {fiatOptions.map(fiat => (
              <option key={fiat} value={fiat}>{fiat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter button */}
        <motion.button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="bg-[#2d2d2d] p-2 rounded-lg relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F7931A] rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </motion.button>
      </div>

      {/* Filtres avancés */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800"
        >
          <h4 className="text-white font-medium mb-3">Filtres avancés</h4>
          
          <div className="space-y-3">
            {/* Montant minimum/maximum */}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="flex-1 bg-[#2d2d2d] text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
              />
              <input
                type="number"
                placeholder="Max"
                className="flex-1 bg-[#2d2d2d] text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
              />
            </div>

            {/* Options de vérification */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-[#F7931A]" />
                <span className="text-sm text-gray-300">Exclure les annonces nécessitant une vérification</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-[#F7931A]" />
                <span className="text-sm text-gray-300">Marchands vérifiés uniquement</span>
              </label>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default P2PFilters
