/**
 * Version optimisée de QuickActionsGrid utilisant les constantes harmonisées
 * Exemple d'implémentation des bonnes pratiques d'harmonisation UI
 */

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
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'

// Import des constantes harmonisées
import { COLORS, TAILWIND_COLORS } from '../../constants/colors'
import { BUTTON_ANIMATIONS, ENTRANCE_ANIMATIONS } from '../../constants/animations'
import { INTERACTION_HAPTICS } from '../../constants/haptics'

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

const QuickActionsGridOptimized: React.FC<QuickActionsGridProps> = ({ 
  onAction, 
  className = '' 
}) => {
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
      color: TAILWIND_COLORS.textOrange, // Utilisation de la constante
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
    <div className={className}>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          
          return (
            <motion.div
              key={action.id}
              {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)} // Utilisation des constantes d'animation
            >
              <motion.div 
                className={`${action.bgColor} ${TAILWIND_COLORS.borderDefault} p-4 cursor-pointer transition-all rounded-lg border bg-card text-card-foreground shadow-sm`}
                onClick={withHaptic(
                  action.action, 
                  INTERACTION_HAPTICS.quickActionTrigger // Utilisation des constantes haptiques
                )}
                // Utilisation des animations standardisées
                whileHover={BUTTON_ANIMATIONS.hover}
                whileTap={BUTTON_ANIMATIONS.tap}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-black/20">
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
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActionsGridOptimized
