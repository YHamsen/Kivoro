import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Globe, 
  Smartphone, 
  Clock, 
  DollarSign, 
  MapPin, 
  CheckCircle,
  Wifi,
  Shield,
  Zap,
  RefreshCw,
  Star,
  Bitcoin,
  CreditCard,
  Download,
  Signal
} from 'lucide-react'
import { AiraloCountry, AiraloPackage } from '../../data/airaloCountries'
import { airaloApi } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import { useCryptoPrice } from '../../hooks/useCryptoPrice'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'

// Import des constantes harmonisées
import { TAILWIND_COLORS } from '../../constants/colors'
import { BUTTON_ANIMATIONS, ENTRANCE_ANIMATIONS } from '../../constants/animations'
import { INTERACTION_HAPTICS } from '../../constants/haptics'

const eSIMDetailsEnhanced: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { withHaptic } = useHapticFeedback()
  
  const [selectedPackage, setSelectedPackage] = useState<AiraloPackage | null>(null)
  
  // Récupération des données depuis l'état de navigation
  const country = location.state?.country as AiraloCountry
  const packageData = location.state?.package as AiraloPackage
  
  // Si c'est un forfait global/régional
  const isGlobalPackage = !!packageData
  
  // Si c'est un pays, récupérer les données du pays
  const countryCode = params.countryCode || country?.code
  const countryData = country || airaloApi.getCountryByCode(countryCode || '')

  if (!countryData && !packageData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Destination non trouvée</h3>
          <p className="text-gray-500 mb-4">Veuillez sélectionner une destination depuis la liste</p>
          <Button
            onClick={withHaptic(() => navigate('/esim/offers'), INTERACTION_HAPTICS.navigationBack)}
            className={`${TAILWIND_COLORS.bgOrange} text-black`}
          >
            Parcourir les forfaits
          </Button>
        </div>
      </div>
    )
  }

  const handlePackageSelect = (pkg: AiraloPackage) => {
    setSelectedPackage(pkg)
  }

  const handlePurchase = () => {
    const purchaseData = isGlobalPackage ? packageData : selectedPackage
    if (purchaseData) {
      navigate(`/esim/payment/${purchaseData.id}`, { 
        state: { 
          package: purchaseData, 
          country: countryData,
          isGlobal: isGlobalPackage 
        } 
      })
    }
  }

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price)
  }

  // Composant pour afficher le prix crypto
  const CryptoPriceDisplay = ({ price }: { price: number }) => {
    const { cryptoPrice, isLoading } = useCryptoPrice(price)
    
    if (isLoading) {
      return (
        <span className="flex items-center gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          ...
        </span>
      )
    }
    
    return <span>{cryptoPrice}</span>
  }

  const currentPackage = isGlobalPackage ? packageData : selectedPackage
  const packages = isGlobalPackage ? [packageData] : (countryData?.packages || [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Header */}
      <motion.div 
        className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 z-10"
        {...ENTRANCE_ANIMATIONS.fadeIn}
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={withHaptic(() => navigate(-1), INTERACTION_HAPTICS.navigationBack)}
            className="flex items-center text-gray-400 hover:text-white"
            whileHover={BUTTON_ANIMATIONS.hoverSubtle}
            whileTap={BUTTON_ANIMATIONS.tapSubtle}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </motion.button>
          
          <div className="text-center">
            {isGlobalPackage ? (
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#F7931A]" />
                <h1 className="text-lg font-bold">Forfait Global</h1>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{countryData?.flag}</span>
                <h1 className="text-lg font-bold">{countryData?.name}</h1>
              </div>
            )}
          </div>
          
          <div className="w-16" />
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* En-tête de destination */}
        <motion.div {...ENTRANCE_ANIMATIONS.fadeIn}>
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-gray-800 p-6">
            <div className="text-center">
              {isGlobalPackage ? (
                <div className="space-y-3">
                  <Globe className="w-16 h-16 text-[#F7931A] mx-auto" />
                  <h2 className="text-2xl font-bold">{packageData.title}</h2>
                  <p className="text-gray-400">{packageData.description}</p>
                  <div className="flex justify-center items-center gap-4">
                    <Badge className="bg-purple-500/10 text-purple-500 border-purple-500">
                      {packageData.type === 'global' ? 'Couverture mondiale' : 'Couverture régionale'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-6xl">{countryData?.flag}</div>
                  <h2 className="text-2xl font-bold">{countryData?.name}</h2>
                  <p className="text-gray-400">{countryData?.region}</p>
                  <div className="flex justify-center items-center gap-4">
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {countryData?.packages.length} forfait{(countryData?.packages.length || 0) > 1 ? 's' : ''} disponible{(countryData?.packages.length || 0) > 1 ? 's' : ''}
                    </Badge>
                    {countryData?.isPopular && (
                      <Badge className="bg-orange-500/10 text-orange-500 border-orange-500">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Forfaits disponibles */}
        {!isGlobalPackage && (
          <motion.div {...ENTRANCE_ANIMATIONS.fadeIn}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#F7931A]" />
              Forfaits disponibles
            </h3>
            
            <div className="space-y-3">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)}
                >
                  <Card 
                    className={`border-gray-800 p-4 cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id
                        ? 'bg-[#F7931A]/10 border-[#F7931A]/50'
                        : 'bg-[#1a1a1a] hover:border-[#F7931A]/30'
                    }`}
                    onClick={withHaptic(() => handlePackageSelect(pkg), INTERACTION_HAPTICS.assetSelect)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{pkg.title}</h4>
                          {selectedPackage?.id === pkg.id && (
                            <CheckCircle className="w-5 h-5 text-[#F7931A]" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {pkg.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-[#F7931A]">
                          {formatPrice(pkg.price)}
                        </div>
                        <div className="text-sm text-[#F7931A] font-medium">
                          ≈ <CryptoPriceDisplay price={pkg.price} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Détails du forfait sélectionné */}
        <AnimatePresence>
          {currentPackage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F7931A]" />
                Détails du forfait
              </h3>
              
              <Card className="bg-[#1a1a1a] border-gray-800 p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <Wifi className="w-8 h-8 text-[#F7931A] mx-auto mb-2" />
                    <p className="text-2xl font-bold">{currentPackage.data}</p>
                    <p className="text-sm text-gray-400">Données</p>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{currentPackage.validity}</p>
                    <p className="text-sm text-gray-400">Validité</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Activation instantanée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Signal className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Réseau 5G/4G/3G</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Rechargeable en ligne</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Installation par QR code</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prix et achat */}
        <AnimatePresence>
          {currentPackage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Card className="bg-[#1a1a1a] border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Forfait eSIM</span>
                    <span>{currentPackage.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination</span>
                    <span>
                      {isGlobalPackage ? 'Monde entier' : countryData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix USD</span>
                    <span className="font-semibold">{formatPrice(currentPackage.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix Bitcoin</span>
                    <span className="font-semibold text-[#F7931A]">
                      <CryptoPriceDisplay price={currentPackage.price} />
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={withHaptic(handlePurchase, INTERACTION_HAPTICS.buttonPrimary)}
                    className={`w-full ${TAILWIND_COLORS.bgOrange} text-black font-semibold py-3`}
                    size="lg"
                  >
                    <Bitcoin className="w-5 h-5 mr-2" />
                    Payer avec Bitcoin
                  </Button>
                  
                  <Button
                    onClick={withHaptic(handlePurchase, INTERACTION_HAPTICS.buttonSecondary)}
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800 py-3"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payer par carte
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message si aucun forfait sélectionné */}
        {!isGlobalPackage && !selectedPackage && (
          <motion.div 
            className="text-center py-8"
            {...ENTRANCE_ANIMATIONS.fadeIn}
          >
            <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sélectionnez un forfait</h3>
            <p className="text-gray-400">
              Choisissez le forfait qui correspond le mieux à vos besoins
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default eSIMDetailsEnhanced
