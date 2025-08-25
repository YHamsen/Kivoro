import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TradingBottomNavigation from '../components/trading-live/TradingBottomNavigation'
import OptimizedMarketWatch from '../components/trading-live/OptimizedMarketWatch'
import TradingCharts from '../components/trading-live/TradingCharts'
import TradingPositions from '../components/trading-live/TradingPositions'
import TradingHistory from '../components/trading-live/TradingHistory'
import TradingNews from '../components/trading-live/TradingNews'
import OrderPlacement from '../components/trading-live/OrderPlacement'

export type TradingSection = 'quotes' | 'charts' | 'positions' | 'history' | 'news'

const TradingLive: React.FC = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<TradingSection>('quotes')
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')

  const handleBack = () => {
    navigate('/')
  }

  const openOrderModal = (type: 'buy' | 'sell', symbol?: string) => {
    setOrderType(type)
    if (symbol) setSelectedSymbol(symbol)
    setShowOrderModal(true)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'quotes':
        return (
          <OptimizedMarketWatch 
            onSymbolSelect={setSelectedSymbol}
            onOpenOrder={openOrderModal}
          />
        )
      case 'charts':
        return (
          <TradingCharts 
            symbol={selectedSymbol}
            onOpenOrder={openOrderModal}
          />
        )
      case 'positions':
        return <TradingPositions />
      case 'history':
        return <TradingHistory />
      case 'news':
        return <TradingNews />
      default:
        return <OptimizedMarketWatch onSymbolSelect={setSelectedSymbol} onOpenOrder={openOrderModal} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col">
      {/* Header amélioré */}
      <div className="bg-slate-900/80 backdrop-blur-sm px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleBack}
            className="flex items-center text-slate-400 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Trading Live
            </h1>
          </div>
          
          <div className="w-5 h-5" />
        </div>
      </div>

      {/* Contenu principal avec fond amélioré */}
      <div className="flex-1 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-transparent pointer-events-none"></div>
        {renderContent()}
      </div>

      {/* Modal de placement d'ordre avec backdrop amélioré */}
      {showOrderModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
        >
          <OrderPlacement
            symbol={selectedSymbol}
            orderType={orderType}
            onClose={() => setShowOrderModal(false)}
            onOrderPlaced={(orderData) => {
              console.log('Order placed:', orderData)
              setShowOrderModal(false)
            }}
          />
        </motion.div>
      )}

      {/* Navigation du bas avec style amélioré */}
      <div className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50">
        <TradingBottomNavigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  )
}

export default TradingLive
