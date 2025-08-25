import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, BarChart3, TrendingUp, Users, Wallet, PiggyBank } from 'lucide-react'
import useHapticFeedback from '../hooks/useHapticFeedback'

const BottomNavigation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home, path: '/' },
    { id: 'markets', label: 'Marchés', icon: BarChart3, path: '/markets' },
    { id: 'trade', label: 'Trading', icon: TrendingUp, path: '/trade' },
    { id: 'earn', label: 'Gains', icon: PiggyBank, path: '/earn' },
    { id: 'assets', label: 'Actifs', icon: Wallet, path: '/assets' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.path)
          
          return (
            <motion.button
              key={item.id}
              onClick={withHaptic(() => navigate(item.path), 'selection')}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                active 
                  ? 'text-[#F7931A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`relative ${active ? 'text-[#F7931A]' : ''}`}>
                <IconComponent className="w-6 h-6" />
                {active && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-[#F7931A] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                active ? 'text-[#F7931A]' : 'text-gray-400'
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

export default BottomNavigation
