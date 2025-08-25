/**
 * Constantes pour le retour haptique dans l'application Kivoro
 * Standardise l'utilisation du useHapticFeedback hook
 */

import { HapticType } from '../hooks/useHapticFeedback'

/**
 * Types de retour haptique pour différentes interactions
 */
export const HAPTIC_TYPES: Record<string, HapticType> = {
  // Interactions légères
  LIGHT: 'light',           // Hover, petites interactions
  
  // Interactions moyennes (par défaut pour la plupart des actions)
  MEDIUM: 'medium',         // Boutons standards
  
  // Interactions importantes
  HEAVY: 'heavy',           // Actions importantes, confirmations
  
  // Sélections et navigation
  SELECTION: 'selection',   // Navigation, sélection d'éléments, tabs
  
  // Notifications importantes
  NOTIFICATION: 'notification', // Alertes, notifications importantes
} as const

/**
 * Mapping des interactions spécifiques vers les types haptiques
 */
export const INTERACTION_HAPTICS = {
  // Navigation
  navigationTab: HAPTIC_TYPES.SELECTION,
  navigationBack: HAPTIC_TYPES.SELECTION,
  navigationMenu: HAPTIC_TYPES.SELECTION,
  
  // Boutons d'action
  buttonPrimary: HAPTIC_TYPES.MEDIUM,      // Boutons principaux
  buttonSecondary: HAPTIC_TYPES.LIGHT,     // Boutons secondaires
  buttonDanger: HAPTIC_TYPES.HEAVY,        // Boutons de suppression, danger
  
  // Trading et Finance
  buyAction: HAPTIC_TYPES.MEDIUM,          // Achat d'actifs
  sellAction: HAPTIC_TYPES.MEDIUM,         // Vente d'actifs
  tradeConfirm: HAPTIC_TYPES.HEAVY,        // Confirmation de trade
  
  // P2P
  p2pOfferSelect: HAPTIC_TYPES.SELECTION,  // Sélection d'offre P2P
  p2pModeSwitch: HAPTIC_TYPES.SELECTION,   // Changement de mode P2P
  p2pFilterApply: HAPTIC_TYPES.LIGHT,      // Application de filtres
  
  // Assets
  assetSelect: HAPTIC_TYPES.SELECTION,     // Sélection d'actif
  portfolioRefresh: HAPTIC_TYPES.LIGHT,    // Rafraîchissement
  balanceToggle: HAPTIC_TYPES.LIGHT,       // Masquer/afficher solde
  
  // Formulaires
  inputFocus: HAPTIC_TYPES.LIGHT,          // Focus sur input
  formSubmit: HAPTIC_TYPES.MEDIUM,         // Soumission de formulaire
  formValidation: HAPTIC_TYPES.NOTIFICATION, // Erreur de validation
  
  // Modales et Overlays
  modalOpen: HAPTIC_TYPES.LIGHT,           // Ouverture de modale
  modalClose: HAPTIC_TYPES.LIGHT,          // Fermeture de modale
  dropdownOpen: HAPTIC_TYPES.LIGHT,        // Ouverture de dropdown
  
  // Notifications
  notificationReceived: HAPTIC_TYPES.NOTIFICATION,  // Nouvelle notification
  notificationDismiss: HAPTIC_TYPES.LIGHT,          // Fermer notification
  settingsToggle: HAPTIC_TYPES.SELECTION,           // Toggle de paramètres
  
  // Actions critiques
  deleteConfirm: HAPTIC_TYPES.HEAVY,       // Confirmation de suppression
  logoutConfirm: HAPTIC_TYPES.HEAVY,       // Confirmation de déconnexion
  securityAction: HAPTIC_TYPES.HEAVY,      // Actions de sécurité
  
  // Interactions de liste
  listItemSelect: HAPTIC_TYPES.SELECTION,  // Sélection d'élément de liste
  listSwipe: HAPTIC_TYPES.LIGHT,           // Swipe dans une liste
  listRefresh: HAPTIC_TYPES.MEDIUM,        // Pull to refresh
  
  // Graphiques et données
  chartInteraction: HAPTIC_TYPES.LIGHT,    // Interaction avec graphique
  dataFilter: HAPTIC_TYPES.LIGHT,          // Filtrage de données
  
  // Langue et localisation
  languageSwitch: HAPTIC_TYPES.SELECTION,  // Changement de langue
  
  // Quick Actions
  quickActionTrigger: HAPTIC_TYPES.SELECTION, // Actions rapides
} as const

/**
 * Fonction utilitaire pour obtenir le type haptique approprié
 */
export const getHapticForInteraction = (interaction: keyof typeof INTERACTION_HAPTICS): HapticType => {
  return INTERACTION_HAPTICS[interaction] || HAPTIC_TYPES.MEDIUM
}

/**
 * Configuration des patterns de vibration personnalisés (pour Android/Web)
 */
export const CUSTOM_VIBRATION_PATTERNS = {
  // Pattern court pour sélections
  selection: [5],
  
  // Pattern double pour confirmations importantes
  confirmation: [20, 10, 20],
  
  // Pattern long pour erreurs
  error: [50, 30, 50],
  
  // Pattern subtil pour succès
  success: [10, 5, 10, 5, 10],
  
  // Pattern pour notifications
  notification: [30, 20, 30],
} as const

/**
 * Configuration par défaut pour le hook useHapticFeedback
 */
export const DEFAULT_HAPTIC_CONFIG = {
  enabled: true,
  fallbackVibration: true,
} as const

export default {
  HAPTIC_TYPES,
  INTERACTION_HAPTICS,
  getHapticForInteraction,
  CUSTOM_VIBRATION_PATTERNS,
  DEFAULT_HAPTIC_CONFIG,
}
