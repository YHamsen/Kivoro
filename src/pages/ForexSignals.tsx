import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, TrendingUp, TrendingDown, BarChart3, Bell, Filter, User2, MessageCircle, Phone, Video, MoreVertical, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface ForexSignal {
  id: string
  pair: string
  price: number
  change: number
  changePercent: number
  trend: 'up' | 'down'
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  timeframe: string
  isNew?: boolean
}

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: string
  isPinned?: boolean
}

const ForexSignals: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [activeTab, setActiveTab] = useState<'signals' | 'trading' | 'chat'>('signals')
  const [activeFilter, setActiveFilter] = useState<'updates' | 'all'>('updates')
  const [selectedSignal, setSelectedSignal] = useState<ForexSignal | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const forexSignals: ForexSignal[] = [
    {
      id: '1',
      pair: 'AUD/JPY',
      price: 100.51,
      change: 0.25,
      changePercent: 0.25,
      trend: 'up',
      signal: 'BUY',
      confidence: 78,
      timeframe: '4H',
      isNew: true
    },
    {
      id: '2',
      pair: 'AUD/JPY',
      price: 100.36,
      change: -0.15,
      changePercent: -0.15,
      trend: 'down',
      signal: 'SELL',
      confidence: 82,
      timeframe: '1H'
    },
    {
      id: '3',
      pair: 'AUD/JPY',
      price: 100.22,
      change: 0.12,
      changePercent: 0.12,
      trend: 'up',
      signal: 'HOLD',
      confidence: 65,
      timeframe: '1D'
    },
    {
      id: '4',
      pair: 'EUR/USD',
      price: 1.0845,
      change: 0.0023,
      changePercent: 0.21,
      trend: 'up',
      signal: 'BUY',
      confidence: 74,
      timeframe: '4H'
    },
    {
      id: '5',
      pair: 'GBP/USD',
      price: 1.2634,
      change: -0.0045,
      changePercent: -0.35,
      trend: 'down',
      signal: 'SELL',
      confidence: 89,
      timeframe: '1H'
    }
  ]

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      user: 'Georges Lebas',
      avatar: '👨‍💼',
      message: 'Signal EURUSD confirmed!',
      timestamp: '10:30',
      isPinned: true
    },
    {
      id: '2',
      user: 'Amelia Kone',
      avatar: '👩‍💼',
      message: 'Market looking bullish',
      timestamp: '10:25',
      isPinned: true
    },
    {
      id: '3',
      user: 'Nexto Team',
      avatar: '🚀',
      message: 'Daily analysis ready',
      timestamp: '10:15'
    },
    {
      id: '4',
      user: 'Hakima Mochedrivas',
      avatar: '👩‍💻',
      message: 'New strategy available',
      timestamp: '10:00'
    }
  ]

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'SELL': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const SignalsView = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Signaux</h1>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 bg-[#2d2d2d] rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-gray-400" />
          </motion.button>
          <motion.button
            className="p-2 bg-[#2d2d2d] rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#2d2d2d] rounded-lg p-1">
        <motion.button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'updates'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveFilter('updates')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Mises à jour
        </motion.button>
        <motion.button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-[#F7931A] text-white'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveFilter('all')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Tous
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher des signaux..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none"
        />
      </div>

      {/* Signals List */}
      <div className="space-y-3">
        {forexSignals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 cursor-pointer hover:bg-[#2d2d2d] transition-colors"
            onClick={() => {
              setSelectedSignal(signal)
              setActiveTab('trading')
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {signal.pair.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{signal.pair}</span>
                    {signal.isNew && (
                      <span className="px-2 py-1 bg-[#F7931A] text-white text-xs rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">{signal.timeframe}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">${signal.price}</span>
                <div className="flex items-center space-x-1">
                  {signal.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ${signal.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {signal.changePercent > 0 ? '+' : ''}{signal.changePercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSignalColor(signal.signal)}`}>
                  {signal.signal}
                </span>
                <span className="text-gray-400 text-sm">{signal.confidence}% fiabilité</span>
              </div>
              <div className="w-16 h-8 bg-gradient-to-r from-[#4F46E5]/20 to-[#7C3AED]/20 rounded flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#7C3AED]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const TradingView = () => (
    selectedSignal && (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => setActiveTab('signals')}
            className="p-2 bg-[#2d2d2d] rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </motion.button>
          <h1 className="text-lg font-bold text-white">{selectedSignal.pair}</h1>
          <div className="w-10" />
        </div>

        {/* Price Card */}
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">GT Real (GCT)</span>
            <span className="text-white/80 text-sm">ACCURACY: 87%</span>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-white text-3xl font-bold">${selectedSignal.price}</span>
            <span className="text-green-400 text-sm">+0.43%</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white/80 text-sm">Dernière heure</span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 h-64">
          <div className="text-center text-gray-400 mt-20">
            Graphique de trading en temps réel
            <br />
            <span className="text-sm">Données de {selectedSignal.pair}</span>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-[#1a1a1a] rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Transactions</h3>
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">G</span>
              </div>
              <span className="text-white text-sm">00:01:00</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">$120.00</span>
              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-xs">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <motion.button
            className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-4 rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Vendre
          </motion.button>
          <motion.button
            className="flex-1 bg-[#F7931A] text-white py-4 rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Trading
          </motion.button>
          <motion.button
            className="flex-1 bg-green-500/20 border border-green-500/30 text-green-400 py-4 rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Acheter
          </motion.button>
        </div>
      </div>
    )
  )

  const ChatView = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Chat</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Notifications</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none"
        />
      </div>

      {/* Online Users */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🚀', '💼'].map((avatar, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center text-lg">
              {avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a]" />
          </motion.div>
        ))}
      </div>

      {/* Pinned Chats */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-[#F7931A] rounded-full" />
          <span className="text-white font-medium">Chats épinglés</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {chatMessages.filter(msg => msg.isPinned).map((message) => (
            <motion.div
              key={message.id}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-4 border border-pink-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">{message.avatar}</span>
                <span className="text-white font-medium text-sm">{message.user}</span>
              </div>
              <p className="text-gray-300 text-xs">{message.message}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Chats */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="text-white font-medium">Tous les chats</span>
        </div>
        <div className="space-y-3">
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              className="flex items-center justify-between bg-[#1a1a1a] border border-gray-800 rounded-lg p-3"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center">
                  <span className="text-lg">{message.avatar}</span>
                </div>
                <div>
                  <span className="text-white font-medium text-sm">{message.user}</span>
                  <p className="text-gray-400 text-xs">{message.message}</p>
                </div>
              </div>
              <div className="text-gray-400 text-xs">{message.timestamp}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={withHaptic(() => navigate('/'), 'light')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </motion.button>
          <h1 className="text-lg font-semibold">Signaux Forex</h1>
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#2d2d2d] rounded-lg p-1 mt-4">
          {[
            { key: 'signals', label: 'Signaux', icon: BarChart3 },
            { key: 'trading', label: 'Trading', icon: TrendingUp },
            { key: 'chat', label: 'Chat', icon: MessageCircle }
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-[#F7931A] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(key as typeof activeTab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'signals' && <SignalsView />}
            {activeTab === 'trading' && <TradingView />}
            {activeTab === 'chat' && <ChatView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ForexSignals
