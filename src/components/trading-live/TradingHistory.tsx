import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, Archive, TrendingUp, TrendingDown, Menu, DollarSign } from 'lucide-react'

interface HistoryItem {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  volume: number
  openPrice: number
  closePrice: number
  profit: number
  openTime: string
  closeTime: string
  status: 'completed' | 'cancelled' | 'pending'
}

const TradingHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled' | 'pending'>('all')

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-[#22c55e]'
      case 'cancelled': return 'text-[#ef4444]'
      case 'pending': return 'text-[#F7931A]'
      default: return 'text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Complété'
      case 'cancelled': return 'Annulé'
      case 'pending': return 'En attente'
      default: return status
    }
  }

  const filteredHistory = filterStatus === 'all' 
    ? history 
    : history.filter(item => item.status === filterStatus)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Menu className="w-5 h-5 text-gray-400" />
          <div>
            <h2 className="text-lg font-semibold text-white">Historique</h2>
            <p className="text-sm text-gray-400">Tous les symboles</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#1a1a1a] rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Filtres de statut */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {['all', 'completed', 'pending', 'cancelled'].map((status) => (
          <motion.button
            key={status}
            className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterStatus === status 
                ? 'bg-[#2196F3] text-white' 
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
            }`}
            onClick={() => setFilterStatus(status as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status === 'all' ? 'Tous' : getStatusLabel(status)}
          </motion.button>
        ))}
      </div>

      {/* Liste de l'historique */}
      {filteredHistory.length === 0 ? (
        <motion.div
          className="bg-[#1a1a1a] rounded-xl p-8 text-center border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-[#2d2d2d] rounded-full flex items-center justify-center mx-auto mb-4">
            <Archive className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-white font-medium mb-2">Pas d'histoire</h4>
          <p className="text-gray-400 text-sm">
            {filterStatus === 'all' 
              ? "Aucune transaction dans l'historique. Vos futurs trades apparaîtront ici." 
              : `Aucune transaction ${getStatusLabel(filterStatus).toLowerCase()} trouvée.`
            }
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'buy' 
                      ? 'bg-[#22c55e]/20 text-[#22c55e]' 
                      : 'bg-[#ef4444]/20 text-[#ef4444]'
                  }`}>
                    {item.type === 'buy' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-white font-semibold">{item.symbol}</span>
                    <div className="text-xs text-gray-400">
                      {item.type.toUpperCase()} {item.volume}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getProfitColor(item.profit)}`}>
                    {formatCurrency(item.profit)}
                  </div>
                  <div className={`text-xs ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Prix d'ouverture:</span>
                  <div className="text-white">{formatPrice(item.openPrice, item.symbol)}</div>
                </div>
                <div>
                  <span className="text-gray-400">Prix de fermeture:</span>
                  <div className="text-white">{formatPrice(item.closePrice, item.symbol)}</div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800 text-xs text-gray-400">
                <div>
                  <div>Ouvert: {item.openTime}</div>
                  <div>Fermé: {item.closeTime}</div>
                </div>
                <div className="text-right">
                  <div>ID: #{item.id}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Statistiques */}
      {history.length > 0 && (
        <div className="mt-6 bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <h4 className="text-white font-medium mb-3">Statistiques</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total trades:</span>
              <span className="text-white">{history.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Trades gagnants:</span>
              <span className="text-[#22c55e]">
                {history.filter(h => h.profit > 0).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Trades perdants:</span>
              <span className="text-[#ef4444]">
                {history.filter(h => h.profit < 0).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Profit total:</span>
              <span className={getProfitColor(history.reduce((sum, h) => sum + h.profit, 0))}>
                {formatCurrency(history.reduce((sum, h) => sum + h.profit, 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradingHistory
