import React, { useState } from 'react'
import TopNavigation from '../components/TopNavigation'
import BottomNavigation from '../components/BottomNavigation'
import MultiWalletDashboard from '../components/MultiWalletDashboard'
import { LanguageProvider } from '../hooks/useLanguage'

const MultiWallet: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [activeTab, setActiveTab] = useState<'crypto' | 'forex' | 'actions' | 'p2p'>('crypto')

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
        <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="pt-16">
          <MultiWalletDashboard refreshTrigger={refreshTrigger} />
        </main>

        <BottomNavigation />
      </div>
    </LanguageProvider>
  )
}

export default MultiWallet
