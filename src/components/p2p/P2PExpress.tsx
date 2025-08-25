import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface P2PExpressProps {
  transactionType: 'buy' | 'sell'
}

const P2PExpress: React.FC<P2PExpressProps> = ({ transactionType }) => {
  const [amount, setAmount] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [selectedFiat, setSelectedFiat] = useState('EUR')
  const [excludeVerification, setExcludeVerification] = useState(false)

  const cryptoOptions = ['USDT', 'BTC', 'ETH', 'BNB']
  const fiatOptions = ['EUR', 'USD', 'GBP']

  const exchangeRate = 0.866 // 1 USDT = 0.866 EUR
  const usdtAmount = amount ? (parseFloat(amount) / exchangeRate).toFixed(6) : '0'

  const handleNumberInput = (num: string) => {
    if (num === 'clear') {
      setAmount('')
    } else if (num === '.') {
      if (!amount.includes('.')) {
        setAmount(amount + '.')
      }
    } else {
      setAmount(amount + num)
    }
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Sélecteurs de devises */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="bg-[#2d2d2d] text-white px-4 py-3 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
          >
            {cryptoOptions.map(crypto => (
              <option key={crypto} value={crypto}>{crypto}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedFiat}
            onChange={(e) => setSelectedFiat(e.target.value)}
            className="bg-[#2d2d2d] text-white px-4 py-3 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
          >
            {fiatOptions.map(fiat => (
              <option key={fiat} value={fiat}>{fiat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Affichage du montant */}
      <div className="text-center py-8">
        <div className="text-6xl font-light text-white mb-4">
          {amount || '0'} {selectedFiat}
        </div>
        <div className="text-gray-400 text-lg">
          ↑↓ {usdtAmount} {selectedCrypto} &nbsp;&nbsp; 1 {selectedCrypto} ≈ {exchangeRate} {selectedFiat}
        </div>
      </div>

      {/* Option d'exclusion de vérification */}
      <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <span className="text-white">Exclure les annonces nécessitant une vérification</span>
          <button className="text-gray-400 hover:text-white">?</button>
        </div>
        <motion.button
          className={`w-12 h-6 rounded-full transition-colors ${
            excludeVerification ? 'bg-[#F7931A]' : 'bg-gray-600'
          }`}
          onClick={() => setExcludeVerification(!excludeVerification)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full shadow-md"
            animate={{ x: excludeVerification ? 26 : 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </motion.button>
      </div>

      {/* Bouton de sélection de méthode de paiement */}
      <motion.button
        className="w-full bg-[#22c55e] text-white py-4 rounded-lg font-semibold text-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!amount || amount === '0'}
      >
        Sélectionner la méthode de paiement
      </motion.button>

      {/* Clavier numérique */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'X'].map((key) => (
          <motion.button
            key={key}
            className={`h-16 rounded-lg font-semibold text-xl ${
              key === 'X' 
                ? 'bg-[#ef4444] text-white' 
                : 'bg-[#2d2d2d] text-white hover:bg-[#3d3d3d]'
            }`}
            onClick={() => handleNumberInput(key === 'X' ? 'clear' : key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {key === 'X' ? '×' : key}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default P2PExpress
