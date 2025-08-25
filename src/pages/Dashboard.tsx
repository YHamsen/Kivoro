import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import SearchBar from '../components/SearchBar'
import TotalAssets from '../components/TotalAssets'
import QuickActions from '../components/QuickActions'
import BannersSection from '../components/BannersSection'
import MarketTabs from '../components/MarketTabs'
import ActionsSection from '../components/ActionsSection'
import BottomNavigation from '../components/BottomNavigation'
import ActionsBottomNavigation from '../components/ActionsBottomNavigation'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'forex' | 'actions' | 'p2p'>('crypto')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className={`flex-1 ${activeTab === 'actions' ? 'pb-24' : 'pb-20'}`}> {/* Different padding for actions tab */}
        {/* Top Navigation */}
        <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'actions' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActionsSection />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search Bar */}
            <SearchBar activeTab={activeTab === 'crypto' ? 'exchange' : 'forex'} />
            
            {/* Total Assets */}
            <TotalAssets />
            
            {/* Quick Actions Grid */}
            <QuickActions activeTab={activeTab === 'crypto' ? 'exchange' : 'forex'} />
            
            {/* Banners Section */}
            <BannersSection />
            
            {/* Market Data Tabs */}
            <MarketTabs activeTab={activeTab === 'crypto' ? 'exchange' : 'forex'} />
          </motion.div>
        )}
      </div>
      
      {/* Conditional Bottom Navigation */}
      {activeTab === 'actions' ? (
        <ActionsBottomNavigation />
      ) : (
        <BottomNavigation />
      )}
    </div>
  )
}

export default Dashboard
