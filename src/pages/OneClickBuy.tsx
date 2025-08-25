import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ChevronDown, 
  RefreshCw, 
  Info, 
  Plus, 
  Star,
  TrendingUp,
  HelpCircle,
  Euro,
  Zap
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const OneClickBuy: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState('0')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [selectedFiat, setSelectedFiat] = useState('EUR')
  const [inputMode, setInputMode] = useState<'amount' | 'quantity'>('amount')
  const [exchangeRate, setExchangeRate] = useState(0.85548)
  const [eurBalance, setEurBalance] = useState(0.00)

  // Simuler le chargement des données depuis l'état de navigation
  useEffect(() => {
    if (location.state) {
      const { defaultCurrency, defaultCrypto } = location.state
      if (defaultCurrency) setSelectedFiat(defaultCurrency)
      if (defaultCrypto) setSelectedCrypto(defaultCrypto)
    }
  }, [location.state])

  const handleBack = () => {
    navigate('/')
  }

  const handleNext = () => {
    if (parseFloat(amount) <= 0) {
      alert('Veuillez saisir un montant valide')
      return
    }

    if (parseFloat(amount) < 10) {
      alert('Le montant minimum est de 10 EUR')
      return
    }

    if (parseFloat(amount) > 30000) {
      alert('Le montant maximum est de 30 000 EUR')
      return
    }

    // Navigation vers la confirmation
    navigate('/buy/confirmation', {
      state: {
        amount: parseFloat(amount),
        crypto: selectedCrypto,
        fiat: selectedFiat,
        exchangeRate,
        inputMode,
        type: 'one-click-buy'
      }
    })
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
  }

  const handleKeypadPress = (key: string) => {
    if (key === 'clear') {
      setAmount('0')
    } else if (key === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev === '0' ? '0.' : prev + '.')
      }
    } else {
      setAmount(prev => {
        if (prev === '0') {
          return key
        }
        return prev + key
      })
    }
  }

  const getCryptoAmount = () => {
    const numAmount = parseFloat(amount) || 0
    return (numAmount / exchangeRate).toFixed(6)
  }

  const getFiatAmount = () => {
    const numAmount = parseFloat(amount) || 0
    return numAmount.toFixed(2)
  }

  const isNextDisabled = () => {
    const numAmount = parseFloat(amount) || 0
    return numAmount <= 0 || numAmount < 10 || numAmount > 30000
  }

  const keypadKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace']
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">Achat en un clic</h1>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-white bg-[#2d2d2d] px-3 py-1 rounded-lg">
              <span className="text-sm font-medium">{selectedCrypto}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="w-6 h-6 text-gray-400">
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="w-6 h-6 text-gray-400">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Onglets Buy/Sell */}
      <div className="px-4 py-3 bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex bg-[#2d2d2d] rounded-lg p-1">
          <motion.button
            className="flex-1 py-2 rounded-md text-sm font-medium bg-[#22c55e] text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Acheter
          </motion.button>
          <motion.button
            className="flex-1 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Vendre
          </motion.button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Sélection du montant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Affichage du montant principal */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl font-light text-white">
                {amount}
              </span>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <span className="text-lg">{selectedFiat}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-400">
              10-30 000 {selectedFiat}
            </div>
          </div>

          {/* Toggle mode de saisie */}
          <div className="flex items-center justify-center">
            <motion.button
              onClick={() => setInputMode(inputMode === 'amount' ? 'quantity' : 'amount')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">
                {inputMode === 'amount' ? 'Par montant' : 'Par quantité'}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Solde EUR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Euro className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Solde EUR</h4>
                <p className="text-xl font-semibold text-white">€ {eurBalance.toFixed(2)}</p>
              </div>
            </div>
            <motion.button
              className="w-8 h-8 bg-[#F7931A]/20 rounded-lg flex items-center justify-center hover:bg-[#F7931A]/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4 text-[#F7931A]" />
            </motion.button>
          </div>
        </motion.div>

        {/* Taux de change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-400 text-sm mb-1">Taux de change</h4>
              <p className="text-white">
                1 {selectedCrypto} ≈ {exchangeRate} {selectedFiat}
              </p>
            </div>
            <motion.button
              className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </motion.div>

        {/* Avantages VIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button className="w-full bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Avantages VIP</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </button>
        </motion.div>

        {/* Guide d'achat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Comment acheter des coins instantanément ?</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </button>
        </motion.div>

        {/* Auto-Invest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white font-medium">Auto-Invest</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Clavier numérique */}
      <div className="px-4 py-6 bg-[#1a1a1a] border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {keypadKeys.map((row, rowIndex) => (
            row.map((key, keyIndex) => (
              <motion.button
                key={`${rowIndex}-${keyIndex}`}
                onClick={() => handleKeypadPress(key)}
                className="h-14 bg-[#2d2d2d] rounded-xl flex items-center justify-center text-white text-xl font-medium hover:bg-[#3d3d3d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (rowIndex * 3 + keyIndex) * 0.05 }}
              >
                {key === 'backspace' ? (
                  <ArrowLeft className="w-5 h-5" />
                ) : (
                  key
                )}
              </motion.button>
            ))
          ))}
        </div>

        {/* Bouton Suivant */}
        <motion.button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200 ${
            !isNextDisabled()
              ? 'bg-[#F7931A] hover:bg-[#FF7A00] shadow-lg shadow-[#F7931A]/25'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
          whileHover={{ scale: !isNextDisabled() ? 1.02 : 1 }}
          whileTap={{ scale: !isNextDisabled() ? 0.98 : 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  )
}

export default OneClickBuy
