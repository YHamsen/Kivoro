import React from 'react'
import { motion } from 'framer-motion'
import { Award, ChevronRight } from 'lucide-react'

const P2PBanner: React.FC = () => {
  return (
    <motion.div 
      className="mx-4 my-4 bg-gradient-to-r from-[#F7931A] to-[#FFA500] rounded-xl p-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-16 h-16 bg-white rounded-full opacity-20" />
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-white rounded-full opacity-20" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Récompenses de Parrainage P2P</h3>
            <p className="text-white text-opacity-90 text-xs">Gagnez jusqu'à 13K USDT en parrainant</p>
          </div>
        </div>
        
        <motion.button
          className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white text-xs font-medium">S'inscrire</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* Indicateurs de carrousel */}
      <div className="flex justify-center mt-3 space-x-1">
        <div className="w-2 h-2 bg-white rounded-full opacity-60" />
        <div className="w-2 h-2 bg-white rounded-full" />
        <div className="w-2 h-2 bg-white rounded-full opacity-60" />
      </div>
    </motion.div>
  )
}

export default P2PBanner
