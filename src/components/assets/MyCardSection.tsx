import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Plus, 
  Settings,
  Lock,
  Smartphone,
  Wallet
} from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface MyCardSectionProps {
  onAction?: (actionId: string) => void
  className?: string
}

const MyCardSection: React.FC<MyCardSectionProps> = ({ 
  onAction, 
  className = '' 
}) => {
  const [showCardNumber, setShowCardNumber] = useState(false)
  const { withHaptic } = useHapticFeedback()

  const cardData = {
    number: '4532 1234 5678 6107',
    maskedNumber: '•••• •••• •••• 6107',
    holder: 'KIVORO USER',
    expiry: '12/28',
    type: 'Mastercard',
    status: 'active',
    balance: '€2,847.50',
    limit: '€5,000.00'
  }

  const upcomingFeatures = [
    {
      id: 'virtual-card',
      title: 'Carte Virtuelle',
      description: 'Paiements en ligne sécurisés',
      icon: Smartphone,
      status: 'Bientôt disponible',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'physical-card',
      title: 'Carte Physique',
      description: 'Commandez votre carte',
      icon: CreditCard,
      status: 'En développement',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <div className={className}>
      {/* Main Card */}
      <motion.div
        className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl p-4 border border-gray-700 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction?.('card-details')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-[#F7931A] to-[#FFA500]" />
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#F7931A] to-[#FFA500]" />
        </div>

        <div className="relative z-10">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-white">Ma Carte</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCardNumber(!showCardNumber)
                }}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <div className="text-lg font-mono text-white tracking-wider mb-2">
              {showCardNumber ? cardData.number : cardData.maskedNumber}
            </div>
            <div className="text-sm text-gray-400">{cardData.holder}</div>
          </div>

          {/* Card Details */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-xs text-gray-400">Expire</div>
                <div className="text-sm text-white font-medium">{cardData.expiry}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Solde</div>
                <div className="text-sm text-white font-medium">{cardData.balance}</div>
              </div>
            </div>
            
            {/* Mastercard Logo */}
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-[#FF5F00] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <div className="px-2 py-1 bg-[#FF5F00] rounded text-white text-xs font-medium">
                Mastercard
              </div>
            </div>
          </div>

          {/* Card Status */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-500">Carte Active</span>
            </div>
            <div className="text-xs text-gray-400">
              Limite: {cardData.limit}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Features */}
      <div className="mt-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-400">Prochainement</h3>
        
        {upcomingFeatures.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <motion.div
              key={feature.id}
              className={`${feature.bgColor} border border-gray-800 rounded-lg p-3`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-black/20 rounded-lg`}>
                    <IconComponent className={`w-4 h-4 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${feature.color}`}>
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">{feature.status}</span>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Add New Card Button */}
        <motion.button
          className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-[#F7931A] hover:text-[#F7931A] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction?.('add-card')}
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Ajouter une carte</span>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default MyCardSection
