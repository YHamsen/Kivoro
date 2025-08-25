import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, FileText, MessageSquare, User } from 'lucide-react'

const P2PBottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('p2p')

  const navigationItems = [
    {
      id: 'p2p',
      label: 'P2P',
      icon: ArrowUpDown,
      isActive: true
    },
    {
      id: 'orders',
      label: 'Ordres',
      icon: FileText,
      isActive: false
    },
    {
      id: 'ads',
      label: 'Annonces',
      icon: MessageSquare,
      isActive: false
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      isActive: false
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 px-4 py-2">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-[#F7931A]' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                className={`w-5 h-5 ${isActive ? 'text-[#F7931A]' : 'text-gray-400'}`} 
              />
              <span className={`text-xs font-medium ${
                isActive ? 'text-[#F7931A]' : 'text-gray-400'
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

export default P2PBottomNavigation
