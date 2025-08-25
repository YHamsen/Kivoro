import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, BarChart3, ShoppingCart, Star, Plus } from 'lucide-react'
import { alpacaApi, Stock } from '../../services/alpacaApi'
import { logoService, CompanyLogo } from '../../services/logoService'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'
import BuyConfirmationModal from '../modals/BuyConfirmationModal'
import MiniSparklineChart, { generateMockChartData } from '../ui/MiniSparklineChart'

interface BuySharesProps {
  selectedStock?: string
  onBuyComplete: () => void
}

const BuyShares: React.FC<BuySharesProps> = ({ selectedStock, onBuyComplete }) => {
  const [featuredStocks, setFeaturedStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [logos, setLogos] = useState<Map<string, CompanyLogo>>(new Map())
  const [chartData, setChartData] = useState<Map<string, number[]>>(new Map())
  const [selectedStockForBuy, setSelectedStockForBuy] = useState<Stock | null>(null)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const { withHaptic } = useHapticFeedback()

  useEffect(() => {
    loadFeaturedStocks()
  }, [])

  const loadFeaturedStocks = async () => {
    try {
      setLoading(true)
      // Load some popular stocks for the buy section
      const symbols = ['TSLA', 'NVDA', 'META', 'GOOGL', 'AAPL', 'MSFT']
      const quotes = await alpacaApi.getQuotes(symbols)
      
      const stocks = symbols.map(symbol => ({
        symbol,
        name: getCompanyName(symbol),
        price: quotes[symbol]?.latest_trade?.p || getDefaultPrice(symbol),
        change: (Math.random() - 0.5) * 10, // Random change between -5 and +5
        changePercent: (Math.random() - 0.5) * 8, // Random change between -4% and +4%
        volume: Math.floor(Math.random() * 50000000) + 5000000,
        exchange: 'NASDAQ',
        logo: undefined
      }))
      
      // Load logos
      const stockLogos = await logoService.getLogos(symbols)
      setLogos(stockLogos)
      
      // Generate mock chart data
      const chartDataMap = new Map<string, number[]>()
      symbols.forEach(symbol => {
        const stock = stocks.find(s => s.symbol === symbol)
        const data = generateMockChartData(30, stock?.price || 100)
        chartDataMap.set(symbol, data)
      })
      setChartData(chartDataMap)
      
      setFeaturedStocks(stocks)
    } catch (error) {
      console.error('Failed to load featured stocks:', error)
      // Set mock data
      const mockStocks = [
        {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 146.29,
          change: 2.18,
          changePercent: 1.51,
          volume: 88760000,
          exchange: 'NASDAQ'
        },
        {
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 432.89,
          change: -5.12,
          changePercent: -1.17,
          volume: 25430000,
          exchange: 'NASDAQ'
        },
        {
          symbol: 'META',
          name: 'Meta Platforms Inc.',
          price: 521.21,
          change: 8.45,
          changePercent: 1.65,
          volume: 12870000,
          exchange: 'NASDAQ'
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 2842.33,
          change: -15.67,
          changePercent: -0.55,
          volume: 31250000,
          exchange: 'NASDAQ'
        }
      ]
      
      setFeaturedStocks(mockStocks)
      
      // Load logos for mock data
      const symbols = mockStocks.map(s => s.symbol)
      const stockLogos = await logoService.getLogos(symbols)
      setLogos(stockLogos)
      
      // Generate mock chart data
      const chartDataMap = new Map<string, number[]>()
      symbols.forEach(symbol => {
        const stock = mockStocks.find(s => s.symbol === symbol)
        const data = generateMockChartData(30, stock?.price || 100)
        chartDataMap.set(symbol, data)
      })
      setChartData(chartDataMap)
    } finally {
      setLoading(false)
    }
  }

  const getCompanyName = (symbol: string): string => {
    const names: { [key: string]: string } = {
      'TSLA': 'Tesla, Inc.',
      'NVDA': 'NVIDIA Corporation',
      'META': 'Meta Platforms Inc.',
      'GOOGL': 'Alphabet Inc.',
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'AMZN': 'Amazon.com Inc.',
      'NFLX': 'Netflix Inc.',
      'ADBE': 'Adobe Inc.',
      'CRM': 'Salesforce Inc.'
    }
    return names[symbol] || `${symbol} Corporation`
  }

  const getDefaultPrice = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      'TSLA': 146.29,
      'NVDA': 432.89,
      'META': 521.21,
      'GOOGL': 2842.33,
      'AAPL': 191.45,
      'MSFT': 378.92,
      'AMZN': 142.81,
      'NFLX': 584.73,
      'ADBE': 512.35,
      'CRM': 298.67
    }
    return prices[symbol] || (Math.random() * 200 + 50) // Random price between $50-$250
  }

  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  const handleBuyStock = (stock: Stock) => {
    withHaptic(() => {
      setSelectedStockForBuy(stock)
      setShowBuyModal(true)
    }, 'medium')()
  }

  const handleBuyModalClose = () => {
    setShowBuyModal(false)
    setSelectedStockForBuy(null)
  }

  const handleBuyComplete = () => {
    onBuyComplete()
    handleBuyModalClose()
  }

  const handleAddToWatchlist = (symbol: string) => {
    withHaptic(() => {
      toast.success(`⭐ ${symbol} added to watchlist`)
    }, 'light')()
  }

  const isMarketOpen = () => {
    const now = new Date()
    const hours = now.getHours()
    const day = now.getDay()
    
    // Simple market hours check (9:30 AM - 4:00 PM EST, Mon-Fri)
    // This is simplified and doesn't account for holidays or timezone
    return day >= 1 && day <= 5 && hours >= 9 && hours < 16
  }

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">BUY SHARES</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-700 rounded mb-1"></div>
                    <div className="w-24 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="w-16 h-8 bg-gray-700 rounded"></div>
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
        <h3 className="text-white text-lg font-semibold mb-4">BUY SHARES</h3>
        <div className="space-y-4">
          {featuredStocks.map((stock, index) => {
            const logo = logos.get(stock.symbol)
            const stockChartData = chartData.get(stock.symbol) || []
            
            return (
              <motion.div
                key={stock.symbol}
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
                          alt={stock.symbol}
                          className="w-12 h-12 rounded-xl object-cover bg-white p-1"
                          onError={(e) => {
                            // Fallback to initials
                            e.currentTarget.style.display = 'none'
                            ;(e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${logo?.backgroundColor || '#00D4AA'}, ${logo?.backgroundColor || '#00D4AA'}dd)`,
                          display: logo?.logoUrl ? 'none' : 'flex'
                        }}
                      >
                        {logo?.fallbackInitials || stock.symbol.substring(0, 2)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-semibold text-base">{stock.symbol}</h4>
                        <button
                          onClick={() => handleAddToWatchlist(stock.symbol)}
                          className="text-gray-400 hover:text-[#F7931A] transition-colors"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">{stock.name}</p>
                    </div>
                  </div>
                  
                  {/* Mini Chart */}
                  <div className="flex items-center space-x-3">
                    <MiniSparklineChart
                      data={stockChartData}
                      color={stock.changePercent >= 0 ? '#00D4AA' : '#EF4444'}
                      width={60}
                      height={24}
                      className="opacity-80"
                    />
                    
                    <motion.button
                      onClick={() => handleBuyStock(stock)}
                      className="bg-[#00D4AA] hover:bg-[#00B893] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-[#00D4AA]/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy
                    </motion.button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">
                        {isMarketOpen() ? 'Market open' : 'Market closed'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">{formatVolume(stock.volume)}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">
                      ${stock.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-1">
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-[#00D4AA]" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                      )}
                      <span className={`text-sm font-medium ${stock.changePercent >= 0 ? 'text-[#00D4AA]' : 'text-red-500'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {/* Fractional Investment Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#00D4AA]/15 to-[#00B893]/15 border border-[#00D4AA]/40 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00B893] rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-base">Fractional Investment</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Start investing with as little as $1 in your favorite stocks
                </p>
              </div>
              <div className="w-8 h-8 bg-[#00D4AA]/30 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#00D4AA]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Buy Confirmation Modal */}
      <BuyConfirmationModal
        isOpen={showBuyModal}
        onClose={handleBuyModalClose}
        stock={selectedStockForBuy}
        onBuyComplete={handleBuyComplete}
      />
    </>
  )
}

export default BuyShares
