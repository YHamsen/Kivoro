# Section Assets - Documentation

## Vue d'ensemble

La section Assets est un composant complet qui regroupe toutes les fonctionnalités de gestion des actifs et portefeuilles de l'application Kivoro Multi-Wallet. Elle respecte fidèlement le design visuel fourni et utilise les couleurs de l'application.

## Composants Créés

### 1. `AssetsSection` (Composant Principal)
Le composant principal qui orchestre toute la section Assets.

**Fonctionnalités:**
- En-tête avec navigation et contrôles
- Affichage/masquage des soldes
- Actualisation des données
- Navigation entre onglets Account/Asset

### 2. `AssetTotalCard`
Carte d'affichage du total des actifs avec graphique de performance.

**Fonctionnalités:**
- Affichage du solde total en multiple devises (EUR, USD, XOF, GBP, RUB)
- Équivalent BTC
- Variations 24h avec indicateurs visuels
- Graphique de performance animé
- Sélecteur de devise avec dropdown

### 3. `MyCardSection`
Section de gestion des cartes bancaires avec design fidèle à l'image.

**Fonctionnalités:**
- Carte bancaire stylisée avec gradient et pattern
- Masquage/affichage du numéro de carte
- Informations de carte (titulaire, expiration, solde)
- Logo Mastercard
- Statut de carte (Active)
- Fonctionnalités à venir (Carte virtuelle, carte physique)
- Bouton d'ajout de nouvelle carte

### 4. `QuickActionsAssets`
Grille d'actions rapides pour les opérations financières.

**Actions principales:**
- **Dépôt** - Ajouter des fonds
- **Retrait** - Retirer des fonds  
- **Transfert** - Envoyer à un ami
- **Convertir** - Échanger des devises

**Actions supplémentaires:**
- Transfert Express (instantané)
- Paiements Récurrents (automatiques)
- Raccourcis de dépôt rapide (€50, €100, €500)

### 5. `MultiWalletSection`
Gestion des portefeuilles multi-exchanges avec priorisation selon vos spécifications.

**Portefeuilles prioritaires:**
1. **Alpaca Trading** - Forex & Actions US (vert)
2. **Bybit Exchange** - Crypto, Futures, Options (jaune)
3. **OKX Exchange** - Crypto, DeFi, NFT (bleu) 
4. **Binance Exchange** - Crypto, Staking, Launchpad (jaune)
5. **Carte Bancaire** - Paiements, Retraits (gris - bientôt disponible)

**Fonctionnalités par wallet:**
- Soldes et variations 24h
- Statut (Actif/Maintenance/Bientôt)
- Fonctionnalités spécifiques
- Actions rapides (Trading, Détails)
- Vue expansible avec détails

### 6. `AssetPortfolioStats`
Statistiques et analyses avancées du portefeuille.

**Métriques:**
- Profit total avec variations
- Meilleur actif performant
- Diversification (nombre d'actifs)
- Taux de réussite des trades

**Analyses:**
- Répartition des actifs par catégorie
- Graphique d'allocation visuel
- Historique des performances
- Insights automatiques

## Fonctionnalités Supplémentaires Ajoutées

### 1. Compte d'Épargne
- Rendement 4.5% APY
- Suivi des gains mensuels

### 2. Staking
- Support pour 3 actifs en staking
- Rendement 8.2% APY

### 3. Prêt DeFi
- Intégration Compound & Aave
- Rendement 12.8% APY

### 4. Sécurité
- Configuration 2FA
- Gestion des paramètres de sécurité

### 5. Alertes Prix
- 5 alertes actives
- Notifications push

## Utilisation

### Import
```typescript
import { AssetsSection } from '../components/assets'
// ou
import AssetsSection from '../components/assets/AssetsSection'
```

### Implémentation de base
```typescript
import React from 'react'
import AssetsSection from './components/assets/AssetsSection'

const App = () => {
  const handleAction = (actionId: string) => {
    console.log('Action:', actionId)
    // Gérer les actions selon l'ID
  }

  return (
    <AssetsSection onAction={handleAction} />
  )
}
```

### Gestion des Actions
Le composant émet des événements via la prop `onAction`. Principales actions:

**Gestion des fonds:**
- `deposit` - Ouvrir modal de dépôt
- `withdraw` - Ouvrir modal de retrait
- `transfer` - Ouvrir modal de transfert
- `convert` - Ouvrir convertisseur

**Cartes:**
- `card-details` - Afficher détails de carte
- `add-card` - Ajouter nouvelle carte

**Wallets:**
- `wallet-{exchange}` - Ouvrir wallet spécifique
- `{exchange}-trade` - Ouvrir trading pour l'exchange
- `add-wallet` - Connecter nouvel exchange

**Autres:**
- `refresh` - Actualiser les données
- `portfolio-chart` - Ouvrir graphiques détaillés

## Couleurs et Thème

Le composant utilise les couleurs définies dans `/constants/colors.ts`:

- **Primaire:** `#F7931A` (Orange Bitcoin)
- **Arrière-plan:** `#0a0a0a` (Noir profond)
- **Cartes:** `#1a1a1a` (Gris foncé)
- **Contrôles:** `#2a2a2a` (Gris moyen)
- **Succès:** `#22c55e` (Vert)
- **Erreur:** `#ef4444` (Rouge)

## Responsive Design

- Interface optimisée mobile-first
- Grilles adaptatives (2-4 colonnes selon le contenu)
- Animations fluides avec Framer Motion
- Support du feedback haptique

## Animations et UX

- **Framer Motion** pour toutes les animations
- **Feedback haptique** via `useHapticFeedback`
- **Transitions fluides** entre les états
- **Indicateurs de chargement** animés
- **Hover effects** sur tous les éléments interactifs

## Intégration

Pour intégrer dans votre application existante:

1. Importez le composant principal
2. Gérez les actions via la prop `onAction`
3. Connectez aux services de données existants
4. Configurez la navigation selon vos routes

Exemple complet disponible dans `AssetsSectionExample.tsx`.
