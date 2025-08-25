import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

interface LanguageContextType {
  currentLanguage: string
  languages: Language[]
  changeLanguage: (languageCode: string) => void
  t: (key: string, fallback?: string) => string
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', nativeName: '中文 (简体)', flag: '🇨🇳' },
]

// Dictionnaire de traductions basique
const translations: Record<string, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.markets': 'Marchés',
    'nav.trade': 'Trading',
    'nav.earn': 'Gains',
    'nav.profile': 'Profil',
    
    // Profil
    'profile.title': 'Profil',
    'profile.personalInfo': 'Informations personnelles',
    'profile.security': 'Sécurité',
    'profile.notifications': 'Notifications',
    'profile.language': 'Langue',
    'profile.help': 'Aide et support',
    'profile.logout': 'Se déconnecter',
    'profile.verified': 'Vérifié',
    'profile.premium': 'Premium',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.settings': 'Paramètres de notification',
    'notifications.enable': 'Activer les notifications',
    'notifications.sound': 'Son',
    'notifications.vibration': 'Vibration',
    'notifications.quietHours': 'Heures silencieuses',
    'notifications.trading': 'Alertes de trading',
    'notifications.priceAlerts': 'Alertes de prix',
    'notifications.security': 'Sécurité',
    'notifications.promotions': 'Promotions et actualités',
    
    // Général
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.settings': 'Paramètres',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.markets': 'Markets',
    'nav.trade': 'Trade',
    'nav.earn': 'Earn',
    'nav.profile': 'Profile',
    
    // Profile
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.security': 'Security',
    'profile.notifications': 'Notifications',
    'profile.language': 'Language',
    'profile.help': 'Help & Support',
    'profile.logout': 'Log Out',
    'profile.verified': 'Verified',
    'profile.premium': 'Premium',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.settings': 'Notification Settings',
    'notifications.enable': 'Enable Notifications',
    'notifications.sound': 'Sound',
    'notifications.vibration': 'Vibration',
    'notifications.quietHours': 'Quiet Hours',
    'notifications.trading': 'Trading Alerts',
    'notifications.priceAlerts': 'Price Alerts',
    'notifications.security': 'Security',
    'notifications.promotions': 'Promotions & News',
    
    // General
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.settings': 'Settings',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.markets': 'Mercados',
    'nav.trade': 'Comerciar',
    'nav.earn': 'Ganar',
    'nav.profile': 'Perfil',
    
    // Profile
    'profile.title': 'Perfil',
    'profile.personalInfo': 'Información Personal',
    'profile.security': 'Seguridad',
    'profile.notifications': 'Notificaciones',
    'profile.language': 'Idioma',
    'profile.help': 'Ayuda y Soporte',
    'profile.logout': 'Cerrar Sesión',
    'profile.verified': 'Verificado',
    'profile.premium': 'Premium',
    
    // Notifications
    'notifications.title': 'Notificaciones',
    'notifications.settings': 'Configuración de Notificaciones',
    'notifications.enable': 'Activar Notificaciones',
    'notifications.sound': 'Sonido',
    'notifications.vibration': 'Vibración',
    'notifications.quietHours': 'Horas Silenciosas',
    'notifications.trading': 'Alertas de Trading',
    'notifications.priceAlerts': 'Alertas de Precio',
    'notifications.security': 'Seguridad',
    'notifications.promotions': 'Promociones y Noticias',
    
    // General
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.settings': 'Configuración',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.markets': 'Рынки',
    'nav.trade': 'Торговля',
    'nav.earn': 'Заработок',
    'nav.profile': 'Профиль',
    
    // Profile
    'profile.title': 'Профиль',
    'profile.personalInfo': 'Личная информация',
    'profile.security': 'Безопасность',
    'profile.notifications': 'Уведомления',
    'profile.language': 'Язык',
    'profile.help': 'Помощь и поддержка',
    'profile.logout': 'Выйти',
    'profile.verified': 'Подтвержден',
    'profile.premium': 'Премиум',
    
    // Notifications
    'notifications.title': 'Уведомления',
    'notifications.settings': 'Настройки уведомлений',
    'notifications.enable': 'Включить уведомления',
    'notifications.sound': 'Звук',
    'notifications.vibration': 'Вибрация',
    'notifications.quietHours': 'Тихие часы',
    'notifications.trading': 'Торговые уведомления',
    'notifications.priceAlerts': 'Ценовые уведомления',
    'notifications.security': 'Безопасность',
    'notifications.promotions': 'Акции и новости',
    
    // General
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.settings': 'Настройки',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.markets': '市场',
    'nav.trade': '交易',
    'nav.earn': '收益',
    'nav.profile': '个人资料',
    
    // Profile
    'profile.title': '个人资料',
    'profile.personalInfo': '个人信息',
    'profile.security': '安全',
    'profile.notifications': '通知',
    'profile.language': '语言',
    'profile.help': '帮助与支持',
    'profile.logout': '退出登录',
    'profile.verified': '已验证',
    'profile.premium': '高级版',
    
    // Notifications
    'notifications.title': '通知',
    'notifications.settings': '通知设置',
    'notifications.enable': '启用通知',
    'notifications.sound': '声音',
    'notifications.vibration': '振动',
    'notifications.quietHours': '静音时间',
    'notifications.trading': '交易提醒',
    'notifications.priceAlerts': '价格提醒',
    'notifications.security': '安全',
    'notifications.promotions': '促销和新闻',
    
    // General
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.settings': '设置',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('fr')

  useEffect(() => {
    // Charger la langue depuis le localStorage
    const savedLanguage = localStorage.getItem('kivoro-language')
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode)
    if (language) {
      setCurrentLanguage(languageCode)
      localStorage.setItem('kivoro-language', languageCode)
      
      // Optionnel: recharger la page pour appliquer les changements
      // window.location.reload()
    }
  }

  const t = (key: string, fallback?: string): string => {
    const translation = translations[currentLanguage]?.[key]
    return translation || fallback || key
  }

  const value: LanguageContextType = {
    currentLanguage,
    languages,
    changeLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default useLanguage
