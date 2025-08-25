import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown, Star, MoreHorizontal } from 'lucide-react'

interface Quote {
  symbol: string
  displayName: string
  price: number
  dailyChange: number
  dailyChangePercent: number
  weeklyChangePercent: number
  spread: number
  high: number
  low: number
  time: string
  trend: 'up' | 'down' | 'neutral'
  sparklineData: number[]
  logo?: string
}

interface OptimizedMarketWatchProps {
  onSymbolSelect: (symbol: string) => void
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

const OptimizedMarketWatch: React.FC<OptimizedMarketWatchProps> = ({ onSymbolSelect, onOpenOrder }) => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [selectedTab, setSelectedTab] = useState('Popular')
  const [portfolioValue] = useState(8271.39)
  const [portfolioChange] = useState(+247.69)
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = ['Popular', 'Top', 'Favorites', 'All']

  // Génération de données sparkline plus réalistes
  const generateSparklineData = (basePrice: number, trend: 'up' | 'down' | 'neutral'): number[] => {
    const points = 15
    const data: number[] = []
    let currentPrice = basePrice * 0.995
    
    for (let i = 0; i < points; i++) {
      let change = 0
      
      if (trend === 'up') {
        change = (Math.random() - 0.2) * basePrice * 0.0012
      } else if (trend === 'down') {
        change = (Math.random() - 0.8) * basePrice * 0.0012
      } else {
        change = (Math.random() - 0.5) * basePrice * 0.0008
      }
      
      currentPrice += change
      data.push(currentPrice)
    }
    
    return data
  }

