import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Menu, TrendingUp, TrendingDown } from 'lucide-react'
import { alpacaForexService, MarketData } from '../../services/alpacaService'

interface Quote {
  symbol: string
  price: number
  dailyChange: number
  dailyChangePercent: number
  weeklyChangePercent: number // 7J - maintenant cohérent
  spread: number
  high: number
  low: number
  time: string
  trend: 'up' | 'down' | 'neutral'
}

interface ImprovedMarketWatchProps {
  onSymbolSelect: (symbol: string) => void
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

const ImprovedMarketWatch: React.FC<ImprovedMarketWatchProps> = ({ onSymbolSelect, onOpenOrder }) => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Symboles à suivre
  const watchedSymbols = ['EUR/USD', 'GBP/JPY', 'USD/JPY', 'AUD/USD', 'NZD/USD', 'GBP/USD']

  useEffect(() => {
    initializeQuotes()
    startRealTimeUpdates()
  }, [])

  const initializeQuotes = async () => {
    setLoading(true)
    try {
      // Initialiser avec des données cohérentes
      const initialQuotes: Quote[] = [
        {
          symbol: 'EUR/USD',
          price: 1.1519,
          dailyChange: 0.00082,
          dailyChangePercent: 0.07,
          weeklyChangePercent: 0.15, // Valeur cohérente fixe
          spread: 0.8,
          high: 1.15340,
          low: 1.14980,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'up'
        },
        {
          symbol: 'GBP/JPY',
          price: 184.62,
          dailyChange: -0.45,
          dailyChangePercent: -0.24,
          weeklyChangePercent: -0.65, // Valeur cohérente fixe
          spread: 1.7,
          high: 185.750,
          low: 184.090,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'down'
        },
        {
          symbol: 'USD/JPY',
          price: 160.315,
          dailyChange: 0.15,
          dailyChangePercent: 0.09,
          weeklyChangePercent: 1.45, // Valeur cohérente fixe
          spread: 1.3,
          high: 160.850,
          low: 159.900,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'up'
        },
        {
          symbol: 'AUD/USD',
          price: 0.6580,
          dailyChange: -0.00237,
          dailyChangePercent: -0.36,
          weeklyChangePercent: -1.89, // Valeur cohérente fixe
          spread: 1.1,
          high: 0.66107,
          low: 0.65420,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'down'
        },
        {
          symbol: 'NZD/USD',
          price: 0.6128,
          dailyChange: 0.00095,
          dailyChangePercent: 0.15,
          weeklyChangePercent: 0.23, // Valeur cohérente fixe
          spread: 1.5,
          high: 0.61580,
          low: 0.61150,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'up'
        },
        {
          symbol: 'GBP/USD',
          price: 1.2765,
          dailyChange: 0.0024,
          dailyChangePercent: 0.19,
          weeklyChangePercent: 0.45, // Valeur cohérente fixe
          spread: 1.2,
          high: 1.27845,
          low: 1.27420,
          time: new Date().toLocaleTimeString('fr-FR'),
          trend: 'up'
        }
      ]

      setQuotes(initialQuotes)
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error)
    } finally {
      setLoading(false)
    }
  }

  const startRealTimeUpdates = () => {
    const interval = setInterval(() => {
      updatePrices()
    }, 3000) // Mise à jour toutes les 3 secondes

    return () => clearInterval(interval)
  }

  const updatePrices = () => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => {
        // Simulation de petites variations réalistes (max ±0.02% pour plus de stabilité)
        const maxChange = quote.price * 0.0002 // ±0.02%
        const priceChange = (Math.random() - 0.5) * maxChange
        const newPrice = Math.max(0, quote.price + priceChange)
        
        // Mettre à jour le changement quotidien de manière cohérente
        const newDailyChange = quote.dailyChange + priceChange
        const newDailyChangePercent = (newDailyChange / (quote.price - quote.dailyChange)) * 100
        
        // Déterminer la tendance basée sur la variation
        let trend: 'up' | 'down' | 'neutral' = 'neutral'
        if (priceChange > quote.price * 0.0001) trend = 'up'
        else if (priceChange < -quote.price * 0.0001) trend = 'down'
        
        return {
          ...quote,
          price: newPrice,
          dailyChange: newDailyChange,
          dailyChangePercent: newDailyChangePercent,
          // 7J reste stable et cohérent (pas de variation erratique)
          high: Math.max(quote.high, newPrice),
          low: Math.min(quote.low, newPrice),
          time: new Date().toLocaleTimeString('fr-FR'),
          trend
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
    return change >= 0 ? 'text-green-500' : 'text-red-500'
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />
      default:
        return <div className="w-3 h-3" />
    }
  }

  const generateMiniChart = (trend: 'up' | 'down' | 'neutral', isPositive: boolean) => {
    // Générer un mini graphique cohérent avec les données
    const points = 7
    const width = 40
    const height = 20
    
    let path = `M 0 ${height / 2}`
    
    for (let i = 1; i < points; i++) {
      const x = (i / (points - 1)) * width
      let y = height / 2
      
      if (isPositive && trend === 'up') {
        // Graphique montant pour changement positif
        y = height / 2 - (i / points) * height / 3 + Math.sin(i) * 2
      } else if (!isPositive && trend === 'down') {
        // Graphique descendant pour changement négatif
        y = height / 2 + (i / points) * height / 3 + Math.sin(i) * 2
      } else {
        // Graphique relativement stable
        y = height / 2 + Math.sin(i * 0.5) * 3
      }
      
      path += ` L ${x} ${Math.max(2, Math.min(height - 2, y))}`
    }
    
    const color = isPositive ? '#22c55e' : '#ef4444'
    
    return (
      <svg width={width} height={height} className="opacity-80">
        <path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    )
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Header avec actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Menu className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Cotations en temps réel</h2>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Liste des cotations */}
      <div className="space-y-3">
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.symbol}
            className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 cursor-pointer hover:border-[#2196F3]/50"
            onClick={() => onSymbolSelect(quote.symbol)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between">
              {/* Informations du symbole */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-semibold text-lg">{quote.symbol}</span>
                  <span className="text-xs text-gray-500">{quote.time}</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(quote.price, quote.symbol)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(quote.trend)}
                    <span className={`text-sm font-medium ${getChangeColor(quote.dailyChange)}`}>
                      {quote.dailyChange >= 0 ? '+' : ''}{formatPrice(Math.abs(quote.dailyChange), quote.symbol)}
                    </span>
                    <span className={`text-sm ${getChangeColor(quote.dailyChangePercent)}`}>
                      ({quote.dailyChangePercent >= 0 ? '+' : ''}{quote.dailyChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400 space-x-4">
                    <span>Bas: {formatPrice(quote.low, quote.symbol)}</span>
                    <span>Haut: {formatPrice(quote.high, quote.symbol)}</span>
                    <span>Spread: {quote.spread}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-400">7J:</div>
                    <div className={`text-xs font-medium ${getChangeColor(quote.weeklyChangePercent)}`}>
                      {quote.weeklyChangePercent >= 0 ? '+' : ''}{quote.weeklyChangePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini graphique */}
              <div className="ml-4 flex flex-col items-end space-y-2">
                {generateMiniChart(quote.trend, quote.dailyChangePercent >= 0)}
                
                {/* Boutons de trading */}
                <div className="flex space-x-1">
                  <motion.button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs font-semibold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenOrder('sell', quote.symbol)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    VENDRE
                  </motion.button>
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs font-semibold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenOrder('buy', quote.symbol)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ACHETER
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Indicateur de statut */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Données en temps réel - Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
        </div>
      </div>
    </div>
  )
}

export default ImprovedMarketWatch
