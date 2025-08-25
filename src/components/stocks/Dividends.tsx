import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, TrendingUp, Info } from 'lucide-react'
import { alpacaApi, Dividend } from '../../services/alpacaApi'

interface DividendsProps {
  refreshTrigger?: number
}

const Dividends: React.FC<DividendsProps> = ({ refreshTrigger }) => {
  const [dividends, setDividends] = useState<Dividend[]>([])
  const [loading, setLoading] = useState(true)
  const [totalEarned, setTotalEarned] = useState(0)

  useEffect(() => {
    loadDividends()
  }, [refreshTrigger])

  const loadDividends = async () => {
    try {
      setLoading(true)
      const dividendData = await alpacaApi.getDividends()
      setDividends(dividendData)
      
      // Calculate total earned
      const total = dividendData.reduce((sum, dividend) => sum + dividend.amount, 0)
      setTotalEarned(total)
    } catch (error) {
      console.error('Failed to load dividends:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-4">EARN DIVIDENDS</h3>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse">
          <div className="space-y-3">
            <div className="w-32 h-4 bg-gray-700 rounded"></div>
            <div className="w-24 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h3 className="text-white text-lg font-semibold mb-4">EARN DIVIDENDS</h3>
      
      {dividends.length > 0 ? (
        <div className="space-y-3">
          {/* Total earned summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#00D4AA]/10 to-[#00B893]/10 border border-[#00D4AA]/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#00D4AA]/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Total des dividendes</h4>
                  <p className="text-gray-400 text-xs">Cette année</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#00D4AA] font-bold text-lg">
                  {formatCurrency(totalEarned)}
                </p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-[#00D4AA]" />
                  <span className="text-[#00D4AA] text-xs">+15.2%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dividend history */}
          {dividends.map((dividend, index) => (
            <motion.div
              key={`${dividend.symbol}-${dividend.ex_date}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {dividend.symbol.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{dividend.symbol}</h4>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-xs">
                        Payé le {formatDate(dividend.pay_date)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-[#00D4AA] font-medium text-sm">
                    {formatCurrency(dividend.amount)}
                  </p>
                  <p className="text-gray-400 text-xs">par action</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-[#2d2d2d] rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-gray-400" />
          </div>
          <h4 className="text-white font-medium text-sm mb-2">Aucun dividende reçu</h4>
          <p className="text-gray-400 text-xs mb-4">
            Investissez dans des actions versant des dividendes pour commencer à gagner des revenus passifs
          </p>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-blue-400 text-xs font-medium">Bon à savoir</p>
                <p className="text-gray-300 text-xs mt-1">
                  Les dividendes sont des paiements réguliers effectués par les entreprises à leurs actionnaires, généralement trimestriellement.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Dividends
