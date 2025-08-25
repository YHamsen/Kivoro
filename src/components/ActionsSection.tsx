import React, { useState } from 'react'
import { motion } from 'framer-motion'
import StockSearch from './stocks/StockSearch'
import Watchlist from './stocks/Watchlist'
import BuyShares from './stocks/BuyShares'
import Holdings from './stocks/Holdings'
import Dividends from './stocks/Dividends'
import SellAnytime from './stocks/SellAnytime'
import KivoroBalanceCard from './KivoroBalanceCard'
import { alpacaApi, Position } from '../services/alpacaApi'
import toast from 'react-hot-toast'

const ActionsSection: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddToWatchlist = async (symbol: string) => {
    try {
      await alpacaApi.addToWatchlist(symbol)
      toast.success(`${symbol} ajouté à votre watchlist`)
      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      toast.error('Échec de l\'ajout à la watchlist')
    }
  }

  const handleStockSelect = (symbol: string) => {
    // In a real app, this would navigate to stock details page
    toast.success(`Voir les détails de ${symbol}`)
  }

  const handleBuyComplete = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleSellStock = (symbol: string, position: Position) => {
    // In a real app, this would open a sell modal with position details
    toast.success(`Préparer la vente de ${symbol}`)
  }

  const handleSellComplete = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="px-4 py-4 bg-[#0a0a0a] flex-1 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-24"
      >
        {/* Kivoro Balance Card */}
        <KivoroBalanceCard refreshTrigger={refreshTrigger} />
        
        {/* Stock Search */}
        <StockSearch onAddToWatchlist={handleAddToWatchlist} />
        
        {/* Watchlist */}
        <Watchlist 
          onStockSelect={handleStockSelect}
          refreshTrigger={refreshTrigger}
        />
        
        {/* Buy Shares */}
        <BuyShares onBuyComplete={handleBuyComplete} />
        
        {/* Holdings */}
        <Holdings 
          onSellStock={handleSellStock}
          refreshTrigger={refreshTrigger}
        />
        
        {/* Dividends */}
        <Dividends refreshTrigger={refreshTrigger} />
        
        {/* Sell Anytime */}
        <SellAnytime 
          refreshTrigger={refreshTrigger}
          onSellComplete={handleSellComplete}
        />
      </motion.div>
    </div>
  )
}

export default ActionsSection
