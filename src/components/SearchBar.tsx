import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp } from 'lucide-react'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface SearchBarProps {
  activeTab: 'exchange' | 'forex'
}

const SearchBar: React.FC<SearchBarProps> = ({ activeTab }) => {
  const [searchValue, setSearchValue] = useState('')
  const { withHaptic } = useHapticFeedback()

  const hotSuggestions = activeTab === 'exchange' 
    ? ['🔥BTC/USDT', '🔥ETH/USDT', '🔥SOL/USDT']
    : ['🔥EUR/USD', '🔥GBP/USD', '🔥USD/JPY']

  return (
    <div className="px-4 py-3 bg-[#0a0a0a]">
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search pairs..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
        />
      </div>

      {/* Hot Suggestions */}
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-4 h-4 text-[#F7931A]" />
        <span className="text-xs text-gray-400">Hot:</span>
        <div className="flex space-x-2 overflow-x-auto">
          {hotSuggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              className="flex-shrink-0 px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded-full text-xs text-gray-300 hover:border-[#F7931A] hover:text-[#F7931A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={withHaptic(() => setSearchValue(suggestion.replace('🔥', '')), 'light')}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
