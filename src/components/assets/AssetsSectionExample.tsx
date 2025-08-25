import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import AssetsSection from './AssetsSection'

/**
 * Exemple d'utilisation de la section Assets
 * Ce composant montre comment intégrer la section dans votre application
 */
const AssetsSectionExample: React.FC = () => {
  
  const handleAssetAction = (actionId: string) => {
    console.log('Action déclenchée:', actionId)
    
    switch (actionId) {
      case 'deposit':
        toast.success('Ouverture du module de dépôt')
        // Ouvrir modal de dépôt
        break
        
      case 'withdraw':
        toast.success('Ouverture du module de retrait')
        // Ouvrir modal de retrait
        break
        
      case 'transfer':
        toast.success('Ouverture du module de transfert')
        // Ouvrir modal de transfert
        break
        
      case 'convert':
        toast.success('Ouverture du convertisseur')
        // Ouvrir convertisseur de devises
        break
        
      case 'card-details':
        toast.success('Affichage des détails de la carte')
        // Naviguer vers les détails de carte
        break
        
      case 'add-card':
        toast.success('Ajout d\'une nouvelle carte')
        // Ouvrir processus d'ajout de carte
        break
        
      case 'portfolio-chart':
        toast.success('Ouverture du graphique de portefeuille')
        // Naviguer vers l'analyse complète
        break
        
      case 'detailed-chart':
        toast.success('Affichage du graphique détaillé')
        // Ouvrir vue graphique étendue
        break
        
      case 'wallet-alpaca':
        toast.success('Ouverture du wallet Alpaca')
        // Naviguer vers Alpaca Trading
        break
        
      case 'wallet-bybit':
        toast.success('Ouverture du wallet Bybit')
        // Naviguer vers Bybit Exchange
        break
        
      case 'wallet-okx':
        toast.success('Ouverture du wallet OKX')
        // Naviguer vers OKX Exchange
        break
        
      case 'wallet-binance':
        toast.success('Ouverture du wallet Binance')
        // Naviguer vers Binance Exchange
        break
        
      case 'alpaca-trade':
        toast.success('Trading Alpaca')
        // Ouvrir interface de trading Alpaca
        break
        
      case 'bybit-trade':
        toast.success('Trading Bybit')
        // Ouvrir interface de trading Bybit
        break
        
      case 'okx-trade':
        toast.success('Trading OKX')
        // Ouvrir interface de trading OKX
        break
        
      case 'binance-trade':
        toast.success('Trading Binance')
        // Ouvrir interface de trading Binance
        break
        
      case 'alpaca-details':
        toast.success('Détails du wallet Alpaca')
        // Afficher détails Alpaca
        break
        
      case 'add-wallet':
        toast.success('Ajout d\'un nouveau wallet')
        // Ouvrir processus de connexion d'exchange
        break
        
      case 'express-transfer':
        toast.success('Transfert express activé')
        // Activer mode transfert rapide
        break
        
      case 'recurring-payments':
        toast.success('Configuration des paiements récurrents')
        // Ouvrir config paiements automatiques
        break
        
      case 'quick-deposit-50':
        toast.success('Dépôt rapide de €50')
        // Traitement dépôt express
        break
        
      case 'quick-deposit-100':
        toast.success('Dépôt rapide de €100')
        // Traitement dépôt express
        break
        
      case 'quick-deposit-500':
        toast.success('Dépôt rapide de €500')
        // Traitement dépôt express
        break
        
      case 'refresh':
        toast.success('Actualisation des données')
        // Rafraîchir toutes les données
        break
        
      default:
        toast(`Action: ${actionId}`)
        break
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AssetsSection onAction={handleAssetAction} />
    </div>
  )
}

export default AssetsSectionExample
