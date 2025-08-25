import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Globe, 
  Filter,
  ChevronDown,
  MapPin,
  Smartphone,
  Star,
  Wifi
} from 'lucide-react'
import { airaloApi } from '../../services/airaloApi'
import { AIRALO_COUNTRIES, AiraloCountry } from '../../data/airaloCountries'
import useHapticFeedback from '../../hooks/useHapticFeedback'

const CountrySelector: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [statistics, setStatistics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const stats = airaloApi.getStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    } finally {
      setLoading(false)
    }
  }

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(AIRALO_COUNTRIES.map(country => country.region))]
    return uniqueRegions.sort()
  }, [])

  const filteredCountries = useMemo(() => {
    return AIRALO_COUNTRIES.filter(country => {
      const matchesSearch = 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRegion = !selectedRegion || country.region === selectedRegion
      
      return matchesSearch && matchesRegion
    })
  }, [searchTerm, selectedRegion])

  const popularCountries = useMemo(() => {
    return filteredCountries.filter(country => country.isPopular)
  }, [filteredCountries])

  const getCountryPackageCount = (country: AiraloCountry) => {
    return country.packages.length
  }

  const handleCountrySelect = (countryCode: string) => {
    navigate(`/esim/countries/${countryCode}`)
  }

  const CountryCard = ({ country }: { country: AiraloCountry }) => {
    const packageCount = getCountryPackageCount(country)
    const minPrice = Math.min(...country.packages.map(p => p.price))

    return (
      <motion.div
        onClick={withHaptic(() => handleCountrySelect(country.code), 'medium')}
        className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#F7931A]/50 hover:bg-[#2d2d2d] transition-all duration-200 cursor-pointer group"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#F7931A] to-[#FFD700] flex items-center justify-center">
            {country.flag ? (
              <img 
                src={country.flag} 
                alt={`Drapeau ${country.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
            ) : null}
            <Globe className="w-6 h-6 text-white" style={{ display: country.flag ? 'none' : 'flex' }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-semibold text-lg group-hover:text-[#F7931A] transition-colors">
                {country.name}
              </h3>
              {country.isPopular && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-gray-400 text-sm">{country.region}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Smartphone className="w-4 h-4 text-[#F7931A]" />
            <span className="text-sm">{packageCount} forfait{packageCount > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Wifi className="w-4 h-4 text-[#F7931A]" />
            <span className="text-sm">Dès ${minPrice}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Code: {country.code}</span>
            <motion.div 
              className="text-[#F7931A] text-sm flex items-center space-x-1 group-hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-3 h-3" />
              <span>Explorer</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 border-4 border-[#F7931A] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Chargement des destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header avec navigation */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={withHaptic(() => navigate(-1), 'light')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </motion.button>

            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F7931A] to-[#FFD700] bg-clip-text text-transparent">
                Choisir une Destination
              </h1>
              <p className="text-gray-400 text-sm">
                {statistics?.totalCountries} pays • {statistics?.totalPackages} forfaits disponibles
              </p>
            </div>

            <div className="w-16" /> {/* Spacer pour centrer le titre */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Barre de recherche et filtres */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none transition-colors"
              />
            </div>

            {/* Filtre par région */}
            <div className="relative">
              <motion.button
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white hover:border-[#F7931A] transition-colors min-w-[150px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
                <span>{selectedRegion || 'Toutes les régions'}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {showRegionDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg py-2 z-20 min-w-[200px]"
                >
                  <motion.button
                    onClick={() => {
                      setSelectedRegion('')
                      setShowRegionDropdown(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d2d] transition-colors text-gray-300"
                    whileHover={{ backgroundColor: '#2d2d2d' }}
                  >
                    Toutes les régions
                  </motion.button>
                  {regions.map(region => (
                    <motion.button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region)
                        setShowRegionDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d2d] transition-colors ${
                        selectedRegion === region ? 'text-[#F7931A]' : 'text-gray-300'
                      }`}
                      whileHover={{ backgroundColor: '#2d2d2d' }}
                    >
                      {region}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Section des pays populaires */}
        {!searchTerm && !selectedRegion && popularCountries.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Destinations Populaires</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularCountries.slice(0, 8).map(country => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          </div>
        )}

        {/* Résultats de recherche ou tous les pays */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {searchTerm || selectedRegion ? 'Résultats' : 'Toutes les Destinations'}
            </h2>
            <p className="text-gray-400 text-sm">
              {filteredCountries.length} pays trouvé{filteredCountries.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">Aucune destination trouvée</h3>
              <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCountries.map((country, index) => (
                <motion.div
                  key={country.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <CountryCard country={country} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountrySelector
