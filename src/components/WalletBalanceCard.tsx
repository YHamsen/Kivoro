import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { UnifiedBalance, WalletType, WALLET_COLORS, WALLET_NAMES, WALLET_LOGOS } from '../services/multiWalletService'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface WalletBalanceCardProps {
  wallet: WalletType
  balances: UnifiedBalance[]
  totalValue: number
  onClick?: () => void
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ 
  wallet, 
  balances, 
  totalValue, 
  onClick 
}) => {
  const { withHaptic } = useHapticFeedback()
  
  const walletColor = WALLET_COLORS[wallet]
  const walletName = WALLET_NAMES[wallet]
  const walletLogo = WALLET_LOGOS[wallet]
  
  // Asset principal (celui avec la plus grande valeur)
  const mainAsset = balances.sort((a, b) => parseFloat(b.usdValue) - parseFloat(a.usdValue))[0]
  
  // Nombre total d'assets
  const assetsCount = balances.length
  
  // Assets avec valeur significative (> $1)
  const significantAssets = balances.filter(b => parseFloat(b.usdValue) > 1)

  const handleClick = withHaptic(() => {
    onClick?.()
  }, 'light')

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl`}
      style={{ 
        borderColor: `${walletColor}20`,
        boxShadow: `0 0 20px ${walletColor}10`
      }}
    >
      {/* En-tête avec logo et nom du wallet */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center p-2"
            style={{ backgroundColor: `${walletColor}20` }}
          >
            <img 
              src={walletLogo} 
              alt={`${walletName} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback en cas d'erreur de chargement d'image
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <Wallet 
              className="w-8 h-8 hidden" 
              style={{ color: walletColor }}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{walletName}</h3>
            <p className="text-slate-400 text-sm">{assetsCount} actifs</p>
          </div>
        </div>
        
        {/* Indicateur de statut */}
        <div 
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: walletColor }}
        />
      </div>

      {/* Valeur totale */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-white mb-1">
          ${totalValue.toLocaleString('fr-FR', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
        <div className="flex items-center space-x-2">
          <span 
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: `${walletColor}20`,
              color: walletColor 
            }}
          >
            {significantAssets.length} actifs significatifs
          </span>
        </div>
      </div>

      {/* Asset principal */}
      {mainAsset && (
        <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{mainAsset.coin}</div>
              <div className="text-slate-400 text-sm">Asset principal</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">
                ${parseFloat(mainAsset.usdValue).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-slate-400 text-sm">{mainAsset.balance}</div>
            </div>
          </div>
        </div>
      )}

      {/* Preview des autres assets */}
      {significantAssets.length > 1 && (
        <div className="space-y-2">
          <div className="text-slate-400 text-sm font-medium">Autres assets</div>
          <div className="flex flex-wrap gap-1">
            {significantAssets.slice(1, 4).map((asset) => (
              <span
                key={asset.coin}
                className="bg-slate-800/50 text-slate-300 text-xs px-2 py-1 rounded-full border border-slate-600"
              >
                {asset.coin}
              </span>
            ))}
            {significantAssets.length > 4 && (
              <span className="bg-slate-800/50 text-slate-400 text-xs px-2 py-1 rounded-full border border-slate-600">
                +{significantAssets.length - 4} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Barre de progression de la valeur relative */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Contribution au portfolio</span>
          <span>{((totalValue / (totalValue + 1)) * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((totalValue / Math.max(totalValue, 1000)) * 100, 100)}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-2 rounded-full"
            style={{ backgroundColor: walletColor }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default WalletBalanceCard
