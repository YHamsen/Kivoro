import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingDown, AlertCircle, CheckCircle, Wallet, Percent } from 'lucide-react'
import { Position } from '../../services/alpacaApi'
import { kivoroBalanceApi, KivoroBalance } from '../../services/kivoroBalanceApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface SellConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  position: Position | null
  onSellComplete: () => void
}

const SellConfirmationModal: React.FC<SellConfirmationModalProps> = ({
  isOpen,
  onClose,
  position,
  onSellComplete
}) => {
  const [sellType, setSellType] = useState<'partial' | 'full'>('partial')
  const [quantity, setQuantity] = useState('')
  const [percentage, setPercentage] = useState('')
  const [balance, setBalance] = useState<KivoroBalance | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<'input' | 'processing' | 'success' | 'error'>('input')
  const [error, setError] = useState('')
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    if (isOpen) {
      loadBalance()
      setStep('input')
      setQuantity('')
      setPercentage('')
      setSellType('partial')
      setError('')
    }
  }, [isOpen])

  const loadBalance = async () => {
    try {
      const currentBalance = await kivoroBalanceApi.getBalance()
      setBalance(currentBalance)
    } catch (error) {
      console.error('Failed to load balance:', error)
    }
  }

  const currentPrice = position ? position.market_value / position.qty : 0
  const sellQuantity = sellType === 'full' 
    ? position?.qty || 0
    : percentage 
      ? (position?.qty || 0) * (parseFloat(percentage) / 100)
      : parseFloat(quantity || '0')
  
  const estimatedAmount = sellQuantity * currentPrice
  const gainLoss = position ? (currentPrice - position.avg_entry_price) * sellQuantity : 0
  const gainLossPercent = position && position.avg_entry_price > 0 
    ? ((currentPrice - position.avg_entry_price) / position.avg_entry_price) * 100 
    : 0

  const isValidSell = sellQuantity > 0 && sellQuantity <= (position?.qty || 0)

  const handleSellConfirm = async () => {
    if (!position || !isValidSell) return

    setIsProcessing(true)
    setStep('processing')

    try {
      const result = await kivoroBalanceApi.processSellOrder({
        symbol: position.symbol,
        quantity: sellQuantity,
        estimatedAmount: estimatedAmount,
        currentPrice: currentPrice
      })

      if (result.success) {
        setStep('success')
        toast.success(`Successfully sold ${sellQuantity.toFixed(4)} shares of ${position.symbol}`)
        setTimeout(() => {
          onSellComplete()
          onClose()
        }, 2000)
      } else {
        setError(result.error || 'Transaction failed')
        setStep('error')
      }
    } catch (error) {
      setError('An unexpected error occurred')
      setStep('error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePercentageClick = (percent: number) => {
    setPercentage(percent.toString())
    setQuantity('')
    setSellType('partial')
  }

  const handleFullSell = () => {
    setSellType('full')
    setQuantity('')
    setPercentage('')
  }

  if (!isOpen || !position) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-t-3xl md:rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Sell {position.symbol}</h3>
                <p className="text-gray-400 text-sm">{position.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {step === 'input' && (
              <>
                {/* Position Summary */}
                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Owned Shares</span>
                      <span className="text-white font-medium">{position.qty.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Current Price</span>
                      <span className="text-white font-medium">${currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Market Value</span>
                      <span className="text-white font-semibold">${position.market_value.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Unrealized P&L</span>
                      <span className={`font-medium ${position.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                        {position.unrealized_pl >= 0 ? '+' : ''}${position.unrealized_pl.toFixed(2)} 
                        ({position.unrealized_plpc >= 0 ? '+' : ''}{position.unrealized_plpc.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sell Type Selection */}
                <div className="space-y-3">
                  <label className="text-white text-sm font-medium">Sell Amount</label>
                  
                  {/* Quick Percentage Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 75, 100].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => percent === 100 ? handleFullSell() : handlePercentageClick(percent)}
                        className={`border rounded-lg py-2 px-3 text-sm transition-colors ${
                          (sellType === 'full' && percent === 100) || 
                          (sellType === 'partial' && percentage === percent.toString())
                            ? 'border-[#00D4AA] bg-[#00D4AA]/20 text-[#00D4AA]'
                            : 'border-gray-700 bg-[#0f0f0f] text-white hover:border-[#00D4AA]'
                        }`}
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>

                  {/* Custom Quantity Input */}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value)
                          setPercentage('')
                          setSellType('partial')
                        }}
                        placeholder="Custom quantity"
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00D4AA] focus:outline-none"
                        step="0.0001"
                        min="0"
                        max={position.qty}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Minimum: 0.0001 shares</span>
                      <span>Maximum: {position.qty.toFixed(4)} shares</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Sale Details */}
                {sellQuantity > 0 && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Selling Shares</span>
                        <span className="text-white font-medium">{sellQuantity.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Estimated Amount</span>
                        <span className="text-white font-medium">${estimatedAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Realized P&L</span>
                        <span className={`font-medium ${gainLoss >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                          {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} 
                          ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Balance After Sale */}
                {balance && sellQuantity > 0 && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-[#00D4AA]" />
                        <span className="text-gray-400 text-sm">Balance After Sale</span>
                      </div>
                      <span className="text-white font-semibold">
                        {kivoroBalanceApi.formatCurrency(balance.availableBalance + estimatedAmount)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Invalid Quantity Warning */}
                {sellQuantity > 0 && !isValidSell && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">
                        Invalid quantity. Maximum: {position.qty.toFixed(4)} shares
                      </span>
                    </div>
                  </div>
                )}

                {/* Confirm Button */}
                <motion.button
                  onClick={withHaptic(handleSellConfirm, 'heavy')}
                  disabled={!isValidSell || isProcessing}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
                  whileHover={{ scale: isValidSell ? 1.02 : 1 }}
                  whileTap={{ scale: isValidSell ? 0.98 : 1 }}
                >
                  {isProcessing ? 'Processing...' : `Confirm Sale`}
                </motion.button>
              </>
            )}

            {step === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full"
                  />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Processing Your Sale</h3>
                <p className="text-gray-400">Please wait while we execute your trade...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00D4AA]" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Sale Successful!</h3>
                <p className="text-gray-400">You've sold {sellQuantity.toFixed(4)} shares of {position.symbol}</p>
                <p className="text-gray-400">Amount: ${estimatedAmount.toFixed(2)}</p>
              </div>
            )}

            {step === 'error' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Sale Failed</h3>
                <p className="text-gray-400 mb-4">{error}</p>
                <button
                  onClick={() => setStep('input')}
                  className="bg-[#00D4AA] hover:bg-[#00B893] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SellConfirmationModal
