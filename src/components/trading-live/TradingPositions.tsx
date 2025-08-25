import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, TrendingUp, TrendingDown } from 'lucide-react'

interface Position {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  volume: number
  openPrice: number
  currentPrice: number
  profit: number
  profitPercent: number
  stopLoss?: number
  takeProfit?: number
  openTime: string
}

const TradingPositions: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([])
  const [accountBalance] = useState(29.00)
  const [equity] = useState(29.00)
  const [freeMargin] = useState(29.00)

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  const formatPrice = (price: number, symbol: string) => {
    const decimals = symbol.includes('JPY') ? 3 : 5
    return price.toFixed(decimals)
  }

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'
  }

  return (
    <div className="p-4">
      {/* Header avec balance */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4">Trade</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-xs text-gray-400 block">Balance</span>
            <span className="text-white font-semibold">{formatCurrency(accountBalance)}</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 block">Moyens</span>
            <span className="text-white font-semibold">{formatCurrency(equity)}</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-400 block">Marge libre</span>
            <span className="text-white font-semibold">{formatCurrency(freeMargin)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Positions ouvertes</h3>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#F7931A] rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Liste des positions */}
      {positions.length === 0 ? (
        <motion.div
          className="bg-[#1a1a1a] rounded-xl p-8 text-center border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-[#2d2d2d] rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-white font-medium mb-2">Aucune position ouverte</h4>
          <p className="text-gray-400 text-sm mb-4">
            Vous n'avez pas encore de positions actives. Commencez par analyser le marché et ouvrir votre première position.
          </p>
          <motion.button
            className="bg-[#2196F3] hover:bg-[#1976d2] px-6 py-2 rounded-lg text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ouvrir une position
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {positions.map((position, index) => (
            <motion.div
              key={position.id}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    position.type === 'buy' 
                      ? 'bg-[#22c55e]/20 text-[#22c55e]' 
                      : 'bg-[#ef4444]/20 text-[#ef4444]'
                  }`}>
                    {position.type === 'buy' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-white font-semibold">{position.symbol}</span>
                    <div className="text-xs text-gray-400">
                      {position.type.toUpperCase()} {position.volume}
                    </div>
                  </div>
                </div>
                <div className={`text-right ${getProfitColor(position.profit)}`}>
                  <div className="font-semibold">{formatCurrency(position.profit)}</div>
                  <div className="text-xs">({position.profitPercent >= 0 ? '+' : ''}{position.profitPercent.toFixed(2)}%)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Prix d'ouverture:</span>
                  <div className="text-white">{formatPrice(position.openPrice, position.symbol)}</div>
                </div>
                <div>
                  <span className="text-gray-400">Prix actuel:</span>
                  <div className="text-white">{formatPrice(position.currentPrice, position.symbol)}</div>
                </div>
                {position.stopLoss && (
                  <div>
                    <span className="text-gray-400">Stop Loss:</span>
                    <div className="text-white">{formatPrice(position.stopLoss, position.symbol)}</div>
                  </div>
                )}
                {position.takeProfit && (
                  <div>
                    <span className="text-gray-400">Take Profit:</span>
                    <div className="text-white">{formatPrice(position.takeProfit, position.symbol)}</div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                <span className="text-xs text-gray-400">{position.openTime}</span>
                <div className="flex space-x-2">
                  <motion.button
                    className="bg-[#ef4444] hover:bg-[#dc2626] px-3 py-1 rounded text-white text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fermer
                  </motion.button>
                  <motion.button
                    className="bg-[#2d2d2d] hover:bg-[#404040] px-3 py-1 rounded text-white text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Modifier
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Résumé du compte */}
      <div className="mt-6 bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
        <h4 className="text-white font-medium mb-3">Résumé du compte</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Profit total:</span>
            <span className="text-[#22c55e]">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Marge utilisée:</span>
            <span className="text-white">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Niveau de marge:</span>
            <span className="text-white">∞</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Positions ouvertes:</span>
            <span className="text-white">{positions.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingPositions
