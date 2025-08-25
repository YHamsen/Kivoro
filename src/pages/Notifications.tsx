import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  ArrowLeft, 
  Volume2, 
  Vibrate, 
  TrendingUp, 
  DollarSign,
  Shield,
  Mail,
  Smartphone,
  Clock,
  Settings
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'
import { Separator } from '../components/ui/separator'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface NotificationSetting {
  id: string
  title: string
  description: string
  icon: React.ElementType
  enabled: boolean
  options?: {
    email?: boolean
    push?: boolean
    sms?: boolean
  }
}

const Notifications: React.FC = () => {
  const navigate = useNavigate()
  const { withHaptic } = useHapticFeedback()
  
  const [globalNotifications, setGlobalNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [volume, setVolume] = useState([70])
  const [quietHours, setQuietHours] = useState(false)
  const [quietStartTime, setQuietStartTime] = useState('22:00')
  const [quietEndTime, setQuietEndTime] = useState('08:00')

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'trading',
      title: 'Alertes de trading',
      description: 'Notifications sur les mouvements de prix et les opportunités',
      icon: TrendingUp,
      enabled: true,
      options: { email: true, push: true, sms: false }
    },
    {
      id: 'price_alerts',
      title: 'Alertes de prix',
      description: 'Notifications quand vos cryptos atteignent un prix cible',
      icon: DollarSign,
      enabled: true,
      options: { email: true, push: true, sms: true }
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Connexions, modifications de compte et activités suspectes',
      icon: Shield,
      enabled: true,
      options: { email: true, push: true, sms: true }
    },
    {
      id: 'promotions',
      title: 'Promotions et actualités',
      description: 'Offres spéciales et mises à jour du marché',
      icon: Mail,
      enabled: false,
      options: { email: false, push: false, sms: false }
    }
  ])

  const updateNotificationSetting = (id: string, enabled: boolean) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled } : setting
      )
    )
  }

  const updateNotificationOption = (id: string, option: string, value: boolean) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { 
              ...setting, 
              options: { 
                ...setting.options, 
                [option]: value 
              } 
            } 
          : setting
      )
    )
  }

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { value: `${hour}:00`, label: `${hour}:00` }
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <motion.div 
        className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={withHaptic(() => navigate(-1), 'selection')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Bell className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-gray-400">Gérez vos préférences de notification</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Contrôles généraux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#1a1a1a] border-gray-800">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#F7931A]" />
                Paramètres généraux
              </h3>
              
              <div className="space-y-4">
                {/* Notifications globales */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Activer les notifications</p>
                    <p className="text-sm text-gray-400">Contrôle principal des notifications</p>
                  </div>
                  <Switch
                    checked={globalNotifications}
                    onCheckedChange={setGlobalNotifications}
                  />
                </div>

                <Separator className="bg-gray-800" />

                {/* Son */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Son</p>
                      <p className="text-sm text-gray-400">Sons de notification</p>
                    </div>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    disabled={!globalNotifications}
                  />
                </div>

                {/* Volume */}
                {soundEnabled && globalNotifications && (
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Volume</span>
                      <span className="text-sm text-[#F7931A]">{volume[0]}%</span>
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                <Separator className="bg-gray-800" />

                {/* Vibration */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Vibrate className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Vibration</p>
                      <p className="text-sm text-gray-400">Vibration pour les notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={vibrationEnabled}
                    onCheckedChange={setVibrationEnabled}
                    disabled={!globalNotifications}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Heures silencieuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#1a1a1a] border-gray-800">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Heures silencieuses</p>
                    <p className="text-sm text-gray-400">Désactiver les notifications pendant certaines heures</p>
                  </div>
                </div>
                <Switch
                  checked={quietHours}
                  onCheckedChange={setQuietHours}
                  disabled={!globalNotifications}
                />
              </div>

              {quietHours && globalNotifications && (
                <div className="grid grid-cols-2 gap-4 ml-8">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Début</label>
                    <Select value={quietStartTime} onValueChange={setQuietStartTime}>
                      <SelectTrigger className="bg-[#2a2a2a] border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-gray-700">
                        {timeOptions.map(time => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Fin</label>
                    <Select value={quietEndTime} onValueChange={setQuietEndTime}>
                      <SelectTrigger className="bg-[#2a2a2a] border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-gray-700">
                        {timeOptions.map(time => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Types de notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Types de notifications</h3>
          <div className="space-y-4">
            {notificationSettings.map((setting, index) => {
              const IconComponent = setting.icon
              return (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-[#1a1a1a] border-gray-800">
                    <div className="p-4 space-y-4">
                      {/* Header de la section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#F7931A]/10 rounded-lg">
                            <IconComponent className="w-5 h-5 text-[#F7931A]" />
                          </div>
                          <div>
                            <p className="font-medium">{setting.title}</p>
                            <p className="text-sm text-gray-400">{setting.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={(enabled) => updateNotificationSetting(setting.id, enabled)}
                          disabled={!globalNotifications}
                        />
                      </div>

                      {/* Options de canal */}
                      {setting.enabled && globalNotifications && setting.options && (
                        <div className="ml-8 space-y-3">
                          <p className="text-sm font-medium text-gray-300">Canaux de notification :</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={setting.options.email || false}
                                onCheckedChange={(value) => updateNotificationOption(setting.id, 'email', value)}
                              />
                              <span className="text-sm">Email</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={setting.options.push || false}
                                onCheckedChange={(value) => updateNotificationOption(setting.id, 'push', value)}
                              />
                              <span className="text-sm">Push</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={setting.options.sms || false}
                                onCheckedChange={(value) => updateNotificationOption(setting.id, 'sms', value)}
                              />
                              <span className="text-sm">SMS</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button 
            className="w-full bg-[#F7931A] hover:bg-[#F7931A]/90 text-black font-medium"
            onClick={withHaptic(() => console.log('Sauvegarder'), 'selection')}
          >
            Sauvegarder les paramètres
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={withHaptic(() => console.log('Test notification'), 'selection')}
          >
            Envoyer une notification de test
          </Button>
        </motion.div>

        {/* Espace pour la navigation en bas */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}

export default Notifications
