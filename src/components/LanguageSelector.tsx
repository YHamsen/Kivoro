import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, Download, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import useHapticFeedback from '../hooks/useHapticFeedback'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  downloadProgress?: number
  isDownloaded: boolean
  isDefault: boolean
  rtl?: boolean
}

interface LanguageSelectorProps {
  onLanguageChange?: (languageCode: string) => void
  currentLanguage?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onLanguageChange, 
  currentLanguage = 'fr' 
}) => {
  const { withHaptic } = useHapticFeedback()
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)
  const [downloadingLanguages, setDownloadingLanguages] = useState<Set<string>>(new Set())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const languages: Language[] = [
    { 
      code: 'fr', 
      name: 'Français', 
      nativeName: 'Français',
      flag: '🇫🇷', 
      isDownloaded: true, 
      isDefault: true 
    },
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸', 
      isDownloaded: true, 
      isDefault: false 
    },
    { 
      code: 'es', 
      name: 'Español', 
      nativeName: 'Español',
      flag: '🇪🇸', 
      isDownloaded: false, 
      isDefault: false 
    },
    { 
      code: 'ru', 
      name: 'Русский', 
      nativeName: 'Русский',
      flag: '🇷🇺', 
      isDownloaded: false, 
      isDefault: false 
    },
    { 
      code: 'zh', 
      name: '中文', 
      nativeName: '中文 (简体)',
      flag: '🇨🇳', 
      isDownloaded: false, 
      isDefault: false,
      rtl: false 
    }
  ]

  const [languageStates, setLanguageStates] = useState(languages)

  const handleLanguageSelect = (languageCode: string) => {
    const language = languageStates.find(lang => lang.code === languageCode)
    
    if (language?.isDownloaded) {
      setSelectedLanguage(languageCode)
      onLanguageChange?.(languageCode)
      setIsDialogOpen(false)
    } else {
      // Simuler le téléchargement de la langue
      downloadLanguage(languageCode)
    }
  }

  const downloadLanguage = async (languageCode: string) => {
    setDownloadingLanguages(prev => new Set([...prev, languageCode]))
    
    // Simuler le processus de téléchargement
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      setLanguageStates(prev => 
        prev.map(lang => 
          lang.code === languageCode 
            ? { ...lang, downloadProgress: progress }
            : lang
        )
      )
    }

    // Marquer comme téléchargé
    setLanguageStates(prev => 
      prev.map(lang => 
        lang.code === languageCode 
          ? { ...lang, isDownloaded: true, downloadProgress: undefined }
          : lang
      )
    )

    setDownloadingLanguages(prev => {
      const newSet = new Set(prev)
      newSet.delete(languageCode)
      return newSet
    })

    // Auto-sélectionner après téléchargement
    handleLanguageSelect(languageCode)
  }

  const getCurrentLanguage = () => {
    return languageStates.find(lang => lang.code === selectedLanguage)
  }

  const getDownloadedLanguagesCount = () => {
    return languageStates.filter(lang => lang.isDownloaded).length
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-gray-800 hover:bg-[#2a2a2a] transition-colors w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={withHaptic(() => setIsDialogOpen(true), 'selection')}
        >
          <div className="p-2 bg-[#F7931A]/10 rounded-lg">
            <Globe className="w-5 h-5 text-[#F7931A]" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Langue</p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCurrentLanguage()?.flag}</span>
              <span className="text-sm text-gray-400">{getCurrentLanguage()?.name}</span>
              <Badge variant="outline" className="text-xs">
                {getDownloadedLanguagesCount()}/{languageStates.length}
              </Badge>
            </div>
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#F7931A]" />
            Sélectionner une langue
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choisissez votre langue préférée. Les langues non téléchargées seront installées automatiquement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {languageStates.map((language, index) => {
            const isSelected = language.code === selectedLanguage
            const isDownloading = downloadingLanguages.has(language.code)
            
            return (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`
                    p-4 cursor-pointer transition-all border
                    ${isSelected 
                      ? 'bg-[#F7931A]/10 border-[#F7931A]' 
                      : 'bg-[#2a2a2a] border-gray-700 hover:border-gray-600'
                    }
                  `}
                  onClick={() => !isDownloading && handleLanguageSelect(language.code)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <p className="font-medium">{language.name}</p>
                        <p className="text-sm text-gray-400">{language.nativeName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {language.isDefault && (
                        <Badge variant="outline" className="text-xs border-[#F7931A] text-[#F7931A]">
                          Par défaut
                        </Badge>
                      )}
                      
                      {isDownloading ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#F7931A]" />
                          <div className="w-12">
                            <Progress 
                              value={language.downloadProgress || 0} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      ) : language.isDownloaded ? (
                        isSelected ? (
                          <div className="w-6 h-6 bg-[#F7931A] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-black" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                        )
                      ) : (
                        <div className="flex items-center gap-1 text-[#F7931A]">
                          <Download className="w-4 h-4" />
                          <span className="text-xs">Télécharger</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Langues téléchargées</span>
            <span>{getDownloadedLanguagesCount()}/{languageStates.length}</span>
          </div>
          <Progress 
            value={(getDownloadedLanguagesCount() / languageStates.length) * 100} 
            className="h-2 mt-2"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LanguageSelector
