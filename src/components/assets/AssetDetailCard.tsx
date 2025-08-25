import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, MoreVertical, Eye, EyeOff } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import EnhancedSparkline from '../ui/EnhancedSparkline'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface Asset {
  id: string
  symbol: string
  name: string
  icon: string
  amount: number
  value: number
  change24h: number
  percentage: number
  sparklineData: number[]
  type: 'crypto' | 'stock' | 'forex'
}

interface AssetDetailCardProps {
  asset: Asset
  balanceVisible: boolean
  onTrade?: (asset: Asset) => void
  onDetails?: (asset: Asset) => void
  className?: string
}

const AssetDetailCard: React.FC<AssetDetailCardProps> = ({ 
  asset, 
  balanceVisible, 
  onTrade, 
  onDetails,
  className = ''
}) => {
  const { withHaptic } = useHapticFeedback()

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'stock': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'forex': return 'bg-green-500/10 text-green-500 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'crypto': return 'Crypto'
      case 'stock': return 'Action'
      case 'forex': return 'Forex'
      default: return type.toUpperCase()
    }
  }

  return (
    <motion.div
      className={`${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-[#1a1a1a] border-gray-800 p-4 hover:border-[#F7931A]/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] rounded-full flex items-center justify-center text-lg shadow-lg">
              {asset.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white">{asset.symbol}</h3>
                <Badge className={`text-xs ${getTypeColor(asset.type)}`}>
                  {getTypeLabel(asset.type)}
                </Badge>
              </div>
              <p className="text-sm text-gray-400">{asset.name}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2a2a2a] border-gray-700 text-white">
              <DropdownMenuItem 
                onClick={() => onTrade?.(asset)}
                className="hover:bg-[#3a3a3a]"
              >
                Trader
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDetails?.(asset)}
                className="hover:bg-[#3a3a3a]"
              >
                Détails
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3a3a3a]">
                Alertes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Quantité</p>
            <p className="font-medium">
              {balanceVisible ? `${asset.amount} ${asset.symbol}` : '••••••'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Valeur</p>
            <p className="font-bold">
              {balanceVisible ? formatCurrency(asset.value) : '••••••'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className={`flex items-center gap-2 ${
            asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {asset.change24h >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium text-sm">
              {balanceVisible ? `${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%` : '••••'}
            </span>
          </div>
          
          <div className="text-right text-xs text-gray-500">
            <p>Allocation: {balanceVisible ? `${asset.percentage.toFixed(1)}%` : '••••'}</p>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-12 mb-3">
          <EnhancedSparkline 
            data={asset.sparklineData} 
            color={asset.change24h >= 0 ? '#10b981' : '#ef4444'}
            height={48}
            strokeWidth={2}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[#F7931A] hover:bg-[#F7931A]/90 text-black"
            onClick={withHaptic(() => onTrade?.(asset), 'selection')}
          >
            Acheter
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 border-gray-700 hover:bg-gray-800"
            onClick={withHaptic(() => onTrade?.(asset), 'selection')}
          >
            Vendre
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default AssetDetailCard
