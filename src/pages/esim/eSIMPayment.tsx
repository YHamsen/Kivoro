import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Bitcoin,
  Check,
  AlertCircle,
  Loader
} from 'lucide-react'
import { eSIMOffer, airaloApi } from '../../services/airaloApi'
import { sumupApi } from '../../services/sumupApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

const eSIMPayment: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  
  const offer = location.state?.offer as eSIMOffer
  const [selectedPayment, setSelectedPayment] = useState<'crypto' | 'mobile_money' | 'sumup'>('crypto')
  const [processing, setProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Offer not found</h3>
          <p className="text-gray-500 mb-4">Please select an offer from the list</p>
          <motion.button
            onClick={withHaptic(() => navigate('/esim/offers'), 'medium')}
            className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Offers
          </motion.button>
        </div>
      </div>
    )
  }

  const handlePayment = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    if (selectedPayment === 'mobile_money' && !phoneNumber.trim()) {
      toast.error('Please enter your phone number for mobile money payment')
      return
    }

    if (selectedPayment === 'sumup') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast.error('Please fill in all card details')
        return
      }
    }

    try {
      setProcessing(true)
      
      // Handle SumUp payment first if selected
      if (selectedPayment === 'sumup') {
        toast.loading('Processing SumUp payment...')
        
        const paymentData = {
          amount: offer.price,
          currency: 'USD',
          description: `eSIM ${offer.title} for ${offer.country}`,
          merchant_reference: `kivoro_${offer.id}_${Date.now()}`,
          customer_email: email.trim(),
          customer_phone: phoneNumber.trim()
        }
        
        try {
          const checkout = await sumupApi.createCheckout(paymentData)
          
          // Redirect to SumUp checkout page or open in popup
          if (checkout.checkout_url) {
            window.open(checkout.checkout_url, '_blank', 'width=600,height=800')
            toast.success('Redirected to SumUp payment. Complete payment and return here.')
            
            // For demo purposes, simulate successful payment after 5 seconds
            setTimeout(() => {
              processPurchase()
            }, 5000)
            return
          }
        } catch (sumupError: any) {
          console.error('SumUp payment failed:', sumupError)
          toast.error('SumUp payment failed. Please try another payment method.')
          return
        }
      }
      
      // Process eSIM purchase
      await processPurchase()
      
    } catch (error: any) {
      toast.error(error.message || 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const processPurchase = async () => {
    const purchaseRequest = {
      package_id: offer.id,
      quantity: 1,
      brand_settings_name: 'Kivoro',
      description: `eSIM purchase for ${offer.country} - ${email.trim()}`
    }

    const activation = await airaloApi.purchaseeSIM(purchaseRequest)
    
    toast.success('eSIM acheté avec succès!')
    
    // Rediriger vers la page de confirmation au lieu de l'activation directement
    navigate('/esim/confirmation', { 
      state: { 
        offer, 
        activation,
        paymentMethod: getPaymentMethodName(selectedPayment),
        customerEmail: email.trim()
      } 
    })
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'crypto': return 'Crypto Balance'
      case 'mobile_money': return 'Mobile Money'
      case 'sumup': return 'Carte bancaire (SumUp)'
      default: return 'Paiement non spécifié'
    }
  }

  const paymentMethods = [
    {
      id: 'crypto',
      label: 'Crypto Balance',
      icon: Bitcoin,
      description: `Pay with crypto (${offer.cryptoPrice} BTC)`,
      available: true
    },
    {
      id: 'mobile_money',
      label: 'Mobile Money',
      icon: Smartphone,
      description: `Pay with mobile money ($${offer.price})`,
      available: true
    },
    {
      id: 'sumup',
      label: 'Credit/Debit Card',
      icon: CreditCard,
      description: `Pay with card via SumUp ($${offer.price})`,
      available: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={withHaptic(() => navigate(-1), 'light')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </motion.button>
          <h1 className="text-xl font-bold">Payment</h1>
          <div className="w-16"></div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-medium">{offer.country} - {offer.dataAmount}{offer.dataUnit}</p>
              <p className="text-gray-400 text-sm">{offer.operator} • {offer.validity}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">${offer.price}</p>
              <p className="text-gray-400 text-sm">≈ {offer.cryptoPrice} BTC</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total</span>
              <span className="text-[#F7931A] font-bold text-lg">
                {selectedPayment === 'crypto' ? `${offer.cryptoPrice} BTC` : `$${offer.price}`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                required
              />
              <p className="text-gray-500 text-xs mt-1">
                eSIM activation details will be sent to this email
              </p>
            </div>

            {selectedPayment === 'mobile_money' && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                  required
                />
                <p className="text-gray-500 text-xs mt-1">
                  Required for mobile money payment verification
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Card Details for SumUp */}
        {selectedPayment === 'sumup' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Card Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => {
                    // Format card number with spaces
                    const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
                    if (value.length <= 19) { // Max length for formatted card number
                      setCardDetails(prev => ({ ...prev, number: value }))
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      // Format MM/YY
                      let value = e.target.value.replace(/\D/g, '')
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4)
                      }
                      setCardDetails(prev => ({ ...prev, expiry: value }))
                    }}
                    placeholder="MM/YY"
                    className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value.length <= 4) {
                        setCardDetails(prev => ({ ...prev, cvv: value }))
                      }
                    }}
                    placeholder="123"
                    className="w-full bg-[#2d2d2d] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F7931A] transition-colors"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <CreditCard className="w-4 h-4 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-green-400 text-sm font-medium">Secured by SumUp</p>
                    <p className="text-gray-300 text-xs mt-1">
                      Your card details are processed securely by SumUp and are not stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon
              const isSelected = selectedPayment === method.id
              
              return (
                <motion.button
                  key={method.id}
                  onClick={withHaptic(() => setSelectedPayment(method.id as 'crypto' | 'mobile_money' | 'sumup'), 'selection')}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'border-[#F7931A] bg-[#F7931A]/10'
                      : 'border-gray-700 hover:border-gray-600 hover:bg-[#2d2d2d]'
                  } ${!method.available && 'opacity-50 cursor-not-allowed'}`}
                  disabled={!method.available}
                  whileHover={{ scale: method.available ? 1.02 : 1 }}
                  whileTap={{ scale: method.available ? 0.98 : 1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#F7931A]' : 'bg-gray-700'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          isSelected ? 'text-white' : 'text-gray-300'
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className={`font-medium ${
                          isSelected ? 'text-[#F7931A]' : 'text-white'
                        }`}>
                          {method.label}
                        </p>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-6 h-6 text-[#F7931A]" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-medium text-sm">Secure Payment</h4>
              <p className="text-gray-300 text-xs mt-1">
                Your payment is processed securely. eSIM activation details will be available immediately after purchase.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={withHaptic(handlePayment, 'heavy')}
          disabled={processing || !email.trim() || 
            (selectedPayment === 'mobile_money' && !phoneNumber.trim()) ||
            (selectedPayment === 'sumup' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name))
          }
          className="w-full bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          whileHover={{ scale: processing ? 1 : 1.02 }}
          whileTap={{ scale: processing ? 1 : 0.98 }}
        >
          {processing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>
                Pay {selectedPayment === 'crypto' ? `${offer.cryptoPrice} BTC` : `$${offer.price}`}
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default eSIMPayment
