import React from 'react'
import { motion } from 'framer-motion'
import { User, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'
import NotificationCenter from './NotificationCenter'

interface TopNavigationProps {
  activeTab: 'crypto' | 'forex' | 'actions' | 'p2p'
  setActiveTab: (tab: 'crypto' | 'forex' | 'actions' | 'p2p') => void
}

const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, setActiveTab }) => {
  const { withHaptic } = useHapticFeedback()
  const navigate = useNavigate()

  const handleTabClick = (tab: 'crypto' | 'forex' | 'actions' | 'p2p') => {
    if (tab === 'p2p') {
      navigate('/p2p')
    } else {
      setActiveTab(tab)
    }
  }
  return (
    <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
      <div className="flex items-center justify-between mb-4">
        {/* Logo/Avatar */}
        <motion.button
          className="flex items-center space-x-3 hover:bg-gray-800 rounded-lg p-2 transition-colors"
          onClick={withHaptic(() => navigate('/profile'), 'selection')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[#F7931A] to-[#FFA500] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm text-gray-400">Kivoro</span>
        </motion.button>

        {/* Right Icons */}
        <div className="flex items-center space-x-2">
          <NotificationCenter />
          <motion.button
            onClick={withHaptic(() => navigate('/notifications'), 'light')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </motion.button>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="grid grid-cols-4 bg-[#2d2d2d] rounded-lg p-1 gap-1">
        <motion.button
          className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'crypto'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={withHaptic(() => handleTabClick('crypto'), 'selection')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Crypto
        </motion.button>
        <motion.button
          className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'forex'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={withHaptic(() => handleTabClick('forex'), 'selection')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Forex
        </motion.button>
        <motion.button
          className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'actions'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={withHaptic(() => handleTabClick('actions'), 'selection')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Actions
        </motion.button>
        <motion.button
          className={`py-2 px-2 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'p2p'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={withHaptic(() => handleTabClick('p2p'), 'selection')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          P2P
        </motion.button>
      </div>
    </div>
  )
}

export default TopNavigation
