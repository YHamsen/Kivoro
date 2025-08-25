import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Target,
  Calendar,
  Award
} from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

interface PortfolioStatsProps {
  totalValue: number
  totalChange: number
  totalChangePercentage: number
  bestPerformer: { symbol: string; change: number }
  worstPerformer: { symbol: string; change: number }
  assetsCount: number
  balanceVisible: boolean
  className?: string
}

const PortfolioStats: React.FC<PortfolioStatsProps> = ({
  totalValue,
  totalChange,
  totalChangePercentage,
  bestPerformer,
  worstPerformer,
  assetsCount,
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

  const stats = [
    {
      id: 'total-value',
      title: 'Valeur Totale',
      value: balanceVisible ? formatCurrency(totalValue) : '••••••',
      icon: DollarSign,
      color: 'text-[#F7931A]',
      bgColor: 'bg-[#F7931A]/10'
    },
    {
      id: 'daily-change',
      title: 'Variation 24h',
      value: balanceVisible 
        ? `${totalChangePercentage >= 0 ? '+' : ''}${totalChangePercentage.toFixed(2)}%`
        : '••••',
      subValue: balanceVisible ? formatCurrency(totalChange) : '••••',
      icon: totalChangePercentage >= 0 ? TrendingUp : TrendingDown,
      color: totalChangePercentage >= 0 ? 'text-green-500' : 'text-red-500',
      bgColor: totalChangePercentage >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
    },
    {
      id: 'assets-count',
      title: 'Actifs Détenus',
      value: `${assetsCount}`,
      subValue: 'Types d\'actifs',
      icon: PieChart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'best-performer',
      title: 'Meilleure Performance',
      value: balanceVisible ? `+${bestPerformer.change.toFixed(2)}%` : '••••',
      subValue: bestPerformer.symbol,
      icon: Award,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${stat.bgColor} border-gray-800 p-4`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {stat.title}
                    </p>
                    <p className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    {stat.subValue && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.subValue}
                      </p>
                    )}
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[#F7931A]" />
            <h3 className="font-semibold">Performance Détaillée</h3>
          </div>
          
          <div className="space-y-4">
            {/* Best Performer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Meilleur Actif</p>
                  <p className="text-xs text-gray-400">{bestPerformer.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">
                  {balanceVisible ? `+${bestPerformer.change.toFixed(2)}%` : '••••'}
                </p>
                <Progress value={Math.min(bestPerformer.change * 10, 100)} className="w-16 h-2 mt-1" />
              </div>
            </div>

            {/* Worst Performer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Moins Performant</p>
                  <p className="text-xs text-gray-400">{worstPerformer.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-500">
                  {balanceVisible ? `${worstPerformer.change.toFixed(2)}%` : '••••'}
                </p>
                <Progress value={Math.abs(worstPerformer.change) * 10} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Portfolio Allocation Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Objectifs de Portfolio</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Diversification</span>
              <Badge variant="outline" className="text-green-500 border-green-500">
                Excellente
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Équilibre Risque</span>
              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                Modéré
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Performance Mensuelle</span>
              <Badge variant="outline" className="text-[#F7931A] border-[#F7931A]">
                +12.3%
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default PortfolioStats
