import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History, Filter, Download, RefreshCw, Search, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import { multiWalletService, UnifiedOrder, WalletType, WALLET_COLORS, WALLET_NAMES } from '../services/multiWalletService'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface FilterOptions {
  wallet: 'all' | WalletType
  status: 'all' | 'filled' | 'pending' | 'cancelled'
  side: 'all' | 'buy' | 'sell'
  dateRange: '24h' | '7d' | '30d' | 'all'
}

const UnifiedOrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<UnifiedOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<UnifiedOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    wallet: 'all',
    status: 'all',
    side: 'all',
    dateRange: '7d'
  })
  const [showFilters, setShowFilters] = useState(false)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadOrderHistory()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [orders, filters, searchTerm])

  const loadOrderHistory = async () => {
    try {
      setLoading(true)
      const allOrders = await multiWalletService.getAllOrderHistory()
      // Trier par timestamp décroissant (plus récent en premier)
      const sortedOrders = allOrders.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setOrders(sortedOrders)
      toast.success(`${sortedOrders.length} ordres chargés depuis tous les wallets`)
    } catch (error) {
      console.error('Erreur chargement historique unifié:', error)
      toast.error('Erreur lors du chargement de l\'historique')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...orders]

    // Filtre par wallet
    if (filters.wallet !== 'all') {
      filtered = filtered.filter(order => order.wallet === filters.wallet)
    }

    // Filtre par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status)
    }

    // Filtre par côté (buy/sell)
    if (filters.side !== 'all') {
      filtered = filtered.filter(order => order.side === filters.side)
    }

    // Filtre par période
    if (filters.dateRange !== 'all') {
      const now = new Date()
      const cutoffDate = new Date()
      
      switch (filters.dateRange) {
        case '24h':
          cutoffDate.setHours(now.getHours() - 24)
          break
        case '7d':
          cutoffDate.setDate(now.getDate() - 7)
          break
        case '30d':
          cutoffDate.setDate(now.getDate() - 30)
          break
      }
      
      filtered = filtered.filter(order => 
        new Date(order.timestamp) >= cutoffDate
      )
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tri par date (plus récent en premier)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    setFilteredOrders(filtered)
  }

  const handleRefresh = withHaptic(async () => {
    await loadOrderHistory()
  }, 'light')

  const handleExport = withHaptic(() => {
    const csvContent = [
      ['Date', 'Wallet', 'Symbol', 'Side', 'Type', 'Quantity', 'Price', 'Status'],
      ...filteredOrders.map(order => [
        new Date(order.timestamp).toLocaleDateString('fr-FR'),
        WALLET_NAMES[order.wallet],
        order.symbol,
        order.side,
        order.type,
        order.quantity,
        order.price,
        order.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kivoro-order-history-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Historique exporté en CSV')
  }, 'light')

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled': return 'text-green-500'
      case 'pending': return 'text-yellow-500'
      case 'cancelled': return 'text-red-500'
      default: return 'text-slate-400'
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      filled: 'bg-green-500/20 border-green-500/30 text-green-400',
      pending: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
      cancelled: 'bg-red-500/20 border-red-500/30 text-red-400'
    }
    
    return colors[status.toLowerCase() as keyof typeof colors] || 'bg-slate-500/20 border-slate-500/30 text-slate-400'
  }

  const formatPrice = (price: string, side: string) => {
    const numPrice = parseFloat(price)
    if (isNaN(numPrice)) return price
    
    return side === 'buy' ? `$${numPrice.toFixed(4)}` : `$${numPrice.toFixed(4)}`
  }

  // Statistiques résumées
  const stats = {
    total: filteredOrders.length,
    filled: filteredOrders.filter(o => o.status === 'filled').length,
    totalVolume: filteredOrders
      .filter(o => o.status === 'filled')
      .reduce((sum, o) => sum + (parseFloat(o.quantity) * parseFloat(o.price)), 0),
    byWallet: Object.entries(WALLET_NAMES).map(([wallet, name]) => ({
      wallet: wallet as WalletType,
      name,
      count: filteredOrders.filter(o => o.wallet === wallet).length,
      color: WALLET_COLORS[wallet as WalletType]
    })).filter(w => w.count > 0)
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-600 p-3 rounded-xl">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Historique Unifié</h2>
              <p className="text-slate-400">Vue consolidée de tous vos ordres</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-slate-400 text-sm">Total ordres</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{stats.filled}</div>
            <div className="text-slate-400 text-sm">Exécutés</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">
              ${stats.totalVolume.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="text-slate-400 text-sm">Volume total</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{stats.byWallet.length}</div>
            <div className="text-slate-400 text-sm">Wallets actifs</div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par symbole ou ID d'ordre..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bouton filtres */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors ${
              showFilters ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </motion.button>
        </div>

        {/* Panneau de filtres */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-slate-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filtre wallet */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Wallet</label>
                <select
                  value={filters.wallet}
                  onChange={(e) => setFilters(prev => ({ ...prev, wallet: e.target.value as FilterOptions['wallet'] }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Tous les wallets</option>
                  {Object.entries(WALLET_NAMES).map(([wallet, name]) => (
                    <option key={wallet} value={wallet}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Filtre statut */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Statut</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as FilterOptions['status'] }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="filled">Exécuté</option>
                  <option value="pending">En attente</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>

              {/* Filtre côté */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Type</label>
                <select
                  value={filters.side}
                  onChange={(e) => setFilters(prev => ({ ...prev, side: e.target.value as FilterOptions['side'] }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Achat & Vente</option>
                  <option value="buy">Achat seulement</option>
                  <option value="sell">Vente seulement</option>
                </select>
              </div>

              {/* Filtre période */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Période</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as FilterOptions['dateRange'] }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="24h">24 heures</option>
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                  <option value="all">Tout l'historique</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Répartition par wallet */}
      {stats.byWallet.length > 0 && (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Répartition par Wallet</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.byWallet.map((walletStat) => (
              <div key={walletStat.wallet} className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: walletStat.color }}
                  />
                  <span className="text-white font-medium text-sm">{walletStat.name}</span>
                </div>
                <div className="text-2xl font-bold text-white">{walletStat.count}</div>
                <div className="text-slate-400 text-sm">
                  {((walletStat.count / stats.total) * 100).toFixed(1)}% du total
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste des ordres */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Ordres ({filteredOrders.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {filteredOrders.map((order) => (
              <motion.div
                key={`${order.wallet}-${order.orderId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    {/* Badge wallet */}
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${order.walletColor}20`,
                        color: order.walletColor 
                      }}
                    >
                      {WALLET_NAMES[order.wallet]}
                    </div>

                    {/* Symbole et côté */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{order.symbol}</span>
                        <div className={`flex items-center space-x-1 ${
                          order.side === 'buy' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {order.side === 'buy' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-medium capitalize">{order.side}</span>
                        </div>
                      </div>
                      <div className="text-slate-400 text-sm">
                        {new Date(order.timestamp).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end space-x-6">
                    {/* Quantité et prix */}
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {order.quantity} @ {formatPrice(order.price, order.side)}
                      </div>
                      <div className="text-slate-400 text-sm">{order.type}</div>
                    </div>

                    {/* Statut */}
                    <div 
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-16">
            <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <div className="text-xl font-medium mb-2">Aucun ordre trouvé</div>
            <div className="text-sm">
              {searchTerm || filters.wallet !== 'all' || filters.status !== 'all' || filters.side !== 'all' 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Vos ordres apparaîtront ici une fois que vous commencerez à trader'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnifiedOrderHistory
