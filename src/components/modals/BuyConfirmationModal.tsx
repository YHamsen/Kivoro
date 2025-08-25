import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, AlertCircle, CheckCircle, Wallet, DollarSign } from 'lucide-react'
import { Stock } from '../../services/alpacaApi'
import { kivoroBalanceApi, KivoroBalance } from '../../services/kivoroBalanceApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface BuyConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  stock: Stock | null
  onBuyComplete: () => void
}

const BuyConfirmationModal: React.FC<BuyConfirmationModalProps> = ({
  isOpen,
  onClose,
  stock,
  onBuyComplete
}) => {
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState<KivoroBalance | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<'input' | 'processing' | 'success' | 'error'>('input')
  const [error, setError] = useState('')
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    if (isOpen) {
      loadBalance()
      setStep('input')
      setAmount('')
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

  const estimatedShares = amount && stock ? parseFloat(amount) / stock.price : 0
  const transactionFee = 0 // No fees for now
  const totalCost = parseFloat(amount || '0') + transactionFee
  const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= (balance?.availableBalance || 0)

  const handleBuyConfirm = async () => {
    if (!stock || !isValidAmount || !balance) return

    setIsProcessing(true)
    setStep('processing')

    try {
      const result = await kivoroBalanceApi.processBuyOrder({
        symbol: stock.symbol,
        amountUSD: totalCost,
        estimatedShares: estimatedShares,
        currentPrice: stock.price
      })

      if (result.success) {
        setStep('success')
        toast.success(`Successfully bought ${estimatedShares.toFixed(4)} shares of ${stock.symbol}`)
        setTimeout(() => {
          onBuyComplete()
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

  const handleTopUp = () => {
    // In a real app, this would navigate to the deposit page
    toast.success('Redirecting to top-up page...')
  }

  if (!isOpen || !stock) return null

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
              <div className="w-10 h-10 bg-gradient-to-br from-[#00D4AA] to-[#00B893] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">Buy {stock.symbol}</h3>
                <p className="text-gray-400 text-sm">{stock.name}</p>
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
                {/* Current Price */}
                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Current Price</span>
                    <div className="text-right">
                      <p className="text-white text-lg font-semibold">${stock.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs ${stock.changePercent >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Balance Display */}
                {balance && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-[#00D4AA]" />
                        <span className="text-gray-400 text-sm">Available Balance</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-lg font-semibold">
                          {kivoroBalanceApi.formatCurrency(balance.availableBalance)}
                        </p>
                        {balance.availableBalance < 100 && (
                          <button
                            onClick={handleTopUp}
                            className="text-[#F7931A] text-xs hover:underline"
                          >
                            Top up balance
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Investment Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-10 py-3 text-white text-lg focus:border-[#00D4AA] focus:outline-none"
                      step="0.01"
                      min="0.01"
                      max={balance?.availableBalance || 0}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Minimum: $1.00</span>
                    <span>Maximum: {kivoroBalanceApi.formatCurrency(balance?.availableBalance || 0)}</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      disabled={quickAmount > (balance?.availableBalance || 0)}
                      className="bg-[#0f0f0f] border border-gray-700 rounded-lg py-2 px-3 text-white text-sm hover:border-[#00D4AA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>

                {/* Estimated Shares */}
                {amount && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Estimated Shares</span>
                        <span className="text-white font-medium">{estimatedShares.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Transaction Fee</span>
                        <span className="text-white font-medium">${transactionFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2 flex justify-between">
                        <span className="text-white font-medium">Total Cost</span>
                        <span className="text-white font-semibold">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Insufficient Balance Warning */}
                {amount && !isValidAmount && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">
                        {parseFloat(amount) > (balance?.availableBalance || 0) 
                          ? 'Insufficient balance' 
                          : 'Please enter a valid amount'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Confirm Button */}
                <motion.button
                  onClick={withHaptic(handleBuyConfirm, 'heavy')}
                  disabled={!isValidAmount || isProcessing}
                  className="w-full bg-[#00D4AA] hover:bg-[#00B893] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
                  whileHover={{ scale: isValidAmount ? 1.02 : 1 }}
                  whileTap={{ scale: isValidAmount ? 0.98 : 1 }}
                >
                  {isProcessing ? 'Processing...' : `Confirm Purchase`}
                </motion.button>
              </>
            )}

            {step === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-[#00D4AA] border-t-transparent rounded-full"
                  />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Processing Your Order</h3>
                <p className="text-gray-400">Please wait while we execute your trade...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#00D4AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00D4AA]" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Order Successful!</h3>
                <p className="text-gray-400">You've purchased {estimatedShares.toFixed(4)} shares of {stock.symbol}</p>
              </div>
            )}

            {step === 'error' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Order Failed</h3>
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

export default BuyConfirmationModal
