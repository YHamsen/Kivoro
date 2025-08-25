import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  BarChart3,
  Target,
  Clock,
  Award,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface PortfolioStat {
  id: string
  title: string
  value: string
  change: string
  changePercent: string
  icon: React.ElementType
  color: string
  bgColor: string
}

interface AssetPortfolioStatsProps {
  showBalance: boolean
  className?: string
}

const AssetPortfolioStats: React.FC<AssetPortfolioStatsProps> = ({ 
  showBalance, 
  className = '' 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const { withHaptic } = useHapticFeedback()

  const periods = [
    { id: '24h', label: '24h' },
    { id: '7d', label: '7j' },
    { id: '30d', label: '30j' },
    { id: '1y', label: '1an' }
  ]

  const portfolioStats: PortfolioStat[] = [
    {
      id: 'total-profit',
      title: 'Profit Total',
      value: '€1,847.92',
      change: '+€234.12',
      changePercent: '+14.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'best-performer',
      title: 'Meilleur Actif',
      value: 'AAPL',
      change: '+€127.89',
      changePercent: '+28.4%',
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'diversification',
      title: 'Diversification',
      value: '12 Actifs',
      change: '+2 ce mois',
      changePercent: '+20%',
      icon: PieChart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'win-rate',
      title: 'Taux de Réussite',
      value: '73.2%',
      change: '+2.1%',
      changePercent: '+2.9%',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  const assetAllocation = [
    { name: 'Crypto', percentage: 45, value: '€5,056.34', color: '#F7931A' },
    { name: 'Actions', percentage: 30, value: '€3,371.19', color: '#22c55e' },
    { name: 'Forex', percentage: 15, value: '€1,685.59', color: '#3b82f6' },
    { name: 'Liquidités', percentage: 10, value: '€1,123.73', color: '#8b5cf6' }
  ]

  const recentPerformance = [
    { period: 'Aujourd\'hui', value: '+€47.82', percent: '+0.42%', positive: true },
    { period: 'Cette semaine', value: '+€234.67', percent: '+2.13%', positive: true },
    { period: 'Ce mois', value: '+€567.89', percent: '+5.34%', positive: true },
    { period: 'Cette année', value: '+€1,847.92', percent: '+19.7%', positive: true }
  ]

  return (
    <div className={className}>
      {/* Portfolio Overview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Analyse du Portefeuille</h3>
        
        {/* Period Selector */}
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800 mb-4">
          {periods.map((period) => (
            <motion.button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {period.label}
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {portfolioStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${stat.bgColor} border border-gray-800 p-3`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <IconComponent className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-xs text-gray-400">{stat.title}</span>
                      </div>
                      <div className={`text-lg font-bold ${stat.color}`}>
                        {showBalance ? stat.value : '••••••'}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className={`text-xs ${stat.color}`}>
                          {showBalance ? stat.change : '••••'}
                        </span>
                        <span className={`text-xs ${stat.color}`}>
                          {showBalance ? stat.changePercent : '••••'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="mb-6">
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <h4 className="text-md font-semibold text-white mb-4">Répartition des Actifs</h4>
          
          <div className="space-y-3">
            {assetAllocation.map((asset, index) => (
              <motion.div
                key={asset.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="text-sm text-white">{asset.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {showBalance ? asset.value : '••••••'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {asset.percentage}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Allocation Bar */}
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full flex">
              {assetAllocation.map((asset, index) => (
                <motion.div
                  key={asset.name}
                  className="h-full"
                  style={{ 
                    backgroundColor: asset.color,
                    width: `${asset.percentage}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${asset.percentage}%` }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Performance History */}
      <div className="mb-6">
        <Card className="bg-[#1a1a1a] border-gray-800 p-4">
          <h4 className="text-md font-semibold text-white mb-4">Performances Récentes</h4>
          
          <div className="space-y-3">
            {recentPerformance.map((perf, index) => (
              <motion.div
                key={perf.period}
                className="flex items-center justify-between py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-sm text-gray-400">{perf.period}</span>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    perf.positive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {showBalance ? perf.value : '••••••'}
                  </div>
                  <div className={`text-xs ${
                    perf.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {showBalance ? perf.percent : '••••'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Insights */}
      <div>
        <Card className="bg-gradient-to-br from-[#F7931A]/10 to-[#FFA500]/5 border-[#F7931A]/20 p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#F7931A]/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#F7931A]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[#F7931A] mb-1">
                Insight du Jour
              </h4>
              <p className="text-xs text-gray-300">
                Votre portefeuille surperforme le marché de +3.2% cette semaine. 
                Excellente diversification avec 73% de trades gagnants.
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">
                  Mis à jour il y a 5 minutes
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AssetPortfolioStats
