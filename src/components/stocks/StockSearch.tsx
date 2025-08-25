import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import { alpacaApi, Stock } from '../../services/alpacaApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface StockSearchProps {
  onAddToWatchlist: (symbol: string) => void
}

const StockSearch: React.FC<StockSearchProps> = ({ onAddToWatchlist }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Stock[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { withHaptic } = useHapticFeedback()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.length >= 1) {
        setIsSearching(true)
        try {
          const searchResults = await alpacaApi.searchStocks(query)
          setResults(searchResults)
          setShowResults(true)
        } catch (error) {
          console.error('Search failed:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddToWatchlist = (symbol: string) => {
    withHaptic(() => {
      onAddToWatchlist(symbol)
      setQuery('')
      setShowResults(false)
    }, 'medium')()
  }

  return (
    <div ref={searchRef} className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks"
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4AA] transition-colors"
          onFocus={() => query && setShowResults(true)}
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[#00D4AA] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            {results.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-[#2d2d2d] transition-colors border-b border-gray-800 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {stock.symbol.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{stock.symbol}</h4>
                    <p className="text-gray-400 text-xs truncate max-w-40">
                      {stock.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-white font-medium text-sm">
                      ${stock.price.toFixed(2)}
                    </p>
                    <p className={`text-xs ${stock.changePercent >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleAddToWatchlist(stock.symbol)}
                    className="w-8 h-8 bg-[#00D4AA] rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StockSearch
