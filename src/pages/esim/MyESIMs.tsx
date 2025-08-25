import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Globe, 
  Smartphone, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Mail,
  Copy,
  QrCode,
  MoreVertical,
  Search,
  Filter,
  Plus,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { eSIMOffer, eSIMActivation } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface SavedOrder {
  orderId: string
  offer: eSIMOffer
  paymentMethod: string
  customerEmail: string
  orderDate: string
  activation: eSIMActivation
  status: 'active' | 'expired' | 'pending' | 'cancelled'
  dataUsed?: number
  dataRemaining?: number
  expiryDate?: string
}

const MyESIMs: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  
  const [orders, setOrders] = useState<SavedOrder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'pending'>('all')
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    setLoading(true)
    try {
      const savedOrders = JSON.parse(localStorage.getItem('kivoro_esim_orders') || '[]')
      
      // Simuler les statuts et données d'utilisation
      const ordersWithStatus = savedOrders.map((order: any) => ({
        ...order,
        status: Math.random() > 0.7 ? 'active' : Math.random() > 0.5 ? 'expired' : 'pending',
        dataUsed: Math.floor(Math.random() * 80), // % utilisé
        dataRemaining: Math.floor(Math.random() * 100), // MB restants
        expiryDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }))
      
      setOrders(ordersWithStatus)
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error)
      toast.error('Erreur lors du chargement de vos eSIMs')
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.offer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.offer.operator.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20'
      case 'expired': return 'text-red-400 bg-red-500/20'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20'
      case 'cancelled': return 'text-gray-400 bg-gray-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'expired': return 'Expiré'
      case 'pending': return 'En attente'
      case 'cancelled': return 'Annulé'
      default: return 'Inconnu'
    }
  }

  const copyActivationCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Code d\'activation copié !')
  }

  const deleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId)
    setOrders(updatedOrders)
    localStorage.setItem('kivoro_esim_orders', JSON.stringify(updatedOrders))
    toast.success('eSIM supprimée')
  }

  const viewDetails = (order: SavedOrder) => {
    navigate(`/esim/activation/${order.orderId}`, {
      state: {
        offer: order.offer,
        activation: order.activation,
        orderId: order.orderId,
        fromMyESIMs: true
      }
    })
  }

  const sendDetailsEmail = (order: SavedOrder) => {
    const subject = `Détails eSIM - ${order.offer.country}`
    const body = `
Détails de votre eSIM Kivoro

Commande : ${order.orderId}
Pays : ${order.offer.country}
Opérateur : ${order.offer.operator}
Plan : ${order.offer.dataAmount}${order.offer.dataUnit} - ${order.offer.validity}

Code d'activation : ${order.activation.manual_installation.activation_code}
ICCID : ${order.activation.iccid}

Statut : ${getStatusLabel(order.status)}
${order.dataUsed ? `Données utilisées : ${order.dataUsed}%` : ''}

Support : support@kivoro.com
    `
    
    const mailtoLink = `mailto:${order.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
    toast.success('E-mail ouvert !')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[#F7931A] mx-auto mb-4 animate-spin" />
          <p className="text-gray-400">Chargement de vos eSIMs...</p>
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
            onClick={withHaptic(() => navigate('/'), 'light')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Mes eSIMs</h1>
          <motion.button
            onClick={withHaptic(() => navigate('/esim/offers'), 'light')}
            className="w-8 h-8 bg-[#F7931A]/20 rounded-lg flex items-center justify-center hover:bg-[#F7931A]/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-4 h-4 text-[#F7931A]" />
          </motion.button>
        </div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{orders.length}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {orders.filter(o => o.status === 'active').length}
            </p>
            <p className="text-xs text-gray-400">Actifs</p>
          </div>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">
              {orders.filter(o => o.status === 'expired').length}
            </p>
            <p className="text-xs text-gray-400">Expirés</p>
          </div>
        </motion.div>

        {/* Recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par pays, opérateur ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white focus:border-[#F7931A] focus:outline-none transition-colors"
            />
          </div>

          {/* Filtres de statut */}
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'Tous' },
              { value: 'active', label: 'Actifs' },
              { value: 'expired', label: 'Expirés' },
              { value: 'pending', label: 'En attente' }
            ].map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === filter.value
                    ? 'bg-[#F7931A] text-white'
                    : 'bg-[#2d2d2d] text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Liste des eSIMs */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Smartphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  {orders.length === 0 ? 'Aucune eSIM trouvée' : 'Aucun résultat'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {orders.length === 0 
                    ? 'Vous n\'avez pas encore acheté d\'eSIM'
                    : 'Essayez de modifier vos critères de recherche'
                  }
                </p>
                <motion.button
                  onClick={withHaptic(() => navigate('/esim/offers'), 'medium')}
                  className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Parcourir les offres
                </motion.button>
              </motion.div>
            ) : (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-white font-semibold">
                          {order.offer.country}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {order.offer.operator} • {order.offer.dataAmount}{order.offer.dataUnit} • {order.offer.validity}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Commande #{order.orderId} • {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <div className="relative">
                      <motion.button
                        onClick={() => setSelectedOrder(selectedOrder === order.orderId ? null : order.orderId)}
                        className="w-8 h-8 bg-[#2d2d2d] rounded-lg flex items-center justify-center hover:bg-[#3d3d3d] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </motion.button>

                      <AnimatePresence>
                        {selectedOrder === order.orderId && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-10 bg-[#2d2d2d] border border-gray-700 rounded-lg py-2 w-48 z-10"
                          >
                            <button
                              onClick={() => {
                                viewDetails(order)
                                setSelectedOrder(null)
                              }}
                              className="w-full px-4 py-2 text-left text-white hover:bg-[#3d3d3d] transition-colors flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Voir les détails</span>
                            </button>
                            <button
                              onClick={() => {
                                copyActivationCode(order.activation.manual_installation.activation_code)
                                setSelectedOrder(null)
                              }}
                              className="w-full px-4 py-2 text-left text-white hover:bg-[#3d3d3d] transition-colors flex items-center space-x-2"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copier le code</span>
                            </button>
                            <button
                              onClick={() => {
                                sendDetailsEmail(order)
                                setSelectedOrder(null)
                              }}
                              className="w-full px-4 py-2 text-left text-white hover:bg-[#3d3d3d] transition-colors flex items-center space-x-2"
                            >
                              <Mail className="w-4 h-4" />
                              <span>Envoyer par e-mail</span>
                            </button>
                            <div className="border-t border-gray-700 mt-2"></div>
                            <button
                              onClick={() => {
                                deleteOrder(order.orderId)
                                setSelectedOrder(null)
                              }}
                              className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/20 transition-colors flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Supprimer</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Informations d'utilisation pour les eSIMs actives */}
                  {order.status === 'active' && order.dataUsed !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Données utilisées</span>
                        <span className="text-white">{order.dataUsed}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#F7931A] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.dataUsed}%` }}
                        ></div>
                      </div>
                      {order.expiryDate && (
                        <p className="text-xs text-gray-500">
                          Expire le {new Date(order.expiryDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions rapides */}
                  <div className="flex space-x-2 mt-4">
                    <motion.button
                      onClick={() => viewDetails(order)}
                      className="flex-1 bg-[#F7931A]/20 text-[#F7931A] py-2 rounded-lg text-sm font-medium hover:bg-[#F7931A]/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Voir les détails
                    </motion.button>
                    <motion.button
                      onClick={() => copyActivationCode(order.activation.manual_installation.activation_code)}
                      className="px-4 bg-[#2d2d2d] text-gray-400 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bouton d'actualisation */}
        <motion.button
          onClick={withHaptic(loadOrders, 'light')}
          className="w-full mt-6 bg-[#2d2d2d] border border-gray-700 hover:border-gray-600 py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Actualiser</span>
        </motion.button>
      </div>
    </div>
  )
}

export default MyESIMs
