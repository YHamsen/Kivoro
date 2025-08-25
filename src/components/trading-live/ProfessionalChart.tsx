import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
  Calendar
} from 'lucide-react'
import { alpacaForexService, OHLCVData } from '../../services/alpacaService'

interface ProfessionalChartProps {
  symbol: string
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

type ChartType = 'line' | 'area' | 'candle' | 'volume'
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

interface ChartData {
  timestamp: number
  price: number
  volume: number
  open?: number
  high?: number
  low?: number
  close?: number
  ma20?: number
  ma50?: number
  rsi?: number
}

const ProfessionalChart: React.FC<ProfessionalChartProps> = ({ symbol, onOpenOrder }) => {
  const [chartType, setChartType] = useState<ChartType>('line')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1h')
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [showIndicators, setShowIndicators] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Charger les données du graphique
  useEffect(() => {
    loadChartData()
    startRealTimeUpdates()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [symbol, timeFrame])

  const loadChartData = async () => {
    setLoading(true)
    try {
      const historicalData = await alpacaForexService.getForexHistory(symbol, timeFrame, 100)
      const processedData = processChartData(historicalData)
      setChartData(processedData)
      
      if (processedData.length > 0) {
        const latest = processedData[processedData.length - 1]
        const previous = processedData[processedData.length - 2]
        setCurrentPrice(latest.price)
        setPriceChange(latest.price - (previous?.price || latest.price))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const startRealTimeUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      updateRealTimePrice()
    }, 5000) // Mise à jour toutes les 5 secondes
  }

  const updateRealTimePrice = () => {
    setChartData(prevData => {
      if (prevData.length === 0) return prevData

      const lastPoint = prevData[prevData.length - 1]
      const priceChange = (Math.random() - 0.5) * lastPoint.price * 0.001 // ±0.1% max
      const newPrice = Math.max(0, lastPoint.price + priceChange)
      
      setCurrentPrice(newPrice)
      setPriceChange(priceChange)

      // Mettre à jour le dernier point ou ajouter un nouveau point
      const newData = [...prevData]
      if (Date.now() - lastPoint.timestamp < 60000) {
        // Mettre à jour le dernier point si moins d'1 minute
        newData[newData.length - 1] = {
          ...lastPoint,
          price: newPrice,
          close: newPrice,
          high: Math.max(lastPoint.high || newPrice, newPrice),
          low: Math.min(lastPoint.low || newPrice, newPrice)
        }
      } else {
        // Ajouter un nouveau point
        newData.push({
          timestamp: Date.now(),
          price: newPrice,
          volume: Math.random() * 100000,
          open: lastPoint.price,
          high: newPrice,
          low: newPrice,
          close: newPrice
        })
        
        // Garder seulement les 100 derniers points
        if (newData.length > 100) {
          newData.shift()
        }
      }

      return newData
    })
  }

  const processChartData = (rawData: OHLCVData[]): ChartData[] => {
    const data = rawData.map(item => ({
      timestamp: item.timestamp,
      price: item.close,
      volume: item.volume,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close
    }))

    // Ajouter les moyennes mobiles si les indicateurs sont activés
    if (showIndicators) {
      return addTechnicalIndicators(data)
    }

    return data
  }

  const addTechnicalIndicators = (data: ChartData[]): ChartData[] => {
    return data.map((item, index) => {
      const ma20 = calculateMovingAverage(data, index, 20)
      const ma50 = calculateMovingAverage(data, index, 50)
      const rsi = calculateRSI(data, index, 14)

      return {
        ...item,
        ma20,
        ma50,
        rsi
      }
    })
  }

  const calculateMovingAverage = (data: ChartData[], index: number, period: number): number | undefined => {
    if (index < period - 1) return undefined
    
    const slice = data.slice(index - period + 1, index + 1)
    const sum = slice.reduce((acc, item) => acc + item.price, 0)
    return sum / period
  }

  const calculateRSI = (data: ChartData[], index: number, period: number): number | undefined => {
    if (index < period) return undefined
    
    let gains = 0
    let losses = 0
    
    for (let i = index - period + 1; i <= index; i++) {
      const change = data[i].price - data[i - 1].price
      if (change > 0) {
        gains += change
      } else {
        losses -= change
      }
    }
    
    const avgGain = gains / period
    const avgLoss = losses / period
    
    if (avgLoss === 0) return 100
    
    const rs = avgGain / avgLoss
    return 100 - (100 / (1 + rs))
  }

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem)
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatPrice = (value: number) => {
    return value.toFixed(5)
  }

  const formatTooltip = (value: any, name: string) => {
    if (name === 'volume') {
      return [new Intl.NumberFormat('fr-FR').format(value), 'Volume']
    }
    return [formatPrice(value), name === 'price' ? 'Prix' : name]
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-2">
            {new Date(label).toLocaleString('fr-FR')}
          </p>
          <div className="space-y-1">
            {data.open && (
              <p className="text-blue-400 text-sm">
                Ouverture: {formatPrice(data.open)}
              </p>
            )}
            {data.high && (
              <p className="text-green-400 text-sm">
                Haut: {formatPrice(data.high)}
              </p>
            )}
            {data.low && (
              <p className="text-red-400 text-sm">
                Bas: {formatPrice(data.low)}
              </p>
            )}
            <p className="text-white text-sm font-semibold">
              Prix: {formatPrice(data.price)}
            </p>
            {data.volume && (
              <p className="text-gray-400 text-sm">
                Volume: {new Intl.NumberFormat('fr-FR').format(data.volume)}
              </p>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={formatPrice}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#2196F3"
              strokeWidth={2}
              fill="url(#priceGradient)"
              connectNulls
            />
            {showIndicators && (
              <>
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#f39c12"
                  strokeWidth={1}
                  dot={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="ma50"
                  stroke="#e74c3c"
                  strokeWidth={1}
                  dot={false}
                  connectNulls
                />
              </>
            )}
          </AreaChart>
        )
      
      case 'volume':
        return (
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              yAxisId="price"
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={formatPrice}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              yAxisId="volume"
              orientation="right"
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#2196F3"
              strokeWidth={2}
              dot={false}
            />
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#666"
              opacity={0.3}
            />
          </ComposedChart>
        )
      
      default:
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tickFormatter={formatPrice}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2196F3"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            {showIndicators && (
              <>
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#f39c12"
                  strokeWidth={1}
                  dot={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="ma50"
                  stroke="#e74c3c"
                  strokeWidth={1}
                  dot={false}
                  connectNulls
                />
              </>
            )}
          </LineChart>
        )
    }
  }

  const getPriceChangeColor = () => {
    return priceChange >= 0 ? 'text-green-500' : 'text-red-500'
  }

  const getPriceChangeIcon = () => {
    return priceChange >= 0 ? TrendingUp : TrendingDown
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-[#0a0a0a] text-white p-4">
      {/* En-tête avec prix et contrôles */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">{symbol}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{formatPrice(currentPrice)}</span>
            <div className={`flex items-center space-x-1 ${getPriceChangeColor()}`}>
              {React.createElement(getPriceChangeIcon(), { className: "w-4 h-4" })}
              <span className="text-sm">
                {priceChange >= 0 ? '+' : ''}{formatPrice(priceChange)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Sélecteur de période */}
          <div className="flex bg-[#1a1a1a] rounded-lg p-1">
            {(['1m', '5m', '15m', '1h', '4h', '1d', '1w'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFrame(tf)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  timeFrame === tf 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Contrôles du graphique */}
          <div className="flex bg-[#1a1a1a] rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded transition-colors ${
                chartType === 'line' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded transition-colors ${
                chartType === 'area' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`p-2 rounded transition-colors ${
                chartType === 'volume' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowIndicators(!showIndicators)}
            className={`p-2 rounded transition-colors ${
              showIndicators ? 'bg-blue-600' : 'bg-[#1a1a1a] hover:bg-gray-700'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Graphique principal */}
      <div className="h-96 bg-[#1a1a1a] rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Boutons de trading */}
      <div className="flex space-x-4 mt-4">
        <motion.button
          onClick={() => onOpenOrder('sell', symbol)}
          className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          VENDRE {formatPrice(currentPrice)}
        </motion.button>
        <motion.button
          onClick={() => onOpenOrder('buy', symbol)}
          className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ACHETER {formatPrice(currentPrice)}
        </motion.button>
      </div>

      {/* Légende des indicateurs */}
      {showIndicators && (
        <div className="flex items-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-[#f39c12]"></div>
            <span className="text-gray-400">MA20</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-[#e74c3c]"></div>
            <span className="text-gray-400">MA50</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessionalChart
