import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Globe, 
  Smartphone, 
  Clock, 
  DollarSign,
  Grid3X3,
  List,
  Filter,
  ChevronDown,
  Wifi,
  Star,
  Eye,
  MapPin,
  Info,
  ShoppingCart
} from 'lucide-react'
import { airaloApi, eSIMOffer } from '../../services/airaloApi'
import { AIRALO_COUNTRIES, AiraloCountry } from '../../data/airaloCountries'
import useHapticFeedback from '../../hooks/useHapticFeedback'

type ViewMode = 'grid' | 'list'
type SortOption = 'price-low' | 'price-high' | 'data-high' | 'data-low' | 'validity-long' | 'validity-short'

const eSIMCountryOffers: React.FC = () => {
  const navigate = useNavigate()
  const { countryCode } = useParams<{ countryCode: string }>()
  const { withHaptic } = useHapticFeedback()
  
  const [offers, setOffers] = useState<eSIMOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [sortBy, setSortBy] = useState<SortOption>('price-low')
  const [showCrypto, setShowCrypto] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<AiraloCountry | null>(null)

  useEffect(() => {
    if (countryCode) {
      loadCountryOffers(countryCode)
    }
  }, [countryCode])

  const loadCountryOffers = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Trouver le pays dans les données
      const country = AIRALO_COUNTRIES.find(c => c.code.toLowerCase() === code.toLowerCase())
      if (!country) {
        throw new Error('Pays non trouvé')
      }
      
      setSelectedCountry(country)
      
      // Charger toutes les offres et filtrer pour ce pays
      const allOffers = await airaloApi.geteSIMOffers()
      const countryOffers = allOffers.filter(offer => 
        offer.countryCode.toLowerCase() === code.toLowerCase()
      )
      
      setOffers(countryOffers)
      console.log(`✅ Loaded ${countryOffers.length} eSIM offers for ${country.name}`)
    } catch (err: any) {
      setError(err.message || 'Échec du chargement des offres eSIM')
    } finally {
      setLoading(false)
    }
  }

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = 
        offer.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.dataAmount.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesSearch
    })
  }, [offers, searchTerm])

  const sortedOffers = useMemo(() => {
    return [...filteredOffers].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'data-high':
          return parseInt(b.dataAmount) - parseInt(a.dataAmount)
        case 'data-low':
          return parseInt(a.dataAmount) - parseInt(b.dataAmount)
        case 'validity-long':
          return parseInt(b.validity.split(' ')[0]) - parseInt(a.validity.split(' ')[0])
        case 'validity-short':
          return parseInt(a.validity.split(' ')[0]) - parseInt(b.validity.split(' ')[0])
        default:
          return 0
      }
    })
  }, [filteredOffers, sortBy])

  const handleOfferSelect = (offer: eSIMOffer) => {
    navigate(`/esim/details-optimized/${offer.id}`, { state: { offer } })
  }

  const getSortLabel = (option: SortOption) => {
    const labels = {
      'price-low': 'Prix croissant',
      'price-high': 'Prix décroissant',
      'data-high': 'Plus de données',
      'data-low': 'Moins de données',
      'validity-long': 'Validité longue',
      'validity-short': 'Validité courte'
    }
    return labels[option]
  }

  const getViewModeIcon = (mode: ViewMode) => {
    return mode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />
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
          <p className="text-gray-400">Chargement des forfaits...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">Erreur</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <motion.button
            onClick={() => navigate('/esim/countries')}
            className="bg-[#F7931A] text-white px-6 py-2 rounded-lg hover:bg-[#e8851a] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retour aux destinations
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header avec informations du pays */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="container mx-auto px-4 py-4">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={withHaptic(() => navigate('/esim/countries'), 'light')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour aux destinations</span>
            </motion.button>

            <div className="text-right">
              <p className="text-gray-400 text-sm">Forfaits eSIM</p>
            </div>
          </div>

          {/* Informations du pays */}
          {selectedCountry && (
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#F7931A] to-[#FFD700] flex items-center justify-center">
                {selectedCountry.flag ? (
                  <img 
                    src={selectedCountry.flag} 
                    alt={`Drapeau ${selectedCountry.name}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) nextElement.style.display = 'flex';
                    }}
                  />
                ) : null}
                <Globe className="w-8 h-8 text-white" style={{ display: selectedCountry.flag ? 'none' : 'flex' }} />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-1">{selectedCountry.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedCountry.region}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Smartphone className="w-4 h-4" />
                    <span>{offers.length} forfait{offers.length > 1 ? 's' : ''} disponible{offers.length > 1 ? 's' : ''}</span>
                  </div>
                  {offers.length > 0 && (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>Dès ${Math.min(...offers.map(o => o.price))}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Barre de recherche et contrôles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les forfaits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none transition-colors"
            />
          </div>

          {/* Contrôles */}
          <div className="flex items-center space-x-3">
            {/* Toggle crypto */}
            <motion.button
              onClick={() => setShowCrypto(!showCrypto)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                showCrypto 
                  ? 'bg-[#F7931A] border-[#F7931A] text-white' 
                  : 'bg-[#1a1a1a] border-gray-700 text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              BTC
            </motion.button>

            {/* Mode d'affichage */}
            <motion.button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {getViewModeIcon(viewMode)}
            </motion.button>

            {/* Tri */}
            <div className="relative">
              <motion.button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-colors min-w-[140px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">{getSortLabel(sortBy)}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg py-2 z-20 min-w-[180px]"
                >
                  {(['price-low', 'price-high', 'data-high', 'data-low', 'validity-long', 'validity-short'] as SortOption[]).map(option => (
                    <motion.button
                      key={option}
                      onClick={() => {
                        setSortBy(option)
                        setShowSortDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#2d2d2d] transition-colors ${
                        sortBy === option ? 'text-[#F7931A]' : 'text-gray-300'
                      }`}
                      whileHover={{ backgroundColor: '#2d2d2d' }}
                    >
                      {getSortLabel(option)}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Résultats */}
        {sortedOffers.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Aucun forfait trouvé</h3>
                <p className="text-gray-500">Essayez de modifier votre recherche</p>
              </>
            ) : (
              <>
                <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Aucun forfait disponible</h3>
                <p className="text-gray-500">Ce pays n'a pas encore de forfaits eSIM</p>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Résumé des résultats */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm">
                {sortedOffers.length} forfait{sortedOffers.length > 1 ? 's' : ''} trouvé{sortedOffers.length > 1 ? 's' : ''}
                {searchTerm && ` pour "${searchTerm}"`}
              </p>
            </div>

            {/* Liste des forfaits */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
                : 'space-y-4'
            }`}>
              {sortedOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={withHaptic(() => handleOfferSelect(offer), 'medium')}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-[#F7931A]/50 hover:bg-[#2d2d2d] transition-all duration-200 cursor-pointer group"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F7931A] to-[#FFD700] rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold group-hover:text-[#F7931A] transition-colors">
                          {offer.operator}
                        </h3>
                        <p className="text-gray-400 text-sm">{offer.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F7931A] font-bold text-xl">${offer.price}</p>
                      {showCrypto && offer.cryptoPrice && (
                        <p className="text-gray-500 text-xs">≈ {offer.cryptoPrice} BTC</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Wifi className="w-4 h-4 text-[#F7931A]" />
                      <span>{offer.dataAmount}{offer.dataUnit}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4 text-[#F7931A]" />
                      <span>{offer.validity}</span>
                    </div>
                    {offer.isPopular && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Populaire</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm flex-1">
                        {offer.description}
                      </p>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOfferSelect(offer)
                        }}
                        className="ml-3 bg-[#F7931A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#e8851a] transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Acheter</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default eSIMCountryOffers
