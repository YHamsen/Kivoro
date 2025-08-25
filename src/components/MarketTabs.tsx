import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, TrendingDown, Volume2 } from 'lucide-react'
import { useMarketData } from '../hooks/useMarketData'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface MarketData {
  symbol: string
  price: string
  change: string
  changePercent: string
  volume?: string
  marketCap?: string
  spread?: string
  isFavorite?: boolean
}

interface MarketTabsProps {
  activeTab: 'exchange' | 'forex'
}

const MarketTabs: React.FC<MarketTabsProps> = ({ activeTab }) => {
  const [activeMarketTab, setActiveMarketTab] = useState('favorites')
  const { data: marketData, isLoading: loading } = useMarketData(activeTab)
  const { withHaptic } = useHapticFeedback()

  const tabs = [
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'new', label: 'New', icon: null },
    { id: 'gainers', label: 'Gainers', icon: TrendingUp },
    { id: 'losers', label: 'Losers', icon: TrendingDown },
    { id: 'volume', label: 'Volume', icon: Volume2 }
  ]

  const currentData = (marketData && marketData[activeMarketTab]) ? marketData[activeMarketTab] : []

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    if (num > 1000) return num.toLocaleString()
    if (num > 1) return num.toFixed(2)
    return price
  }

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-500' : 'text-red-500'
  }

  if (loading) {
    return (
      <div className="px-4 py-4 bg-[#0a0a0a]">
        <div className="animate-pulse space-y-4">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 bg-gray-700 rounded w-16"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 bg-[#0a0a0a] flex-1">
      {/* Market Tabs */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={withHaptic(() => setActiveMarketTab(tab.id), 'selection')}
              className={`flex-shrink-0 flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeMarketTab === tab.id
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span>{tab.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Market Data Table */}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-400 bg-[#1a1a1a] rounded-lg">
          <span className="flex-1">Trading Pair</span>
          <span className="w-20 text-right">Price</span>
          <span className="w-20 text-right">24h Change</span>
          {activeTab === 'exchange' ? (
            <span className="w-20 text-right">Volume</span>
          ) : (
            <span className="w-16 text-right">Spread</span>
          )}
        </div>

        {/* Data Rows */}
        {currentData.map((item, index) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={withHaptic(() => {
              console.log(`Selected ${item.symbol}`)
              // Here you can add navigation to trading page or detailed view
            }, 'light')}
            className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#2d2d2d] transition-colors cursor-pointer"
          >
            <div className="flex-1 flex items-center space-x-3">
              {item.isFavorite && (
                <Star className="w-4 h-4 text-[#F7931A] fill-current" />
              )}
              <div>
                <span className="text-white font-medium">{item.symbol}</span>
                {activeTab === 'exchange' && item.marketCap && (
                  <div className="text-xs text-gray-400">{item.marketCap}</div>
                )}
              </div>
            </div>

            <div className="w-20 text-right">
              <span className="text-white font-medium">
                {formatPrice(item.price)}
              </span>
            </div>

            <div className={`w-20 text-right ${getChangeColor(item.change)}`}>
              <span className="font-medium">{item.changePercent}%</span>
            </div>

            <div className="w-20 text-right text-gray-400 text-sm">
              {activeTab === 'exchange' ? item.volume : `${item.spread}pts`}
            </div>
          </motion.div>
        ))}

        {currentData.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketTabs
