import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import EnhancedSparkline from '../ui/EnhancedSparkline'

interface PerformanceData {
  period: string
  value: number
  change: number
  data: number[]
}

interface PerformanceChartProps {
  title: string
  data: PerformanceData[]
  currentValue: number
  balanceVisible: boolean
  className?: string
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  title,
  data,
  currentValue,
  balanceVisible,
  className = ''
}) => {
  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className={className}>
      <Card className="bg-[#1a1a1a] border-gray-800 p-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[#F7931A]" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        
        {/* Current Value */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-400 mb-1">Valeur Actuelle</p>
          <p className="text-2xl font-bold">
            {balanceVisible ? formatCurrency(currentValue) : '••••••'}
          </p>
        </div>

        {/* Performance Periods */}
        <div className="space-y-3 mb-6">
          {data.map((period, index) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  period.change >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {period.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{period.period}</p>
                  <p className="text-sm text-gray-400">
                    {balanceVisible ? formatCurrency(period.value) : '••••'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-16 h-8">
                  <EnhancedSparkline
                    data={period.data}
                    color={period.change >= 0 ? '#10b981' : '#ef4444'}
                    height={32}
                    strokeWidth={1.5}
                  />
                </div>
                <Badge 
                  variant={period.change >= 0 ? 'default' : 'destructive'}
                  className={`${
                    period.change >= 0 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}
                >
                  {balanceVisible ? formatPercentage(period.change) : '••••'}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="h-48 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Graphique de Performance</p>
            <p className="text-sm">Visualisation complète bientôt disponible</p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-4 p-3 bg-[#F7931A]/10 rounded-lg border border-[#F7931A]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Performance Globale</p>
              <p className="font-bold text-[#F7931A]">
                {balanceVisible ? 'Excellente' : '••••'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Depuis le début</p>
              <p className="font-bold text-green-500">
                {balanceVisible ? '+24.7%' : '••••'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PerformanceChart
