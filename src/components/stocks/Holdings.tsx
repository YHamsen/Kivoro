import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, MoreHorizontal, BarChart3, Eye, Minus } from 'lucide-react'
import { alpacaApi, Position } from '../../services/alpacaApi'
import { logoService, CompanyLogo } from '../../services/logoService'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import SellConfirmationModal from '../modals/SellConfirmationModal'
import MiniSparklineChart, { generateMockChartData } from '../ui/MiniSparklineChart'

interface HoldingsProps {
  onSellStock: (symbol: string, position: Position) => void
  refreshTrigger?: number
}

const Holdings: React.FC<HoldingsProps> = ({ onSellStock, refreshTrigger }) => {
  const [holdings, setHoldings] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [logos, setLogos] = useState<Map<string, CompanyLogo>>(new Map())
  const [chartData, setChartData] = useState<Map<string, number[]>>(new Map())
  const [selectedPositionForSell, setSelectedPositionForSell] = useState<Position | null>(null)
  const [showSellModal, setShowSellModal] = useState(false)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadHoldings()
  }, [refreshTrigger])

  const loadHoldings = async () => {
    try {
      setLoading(true)
      const positions = await alpacaApi.getPositions()
      
      // If no real positions, create mock data for demo
      let holdingsData = positions
      if (positions.length === 0) {
        holdingsData = [
          {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            qty: 2.5,
            side: 'long' as const,
            market_value: 365.73,
            cost_basis: 320.45,
            unrealized_pl: 45.28,
            unrealized_plpc: 0.1412,
            avg_entry_price: 128.18
          },
          {
            symbol: 'NVDA',
            name: 'NVIDIA Corporation',
            qty: 1.25,
            side: 'long' as const,
            market_value: 541.11,
            cost_basis: 498.75,
            unrealized_pl: 42.36,
            unrealized_plpc: 0.0849,
            avg_entry_price: 399.00
          }
        ]
      }
      
      setHoldings(holdingsData)
      
      // Load logos for holdings
      const symbols = holdingsData.map(p => p.symbol)
      if (symbols.length > 0) {
        const stockLogos = await logoService.getLogos(symbols)
        setLogos(stockLogos)
        
        // Generate mock chart data
        const chartDataMap = new Map<string, number[]>()
        holdingsData.forEach(position => {
          const currentPrice = position.market_value / position.qty
          const data = generateMockChartData(30, currentPrice)
          chartDataMap.set(position.symbol, data)
        })
        setChartData(chartDataMap)
      }
    } catch (error) {
      console.error('Failed to load holdings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSellClick = (position: Position) => {
    withHaptic(() => {
      setSelectedPositionForSell(position)
      setShowSellModal(true)
    }, 'medium')()
  }

  const handleSellModalClose = () => {
    setShowSellModal(false)
    setSelectedPositionForSell(null)
  }

  const handleSellComplete = () => {
    onSellStock(selectedPositionForSell?.symbol || '', selectedPositionForSell!)
    loadHoldings() // Refresh holdings
    handleSellModalClose()
  }

  const handleViewChart = (symbol: string) => {
    withHaptic(() => {
      // In a real app, this would open a detailed chart view
      // For now, just show a toast
      alert(`📈 Opening detailed chart for ${symbol}`)
    }, 'light')()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : ''
    return `${sign}${(percentage * 100).toFixed(2)}%`
  }

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">MY HOLDINGS</h3>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                    <div className="w-20 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-20 h-4 bg-gray-700 rounded mb-1"></div>
                  <div className="w-16 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">MY HOLDINGS</h3>
        <div className="space-y-4">
          {holdings.map((position, index) => {
            const logo = logos.get(position.symbol)
            const stockChartData = chartData.get(position.symbol) || []
            const currentPrice = position.market_value / position.qty
            
            return (
              <motion.div
                key={position.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-gray-800 rounded-2xl p-5 hover:border-[#00D4AA]/50 hover:shadow-xl hover:shadow-[#00D4AA]/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Company Logo */}
                    <div className="relative">
                      {logo?.logoUrl ? (
                        <img
                          src={logo.logoUrl}
                          alt={position.symbol}
                          className="w-12 h-12 rounded-xl object-cover bg-white p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            ;(e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${logo?.backgroundColor || '#F7931A'}, ${logo?.backgroundColor || '#F7931A'}dd)`,
                          display: logo?.logoUrl ? 'none' : 'flex'
                        }}
                      >
                        {logo?.fallbackInitials || position.symbol.substring(0, 2)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-semibold text-base">{position.symbol}</h4>
                        <button
                          onClick={() => handleViewChart(position.symbol)}
                          className="text-gray-400 hover:text-[#00D4AA] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {position.qty.toFixed(4)} {position.qty === 1 ? 'share' : 'shares'} • ${currentPrice.toFixed(2)}/share
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <MiniSparklineChart
                      data={stockChartData}
                      color={position.unrealized_pl >= 0 ? '#00D4AA' : '#EF4444'}
                      width={60}
                      height={24}
                      className="opacity-80"
                    />
                    
                    <motion.button
                      onClick={() => handleSellClick(position)}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus className="w-3 h-3" />
                      <span>Sell</span>
                    </motion.button>
                  </div>
                </div>
                
                {/* Holdings Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0f0f0f] rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Market Value</p>
                    <p className="text-white font-bold text-lg">
                      {formatCurrency(position.market_value)}
                    </p>
                  </div>
                  
                  <div className="bg-[#0f0f0f] rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Avg Cost</p>
                    <p className="text-white font-semibold">
                      {formatCurrency(position.avg_entry_price)}
                    </p>
                  </div>
                  
                  <div className="bg-[#0f0f0f] rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">P&L</p>
                    <div className="flex items-center space-x-1">
                      {position.unrealized_pl >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-[#00D4AA]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <div>
                        <p className={`font-semibold text-sm ${position.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                          {formatCurrency(position.unrealized_pl)}
                        </p>
                        <p className={`text-xs ${position.unrealized_pl >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                          {formatPercentage(position.unrealized_plpc)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {holdings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-gray-800 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">No Holdings Yet</h4>
              <p className="text-gray-400 text-sm mb-4">
                Start investing to see your portfolio here
              </p>
              <div className="text-gray-500 text-xs">
                💡 Your purchased stocks will appear here with real-time performance tracking
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sell Confirmation Modal */}
      <SellConfirmationModal
        isOpen={showSellModal}
        onClose={handleSellModalClose}
        position={selectedPositionForSell}
        onSellComplete={handleSellComplete}
      />
    </>
  )
}

export default Holdings
