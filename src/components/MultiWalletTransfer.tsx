import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowLeftRight, Info, AlertTriangle, CheckCircle, Wallet, Calculator } from 'lucide-react'
import { multiWalletService, WalletType, WALLET_COLORS, WALLET_NAMES, WALLET_LOGOS } from '../services/multiWalletService'
import useHapticFeedback from '../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface TransferRoute {
  from: WalletType
  to: WalletType
  fees: {
    type: 'fixed' | 'percentage'
    amount: number
    currency: string
  }
  estimatedTime: string
  instant: boolean
}

const MultiWalletTransfer: React.FC = () => {
  const [fromWallet, setFromWallet] = useState<WalletType>('bybit')
  const [toWallet, setToWallet] = useState<WalletType>('okx')
  const [selectedCoin, setSelectedCoin] = useState<string>('USDT')
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [availableBalance, setAvailableBalance] = useState<number>(0)
  const [transferFee, setTransferFee] = useState<number>(0)
  const [estimatedReceived, setEstimatedReceived] = useState<number>(0)
  const { withHaptic } = useHapticFeedback()

  // Configuration des routes de transfert avec frais
  const transferRoutes: TransferRoute[] = [
    // Transferts intra-plateforme (instantanés et gratuits)
    { from: 'bybit', to: 'bybit', fees: { type: 'fixed', amount: 0, currency: 'USD' }, estimatedTime: 'Instantané', instant: true },
    { from: 'okx', to: 'okx', fees: { type: 'fixed', amount: 0, currency: 'USD' }, estimatedTime: 'Instantané', instant: true },
    { from: 'binance', to: 'binance', fees: { type: 'fixed', amount: 0, currency: 'USD' }, estimatedTime: 'Instantané', instant: true },
    
    // Transferts inter-plateformes crypto (avec frais réseau)
    { from: 'bybit', to: 'okx', fees: { type: 'fixed', amount: 2.5, currency: 'USDT' }, estimatedTime: '5-15 min', instant: false },
    { from: 'bybit', to: 'binance', fees: { type: 'fixed', amount: 1.5, currency: 'USDT' }, estimatedTime: '3-10 min', instant: false },
    { from: 'okx', to: 'bybit', fees: { type: 'fixed', amount: 3.0, currency: 'USDT' }, estimatedTime: '5-15 min', instant: false },
    { from: 'okx', to: 'binance', fees: { type: 'fixed', amount: 2.0, currency: 'USDT' }, estimatedTime: '5-12 min', instant: false },
    { from: 'binance', to: 'bybit', fees: { type: 'fixed', amount: 2.0, currency: 'USDT' }, estimatedTime: '3-10 min', instant: false },
    { from: 'binance', to: 'okx', fees: { type: 'fixed', amount: 2.5, currency: 'USDT' }, estimatedTime: '5-12 min', instant: false },
    
    // Transferts vers/depuis Alpaca (conversion nécessaire)
    { from: 'alpaca', to: 'bybit', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false },
    { from: 'alpaca', to: 'okx', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false },
    { from: 'alpaca', to: 'binance', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false },
    { from: 'bybit', to: 'alpaca', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false },
    { from: 'okx', to: 'alpaca', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false },
    { from: 'binance', to: 'alpaca', fees: { type: 'percentage', amount: 0.5, currency: '%' }, estimatedTime: '1-2 heures', instant: false }
  ]

  const currentRoute = transferRoutes.find(route => route.from === fromWallet && route.to === toWallet)

  useEffect(() => {
    calculateTransferDetails()
  }, [fromWallet, toWallet, selectedCoin, amount])

  useEffect(() => {
    loadAvailableBalance()
  }, [fromWallet, selectedCoin])

  const loadAvailableBalance = async () => {
    try {
      const balances = await multiWalletService.getAllBalances()
      const walletBalance = balances.find(b => b.wallet === fromWallet && b.coin === selectedCoin)
      setAvailableBalance(parseFloat(walletBalance?.balance || '0'))
    } catch (error) {
      console.error('Erreur chargement balance:', error)
    }
  }

  const calculateTransferDetails = () => {
    if (!amount || !currentRoute) {
      setTransferFee(0)
      setEstimatedReceived(0)
      return
    }

    const amountNum = parseFloat(amount)
    let fee = 0

    if (currentRoute.fees.type === 'fixed') {
      fee = currentRoute.fees.amount
    } else {
      fee = amountNum * (currentRoute.fees.amount / 100)
    }

    setTransferFee(fee)
    setEstimatedReceived(Math.max(0, amountNum - fee))
  }

  const handleTransfer = withHaptic(async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Veuillez entrer un montant valide')
      return
    }

    if (parseFloat(amount) > availableBalance) {
      toast.error('Solde insuffisant')
      return
    }

    if (fromWallet === toWallet) {
      toast.error('Veuillez sélectionner des wallets différents')
      return
    }

    try {
      setLoading(true)
      await multiWalletService.transferFunds(fromWallet, toWallet, selectedCoin, parseFloat(amount))
      toast.success(`Transfert de ${amount} ${selectedCoin} initié avec succès`)
      setAmount('')
    } catch (error) {
      console.error('Erreur transfert:', error)
      toast.error('Erreur lors du transfert')
    } finally {
      setLoading(false)
    }
  }, 'light')

  const WalletSelector = ({ 
    value, 
    onChange, 
    exclude 
  }: { 
    value: WalletType
    onChange: (wallet: WalletType) => void
    exclude?: WalletType 
  }) => (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(WALLET_NAMES)
        .filter(([wallet]) => wallet !== exclude)
        .map(([wallet, name]) => {
          const isSelected = value === wallet
          const walletColor = WALLET_COLORS[wallet as WalletType]
          const walletLogo = WALLET_LOGOS[wallet as WalletType]
          
          return (
            <motion.button
              key={wallet}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(wallet as WalletType)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected 
                  ? 'bg-slate-800/50 shadow-lg' 
                  : 'bg-slate-900/50 hover:bg-slate-800/30 border-slate-600'
              }`}
              style={{ 
                borderColor: isSelected ? walletColor : 'transparent'
              }}
            >
              <div className="flex items-center space-x-3">
                <img 
                  src={walletLogo} 
                  alt={name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <Wallet 
                  className="w-8 h-8 hidden" 
                  style={{ color: walletColor }}
                />
                <div className="text-left">
                  <div className="text-white font-medium text-sm">{name}</div>
                  <div 
                    className="text-xs font-medium"
                    style={{ color: walletColor }}
                  >
                    {wallet === 'alpaca' ? 'Actions/Forex' : 'Crypto'}
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Transferts Multi-Wallet</h2>
            <p className="text-slate-400">Transférez vos actifs entre vos différents wallets</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de transfert */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Nouveau Transfert</h3>
          
          {/* Wallet source */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-3">
              Depuis le wallet
            </label>
            <WalletSelector 
              value={fromWallet} 
              onChange={setFromWallet}
              exclude={toWallet}
            />
          </div>

          {/* Flèche de direction */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const temp = fromWallet
                setFromWallet(toWallet)
                setToWallet(temp)
              }}
              className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full transition-colors"
            >
              <ArrowLeftRight className="w-5 h-5 text-slate-300" />
            </motion.button>
          </div>

          {/* Wallet destination */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-3">
              Vers le wallet
            </label>
            <WalletSelector 
              value={toWallet} 
              onChange={setToWallet}
              exclude={fromWallet}
            />
          </div>

          {/* Sélection de la crypto */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Actif à transférer
            </label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="BNB">BNB</option>
              <option value="USD">USD (Alpaca)</option>
            </select>
          </div>

          {/* Montant */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-medium">
                Montant
              </label>
              <button
                onClick={() => setAmount(availableBalance.toString())}
                className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
              >
                Max: {availableBalance.toFixed(4)} {selectedCoin}
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {selectedCoin}
              </span>
            </div>
          </div>

          {/* Bouton de transfert */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTransfer}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Transfert en cours...' : 'Initier le transfert'}
          </motion.button>
        </div>

        {/* Détails du transfert */}
        <div className="space-y-4">
          {/* Informations sur la route */}
          {currentRoute && (
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-500" />
                Détails du Transfert
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Route</span>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${WALLET_COLORS[fromWallet]}20`,
                        color: WALLET_COLORS[fromWallet]
                      }}
                    >
                      {WALLET_NAMES[fromWallet]}
                    </span>
                    <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${WALLET_COLORS[toWallet]}20`,
                        color: WALLET_COLORS[toWallet]
                      }}
                    >
                      {WALLET_NAMES[toWallet]}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Temps estimé</span>
                  <div className="flex items-center space-x-2">
                    {currentRoute.instant && <CheckCircle className="w-4 h-4 text-green-500" />}
                    <span className="text-white">{currentRoute.estimatedTime}</span>
                  </div>
                </div>

                {amount && (
                  <>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400">Montant à envoyer</span>
                        <span className="text-white">{amount} {selectedCoin}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400">Frais de transfert</span>
                        <span className="text-yellow-400">
                          {currentRoute.fees.type === 'fixed' 
                            ? `${transferFee} ${currentRoute.fees.currency}`
                            : `${transferFee.toFixed(4)} ${selectedCoin} (${currentRoute.fees.amount}%)`
                          }
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white">Montant reçu</span>
                        <span className="text-green-400">{estimatedReceived.toFixed(4)} {selectedCoin}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Alertes */}
                {currentRoute.instant ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">Transfert instantané et gratuit</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm">
                        Transfert avec frais réseau • Vérifiez les adresses
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Guide des frais */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              Guide des Frais
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Transferts intra-plateforme</span>
                <span className="text-green-400 text-sm font-medium">Gratuit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Crypto inter-plateformes</span>
                <span className="text-yellow-400 text-sm font-medium">1.5-3.0 USDT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Vers/depuis Alpaca</span>
                <span className="text-orange-400 text-sm font-medium">0.5%</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-slate-500">
              Les frais varient selon la congestion du réseau et les politiques des plateformes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiWalletTransfer
