import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Wallet, 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  QrCode,
  Shield,
  AlertTriangle,
  Info,
  Plus
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface WalletOption {
  id: string
  name: string
  logo: string
  status: 'connected' | 'disconnected' | 'error'
  balance?: string
  description: string
  color: string
}

const DepositCrypto: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20')
  const [showDepositAddress, setShowDepositAddress] = useState(false)
  
  // Adresse de dépôt simulée
  const depositAddress = 'TKzxdKFCzqhGMoJo5FVKbLTGqwYrKY8Zfm'

  const walletOptions: WalletOption[] = [
    {
      id: 'bybit',
      name: 'BYBIT',
      logo: '🟡',
      status: 'connected',
      balance: '1,234.56 USDT',
      description: 'Wallet principal connecté',
      color: '#F7931A'
    },
    {
      id: 'okx',
      name: 'OKX',
      logo: '🔵',
      status: 'connected',
      balance: '892.34 USDT',
      description: 'Wallet de trading connecté',
      color: '#0052FF'
    },
    {
      id: 'binance',
      name: 'BINANCE',
      logo: '🟡',
      status: 'disconnected',
      balance: undefined,
      description: 'Connecter votre wallet Binance',
      color: '#F3BA2F'
    }
  ]

  const cryptoOptions = [
    { symbol: 'USDT', name: 'Tether', networks: ['TRC20', 'ERC20', 'BEP20'] },
    { symbol: 'BTC', name: 'Bitcoin', networks: ['Bitcoin'] },
    { symbol: 'ETH', name: 'Ethereum', networks: ['ERC20'] },
    { symbol: 'BNB', name: 'BNB', networks: ['BEP20'] }
  ]

  const handleBack = () => {
    navigate('/')
  }

  const handleWalletSelect = (walletId: string) => {
    const wallet = walletOptions.find(w => w.id === walletId)
    
    if (wallet?.status === 'disconnected') {
      // Déclencher la connexion du wallet
      handleConnectWallet(walletId)
    } else if (wallet?.status === 'connected') {
      setSelectedWallet(walletId)
      setShowDepositAddress(true)
    }
  }

  const handleConnectWallet = (walletId: string) => {
    // Simuler la connexion du wallet
    console.log(`Connecting to ${walletId} wallet...`)
    
    // Dans une vraie app, cela ouvrirait une fenêtre de connexion
    const wallet = walletOptions.find(w => w.id === walletId)
    if (wallet) {
      alert(`Redirection vers ${wallet.name} pour connexion...`)
    }
  }

  const handleDeposit = () => {
    if (!selectedWallet) {
      alert('Veuillez sélectionner un wallet')
      return
    }

    // Navigation vers la page de transfert
    navigate('/deposit/transfer', {
      state: {
        wallet: selectedWallet,
        crypto: selectedCrypto,
        network: selectedNetwork,
        address: depositAddress
      }
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
    alert('Adresse copiée dans le presse-papiers')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'disconnected':
        return <Plus className="w-4 h-4 text-gray-400" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connecté'
      case 'disconnected':
        return 'Connecter'
      case 'error':
        return 'Erreur'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-semibold">Dépôt de Cryptomonnaies</h1>
          <div className="w-5 h-5" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Sélection de cryptomonnaie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Cryptomonnaie</label>
          <div className="grid grid-cols-2 gap-3">
            {cryptoOptions.map((crypto, index) => (
              <motion.button
                key={crypto.symbol}
                onClick={() => {
                  setSelectedCrypto(crypto.symbol)
                  setSelectedNetwork(crypto.networks[0])
                }}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  selectedCrypto === crypto.symbol
                    ? 'border-[#F7931A] bg-[#2d2d2d]'
                    : 'border-gray-800 bg-[#1a1a1a] hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-left">
                  <h4 className="text-white font-medium">{crypto.symbol}</h4>
                  <p className="text-gray-400 text-sm">{crypto.name}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sélection de réseau */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Réseau</label>
          <div className="grid grid-cols-3 gap-2">
            {cryptoOptions.find(c => c.symbol === selectedCrypto)?.networks.map((network, index) => (
              <motion.button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedNetwork === network
                    ? 'bg-[#F7931A] text-white'
                    : 'bg-[#2d2d2d] text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                {network}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sélection de wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-sm text-gray-400">Wallet source</label>
          <div className="space-y-3">
            {walletOptions.map((wallet, index) => (
              <motion.button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                className={`w-full bg-[#1a1a1a] border rounded-xl p-4 transition-all duration-200 ${
                  selectedWallet === wallet.id 
                    ? 'border-[#F7931A] bg-[#2d2d2d]' 
                    : 'border-gray-800 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
                         style={{ backgroundColor: `${wallet.color}20` }}>
                      {wallet.logo}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{wallet.name}</h4>
                        {getStatusIcon(wallet.status)}
                      </div>
                      <p className="text-gray-400 text-sm">{wallet.description}</p>
                      {wallet.balance && (
                        <p className="text-green-400 text-sm font-medium">
                          {wallet.balance}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      wallet.status === 'connected' ? 'text-green-400' : 
                      wallet.status === 'error' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {getStatusText(wallet.status)}
                    </span>
                    {wallet.status === 'connected' && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Adresse de dépôt */}
        {showDepositAddress && selectedWallet && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Adresse de dépôt</h4>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={copyAddress}
                    className="p-2 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <QrCode className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-[#0f1419] border border-gray-700 rounded-lg p-3">
                <p className="text-white font-mono text-sm break-all">
                  {depositAddress}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Réseau:</span>
                <span className="text-white font-medium">{selectedNetwork}</span>
              </div>
            </div>

            {/* Instructions importantes */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium text-sm mb-2">
                    Instructions importantes
                  </h4>
                  <ul className="text-yellow-200 text-xs space-y-1">
                    <li>• N'envoyez que des {selectedCrypto} sur le réseau {selectedNetwork}</li>
                    <li>• Les dépôts sur d'autres réseaux seront perdus</li>
                    <li>• Montant minimum: 1 {selectedCrypto}</li>
                    <li>• 12 confirmations requises pour les dépôts</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Information de sécurité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f1419] border border-gray-800 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-medium text-sm mb-1">
                Sécurité avancée
              </h4>
              <p className="text-gray-400 text-xs">
                Vos fonds sont protégés par notre système de sécurité multicouche et 
                stockés dans des portefeuilles froids sécurisés.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bouton de dépôt */}
        {selectedWallet && (
          <motion.button
            onClick={handleDeposit}
            className="w-full bg-[#F7931A] hover:bg-[#FF7A00] py-4 rounded-xl font-medium text-white transition-all duration-200 shadow-lg shadow-[#F7931A]/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Initier le dépôt depuis {walletOptions.find(w => w.id === selectedWallet)?.name}
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default DepositCrypto
