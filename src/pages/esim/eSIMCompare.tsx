import React, { useState, useEffect } from 'react'
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
  Wifi,
  X,
  Plus,
  Star,
  Award,
  Zap,
  Shield,
  Network,
  Eye,
  EyeOff
} from 'lucide-react'
import { eSIMOffer } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface CompareProps {
  selectedOffers?: eSIMOffer[]
}

const eSIMCompare: React.FC<CompareProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  const [compareOffers, setCompareOffers] = useState<eSIMOffer[]>([])
  const [showCrypto, setShowCrypto] = useState(false)

  useEffect(() => {
    const offers = location.state?.offers as eSIMOffer[]
    if (offers && offers.length > 0) {
      setCompareOffers(offers.slice(0, 3)) // Maximum 3 offres à comparer
    }
  }, [location.state])

  const removeOffer = (offerId: string) => {
    setCompareOffers(prev => prev.filter(offer => offer.id !== offerId))
  }

  const handlePurchase = (offer: eSIMOffer) => {
    navigate(`/esim/payment/${offer.id}`, { state: { offer } })
  }

  const handleViewDetails = (offer: eSIMOffer) => {
    navigate(`/esim/details-optimized/${offer.id}`, { state: { offer } })
  }

  const getBestValue = () => {
    if (compareOffers.length === 0) return null
    return compareOffers.reduce((best, current) => {
      const bestRatio = parseInt(best.dataAmount) / best.price
      const currentRatio = parseInt(current.dataAmount) / current.price
      return currentRatio > bestRatio ? current : best
    })
  }

  const getCheapest = () => {
    if (compareOffers.length === 0) return null
    return compareOffers.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest
    )
  }

  const bestValue = getBestValue()
  const cheapest = getCheapest()

  if (compareOffers.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Aucun forfait à comparer</h3>
          <p className="text-gray-500 mb-4">Sélectionnez des forfaits pour les comparer</p>
          <motion.button
            onClick={withHaptic(() => navigate('/esim/countries'), 'medium')}
            className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Parcourir les offres
          </motion.button>
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
            <span>Retour</span>
          </motion.button>
          <div className="text-center">
            <h1 className="text-xl font-bold">Comparaison</h1>
            <p className="text-sm text-gray-400">{compareOffers.length} forfaits sélectionnés</p>
          </div>
          <motion.button
            onClick={() => setShowCrypto(!showCrypto)}
            className={`p-2 rounded-lg transition-colors ${
              showCrypto ? 'bg-[#F7931A] text-white' : 'bg-[#1a1a1a] text-gray-400'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {showCrypto ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Tableau de comparaison */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
          {/* En-têtes des forfaits */}
          <div className="grid grid-cols-1 gap-4 p-4">
            {compareOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#2d2d2d] rounded-xl p-4 relative"
              >
                {/* Badge meilleur rapport */}
                {bestValue?.id === offer.id && (
                  <div className="absolute -top-2 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>Meilleur rapport</span>
                  </div>
                )}
                
                {/* Badge moins cher */}
                {cheapest?.id === offer.id && bestValue?.id !== offer.id && (
                  <div className="absolute -top-2 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Moins cher</span>
                  </div>
                )}

                {/* Bouton supprimer */}
                <motion.button
                  onClick={() => removeOffer(offer.id)}
                  className="absolute -top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                {/* Header du forfait */}
                <div className="flex items-center justify-between mb-4 mt-2">
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
                    {showCrypto && (
                      <p className="text-gray-500 text-xs">≈ {offer.cryptoPrice} BTC</p>
                    )}
                  </div>
                </div>

                {/* Spécifications */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#1a1a1a] rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wifi className="w-4 h-4 text-[#F7931A]" />
                      <span className="text-gray-400 text-xs">Données</span>
                    </div>
                    <p className="text-white font-semibold">{offer.dataAmount}{offer.dataUnit}</p>
                  </div>
                  
                  <div className="bg-[#1a1a1a] rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-[#F7931A]" />
                      <span className="text-gray-400 text-xs">Validité</span>
                    </div>
                    <p className="text-white font-semibold">{offer.validity}</p>
                  </div>
                </div>

                {/* Calcul du rapport données/prix */}
                <div className="bg-[#1a1a1a] rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-400 text-xs">Rapport données/prix</span>
                  </div>
                  <p className="text-white font-semibold">
                    {(parseInt(offer.dataAmount) / offer.price).toFixed(2)} GB/$
                  </p>
                </div>

                {/* Fonctionnalités */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">Activation instantanée</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">Compatible eSIM</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">Support 24/7</span>
                  </div>
                </div>

                {/* Couverture */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#F7931A]" />
                    <span className="text-gray-400 text-xs">Couverture</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {offer.coverage.slice(0, 3).map((country, idx) => (
                      <span key={idx} className="bg-[#1a1a1a] text-gray-300 px-2 py-1 rounded text-xs">
                        {country}
                      </span>
                    ))}
                    {offer.coverage.length > 3 && (
                      <span className="bg-[#1a1a1a] text-gray-400 px-2 py-1 rounded text-xs">
                        +{offer.coverage.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    onClick={withHaptic(() => handlePurchase(offer), 'medium')}
                    className="bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-white py-2 px-4 rounded-lg text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Acheter
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleViewDetails(offer)}
                    className="bg-[#1a1a1a] border border-gray-600 text-gray-300 py-2 px-4 rounded-lg text-sm hover:text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Détails
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Résumé de comparaison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mt-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Résumé de comparaison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Prix le plus bas</p>
              <p className="text-white font-bold">${Math.min(...compareOffers.map(o => o.price))}</p>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
              <Wifi className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Plus de données</p>
              <p className="text-white font-bold">
                {Math.max(...compareOffers.map(o => parseInt(o.dataAmount)))}GB
              </p>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-lg p-4 text-center">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Meilleur rapport</p>
              <p className="text-white font-bold">
                {bestValue && (parseInt(bestValue.dataAmount) / bestValue.price).toFixed(2)} GB/$
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions globales */}
        <div className="flex space-x-4 mt-6">
          <motion.button
            onClick={() => navigate('/esim/countries')}
            className="flex-1 bg-[#1a1a1a] border border-gray-700 text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-[#2d2d2d] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter plus d'offres</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default eSIMCompare
