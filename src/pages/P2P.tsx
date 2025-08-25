import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import P2PTopNavigation from '../components/p2p/P2PTopNavigation'
import P2PFilters from '../components/p2p/P2PFilters'
import P2POffersList from '../components/p2p/P2POffersList'
import P2PBottomNavigation from '../components/p2p/P2PBottomNavigation'
import P2PBanner from '../components/p2p/P2PBanner'
import P2PExpress from '../components/p2p/P2PExpress'

export type P2PMode = 'express' | 'p2p' | 'blockTrade'
export type TransactionType = 'buy' | 'sell'
export type PaymentMethod = 'all' | 'revolut' | 'sepa' | 'bank' | 'wise' | 'western'

interface P2PFilters {
  crypto: string
  fiatCurrency: string
  amount: string
  paymentMethod: PaymentMethod
}

const P2P: React.FC = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<P2PMode>('p2p')
  const [transactionType, setTransactionType] = useState<TransactionType>('buy')
  const [filters, setFilters] = useState<P2PFilters>({
    crypto: 'USDT',
    fiatCurrency: 'EUR',
    amount: '',
    paymentMethod: 'all'
  })

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header avec bouton retour et navigation principale */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">P2P Trading</h1>
          <div className="w-5 h-5" />
        </div>

        {/* Navigation P2P (Express, P2P, Block Trade) */}
        <P2PTopNavigation mode={mode} setMode={setMode} />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 pb-20">
        {/* Bannière promotionnelle (seulement pour P2P) */}
        {mode === 'p2p' && <P2PBanner />}

        {/* Contenu conditionnel selon le mode */}
        {mode === 'express' ? (
          <>
            {/* Navigation Buy/Sell pour Express */}
            <div className="px-4 mb-4">
              <div className="flex bg-[#2d2d2d] rounded-lg p-1">
                <motion.button
                  className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'buy'
                      ? 'bg-[#22c55e] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTransactionType('buy')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Acheter
                </motion.button>
                <motion.button
                  className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'sell'
                      ? 'bg-[#ef4444] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTransactionType('sell')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Vendre
                </motion.button>
              </div>
            </div>
            <P2PExpress transactionType={transactionType} />
          </>
        ) : mode === 'p2p' ? (
          <>
            {/* Navigation Buy/Sell pour P2P */}
            <div className="px-4 mb-4">
              <div className="flex bg-[#2d2d2d] rounded-lg p-1">
                <motion.button
                  className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'buy'
                      ? 'bg-[#22c55e] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTransactionType('buy')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Acheter
                </motion.button>
                <motion.button
                  className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors ${
                    transactionType === 'sell'
                      ? 'bg-[#ef4444] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTransactionType('sell')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Vendre
                </motion.button>
              </div>
            </div>

            {/* Filtres */}
            <P2PFilters 
              filters={filters} 
              setFilters={setFilters}
              transactionType={transactionType}
            />

            {/* Liste des offres */}
            <P2POffersList 
              transactionType={transactionType}
              filters={filters}
              mode={mode}
            />
          </>
        ) : (
          /* Block Trade */
          <div className="px-4 py-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Block Trade</h3>
            <p className="text-gray-400 mb-6">
              Négociez de gros volumes avec des contreparties institutionnelles
            </p>
            <motion.button
              className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contacter un gestionnaire
            </motion.button>
          </div>
        )}
      </div>

      {/* Navigation du bas */}
      <P2PBottomNavigation />
    </div>
  )
}

export default P2P
