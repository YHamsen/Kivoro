import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Globe, 
  Smartphone, 
  Clock, 
  DollarSign, 
  Wifi,
  Filter,
  Star,
  TrendingUp,
  MapPin,
  Zap
} from 'lucide-react'
import { airaloApi } from '../../services/airaloApi'
import { AiraloCountry, AiraloPackage } from '../../data/airaloCountries'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

// Import des constantes harmonisées
import { COLORS, TAILWIND_COLORS } from '../../constants/colors'
import { BUTTON_ANIMATIONS, ENTRANCE_ANIMATIONS } from '../../constants/animations'
import { INTERACTION_HAPTICS } from '../../constants/haptics'

const eSIMOffersEnhanced: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  
  // États
  const [allCountries, setAllCountries] = useState<AiraloCountry[]>([])
  const [regionalPackages, setRegionalPackages] = useState<AiraloPackage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('countries')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      setLoading(true)
      
      // Chargement des données depuis le service
      const countries = airaloApi.getAllCountries()
      const regional = airaloApi.getRegionalPackages()
      
      setAllCountries(countries)
      setRegionalPackages(regional)
    } catch (error) {
      console.error('Erreur lors du chargement des données eSIM:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrage des pays
  const filteredCountries = allCountries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  // Obtenir les régions uniques
  const regions = airaloApi.getAllRegions()

  // Pays populaires
  const popularCountries = airaloApi.getPopularCountries()

  // Statistiques globales
  const stats = airaloApi.getGlobalStats()

  const handleCountrySelect = (country: AiraloCountry) => {
    navigate(`/esim/details/${country.code}`, { state: { country } })
  }

  const handlePackageSelect = (pkg: AiraloPackage) => {
    navigate(`/esim/details/global`, { state: { package: pkg } })
  }

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-[#F7931A] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Chargement des forfaits eSIM...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <motion.div 
        className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 z-10"
        {...ENTRANCE_ANIMATIONS.fadeIn}
      >
        <div className="flex items-center justify-between mb-4">
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
            <h1 className="text-xl font-bold">Forfaits eSIM</h1>
            <p className="text-sm text-gray-400">
              {stats.totalCountries} pays • {stats.totalPackages} forfaits
            </p>
          </div>
          
          <div className="w-16" />
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2a2a2a] border-gray-700 text-white"
          />
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Statistiques rapides */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          {...ENTRANCE_ANIMATIONS.fadeIn}
        >
          <Card className="bg-[#1a1a1a] border-gray-800 p-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#F7931A]" />
              <div>
                <p className="text-lg font-bold">{stats.totalCountries}</p>
                <p className="text-xs text-gray-400">Pays disponibles</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-gray-800 p-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-lg font-bold">{stats.totalPackages}</p>
                <p className="text-xs text-gray-400">Forfaits eSIM</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div {...ENTRANCE_ANIMATIONS.fadeIn}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#2a2a2a]">
              <TabsTrigger 
                value="popular" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black"
              >
                <Star className="w-4 h-4 mr-2" />
                Populaires
              </TabsTrigger>
              <TabsTrigger 
                value="countries" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black"
              >
                <Globe className="w-4 h-4 mr-2" />
                Pays
              </TabsTrigger>
              <TabsTrigger 
                value="regional" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Régional
              </TabsTrigger>
            </TabsList>

            {/* Pays populaires */}
            <TabsContent value="popular" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#F7931A]" />
                <h2 className="text-lg font-semibold">Destinations populaires</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {popularCountries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)}
                  >
                    <Card 
                      className="bg-[#1a1a1a] border-gray-800 p-4 cursor-pointer hover:border-[#F7931A]/50 transition-colors"
                      onClick={withHaptic(() => handleCountrySelect(country), INTERACTION_HAPTICS.assetSelect)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{country.flag}</div>
                          <div>
                            <h3 className="font-semibold">{country.name}</h3>
                            <p className="text-sm text-gray-400">
                              {country.packages.length} forfait{country.packages.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#F7931A]">
                            À partir de {formatPrice(country.packages[0]?.price || 0)}
                          </p>
                          <Badge variant="outline" className="text-green-500 border-green-500 text-xs">
                            Populaire
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Tous les pays */}
            <TabsContent value="countries" className="space-y-4 mt-6">
              {/* Filtre par région */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-40 bg-[#2a2a2a] border-gray-700">
                    <SelectValue placeholder="Région" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-gray-700">
                    <SelectItem value="all">Toutes les régions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Liste des pays */}
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence>
                  {filteredCountries.map((country, index) => (
                    <motion.div
                      key={country.code}
                      {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card 
                        className="bg-[#1a1a1a] border-gray-800 p-4 cursor-pointer hover:border-[#F7931A]/50 transition-colors"
                        onClick={withHaptic(() => handleCountrySelect(country), INTERACTION_HAPTICS.assetSelect)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{country.flag}</div>
                            <div>
                              <h3 className="font-semibold">{country.name}</h3>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-400">{country.region}</p>
                                <span className="text-gray-600">•</span>
                                <p className="text-sm text-gray-400">
                                  {country.packages.length} forfait{country.packages.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium text-[#F7931A]">
                              À partir de {formatPrice(country.packages[0]?.price || 0)}
                            </p>
                            {country.isPopular && (
                              <Badge variant="outline" className="text-green-500 border-green-500 text-xs mt-1">
                                Populaire
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCountries.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  {...ENTRANCE_ANIMATIONS.fadeIn}
                >
                  <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun pays trouvé</h3>
                  <p className="text-gray-400">
                    Essayez de modifier votre recherche ou votre filtre
                  </p>
                </motion.div>
              )}
            </TabsContent>

            {/* Forfaits régionaux */}
            <TabsContent value="regional" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#F7931A]" />
                <h2 className="text-lg font-semibold">Forfaits régionaux et globaux</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {regionalPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)}
                  >
                    <Card 
                      className="bg-[#1a1a1a] border-gray-800 p-4 cursor-pointer hover:border-[#F7931A]/50 transition-colors"
                      onClick={withHaptic(() => handlePackageSelect(pkg), INTERACTION_HAPTICS.assetSelect)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-[#F7931A]" />
                          <h3 className="font-semibold">{pkg.title}</h3>
                          <Badge 
                            className={`text-xs ${
                              pkg.type === 'global' 
                                ? 'bg-purple-500/10 text-purple-500 border-purple-500' 
                                : 'bg-blue-500/10 text-blue-500 border-blue-500'
                            }`}
                          >
                            {pkg.type === 'global' ? 'Global' : 'Régional'}
                          </Badge>
                        </div>
                        
                        <p className="text-lg font-bold text-[#F7931A]">
                          {formatPrice(pkg.price)}
                        </p>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default eSIMOffersEnhanced
