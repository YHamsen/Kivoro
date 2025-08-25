import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Bar
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
  Wifi,
  WifiOff
} from 'lucide-react'

interface CryptoChartData {
  timestamp: number
  time: string
  price: number
  volume: number
  ma7?: number
  ma25?: number
  rsi?: number
  volatility?: number
}

interface OptimizedCryptoChartProps {
  symbol: string
  walletColor: string
  walletName: string
  height?: number
  autoRefresh?: boolean
  showVolume?: boolean
}

type ChartType = 'line' | 'area' | 'candle' | 'volume'
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d'
type Indicator = 'ma7' | 'ma25' | 'rsi' | 'volume' | 'volatility'

const OptimizedCryptoChart: React.FC<OptimizedCryptoChartProps> = ({ 
  symbol, 
  walletColor,
  walletName,
  height = 400,
  autoRefresh = true,
  showVolume = true
}) => {
  const [chartData, setChartData] = useState<CryptoChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState<ChartType>('area')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1h')
  const [activeIndicators, setActiveIndicators] = useState<Indicator[]>(['ma7', 'volume'])
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [percentChange, setPercentChange] = useState<number>(0)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    loadChartData()
    
    if (autoRefresh) {
      startRealTimeUpdates()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [symbol, timeFrame, autoRefresh])

  const loadChartData = async () => {
    setLoading(true)
    try {
      // Simulation de données crypto réalistes avec WebSocket-like updates
      const data = await generateRealisticCryptoData(symbol, timeFrame, 100)
      setChartData(data)
      
      if (data.length > 0) {
        const latest = data[data.length - 1]
        const previous = data[data.length - 2]
        setCurrentPrice(latest.price)
        const change = latest.price - (previous?.price || latest.price)
        setPriceChange(change)
        setPercentChange((change / (previous?.price || latest.price)) * 100)
      }
      
      setIsConnected(true)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const startRealTimeUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Simulation d'updates WebSocket
    intervalRef.current = setInterval(() => {
      updateRealTimePrice()
    }, 2000) // Update every 2 seconds
  }

  const updateRealTimePrice = () => {
    setChartData(prevData => {
      if (prevData.length === 0) return prevData
      
      const latest = prevData[prevData.length - 1]
      const volatility = getCryptoVolatility(symbol)
      const priceChange = (Math.random() - 0.5) * volatility * latest.price
      const newPrice = Math.max(0.01, latest.price + priceChange)
      
      // Créer un nouveau point de données
      const now = new Date()
      const newDataPoint: CryptoChartData = {
        timestamp: now.getTime(),
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        price: parseFloat(newPrice.toFixed(8)),
        volume: Math.floor(Math.random() * 1000000),
        // Indicateurs techniques - calculés après avoir ajouté le point temporaire
        ma7: 0,
        ma25: 0,
        rsi: 50
      }

      // Créer un point temporaire pour les calculs d'indicateurs
      const tempDataPoint = { ...newDataPoint }
      
      // Calculer les indicateurs avec les données existantes plus le nouveau point
      newDataPoint.ma7 = calculateMA([...prevData.slice(-6), tempDataPoint], 7)
      newDataPoint.ma25 = calculateMA([...prevData.slice(-24), tempDataPoint], 25)
      newDataPoint.rsi = calculateRSI([...prevData.slice(-13), tempDataPoint], 14)
      
      // Garder seulement les 100 derniers points
      const updatedData = [...prevData.slice(-99), newDataPoint]
      
      // Mettre à jour les prix actuels
      const previous = prevData[prevData.length - 1]
      const change = newPrice - previous.price
      setCurrentPrice(newPrice)
      setPriceChange(change)
      setPercentChange((change / previous.price) * 100)
      setLastUpdate(now)
      setIsConnected(true)
      
      return updatedData
    })
  }

  const generateRealisticCryptoData = async (symbol: string, timeFrame: string, count: number): Promise<CryptoChartData[]> => {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const data: CryptoChartData[] = []
    const now = new Date()
    const intervalMs = getIntervalMs(timeFrame)
    
    let basePrice = getCryptoBasePrice(symbol)
    
    for (let i = count - 1; i >= 0; i--) {
      const timestamp = now.getTime() - i * intervalMs
      const date = new Date(timestamp)
      
      const volatility = getCryptoVolatility(symbol)
      const variation = (Math.random() - 0.5) * volatility * basePrice
      const price = Math.max(0.01, basePrice + variation)
      
      basePrice = price // Continuité du prix
      
      const point: CryptoChartData = {
        timestamp,
        time: formatTimeForTimeframe(date, timeFrame),
        price: parseFloat(price.toFixed(8)),
        volume: Math.floor(Math.random() * 5000000 + 1000000),
        // Indicateurs techniques - calculés après avoir ajouté le point temporaire
        ma7: 0,
        ma25: 0,
        rsi: 50,
        volatility: volatility * 100
      }

      // Créer un point temporaire pour les calculs d'indicateurs
      const tempPoint = { ...point }
      
      // Calculer les indicateurs avec les données existantes plus le nouveau point
      point.ma7 = calculateMA([...data.slice(-6), tempPoint], 7)
      point.ma25 = calculateMA([...data.slice(-24), tempPoint], 25)
      point.rsi = calculateRSI([...data.slice(-13), tempPoint], 14)
      
      data.push(point)
    }
    
    return data
  }

  const getCryptoBasePrice = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      'BTCUSDT': 103600,
      'ETHUSDT': 2428,
      'BNBUSDT': 641,
      'ADAUSDT': 0.35,
      'SOLUSDT': 141,
      'XRPUSDT': 0.52,
      'DOGEUSDT': 0.08,
      'MATICUSDT': 0.75,
      'LTCUSDT': 85,
      'AVAXUSDT': 26
    }
    return prices[symbol] || 100
  }

  const getCryptoVolatility = (symbol: string): number => {
    const volatilities: { [key: string]: number } = {
      'BTCUSDT': 0.02,
      'ETHUSDT': 0.025,
      'BNBUSDT': 0.03,
      'ADAUSDT': 0.04,
      'SOLUSDT': 0.045,
      'XRPUSDT': 0.05,
      'DOGEUSDT': 0.08,
      'MATICUSDT': 0.06,
      'LTCUSDT': 0.03,
      'AVAXUSDT': 0.055
    }
    return volatilities[symbol] || 0.03
  }

  const getIntervalMs = (timeFrame: string): number => {
    const intervals: { [key: string]: number } = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000,
      '4h': 14400000,
      '1d': 86400000
    }
    return intervals[timeFrame] || 3600000
  }

  const formatTimeForTimeframe = (date: Date, timeFrame: string): string => {
    if (timeFrame === '1d') {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    }
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const calculateMA = (data: any[], period: number): number => {
    if (data.length < period) return 0
    const sum = data.slice(-period).reduce((acc, item) => acc + item.price, 0)
    return parseFloat((sum / period).toFixed(8))
  }

  const calculateRSI = (data: any[], period: number): number => {
    if (data.length < period + 1) return 50
    
    let gains = 0
    let losses = 0
    
    for (let i = 1; i <= period; i++) {
      const change = data[data.length - i].price - data[data.length - i - 1].price
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
          <p className="text-slate-300 text-sm mb-2 font-medium">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Prix:</span>
              <span className="text-white font-medium">${data.price}</span>
            </div>
            {showVolume && (
              <div className="flex justify-between">
                <span className="text-slate-400">Volume:</span>
                <span className="text-blue-400 font-medium">{(data.volume / 1000000).toFixed(1)}M</span>
              </div>
            )}
            {data.ma7 && (
              <div className="flex justify-between">
                <span className="text-slate-400">MA7:</span>
                <span className="text-yellow-400 font-medium">${data.ma7}</span>
              </div>
            )}
            {data.rsi && (
              <div className="flex justify-between">
                <span className="text-slate-400">RSI:</span>
                <span className="text-purple-400 font-medium">{data.rsi}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    if (chartType === 'area') {
      return (
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${walletName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={walletColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={walletColor} stopOpacity={0}/>
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
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={walletColor}
            strokeWidth={2}
            fill={`url(#gradient-${walletName})`}
            fillOpacity={0.3}
          />
          
          {activeIndicators.includes('ma7') && (
            <Line 
              type="monotone" 
              dataKey="ma7" 
              stroke="#F59E0B" 
              strokeWidth={1}
              dot={false}
              strokeDasharray="3 3"
            />
          )}
          {activeIndicators.includes('ma25') && (
            <Line 
              type="monotone" 
              dataKey="ma25" 
              stroke="#EF4444" 
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
          )}
        </ComposedChart>
      )
    }

    if (chartType === 'volume') {
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
          
          <Bar 
            dataKey="volume" 
            fill={`${walletColor}60`}
            fillOpacity={0.6}
          />
          
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={walletColor} 
            strokeWidth={2}
            dot={false}
            yAxisId="price"
          />
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
          dataKey="price" 
          stroke={walletColor} 
          strokeWidth={2}
          dot={false}
        />
        
        {activeIndicators.includes('ma7') && (
          <Line 
            type="monotone" 
            dataKey="ma7" 
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
          <Activity className="w-8 h-8" style={{ color: walletColor }} />
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
                ${currentPrice.toFixed(getCryptoBasePrice(symbol) > 1 ? 2 : 8)}
              </span>
              <div className={`flex items-center space-x-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Indicateur de connexion */}
            <div className="flex items-center space-x-1">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className="text-xs text-slate-400">
                {lastUpdate.toLocaleTimeString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        {/* Contrôles du graphique */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Type de graphique */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            {['line', 'area', 'volume'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type as ChartType)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  chartType === type 
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: chartType === type ? walletColor : 'transparent'
                }}
              >
                {type === 'line' ? 'Ligne' : 
                 type === 'area' ? 'Zone' : 'Volume'}
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
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: timeFrame === tf ? walletColor : 'transparent'
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicateurs */}
          <div className="flex space-x-2">
            {[
              { id: 'ma7', label: 'MA7', color: '#F59E0B' },
              { id: 'ma25', label: 'MA25', color: '#EF4444' },
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

      {/* Métriques en temps réel */}
      <div className="p-3 border-t border-slate-700 bg-slate-800/30">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-slate-400">Volume 24h</div>
            <div className="text-sm font-medium text-white">
              {((chartData[chartData.length - 1]?.volume || 0) / 1000000).toFixed(1)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">RSI</div>
            <div className={`text-sm font-medium ${
              (chartData[chartData.length - 1]?.rsi || 50) > 70 ? 'text-red-400' :
              (chartData[chartData.length - 1]?.rsi || 50) < 30 ? 'text-green-400' :
              'text-yellow-400'
            }`}>
              {chartData[chartData.length - 1]?.rsi?.toFixed(0) || '--'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">MA7</div>
            <div className="text-sm font-medium text-yellow-400">
              ${chartData[chartData.length - 1]?.ma7?.toFixed(getCryptoBasePrice(symbol) > 1 ? 2 : 6) || '--'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Volatilité</div>
            <div className="text-sm font-medium" style={{ color: walletColor }}>
              {(getCryptoVolatility(symbol) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptimizedCryptoChart
