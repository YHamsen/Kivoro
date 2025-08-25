import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ComposedChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Bar,
  Cell
} from 'recharts'
import { 
  ArrowLeft,
  Star,
  MoreHorizontal,
  TrendingUp, 
  TrendingDown, 
  ChevronDown,
  ZoomIn,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'
import { alpacaForexService, OHLCVData } from '../../services/alpacaService'

interface EnhancedProfessionalChartProps {
  symbol: string
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

interface CandleData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  time: string
  isGreen: boolean
}

const EnhancedProfessionalChart: React.FC<EnhancedProfessionalChartProps> = ({ symbol, onOpenOrder }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('15m')
  const [candleData, setCandleData] = useState<CandleData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0)
  const [highPrice, setHighPrice] = useState<number>(0)
  const [lowPrice, setLowPrice] = useState<number>(0)
  const [sellPrice, setSellPrice] = useState<number>(0)
  const [buyPrice, setBuyPrice] = useState<number>(0)
  const [selectedTab, setSelectedTab] = useState('OVERVIEW')
  const intervalRef = useRef<NodeJS.Timeout>()

  const tabs = ['OVERVIEW', 'NEWS', 'ALERTS', 'INFO']
  const timeFrames = ['1m', '5m', '15m', '1h', '4h', '1d']

  // Symboles et noms d'affichage pour les différents actifs
  const getAssetDisplayName = (symbol: string) => {
    const assetNames: { [key: string]: string } = {
      'EUR/USD': 'Euro Dollar',
      'GBP/USD': 'British Pound',
      'USD/JPY': 'Japanese Yen',
      'AUD/USD': 'Australian Dollar',
      'USD/CAD': 'Canadian Dollar',
      'EURUSD': 'Euro Dollar',
      'GBPUSD': 'British Pound',
      'USDJPY': 'Japanese Yen',
      'AUDUSD': 'Australian Dollar',
      'USDCAD': 'Canadian Dollar'
    }
    return assetNames[symbol] || 'Wheat CFD'
  }

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
      // Utilisation des données Alpaca ou données de secours
      const historicalData = await alpacaForexService.getForexHistory(symbol, timeFrame, 80)
      const processedData = processCandleData(historicalData)
      setCandleData(processedData)
      
      if (processedData.length > 0) {
        const latest = processedData[processedData.length - 1]
        const previous = processedData[processedData.length - 2]
        
        setCurrentPrice(latest.close)
        const change = latest.close - (previous?.close || latest.close)
        setPriceChange(change)
        setPriceChangePercent((change / (previous?.close || latest.close)) * 100)
        
        // Calculer high/low sur les dernières 24h
        const last24h = processedData.slice(-24)
        setHighPrice(Math.max(...last24h.map(d => d.high)))
        setLowPrice(Math.min(...last24h.map(d => d.low)))
        
        // Simulation du spread bid/ask
        const spread = latest.close * 0.0002
        setSellPrice(latest.close - spread)
        setBuyPrice(latest.close + spread)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      // Charger des données de secours
      loadFallbackData()
    } finally {
      setLoading(false)
    }
  }

  const loadFallbackData = () => {
    const basePrice = 762.4 // Prix de base pour Wheat CFD
    const data: CandleData[] = []
    
    for (let i = 0; i < 80; i++) {
      const timestamp = Date.now() - (80 - i) * 15 * 60 * 1000 // 15 minutes par chandelier
      const open = basePrice + (Math.random() - 0.5) * 20
      const close = open + (Math.random() - 0.5) * 8
      const high = Math.max(open, close) + Math.random() * 5
      const low = Math.min(open, close) - Math.random() * 5
      
      data.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume: Math.random() * 100000,
        time: new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isGreen: close > open
      })
    }
    
    setCandleData(data)
    if (data.length > 0) {
      const latest = data[data.length - 1]
      setCurrentPrice(latest.close)
      setPriceChange(20.5)
      setPriceChangePercent(2.76)
      setHighPrice(784.0)
      setLowPrice(742.1)
      setSellPrice(762.1)
      setBuyPrice(762.7)
    }
  }

  const processCandleData = (rawData: OHLCVData[]): CandleData[] => {
    return rawData.map(item => ({
      timestamp: item.timestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      time: new Date(item.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isGreen: item.close > item.open
    }))
  }

  const startRealTimeUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      updateRealTimePrice()
    }, 3000)
  }

  const updateRealTimePrice = () => {
    setCandleData(prevData => {
      if (prevData.length === 0) return prevData

      const lastCandle = prevData[prevData.length - 1]
      const priceChange = (Math.random() - 0.5) * lastCandle.close * 0.001
      const newPrice = Math.max(0, lastCandle.close + priceChange)
      
      setCurrentPrice(newPrice)
      
      const newData = [...prevData]
      
      // Mettre à jour le dernier chandelier ou en créer un nouveau
      if (Date.now() - lastCandle.timestamp < 15 * 60 * 1000) { // 15 minutes
        newData[newData.length - 1] = {
          ...lastCandle,
          close: newPrice,
          high: Math.max(lastCandle.high, newPrice),
          low: Math.min(lastCandle.low, newPrice),
          isGreen: newPrice > lastCandle.open
        }
      } else {
        newData.push({
          timestamp: Date.now(),
          open: lastCandle.close,
          high: newPrice,
          low: newPrice,
          close: newPrice,
          volume: Math.random() * 100000,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          isGreen: newPrice > lastCandle.close
        })
        
        if (newData.length > 80) {
          newData.shift()
        }
      }

      return newData
    })
  }

  // Composant personnalisé pour les chandeliers
  const CandleStick = (props: any) => {
    const { payload, x, y, width, height } = props
    if (!payload) return null

    const { open, high, low, close, isGreen } = payload
    const color = isGreen ? '#34C759' : '#FF3B30'
    
    const maxPrice = Math.max(...candleData.map(d => d.high))
    const minPrice = Math.min(...candleData.map(d => d.low))
    const priceRange = maxPrice - minPrice
    
    if (priceRange === 0) return null
    
    const bodyTop = ((maxPrice - Math.max(open, close)) / priceRange) * height
    const bodyBottom = ((maxPrice - Math.min(open, close)) / priceRange) * height
    const wickTop = ((maxPrice - high) / priceRange) * height
    const wickBottom = ((maxPrice - low) / priceRange) * height
    
    return (
      <g>
        {/* Mèche */}
        <line
          x1={x + width / 2}
          y1={y + wickTop}
          x2={x + width / 2}
          y2={y + wickBottom}
          stroke={color}
          strokeWidth="1"
        />
        {/* Corps du chandelier */}
        <rect
          x={x + width * 0.2}
          y={y + bodyTop}
          width={width * 0.6}
          height={Math.max(1, bodyBottom - bodyTop)}
          fill={color}
        />
      </g>
    )
  }

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-[#34C759] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Chargement du graphique...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
          <h1 className="text-lg font-semibold">{getAssetDisplayName(symbol)}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Star className="w-5 h-5 text-gray-400" />
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Prix et statistiques */}
      <div className="p-4 border-b border-gray-800">
        {/* Barre Sell/Buy */}
        <div className="flex items-center justify-center mb-4 bg-[#2C2C2E] rounded-lg p-3">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <span className="text-xs text-gray-400">Sell</span>
              <p className="text-sm font-bold text-white">{sellPrice.toFixed(1)}</p>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="text-center">
              <span className="text-xs text-gray-400">Buy</span>
              <p className="text-sm font-bold text-white">{buyPrice.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex space-x-6 mb-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                selectedTab === tab
                  ? 'text-white border-[#34C759]'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Statistiques de prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-4 h-4 text-[#34C759]" />
              <span className="text-sm font-bold text-[#34C759]">
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}pts
              </span>
            </div>
            <span className="text-sm font-bold text-[#34C759]">
              {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>High {highPrice.toFixed(1)}</span>
            <span>Low {lowPrice.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Sélecteur de timeframe */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-[#2C2C2E] rounded-lg px-3 py-1.5">
          <span className="text-sm text-white">{timeFrame} minutes</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <ZoomIn className="w-5 h-5 text-gray-400" />
      </div>

      {/* Graphique */}
      <div className="flex-1 p-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={candleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#303030" />
            <XAxis 
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              domain={['dataMin - 5', 'dataMax + 5']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              orientation="right"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2C2C2E',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value, name) => [
                typeof value === 'number' ? value.toFixed(2) : value,
                name
              ]}
            />
            <Bar 
              dataKey="close" 
              fill="#34C759"
              shape={(props: any) => <CandleStick {...props} />}
            >
              {candleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isGreen ? '#34C759' : '#FF3B30'} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Ligne de prix actuel */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="bg-[#FF3B30] px-2 py-1 rounded text-xs font-bold text-white">
            {currentPrice.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedProfessionalChart
