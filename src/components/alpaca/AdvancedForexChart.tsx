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
  EyeOff
} from 'lucide-react'
import { alpacaForexStocksApi } from '../../services/alpacaForexStocksApi'

interface ChartData {
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
  bollinger_upper?: number
  bollinger_lower?: number
}

interface AdvancedForexChartProps {
  symbol: string
  height?: number
  autoRefresh?: boolean
}

type ChartType = 'candlestick' | 'line' | 'area' | 'mountain'
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'
type Indicator = 'ma20' | 'ma50' | 'rsi' | 'bollinger' | 'volume'

const AdvancedForexChart: React.FC<AdvancedForexChartProps> = ({ 
  symbol, 
  height = 400,
  autoRefresh = true
}) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState<ChartType>('candlestick')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1h')
  const [activeIndicators, setActiveIndicators] = useState<Indicator[]>(['ma20', 'volume'])
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    loadChartData()
    
    if (autoRefresh) {
      const interval = setInterval(loadChartData, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [symbol, timeFrame, autoRefresh])

  const loadChartData = async () => {
    setLoading(true)
    try {
      // Générer des données OHLC réalistes pour la démo
      const data = generateRealisticOHLCData(symbol, timeFrame, 100)
      setChartData(data)
      
      if (data.length > 0) {
        const latest = data[data.length - 1]
        const previous = data[data.length - 2]
        setCurrentPrice(latest.close)
        setPriceChange(latest.close - (previous?.close || latest.close))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateRealisticOHLCData = (symbol: string, timeFrame: string, count: number): ChartData[] => {
    const data: ChartData[] = []
    const now = new Date()
    const intervalMs = getIntervalMs(timeFrame)
    
    // Prix de base selon le symbole
    let basePrice = getBasePriceForSymbol(symbol)
    
    for (let i = count - 1; i >= 0; i--) {
      const timestamp = now.getTime() - i * intervalMs
      const date = new Date(timestamp)
      
      // Volatilité selon le timeframe
      const volatility = timeFrame === '1m' ? 0.001 : timeFrame === '5m' ? 0.002 : 0.005
      
      // Générer OHLC avec variation réaliste
      const variation = (Math.random() - 0.5) * volatility * basePrice
      const open = basePrice + variation
      const close = open + (Math.random() - 0.5) * volatility * basePrice
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5
      
      basePrice = close // Continuité du prix
      
      const candle: ChartData = {
        timestamp,
        time: date.toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit',
          ...(timeFrame === '1d' || timeFrame === '1w' ? { day: '2-digit', month: '2-digit' } : {})
        }),
        open: parseFloat(open.toFixed(5)),
        high: parseFloat(high.toFixed(5)),
        low: parseFloat(low.toFixed(5)),
        close: parseFloat(close.toFixed(5)),
        volume: Math.floor(Math.random() * 1000000),
        // Indicateurs techniques - calculés après avoir ajouté le candle temporaire
        ma20: 0,
        ma50: 0,
        rsi: 50
      }

      // Créer un candle temporaire pour les calculs d'indicateurs
      const tempCandle = { ...candle }
      
      // Calculer les indicateurs avec les données existantes plus le nouveau candle
      candle.ma20 = calculateMA([...data.slice(-19), tempCandle], 20)
      candle.ma50 = calculateMA([...data.slice(-49), tempCandle], 50)
      candle.rsi = calculateRSI([...data.slice(-13), tempCandle], 14)
      
      data.push(candle)
    }
    
    return data
  }

  const getBasePriceForSymbol = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      'EURUSD': 1.0500,
      'GBPUSD': 1.2800,
      'USDJPY': 155.00,
      'AUDUSD': 0.6500,
      'USDCAD': 1.3500,
      'USDCHF': 0.9200,
      'NZDUSD': 0.5800,
      'EURJPY': 163.00
    }
    return prices[symbol.replace('/', '')] || 1.0000
  }

  const getIntervalMs = (timeFrame: string): number => {
    const intervals: { [key: string]: number } = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000,
      '4h': 14400000,
      '1d': 86400000,
      '1w': 604800000
    }
    return intervals[timeFrame] || 3600000
  }

  const calculateMA = (data: any[], period: number): number => {
    if (data.length < period) return 0
    const sum = data.slice(-period).reduce((acc, item) => acc + item.close, 0)
    return parseFloat((sum / period).toFixed(5))
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
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Ouverture:</span>
              <span className="text-white font-medium">{data.open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Plus haut:</span>
              <span className="text-green-400 font-medium">{data.high}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Plus bas:</span>
              <span className="text-red-400 font-medium">{data.low}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clôture:</span>
              <span className="text-white font-medium">{data.close}</span>
            </div>
            {activeIndicators.includes('volume') && (
              <div className="flex justify-between">
                <span className="text-slate-400">Volume:</span>
                <span className="text-blue-400 font-medium">{data.volume?.toLocaleString()}</span>
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
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C896" stopOpacity={0.3}/>
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
            domain={['dataMin - 0.001', 'dataMax + 0.001']}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Candlestick representation using Bars */}
          <Bar 
            dataKey="high" 
            fill="none"
            stroke="#10B981"
            strokeWidth={1}
          />
          
          {/* Moving Averages */}
          {activeIndicators.includes('ma20') && (
            <Line 
              type="monotone" 
              dataKey="ma20" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
            />
          )}
          {activeIndicators.includes('ma50') && (
            <Line 
              type="monotone" 
              dataKey="ma50" 
              stroke="#EF4444" 
              strokeWidth={2}
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
            fill="url(#colorGradient)"
            fillOpacity={0.3}
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
      {/* En-tête du graphique */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-white">{symbol}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                {currentPrice.toFixed(5)}
              </span>
              <div className={`flex items-center space-x-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(5)}
                </span>
              </div>
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
            {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
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

      {/* RSI Indicator */}
      {activeIndicators.includes('rsi') && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">RSI (14)</span>
            <span className="text-sm text-white font-medium">
              {chartData[chartData.length - 1]?.rsi?.toFixed(2) || '--'}
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all"
              style={{ 
                width: `${(chartData[chartData.length - 1]?.rsi || 50)}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedForexChart
