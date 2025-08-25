import React from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Minus, 
  ArrowUpDown, 
  TrendingUp, 
  Bell, 
  PieChart,
  BarChart3,
  RefreshCw,
  DollarSign,
  Bitcoin,
  CreditCard
} from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  action: () => void
}

interface QuickActionsGridProps {
  onAction?: (actionId: string) => void
  className?: string
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ onAction, className = '' }) => {
  const { withHaptic } = useHapticFeedback()

  const quickActions: QuickAction[] = [
    {
      id: 'buy',
      title: 'Acheter',
      description: 'Acheter des cryptos',
      icon: Plus,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 hover:bg-green-500/20',
      action: () => onAction?.('buy')
    },
    {
      id: 'sell',
      title: 'Vendre',
      description: 'Vendre des actifs',
      icon: Minus,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10 hover:bg-red-500/20',
      action: () => onAction?.('sell')
    },
    {
      id: 'convert',
      title: 'Convertir',
      description: 'Échanger des devises',
      icon: ArrowUpDown,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
      action: () => onAction?.('convert')
    },
    {
      id: 'trade',
      title: 'Trading',
      description: 'Trading avancé',
      icon: TrendingUp,
      color: 'text-[#F7931A]',
      bgColor: 'bg-[#F7931A]/10 hover:bg-[#F7931A]/20',
      action: () => onAction?.('trade')
    },
    {
      id: 'alerts',
      title: 'Alertes',
      description: 'Configurer alertes',
      icon: Bell,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
      action: () => onAction?.('alerts')
    },
    {
      id: 'portfolio',
      title: 'Analyse',
      description: 'Analyser portfolio',
      icon: PieChart,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 hover:bg-cyan-500/20',
      action: () => onAction?.('portfolio')
    }
  ]

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`${action.bgColor} border-gray-800 p-4 cursor-pointer transition-all hover:scale-105 active:scale-95`}
                onClick={withHaptic(action.action, 'selection')}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`p-3 rounded-full bg-black/20`}>
                    <IconComponent className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${action.color}`}>
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActionsGrid
