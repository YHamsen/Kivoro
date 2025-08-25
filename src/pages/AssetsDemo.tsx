import React from 'react'
import { Toaster } from 'react-hot-toast'
import AssetsSection from '../components/assets/AssetsSection'

/**
 * Page de démonstration de la section Assets
 * Cette page peut être utilisée pour tester et présenter la nouvelle section
 */
const AssetsDemo: React.FC = () => {
  
  const handleAssetAction = (actionId: string) => {
    console.log('🎯 Action Assets:', actionId)
    
    // En production, ces actions seraient connectées aux services réels
    const actionMessages = {
      // Actions principales
      'deposit': '💰 Ouverture du module de dépôt',
      'withdraw': '💸 Ouverture du module de retrait', 
      'transfer': '📤 Ouverture du module de transfert',
      'convert': '🔄 Ouverture du convertisseur',
      
      // Carte
      'card-details': '💳 Affichage des détails de la carte',
      'add-card': '➕ Ajout d\'une nouvelle carte',
      
      // Graphiques
      'portfolio-chart': '📊 Ouverture du graphique de portefeuille',
      'detailed-chart': '📈 Affichage du graphique détaillé',
      
      // Wallets
      'wallet-alpaca': '🟢 Ouverture du wallet Alpaca Trading',
      'wallet-bybit': '🟡 Ouverture du wallet Bybit',
      'wallet-okx': '🔵 Ouverture du wallet OKX',
      'wallet-binance': '🟨 Ouverture du wallet Binance',
      'wallet-bank-card': '💳 Gestion de la carte bancaire',
      
      // Trading
      'alpaca-trade': '📈 Interface de trading Alpaca',
      'bybit-trade': '📈 Interface de trading Bybit', 
      'okx-trade': '📈 Interface de trading OKX',
      'binance-trade': '📈 Interface de trading Binance',
      
      // Détails
      'alpaca-details': '📋 Détails du wallet Alpaca',
      'bybit-details': '📋 Détails du wallet Bybit',
      'okx-details': '📋 Détails du wallet OKX',
      'binance-details': '📋 Détails du wallet Binance',
      
      // Gestion des wallets
      'add-wallet': '🔗 Connexion d\'un nouvel exchange',
      
      // Actions rapides
      'express-transfer': '⚡ Transfert express activé',
      'recurring-payments': '🔄 Configuration des paiements récurrents',
      'quick-deposit-50': '💰 Dépôt rapide de €50',
      'quick-deposit-100': '💰 Dépôt rapide de €100', 
      'quick-deposit-500': '💰 Dépôt rapide de €500',
      
      // Système
      'refresh': '🔄 Actualisation des données'
    }
    
    const message = actionMessages[actionId as keyof typeof actionMessages] || `Action: ${actionId}`
    
    // Simuler une notification
    if (typeof window !== 'undefined') {
      console.log(message)
      // Dans votre application, utilisez toast.success(message) ou votre système de notification
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page de démonstration de la section Assets */}
      <AssetsSection onAction={handleAssetAction} />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #F7931A'
          }
        }}
      />
    </div>
  )
}

export default AssetsDemo
