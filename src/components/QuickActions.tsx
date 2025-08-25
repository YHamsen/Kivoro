import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Download, 
  ShoppingCart, 
  Wallet, 
  Brain, 
  GraduationCap, 
  Gamepad2, 
  MoreHorizontal,
  Cpu,
  TrendingUp
} from 'lucide-react'
import useHapticFeedback from '../hooks/useHapticFeedback'
import { useNavigate } from 'react-router-dom'
import BuyOptionsModal from './modals/BuyOptionsModal'

interface QuickActionsProps {
  activeTab: 'exchange' | 'forex'
}

const QuickActions: React.FC<QuickActionsProps> = ({ activeTab }) => {
  const { withHaptic } = useHapticFeedback()
  const navigate = useNavigate()
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  
  const cryptoActions = [
    { icon: Users, label: 'P2P Trading', color: '#F7931A', action: 'p2p' },
    { icon: Download, label: 'Deposit', color: '#4CAF50', action: 'deposit' },
    { icon: ShoppingCart, label: 'Buy Crypto', color: '#2196F3', action: 'buy-crypto' },
    { icon: Wallet, label: 'Wallet', color: '#FF9800', action: 'wallet' },
    { icon: Cpu, label: 'Buy eSIM', color: '#FFD700', action: 'esim' },
    { icon: Brain, label: 'AI Signals', color: '#9C27B0', action: 'ai-signals' },
    { icon: GraduationCap, label: 'Formation', color: '#00BCD4', action: 'formation' },
    { icon: MoreHorizontal, label: 'More', color: '#607D8B', action: 'more' }
  ]

  const forexActions = [
    { icon: Users, label: 'P2P Trading', color: '#F7931A', action: 'p2p' },
    { icon: Download, label: 'Deposit', color: '#4CAF50', action: 'deposit' },
    { icon: TrendingUp, label: 'Trading Live', color: '#2196F3', action: 'trading-live' },
    { icon: Wallet, label: 'Wallet', color: '#FF9800', action: 'wallet' },
    { icon: Brain, label: 'Forex Signals', color: '#9C27B0', action: 'forex-signals' },
    { icon: GraduationCap, label: 'Forex Course', color: '#00BCD4', action: 'forex-course' },
    { icon: Gamepad2, label: 'Demo Trading', color: '#E91E63', action: 'demo-trading' },
    { icon: MoreHorizontal, label: 'More', color: '#607D8B', action: 'more' }
  ]

  const actions = activeTab === 'exchange' ? cryptoActions : forexActions

  const handleActionClick = (action: string) => {
    console.log(`Clicked ${action}`)
    
    switch (action) {
      case 'esim':
        navigate('/esim/countries')
        break
      case 'wallet':
        navigate('/wallet')
        break
      case 'p2p':
        navigate('/p2p')
        break
      case 'trading-live':
        navigate('/trading-live')
        break
      case 'buy-crypto':
        // Ouvrir le modal d'options d'achat
        setIsBuyModalOpen(true)
        break
      case 'deposit':
        // Ouvrir le modal d'options d'achat (incluant les dépôts)
        setIsBuyModalOpen(true)
        break
      case 'ai-signals':
        navigate('/crypto-ai-signals')
        break
      case 'forex-signals':
        navigate('/forex-signals')
        break
      case 'formation':
        // Page de formation (peut être ajoutée plus tard)
        console.log('Formation page - to be implemented')
        break
      case 'forex-course':
        navigate('/forex-course')
        break
      case 'demo-trading':
        // Page de demo trading (peut être ajoutée plus tard)
        console.log('Demo trading page - to be implemented')
        break
      case 'more':
        // Page more options (peut être ajoutée plus tard)
        console.log('More options page - to be implemented')
        break
      // Add more action handlers as needed
      default:
        console.log(`No handler for action: ${action}`)
    }
  }

  return (
    <>
      <div className="px-4 py-4 bg-[#0a0a0a]">
        <div className="grid grid-cols-4 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <motion.button
                key={index}
                onClick={withHaptic(() => handleActionClick(action.action), 'light')}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex flex-col items-center space-y-2 hover:border-[#F7931A]/50 transition-all duration-200"
                whileHover={{ scale: 1.05, backgroundColor: '#2d2d2d' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: action.color }}
                  />
                </div>
                <span className="text-xs text-gray-300 text-center leading-tight">
                  {action.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Modal d'options d'achat */}
      <BuyOptionsModal 
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </>
  )
}

export default QuickActions
