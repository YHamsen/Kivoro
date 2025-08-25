import React, { useState, useEffect, useMemo } from 'react'
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
  Zap,
  Package,
  Eye
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

const eSIMOffersComplete: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  
  // États
  const [allCountries, setAllCountries] = useState<AiraloCountry[]>([])
  const [regionalPackages, setRegionalPackages] = useState<AiraloPackage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('countries')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'data'>('name')
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

  // Filtrage et tri des pays
  const filteredAndSortedCountries = useMemo(() => {
    let filtered = allCountries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion
      return matchesSearch && matchesRegion
    })

    // Tri
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        filtered.sort((a, b) => {
          const minPriceA = Math.min(...a.packages.map(p => p.price))
          const minPriceB = Math.min(...b.packages.map(p => p.price))
          return minPriceA - minPriceB
        })
        break
      case 'data':
        filtered.sort((a, b) => {
          const maxDataA = Math.max(...a.packages.map(p => parseInt(p.data)))
          const maxDataB = Math.max(...b.packages.map(p => parseInt(p.data)))
          return maxDataB - maxDataA
        })
        break
    }

    return filtered
  }, [allCountries, searchTerm, selectedRegion, sortBy])

  // Obtenir les régions uniques
  const regions = airaloApi.getAllRegions()

  // Pays populaires
  const popularCountries = airaloApi.getPopularCountries()

  // Forfaits régionaux/globaux filtrés
  const filteredRegionalPackages = useMemo(() => {
    return regionalPackages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [regionalPackages, searchTerm])

  // Statistiques globales
  const stats = airaloApi.getGlobalStats()

  const handleCountrySelect = (country: AiraloCountry) => {
    navigate(`/esim/details/${country.code}`, { state: { country } })
  }

  const handlePackageSelect = (pkg: AiraloPackage) => {
    navigate(`/esim/details/global`, { state: { package: pkg } })
  }

  const formatPrice = (price: number, currency: string = 'USD') => {
    if (price === 0) return 'Gratuit'
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price)
  }

  const getDataAmount = (dataStr: string): number => {
    const match = dataStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  const LoadingSpinner = () => (
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

  const CountryCard = ({ country }: { country: AiraloCountry }) => {
    const minPrice = Math.min(...country.packages.map(p => p.price).filter(p => p > 0))
    const maxData = Math.max(...country.packages.map(p => getDataAmount(p.data)))
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card 
          className="bg-[#1a1a1a] border-gray-800 p-4 cursor-pointer hover:border-[#F7931A] transition-colors"
          onClick={() => handleCountrySelect(country)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-8 rounded-md overflow-hidden border border-gray-700 flex-shrink-0">
              <img 
                src={country.flag} 
                alt={`Drapeau ${country.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{country.name}</h3>
              <p className="text-sm text-gray-400">{country.region}</p>
            </div>
            {country.isPopular && (
              <Badge className="bg-[#F7931A] text-black text-xs">
                <Star className="w-3 h-3 mr-1" />
                Populaire
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#F7931A]" />
              <span className="text-gray-100">{country.packages.length} forfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-gray-100">À partir de {formatPrice(minPrice)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-500" />
              <span className="text-gray-100">Jusqu'à {maxData} GB</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500" />
              <span className="text-gray-100">Voir détails</span>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  const RegionalPackageCard = ({ pkg }: { pkg: AiraloPackage }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="bg-[#1a1a1a] border-gray-800 p-4 cursor-pointer hover:border-[#F7931A] transition-colors"
        onClick={() => handlePackageSelect(pkg)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              pkg.type === 'global' ? 'bg-purple-500' : 
              pkg.type === 'regional' ? 'bg-blue-500' : 'bg-green-500'
            }`} />
            <Badge variant="outline" className={`text-xs ${
              pkg.type === 'global' ? 'border-purple-500 text-purple-400' : 
              pkg.type === 'regional' ? 'border-blue-500 text-blue-400' : 'border-green-500 text-green-400'
            }`}>
              {pkg.type === 'global' ? 'Mondial' : pkg.type === 'regional' ? 'Régional' : 'Local'}
            </Badge>
          </div>
          <span className="text-2xl font-bold text-[#F7931A]">
            {formatPrice(pkg.price)}
          </span>
        </div>
        
        <h3 className="font-semibold text-white mb-2">{pkg.title}</h3>
        <p className="text-sm text-gray-100 mb-3">{pkg.description}</p>
        
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-blue-500" />
            <span className="text-gray-100">{pkg.data}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-gray-100">{pkg.validity}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {pkg.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-100">
              {feature}
            </Badge>
          ))}
          {pkg.features.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-100">
              +{pkg.features.length - 2} autres
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header avec gradient */}
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
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Forfaits eSIM Airalo</h1>
            <p className="text-sm text-gray-400">
              {stats.totalCountries} pays • {stats.totalPackages} forfaits disponibles
            </p>
          </div>
          
          <div className="w-16" />
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un pays ou forfait..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder-gray-400 focus:border-[#F7931A]"
          />
        </div>

        {/* Filtres */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40 bg-[#2a2a2a] border-gray-700 text-white">
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
              <SelectItem value="all" className="text-gray-100 focus:bg-[#F7931A] focus:text-black">Toutes les régions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region} className="text-gray-100 focus:bg-[#F7931A] focus:text-black">{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: 'name' | 'price' | 'data') => setSortBy(value)}>
            <SelectTrigger className="w-40 bg-[#2a2a2a] border-gray-700 text-white">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
              <SelectItem value="name" className="text-gray-100 focus:bg-[#F7931A] focus:text-black">Nom du pays</SelectItem>
              <SelectItem value="price" className="text-gray-100 focus:bg-[#F7931A] focus:text-black">Prix croissant</SelectItem>
              <SelectItem value="data" className="text-gray-100 focus:bg-[#F7931A] focus:text-black">Plus de data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Statistiques en hero */}
        <motion.div 
          className="grid grid-cols-3 gap-3"
          {...ENTRANCE_ANIMATIONS.fadeIn}
        >
          <Card className="bg-gradient-to-br from-[#F7931A] to-[#FF6B00] border-0 p-4 text-center">
            <Globe className="w-6 h-6 mx-auto mb-2 text-black" />
            <p className="text-2xl font-bold text-black">{stats.totalCountries}</p>
            <p className="text-xs text-black/80">Pays</p>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 p-4 text-center">
            <Package className="w-6 h-6 mx-auto mb-2 text-white" />
            <p className="text-2xl font-bold text-white">{stats.totalPackages}</p>
            <p className="text-xs text-white/80">Forfaits</p>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-white" />
            <p className="text-2xl font-bold text-white">{stats.popularCountries}</p>
            <p className="text-xs text-white/80">Populaires</p>
          </Card>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div {...ENTRANCE_ANIMATIONS.fadeIn}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#2a2a2a] p-1">
              <TabsTrigger 
                value="popular" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black text-gray-300"
              >
                <Star className="w-4 h-4 mr-2" />
                Populaires
              </TabsTrigger>
              <TabsTrigger 
                value="countries" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black text-gray-300"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Pays
              </TabsTrigger>
              <TabsTrigger 
                value="regional" 
                className="data-[state=active]:bg-[#F7931A] data-[state=active]:text-black text-gray-300"
              >
                <Globe className="w-4 h-4 mr-2" />
                Régional
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="popular" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#F7931A]" />
                    <h2 className="text-lg font-semibold">Destinations populaires</h2>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div 
                      className="grid gap-4"
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
                      {popularCountries
                        .filter(country => 
                          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          country.code.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((country) => (
                          <CountryCard key={country.code} country={country} />
                        ))}
                    </motion.div>
                  </AnimatePresence>

                  {popularCountries.filter(country => 
                    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    country.code.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Aucune destination populaire trouvée</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="countries" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#F7931A]" />
                      <h2 className="text-lg font-semibold">Tous les pays</h2>
                    </div>
                    <span className="text-sm text-gray-400">
                      {filteredAndSortedCountries.length} pays
                    </span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div 
                      className="grid gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {filteredAndSortedCountries.map((country) => (
                        <CountryCard key={country.code} country={country} />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {filteredAndSortedCountries.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Aucun pays trouvé pour votre recherche</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="regional" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#F7931A]" />
                    <h2 className="text-lg font-semibold">Forfaits régionaux et mondiaux</h2>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div 
                      className="grid gap-4"
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
                      {filteredRegionalPackages.map((pkg) => (
                        <RegionalPackageCard key={pkg.id} pkg={pkg} />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {filteredRegionalPackages.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Aucun forfait régional trouvé</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default eSIMOffersComplete
