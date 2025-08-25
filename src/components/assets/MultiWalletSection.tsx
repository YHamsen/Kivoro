import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Wallet,
  Building2,
  Globe,
  Zap,
  Shield,
  Clock,
  Activity,
  Star,
  AlertCircle
} from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface WalletData {
  id: string
  name: string
  displayName: string
  balance: string
  balanceUSD: string
  change24h: string
  changePercent: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  status: 'active' | 'maintenance' | 'coming-soon'
  features: string[]
  description: string
}

interface MultiWalletSectionProps {
  selectedTab: 'account' | 'asset'
  showBalance: boolean
  onAction?: (actionId: string) => void
  className?: string
}

const MultiWalletSection: React.FC<MultiWalletSectionProps> = ({ 
  selectedTab, 
  showBalance, 
  onAction, 
  className = '' 
}) => {
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null)
  const { withHaptic } = useHapticFeedback()
  const navigate = useNavigate()

  const wallets: WalletData[] = [
    {
      id: 'alpaca',
      name: 'Alpaca',
      displayName: 'Alpaca Trading',
      balance: '€5,247.83',
      balanceUSD: '$5,698.42',
      change24h: '+€127.34',
      changePercent: '+2.48%',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      status: 'active',
      features: ['Forex', 'Actions', 'Trading Live'],
      description: 'Trading Forex et Actions US'
    },
    {
      id: 'bybit',
      name: 'Bybit',
      displayName: 'Bybit Exchange',
      balance: '€2,834.67',
      balanceUSD: '$3,076.28',
      change24h: '+€67.89',
      changePercent: '+2.45%',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      status: 'active',
      features: ['Crypto', 'Futures', 'Options'],
      description: 'Exchange crypto professionnel'
    },
    {
      id: 'okx',
      name: 'OKX',
      displayName: 'OKX Exchange',
      balance: '€1,456.92',
      balanceUSD: '$1,581.24',
      change24h: '+€34.12',
      changePercent: '+2.39%',
      icon: BarChart3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      status: 'active',
      features: ['Crypto', 'DeFi', 'NFT'],
      description: 'Plateforme crypto complète'
    },
    {
      id: 'binance',
      name: 'Binance',
      displayName: 'Binance Exchange',
      balance: '€1,897.45',
      balanceUSD: '$2,059.78',
      change24h: '+€45.23',
      changePercent: '+2.44%',
      icon: Building2,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20',
      status: 'active',
      features: ['Crypto', 'Staking', 'Launchpad'],
      description: 'Plus grand exchange crypto mondial'
    },
    {
      id: 'bank-card',
      name: 'Carte Bancaire',
      displayName: 'Carte Bancaire',
      balance: '€2,847.50',
      balanceUSD: '$3,092.14',
      change24h: '+€0.00',
      changePercent: '0.00%',
      icon: Wallet,
      color: 'text-gray-400',
      bgColor: 'bg-gray-400/10',
      borderColor: 'border-gray-400/20',
      status: 'coming-soon',
      features: ['Paiements', 'Retraits', 'Contactless'],
      description: 'Carte bancaire intégrée (bientôt)'
    }
  ]

  const handleWalletClick = (walletId: string) => {
    // Navigation spéciale pour Bybit vers l'interface Spot
    if (walletId === 'bybit') {
      withHaptic(() => {
        navigate('/bybit-spot')
        onAction?.(`wallet-${walletId}`)
      }, 'selection')()
      return
    }
    
    // Navigation spéciale pour OKX vers l'interface Spot
    if (walletId === 'okx') {
      withHaptic(() => {
        navigate('/okx-spot')
        onAction?.(`wallet-${walletId}`)
      }, 'selection')()
      return
    }
    
    // Navigation spéciale pour Binance vers l'interface Spot
    if (walletId === 'binance') {
      withHaptic(() => {
        navigate('/binance-spot')
        onAction?.(`wallet-${walletId}`)
      }, 'selection')()
      return
    }
    
    if (expandedWallet === walletId) {
      setExpandedWallet(null)
    } else {
      setExpandedWallet(walletId)
      onAction?.(`wallet-${walletId}`)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      case 'maintenance':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'coming-soon':
        return <Clock className="w-4 h-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'maintenance':
        return 'Maintenance'
      case 'coming-soon':
        return 'Bientôt'
      default:
        return ''
    }
  }

  if (selectedTab === 'account') {
    return (
      <div className={className}>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Comptes</h3>
          <div className="text-sm text-gray-400">
            Gérez vos comptes et portefeuilles connectés
          </div>
          
          {/* Account Management Cards */}
          <div className="space-y-3">
            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div>
                    <h4 className="font-medium text-white">Sécurité des Comptes</h4>
                    <p className="text-sm text-gray-400">Tous les comptes sécurisés</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-white">Connexions API</h4>
                    <p className="text-sm text-gray-400">{wallets.filter(w => w.status === 'active').length} exchanges connectés</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Portefeuilles</h3>
          <span className="text-sm text-gray-400">
            {wallets.filter(w => w.status === 'active').length} actifs
          </span>
        </div>

        {wallets.map((wallet, index) => {
          const IconComponent = wallet.icon
          const isExpanded = expandedWallet === wallet.id
          const isPositive = wallet.changePercent.startsWith('+')
          
          return (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`${wallet.bgColor} ${wallet.borderColor} border transition-all duration-200 ${
                  wallet.status === 'coming-soon' ? 'opacity-60' : 'cursor-pointer hover:scale-[1.02]'
                }`}
                onClick={() => wallet.status !== 'coming-soon' && withHaptic(() => handleWalletClick(wallet.id), 'selection')()}
              >
                <div className="p-4">
                  {/* Main Wallet Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${wallet.bgColor} border ${wallet.borderColor}`}>
                        <IconComponent className={`w-5 h-5 ${wallet.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-semibold ${wallet.color}`}>
                            {wallet.displayName}
                          </h4>
                          {getStatusIcon(wallet.status)}
                        </div>
                        <p className="text-xs text-gray-400">
                          {wallet.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${wallet.color}`}>
                        {showBalance ? wallet.balance : '••••••'}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${
                          isPositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {showBalance ? wallet.changePercent : '••••'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {getStatusText(wallet.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      {/* Features */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {wallet.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-black/20 rounded text-xs text-gray-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-400">USD</div>
                          <div className="text-sm text-white">
                            {showBalance ? wallet.balanceUSD : '••••••'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">24h</div>
                          <div className={`text-sm ${
                            isPositive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {showBalance ? wallet.change24h : '••••••'}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {wallet.status === 'active' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className={`flex-1 ${wallet.bgColor} ${wallet.color} border ${wallet.borderColor}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onAction?.(`${wallet.id}-trade`)
                            }}
                          >
                            Trading
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gray-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              onAction?.(`${wallet.id}-details`)
                            }}
                          >
                            Détails
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )
        })}

        {/* Add New Wallet */}
        <motion.div
          className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-[#F7931A] hover:bg-[#F7931A]/5 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction?.('add-wallet')}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 bg-gray-600/20 rounded-lg">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">
                Connecter un Exchange
              </h4>
              <p className="text-xs text-gray-500">
                Ajouter un nouveau portefeuille
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MultiWalletSection