  useEffect(() => {
    initializeQuotes()
    const interval = setInterval(() => {
      updatePrices()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const initializeQuotes = () => {
    setLoading(true)
    const initialQuotes: Quote[] = [
      {
        symbol: 'EUR/USD',
        displayName: 'Euro',
        price: 1.0851,
        dailyChange: 0.0023,
        dailyChangePercent: 0.21,
        weeklyChangePercent: 0.15,
        spread: 0.8,
        high: 1.0874,
        low: 1.0832,
        time: new Date().toLocaleTimeString('fr-FR'),
        trend: 'up',
        sparklineData: [],
        logo: '🇪🇺'
      },
      {
        symbol: 'GBP/USD',
        displayName: 'British Pound',
        price: 1.2648,
        dailyChange: 0.0087,
        dailyChangePercent: 0.69,
        weeklyChangePercent: -0.45,
        spread: 1.2,
        high: 1.2689,
        low: 1.2598,
        time: new Date().toLocaleTimeString('fr-FR'),
        trend: 'up',
        sparklineData: [],
        logo: '🇬🇧'
      },
      {
        symbol: 'USD/JPY',
        displayName: 'Japanese Yen',
        price: 148.52,
        dailyChange: -0.68,
        dailyChangePercent: -0.46,
        weeklyChangePercent: 1.23,
        spread: 1.1,
        high: 149.34,
        low: 148.15,
        time: new Date().toLocaleTimeString('fr-FR'),
        trend: 'down',
        sparklineData: [],
        logo: '🇯🇵'
      },
      {
        symbol: 'AUD/USD',
        displayName: 'Australian Dollar',
        price: 0.6582,
        dailyChange: 0.0034,
        dailyChangePercent: 0.52,
        weeklyChangePercent: -0.89,
        spread: 1.3,
        high: 0.6598,
        low: 0.6561,
        time: new Date().toLocaleTimeString('fr-FR'),
        trend: 'up',
        sparklineData: [],
        logo: '🇦🇺'
      },
      {
        symbol: 'USD/CAD',
        displayName: 'Canadian Dollar',
        price: 1.3721,
        dailyChange: -0.0012,
        dailyChangePercent: -0.09,
        weeklyChangePercent: 0.34,
        spread: 1.4,
        high: 1.3745,
        low: 1.3701,
        time: new Date().toLocaleTimeString('fr-FR'),
        trend: 'neutral',
        sparklineData: [],
        logo: '🇨🇦'
      }
    ]

    // Générer les données sparkline pour chaque quote
    const quotesWithSparkline = initialQuotes.map(quote => ({
      ...quote,
      sparklineData: generateSparklineData(quote.price, quote.trend)
    }))

    setQuotes(quotesWithSparkline)
    setLoading(false)
  }

  const updatePrices = () => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => {
        const maxChange = quote.price * 0.0001
        const priceChange = (Math.random() - 0.5) * maxChange
        const newPrice = Math.max(0, quote.price + priceChange)
        
        const newDailyChange = quote.dailyChange + priceChange
        const newDailyChangePercent = (newDailyChange / (quote.price - quote.dailyChange)) * 100
        
        let trend: 'up' | 'down' | 'neutral' = 'neutral'
        if (priceChange > quote.price * 0.00005) trend = 'up'
        else if (priceChange < -quote.price * 0.00005) trend = 'down'
        
        // Mettre à jour le sparkline avec le nouveau prix
        const newSparklineData = [...quote.sparklineData.slice(1), newPrice]
        
        return {
          ...quote,
          price: newPrice,
          dailyChange: newDailyChange,
          dailyChangePercent: newDailyChangePercent,
          high: Math.max(quote.high, newPrice),
          low: Math.min(quote.low, newPrice),
          time: new Date().toLocaleTimeString('fr-FR'),
          trend,
          sparklineData: newSparklineData
        }
      })
    )
    setLastUpdate(new Date())
  }

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes('JPY')) {
      return price.toFixed(3)
    }
    return price.toFixed(5)
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-emerald-400' : 'text-red-400'
  }

  const getChangeColorBg = (change: number) => {
    return change >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'
  }

  const renderSparkline = (data: number[], isPositive: boolean, compact: boolean = false) => {
    if (data.length === 0) return null
    
    const width = compact ? 40 : 60
    const height = compact ? 16 : 24
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    }).join(' ')
    
    const color = isPositive ? '#34C759' : '#FF3B30'
    
    return (
      <div className="relative">
        <svg width={width} height={height} className="opacity-90">
          <defs>
            <linearGradient id={`gradient-${isPositive ? 'green' : 'red'}-${compact ? 'compact' : 'full'}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            points={`0,${height} ${points} ${width},${height}`}
            fill={`url(#gradient-${isPositive ? 'green' : 'red'}-${compact ? 'compact' : 'full'})`}
          />
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={compact ? "1.5" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen p-4 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-[#2C2C2E] rounded-xl animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white">
      {/* Header avec avatar et bienvenue */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">HP</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Bienvenue !</p>
              <p className="text-sm font-medium">Henry Potter</p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2C2C2E] rounded-full py-2.5 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20"
          />
        </div>
      </div>

      {/* Section Portfolio Principal */}
      <div className="px-4 mb-6">
        <p className="text-xs text-gray-400 mb-1">MAIN PORTFOLIO</p>
        <div className="mb-2">
          <motion.p 
            className="text-2xl font-bold text-white"
            key={portfolioValue}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ${portfolioValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
          </motion.p>
          <div className="flex items-center space-x-1">
            <ArrowUpRight className="w-3 h-3 text-[#34C759]" />
            <span className="text-sm text-[#34C759] font-medium">
              +${Math.abs(portfolioChange).toFixed(2)}
            </span>
            <span className="text-xs text-gray-400">(+3.08%)</span>
          </div>
        </div>

        {/* Boutons Withdraw/Deposit */}
        <div className="flex space-x-3 mb-6">
          <motion.button
            className="flex-1 bg-[#2C2C2E] rounded-lg py-2.5 text-sm font-medium text-white border border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Withdraw
          </motion.button>
          <motion.button
            className="flex-1 bg-[#2C2C2E] rounded-lg py-2.5 text-sm font-medium text-white border border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Deposit
          </motion.button>
        </div>
      </div>

      {/* Section My Funds */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">My Funds</h3>
          <span className="text-xs text-[#34C759] font-medium">Voir tout</span>
        </div>

        {/* Cartes horizontales défilantes */}
        <div className="flex space-x-3 mb-4 overflow-x-auto pb-2">
          {quotes.slice(0, 3).map((quote, index) => (
            <motion.div
              key={`card-${quote.symbol}`}
              className="flex-shrink-0 w-32 bg-[#2C2C2E] rounded-lg p-3 cursor-pointer"
              onClick={() => onSymbolSelect(quote.symbol)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{quote.logo}</span>
                <span className="text-xs font-medium text-white">{quote.displayName}</span>
              </div>
              <p className="text-sm font-bold text-white mb-1">
                ${quote.price.toFixed(quote.symbol.includes('JPY') ? 3 : 5)}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${quote.dailyChangePercent >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                  {quote.dailyChangePercent >= 0 ? '+' : ''}{quote.dailyChangePercent.toFixed(2)}%
                </span>
                {renderSparkline(quote.sparklineData, quote.dailyChangePercent >= 0, true)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Onglets de navigation */}
        <div className="flex space-x-1 mb-4 bg-[#2C2C2E] rounded-lg p-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                selectedTab === tab
                  ? 'bg-[#34C759] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Liste verticale des paires forex */}
        <div className="space-y-1">
          <AnimatePresence>
            {quotes.map((quote, index) => (
              <motion.div
                key={quote.symbol}
                className="bg-[#2C2C2E] rounded-lg p-3 cursor-pointer border border-transparent hover:border-[#34C759]/30 transition-all duration-200"
                onClick={() => onSymbolSelect(quote.symbol)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  {/* Section gauche */}
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                      <span className="text-sm">{quote.logo}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{quote.symbol}</p>
                      <p className="text-xs text-gray-400">{quote.displayName}</p>
                    </div>
                  </div>

                  {/* Section centre - Prix et graphique */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <motion.p 
                        className="text-sm font-bold text-white"
                        key={quote.price}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        ${formatPrice(quote.price, quote.symbol)}
                      </motion.p>
                      <p className={`text-xs font-medium ${quote.dailyChangePercent >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                        {quote.dailyChangePercent >= 0 ? '+' : ''}{quote.dailyChangePercent.toFixed(2)}%
                      </p>
                    </div>
                    {renderSparkline(quote.sparklineData, quote.dailyChangePercent >= 0, true)}
                  </div>

                  {/* Bouton favoris */}
                  <div className="ml-3">
                    <Star className="w-4 h-4 text-gray-500 hover:text-[#34C759] transition-colors cursor-pointer" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer avec statut */}
        <div className="text-center mt-6 pb-4">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-400 bg-[#2C2C2E] px-3 py-2 rounded-lg">
            <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse"></div>
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptimizedMarketWatch
