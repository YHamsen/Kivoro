import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Menu } from 'lucide-react'

interface Quote {
  symbol: string
  bid: number
  ask: number
  spread: number
  high: number
  low: number
  time: string
  change: number
  changePercent: number
  digits: number
  pipPosition: number
}

interface MarketWatchProps {
  onSymbolSelect: (symbol: string) => void
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

const MarketWatch: React.FC<MarketWatchProps> = ({ onSymbolSelect, onOpenOrder }) => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      symbol: 'EURUSDm',
      bid: 1.15162,
      ask: 1.15222,
      spread: 6.0,
      high: 1.15340,
      low: 1.14980,
      time: '20:58:45',
      change: 0.00082,
      changePercent: 0.071,
      digits: 5,
      pipPosition: 4
    },
    {
      symbol: 'GBPJPYm',
      bid: 184.54,
      ask: 184.71,
      spread: 17,
      high: 185.75,
      low: 184.09,
      time: '20:58:44',
      change: -0.45,
      changePercent: -0.244,
      digits: 3,
      pipPosition: 2
    },
    {
      symbol: 'USDJPYm',
      bid: 160.25,
      ask: 160.38,
      spread: 13,
      high: 160.85,
      low: 159.90,
      time: '20:58:43',
      change: 0.15,
      changePercent: 0.094,
      digits: 3,
      pipPosition: 2
    },
    {
      symbol: 'AUDUSDm',
      bid: 0.76570,
      ask: 0.76590,
      spread: 2.0,
      high: 0.77107,
      low: 0.76420,
      time: '20:58:42',
      change: -0.00237,
      changePercent: -0.308,
      digits: 5,
      pipPosition: 4
    },
    {
      symbol: 'NZDUSDm',
      bid: 0.64280,
      ask: 0.64310,
      spread: 3.0,
      high: 0.64580,
      low: 0.64150,
      time: '20:58:41',
      change: 0.00095,
      changePercent: 0.148,
      digits: 5,
      pipPosition: 4
    },
    {
      symbol: 'ABBVm',
      bid: 184.54,
      ask: 184.71,
      spread: 378,
      high: 185.75,
      low: 184.09,
      time: '19:44:51',
      change: -0.45,
      changePercent: -0.244,
      digits: 2,
      pipPosition: 1
    }
  ])

  // Simulation de mise à jour des prix en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(prevQuotes => 
        prevQuotes.map(quote => ({
          ...quote,
          bid: quote.bid + (Math.random() - 0.5) * 0.0001,
          ask: quote.ask + (Math.random() - 0.5) * 0.0001,
          time: new Date().toLocaleTimeString()
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, quote: Quote) => {
    const priceStr = price.toFixed(quote.digits)
    const pipetteDigit = priceStr[priceStr.length - 1]
    const mainPrice = priceStr.slice(0, -1)
    
    return {
      mainPrice,
      pipette: pipetteDigit
    }
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
  }

  return (
    <div className="p-4">
      {/* Header avec actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Menu className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Cotations</h2>
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
        {/* Spread line at top */}
        <motion.div
          className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Spread: {quotes[5]?.spread || 378}</span>
            <div className="flex space-x-4">
              <span>Low: {quotes[5]?.low.toFixed(2) || '184.09'}</span>
              <span>High: {quotes[5]?.high.toFixed(2) || '185.75'}</span>
            </div>
          </div>
        </motion.div>

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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold">{quote.symbol}</span>
                <span className="text-xs text-gray-500">{quote.time}</span>
              </div>
              <div className="text-xs text-gray-500">
                Spread: {quote.spread}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-4">
                <motion.button
                  className="bg-[#2196F3] hover:bg-[#1976D2] px-5 py-2 rounded text-white font-bold text-lg transition-colors flex items-baseline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenOrder('sell', quote.symbol)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{formatPrice(quote.bid, quote).mainPrice}</span>
                  <span className="text-sm text-gray-300 ml-1">{formatPrice(quote.bid, quote).pipette}</span>
                </motion.button>
                <motion.button
                  className="bg-[#2196F3] hover:bg-[#1976D2] px-5 py-2 rounded text-white font-bold text-lg transition-colors flex items-baseline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenOrder('buy', quote.symbol)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{formatPrice(quote.ask, quote).mainPrice}</span>
                  <span className="text-sm text-gray-300 ml-1">{formatPrice(quote.ask, quote).pipette}</span>
                </motion.button>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Low: {quote.low.toFixed(quote.digits)}</span>
              <span>High: {quote.high.toFixed(quote.digits)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Indicateur de mise à jour en temps réel */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
          <span>Cotations en temps réel</span>
        </div>
      </div>
    </div>
  )
}

export default MarketWatch
