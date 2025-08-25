import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Star, Clock, MessageCircle, AlertTriangle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

interface P2POfferDetailsProps {}

const P2POfferDetails: React.FC<P2POfferDetailsProps> = () => {
  const navigate = useNavigate()
  const { offerId } = useParams()
  const [amount, setAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  // Données de l'offre (normalement récupérées via API)
  const offer = {
    id: offerId,
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
    isOnline: true,
    terms: 'Paiement uniquement par Revolut ou SEPA Instant. Vérification d\'identité requise pour les montants supérieurs à 1000€.',
    instructions: '1. Effectuez le paiement\n2. Marquez comme payé\n3. Attendez la libération des crypto\n4. Confirmez la réception'
  }

  const handleBack = () => {
    navigate('/p2p')
  }

  const calculateCryptoAmount = () => {
    if (!amount) return '0'
    return (parseFloat(amount) / offer.price).toFixed(6)
  }

  const handleSubmit = () => {
    // Logic pour initier la transaction
    console.log('Transaction initiée:', {
      offerId,
      amount,
      paymentMethod: selectedPaymentMethod,
      cryptoAmount: calculateCryptoAmount()
    })
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
          <h1 className="text-lg font-semibold">Détails de l'offre</h1>
          <div className="w-5 h-5" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Informations du marchand */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[#F7931A] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {offer.merchant.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold">{offer.merchant.name}</span>
                {offer.merchant.verified && (
                  <Shield className="w-4 h-4 text-[#22c55e]" />
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-[#fbbf24] fill-current" />
                  <span>{offer.merchant.rating}</span>
                </div>
                <span>{offer.merchant.orders} ordres</span>
                <span>{offer.merchant.completionRate}% réussite</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-[#22c55e]">
              <div className="w-3 h-3 bg-[#22c55e] rounded-full" />
              <span className="text-sm">En ligne</span>
            </div>
          </div>
        </div>

        {/* Détails de l'offre */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <h3 className="text-white font-semibold mb-4">Détails de l'offre</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Prix</span>
              <span className="text-white font-semibold">{offer.price.toFixed(3)} {offer.currency}/{offer.crypto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantité disponible</span>
              <span className="text-white">{offer.quantity.toLocaleString()} {offer.crypto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Limites</span>
              <span className="text-white">{offer.limits.min} - {offer.limits.max} {offer.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Délai de paiement</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-white">{offer.timeLimit} minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Méthodes de paiement */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <h3 className="text-white font-semibold mb-4">Méthodes de paiement</h3>
          <div className="space-y-2">
            {offer.paymentMethods.map((method, index) => (
              <motion.button
                key={index}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  selectedPaymentMethod === method
                    ? 'border-[#F7931A] bg-[#F7931A] bg-opacity-10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedPaymentMethod(method)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white">{method}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Formulaire de transaction */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <h3 className="text-white font-semibold mb-4">Montant à acheter</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Montant en {offer.currency}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min: ${offer.limits.min}, Max: ${offer.limits.max}`}
                className="w-full bg-[#2d2d2d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
              />
            </div>
            
            {amount && (
              <div className="bg-[#2d2d2d] p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vous recevrez</span>
                  <span className="text-white font-semibold">{calculateCryptoAmount()} {offer.crypto}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conditions et instructions */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <h3 className="text-white font-semibold mb-3">Conditions du marchand</h3>
          <p className="text-gray-300 text-sm mb-4">{offer.terms}</p>
          
          <h4 className="text-white font-medium mb-3">Instructions de paiement</h4>
          <div className="space-y-2">
            {offer.instructions.split('\n').map((instruction, index) => (
              <div key={index} className="text-gray-300 text-sm">
                {instruction}
              </div>
            ))}
          </div>
        </div>

        {/* Avertissement */}
        <div className="bg-[#fbbf24] bg-opacity-10 border border-[#fbbf24] rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24] mt-0.5" />
            <div>
              <h4 className="text-[#fbbf24] font-medium mb-1">Important</h4>
              <p className="text-[#fbbf24] text-sm">
                Ne libérez jamais vos cryptomonnaies avant d'avoir confirmé la réception du paiement sur votre compte.
              </p>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex space-x-3">
          <motion.button
            className="flex-1 flex items-center justify-center space-x-2 bg-[#2d2d2d] text-white py-3 rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contacter</span>
          </motion.button>
          
          <motion.button
            className="flex-2 bg-[#22c55e] text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!amount || !selectedPaymentMethod || parseFloat(amount) < offer.limits.min || parseFloat(amount) > offer.limits.max}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Acheter {offer.crypto}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default P2POfferDetails
