import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Activity, Zap, Target } from 'lucide-react'
import { multiWalletService, WalletType, WALLET_COLORS, WALLET_NAMES } from '../services/multiWalletService'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface UnifiedTradingInterfaceProps {
  selectedWallet?: WalletType
}

interface OrderData {
  wallet: WalletType
  symbol: string
  side: 'buy' | 'sell'
  quantity: string
  type: 'market' | 'limit'
  price?: string
}

const UnifiedTradingInterface: React.FC<UnifiedTradingInterfaceProps> = ({ selectedWallet = 'bybit' }) => {
  const [activeWallet, setActiveWallet] = useState<WalletType>(selectedWallet)
  const [orderData, setOrderData] = useState<OrderData>({
    wallet: activeWallet,
    symbol: 'BTCUSDT',
    side: 'buy',
    quantity: '',
    type: 'market'
  })
  const [loading, setLoading] = useState(false)
  const [availableBalance, setAvailableBalance] = useState<number>(0)
  const [estimatedCost, setEstimatedCost] = useState<number>(0)
  const [marketPrice, setMarketPrice] = useState<number>(0)
  const { withHaptic } = useHapticFeedback()

  // Symboles populaires par wallet
  const popularSymbols = {
    bybit: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'DOTUSDT'],
    okx: ['BTC-USDT', 'ETH-USDT', 'SOL-USDT', 'ADA-USDT', 'DOT-USDT'],
    binance: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT', 'DOTUSDT'],
    alpaca: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'EUR/USD', 'GBP/USD', 'USD/JPY']
  }

  useEffect(() => {
    setOrderData(prev => ({ ...prev, wallet: activeWallet }))
    loadMarketData()
    loadBalance()
  }, [activeWallet])

  useEffect(() => {
    calculateEstimatedCost()
  }, [orderData.quantity, orderData.price, orderData.side, marketPrice])

  useEffect(() => {
    loadMarketData()
  }, [orderData.symbol])

  // Mise à jour automatique des prix toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      loadMarketData()
    }, 10000)
    
    return () => clearInterval(interval)
  }, [activeWallet, orderData.symbol])

  const loadMarketData = async () => {
    try {
      // Récupérer les vrais tickers de marché
      const tickers = await multiWalletService.getAllMarketTickers()
      
      // Trouver le ticker correspondant au symbole et wallet sélectionnés
      const currentTicker = tickers.find(
        t => t.wallet === activeWallet && 
        (t.symbol === orderData.symbol || 
         t.symbol.replace('-', '') === orderData.symbol || 
         t.symbol.replace('/', '') === orderData.symbol)
      )
      
      if (currentTicker) {
        setMarketPrice(parseFloat(currentTicker.price))
      } else {
        // Prix par défaut pour les nouveaux symboles
        const defaultPrices: Record<string, number> = {
          'BTCUSDT': 45000,
          'BTC-USDT': 45000,
          'ETHUSDT': 2800,
          'ETH-USDT': 2800,
          'SOLUSDT': 100,
          'SOL-USDT': 100,
          'AAPL': 190,
          'MSFT': 420,
          'GOOGL': 140,
          'TSLA': 240,
          'NVDA': 900,
          'EUR/USD': 1.08,
          'GBP/USD': 1.26,
          'USD/JPY': 150
        }
        setMarketPrice(defaultPrices[orderData.symbol] || 1)
      }
    } catch (error) {
      console.error('Erreur chargement données marché:', error)
      // Prix de fallback en cas d'erreur
      setMarketPrice(45000)
    }
  }

  const loadBalance = async () => {
    try {
      const balances = await multiWalletService.getAllBalances()
      const walletBalance = balances.find(b => b.wallet === activeWallet && b.coin === 'USDT')
      setAvailableBalance(parseFloat(walletBalance?.balance || '0'))
    } catch (error) {
      console.error('Erreur chargement balance:', error)
    }
  }

  const calculateEstimatedCost = () => {
    if (!orderData.quantity) {
      setEstimatedCost(0)
      return
    }

    const quantity = parseFloat(orderData.quantity)
    const price = orderData.type === 'market' ? marketPrice : parseFloat(orderData.price || '0')
    
    if (orderData.side === 'buy') {
      setEstimatedCost(quantity * price)
    } else {
      setEstimatedCost(quantity) // Pour la vente, on estime les pièces nécessaires
    }
  }

  const handlePlaceOrder = withHaptic(async () => {
    if (!orderData.quantity || parseFloat(orderData.quantity) <= 0) {
      toast.error('Veuillez entrer une quantité valide')
      return
    }

    if (orderData.type === 'limit' && (!orderData.price || parseFloat(orderData.price) <= 0)) {
      toast.error('Veuillez entrer un prix limite valide')
      return
    }

    if (orderData.side === 'buy' && estimatedCost > availableBalance) {
      toast.error('Solde insuffisant')
      return
    }

    try {
      setLoading(true)
      const result = await multiWalletService.placeOrder(
        activeWallet,
        orderData.symbol,
        orderData.side,
        orderData.quantity,
        orderData.type,
        orderData.price
      )
      
      toast.success(`Ordre ${orderData.side} placé avec succès sur ${WALLET_NAMES[activeWallet]}`)
      
      // Reset form
      setOrderData(prev => ({ ...prev, quantity: '', price: '' }))
      
    } catch (error) {
      console.error('Erreur placement ordre:', error)
      toast.error('Erreur lors du placement de l\'ordre')
    } finally {
      setLoading(false)
    }
  }, 'medium')

  const WalletSelector = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.entries(WALLET_NAMES).map(([wallet, name]) => {
        const isSelected = activeWallet === wallet
        const walletColor = WALLET_COLORS[wallet as WalletType]
        
        return (
          <motion.button
            key={wallet}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveWallet(wallet as WalletType)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              isSelected 
                ? 'bg-slate-800/50 shadow-lg' 
                : 'bg-slate-900/50 hover:bg-slate-800/30 border-slate-600'
            }`}
            style={{ 
              borderColor: isSelected ? walletColor : 'transparent'
            }}
          >
            <div className="text-center">
              <div className="text-white font-medium text-sm">{name}</div>
              <div 
                className="text-xs font-medium mt-1"
                style={{ color: walletColor }}
              >
                {wallet === 'alpaca' ? 'Actions/Forex' : 'Crypto'}
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-600 p-3 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Interface de Trading Unifiée</h2>
            <p className="text-slate-400">Tradez sur toutes vos plateformes depuis une seule interface</p>
          </div>
        </div>

        {/* Sélection du wallet */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-medium mb-3">
            Sélectionner la plateforme de trading
          </label>
          <WalletSelector />
        </div>

        {/* Informations du wallet actif */}
        <div 
          className="bg-slate-800/50 rounded-xl p-4 border"
          style={{ borderColor: `${WALLET_COLORS[activeWallet]}30` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: WALLET_COLORS[activeWallet] }}
              />
              <div>
                <span className="text-white font-medium">{WALLET_NAMES[activeWallet]} Actif</span>
                <div className="text-slate-400 text-sm">
                  {activeWallet === 'alpaca' ? 'Trading Actions & Forex' : 'Trading Crypto'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">
                ${availableBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-slate-400 text-sm">Solde disponible</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire d'ordre */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" style={{ color: WALLET_COLORS[activeWallet] }} />
            Placer un Ordre
          </h3>

          {/* Sélection du symbole */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Symbole / Paire
            </label>
            <select
              value={orderData.symbol}
              onChange={(e) => setOrderData(prev => ({ ...prev, symbol: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >
              {popularSymbols[activeWallet].map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
          </div>

          {/* Type d'ordre */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderData(prev => ({ ...prev, side: 'buy' }))}
              className={`p-4 rounded-lg border-2 transition-all ${
                orderData.side === 'buy'
                  ? 'bg-green-600/20 border-green-500 text-green-400'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Acheter</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderData(prev => ({ ...prev, side: 'sell' }))}
              className={`p-4 rounded-lg border-2 transition-all ${
                orderData.side === 'sell'
                  ? 'bg-red-600/20 border-red-500 text-red-400'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <TrendingDown className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Vendre</div>
            </motion.button>
          </div>

          {/* Type d'exécution */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderData(prev => ({ ...prev, type: 'market' }))}
              className={`p-3 rounded-lg border transition-all ${
                orderData.type === 'market'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <Zap className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Marché</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOrderData(prev => ({ ...prev, type: 'limit' }))}
              className={`p-3 rounded-lg border transition-all ${
                orderData.type === 'limit'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <Target className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Limite</div>
            </motion.button>
          </div>

          {/* Prix limite */}
          {orderData.type === 'limit' && (
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Prix limite
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={orderData.price}
                  onChange={(e) => setOrderData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder={`Prix actuel: $${marketPrice.toFixed(2)}`}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  USD
                </span>
              </div>
            </div>
          )}

          {/* Quantité */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-medium">
                Quantité
              </label>
              <button
                onClick={() => {
                  if (orderData.side === 'buy') {
                    const maxQuantity = availableBalance / (orderData.type === 'market' ? marketPrice : parseFloat(orderData.price || '0'))
                    setOrderData(prev => ({ ...prev, quantity: maxQuantity.toFixed(6) }))
                  }
                }}
                className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
              >
                Max
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={orderData.quantity}
                onChange={(e) => setOrderData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {activeWallet === 'alpaca' ? 'Unités' : 'Crypto'}
              </span>
            </div>
          </div>

          {/* Estimation du coût */}
          {estimatedCost > 0 && (
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Coût estimé</span>
                <span className="text-white font-bold">
                  ${estimatedCost.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {orderData.side === 'buy' && estimatedCost > availableBalance && (
                <div className="text-red-400 text-sm mt-2">
                  Solde insuffisant
                </div>
              )}
            </div>
          )}

          {/* Bouton de placement */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            disabled={loading || !orderData.quantity || (orderData.side === 'buy' && estimatedCost > availableBalance)}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
              orderData.side === 'buy'
                ? 'bg-green-600 hover:bg-green-700 disabled:bg-slate-700'
                : 'bg-red-600 hover:bg-red-700 disabled:bg-slate-700'
            } disabled:text-slate-500`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Activity className="w-5 h-5 animate-spin" />
                <span>Placement en cours...</span>
              </div>
            ) : (
              `${orderData.side === 'buy' ? 'Acheter' : 'Vendre'} ${orderData.symbol}`
            )}
          </motion.button>
        </div>

        {/* Informations du marché */}
        <div className="space-y-4">
          {/* Prix du marché */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Prix du Marché</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                ${marketPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-green-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.5% (24h)</span>
              </div>
            </div>
          </div>

          {/* Avantages par wallet */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Avantages {WALLET_NAMES[activeWallet]}
            </h3>
            <div className="space-y-3">
              {activeWallet === 'bybit' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-slate-300 text-sm">API principale • Trading avancé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Futures & Options disponibles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Graphiques avancés</span>
                  </div>
                </>
              )}
              {activeWallet === 'okx' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Trading spot optimisé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Frais compétitifs</span>
                  </div>
                </>
              )}
              {activeWallet === 'binance' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Plus grande liquidité</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Frais réduits avec BNB</span>
                  </div>
                </>
              )}
              {activeWallet === 'alpaca' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Actions & Forex</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-300 text-sm">Trading traditionnel</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnifiedTradingInterface
