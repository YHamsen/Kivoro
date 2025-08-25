import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, Wallet, Send, Plus, ExternalLink, RefreshCw, AlertCircle, Check, LineChart } from 'lucide-react'
import { UnifiedBalance, UnifiedTicker, WALLET_COLORS } from '../services/multiWalletService'
import { bybitApi } from '../services/bybitApi'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'
import OptimizedCryptoChart from './trading-live/OptimizedCryptoChart'

interface BybitWalletSectionProps {
  balances: UnifiedBalance[]
  tickers: UnifiedTicker[]
  onRefresh?: () => void
}

const BybitWalletSection: React.FC<BybitWalletSectionProps> = ({ balances, tickers, onRefresh }) => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'trading' | 'charts' | 'history' | 'payments'>('wallet')
  const [orderHistory, setOrderHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [depositAddress, setDepositAddress] = useState<string>('')
  const [selectedCoin, setSelectedCoin] = useState<string>('USDT')
  const [realTimeData, setRealTimeData] = useState<any[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCUSDT')
  const { withHaptic } = useHapticFeedback()

  const walletColor = WALLET_COLORS.bybit
  const totalValue = balances.reduce((sum, b) => sum + parseFloat(b.usdValue || '0'), 0)

  // Données en temps réel avec mise à jour automatique
  useEffect(() => {
    if (activeTab === 'trading') {
      loadRealTimeData()
      const interval = setInterval(loadRealTimeData, 5000) // Mise à jour toutes les 5s
      return () => clearInterval(interval)
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'history') {
      loadOrderHistory()
    }
  }, [activeTab])

  const loadRealTimeData = async () => {
    try {
      const popularPairs = await bybitApi.getPopularPairs()
      setRealTimeData(popularPairs)
    } catch (error) {
      console.error('Erreur chargement données temps réel Bybit:', error)
    }
  }

  const loadOrderHistory = async () => {
    try {
      setLoading(true)
      const history = await bybitApi.getOrderHistory()
      setOrderHistory(history)
    } catch (error) {
      console.error('Erreur chargement historique Bybit:', error)
      toast.error('Erreur lors du chargement de l\'historique')
    } finally {
      setLoading(false)
    }
  }

  const generateDepositAddress = async (coin: string) => {
    try {
      setLoading(true)
      const addressData = await bybitApi.getDepositAddress(coin)
      setDepositAddress(addressData.address)
      toast.success(`Adresse ${coin} générée avec succès`)
    } catch (error) {
      console.error('Erreur génération adresse:', error)
      toast.error('Erreur lors de la génération de l\'adresse')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTrade = async (symbol: string, side: 'buy' | 'sell') => {
    try {
      const result = await bybitApi.placeOrder(symbol, side === 'buy' ? 'Buy' : 'Sell', 'Market', '0.001')
      toast.success(`Ordre ${side} placé: ${result.orderId}`)
      onRefresh?.()
    } catch (error) {
      console.error('Erreur placement ordre:', error)
      toast.error('Erreur lors du placement de l\'ordre')
    }
  }

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
  }

  const handleCopyAddress = withHaptic(() => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress)
      toast.success('Adresse copiée dans le presse-papiers')
    }
  }, 'light')

  return (
    <div className="space-y-6">
      {/* En-tête Bybit avec design amélioré */}
      <div 
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border-2 relative overflow-hidden"
        style={{ 
          borderColor: `${walletColor}30`,
          boxShadow: `0 0 40px ${walletColor}15`
        }}
      >
        {/* Effet de lueur d'arrière-plan */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `radial-gradient(circle at 30% 50%, ${walletColor}, transparent 70%)`
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 relative"
                style={{ backgroundColor: `${walletColor}20` }}
              >
                <img 
                  src="/logos/bybit-logo.jpg" 
                  alt="Bybit"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <Wallet 
                  className="w-10 h-10 hidden" 
                  style={{ color: walletColor }}
                />
                {/* Indicateur de statut en temps réel */}
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse border-2 border-slate-900"
                  style={{ backgroundColor: walletColor }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Bybit Wallet</h2>
                <p className="text-slate-400">API Principale • Trading Avancé</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: walletColor }}
                  />
                  <span className="text-sm text-slate-300">Connecté • Temps réel</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                ${totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-slate-400">{balances.length} actifs</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRefresh}
                className="mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-slate-300" />
              </motion.button>
            </div>
          </div>

          {/* Navigation interne avec design amélioré */}
          <div className="grid grid-cols-5 gap-2 bg-slate-800/50 rounded-xl p-2 backdrop-blur-sm">
            {[
              { id: 'wallet', label: 'Wallet', icon: Wallet },
              { id: 'trading', label: 'Trading', icon: BarChart3 },
              { id: 'charts', label: 'Graphiques', icon: LineChart },
              { id: 'history', label: 'Historique', icon: TrendingUp },
              { id: 'payments', label: 'Paiements', icon: Send }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTabChange(tab.id as typeof activeTab)}
                  className={`p-3 rounded-lg transition-all duration-200 relative ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? walletColor : 'transparent'
                  }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bybit-tab-indicator"
                      className="absolute inset-0 rounded-lg border-2"
                      style={{ borderColor: `${walletColor}80` }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Contenu selon l'onglet */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Balances détaillées */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Balances Bybit ({balances.length} actifs)
              </h3>
              <div className="space-y-3">
                {balances.map((balance) => (
                  <div key={balance.coin} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border-2"
                        style={{ 
                          backgroundColor: `${walletColor}20`,
                          borderColor: `${walletColor}40`
                        }}
                      >
                        {balance.coin.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{balance.coin}</div>
                        <div className="text-slate-400 text-sm">Bybit Spot Wallet</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        ${parseFloat(balance.usdValue).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-slate-400 text-sm">{parseFloat(balance.balance).toLocaleString('fr-FR', { maximumFractionDigits: 6 })}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center hover:border-slate-600 transition-colors"
                onClick={() => handleTabChange('payments')}
              >
                <Plus className="w-8 h-8 mx-auto mb-3" style={{ color: walletColor }} />
                <div className="text-white font-medium">Déposer</div>
                <div className="text-slate-400 text-sm">Ajouter des fonds</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center hover:border-slate-600 transition-colors"
                onClick={() => handleTabChange('trading')}
              >
                <BarChart3 className="w-8 h-8 mx-auto mb-3" style={{ color: walletColor }} />
                <div className="text-white font-medium">Trader</div>
                <div className="text-slate-400 text-sm">Ouvrir position</div>
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="space-y-6">
            {/* Trading en temps réel */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Trading Bybit - Paires Populaires
                <div className="ml-auto flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: walletColor }}
                  />
                  <span className="text-xs text-slate-400">Temps réel</span>
                </div>
              </h3>
              <div className="space-y-3">
                {realTimeData.slice(0, 5).map((pair) => (
                  <div key={pair.symbol} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-white font-medium">{pair.symbol}</div>
                        <div className="text-slate-400 text-sm">Vol: {parseFloat(pair.volume24h).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-white font-bold">${parseFloat(pair.lastPrice).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</div>
                        <div className={`text-sm font-medium ${
                          parseFloat(pair.priceChangePercent) >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {parseFloat(pair.priceChangePercent) >= 0 ? '+' : ''}{parseFloat(pair.priceChangePercent).toFixed(2)}%
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickTrade(pair.symbol, 'buy')}
                          className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-medium transition-colors"
                        >
                          Acheter
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickTrade(pair.symbol, 'sell')}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-medium transition-colors"
                        >
                          Vendre
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: walletColor }} />
              Historique des Ordres Bybit
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ color: walletColor }} />
              </div>
            ) : (
              <div className="space-y-3">
                {orderHistory.length > 0 ? orderHistory.slice(0, 10).map((order) => (
                  <div key={order.orderId} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          order.side === 'Buy' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <div>
                        <div className="text-white font-medium">{order.symbol}</div>
                        <div className="text-slate-400 text-sm">
                          {new Date(parseInt(order.createTime)).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{order.qty} @ ${parseFloat(order.price).toFixed(2)}</div>
                      <div className={`text-sm font-medium ${
                        order.orderStatus === 'Filled' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {order.orderStatus}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    Aucun ordre trouvé
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Génération d'adresse de dépôt */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Send className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Dépôt sur Bybit
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Sélectionner la crypto-monnaie
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                    <option value="SOL">SOL (Solana)</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => generateDepositAddress(selectedCoin)}
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  style={{ 
                    backgroundColor: walletColor,
                    color: 'white'
                  }}
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    `Générer adresse ${selectedCoin}`
                  )}
                </motion.button>

                {depositAddress && (
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">Adresse de dépôt {selectedCoin}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyAddress}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${walletColor}20`,
                          color: walletColor
                        }}
                      >
                        Copier
                      </motion.button>
                    </div>
                    <div className="text-white font-mono text-sm bg-slate-800 p-3 rounded break-all">
                      {depositAddress}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default BybitWalletSection
