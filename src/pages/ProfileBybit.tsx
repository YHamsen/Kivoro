import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Camera,
  ChevronRight,
  Star,
  Gift,
  Shield,
  Users,
  Gamepad2,
  Bell,
  Settings,
  HelpCircle,
  ThumbsUp,
  MessageCircle,
  Headphones
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import useHapticFeedback from '../hooks/useHapticFeedback'

const ProfileBybit: React.FC = () => {
  const { withHaptic } = useHapticFeedback()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  // Couleurs inspirées de Bybit
  const colors = {
    background: '#0A0B0D', // Fond principal très sombre
    cardBg: '#1C1E20', // Fond des cartes
    cardBgSecondary: '#2C2D30', // Fond des cartes secondaires
    textPrimary: '#FFFFFF', // Texte principal
    textSecondary: '#B0B0B0', // Texte secondaire
    accent: '#F6C13F', // Jaune/or principal de Bybit
    green: '#00C46B', // Vert pour les statuts positifs
    orange: '#FF9500', // Orange pour les toggles
  }

  const quickActions = [
    {
      id: 'security',
      title: 'Sécurité',
      icon: Shield,
      color: colors.accent,
      badge: null
    },
    {
      id: 'invite',
      title: 'Parrainage',
      icon: Users,
      color: colors.accent,
      badge: '€1,717'
    },
    {
      id: 'demo',
      title: 'Démo Trading',
      icon: Gamepad2,
      color: colors.accent,
      badge: null
    },
    {
      id: 'support',
      title: 'Support',
      icon: Headphones,
      color: colors.accent,
      badge: null
    }
  ]

  const rewards = [
    {
      id: 'airdrop',
      amount: '5 USDT',
      type: 'Airdrop',
      description: 'Invitez des amis pour emprunter 50€ ou plus',
      icon: '🪂',
      action: 'claim'
    },
    {
      id: 'position',
      amount: '500 USDT',
      type: 'Position Airdrop',
      description: 'Déposez ≥ 100 USDT',
      icon: '🪂',
      action: 'accept'
    }
  ]

  const supportItems = [
    {
      id: 'help',
      title: 'Centre d\'aide & Contact',
      icon: Headphones,
      color: colors.accent
    },
    {
      id: 'about',
      title: 'À propos',
      icon: HelpCircle,
      color: colors.accent
    },
    {
      id: 'rate',
      title: 'Noter l\'application',
      icon: ThumbsUp,
      color: colors.accent
    },
    {
      id: 'community',
      title: 'Rejoindre notre communauté',
      icon: MessageCircle,
      color: colors.accent
    }
  ]

  return (
    <div 
      className="min-h-screen text-white"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header avec navigation */}
      <motion.div 
        className="flex items-center justify-between p-4 pt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={withHaptic(() => console.log('Retour'), 'selection')}
        >
          <ArrowLeft className="w-6 h-6" style={{ color: colors.textPrimary }} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={withHaptic(() => console.log('Paramètres'), 'selection')}
        >
          <Settings className="w-6 h-6" style={{ color: colors.textPrimary }} />
        </motion.button>
      </motion.div>

      {/* Section Profil */}
      <motion.div 
        className="px-4 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2" style={{ borderColor: colors.accent }}>
              <AvatarImage src="/api/placeholder/64/64" alt="Profile" />
              <AvatarFallback 
                className="text-black text-lg font-bold"
                style={{ backgroundColor: colors.accent }}
              >
                KV
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              kie***@****
            </h1>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              UID: 123456789
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                className="text-xs px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: colors.cardBgSecondary,
                  color: colors.textPrimary,
                  border: 'none'
                }}
              >
                Non-VIP
              </Badge>
              <Badge 
                className="text-xs px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: colors.cardBgSecondary,
                  color: colors.textPrimary,
                  border: 'none'
                }}
              >
                Compte Principal
              </Badge>
              <Badge 
                className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                style={{ 
                  backgroundColor: colors.green,
                  color: colors.textPrimary,
                  border: 'none'
                }}
              >
                <span>✓</span>
                ID Vérifié
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Promotion VIP */}
      <motion.div 
        className="px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card 
          className="p-4 border-0"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Déposez 49,999 USDT pour devenir VIP 1
              </p>
              <div className="flex items-center gap-3">
                <Button 
                  className="px-4 py-2 rounded-lg font-medium text-black"
                  style={{ backgroundColor: colors.accent }}
                  onClick={withHaptic(() => console.log('Déposer'), 'selection')}
                >
                  Déposer Maintenant
                </Button>
                <button 
                  className="text-sm flex items-center gap-1"
                  style={{ color: colors.accent }}
                  onClick={withHaptic(() => console.log('Avantages VIP'), 'selection')}
                >
                  Avantages VIP
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2" style={{ borderColor: colors.cardBgSecondary }}>
              <span className="text-xs" style={{ color: colors.textSecondary }}>0%</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Actions rapides */}
      <motion.div 
        className="px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <motion.div
                key={action.id}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="p-4 border-0 flex flex-col items-center text-center cursor-pointer"
                  style={{ backgroundColor: colors.cardBg }}
                  onClick={withHaptic(() => console.log(action.title), 'selection')}
                >
                  <IconComponent 
                    className="w-6 h-6 mb-2" 
                    style={{ color: action.color }}
                  />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>
                    {action.title}
                  </span>
                </Card>
                {action.badge && (
                  <div 
                    className="absolute -top-2 -right-2 px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ backgroundColor: colors.accent, color: '#000' }}
                  >
                    {action.badge}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Section Récompenses */}
      <motion.div 
        className="px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
            Mes Récompenses
          </h2>
          <button 
            className="text-sm flex items-center gap-1"
            style={{ color: colors.accent }}
            onClick={withHaptic(() => console.log('Réclamer'), 'selection')}
          >
            Réclamer
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Card 
          className="p-4 border-0 mb-3"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift style={{ color: colors.accent }} className="w-5 h-5" />
              <span style={{ color: colors.textPrimary }}>2 Récompenses à réclamer</span>
            </div>
            <button 
              className="text-sm"
              style={{ color: colors.accent }}
              onClick={withHaptic(() => console.log('Réclamer tout'), 'selection')}
            >
              Réclamer →
            </button>
          </div>
        </Card>

        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            className="mb-3"
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              className="p-4 border-0"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-bold"
                        style={{ color: colors.accent }}
                      >
                        {reward.amount}
                      </span>
                      <span 
                        className="text-xs"
                        style={{ color: colors.textSecondary }}
                      >
                        {reward.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    className="text-xs mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    {reward.description}
                  </p>
                  {reward.action === 'accept' && (
                    <Button 
                      size="sm"
                      className="px-3 py-1 text-xs"
                      style={{ 
                        backgroundColor: colors.cardBgSecondary,
                        color: colors.textPrimary
                      }}
                      onClick={withHaptic(() => console.log('Accepter'), 'selection')}
                    >
                      Accepter
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <button 
          className="w-full text-center text-sm py-2"
          style={{ color: colors.accent }}
          onClick={withHaptic(() => console.log('Voir plus'), 'selection')}
        >
          Voir plus de tâches →
        </button>
      </motion.div>

      {/* Section Support Client */}
      <motion.div 
        className="px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.textPrimary }}>
          Support Client
        </h2>
        
        <Card 
          className="border-0"
          style={{ backgroundColor: colors.cardBg }}
        >
          {supportItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.button
                key={item.id}
                className="w-full flex items-center justify-between p-4 transition-colors"
                style={{ 
                  borderBottom: index < supportItems.length - 1 ? `1px solid ${colors.cardBgSecondary}` : 'none'
                }}
                whileHover={{ backgroundColor: colors.cardBgSecondary }}
                whileTap={{ scale: 0.98 }}
                onClick={withHaptic(() => console.log(item.title), 'selection')}
              >
                <div className="flex items-center gap-3">
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: item.color }}
                  />
                  <span style={{ color: colors.textPrimary }}>
                    {item.title}
                  </span>
                </div>
                <ChevronRight 
                  className="w-4 h-4" 
                  style={{ color: colors.textSecondary }}
                />
              </motion.button>
            )
          })}
        </Card>
      </motion.div>

      {/* Espace pour la navigation en bas */}
      <div className="h-20"></div>
    </div>
  )
}

export default ProfileBybit
