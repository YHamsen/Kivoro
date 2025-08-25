import React from 'react'
import { motion } from 'framer-motion'

interface P2PTopNavigationProps {
  mode: 'express' | 'p2p' | 'blockTrade'
  setMode: (mode: 'express' | 'p2p' | 'blockTrade') => void
}

const P2PTopNavigation: React.FC<P2PTopNavigationProps> = ({ mode, setMode }) => {
  return (
    <div className="flex bg-[#2d2d2d] rounded-lg p-1">
      <motion.button
        className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors ${
          mode === 'express'
            ? 'bg-[#F7931A] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setMode('express')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Express
      </motion.button>
      <motion.button
        className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors ${
          mode === 'p2p'
            ? 'bg-[#F7931A] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setMode('p2p')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        P2P
      </motion.button>
      <motion.button
        className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors ${
          mode === 'blockTrade'
            ? 'bg-[#F7931A] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setMode('blockTrade')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Block Trade
      </motion.button>
    </div>
  )
}

export default P2PTopNavigation
