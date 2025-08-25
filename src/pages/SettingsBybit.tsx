import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Shield,
  Lock,
  Mail,
  Smartphone,
  Key,
  ShieldCheck,
  Fingerprint,
  Eye,
  EyeOff,
  ChevronRight,
  Globe,
  Bell,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Monitor,
  Laptop
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Switch } from '../components/ui/switch'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import useHapticFeedback from '../hooks/useHapticFeedback'

const SettingsBybit: React.FC = () => {
  const { withHaptic } = useHapticFeedback()
  const navigate = useNavigate()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('fr')

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
    separator: '#3A3B3E', // Couleur des séparateurs
  }

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ]

  const securityItems = [
    {
      id: 'password',
      title: 'Changer le mot de passe',
      icon: Lock,
      hasNavigation: true,
      status: null
    },
    {
      id: 'email',
      title: 'E-mail',
      icon: Mail,
      hasNavigation: true,
      status: 'kie***@****'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: Smartphone,
      hasNavigation: true,
      status: '79****01'
    },
    {
      id: 'fund-password',
      title: 'Mot de passe des fonds',
      icon: Key,
      hasNavigation: true,
      status: 'Non configuré'
    },
    {
      id: 'anti-phishing',
      title: 'Code anti-hameçonnage',
      icon: ShieldCheck,
      hasNavigation: true,
      status: 'Pas encore configuré'
    }
  ]

  const advancedSecurityItems = [
    {
      id: 'passkeys',
      title: 'Clés d\'accès',
      icon: Fingerprint,
      hasNavigation: true,
      status: null
    },
    {
      id: 'withdrawal-security',
      title: 'Sécurité des retraits',
      icon: Shield,
      hasNavigation: true,
      status: null
    },
    {
      id: 'app-lock',
      title: 'Verrouillage de l\'app',
      icon: Lock,
      hasNavigation: true,
      status: null
    }
  ]

  const accountItems = [
    {
      id: 'trusted-devices',
      title: 'Appareils de confiance',
      icon: Monitor,
      hasNavigation: true,
      status: null
    },
    {
      id: 'account-settings',
      title: 'Paramètres du compte',
      icon: SettingsIcon,
      hasNavigation: true,
      status: null
    }
  ]

  const renderSecurityGroup = (title: string, items: any[], delay: number) => (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {title && (
        <h3 className="text-sm font-medium mb-3 px-4" style={{ color: colors.textSecondary }}>
          {title}
        </h3>
      )}
      <Card 
        className="border-0"
        style={{ backgroundColor: colors.cardBg }}
      >
        {items.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.button
              key={item.id}
              className="w-full flex items-center justify-between p-4 transition-colors"
              style={{ 
                borderBottom: index < items.length - 1 ? `1px solid ${colors.separator}` : 'none'
              }}
              whileHover={{ backgroundColor: colors.cardBgSecondary }}
              whileTap={{ scale: 0.98 }}
              onClick={withHaptic(() => console.log(item.title), 'selection')}
            >
              <div className="flex items-center gap-3">
                <IconComponent 
                  className="w-5 h-5" 
                  style={{ color: colors.textSecondary }}
                />
                <div className="text-left">
                  <span style={{ color: colors.textPrimary }}>
                    {item.title}
                  </span>
                  {item.status && (
                    <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                      {item.status}
                    </p>
                  )}
                </div>
              </div>
              {item.hasNavigation && (
                <ChevronRight 
                  className="w-4 h-4" 
                  style={{ color: colors.textSecondary }}
                />
              )}
            </motion.button>
          )
        })}
      </Card>
    </motion.div>
  )

  return (
    <div 
      className="min-h-screen text-white"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-4 pt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={withHaptic(() => navigate('/profile'), 'selection')}
          >
            <ArrowLeft className="w-6 h-6" style={{ color: colors.textPrimary }} />
          </motion.button>
          <h1 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
            Sécurité
          </h1>
        </div>
      </motion.div>

      {/* Informations de sécurité récentes */}
      <motion.div 
        className="px-4 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              Dernière connexion
            </span>
            <span className="text-sm" style={{ color: colors.textPrimary }}>
              Aujourd'hui, 14:30
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              Appareil de connexion
            </span>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4" style={{ color: colors.textSecondary }} />
              <span className="text-sm" style={{ color: colors.textPrimary }}>
                pc
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              Niveau de sécurité
            </span>
            <div className="flex items-center gap-2">
              <Badge 
                className="text-xs px-2 py-1 rounded-md"
                style={{ 
                  backgroundColor: colors.green,
                  color: colors.textPrimary,
                  border: 'none'
                }}
              >
                Élevé
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-4">
        {/* Paramètres d'accès et d'identification */}
        {renderSecurityGroup('', securityItems, 0.2)}

        {/* Authentification 2FA avec toggle */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            className="border-0"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" style={{ color: colors.textSecondary }} />
                  <span style={{ color: colors.textPrimary }}>
                    Authentification Google 2FA
                  </span>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                  style={{
                    backgroundColor: twoFactorEnabled ? colors.orange : colors.cardBgSecondary
                  }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sécurité avancée */}
        {renderSecurityGroup('', advancedSecurityItems, 0.4)}

        {/* Gestion du compte */}
        {renderSecurityGroup('', accountItems, 0.5)}

        {/* Section Langue */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card 
            className="border-0"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5" style={{ color: colors.accent }} />
                <div>
                  <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
                    Langue
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Choisissez votre langue préférée
                  </p>
                </div>
              </div>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger 
                  className="w-full border-0"
                  style={{ backgroundColor: colors.cardBgSecondary, color: colors.textPrimary }}
                >
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent 
                  className="border-0"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  {languages.map((language) => (
                    <SelectItem 
                      key={language.code} 
                      value={language.code}
                      className="focus:bg-opacity-20"
                      style={{ 
                        color: colors.textPrimary,
                        backgroundColor: 'transparent'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Section Notifications avec toggle */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card 
            className="border-0"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" style={{ color: colors.accent }} />
                  <div>
                    <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
                      Notifications
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Activer/désactiver les notifications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  style={{
                    backgroundColor: notificationsEnabled ? colors.orange : colors.cardBgSecondary
                  }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bouton de déconnexion */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700 text-white border-0"
            onClick={withHaptic(() => console.log('Déconnexion'), 'selection')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </motion.div>

        {/* Espace pour la navigation en bas */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}

export default SettingsBybit
