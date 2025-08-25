import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Mail,
  CheckCheck,
  Trash2,
  Filter,
  Settings,
  Circle
} from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface Notification {
  id: string
  type: 'trading' | 'price_alert' | 'security' | 'promotion' | 'system'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  data?: any
}

interface NotificationCenterProps {
  className?: string
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
  const { withHaptic } = useHapticFeedback()
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'trading' | 'security'>('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_alert',
      title: 'Alerte de prix BTC',
      message: 'Bitcoin a atteint votre prix cible de 45,000 $',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      priority: 'high',
      data: { symbol: 'BTC', price: 45000, target: 45000 }
    },
    {
      id: '2',
      type: 'trading',
      title: 'Opportunité de trading',
      message: 'ETH montre des signaux haussiers forts',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      priority: 'medium',
      data: { symbol: 'ETH', signal: 'bullish' }
    },
    {
      id: '3',
      type: 'security',
      title: 'Nouvelle connexion détectée',
      message: 'Connexion depuis un nouvel appareil à Paris, France',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      priority: 'high',
      data: { location: 'Paris, France', device: 'iPhone' }
    },
    {
      id: '4',
      type: 'promotion',
      title: 'Offre spéciale',
      message: 'Profitez de 50% de réduction sur les frais de trading',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: 'low',
      actionUrl: '/promotions'
    },
    {
      id: '5',
      type: 'system',
      title: 'Mise à jour système',
      message: 'Nouvelles fonctionnalités disponibles dans votre dashboard',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: false,
      priority: 'medium'
    }
  ])

  const getNotificationIcon = (type: string, priority: string) => {
    const iconProps = {
      className: `w-5 h-5 ${
        priority === 'high' ? 'text-red-500' :
        priority === 'medium' ? 'text-[#F7931A]' :
        'text-blue-500'
      }`
    }

    switch (type) {
      case 'trading':
        return <TrendingUp {...iconProps} />
      case 'price_alert':
        return <DollarSign {...iconProps} />
      case 'security':
        return <Shield {...iconProps} />
      case 'promotion':
        return <Mail {...iconProps} />
      default:
        return <Bell {...iconProps} />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      trading: 'Trading',
      price_alert: 'Prix',
      security: 'Sécurité',
      promotion: 'Promotion',
      system: 'Système'
    }
    return labels[type as keyof typeof labels] || type
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}j`
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'trading') return notification.type === 'trading' || notification.type === 'price_alert'
    if (filter === 'security') return notification.type === 'security'
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.button
          className={`relative p-2 hover:bg-gray-800 rounded-lg transition-colors ${className}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={withHaptic(() => setIsOpen(true), 'selection')}
        >
          <Bell className="w-6 h-6 text-gray-400" />
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </motion.button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-[#0a0a0a] border-gray-800 text-white w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Bell className="w-5 h-5 text-[#F7931A]" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-800">
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-700 text-white">
                <DropdownMenuItem 
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-[#2a2a2a]' : ''}
                >
                  Toutes
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setFilter('unread')}
                  className={filter === 'unread' ? 'bg-[#2a2a2a]' : ''}
                >
                  Non lues
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setFilter('trading')}
                  className={filter === 'trading' ? 'bg-[#2a2a2a]' : ''}
                >
                  Trading
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setFilter('security')}
                  className={filter === 'security' ? 'bg-[#2a2a2a]' : ''}
                >
                  Sécurité
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <SheetDescription className="text-gray-400">
            Gérez vos notifications et alertes
          </SheetDescription>
        </SheetHeader>

        {/* Actions rapides */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex-1 border-gray-700 hover:bg-gray-800"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Tout marquer lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={deleteAllRead}
            className="flex-1 border-gray-700 hover:bg-gray-800"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer lues
          </Button>
        </div>

        <Separator className="bg-gray-800 mb-4" />

        {/* Liste des notifications */}
        <div className="space-y-3 flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-400"
              >
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucune notification</p>
              </motion.div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all border ${
                      notification.isRead 
                        ? 'bg-[#1a1a1a] border-gray-800' 
                        : 'bg-[#2a2a2a] border-[#F7931A]/30'
                    }`}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id)
                      }
                      if (notification.actionUrl) {
                        // Navigate to action URL
                        console.log('Navigate to:', notification.actionUrl)
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Indicateur non lu */}
                      <div className="flex-shrink-0 pt-1">
                        {!notification.isRead && (
                          <Circle className="w-2 h-2 fill-[#F7931A] text-[#F7931A]" />
                        )}
                      </div>

                      {/* Icône */}
                      <div className="flex-shrink-0 p-2 bg-gray-800 rounded-lg">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium text-sm truncate ${
                                notification.isRead ? 'text-gray-300' : 'text-white'
                              }`}>
                                {notification.title}
                              </h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {getTypeLabel(notification.type)}
                              </Badge>
                            </div>
                            <p className={`text-sm leading-relaxed ${
                              notification.isRead ? 'text-gray-500' : 'text-gray-300'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>

                          {/* Bouton supprimer */}
                          <motion.button
                            className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer avec lien vers les paramètres */}
        <div className="pt-4 border-t border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-gray-800"
            onClick={() => {
              setIsOpen(false)
              // Navigate to notification settings
              console.log('Navigate to notification settings')
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Paramètres de notification
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationCenter
