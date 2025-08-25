import React, { useState } from 'react'
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
  Share2,
  Bookmark,
  Info,
  Zap,
  Shield,
  Headphones,
  Network,
  Eye,
  EyeOff
} from 'lucide-react'
import { eSIMOffer } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

const eSIMDetailsOptimized: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  const [showCrypto, setShowCrypto] = useState(false)
  
  const offer = location.state?.offer as eSIMOffer

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Offre introuvable</h3>
          <p className="text-gray-500 mb-4">Veuillez sélectionner une offre dans la liste</p>
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

  const handlePurchase = () => {
    navigate(`/esim/payment/${offer.id}`, { state: { offer } })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="px-4 py-6">
        {/* Header optimisé */}
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
          <h1 className="text-xl font-bold">Détails du forfait</h1>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowCrypto(!showCrypto)}
              className={`p-2 rounded-lg transition-colors ${
                showCrypto ? 'bg-[#F7931A] text-white' : 'bg-[#1a1a1a] text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {showCrypto ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </motion.button>
            <motion.button
              className="p-2 bg-[#1a1a1a] text-gray-400 rounded-lg hover:text-white"
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* En-tête du forfait (sans redondance) */}
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
              {showCrypto && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/70 text-sm"
                >
                  ≈ {offer.cryptoPrice} BTC
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Spécifications techniques compactes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-[#F7931A]" />
            <span>Spécifications</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2d2d2d] rounded-lg p-3 flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-xs">Données</p>
                <p className="text-white font-semibold">{offer.dataAmount}{offer.dataUnit}</p>
              </div>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-lg p-3 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-xs">Validité</p>
                <p className="text-white font-semibold">{offer.validity}</p>
              </div>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-lg p-3 flex items-center space-x-3">
              <Network className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-xs">Type</p>
                <p className="text-white font-semibold capitalize">{offer.type}</p>
              </div>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-lg p-3 flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-gray-400 text-xs">Devise</p>
                <p className="text-white font-semibold">{offer.currency}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Couverture géographique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-[#F7931A]" />
            <h3 className="text-lg font-semibold text-white">Couverture</h3>
            <span className="bg-[#F7931A] text-white text-xs px-2 py-1 rounded-full">
              {offer.coverage.length} pays
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {offer.coverage.map((country, index) => (
              <span
                key={index}
                className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {country}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Avantages et fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Avantages inclus</span>
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Zap, text: 'Activation instantanée après achat', color: 'text-yellow-500' },
              { icon: Smartphone, text: 'Compatible avec tous les appareils eSIM', color: 'text-blue-500' },
              { icon: Network, text: 'Connexion haut débit garantie', color: 'text-green-500' },
              { icon: Shield, text: 'Connexion sécurisée et cryptée', color: 'text-purple-500' },
              { icon: Headphones, text: 'Support client 24/7 disponible', color: 'text-[#F7931A]' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description concise (sans redondance) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Info className="w-5 h-5 text-[#F7931A]" />
            <h3 className="text-lg font-semibold text-white">À propos de ce forfait</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed">
              Profitez d'une connectivité mobile haute qualité avec ce forfait eSIM {offer.type.toLowerCase()}. 
              Idéal pour vos voyages d'affaires ou de loisir.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>• Pas de carte physique requise</span>
              <span>• Installation en quelques minutes</span>
              <span>• Utilisation immédiate</span>
            </div>
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={withHaptic(handlePurchase, 'medium')}
            className="w-full bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Smartphone className="w-5 h-5" />
            <span>Acheter maintenant - ${offer.price}</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full bg-[#1a1a1a] border border-gray-700 text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-[#2d2d2d] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Bookmark className="w-5 h-5" />
            <span>Sauvegarder pour plus tard</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default eSIMDetailsOptimized
