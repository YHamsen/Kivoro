import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Wallet, 
  ArrowRight,
  Euro,
  Bitcoin,
  Star,
  Shield,
  Clock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BuyOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

const BuyOptionsModal: React.FC<BuyOptionsModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    
    switch (option) {
      case 'p2p':
        navigate('/p2p')
        onClose()
        break
      case 'deposit-eur':
        // Déclencher l'action pour la page de dépôt fiat EUR
        handleDepositEUR()
        break
      case 'buy-crypto':
        // Déclencher l'action pour one-click buy
        handleBuyCrypto()
        break
      case 'deposit-crypto':
        // Déclencher l'action pour connecter les wallets
        handleDepositCrypto()
        break
      default:
        console.log(`Option ${option} non implémentée`)
    }
  }

  const handleDepositEUR = () => {
    // Navigation vers la page de dépôt EUR avec les méthodes de paiement
    navigate('/deposit/fiat', { 
      state: { 
        currency: 'EUR',
        methods: ['zen', 'sepa', 'easy-bank']
      }
    })
    onClose()
  }

  const handleBuyCrypto = () => {
    // Navigation vers la page one-click buy
    navigate('/buy/one-click', {
      state: {
        type: 'one-click-buy',
        defaultCurrency: 'EUR',
        defaultCrypto: 'USDT'
      }
    })
    onClose()
  }

  const handleDepositCrypto = () => {
    // Navigation vers la page de sélection de wallet pour dépôt crypto
    navigate('/deposit/crypto', {
      state: {
        supportedWallets: ['BYBIT', 'OKX', 'BINANCE'],
        action: 'deposit'
      }
    })
    onClose()
  }

  const buyOptions = [
    {
      id: 'deposit-eur',
      title: 'Déposer EUR',
      subtitle: 'Virement bancaire, carte',
      description: 'Déposez des EUR via virement SEPA, Zen ou Easy Bank Payment',
      icon: Euro,
      color: '#22c55e',
      badge: 'Recommandé',
      badgeColor: '#16a34a'
    },
    {
      id: 'buy-crypto',
      title: 'Acheter avec EUR',
      subtitle: 'Visa, Mastercard et JCB',
      description: 'Achat direct de crypto avec votre carte bancaire',
      icon: CreditCard,
      color: '#3b82f6',
      badge: '',
      badgeColor: ''
    },
    {
      id: 'p2p',
      title: 'Trading P2P',
      subtitle: 'Virement bancaire, Revolut, Wise',
      description: 'Échangez directement avec d\'autres utilisateurs',
      icon: Users,
      color: '#f59e0b',
      badge: '',
      badgeColor: ''
    }
  ]

  const depositOptions = [
    {
      id: 'deposit-crypto',
      title: 'Déposer des Cryptomonnaies',
      subtitle: 'Connecter votre wallet',
      description: 'Déposez depuis vos wallets BYBIT, OKX ou BINANCE',
      icon: Wallet,
      color: '#8b5cf6',
      badge: '',
      badgeColor: ''
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full bg-[#1a1a1a] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Sélectionner une méthode de paiement
              </h2>
              <motion.button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>

            {/* Acheter des cryptos avec fiat */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                Acheter des cryptos avec fiat
              </h3>
              
              <div className="space-y-3">
                {buyOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full bg-[#2d2d2d] border border-gray-700 rounded-xl p-4 hover:border-[#F7931A]/50 transition-all duration-200 ${
                      selectedOption === option.id ? 'border-[#F7931A] bg-[#3d3d3d]' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${option.color}20` }}
                        >
                          <option.icon 
                            className="w-5 h-5" 
                            style={{ color: option.color }}
                          />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-white font-medium">
                              {option.title}
                            </h4>
                            {option.badge && (
                              <span 
                                className="px-2 py-1 text-xs rounded-full text-white font-medium"
                                style={{ backgroundColor: option.badgeColor }}
                              >
                                {option.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-1">
                            {option.subtitle}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0 ml-3" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 my-6"></div>

            {/* Déposer des cryptos */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Bitcoin className="w-5 h-5 mr-2 text-orange-400" />
                Déposer des cryptomonnaies
              </h3>
              
              <div className="space-y-3">
                {depositOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full bg-[#2d2d2d] border border-gray-700 rounded-xl p-4 hover:border-[#F7931A]/50 transition-all duration-200 ${
                      selectedOption === option.id ? 'border-[#F7931A] bg-[#3d3d3d]' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (buyOptions.length + index) * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${option.color}20` }}
                        >
                          <option.icon 
                            className="w-5 h-5" 
                            style={{ color: option.color }}
                          />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h4 className="text-white font-medium mb-1">
                            {option.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-1">
                            {option.subtitle}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0 ml-3" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Information supplémentaire */}
            <div className="mt-6 p-4 bg-[#0f1419] border border-gray-800 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    Sécurisé par Kivoro
                  </h4>
                  <p className="text-gray-400 text-xs">
                    Toutes les transactions sont sécurisées et les fonds sont protégés par notre système de sécurité avancé.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BuyOptionsModal
