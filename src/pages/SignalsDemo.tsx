import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BarChart3, Brain, Star, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'
import QuickAccessSignals from '../components/QuickAccessSignals'

const SignalsDemo: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={withHaptic(() => navigate('/'), 'light')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </motion.button>
          <h1 className="text-lg font-semibold">Signaux de Trading</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-8">
        <div className="bg-gradient-to-br from-[#F7931A] to-[#FFA500] rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-white text-xl font-bold">Nouvelles Fonctionnalités</h2>
              <p className="text-white/80 text-sm">Accès aux signaux de trading avancés</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/20 rounded-lg p-3">
              <BarChart3 className="w-6 h-6 text-white mb-2" />
              <p className="text-white text-sm font-medium">Forex Signals</p>
              <p className="text-white/80 text-xs">Paires de devises</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <Brain className="w-6 h-6 text-white mb-2" />
              <p className="text-white text-sm font-medium">Crypto IA</p>
              <p className="text-white/80 text-xs">Analyses intelligentes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm">Disponible maintenant</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-6">
          <h3 className="text-white font-semibold">Fonctionnalités Incluses</h3>
          
          <div className="space-y-3">
            {[
              {
                title: 'Signaux Forex en Temps Réel',
                description: 'Analyses des paires de devises principales avec indicateurs de confiance',
                icon: '📈'
              },
              {
                title: 'Intelligence Artificielle Crypto',
                description: 'Prédictions IA basées sur l\'analyse de sentiment et technique',
                icon: '🤖'
              },
              {
                title: 'Interface de Chat Intégrée',
                description: 'Communication avec la communauté de traders',
                icon: '💬'
              },
              {
                title: 'Analyses Audio IA',
                description: 'Explications vocales des tendances et opportunités',
                icon: '🎧'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <QuickAccessSignals />

        {/* Footer Info */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mt-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Statut : Opérationnel</span>
          </div>
          <p className="text-gray-400 text-xs">
            Les sections Forex Signals et Crypto AI Signals sont maintenant disponibles
            avec toutes les fonctionnalités de trading avancées.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignalsDemo
