import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Star, Clock, Building } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface P2POffer {
  id: string
  merchant: {
    name: string
    avatar: string
    verified: boolean
    institutional: boolean
    rating: number
    orders: number
    completionRate: number
  }
  price: number
  currency: string
  crypto: string
  quantity: number
  limits: {
    min: number
    max: number
  }
  paymentMethods: string[]
  timeLimit: number // en minutes
  isOnline: boolean
}

interface P2POffersListProps {
  transactionType: 'buy' | 'sell'
  filters: {
    crypto: string
    fiatCurrency: string
    amount: string
    paymentMethod: string
  }
  mode: 'express' | 'p2p' | 'blockTrade'
}

// Données de test pour les offres P2P
const mockOffers: P2POffer[] = [
  {
    id: '1',
    merchant: {
      name: 'CryptoKing777',
      avatar: 'C',
      verified: true,
      institutional: false,
      rating: 4.9,
      orders: 1247,
      completionRate: 99.8
    },
    price: 0.859,
    currency: 'EUR',
    crypto: 'USDT',
    quantity: 50000,
    limits: { min: 100, max: 5000 },
    paymentMethods: ['Revolut', 'SEPA Instant'],
    timeLimit: 15,
    isOnline: true
  },
  {
    id: '2',
    merchant: {
      name: 'Iriska7r',
      avatar: 'I',
      verified: true,
      institutional: false,
      rating: 4.8,
      orders: 892,
      completionRate: 100
    },
    price: 0.861,
    currency: 'EUR',
    crypto: 'USDT',
    quantity: 25000,
    limits: { min: 50, max: 2500 },
    paymentMethods: ['Wise', 'Virement bancaire'],
    timeLimit: 30,
    isOnline: true
  },
  {
    id: '3',
    merchant: {
      name: 'VARADERO',
      avatar: 'V',
      verified: true,
      institutional: true,
      rating: 5.0,
      orders: 2150,
      completionRate: 99.9
    },
    price: 0.863,
    currency: 'EUR',
    crypto: 'USDT',
    quantity: 100000,
    limits: { min: 500, max: 50000 },
    paymentMethods: ['SEPA Instant', 'Virement bancaire', 'Revolut'],
    timeLimit: 15,
    isOnline: true
  },
  {
    id: '4',
    merchant: {
      name: 'Lunio-OTC',
      avatar: 'L',
      verified: true,
      institutional: true,
      rating: 4.9,
      orders: 533,
      completionRate: 99
    },
    price: 0.800,
    currency: 'EUR',
    crypto: 'USDT',
    quantity: 200000,
    limits: { min: 9000, max: 15000 },
    paymentMethods: ['Western Union'],
    timeLimit: 30,
    isOnline: false
  },
  {
    id: '5',
    merchant: {
      name: 'Mena_crypto',
      avatar: 'M',
      verified: true,
      institutional: false,
      rating: 4.7,
      orders: 114,
      completionRate: 64
    },
    price: 0.781,
    currency: 'EUR',
    crypto: 'USDT',
    quantity: 75000,
    limits: { min: 9000, max: 156200 },
    paymentMethods: ['Revolut', 'Transfers with s...', 'Virement bancaire', 'Wise', 'SEPA Instant'],
    timeLimit: 30,
    isOnline: true
  }
]

const P2POffersList: React.FC<P2POffersListProps> = ({ transactionType, filters, mode }) => {
  const navigate = useNavigate()

  const getActionButtonColor = () => {
    return transactionType === 'buy' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
  }

  const getActionButtonText = () => {
    return transactionType === 'buy' ? 'Acheter' : 'Vendre'
  }

  const handleOfferClick = (offerId: string) => {
    navigate(`/p2p/offer/${offerId}`)
  }

  return (
    <div className="px-4">
      <div className="space-y-3">
        {mockOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* En-tête de l'offre */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {/* Avatar du marchand */}
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    offer.merchant.institutional ? 'bg-[#3b82f6]' : 'bg-[#F7931A]'
                  }`}>
                    {offer.merchant.avatar}
                  </div>
                  {offer.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-[#1a1a1a]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">{offer.merchant.name}</span>
                    {offer.merchant.verified && (
                      <Shield className="w-4 h-4 text-[#22c55e]" />
                    )}
                    {offer.merchant.institutional && (
                      <Building className="w-4 h-4 text-[#3b82f6]" />
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-[#fbbf24] fill-current" />
                      <span className="text-xs text-gray-400">{offer.merchant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>{offer.merchant.orders} Ordres</span>
                    <span>{offer.merchant.completionRate}%</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{offer.timeLimit}Min(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Type de marchand */}
              {offer.merchant.institutional && (
                <div className="bg-[#3b82f6] bg-opacity-20 px-2 py-1 rounded text-xs text-[#3b82f6]">
                  Institution
                </div>
              )}
            </div>

            {/* Détails de l'offre */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-2xl font-bold text-white">
                  {filters.fiatCurrency} {offer.price.toFixed(3)}
                </div>
                <div className="text-sm text-gray-400">
                  Quantité {offer.quantity.toLocaleString()} {offer.crypto}
                </div>
              </div>

              <motion.button
                className={`px-6 py-2 ${getActionButtonColor()} text-white rounded-lg font-medium`}
                onClick={() => handleOfferClick(offer.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getActionButtonText()}
              </motion.button>
            </div>

            {/* Limites et méthodes de paiement */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">
                Limites {offer.limits.min.toLocaleString()} - {offer.limits.max.toLocaleString()} {offer.currency}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {offer.paymentMethods.map((method, idx) => (
                  <span
                    key={idx}
                    className="bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Indicateur de disponibilité */}
            {!offer.isOnline && (
              <div className="mt-2 text-xs text-[#ef4444]">
                Marchand hors ligne
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Message de fin de liste */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">Plus d'offres disponibles bientôt</p>
      </div>
    </div>
  )
}

export default P2POffersList
