import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, 
  Globe, 
  Smartphone, 
  Clock, 
  DollarSign, 
  MapPin, 
  CheckCircle,
  Wifi
} from 'lucide-react'
import { eSIMOffer } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

const eSIMDetails: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  
  const offer = location.state?.offer as eSIMOffer

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Offer not found</h3>
          <p className="text-gray-500 mb-4">Please select an offer from the list</p>
          <motion.button
            onClick={withHaptic(() => navigate('/esim/offers'), 'medium')}
            className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Offers
          </motion.button>
        </div>
      </div>
    )
  }

  const handlePurchase = () => {
    navigate(`/esim/payment/${offer.id}`, { state: { offer } })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={withHaptic(() => navigate(-1), 'light')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </motion.button>
          <h1 className="text-xl font-bold">eSIM Details</h1>
          <div className="w-16"></div>
        </div>

        {/* Offer Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#F7931A] to-[#FFD700] rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{offer.country}</h2>
                <p className="text-white/80">{offer.operator}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${offer.price}</p>
              <p className="text-white/80 text-sm">≈ {offer.cryptoPrice} BTC</p>
            </div>
          </div>
        </motion.div>

        {/* Data Plan Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Data Plan Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-sm">Data Amount</p>
                <p className="text-white font-medium">{offer.dataAmount}{offer.dataUnit}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-sm">Validity</p>
                <p className="text-white font-medium">{offer.validity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-sm">Currency</p>
                <p className="text-white font-medium">{offer.currency}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-sm">Type</p>
                <p className="text-white font-medium capitalize">{offer.type}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-[#F7931A]" />
            <h3 className="text-lg font-semibold text-white">Coverage</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {offer.coverage.map((country, index) => (
              <span
                key={index}
                className="bg-[#2d2d2d] text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {country}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">{offer.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
          <div className="space-y-3">
            {[
              'Instant activation after purchase',
              'No physical SIM card required',
              'Works with eSIM compatible devices',
              'High-speed data connection',
              '24/7 customer support'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Purchase Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={withHaptic(handlePurchase, 'medium')}
          className="w-full bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Purchase for ${offer.price}
        </motion.button>
      </div>
    </div>
  )
}

export default eSIMDetails
