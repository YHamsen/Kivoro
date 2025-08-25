import React from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Minus, 
  ArrowUpDown, 
  Send,
  Download,
  Upload,
  RefreshCw,
  Zap
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
  borderColor: string
  action: () => void
}

interface QuickActionsAssetsProps {
  onAction?: (actionId: string) => void
  className?: string
}

const QuickActionsAssets: React.FC<QuickActionsAssetsProps> = ({ 
  onAction, 
  className = '' 
}) => {
  const { withHaptic } = useHapticFeedback()

  const quickActions: QuickAction[] = [
    {
      id: 'deposit',
      title: 'Dépôt',
      description: 'Ajouter des fonds',
      icon: Plus,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      action: () => onAction?.('deposit')
    },
    {
      id: 'withdraw',
      title: 'Retrait',
      description: 'Retirer des fonds',
      icon: Minus,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      action: () => onAction?.('withdraw')
    },
    {
      id: 'transfer',
      title: 'Transfert',
      description: 'Envoyer à un ami',
      icon: Send,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      action: () => onAction?.('transfer')
    },
    {
      id: 'convert',
      title: 'Convertir',
      description: 'Échanger devises',
      icon: ArrowUpDown,
      color: 'text-[#F7931A]',
      bgColor: 'bg-[#F7931A]/10',
      borderColor: 'border-[#F7931A]/20',
      action: () => onAction?.('convert')
    }
  ]

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`${action.bgColor} ${action.borderColor} border cursor-pointer transition-all p-4 min-h-[100px] flex flex-col items-center justify-center text-center space-y-2 hover:shadow-lg`}
                onClick={withHaptic(action.action, 'selection')}
              >
                <div className={`p-3 rounded-full bg-black/10 ${action.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${action.color}`}>
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Quick Actions Row */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {/* Express Transfer */}
        <motion.div
          className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction?.('express-transfer')}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-500">Transfert Express</h4>
              <p className="text-xs text-gray-400">Instantané</p>
            </div>
          </div>
        </motion.div>

        {/* Recurring Payments */}
        <motion.div
          className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction?.('recurring-payments')}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <RefreshCw className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-cyan-500">Paiements Récurrents</h4>
              <p className="text-xs text-gray-400">Automatiser</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction Shortcuts */}
      <div className="mt-4 bg-[#1a1a1a] border border-gray-800 rounded-lg p-3">
        <h3 className="text-sm font-semibold text-white mb-3">Raccourcis</h3>
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            className="p-2 bg-[#2a2a2a] rounded-lg text-xs text-gray-300 hover:bg-[#3a3a3a] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction?.('quick-deposit-50')}
          >
            +€50
          </motion.button>
          <motion.button
            className="p-2 bg-[#2a2a2a] rounded-lg text-xs text-gray-300 hover:bg-[#3a3a3a] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction?.('quick-deposit-100')}
          >
            +€100
          </motion.button>
          <motion.button
            className="p-2 bg-[#2a2a2a] rounded-lg text-xs text-gray-300 hover:bg-[#3a3a3a] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction?.('quick-deposit-500')}
          >
            +€500
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default QuickActionsAssets
