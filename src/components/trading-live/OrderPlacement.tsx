import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

interface OrderData {
  symbol: string
  type: 'buy' | 'sell'
  orderType: 'market' | 'limit' | 'stop'
  volume: number
  price?: number
  stopLoss?: number
  takeProfit?: number
  comment: string
}

interface OrderPlacementProps {
  symbol: string
  orderType: 'buy' | 'sell'
  onClose: () => void
  onOrderPlaced: (order: OrderData) => void
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({
  symbol,
  orderType,
  onClose,
  onOrderPlaced
}) => {
  const [step, setStep] = useState<'form' | 'confirmation' | 'success'>('form')
  const [orderData, setOrderData] = useState<OrderData>({
    symbol,
    type: orderType,
    orderType: 'market',
    volume: 0.01,
    comment: ''
  })
  const [currentPrice, setCurrentPrice] = useState(1.15213)
  const [spread] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  // Simulation de prix en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 0.0001)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return price.toFixed(5)
  }

  const calculateRequiredMargin = () => {
    const contractSize = 100000 // Standard lot
    const leverage = 100
    return (orderData.volume * contractSize * currentPrice) / leverage
  }

  const calculatePipValue = () => {
    return orderData.volume * 10 // For EUR/USD
  }

  const getExecutionPrice = () => {
    if (orderData.orderType === 'market') {
      return orderData.type === 'buy' 
        ? currentPrice + (spread * 0.00001)
        : currentPrice - (spread * 0.00001)
    }
    return orderData.price || currentPrice
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Simulation d'envoi d'ordre
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setStep('success')
    
    // Auto-fermeture après succès
    setTimeout(() => {
      onOrderPlaced(orderData)
    }, 2000)
  }

