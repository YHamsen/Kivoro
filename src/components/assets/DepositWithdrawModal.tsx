import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Minus, 
  DollarSign, 
  Bitcoin, 
  CreditCard, 
  Building, 
  Smartphone,
  ArrowRight,
  Info,
  Shield,
  Clock
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import useHapticFeedback from '../../hooks/useHapticFeedback'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ElementType
  processingTime: string
  fees: string
  limits: { min: number; max: number }
  supported: boolean
}

interface DepositWithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'deposit' | 'withdraw'
  selectedAsset?: string
}

const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedAsset = 'EUR'
}) => {
  const { withHaptic } = useHapticFeedback()
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState(selectedAsset)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bank_transfer',
      name: 'Virement Bancaire',
      description: 'SEPA - Aucun frais',
      icon: Building,
      processingTime: '1-2 jours ouvrés',
      fees: 'Gratuit',
      limits: { min: 10, max: 50000 },
      supported: true
    },
    {
      id: 'credit_card',
      name: 'Carte Bancaire',
      description: 'Visa, Mastercard',
      icon: CreditCard,
      processingTime: 'Instantané',
      fees: '2.5%',
      limits: { min: 5, max: 5000 },
      supported: true
    },
    {
      id: 'crypto',
      name: 'Cryptomonnaie',
      description: 'BTC, ETH, USDT',
      icon: Bitcoin,
      processingTime: '5-30 minutes',
      fees: 'Frais réseau',
      limits: { min: 1, max: 100000 },
      supported: true
    },
    {
      id: 'mobile_payment',
      name: 'Paiement Mobile',
      description: 'Apple Pay, Google Pay',
      icon: Smartphone,
      processingTime: 'Instantané',
      fees: '1.5%',
      limits: { min: 5, max: 1000 },
      supported: false
    }
  ]

  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'USD', name: 'Dollar US', symbol: '$' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ' },
    { code: 'USDT', name: 'Tether', symbol: '₮' }
  ]

  const formatCurrency = (amount: number, currency: string) => {
    const currencyInfo = currencies.find(c => c.code === currency)
    return `${amount} ${currencyInfo?.symbol || currency}`
  }

  const handleSubmit = () => {
    if (!amount || !selectedMethod || !selectedCurrency) return
    
    console.log(`${mode}:`, { amount, selectedMethod, selectedCurrency })
    
    // Simulation de traitement
    withHaptic(() => {
      alert(`${mode === 'deposit' ? 'Dépôt' : 'Retrait'} de ${amount} ${selectedCurrency} initié avec succès !`)
      onClose()
    }, 'selection')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'deposit' ? (
              <Plus className="w-5 h-5 text-green-500" />
            ) : (
              <Minus className="w-5 h-5 text-red-500" />
            )}
            {mode === 'deposit' ? 'Déposer des Fonds' : 'Retirer des Fonds'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'deposit' 
              ? 'Choisissez votre méthode de dépôt préférée'
              : 'Sélectionnez l\'actif et la méthode de retrait'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Currency Selection */}
          <div>
            <Label className="text-sm font-medium">
              {mode === 'deposit' ? 'Devise à déposer' : 'Actif à retirer'}
            </Label>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="bg-[#2a2a2a] border-gray-700 mt-2">
                <SelectValue placeholder="Choisir une devise" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-gray-700">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.symbol}</span>
                      <span>{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div>
            <Label className="text-sm font-medium">Montant</Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-[#2a2a2a] border-gray-700 pr-16"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {currencies.find(c => c.code === selectedCurrency)?.symbol || selectedCurrency}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              {mode === 'deposit' ? 'Méthode de dépôt' : 'Méthode de retrait'}
            </Label>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: method.supported ? 1.02 : 1 }}
                    whileTap={{ scale: method.supported ? 0.98 : 1 }}
                  >
                    <Card 
                      className={`p-3 cursor-pointer transition-all border ${
                        selectedMethod === method.id
                          ? 'border-[#F7931A] bg-[#F7931A]/10'
                          : method.supported
                          ? 'border-gray-700 hover:border-gray-600 bg-[#2a2a2a]'
                          : 'border-gray-800 bg-gray-900/50 cursor-not-allowed opacity-50'
                      }`}
                      onClick={() => {
                        if (method.supported) {
                          setSelectedMethod(method.id)
                          withHaptic(() => {}, 'selection')
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-5 h-5 ${
                            method.supported ? 'text-[#F7931A]' : 'text-gray-500'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              method.supported ? 'text-white' : 'text-gray-500'
                            }`}>
                              {method.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {!method.supported && (
                          <Badge variant="outline" className="text-xs">
                            Bientôt
                          </Badge>
                        )}
                      </div>
                      
                      {selectedMethod === method.id && method.supported && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-3 border-t border-gray-700"
                        >
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <p className="text-gray-400">Délai</p>
                              <p className="text-white">{method.processingTime}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Frais</p>
                              <p className="text-white">{method.fees}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-400">Limites</p>
                              <p className="text-white">
                                {formatCurrency(method.limits.min, selectedCurrency)} - {formatCurrency(method.limits.max, selectedCurrency)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-500/10 border-blue-500/20 p-3">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
              <div className="text-xs">
                <p className="text-blue-400 font-medium">Sécurité Garantie</p>
                <p className="text-gray-400 mt-1">
                  Toutes les transactions sont sécurisées et cryptées. Vos fonds sont protégés.
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-gray-700 hover:bg-gray-800"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!amount || !selectedMethod || !selectedCurrency}
              className={`flex-1 ${
                mode === 'deposit' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {mode === 'deposit' ? 'Déposer' : 'Retirer'} {amount} {selectedCurrency}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DepositWithdrawModal
