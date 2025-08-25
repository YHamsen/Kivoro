import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  CheckCircle, 
  Download,
  Mail,
  Smartphone,
  Clock,
  Globe,
  ArrowRight,
  Copy,
  QrCode,
  FileText,
  Home,
  User,
  CreditCard,
  MapPin
} from 'lucide-react'
import { eSIMOffer, eSIMActivation } from '../../services/airaloApi'
import useHapticFeedback from '../../hooks/useHapticFeedback'
import toast from 'react-hot-toast'

interface OrderDetails {
  orderId: string
  offer: eSIMOffer
  paymentMethod: string
  customerEmail: string
  orderDate: Date
  activation: eSIMActivation
  status: 'processing' | 'completed' | 'failed'
}

const eSIMConfirmation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { withHaptic } = useHapticFeedback()
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Récupérer les détails de la commande depuis l'état de navigation
    if (location.state) {
      const { offer, paymentMethod, customerEmail, activation } = location.state
      const orderId = `KIV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      setOrderDetails({
        orderId,
        offer,
        paymentMethod,
        customerEmail,
        orderDate: new Date(),
        activation,
        status: 'completed'
      })

      // Sauvegarder dans localStorage pour persistance
      const savedOrders = JSON.parse(localStorage.getItem('kivoro_esim_orders') || '[]')
      savedOrders.push({
        orderId,
        offer,
        paymentMethod,
        customerEmail,
        orderDate: new Date().toISOString(),
        activation,
        status: 'completed'
      })
      localStorage.setItem('kivoro_esim_orders', JSON.stringify(savedOrders))
    }
  }, [location.state])

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Commande introuvable</h3>
          <p className="text-gray-500 mb-4">Veuillez effectuer un achat d'eSIM</p>
          <motion.button
            onClick={withHaptic(() => navigate('/esim/offers'), 'medium')}
            className="bg-[#F7931A] text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Parcourir les offres
          </motion.button>
        </div>
      </div>
    )
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copié dans le presse-papiers !`)
    } catch (error) {
      toast.error('Échec de la copie dans le presse-papiers')
    }
  }

  const sendEmailReceipt = () => {
    const subject = `Confirmation d'achat eSIM - ${orderDetails.offer.country}`
    const body = `
Merci pour votre achat !

Détails de la commande :
━━━━━━━━━━━━━━━━━━━━

Numéro de commande : ${orderDetails.orderId}
Date : ${orderDetails.orderDate.toLocaleDateString('fr-FR')}

Produit eSIM :
• Pays : ${orderDetails.offer.country}
• Opérateur : ${orderDetails.offer.operator}
• Plan de données : ${orderDetails.offer.dataAmount}${orderDetails.offer.dataUnit} pour ${orderDetails.offer.validity}
• Prix : ${orderDetails.offer.price} ${orderDetails.offer.currency}

Informations d'activation :
• ICCID : ${orderDetails.activation.iccid}
• Code d'activation : ${orderDetails.activation.manual_installation.activation_code}
• Adresse SMDP : ${orderDetails.activation.smdp_address}

Instructions d'installation :
${orderDetails.activation.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Support client : support@kivoro.com
Site web : https://kivoro.com

Merci de votre confiance !
L'équipe Kivoro
    `
    
    const mailtoLink = `mailto:${orderDetails.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
    setEmailSent(true)
    toast.success('E-mail de confirmation ouvert !')
  }

  const downloadActivationDetails = () => {
    const content = `
Détails d'activation eSIM Kivoro
═══════════════════════════════

Commande : ${orderDetails.orderId}
Date : ${orderDetails.orderDate.toLocaleDateString('fr-FR')}

PRODUIT
-------
Pays : ${orderDetails.offer.country}
Opérateur : ${orderDetails.offer.operator}
Plan : ${orderDetails.offer.dataAmount}${orderDetails.offer.dataUnit} - ${orderDetails.offer.validity}

ACTIVATION
----------
ICCID : ${orderDetails.activation.iccid}
Code d'activation : ${orderDetails.activation.manual_installation.activation_code}
Code de confirmation : ${orderDetails.activation.manual_installation.confirmation_code}
Adresse SMDP : ${orderDetails.activation.smdp_address}

INSTRUCTIONS
------------
${orderDetails.activation.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Support : support@kivoro.com
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kivoro-esim-${orderDetails.orderId}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Détails d\'activation téléchargés !')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="px-4 py-6">
        {/* Header de confirmation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-400">
            Votre eSIM est prête à être activée
          </p>
        </motion.div>

        {/* Détails de la commande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Détails de la commande</h3>
            <span className="text-sm text-gray-400">#{orderDetails.orderId}</span>
          </div>

          <div className="space-y-4">
            {/* Info produit */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">{orderDetails.offer.title}</h4>
                <p className="text-gray-400 text-sm">{orderDetails.offer.country}</p>
                <p className="text-gray-500 text-xs">
                  {orderDetails.offer.dataAmount}{orderDetails.offer.dataUnit} • {orderDetails.offer.validity} • {orderDetails.offer.operator}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">
                  {orderDetails.offer.price} {orderDetails.offer.currency}
                </p>
              </div>
            </div>

            {/* Info client */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Client</h4>
                <p className="text-gray-400 text-sm">{orderDetails.customerEmail}</p>
              </div>
            </div>

            {/* Info paiement */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Paiement</h4>
                <p className="text-gray-400 text-sm">{orderDetails.paymentMethod}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Date de commande</h4>
                <p className="text-gray-400 text-sm">
                  {orderDetails.orderDate.toLocaleDateString('fr-FR')} à {orderDetails.orderDate.toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Informations d'activation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-blue-400" />
            Informations d'activation
          </h3>

          <div className="space-y-4">
            {/* ICCID */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">ICCID</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-[#0f1419] border border-gray-700 rounded-lg p-3">
                  <p className="text-white font-mono text-sm break-all">
                    {orderDetails.activation.iccid}
                  </p>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(orderDetails.activation.iccid, 'ICCID')}
                  className="p-2 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Code d'activation */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Code d'activation</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-[#0f1419] border border-gray-700 rounded-lg p-3">
                  <p className="text-white font-mono text-sm break-all">
                    {orderDetails.activation.manual_installation.activation_code}
                  </p>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(orderDetails.activation.manual_installation.activation_code, 'Code d\'activation')}
                  className="p-2 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* QR Code */}
            {orderDetails.activation.qrcode_url && (
              <div>
                <label className="text-sm text-gray-400 mb-2 block">QR Code d'activation</label>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <img 
                    src={orderDetails.activation.qrcode_url} 
                    alt="QR Code eSIM" 
                    className="w-40 h-40"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <motion.button
            onClick={sendEmailReceipt}
            className="bg-[#2d2d2d] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <span className="text-white text-sm font-medium block">
              {emailSent ? 'E-mail envoyé' : 'Envoyer par e-mail'}
            </span>
          </motion.button>

          <motion.button
            onClick={downloadActivationDetails}
            className="bg-[#2d2d2d] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <span className="text-white text-sm font-medium block">Télécharger</span>
          </motion.button>
        </motion.div>

        {/* Instructions rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <Smartphone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-medium text-sm mb-2">
                Installation rapide
              </h4>
              <ol className="text-blue-200 text-xs space-y-1">
                <li>1. Accédez aux Réglages de votre appareil</li>
                <li>2. Sélectionnez "Données mobiles" ou "Cellulaire"</li>
                <li>3. Tapez sur "Ajouter un forfait" ou "Ajouter eSIM"</li>
                <li>4. Scannez le QR code ou saisissez le code manuellement</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Boutons de navigation */}
        <div className="space-y-3">
          <motion.button
            onClick={withHaptic(() => navigate(`/esim/activation/${orderDetails.orderId}`, {
              state: { 
                offer: orderDetails.offer,
                activation: orderDetails.activation,
                orderId: orderDetails.orderId 
              }
            }), 'medium')}
            className="w-full bg-[#F7931A] hover:bg-[#FF7A00] py-4 rounded-xl font-medium text-white transition-all duration-200 shadow-lg shadow-[#F7931A]/25 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Smartphone className="w-5 h-5" />
            <span>Guide d'activation complet</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={withHaptic(() => navigate('/esim/my-esims'), 'light')}
            className="w-full bg-[#2d2d2d] border border-gray-700 hover:border-gray-600 py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <FileText className="w-5 h-5" />
            <span>Voir mes eSIMs</span>
          </motion.button>

          <motion.button
            onClick={withHaptic(() => navigate('/'), 'light')}
            className="w-full bg-transparent border border-gray-700 hover:border-gray-600 py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Home className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default eSIMConfirmation
