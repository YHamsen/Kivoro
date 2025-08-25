import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Globe, Smartphone, Clock, DollarSign } from 'lucide-react'
import { airaloApi, eSIMOffer } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

const eSIMOffers: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [offers, setOffers] = useState<eSIMOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await airaloApi.geteSIMOffers()
      setOffers(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch eSIM offers')
    } finally {
      setLoading(false)
    }
  }

  const filteredOffers = offers.filter(offer =>
    offer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.operator.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOfferSelect = (offer: eSIMOffer) => {
    navigate(`/esim/details/${offer.id}`, { state: { offer } })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
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
            <h1 className="text-xl font-bold">Buy eSIM</h1>
            <div className="w-16"></div>
          </div>

          {/* Loading Animation */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl h-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
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
            <h1 className="text-xl font-bold">Buy eSIM</h1>
            <div className="w-16"></div>
          </div>

          {/* Error State */}
          <div className="text-center py-12">
            <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Unable to Load Offers</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <motion.button
              onClick={withHaptic(fetchOffers, 'medium')}
              className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-xl font-bold">Buy eSIM</h1>
          <div className="w-16"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by country or operator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
          />
        </div>

        {/* eSIM Offers */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No offers found</h3>
              <p className="text-gray-500">Try searching for a different country or operator</p>
            </div>
          ) : (
            filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={withHaptic(() => handleOfferSelect(offer), 'medium')}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#F7931A]/50 hover:bg-[#2d2d2d] transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F7931A] to-[#FFD700] rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{offer.country}</h3>
                      <p className="text-gray-400 text-sm">{offer.operator}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#F7931A] font-bold text-lg">${offer.price}</p>
                    <p className="text-gray-400 text-xs">≈ {offer.cryptoPrice} BTC</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Smartphone className="w-4 h-4" />
                    <span>{offer.dataAmount}{offer.dataUnit}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{offer.validity}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <DollarSign className="w-4 h-4" />
                    <span>{offer.currency}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs mt-3 line-clamp-2">
                  {offer.description}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default eSIMOffers