  const renderForm = () => (
    <div className="space-y-6">
      {/* Header de l'ordre */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            orderData.type === 'buy' 
              ? 'bg-[#22c55e]/20 text-[#22c55e]' 
              : 'bg-[#ef4444]/20 text-[#ef4444]'
          }`}>
            {orderData.type === 'buy' ? (
              <TrendingUp className="w-6 h-6" />
            ) : (
              <TrendingDown className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {orderData.type === 'buy' ? 'ACHETER' : 'VENDRE'} {symbol}
            </h3>
            <p className="text-sm text-gray-400">
              Prix actuel: {formatPrice(currentPrice)} (Spread: {spread})
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Type d'ordre */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Type d'ordre
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['market', 'limit', 'stop'].map((type) => (
            <motion.button
              key={type}
              className={`p-3 rounded-lg border transition-colors ${
                orderData.orderType === type
                  ? 'border-[#2196F3] bg-[#2196F3]/10 text-[#2196F3]'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
              onClick={() => setOrderData({...orderData, orderType: type as any})}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-xs font-medium capitalize">{type}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Volume */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Volume (lots)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="100"
            value={orderData.volume}
            onChange={(e) => setOrderData({...orderData, volume: parseFloat(e.target.value) || 0.01})}
            className="flex-1 bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          />
          <div className="flex space-x-1">
            {[0.01, 0.1, 1.0].map((vol) => (
              <motion.button
                key={vol}
                className="px-3 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-xs text-gray-400 hover:text-white"
                onClick={() => setOrderData({...orderData, volume: vol})}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {vol}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Prix (pour limit/stop) */}
      {orderData.orderType !== 'market' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prix d'exécution
          </label>
          <input
            type="number"
            step="0.00001"
            value={orderData.price || ''}
            onChange={(e) => setOrderData({...orderData, price: parseFloat(e.target.value)})}
            className="w-full bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
            placeholder={formatPrice(currentPrice)}
          />
        </div>
      )}

      {/* Stop Loss */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Stop Loss (optionnel)
        </label>
        <input
          type="number"
          step="0.00001"
          value={orderData.stopLoss || ''}
          onChange={(e) => setOrderData({...orderData, stopLoss: parseFloat(e.target.value) || undefined})}
          className="w-full bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          placeholder="Aucun Stop Loss"
        />
      </div>

      {/* Take Profit */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Take Profit (optionnel)
        </label>
        <input
          type="number"
          step="0.00001"
          value={orderData.takeProfit || ''}
          onChange={(e) => setOrderData({...orderData, takeProfit: parseFloat(e.target.value) || undefined})}
          className="w-full bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          placeholder="Aucun Take Profit"
        />
      </div>

      {/* Commentaire */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Commentaire (optionnel)
        </label>
        <input
          type="text"
          value={orderData.comment}
          onChange={(e) => setOrderData({...orderData, comment: e.target.value})}
          className="w-full bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          placeholder="Ajouter un commentaire..."
        />
      </div>

      {/* Calculs */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
        <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Calculs de l'ordre</span>
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Prix d'exécution:</span>
            <span className="text-white">{formatPrice(getExecutionPrice())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Marge requise:</span>
            <span className="text-white">${calculateRequiredMargin().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Valeur du pip:</span>
            <span className="text-white">${calculatePipValue().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bouton de confirmation */}
      <motion.button
        className={`w-full py-4 rounded-lg font-bold text-white ${
          orderData.type === 'buy' 
            ? 'bg-[#22c55e] hover:bg-[#16a34a]' 
            : 'bg-[#ef4444] hover:bg-[#dc2626]'
        } transition-colors`}
        onClick={() => setStep('confirmation')}
        disabled={orderData.volume <= 0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Réviser l'ordre
      </motion.button>
    </div>
  )

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          orderData.type === 'buy' 
            ? 'bg-[#22c55e]/20 text-[#22c55e]' 
            : 'bg-[#ef4444]/20 text-[#ef4444]'
        }`}>
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Confirmer l'ordre</h3>
        <p className="text-gray-400">Vérifiez les détails avant d'exécuter</p>
      </div>

      {/* Résumé de l'ordre */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Instrument:</span>
            <span className="text-white font-semibold">{orderData.symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Type:</span>
            <span className={`font-semibold ${
              orderData.type === 'buy' ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}>
              {orderData.type.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Volume:</span>
            <span className="text-white">{orderData.volume} lots</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Prix d'exécution:</span>
            <span className="text-white">{formatPrice(getExecutionPrice())}</span>
          </div>
          {orderData.stopLoss && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Stop Loss:</span>
              <span className="text-[#ef4444]">{formatPrice(orderData.stopLoss)}</span>
            </div>
          )}
          {orderData.takeProfit && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Take Profit:</span>
              <span className="text-[#22c55e]">{formatPrice(orderData.takeProfit)}</span>
            </div>
          )}
          <div className="flex justify-between items-center border-t border-gray-700 pt-3">
            <span className="text-gray-400">Marge requise:</span>
            <span className="text-white font-semibold">${calculateRequiredMargin().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex space-x-3">
        <motion.button
          className="flex-1 py-3 bg-[#2d2d2d] hover:bg-[#404040] text-white rounded-lg font-medium"
          onClick={() => setStep('form')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Modifier
        </motion.button>
        <motion.button
          className={`flex-1 py-3 rounded-lg font-bold text-white flex items-center justify-center space-x-2 ${
            orderData.type === 'buy' 
              ? 'bg-[#22c55e] hover:bg-[#16a34a]' 
              : 'bg-[#ef4444] hover:bg-[#dc2626]'
          } transition-colors`}
          onClick={handleSubmit}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Exécution...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              <span>Exécuter l'ordre</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-[#22c55e]/20 text-[#22c55e] rounded-full mb-4">
        <CheckCircle className="w-10 h-10" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Ordre exécuté !</h3>
        <p className="text-gray-400">
          Votre ordre {orderData.type.toUpperCase()} de {orderData.volume} lots sur {orderData.symbol} a été exécuté avec succès.
        </p>
      </div>
      <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-4">
        <div className="flex items-center justify-center space-x-2 text-[#22c55e] text-sm">
          <Clock className="w-4 h-4" />
          <span>Fermeture automatique dans 2 secondes...</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 'form' && renderForm()}
            {step === 'confirmation' && renderConfirmation()}
            {step === 'success' && renderSuccess()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default OrderPlacement
