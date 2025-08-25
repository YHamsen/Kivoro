import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Brain, TrendingUp, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'

const QuickAccessSignals: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()

  const signalOptions = [
    {
      id: 'forex',
      title: 'Signaux Forex',
      subtitle: 'Paires de devises en temps réel',
      icon: BarChart3,
      route: '/forex-signals',
      gradient: 'from-blue-500 to-purple-600',
      iconColor: 'text-blue-400'
    },
    {
      id: 'crypto-ai',
      title: 'Crypto IA',
      subtitle: 'Analyses intelligentes crypto',
      icon: Brain,
      route: '/crypto-ai-signals',
      gradient: 'from-purple-500 to-pink-600',
      iconColor: 'text-purple-400'
    }
  ]

  return (
    <div className="px-4 py-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-[#F7931A]" />
        <h2 className="text-white font-semibold">Signaux de Trading</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {signalOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${option.gradient} p-1 rounded-xl cursor-pointer`}
            onClick={withHaptic(() => navigate(option.route), 'selection')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-[#1a1a1a] rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#2d2d2d] rounded-xl flex items-center justify-center">
                    <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{option.title}</h3>
                    <p className="text-gray-400 text-sm">{option.subtitle}</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">Actif</span>
                </div>
                <span className="text-gray-400 text-xs">Accès rapide →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default QuickAccessSignals
