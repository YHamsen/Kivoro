import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, 
  Download,
  Copy,
  CheckCircle,
  QrCode,
  Smartphone,
  ExternalLink,
  Mail,
  FileText,
  Home
} from 'lucide-react'
import { eSIMOffer, eSIMActivation } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

const eSIMActivationPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  
  const { offer, activation, paymentMethod, orderId, fromMyESIMs } = location.state || {}
  const [showManualCode, setShowManualCode] = useState(false)

  if (!offer || !activation) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Activation not found</h3>
          <p className="text-gray-500 mb-4">Please complete a purchase first</p>
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

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard!`)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadQRCode = () => {
    // Create a download link for the QR code
    const link = document.createElement('a')
    link.href = activation.qrCode
    link.download = `esim-qr-${offer.country.toLowerCase()}-${activation.iccid}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR code downloaded!')
  }

  const sendEmail = () => {
    const subject = `eSIM Activation - ${offer.country}`
    const body = `
eSIM Activation Details:

Country: ${offer.country}
Operator: ${offer.operator}
Data Plan: ${offer.dataAmount}${offer.dataUnit} for ${offer.validity}

ICCID: ${activation.iccid}
Manual Code: ${activation.manual_installation.activation_code}
QR Code URL: ${activation.qrcode_url}
LPA Code: ${activation.lpa}

Instructions:
${activation.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Thank you for your purchase!
    `
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={withHaptic(() => {
              if (fromMyESIMs) {
                navigate('/esim/my-esims')
              } else {
                navigate('/')
              }
            }, 'light')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{fromMyESIMs ? 'Mes eSIMs' : 'Accueil'}</span>
          </motion.button>
          <h1 className="text-lg font-semibold">Activation eSIM</h1>
          <div className="w-5 h-5"></div>
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-900/20 border border-green-700/50 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-green-400 font-semibold text-lg">Achat réussi !</h3>
              {orderId && (
                <p className="text-gray-400 text-sm">Commande #{orderId}</p>
              )}
              <p className="text-gray-300 text-sm">
                Votre eSIM pour {offer.country} est prête à être activée
              </p>
            </div>
          </div>
        </motion.div>

        {/* Purchase Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Purchase Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Country</span>
              <span className="text-white font-medium">{offer.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Operator</span>
              <span className="text-white font-medium">{offer.operator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Data Plan</span>
              <span className="text-white font-medium">{offer.dataAmount}{offer.dataUnit} for {offer.validity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method</span>
              <span className="text-white font-medium capitalize">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ICCID</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono text-sm">{activation.iccid}</span>
                <motion.button
                  onClick={withHaptic(() => copyToClipboard(activation.iccid, 'ICCID'), 'light')}
                  className="text-[#F7931A] hover:text-[#FFD700]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <QrCode className="w-6 h-6 text-[#F7931A]" />
              <h3 className="text-lg font-semibold text-white">QR Code Activation</h3>
            </div>
            <motion.button
              onClick={withHaptic(downloadQRCode, 'medium')}
              className="flex items-center space-x-2 text-[#F7931A] hover:text-[#FFD700]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Download</span>
            </motion.button>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-xl">
              <img 
                src={activation.qrCode} 
                alt="eSIM QR Code" 
                className="w-48 h-48"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
          
          <p className="text-gray-400 text-sm text-center">
            Scan this QR code with your device camera to add the eSIM data plan
          </p>
        </motion.div>

        {/* Manual Activation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-[#F7931A]" />
              <h3 className="text-lg font-semibold text-white">Manual Activation</h3>
            </div>
            <motion.button
              onClick={withHaptic(() => setShowManualCode(!showManualCode), 'selection')}
              className="text-[#F7931A] hover:text-[#FFD700] text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showManualCode ? 'Hide' : 'Show'} Code
            </motion.button>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">
            If QR code doesn't work, use this manual activation code:
          </p>
          
          {showManualCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[#2d2d2d] rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between">
                <code className="text-[#F7931A] font-mono text-sm break-all">
                  {activation.manualCode}
                </code>
                <motion.button
                  onClick={withHaptic(() => copyToClipboard(activation.manualCode, 'Manual code'), 'light')}
                  className="text-[#F7931A] hover:text-[#FFD700] ml-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
          
          <motion.a
            href={activation.activationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={withHaptic(() => {}, 'light')}
            className="flex items-center space-x-2 text-[#F7931A] hover:text-[#FFD700] text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Activation Portal</span>
          </motion.a>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-[#F7931A]" />
            <h3 className="text-lg font-semibold text-white">Activation Instructions</h3>
          </div>
          
          <div className="space-y-3">
            {activation.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#F7931A] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-300">{instruction}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.button
            onClick={withHaptic(sendEmail, 'medium')}
            className="flex items-center justify-center space-x-2 bg-[#1a1a1a] border border-gray-800 text-white py-3 px-4 rounded-xl hover:border-[#F7931A]/50 hover:bg-[#2d2d2d] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5" />
            <span>Email Details</span>
          </motion.button>
          
          <motion.button
            onClick={withHaptic(() => navigate('/'), 'medium')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default eSIMActivationPage
