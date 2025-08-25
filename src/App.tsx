import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import P2P from './pages/P2P'
import P2POfferDetails from './pages/P2POfferDetails'
import TradingLive from './pages/TradingLive'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import SettingsBybit from './pages/SettingsBybit'
import Notifications from './pages/Notifications'
import Assets from './pages/Assets'
import MultiWallet from './pages/MultiWallet'
import ESIMOffersComplete from './pages/esim/eSIMOffersComplete'
import ESIMDetailsComplete from './pages/esim/eSIMDetailsComplete'
import ESIMPayment from './pages/esim/eSIMPayment'
import ESIMConfirmation from './pages/esim/eSIMConfirmation'
import ESIMActivation from './pages/esim/eSIMActivation'
import MyESIMs from './pages/esim/MyESIMs'
// Nouvelles pages eSIM optimisées
import ESIMOffersOptimized from './pages/esim/eSIMOffersOptimized'
import ESIMDetailsOptimized from './pages/esim/eSIMDetailsOptimized'
import ESIMCompare from './pages/esim/eSIMCompare'
// Nouvelles pages eSIM améliorées
import CountrySelector from './pages/esim/CountrySelector'
import ESIMCountryOffers from './pages/esim/eSIMCountryOffers'
import BybitSpot from './pages/BybitSpot'
import OKXSpot from './pages/OKXSpot'
import BinanceSpot from './pages/BinanceSpot'
import DepositFiat from './pages/DepositFiat'
import OneClickBuy from './pages/OneClickBuy'
import DepositCrypto from './pages/DepositCrypto'
// Nouvelles pages pour les signaux
import ForexSignals from './pages/ForexSignals'
import CryptoAISignals from './pages/CryptoAISignals'
import SignalsDemo from './pages/SignalsDemo'
import ForexCourse from './pages/ForexCourse'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/markets" element={<Dashboard />} />
            <Route path="/trade" element={<Dashboard />} />
            <Route path="/earn" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/multi-wallet" element={<MultiWallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsBybit />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/p2p" element={<P2P />} />
            <Route path="/p2p/offer/:offerId" element={<P2POfferDetails />} />
            <Route path="/trading-live" element={<TradingLive />} />
            <Route path="/bybit-spot" element={<BybitSpot />} />
            <Route path="/okx-spot" element={<OKXSpot />} />
            <Route path="/binance-spot" element={<BinanceSpot />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Signals Routes */}
            <Route path="/signals-demo" element={<SignalsDemo />} />
            <Route path="/forex-signals" element={<ForexSignals />} />
            <Route path="/crypto-ai-signals" element={<CryptoAISignals />} />
            <Route path="/forex-course" element={<ForexCourse />} />
            
            {/* Buy/Deposit Flow Routes */}
            <Route path="/deposit/fiat" element={<DepositFiat />} />
            <Route path="/buy/one-click" element={<OneClickBuy />} />
            <Route path="/deposit/crypto" element={<DepositCrypto />} />
            
            {/* eSIM Flow Routes */}
            <Route path="/esim/offers" element={<ESIMOffersComplete />} />
            <Route path="/esim/details/:countryCode" element={<ESIMDetailsComplete />} />
            <Route path="/esim/payment/:packageId" element={<ESIMPayment />} />
            <Route path="/esim/confirmation" element={<ESIMConfirmation />} />
            <Route path="/esim/activation/:orderId" element={<ESIMActivation />} />
            <Route path="/esim/my-esims" element={<MyESIMs />} />
            
            {/* eSIM Optimized Routes */}
            <Route path="/esim/offers-optimized" element={<ESIMOffersOptimized />} />
            <Route path="/esim/details-optimized/:offerId" element={<ESIMDetailsOptimized />} />
            <Route path="/esim/compare" element={<ESIMCompare />} />
            
            {/* eSIM Improved Routes - Nouvelle architecture hiérarchique */}
            <Route path="/esim/countries" element={<CountrySelector />} />
            <Route path="/esim/countries/:countryCode" element={<ESIMCountryOffers />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #333',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
