import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ChevronDown, 
  Info, 
  Shield, 
  Clock, 
  CreditCard,
  Building,
  Zap,
  CheckCircle
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface PaymentMethod {
  id: string
  name: string
  fee: string
  processing: string
  icon: React.ComponentType<any>
  description: string
  selected?: boolean
}

const DepositFiat: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState('100')
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [selectedMethod, setSelectedMethod] = useState('zen')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'zen',
      name: 'ZEN',
      fee: '0.92%',
      processing: 'Temps réel',
      icon: Zap,
      description: 'Paiement instantané avec ZEN',
      selected: selectedMethod === 'zen'
    },
    {
      id: 'sepa',
      name: 'SEPA',
      fee: '0.08% + 0.28 EUR',
      processing: 'Temps réel',
      icon: Building,
      description: 'Virement bancaire européen',
      selected: selectedMethod === 'sepa'
    },
    {
      id: 'easy-bank',
      name: 'Easy Bank Payment',
      fee: '0.08% + 0.30 EUR',
      processing: 'Temps réel',
      icon: CreditCard,
      description: 'Paiement bancaire simplifié',
      selected: selectedMethod === 'easy-bank'
    }
  ]

  const handleBack = () => {
    navigate('/')
  }

  const handleContinue = () => {
    if (!agreeToTerms) {
      alert('Veuillez accepter les conditions d\'utilisation')
      return
    }

    // Traitement du dépôt selon la méthode sélectionnée
    console.log('Deposit:', {
      amount,
      currency: selectedCurrency,
      method: selectedMethod,
      agreeToTerms
    })

    // Navigation vers la page de traitement
    navigate('/deposit/processing', {
      state: {
        amount,
        currency: selectedCurrency,
        method: selectedMethod,
        methodName: paymentMethods.find(m => m.id === selectedMethod)?.name
      }
    })
  }

  const calculateFee = () => {
    const numAmount = parseFloat(amount) || 0
    const method = paymentMethods.find(m => m.id === selectedMethod)
    
    if (!method) return '0.00'
    
    if (method.id === 'zen') {
      return (numAmount * 0.0092).toFixed(2)
    } else if (method.id === 'sepa') {
      return (numAmount * 0.0008 + 0.28).toFixed(2)
    } else if (method.id === 'easy-bank') {
      return (numAmount * 0.0008 + 0.30).toFixed(2)
    }
    
    return '0.00'
  }

  const getTotalAmount = () => {
    const numAmount = parseFloat(amount) || 0
    const fee = parseFloat(calculateFee())
    return (numAmount + fee).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Dépôt Fiat</h1>
          <div className="w-5 h-5" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Sélection de devise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Devise</label>
          <div className="relative">
            <button className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-600 transition-colors">
              <span className="text-white font-medium">{selectedCurrency}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Saisie du montant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Montant</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-white text-lg font-medium focus:border-[#F7931A] focus:outline-none transition-colors"
              placeholder="100"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {selectedCurrency}
            </span>
          </div>
        </motion.div>

        {/* Méthodes de paiement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Méthode de paiement</label>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full bg-[#1a1a1a] border rounded-xl p-4 transition-all duration-200 ${
                    method.selected 
                      ? 'border-[#F7931A] bg-[#2d2d2d]' 
                      : 'border-gray-800 hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        method.selected ? 'bg-[#F7931A]/20' : 'bg-gray-800'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          method.selected ? 'text-[#F7931A]' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-medium">{method.name}</h4>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-400">{method.fee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">{method.processing}</span>
                      </div>
                    </div>
                  </div>
                  
                  {method.selected && method.id === 'zen' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-700"
                    >
                      <button className="text-[#F7931A] text-sm font-medium hover:text-[#FF7A00] transition-colors">
                        Instructions de dépôt
                      </button>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Résumé des frais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-3"
        >
          <h4 className="text-white font-medium">Résumé</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Montant</span>
              <span className="text-white">{amount} {selectedCurrency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Frais</span>
              <span className="text-white">{calculateFee()} {selectedCurrency}</span>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <div className="flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-white font-medium">{getTotalAmount()} {selectedCurrency}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conditions d'utilisation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#F7931A] bg-transparent border border-gray-600 rounded focus:ring-[#F7931A] focus:ring-2"
            />
            <div className="text-sm text-gray-400 leading-relaxed">
              J'ai lu et j'accepte les{' '}
              <button className="text-[#F7931A] hover:text-[#FF7A00] transition-colors">
                Conditions d'utilisation
              </button>
              , la{' '}
              <button className="text-[#F7931A] hover:text-[#FF7A00] transition-colors">
                Politique de confidentialité
              </button>
              {' '}de Bybit, les{' '}
              <button className="text-[#F7931A] hover:text-[#FF7A00] transition-colors">
                Tarifs
              </button>
              {' '}et la{' '}
              <button className="text-[#F7931A] hover:text-[#FF7A00] transition-colors">
                Divulgation des risques
              </button>
              .
            </div>
          </label>

          <div className="bg-[#0f1419] border border-gray-800 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">
                  Service fourni par <strong>UAB Onlychain Fintech Limited</strong>
                </p>
                <button className="text-[#F7931A] text-sm hover:text-[#FF7A00] transition-colors">
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bouton Continuer */}
        <motion.button
          onClick={handleContinue}
          disabled={!agreeToTerms || !amount || parseFloat(amount) <= 0}
          className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200 ${
            agreeToTerms && amount && parseFloat(amount) > 0
              ? 'bg-[#F7931A] hover:bg-[#FF7A00] shadow-lg shadow-[#F7931A]/25'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
          whileHover={{ scale: agreeToTerms && amount ? 1.02 : 1 }}
          whileTap={{ scale: agreeToTerms && amount ? 0.98 : 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Continuer
        </motion.button>
      </div>
    </div>
  )
}

export default DepositFiat
