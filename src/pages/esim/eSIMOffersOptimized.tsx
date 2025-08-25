import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
  Eye
} from 'lucide-react'
import { airaloApi, eSIMOffer } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'

type ViewMode = 'grid' | 'list'
type SortOption = 'price-low' | 'price-high' | 'data-high' | 'data-low' | 'popular'

const eSIMOffersOptimized: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [offers, setOffers] = useState<eSIMOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [showCrypto, setShowCrypto] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [regions, setRegions] = useState<string[]>([])
  const [statistics, setStatistics] = useState<any>(null)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await airaloApi.geteSIMOffers()
      setOffers(data)
      
      // Load regions and statistics
      const regionsData = airaloApi.getRegions()
      const statsData = airaloApi.getStatistics()
      setRegions(regionsData)
      setStatistics(statsData)
      
      console.log(`✅ Loaded ${data.length} eSIM offers from ${statsData.totalCountries} countries`)
    } catch (err: any) {
      setError(err.message || 'Échec du chargement des offres eSIM')
    } finally {
      setLoading(false)
    }
  }

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.operator.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRegion = !selectedRegion || offer.region === selectedRegion
    
    return matchesSearch && matchesRegion
  })

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'data-high':
        return parseInt(b.dataAmount) - parseInt(a.dataAmount)
      case 'data-low':
        return parseInt(a.dataAmount) - parseInt(b.dataAmount)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedOffers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOffers = sortedOffers.slice(startIndex, startIndex + itemsPerPage)

  const handleOfferSelect = (offer: eSIMOffer) => {
    navigate(`/esim/details-optimized/${offer.id}`, { state: { offer } })
  }

  const getSortLabel = (option: SortOption) => {
    const labels = {
      'popular': 'Populaires',
      'price-low': 'Prix croissant',
      'price-high': 'Prix décroissant',
      'data-high': 'Plus de données',
      'data-low': 'Moins de données'
    }
    return labels[option]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="px-4 py-6">
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
            <h1 className="text-xl font-bold">Forfaits eSIM</h1>
            <div className="w-16"></div>
          </div>

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
            <h1 className="text-xl font-bold">Forfaits eSIM</h1>
            <div className="w-16"></div>
          </div>

          <div className="text-center py-12">
            <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Impossible de charger les offres</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <motion.button
              onClick={withHaptic(fetchOffers, 'medium')}
              className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réessayer
            </motion.button>
          </div>
        </div>
      </div>
    )
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
          <div className="text-center">
            <h1 className="text-xl font-bold">Forfaits eSIM</h1>
            <p className="text-sm text-gray-400">{filteredOffers.length} forfaits disponibles</p>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Statistiques globales */}
        {statistics && (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F7931A]">{statistics.totalCountries}</div>
                <div className="text-xs text-gray-400">Pays</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{statistics.totalPackages}</div>
                <div className="text-xs text-gray-400">Forfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{statistics.regions}</div>
                <div className="text-xs text-gray-400">Régions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{statistics.popularCountries}</div>
                <div className="text-xs text-gray-400">Populaires</div>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par pays ou opérateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
          />
        </div>

        {/* Filtre par région */}
        <div className="flex items-center space-x-2 mb-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F7931A] transition-colors"
          >
            <option value="">Toutes les régions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {selectedRegion && (
            <motion.button
              onClick={() => setSelectedRegion('')}
              className="text-xs text-gray-400 hover:text-white px-2 py-1 bg-[#1a1a1a] border border-gray-700 rounded"
              whileTap={{ scale: 0.95 }}
            >
              Effacer
            </motion.button>
          )}
        </div>

        {/* Contrôles d'affichage optimisés */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#F7931A] text-white' : 'bg-[#1a1a1a] text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <List className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#F7931A] text-white' : 'bg-[#1a1a1a] text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3X3 className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Toggle crypto */}
            <motion.button
              onClick={() => setShowCrypto(!showCrypto)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                showCrypto ? 'bg-[#F7931A] text-white' : 'bg-[#1a1a1a] text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              ₿ Crypto
            </motion.button>

            {/* Menu tri */}
            <div className="relative">
              <motion.button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 bg-[#1a1a1a] px-3 py-2 rounded-lg text-gray-300 hover:text-white"
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">{getSortLabel(sortBy)}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg py-2 z-20 min-w-[150px]"
                >
                  {(['popular', 'price-low', 'price-high', 'data-high', 'data-low'] as SortOption[]).map(option => (
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

        {/* Liste/Grille des offres optimisée */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Aucune offre trouvée</h3>
            <p className="text-gray-500">Essayez de rechercher un autre pays ou opérateur</p>
          </div>
        ) : (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' 
                : 'space-y-4'
            }`}>
              {paginatedOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={withHaptic(() => handleOfferSelect(offer), 'medium')}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#F7931A]/50 hover:bg-[#2d2d2d] transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F7931A] to-[#FFD700] rounded-lg flex items-center justify-center overflow-hidden">
                        {offer.flag ? (
                          <img 
                            src={offer.flag} 
                            alt={`Drapeau ${offer.country}`}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) nextElement.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <Globe className="w-6 h-6 text-white" style={{ display: offer.flag ? 'none' : 'flex' }} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{offer.country}</h3>
                        <p className="text-gray-400 text-sm">{offer.operator}</p>
                        {offer.region && (
                          <p className="text-gray-500 text-xs">{offer.region}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F7931A] font-bold text-lg">${offer.price}</p>
                      {showCrypto && (
                        <p className="text-gray-500 text-xs">≈ {offer.cryptoPrice} BTC</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
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

                  {/* Description concise (sans redondance) */}
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-gray-400 text-xs flex-1">
                      Forfait {offer.type} • {offer.currency}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOfferSelect(offer)
                      }}
                      className="text-[#F7931A] text-xs flex items-center space-x-1 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Voir</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination optimisée */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <motion.button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  Précédent
                </motion.button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <motion.button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === page 
                          ? 'bg-[#F7931A] text-white' 
                          : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                </motion.button>
              </div>
            )}

            {/* Résumé des résultats */}
            <div className="text-center text-gray-400 text-sm mt-4">
              Affichage de {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedOffers.length)} sur {sortedOffers.length} forfaits
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default eSIMOffersOptimized
