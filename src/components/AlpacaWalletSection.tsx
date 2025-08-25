import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, Wallet, Send, Plus, ExternalLink, RefreshCw, AlertCircle, Check, Globe, Building2, Activity, LineChart } from 'lucide-react'
import { UnifiedBalance, UnifiedTicker, WALLET_COLORS } from '../services/multiWalletService'
import { alpacaForexStocksApi } from '../services/alpacaForexStocksApi'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'
import AdvancedForexChart from './alpaca/AdvancedForexChart'
import AdvancedStockChart from './alpaca/AdvancedStockChart'

interface AlpacaWalletSectionProps {
  balances: UnifiedBalance[]
  tickers: UnifiedTicker[]
  onRefresh?: () => void
}

const AlpacaWalletSection: React.FC<AlpacaWalletSectionProps> = ({ balances, tickers, onRefresh }) => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'stocks' | 'forex' | 'stocks-chart' | 'forex-chart' | 'history'>('wallet')
  const [orderHistory, setOrderHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [stockData, setStockData] = useState<any[]>([])
  const [forexData, setForexData] = useState<any[]>([])
  const [portfolio, setPortfolio] = useState<any>({})
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL')
  const [selectedForexSymbol, setSelectedForexSymbol] = useState<string>('EURUSD')
  const { withHaptic } = useHapticFeedback()

  const walletColor = WALLET_COLORS.alpaca // #00C896 - Vert Alpaca
  const totalValue = balances.reduce((sum, b) => sum + parseFloat(b.usdValue || '0'), 0)

  // Symboles populaires
  const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX']
  const popularForex = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'USD/CHF']

  useEffect(() => {
    loadPortfolioData()
  }, [])

  useEffect(() => {
    if (activeTab === 'stocks') {
      loadStockData()
    } else if (activeTab === 'forex') {
      loadForexData()
    } else if (activeTab === 'history') {
      loadOrderHistory()
    }
  }, [activeTab])

  const loadPortfolioData = async () => {
    try {
      const portfolioData = await alpacaForexStocksApi.getPortfolio()
      setPortfolio(portfolioData)
    } catch (error) {
      console.error('Erreur chargement portfolio Alpaca:', error)
    }
  }

  const loadStockData = async () => {
    try {
      setLoading(true)
      const stocks = await alpacaForexStocksApi.getFormattedStockBalance()
      setStockData(stocks)
    } catch (error) {
      console.error('Erreur chargement données actions:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadForexData = async () => {
    try {
      setLoading(true)
      const forex = await alpacaForexStocksApi.getFormattedForexBalance()
      setForexData(forex)
    } catch (error) {
      console.error('Erreur chargement données forex:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadOrderHistory = async () => {
    try {
      setLoading(true)
      const history = await alpacaForexStocksApi.getOrderHistory('all', 15)
      setOrderHistory(history)
    } catch (error) {
      console.error('Erreur chargement historique Alpaca:', error)
      toast.error('Erreur lors du chargement de l\'historique')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTrade = async (symbol: string, side: 'buy' | 'sell', assetClass: 'stocks' | 'forex') => {
    try {
      const quantity = assetClass === 'stocks' ? 1 : 1000 // 1 action ou 1000 unités forex
      const result = await alpacaForexStocksApi.placeOrder(symbol, quantity, side, 'market')
      toast.success(`Ordre ${side} placé sur Alpaca: ${result.id}`)
      onRefresh?.()
      loadPortfolioData()
    } catch (error) {
      console.error('Erreur placement ordre:', error)
      toast.error('Erreur lors du placement de l\'ordre')
    }
  }

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
  }

  return (
    <div className="space-y-6">
      {/* En-tête Alpaca avec design spécifique */}
      <div 
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border-2 relative overflow-hidden"
        style={{ 
          borderColor: `${walletColor}30`,
          boxShadow: `0 0 40px ${walletColor}15`
        }}
      >
        {/* Effet de lueur d'arrière-plan vert Alpaca */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `radial-gradient(circle at 50% 20%, ${walletColor}, transparent 70%)`
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
                  src="/logos/alpaca-logo.jpg" 
                  alt="Alpaca"
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
                <h2 className="text-2xl font-bold text-white">Alpaca Portfolio</h2>
                <p className="text-slate-400">Actions & Forex • Commission-Free</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: walletColor }}
                  />
                  <span className="text-sm text-slate-300">Connecté • Marché US</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                ${totalValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-slate-400">{balances.length} positions</div>
              <div className="text-sm text-slate-300 mt-1">
                Cash: ${portfolio.cash?.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) || '0.00'}
              </div>
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

          {/* Navigation interne avec couleurs Alpaca */}
          <div className="grid grid-cols-6 gap-2 bg-slate-800/50 rounded-xl p-2 backdrop-blur-sm">
            {[
              { id: 'wallet', label: 'Portfolio', icon: Wallet },
              { id: 'stocks', label: 'Actions', icon: Building2 },
              { id: 'forex', label: 'Forex', icon: Globe },
              { id: 'stocks-chart', label: 'Graphique Actions', icon: LineChart },
              { id: 'forex-chart', label: 'Graphique Forex', icon: Activity },
              { id: 'history', label: 'Historique', icon: TrendingUp }
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
                      ? 'text-white shadow-lg font-medium' 
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
                      layoutId="alpaca-tab-indicator"
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
            {/* Vue d'ensemble du portfolio */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Portfolio Alpaca ({balances.length} positions)
              </h3>
              
              {/* Statistiques du portfolio */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm">Valeur totale</div>
                  <div className="text-white font-bold text-lg">
                    ${portfolio.equity?.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) || '0.00'}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm">Liquidités</div>
                  <div className="text-white font-bold text-lg">
                    ${portfolio.cash?.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) || '0.00'}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm">P&L Journalier</div>
                  <div className={`font-bold text-lg ${
                    (portfolio.dayChange || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(portfolio.dayChange || 0) >= 0 ? '+' : ''}${(portfolio.dayChange || 0).toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm">P&L Total</div>
                  <div className={`font-bold text-lg ${
                    (portfolio.totalPnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(portfolio.totalPnl || 0) >= 0 ? '+' : ''}${(portfolio.totalPnl || 0).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Positions détaillées */}
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
                        <div className="text-slate-400 text-sm">
                          {balance.coin.includes('/') ? 'Forex' : balance.coin === 'USD' ? 'Cash' : 'Action'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        ${parseFloat(balance.usdValue).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {balance.coin === 'USD' ? 'Cash' : `${parseFloat(balance.balance).toFixed(6)} unités`}
                      </div>
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
                onClick={() => handleTabChange('stocks')}
              >
                <Building2 className="w-8 h-8 mx-auto mb-3" style={{ color: walletColor }} />
                <div className="text-white font-medium">Actions</div>
                <div className="text-slate-400 text-sm">Trader des actions</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center hover:border-slate-600 transition-colors"
                onClick={() => handleTabChange('forex')}
              >
                <Globe className="w-8 h-8 mx-auto mb-3" style={{ color: walletColor }} />
                <div className="text-white font-medium">Forex</div>
                <div className="text-slate-400 text-sm">Trader des devises</div>
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === 'stocks' && (
          <div className="space-y-6">
            {/* Trading d'actions */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Trading d'Actions - US Market
                <div className="ml-auto flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: walletColor }}
                  />
                  <span className="text-xs text-slate-400">Temps réel</span>
                </div>
              </h3>
              
              {/* Actions populaires */}
              <div className="space-y-3">
                {popularStocks.map((symbol) => {
                  const stockPosition = stockData.find(s => s.symbol === symbol)
                  return (
                    <div key={symbol} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: `${walletColor}30` }}
                        >
                          {symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{symbol}</div>
                          <div className="text-slate-400 text-sm">
                            {stockPosition ? `${stockPosition.shares} actions` : 'Non détenu'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-bold">
                            ${stockPosition?.currentPrice || 'N/A'}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {stockPosition?.value || 'Position: $0.00'}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickTrade(symbol, 'buy', 'stocks')}
                            className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-medium transition-colors"
                          >
                            Acheter
                          </motion.button>
                          {stockPosition && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleQuickTrade(symbol, 'sell', 'stocks')}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-medium transition-colors"
                            >
                              Vendre
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forex' && (
          <div className="space-y-6">
            {/* Trading Forex */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                Trading Forex - Paires Principales
                <div className="ml-auto flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: walletColor }}
                  />
                  <span className="text-xs text-slate-400">24/7 Trading</span>
                </div>
              </h3>
              
              {/* Paires forex populaires */}
              <div className="space-y-3">
                {popularForex.map((pair) => {
                  const forexPosition = forexData.find(f => f.symbol === pair)
                  return (
                    <div key={pair} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: `${walletColor}30` }}
                        >
                          {pair.split('/')[0].substring(0, 2)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{pair}</div>
                          <div className="text-slate-400 text-sm">
                            {forexPosition ? `${forexPosition.units} unités` : 'Aucune position'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-bold">
                            {forexPosition?.currentPrice || '1.0000'}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {forexPosition?.value || 'Position: $0.00'}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickTrade(pair, 'buy', 'forex')}
                            className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-medium transition-colors"
                          >
                            Long
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickTrade(pair, 'sell', 'forex')}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-medium transition-colors"
                          >
                            Short
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stocks-chart' && (
          <div className="space-y-6">
            {/* Sélecteur de symbole d'action */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <LineChart className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                  Graphique Actions Avancé
                </h3>
                <div className="flex space-x-2">
                  {popularStocks.map((stock) => (
                    <button
                      key={stock}
                      onClick={() => setSelectedSymbol(stock)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedSymbol === stock
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: selectedSymbol === stock ? `${walletColor}30` : 'transparent',
                        borderColor: selectedSymbol === stock ? `${walletColor}60` : 'transparent'
                      }}
                    >
                      {stock}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Graphique Actions Avancé */}
              <AdvancedStockChart 
                symbol={selectedSymbol}
                height={500}
                autoRefresh={true}
                showCompanyInfo={true}
              />
            </div>
          </div>
        )}

        {activeTab === 'forex-chart' && (
          <div className="space-y-6">
            {/* Sélecteur de paire forex */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" style={{ color: walletColor }} />
                  Graphique Forex Avancé
                </h3>
                <div className="flex space-x-2">
                  {popularForex.map((forex) => (
                    <button
                      key={forex}
                      onClick={() => setSelectedForexSymbol(forex.replace('/', ''))}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedForexSymbol === forex.replace('/', '')
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: selectedForexSymbol === forex.replace('/', '') ? `${walletColor}30` : 'transparent',
                        borderColor: selectedForexSymbol === forex.replace('/', '') ? `${walletColor}60` : 'transparent'
                      }}
                    >
                      {forex}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Graphique Forex Avancé */}
              <AdvancedForexChart 
                symbol={selectedForexSymbol}
                height={500}
                autoRefresh={true}
              />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: walletColor }} />
              Historique des Ordres Alpaca
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ color: walletColor }} />
              </div>
            ) : (
              <div className="space-y-3">
                {orderHistory.length > 0 ? orderHistory.slice(0, 10).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          order.side === 'buy' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <div className="flex items-center space-x-2">
                        {order.symbol.includes('/') ? (
                          <Globe className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Building2 className="w-4 h-4 text-slate-400" />
                        )}
                        <div>
                          <div className="text-white font-medium">{order.symbol}</div>
                          <div className="text-slate-400 text-sm">
                            {new Date(order.submitted_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">
                        {order.qty} @ ${order.limit_price || 'Market'}
                      </div>
                      <div className={`text-sm font-medium ${
                        order.status === 'filled' ? 'text-green-400' : 
                        order.status === 'canceled' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {order.status}
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
      </motion.div>
    </div>
  )
}

export default AlpacaWalletSection
