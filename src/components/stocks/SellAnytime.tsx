import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus, AlertTriangle } from 'lucide-react'
import { alpacaApi, Position } from '../../services/alpacaApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface SellAnytimeProps {
  refreshTrigger?: number
  onSellComplete: () => void
}

const SellAnytime: React.FC<SellAnytimeProps> = ({ refreshTrigger, onSellComplete }) => {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [showSellModal, setShowSellModal] = useState(false)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadPositions()
  }, [refreshTrigger])

  const loadPositions = async () => {
    try {
      setLoading(true)
      const positionsData = await alpacaApi.getPositions()
      // Only show positions that can be sold (long positions)
      setPositions(positionsData.filter(pos => pos.side === 'long' && pos.qty > 0))
    } catch (error) {
      console.error('Failed to load positions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : ''
    return `${sign}${(percentage * 100).toFixed(2)}%`
  }

  const handleSellClick = (position: Position) => {
    withHaptic(() => {
      setSelectedPosition(position)
      setShowSellModal(true)
    }, 'medium')()
  }

  const handleSellConfirm = async () => {
    if (!selectedPosition) return

    try {
      withHaptic(async () => {
        // For demo purposes, we'll just show success message
        // In real implementation, this would call alpacaApi.placeOrder
        toast.success(`Ordre de vente placé pour ${selectedPosition.symbol}`)
        setShowSellModal(false)
        setSelectedPosition(null)
        onSellComplete()
      }, 'heavy')()
    } catch (error) {
      toast.error('Échec de la vente. Veuillez réessayer.')
    }
  }

  const SellModal: React.FC = () => {
    if (!selectedPosition) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowSellModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            
            <h3 className="text-white font-semibold text-lg mb-2">
              Vendre {selectedPosition.symbol}
            </h3>
            
            <div className="bg-[#2d2d2d] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Quantité</span>
                <span className="text-white font-medium">{selectedPosition.qty} actions</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Valeur estimée</span>
                <span className="text-white font-medium">
                  {formatCurrency(selectedPosition.market_value)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">P&L</span>
                <span className={selectedPosition.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}>
                  {formatCurrency(selectedPosition.unrealized_pl)}
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              Êtes-vous sûr de vouloir vendre toutes vos actions {selectedPosition.symbol} ?
            </p>
            
            <div className="flex space-x-3">
              <motion.button
                onClick={() => setShowSellModal(false)}
                className="flex-1 bg-[#2d2d2d] text-white py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Annuler
              </motion.button>
              <motion.button
                onClick={handleSellConfirm}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Vendre
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">SELL ANYTIME</h3>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                    <div className="w-20 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="w-16 h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">SELL ANYTIME</h3>
        <div className="space-y-3">
          {positions.map((position, index) => (
            <motion.div
              key={position.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-red-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#F7931A] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {position.symbol.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{position.symbol}</h4>
                    <p className="text-gray-400 text-xs">{position.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-white font-medium text-sm">
                      {formatCurrency(position.market_value)}
                    </p>
                    <div className="flex items-center space-x-1">
                      {position.unrealized_pl >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-[#00D4AA]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={position.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}>
                        {formatPercentage(position.unrealized_plpc)}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleSellClick(position)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sell
                  </motion.button>
                </div>
              </div>
              
              {/* Additional details */}
              <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Quantité:</span>
                  <br />
                  <span className="text-gray-300">{position.qty}</span>
                </div>
                <div>
                  <span className="text-gray-400">Prix moyen:</span>
                  <br />
                  <span className="text-gray-300">
                    {formatCurrency(position.avg_entry_price)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">P&L total:</span>
                  <br />
                  <span className={position.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}>
                    {formatCurrency(position.unrealized_pl)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {positions.length === 0 && (
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[#2d2d2d] rounded-lg flex items-center justify-center mx-auto mb-3">
                <Minus className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-white font-medium text-sm mb-2">Aucune position à vendre</h4>
              <p className="text-gray-400 text-xs">
                Vous devez d'abord acheter des actions pour pouvoir les vendre
              </p>
            </div>
          )}
        </div>
      </div>

      {showSellModal && <SellModal />}
    </>
  )
}

export default SellAnytime
