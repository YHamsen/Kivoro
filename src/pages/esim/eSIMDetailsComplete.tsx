import React, { useState, useMemo } from 'react'
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
  Signal,
  Package,
  Info,
  AlertCircle,
  Bookmark,
  Share2
} from 'lucide-react'
import { AiraloCountry, AiraloPackage } from '../../data/airaloCountries'
import { airaloApi } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import { useCryptoPrice } from '../../hooks/useCryptoPrice'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

// Import des constantes harmonisées
import { TAILWIND_COLORS } from '../../constants/colors'
import { BUTTON_ANIMATIONS, ENTRANCE_ANIMATIONS } from '../../constants/animations'
import { INTERACTION_HAPTICS } from '../../constants/haptics'

const eSIMDetailsComplete: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { withHaptic } = useHapticFeedback()
  
  const [selectedPackage, setSelectedPackage] = useState<AiraloPackage | null>(null)
  const [activeTab, setActiveTab] = useState('packages')
  
  // Récupération des données depuis l'état de navigation
  const country = location.state?.country as AiraloCountry
  const packageData = location.state?.package as AiraloPackage
  
  // Si c'est un forfait global/régional
  const isGlobalPackage = !!packageData
  
  // Si c'est un pays, récupérer les données du pays
  const countryCode = params.countryCode || country?.code
  const countryData = country || airaloApi.getCountryByCode(countryCode || '')

  // Forfaits triés par popularité
  const sortedPackages = useMemo(() => {
    if (!countryData?.packages) return []
    
    return [...countryData.packages].sort((a, b) => {
      // Les forfaits gratuits en premier
      if (a.price === 0 && b.price !== 0) return -1
      if (b.price === 0 && a.price !== 0) return 1
      
      // Puis par popularité (rapport data/prix)
      const ratioA = parseInt(a.data) / (a.price || 1)
      const ratioB = parseInt(b.data) / (b.price || 1)
      
      return ratioB - ratioA
    })
  }, [countryData])

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
    if (price === 0) return 'Gratuit'
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price)
  }

  // Composant pour afficher le prix crypto
  const CryptoPriceDisplay = ({ price }: { price: number }) => {
    const { cryptoPrice, isLoading, error } = useCryptoPrice(price)
    
    if (isLoading) {
      return (
        <div className="text-sm text-[#F7931A] font-medium flex items-center gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          Calcul...
        </div>
      )
    }
    
    return (
      <div className="text-sm text-[#F7931A] font-medium">
        {cryptoPrice}
        {error && (
          <span className="text-xs text-yellow-400 block">
            {error}
          </span>
        )}
      </div>
    )
  }

  const getDataAmount = (dataStr: string): number => {
    const match = dataStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  const getBestValue = () => {
    if (!countryData?.packages || countryData.packages.length === 0) return null
    
    return countryData.packages.reduce((best, current) => {
      const currentRatio = getDataAmount(current.data) / (current.price || 0.1)
      const bestRatio = getDataAmount(best.data) / (best.price || 0.1)
      return currentRatio > bestRatio ? current : best
    })
  }

  const PackageCard = ({ pkg, isSelected, onClick, isBestValue = false }: { 
    pkg: AiraloPackage, 
    isSelected: boolean, 
    onClick: () => void,
    isBestValue?: boolean 
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {isBestValue && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold">
            <Star className="w-3 h-3 mr-1" />
            Meilleur rapport
          </Badge>
        </div>
      )}
      
      <Card 
        className={`border-2 transition-all cursor-pointer ${
          isSelected 
            ? 'border-[#F7931A] bg-[#F7931A]/10 shadow-lg shadow-[#F7931A]/20' 
            : isBestValue
            ? 'border-yellow-400 bg-[#1a1a1a] hover:border-yellow-300 shadow-md shadow-yellow-400/20'
            : 'border-gray-800 bg-[#1a1a1a] hover:border-gray-600'
        }`}
        onClick={onClick}
      >
        <div className="p-4 space-y-4">
          {/* En-tête du forfait */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${pkg.price === 0 ? 'bg-green-500' : 'bg-[#F7931A]'}`} />
              <h3 className="font-semibold text-white">{pkg.title}</h3>
            </div>
            
            {pkg.price === 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                Gratuit
              </Badge>
            )}
          </div>

          {/* Prix principal */}
          <div className="text-center py-4 border border-gray-700 rounded-lg bg-[#2a2a2a]/50">
            <div className="text-3xl font-bold text-[#F7931A] mb-1">
              {formatPrice(pkg.price)}
            </div>
            <CryptoPriceDisplay price={pkg.price} />
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-200">Données</p>
                <p className="font-semibold text-white">{pkg.data}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-sm text-gray-200">Validité</p>
                <p className="font-semibold text-white">{pkg.validity}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-gray-700">
            <p className="text-sm text-gray-100 mb-3">{pkg.description}</p>
            
            {/* Fonctionnalités */}
            <div className="space-y-2">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-100">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton de sélection */}
          <Button
            className={`w-full font-semibold transition-all ${
              isSelected 
                ? 'bg-[#F7931A] text-black hover:bg-[#E6830F] shadow-lg' 
                : 'bg-gradient-to-r from-[#F7931A] to-[#E6830F] text-black hover:from-[#E6830F] hover:to-[#D16B00] shadow-md hover:shadow-lg'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            {isSelected ? '✓ Sélectionné' : 'Sélectionner ce forfait'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header avec info pays/forfait */}
      <motion.div 
        className="sticky top-0 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-b border-gray-800 p-4 z-10"
        {...ENTRANCE_ANIMATIONS.fadeIn}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={withHaptic(() => navigate(-1), INTERACTION_HAPTICS.navigationBack)}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
            whileHover={BUTTON_ANIMATIONS.hoverSubtle}
            whileTap={BUTTON_ANIMATIONS.tapSubtle}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </motion.button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info destination */}
        {countryData && !isGlobalPackage && (
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://flagcdn.com/w320/${countryData.code.toLowerCase()}.png`
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{countryData.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {countryData.region}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {countryData.packages.length} forfaits
                </span>
              </div>
            </div>
            {countryData.isPopular && (
              <Badge className="bg-[#F7931A] text-black">
                <Star className="w-3 h-3 mr-1" />
                Populaire
              </Badge>
            )}
          </div>
        )}

        {/* Info forfait global */}
        {packageData && isGlobalPackage && (
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">{packageData.title}</h1>
            <p className="text-gray-400">{packageData.description}</p>
          </div>
        )}
      </motion.div>

      <div className="p-4">
        {/* Forfait global - Affichage direct */}
        {isGlobalPackage && packageData && (
          <motion.div 
            className="space-y-6"
            {...ENTRANCE_ANIMATIONS.fadeIn}
          >
            <PackageCard 
              pkg={packageData}
              isSelected={true}
              onClick={() => {}}
            />
            
            <div className="flex gap-3">
              <Button
                onClick={handlePurchase}
                className="flex-1 bg-[#F7931A] text-black font-semibold"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Acheter maintenant
              </Button>
            </div>
          </motion.div>
        )}

        {/* Forfaits par pays */}
        {countryData && !isGlobalPackage && (
          <motion.div 
            className="space-y-6"
            {...ENTRANCE_ANIMATIONS.fadeIn}
          >
            {/* Statistiques rapides */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-[#1a1a1a] border-gray-800 p-3 text-center">
                <Package className="w-5 h-5 text-[#F7931A] mx-auto mb-1" />
                <p className="text-lg font-bold">{countryData.packages.length}</p>
                <p className="text-xs text-gray-400">Forfaits</p>
              </Card>
              
              <Card className="bg-[#1a1a1a] border-gray-800 p-3 text-center">
                <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold">
                  {formatPrice(Math.min(...countryData.packages.map(p => p.price).filter(p => p > 0)))}
                </p>
                <p className="text-xs text-gray-400">À partir de</p>
              </Card>
              
              <Card className="bg-[#1a1a1a] border-gray-800 p-3 text-center">
                <Wifi className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-bold">
                  {Math.max(...countryData.packages.map(p => getDataAmount(p.data)))} GB
                </p>
                <p className="text-xs text-gray-400">Maximum</p>
              </Card>
            </div>

            {/* Navigation par onglets */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#2a2a2a] p-1">
                <TabsTrigger 
                  value="packages"
                  className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black text-gray-300"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Forfaits ({countryData.packages.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="info"
                  className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black text-gray-300"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Informations
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="packages" className="mt-0">
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        className="space-y-4"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {sortedPackages.map((pkg, index) => (
                          <PackageCard 
                            key={pkg.id}
                            pkg={pkg}
                            isSelected={selectedPackage?.id === pkg.id}
                            onClick={() => handlePackageSelect(pkg)}
                            isBestValue={getBestValue()?.id === pkg.id && pkg.price > 0}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </TabsContent>

                <TabsContent value="info" className="mt-0">
                  <div className="space-y-4">
                    <Card className="bg-[#1a1a1a] border-gray-800 p-4">
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Signal className="w-5 h-5 text-[#F7931A]" />
                        Couverture réseau
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100">Technologie</span>
                          <span className="text-white">5G/4G/3G</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100">Opérateurs</span>
                          <span className="text-white">Partenaires locaux</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100">Hotspot</span>
                          <span className="text-green-400">✓ Inclus</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-[#1a1a1a] border-gray-800 p-4">
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        Installation et activation
                      </h3>
                      <div className="space-y-3 text-sm text-gray-100">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Installation instantanée par QR code</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Compatible avec tous les appareils eSIM</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Support client 24/7</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Données seulement, pas d'appels/SMS</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-yellow-500/10 border-yellow-500/50 p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-400 mb-1">Important</h4>
                          <p className="text-sm text-yellow-200">
                            Assurez-vous que votre appareil supporte la technologie eSIM avant l'achat. 
                            Les forfaits ne peuvent pas être remboursés une fois activés.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {/* Bouton d'achat fixe */}
            {selectedPackage && (
              <motion.div 
                className="sticky bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
              >
                <Card className="bg-[#1a1a1a] border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{selectedPackage.title}</p>
                      <p className="text-sm text-gray-200">{selectedPackage.data} • {selectedPackage.validity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#F7931A]">
                        {formatPrice(selectedPackage.price)}
                      </p>
                      <div className="text-xs">
                        <CryptoPriceDisplay price={selectedPackage.price} />
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-[#F7931A] text-black font-semibold"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Acheter maintenant
                  </Button>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default eSIMDetailsComplete
