import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { alpacaForexStocksApi } from '../../services/alpacaForexStocksApi'

interface ChartData {
  time: string
  price: number
  volume: number
}

interface EnhancedStockChartProps {
  symbol: string
  color: string
  height?: number
  interval?: '1m' | '5m' | '15m' | '1h' | '1d'
}

const EnhancedStockChart: React.FC<EnhancedStockChartProps> = ({ 
  symbol, 
  color, 
  height = 200,
  interval = '5m'
}) => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [change, setChange] = useState<number>(0)
  const [changePercent, setChangePercent] = useState<number>(0)

  useEffect(() => {
    loadChartData()
    const interval_ms = getIntervalMs(interval)
    const timer = setInterval(loadChartData, interval_ms)
    return () => clearInterval(timer)
  }, [symbol, interval])

  const getIntervalMs = (interval: string): number => {
    switch (interval) {
      case '1m': return 60000
      case '5m': return 300000
      case '15m': return 900000
      case '1h': return 3600000
      case '1d': return 86400000
      default: return 300000
    }
  }

  const loadChartData = async () => {
    try {
      setLoading(true)
      
      // Simuler des données de graphique en temps réel
      const now = new Date()
      const data: ChartData[] = []
      
      // Générer 50 points de données avec variation réaliste
      let basePrice = 100 + Math.random() * 400 // Prix de base entre 100-500$
      
      for (let i = 49; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * getIntervalMs(interval))
        const variation = (Math.random() - 0.5) * 5 // Variation de ±2.5%
        basePrice = Math.max(10, basePrice + variation)
        
        data.push({
          time: timestamp.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: parseFloat(basePrice.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000)
        })
      }
      
      setChartData(data)
      
      if (data.length > 1) {
        const latest = data[data.length - 1]
        const previous = data[data.length - 2]
        setCurrentPrice(latest.price)
        setChange(latest.price - previous.price)
        setChangePercent(((latest.price - previous.price) / previous.price) * 100)
      }
      
    } catch (error) {
      console.error('Erreur chargement données graphique:', error)
    } finally {
      setLoading(false)
    }
  }

  const isPositive = change >= 0

  const formatTooltipContent = (value: any, name: string) => {
    if (name === 'price') {
      return [`$${value}`, 'Prix']
    }
    return [value, name]
  }

  const chartConfig = useMemo(() => ({
    strokeWidth: 2,
    stroke: color,
    fill: `url(#gradient-${symbol})`,
    dot: false,
    activeDot: { 
      r: 4, 
      fill: color,
      stroke: '#ffffff',
      strokeWidth: 2
    }
  }), [color, symbol])

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <RefreshCw className="w-6 h-6 animate-spin" style={{ color }} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* En-tête avec prix et variation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h4 className="text-lg font-bold text-white">{symbol}</h4>
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-400">Temps réel</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
            <span>({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      {/* Graphique */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                <stop offset="100%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <YAxis 
              domain={['dataMin - 1', 'dataMax + 1']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff'
              }}
              formatter={formatTooltipContent}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              {...chartConfig}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Intervalles de temps */}
      <div className="flex space-x-2">
        {['1m', '5m', '15m', '1h', '1d'].map((int) => (
          <motion.button
            key={int}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()} // Simulation de changement d'intervalle
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              int === interval 
                ? 'text-white border border-current' 
                : 'text-slate-400 hover:text-white'
            }`}
            style={int === interval ? { borderColor: color, color } : {}}
          >
            {int}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default EnhancedStockChart
