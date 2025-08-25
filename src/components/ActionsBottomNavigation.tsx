import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Star, Wallet, PieChart, Plus } from 'lucide-react'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface ActionsBottomNavigationProps {
  onQuickBuy?: () => void
  onWatchlist?: () => void
  onHoldings?: () => void
  onDividends?: () => void
}

const ActionsBottomNavigation: React.FC<ActionsBottomNavigationProps> = ({
  onQuickBuy,
  onWatchlist,
  onHoldings,
  onDividends
}) => {
  const { withHaptic } = useHapticFeedback()

  const handleQuickBuy = withHaptic(() => {
    if (onQuickBuy) {
      onQuickBuy()
    } else {
      toast.success('Quick Buy feature activated!')
    }
  }, 'heavy')

  const handleWatchlist = withHaptic(() => {
    if (onWatchlist) {
      onWatchlist()
    } else {
      toast.success('Navigating to Watchlist...')
    }
  }, 'medium')

  const handleHoldings = withHaptic(() => {
    if (onHoldings) {
      onHoldings()
    } else {
      toast.success('Navigating to Holdings...')
    }
  }, 'medium')

  const handleDividends = withHaptic(() => {
    if (onDividends) {
      onDividends()
    } else {
      toast.success('Navigating to Dividends...')
    }
  }, 'medium')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Background with curved shape */}
      <div className="relative h-24 pointer-events-auto">
        {/* Semi-circular background */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24"
          viewBox="0 0 375 96"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="navGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.98" />
            </linearGradient>
            <filter id="navShadow">
              <feDropShadow dx="0" dy="-4" stdDeviation="8" floodColor="#00D4AA" floodOpacity="0.1"/>
            </filter>
          </defs>
          <path
            d="M0 96 L0 48 Q0 24 24 24 L151 24 Q167.5 24 175 12 Q182.5 0 190 0 Q197.5 0 205 12 Q212.5 24 229 24 L351 24 Q375 24 375 48 L375 96 Z"
            fill="url(#navGradient)"
            filter="url(#navShadow)"
            stroke="#333"
            strokeWidth="0.5"
          />
        </svg>

        {/* Navigation Items */}
        <div className="absolute bottom-0 left-0 right-0 h-24 flex items-center justify-between px-8 pb-4">
          {/* Left Side - Watchlist */}
          <motion.button
            onClick={handleWatchlist}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#F7931A] to-[#e8851a] rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-300 font-medium">Watchlist</span>
          </motion.button>

          {/* Left Center - Holdings */}
          <motion.button
            onClick={handleHoldings}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-300 font-medium">Holdings</span>
          </motion.button>

          {/* Center - Main Buy Button */}
          <motion.button
            onClick={handleQuickBuy}
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 0 }}
            animate={{ y: -8 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00D4AA] rounded-full blur-xl opacity-30 scale-110" />
            
            {/* Main button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-[#00D4AA] to-[#00B893] rounded-full flex items-center justify-center shadow-2xl border-4 border-[#0a0a0a]">
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              
              {/* Icon */}
              <TrendingUp className="w-8 h-8 text-white relative z-10" />
            </div>
            
            {/* Label */}
            <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-[#00D4AA] font-bold whitespace-nowrap">
              Quick Buy
            </span>
          </motion.button>

          {/* Right Center - Dividends */}
          <motion.button
            onClick={handleDividends}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-300 font-medium">Dividends</span>
          </motion.button>

          {/* Right Side - More Actions */}
          <motion.button
            onClick={withHaptic(() => toast.success('More actions coming soon!'), 'light')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-300 font-medium">More</span>
          </motion.button>
        </div>

        {/* Floating action indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className="w-1.5 h-1.5 bg-[#00D4AA] rounded-full opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: dot * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActionsBottomNavigation
