import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Briefcase, 
  History, 
  Newspaper,
  MessageCircle
} from 'lucide-react'

interface TradingBottomNavigationProps {
  activeSection: 'quotes' | 'charts' | 'positions' | 'history' | 'news'
  setActiveSection: (section: 'quotes' | 'charts' | 'positions' | 'history' | 'news') => void
}

const TradingBottomNavigation: React.FC<TradingBottomNavigationProps> = ({
  activeSection,
  setActiveSection
}) => {
  const navigationItems = [
    {
      id: 'quotes' as const,
      label: 'Cotations',
      icon: BarChart3
    },
    {
      id: 'charts' as const,
      label: 'Graphiques',
      icon: TrendingUp
    },
    {
      id: 'positions' as const,
      label: 'Positions',
      icon: Briefcase
    },
    {
      id: 'history' as const,
      label: 'Historique',
      icon: History
    },
    {
      id: 'news' as const,
      label: 'Actualités',
      icon: Newspaper
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <motion.button
              key={item.id}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-[#2196F3]' : 'text-gray-400'
              }`}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                className={`w-5 h-5 ${isActive ? 'text-[#2196F3]' : 'text-gray-400'}`} 
              />
              <span className={`text-xs font-medium ${
                isActive ? 'text-[#2196F3]' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default TradingBottomNavigation
