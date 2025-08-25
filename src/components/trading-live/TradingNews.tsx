import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Folder, Trash2, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  category: 'forex' | 'crypto' | 'stocks' | 'commodities' | 'central-banks'
  priority: 'high' | 'medium' | 'low'
  content: string
}

const TradingNews: React.FC = () => {
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Altcoin ETFs: The Next Wave of Crypto Investment Products',
      source: 'FXStreet',
      time: '2025.06.20 22:00',
      category: 'crypto',
      priority: 'high',
      content: 'Following the success of Bitcoin ETFs, financial institutions are now exploring altcoin ETF offerings...'
    },
    {
      id: '2',
      title: 'GBP/JPY Analysis: Technical Setup Suggests Further Downside',
      source: 'FXStreet',
      time: '2025.06.20 21:45',
      category: 'forex',
      priority: 'medium',
      content: 'The GBP/JPY pair continues to show bearish momentum as technical indicators point to potential...'
    },
    {
      id: '3',
      title: 'Ethereum Price Prediction: ETH Could Rally to $4,500 if This Happens',
      source: 'FXStreet',
      time: '2025.06.20 21:30',
      category: 'crypto',
      priority: 'high',
      content: 'Ethereum is showing strong technical patterns that could lead to a significant price breakout...'
    },
    {
      id: '4',
      title: 'WTI Oil Price Forecast: Bulls Eye $80 as Middle East Tensions Rise',
      source: 'FXStreet',
      time: '2025.06.20 21:15',
      category: 'commodities',
      priority: 'high',
      content: 'Crude oil prices are gaining momentum amid escalating geopolitical tensions in the Middle East...'
    },
    {
      id: '5',
      title: 'EUR/USD Weekly Outlook: ECB Decision in Focus, Key Levels to Watch',
      source: 'FXStreet',
      time: '2025.06.20 21:00',
      category: 'forex',
      priority: 'medium',
      content: 'The EUR/USD pair is approaching crucial levels ahead of the European Central Bank meeting...'
    },
    {
      id: '6',
      title: 'TRON (TRX) Price Analysis: Bullish Flag Pattern Targets $0.15',
      source: 'FXStreet',
      time: '2025.06.20 20:45',
      category: 'crypto',
      priority: 'medium',
      content: 'TRON is forming a bullish flag pattern that could indicate further upside potential...'
    },
    {
      id: '7',
      title: 'Dow Jones Industrial Average Hits New Record High on Tech Rally',
      source: 'FXStreet',
      time: '2025.06.20 20:30',
      category: 'stocks',
      priority: 'high',
      content: 'The Dow Jones reached unprecedented levels as technology stocks continue their upward trajectory...'
    },
    {
      id: '8',
      title: 'Banxico Rate Decision: Mexican Central Bank Expected to Hold at 10.5%',
      source: 'FXStreet',
      time: '2025.06.20 20:15',
      category: 'central-banks',
      priority: 'medium',
      content: 'The Bank of Mexico is widely expected to maintain its current interest rate stance...'
    },
    {
      id: '9',
      title: 'Dogecoin Price Prediction: DOGE Could Double if Musk Factor Returns',
      source: 'FXStreet',
      time: '2025.06.20 20:00',
      category: 'crypto',
      priority: 'high',
      content: 'Dogecoin shows potential for significant gains if historical patterns repeat...'
    },
    {
      id: '10',
      title: 'Iran Strike Fears Send Gold Prices Soaring to Monthly Highs',
      source: 'FXStreet',
      time: '2025.06.20 19:45',
      category: 'commodities',
      priority: 'high',
      content: 'Gold prices surge as safe-haven demand increases amid Middle East conflict concerns...'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Toutes', color: '#2196F3' },
    { id: 'forex', label: 'Forex', color: '#4CAF50' },
    { id: 'crypto', label: 'Crypto', color: '#F7931A' },
    { id: 'stocks', label: 'Actions', color: '#9C27B0' },
    { id: 'commodities', label: 'Matières', color: '#FF9800' },
    { id: 'central-banks', label: 'Banques', color: '#607D8B' }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-[#ef4444]'
      case 'medium': return 'border-l-[#F7931A]'
      case 'low': return 'border-l-[#22c55e]'
      default: return 'border-l-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.color || '#607D8B'
  }

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Menu className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Nouvelles</h2>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Folder className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Filtres de catégories */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap border transition-colors ${
              selectedCategory === category.id 
                ? 'border-current text-white' 
                : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
            style={{ 
              color: selectedCategory === category.id ? category.color : undefined,
              borderColor: selectedCategory === category.id ? category.color : undefined
            }}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Liste des actualités */}
      <div className="space-y-3">
        {filteredNews.map((item, index) => (
          <motion.article
            key={item.id}
            className={`bg-[#1a1a1a] rounded-xl p-4 border-l-4 border border-gray-800 ${getPriorityColor(item.priority)} cursor-pointer hover:bg-[#252525] transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getCategoryColor(item.category)}20`,
                    color: getCategoryColor(item.category)
                  }}
                >
                  {categories.find(c => c.id === item.category)?.label}
                </span>
                <span className="text-xs text-gray-400">{item.source}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            
            <h3 className="text-white font-medium mb-2 leading-tight">
              {item.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {item.content}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{item.time}</span>
              <div className={`w-2 h-2 rounded-full ${
                item.priority === 'high' ? 'bg-[#ef4444]' :
                item.priority === 'medium' ? 'bg-[#F7931A]' : 'bg-[#22c55e]'
              }`} />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Source et mise à jour */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
          <span>Actualités en temps réel - Source: FXStreet</span>
        </div>
      </div>
    </div>
  )
}

export default TradingNews
