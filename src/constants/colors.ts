/**
 * Constantes de couleurs pour l'application Kivoro
 * Basées sur le design pattern de la section P2P (référence parfaite)
 */

export const COLORS = {
  // Couleurs principales
  primary: '#F7931A',           // Orange Bitcoin - couleur signature
  primaryHover: '#F7931A/90',   // Orange Bitcoin avec opacité pour hover
  primaryLight: '#F7931A/10',   // Orange Bitcoin très clair pour backgrounds
  
  // Arrière-plans
  background: '#0a0a0a',        // Fond principal de l'application
  card: '#1a1a1a',             // Arrière-plan des cartes et contenus
  control: '#2a2a2a',          // Arrière-plan des contrôles (boutons, inputs)
  controlHover: '#3a3a3a',     // Hover state pour les contrôles
  
  // Texte
  textPrimary: '#ffffff',       // Texte principal blanc
  textSecondary: '#gray-400',   // Texte secondaire gris
  textMuted: '#gray-500',       // Texte atténué
  
  // États et actions
  success: '#22c55e',           // Vert pour succès/achat
  successHover: '#22c55e/90',   // Vert hover
  successLight: '#22c55e/10',   // Vert clair pour backgrounds
  
  error: '#ef4444',             // Rouge pour erreur/vente
  errorHover: '#ef4444/90',     // Rouge hover
  errorLight: '#ef4444/10',     // Rouge clair pour backgrounds
  
  warning: '#eab308',           // Jaune pour avertissements
  warningLight: '#eab308/10',   // Jaune clair pour backgrounds
  
  info: '#3b82f6',              // Bleu pour informations
  infoLight: '#3b82f6/10',      // Bleu clair pour backgrounds
  
  // Bordures
  border: '#gray-800',          // Bordures principales
  borderHover: '#F7931A/30',    // Bordures au hover (orange clair)
  
  // États spéciaux
  disabled: '#gray-600',        // Éléments désactivés
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay pour modales
} as const

/**
 * Classes Tailwind correspondantes pour une utilisation directe
 */
export const TAILWIND_COLORS = {
  // Backgrounds
  bgPrimary: 'bg-[#0a0a0a]',
  bgCard: 'bg-[#1a1a1a]',
  bgControl: 'bg-[#2a2a2a]',
  
  // Primary orange
  bgOrange: 'bg-[#F7931A]',
  textOrange: 'text-[#F7931A]',
  borderOrange: 'border-[#F7931A]',
  
  // Hover states
  hoverCard: 'hover:bg-[#2a2a2a]',
  hoverControl: 'hover:bg-[#3a3a3a]',
  hoverOrange: 'hover:bg-[#F7931A]/90',
  
  // Borders
  borderDefault: 'border-gray-800',
  borderHover: 'hover:border-[#F7931A]/30',
} as const

/**
 * Gradients cohérents
 */
export const GRADIENTS = {
  cardGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]',
  primaryGradient: 'bg-gradient-to-r from-[#F7931A] to-[#FF8C00]',
  iconGradient: 'bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a]',
} as const

export default COLORS
