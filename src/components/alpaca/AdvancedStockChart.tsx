import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity, 
  Settings,
  Maximize2,
  Volume2,
  Calendar,
  Target,
  Zap,
  Eye,
  EyeOff,
  DollarSign,
  Building
} from 'lucide-react'
import { alpacaForexStocksApi } from '../../services/alpacaForexStocksApi'

interface StockChartData {
  timestamp: number
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  ma20?: number
  ma50?: number
  rsi?: number
  macd?: number
  signal?: number
  vwap?: number
}

interface AdvancedStockChartProps {
  symbol: string
  height?: number
  autoRefresh?: boolean
  showCompanyInfo?: boolean
}

type ChartType = 'candlestick' | 'line' | 'area' | 'mountain'
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1M'
type Indicator = 'ma20' | 'ma50' | 'rsi' | 'macd' | 'volume' | 'vwap'

interface CompanyInfo {
  name: string
  sector: string
  marketCap: string
  pe: number
  dividend: number
  beta: number
}

const AdvancedStockChart: React.FC<AdvancedStockChartProps> = ({ 
  symbol, 
  height = 450,
  autoRefresh = true,
  showCompanyInfo = true
}) => {
  const [chartData, setChartData] = useState<StockChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState<ChartType>('candlestick')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1h')
  const [activeIndicators, setActiveIndicators] = useState<Indicator[]>(['ma20', 'volume'])
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [percentChange, setPercentChange] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)

  useEffect(() => {
    loadChartData()
    loadCompanyInfo()
    
    if (autoRefresh) {
      const interval = setInterval(loadChartData, 10000) // Refresh every 10 seconds
      return () => clearInterval(interval)
    }
  }, [symbol, timeFrame, autoRefresh])

  const loadChartData = async () => {
    setLoading(true)
    try {
      // Générer des données OHLC réalistes pour actions
      const data = generateRealisticStockData(symbol, timeFrame, 100)
      setChartData(data)
      
      if (data.length > 0) {
        const latest = data[data.length - 1]
        const previous = data[data.length - 2]
        setCurrentPrice(latest.close)
        const change = latest.close - (previous?.close || latest.close)
        setPriceChange(change)
        setPercentChange((change / (previous?.close || latest.close)) * 100)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCompanyInfo = () => {
    // Données d'entreprise de démonstration
    const companies: { [key: string]: CompanyInfo } = {
      'AAPL': {
        name: 'Apple Inc.',
        sector: 'Technology',
        marketCap: '$3.52T',
        pe: 29.5,
        dividend: 0.44,
        beta: 1.25
      },
      'MSFT': {
        name: 'Microsoft Corporation',
        sector: 'Technology',
        marketCap: '$3.12T',
        pe: 35.2,
        dividend: 0.68,
        beta: 0.92
      },
      'GOOGL': {
        name: 'Alphabet Inc.',
        sector: 'Communication',
        marketCap: '$2.08T',
        pe: 28.1,
        dividend: 0.0,
        beta: 1.05
      },
      'TSLA': {
        name: 'Tesla Inc.',
        sector: 'Consumer Cyclical',
        marketCap: '$745B',
        pe: 64.3,
        dividend: 0.0,
        beta: 2.35
      },
      'NVDA': {
        name: 'NVIDIA Corporation',
        sector: 'Technology',
        marketCap: '$1.12T',
        pe: 41.8,
        dividend: 0.16,
        beta: 1.68
      }
    }
    
    setCompanyInfo(companies[symbol] || {
      name: `${symbol} Corporation`,
      sector: 'Unknown',
      marketCap: 'N/A',
      pe: 0,
      dividend: 0,
      beta: 1.0
    })
  }

  const generateRealisticStockData = (symbol: string, timeFrame: string, count: number): StockChartData[] => {
    const data: StockChartData[] = []
    const now = new Date()
    const intervalMs = getIntervalMs(timeFrame)
    
    // Prix de base selon le symbole
    let basePrice = getBasePriceForSymbol(symbol)
    
    for (let i = count - 1; i >= 0; i--) {
      const timestamp = now.getTime() - i * intervalMs
      const date = new Date(timestamp)
      
      // Volatilité selon le symbole et timeframe
      const volatility = getVolatilityForSymbol(symbol, timeFrame)
      
      // Générer OHLC avec tendance et volume réalistes
      const trend = Math.sin(i / 20) * 0.02 // Tendance sinusoïdale
      const variation = (Math.random() - 0.5) * volatility * basePrice + trend * basePrice
      const open = basePrice + variation
      const close = open + (Math.random() - 0.5) * volatility * basePrice
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5
      
      basePrice = close // Continuité du prix
      
      // Volume avec spikes réalistes
      const avgVolume = getAverageVolumeForSymbol(symbol)
      const volumeSpike = Math.random() < 0.1 ? 2 + Math.random() * 3 : 1
      const volume = Math.floor(avgVolume * (0.5 + Math.random()) * volumeSpike)
      
      const candle: StockChartData = {
        timestamp,
        time: formatTimeForTimeframe(date, timeFrame),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume,
        // Indicateurs techniques - calculés après avoir ajouté le candle temporaire
        ma20: 0,
        ma50: 0,
        rsi: 50,
        vwap: 0
      }

      // Créer un candle temporaire pour les calculs d'indicateurs
      const tempCandle = { ...candle }
      
      // Calculer les indicateurs avec les données existantes plus le nouveau candle
      candle.ma20 = calculateMA([...data.slice(-19), tempCandle], 20)
      candle.ma50 = calculateMA([...data.slice(-49), tempCandle], 50)
      candle.rsi = calculateRSI([...data.slice(-13), tempCandle], 14)
      candle.vwap = calculateVWAP([...data.slice(-19), tempCandle])
      
      data.push(candle)
    }
    
    return data
  }

  const getBasePriceForSymbol = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      'AAPL': 230.50,
      'MSFT': 415.25,
      'GOOGL': 185.75,
      'TSLA': 146.85,
      'NVDA': 432.90,
      'AMZN': 218.40,
      'META': 521.30,
      'NFLX': 685.20
    }
    return prices[symbol] || 150.00
  }

  const getVolatilityForSymbol = (symbol: string, timeFrame: string): number => {
    const baseVolatilities: { [key: string]: number } = {
      'AAPL': 0.02,
      'MSFT': 0.018,
      'GOOGL': 0.025,
      'TSLA': 0.045,
      'NVDA': 0.035,
      'AMZN': 0.03,
      'META': 0.04,
      'NFLX': 0.038
    }
    
    const timeFrameMultiplier = {
      '1m': 0.2,
      '5m': 0.3,
      '15m': 0.5,
      '1h': 0.7,
      '4h': 1.0,
      '1d': 1.2,
      '1w': 1.5,
      '1M': 2.0
    }
    
    return (baseVolatilities[symbol] || 0.025) * (timeFrameMultiplier[timeFrame] || 1.0)
  }

  const getAverageVolumeForSymbol = (symbol: string): number => {
    const volumes: { [key: string]: number } = {
      'AAPL': 45000000,
      'MSFT': 28000000,
      'GOOGL': 25000000,
      'TSLA': 75000000,
      'NVDA': 55000000,
      'AMZN': 35000000,
      'META': 22000000,
      'NFLX': 8000000
    }
    return volumes[symbol] || 10000000
  }

  const getIntervalMs = (timeFrame: string): number => {
    const intervals: { [key: string]: number } = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000,
      '4h': 14400000,
      '1d': 86400000,
      '1w': 604800000,
      '1M': 2592000000
    }
    return intervals[timeFrame] || 3600000
  }

  const formatTimeForTimeframe = (date: Date, timeFrame: string): string => {
    if (timeFrame === '1d' || timeFrame === '1w' || timeFrame === '1M') {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    }
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const calculateMA = (data: any[], period: number): number => {
    if (data.length < period) return 0
    const sum = data.slice(-period).reduce((acc, item) => acc + item.close, 0)
    return parseFloat((sum / period).toFixed(2))
  }

  const calculateRSI = (data: any[], period: number): number => {
    if (data.length < period + 1) return 50
    
    let gains = 0
    let losses = 0
    
    for (let i = 1; i <= period; i++) {
      const change = data[data.length - i].close - data[data.length - i - 1].close
      if (change > 0) gains += change
      else losses -= change
    }
    
    const avgGain = gains / period
    const avgLoss = losses / period
    const rs = avgGain / avgLoss
    const rsi = 100 - (100 / (1 + rs))
    
    return parseFloat(rsi.toFixed(2))
  }

  const calculateVWAP = (data: any[]): number => {
    if (data.length === 0) return 0
    
    let cumulativeVolume = 0
    let cumulativePriceVolume = 0
    
    data.forEach(item => {
      const typicalPrice = (item.high + item.low + item.close) / 3
      cumulativePriceVolume += typicalPrice * item.volume
      cumulativeVolume += item.volume
    })
    
    return cumulativeVolume > 0 ? parseFloat((cumulativePriceVolume / cumulativeVolume).toFixed(2)) : 0
  }

  const toggleIndicator = (indicator: Indicator) => {
    setActiveIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-lg min-w-48">
          <p className="text-slate-300 text-sm mb-2 font-medium">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Ouverture:</span>
              <span className="text-white font-medium">${data.open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Plus haut:</span>
              <span className="text-green-400 font-medium">${data.high}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Plus bas:</span>
              <span className="text-red-400 font-medium">${data.low}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clôture:</span>
              <span className="text-white font-medium">${data.close}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Volume:</span>
              <span className="text-blue-400 font-medium">{(data.volume / 1000000).toFixed(1)}M</span>
            </div>
            {data.vwap && (
              <div className="flex justify-between">
                <span className="text-slate-400">VWAP:</span>
                <span className="text-purple-400 font-medium">${data.vwap}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    if (chartType === 'candlestick') {
      return (
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C896" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Volume bars */}
          {activeIndicators.includes('volume') && (
            <Bar 
              dataKey="volume" 
              fill="#3B82F6"
              fillOpacity={0.3}
              yAxisId="volume"
            />
          )}
          
          {/* Price line */}
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#00C896" 
            strokeWidth={2}
            dot={false}
          />
          
          {/* Moving Averages */}
          {activeIndicators.includes('ma20') && (
            <Line 
              type="monotone" 
              dataKey="ma20" 
              stroke="#F59E0B" 
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
          {activeIndicators.includes('ma50') && (
            <Line 
              type="monotone" 
              dataKey="ma50" 
              stroke="#EF4444" 
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="3 3"
            />
          )}
          {activeIndicators.includes('vwap') && (
            <Line 
              type="monotone" 
              dataKey="vwap" 
              stroke="#A855F7" 
              strokeWidth={1.5}
              dot={false}
            />
          )}
        </ComposedChart>
      )
    }

    if (chartType === 'area' || chartType === 'mountain') {
      return (
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="close"
            stroke="#00C896"
            strokeWidth={2}
            fill="url(#stockGradient)"
            fillOpacity={0.4}
          />
          
          {activeIndicators.includes('ma20') && (
            <Line 
              type="monotone" 
              dataKey="ma20" 
              stroke="#F59E0B" 
              strokeWidth={1}
              dot={false}
            />
          )}
        </ComposedChart>
      )
    }

    return (
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="time" 
          stroke="#9CA3AF"
          fontSize={12}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke="#00C896" 
          strokeWidth={2}
          dot={false}
        />
        
        {activeIndicators.includes('ma20') && (
          <Line 
            type="monotone" 
            dataKey="ma20" 
            stroke="#F59E0B" 
            strokeWidth={1}
            dot={false}
          />
        )}
      </ComposedChart>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Activity className="w-8 h-8 text-[#00C896]" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* En-tête du graphique avec info entreprise */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-white">{symbol}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <div className={`flex items-center space-x-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChange >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              
              {showCompanyInfo && companyInfo && (
                <div className="text-sm text-slate-400">
                  <p className="font-medium text-slate-300">{companyInfo.name}</p>
                  <p>{companyInfo.sector} • {companyInfo.marketCap}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Métriques clés */}
        {showCompanyInfo && companyInfo && (
          <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-slate-800/50 rounded-lg">
            <div className="text-center">
              <div className="text-xs text-slate-400">P/E Ratio</div>
              <div className="text-sm font-medium text-white">{companyInfo.pe}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400">Dividend</div>
              <div className="text-sm font-medium text-white">{companyInfo.dividend}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400">Beta</div>
              <div className="text-sm font-medium text-white">{companyInfo.beta}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400">Volume</div>
              <div className="text-sm font-medium text-white">
                {((chartData[chartData.length - 1]?.volume || 0) / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>
        )}

        {/* Contrôles du graphique */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Type de graphique */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            {['candlestick', 'line', 'area'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type as ChartType)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  chartType === type 
                    ? 'bg-[#00C896] text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'candlestick' ? 'Bougie' : 
                 type === 'line' ? 'Ligne' : 'Zone'}
              </button>
            ))}
          </div>

          {/* Timeframe */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFrame(tf as TimeFrame)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  timeFrame === tf 
                    ? 'bg-[#00C896] text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicateurs */}
          <div className="flex space-x-2">
            {[
              { id: 'ma20', label: 'MA20', color: '#F59E0B' },
              { id: 'ma50', label: 'MA50', color: '#EF4444' },
              { id: 'vwap', label: 'VWAP', color: '#A855F7' },
              { id: 'volume', label: 'Volume', color: '#3B82F6' }
            ].map((indicator) => (
              <button
                key={indicator.id}
                onClick={() => toggleIndicator(indicator.id as Indicator)}
                className={`flex items-center space-x-1 px-2 py-1 text-xs rounded border transition-colors ${
                  activeIndicators.includes(indicator.id as Indicator)
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                {activeIndicators.includes(indicator.id as Indicator) ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
                <span style={{ color: indicator.color }}>{indicator.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Graphique */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Panneau d'indicateurs techniques */}
      <div className="p-4 border-t border-slate-700 grid grid-cols-3 gap-4">
        {activeIndicators.includes('rsi') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">RSI (14)</span>
              <span className="text-xs text-white font-medium">
                {chartData[chartData.length - 1]?.rsi?.toFixed(2) || '--'}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  (chartData[chartData.length - 1]?.rsi || 50) > 70 ? 'bg-red-500' :
                  (chartData[chartData.length - 1]?.rsi || 50) < 30 ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}
                style={{ 
                  width: `${(chartData[chartData.length - 1]?.rsi || 50)}%` 
                }}
              />
            </div>
          </div>
        )}
        
        {activeIndicators.includes('ma20') && (
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">MA20</span>
              <span className="text-xs text-yellow-500 font-medium">
                ${chartData[chartData.length - 1]?.ma20?.toFixed(2) || '--'}
              </span>
            </div>
          </div>
        )}
        
        {activeIndicators.includes('vwap') && (
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">VWAP</span>
              <span className="text-xs text-purple-400 font-medium">
                ${chartData[chartData.length - 1]?.vwap?.toFixed(2) || '--'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedStockChart
