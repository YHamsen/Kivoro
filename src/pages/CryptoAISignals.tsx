import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, TrendingUp, TrendingDown, BarChart3, Bell, Filter, Brain, Zap, Activity, PlayCircle, PauseCircle, SkipBack, SkipForward, Volume2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface CryptoSignal {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  trend: 'up' | 'down'
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  aiPrediction: string
  bullishScore: number
  icon: string
  color: string
}

interface AIAnalysis {
  news: { score: number; status: 'bullish' | 'bearish' | 'neutral' }
  market: { score: number; status: 'bullish' | 'bearish' | 'neutral' }
  analyst: { score: number; status: 'bullish' | 'bearish' | 'neutral' }
}

const CryptoAISignals: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  const [activeTab, setActiveTab] = useState<'signals' | 'detail' | 'ai-player'>('signals')
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoSignal | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const cryptoSignals: CryptoSignal[] = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 1824.00,
      change: 0.43,
      changePercent: 0.43,
      trend: 'up',
      signal: 'BUY',
      confidence: 74,
      aiPrediction: 'IA prédit une hausse basée sur l\'adoption institutionnelle',
      bullishScore: 75,
      icon: '₿',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 1824.00,
      change: 0.43,
      changePercent: 0.43,
      trend: 'up',
      signal: 'BUY',
      confidence: 74,
      aiPrediction: 'Mise à jour réseau favorable détectée par IA',
      bullishScore: 82,
      icon: 'Ξ',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: '3',
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 29.61,
      change: -0.33,
      changePercent: -0.33,
      trend: 'down',
      signal: 'SELL',
      confidence: 76,
      aiPrediction: 'Résistance technique identifiée par algorithmes',
      bullishScore: 45,
      icon: '🔺',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: '4',
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.99,
      change: 0.0321,
      changePercent: 3.21,
      trend: 'up',
      signal: 'BUY',
      confidence: 89,
      aiPrediction: 'Sentiment social positif détecté',
      bullishScore: 75,
      icon: '🔷',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: '5',
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.45,
      change: -0.02,
      changePercent: -4.23,
      trend: 'down',
      signal: 'HOLD',
      confidence: 67,
      aiPrediction: 'Consolidation prévue par modèles prédictifs',
      bullishScore: 52,
      icon: '◈',
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  const topCryptos = [
    { symbol: 'BTC', icon: '₿', color: 'from-orange-500 to-yellow-500' },
    { symbol: 'ETH', icon: 'Ξ', color: 'from-blue-500 to-purple-500' },
    { symbol: 'BNB', icon: '⬨', color: 'from-yellow-500 to-orange-500' },
    { symbol: 'ADA', icon: '◈', color: 'from-cyan-500 to-blue-500' },
    { symbol: 'SOL', icon: '◎', color: 'from-purple-500 to-pink-500' }
  ]

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'SELL': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getBullishColor = (score: number) => {
    if (score >= 70) return 'text-green-400 bg-green-500/20'
    if (score >= 40) return 'text-yellow-400 bg-yellow-500/20'
    return 'text-red-400 bg-red-500/20'
  }

  const aiAnalysis: AIAnalysis = {
    news: { score: 75, status: 'bullish' },
    market: { score: 26, status: 'bearish' },
    analyst: { score: 76, status: 'bullish' }
  }

  const SignalsView = () => (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Crypto Expliqué</h1>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-white/80" />
            <span className="text-white/80 text-sm">IA Active</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-white/80 text-sm">Bitcoin</span>
            <span className="text-green-400 font-medium">32.2% ↗</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/80 text-sm">Polygon</span>
            <span className="text-green-400 font-medium">26.2% ↗</span>
          </div>
        </div>
      </div>

      {/* Top Cryptos */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {topCryptos.map((crypto, index) => (
          <motion.div
            key={crypto.symbol}
            className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${crypto.color} rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {crypto.icon}
          </motion.div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher des signaux..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#F7931A] focus:outline-none"
        />
        <motion.button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-[#F7931A] rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Filter className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* AI Signals List */}
      <div className="space-y-4">
        {cryptoSignals.map((crypto, index) => (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 cursor-pointer hover:bg-[#2d2d2d] transition-colors"
            onClick={() => {
              setSelectedCrypto(crypto)
              setActiveTab('detail')
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${crypto.color} rounded-2xl flex items-center justify-center text-xl font-bold text-white`}>
                  {crypto.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{crypto.signal}</span>
                    <span className="text-gray-400">{crypto.symbol}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{crypto.name}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">${crypto.price}</span>
                <div className="flex items-center space-x-1">
                  {crypto.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ${crypto.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.changePercent > 0 ? '+' : ''}{crypto.changePercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-sm text-gray-300">{crypto.aiPrediction}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBullishColor(crypto.bullishScore)}`}>
                  {crypto.bullishScore}% Bullish
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                    style={{ width: `${crypto.bullishScore}%` }}
                  />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Player Controls */}
      <motion.div
        className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
        onClick={() => setActiveTab('ai-player')}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F7931A] to-[#FFA500] rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-white font-medium">Analyse IA Audio</span>
              <p className="text-gray-400 text-sm">Explication crypto en cours</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SkipBack className="w-5 h-5 text-gray-400" />
            <PlayCircle className="w-8 h-8 text-[#F7931A]" />
            <SkipForward className="w-5 h-5 text-gray-400" />
            <Volume2 className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </motion.div>
    </div>
  )

  const DetailView = () => (
    selectedCrypto && (
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
          <h1 className="text-lg font-bold text-white">{selectedCrypto.name}</h1>
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
              <Brain className="w-5 h-5 text-[#7C3AED]" />
            </motion.button>
          </div>
        </div>

        {/* Price Header */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">
              Fév. 1er, 2025 • {selectedCrypto.name} hacked
            </span>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-white text-4xl font-bold">${selectedCrypto.price}</span>
            <span className={`text-lg ${selectedCrypto.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {selectedCrypto.changePercent > 0 ? '+' : ''}{selectedCrypto.changePercent}%
            </span>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 h-48 border border-gray-800">
          <div className="text-center text-gray-400 mt-16">
            Graphique d'analyse IA
            <br />
            <span className="text-sm">Prédictions en temps réel pour {selectedCrypto.symbol}</span>
          </div>
        </div>

        {/* Crypto Info Card */}
        <div className="bg-gradient-to-br from-[#4F46E5]/10 to-[#7C3AED]/10 border border-[#4F46E5]/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${selectedCrypto.color} rounded-full flex items-center justify-center text-lg font-bold text-white`}>
                {selectedCrypto.icon}
              </div>
              <div>
                <span className="text-white font-medium">{selectedCrypto.symbol}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">{selectedCrypto.name}</span>
                  <span className="px-2 py-1 bg-[#F7931A] text-white text-xs rounded-full">
                    Crypto
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Score IA Global</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: `${selectedCrypto.bullishScore}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getBullishColor(selectedCrypto.bullishScore).split(' ')[0]}`}>
                  {selectedCrypto.bullishScore}% Bullish
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Sections */}
        <div className="space-y-3">
          {Object.entries(aiAnalysis).map(([key, data]) => (
            <motion.div
              key={key}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-center justify-between"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#2d2d2d] rounded-lg flex items-center justify-center">
                  {key === 'news' && <Activity className="w-4 h-4 text-[#F7931A]" />}
                  {key === 'market' && <BarChart3 className="w-4 h-4 text-[#F7931A]" />}
                  {key === 'analyst' && <Brain className="w-4 h-4 text-[#F7931A]" />}
                </div>
                <span className="text-white font-medium capitalize">{key}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${data.status === 'bullish' ? 'bg-green-500' : data.status === 'bearish' ? 'bg-red-500' : 'bg-yellow-500'}`}
                    style={{ width: `${data.score}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${data.status === 'bullish' ? 'text-green-400' : data.status === 'bearish' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {data.score}% {data.status === 'bullish' ? 'Bullish' : data.status === 'bearish' ? 'Bearish' : 'Neutre'}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  )

  const AIPlayerView = () => (
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
        <h1 className="text-lg font-bold text-white">Lecteur IA</h1>
        <div className="w-10" />
      </div>

      {/* AI Player Interface */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Analyse Crypto IA</h2>
          <p className="text-white/80 text-sm">Explications intelligentes en temps réel</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-white/60 rounded-full transition-all duration-300" style={{ width: '45%' }} />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-center space-x-6">
          <motion.button
            className="p-3 bg-white/20 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipBack className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button
            className="p-4 bg-white rounded-full"
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <PauseCircle className="w-8 h-8 text-[#4F46E5]" />
            ) : (
              <PlayCircle className="w-8 h-8 text-[#4F46E5]" />
            )}
          </motion.button>
          
          <motion.button
            className="p-3 bg-white/20 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipForward className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-3 mt-6">
          <Volume2 className="w-5 h-5 text-white/60" />
          <div className="w-32 h-2 bg-white/20 rounded-full">
            <div className="h-full bg-white/60 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Current Topic */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Zap className="w-5 h-5 text-[#F7931A]" />
          <span className="text-white font-medium">Sujet Actuel</span>
        </div>
        <p className="text-gray-300 text-sm mb-2">
          "Analyse des tendances Bitcoin pour janvier 2025"
        </p>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs">En direct</span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <h3 className="text-white font-medium mb-3">Insights IA Récents</h3>
        <div className="space-y-3">
          {[
            "Bitcoin montre des signaux haussiers selon l'analyse technique",
            "Ethereum bénéficie d'une adoption DeFi croissante",
            "Les altcoins suivent la tendance de BTC avec volatilité"
          ].map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#F7931A] rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{insight}</span>
            </div>
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
          <h1 className="text-lg font-semibold">Signaux Crypto IA</h1>
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#2d2d2d] rounded-lg p-1 mt-4">
          {[
            { key: 'signals', label: 'Signaux', icon: Brain },
            { key: 'detail', label: 'Détails', icon: BarChart3 },
            { key: 'ai-player', label: 'Lecteur IA', icon: PlayCircle }
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
            {activeTab === 'detail' && <DetailView />}
            {activeTab === 'ai-player' && <AIPlayerView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CryptoAISignals
