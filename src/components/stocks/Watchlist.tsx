import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, X } from 'lucide-react'
import { alpacaApi, WatchlistItem } from '../../services/alpacaApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface WatchlistProps {
  onStockSelect: (symbol: string) => void
  refreshTrigger?: number
}

const Watchlist: React.FC<WatchlistProps> = ({ onStockSelect, refreshTrigger }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadWatchlist()
  }, [refreshTrigger])

  const loadWatchlist = async () => {
    try {
      setLoading(true)
      const items = alpacaApi.getWatchlist()
      
      // If empty, add some default stocks
      if (items.length === 0) {
        const defaultStocks = ['AAPL', 'TSLA', 'AMZN']
        for (const symbol of defaultStocks) {
          await alpacaApi.addToWatchlist(symbol)
        }
        const updatedItems = alpacaApi.getWatchlist()
        setWatchlist(updatedItems)
      } else {
        setWatchlist(items)
      }
    } catch (error) {
      console.error('Failed to load watchlist:', error)
      // Set mock data
      setWatchlist([
        {
          id: '1',
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 168.28,
          change: 1.38,
          changePercent: 0.83,
          chart: [165, 167, 166, 169, 168, 170, 168.28]
        },
        {
          id: '2',
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 146.14,
          change: 2.18,
          changePercent: 1.51,
          chart: [142, 144, 145, 147, 146, 148, 146.14]
        },
        {
          id: '3',
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          price: 183.49,
          change: 1.80,
          changePercent: 0.99,
          chart: [180, 182, 181, 184, 183, 185, 183.49]
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    withHaptic(() => {
      alpacaApi.removeFromWatchlist(symbol)
      setWatchlist(prev => prev.filter(item => item.symbol !== symbol))
    }, 'medium')()
  }

  const MiniChart: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
    if (!data || data.length === 0) return null

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const pathData = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 60
        const y = 20 - ((value - min) / range) * 16
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')

    return (
      <svg width="60" height="20" className="overflow-visible">
        <path
          d={pathData}
          stroke={isPositive ? '#00D4AA' : '#FF4757'}
          strokeWidth="2"
          fill="none"
          className="drop-shadow-sm"
        />
      </svg>
    )
  }

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">WATCHLIST</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                    <div className="w-24 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h3 className="text-white text-lg font-semibold mb-4">WATCHLIST</h3>
      <div className="space-y-3">
        {watchlist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#00D4AA]/50 transition-all duration-200 group cursor-pointer"
            onClick={withHaptic(() => onStockSelect(item.symbol), 'light')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {item.symbol.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{item.symbol}</h4>
                  <p className="text-gray-400 text-xs">{item.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MiniChart data={item.chart} isPositive={item.changePercent >= 0} />
                  <div className="flex items-center">
                    {item.changePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-[#00D4AA]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-white font-medium text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className={`text-xs ${item.changePercent >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </p>
                </div>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromWatchlist(item.symbol)
                  }}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3 text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {watchlist.length === 0 && (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">
              Votre liste de surveillance est vide
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Recherchez des actions pour les ajouter
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
