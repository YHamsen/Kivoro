/**
 * Constantes d'animations pour l'application Kivoro
 * Basées sur le design pattern de la section P2P (référence parfaite)
 */

/**
 * Animations de base pour les interactions
 */
export const BUTTON_ANIMATIONS = {
  // Animations standard pour boutons
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  
  // Animations pour boutons plus grands/importants
  hoverLarge: { scale: 1.05 },
  tapLarge: { scale: 0.95 },
  
  // Animations subtiles pour petits boutons
  hoverSubtle: { scale: 1.01 },
  tapSubtle: { scale: 0.99 },
} as const

/**
 * Animations d'entrée pour les composants
 */
export const ENTRANCE_ANIMATIONS = {
  // Fade in standard
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  },
  
  // Fade in avec délai pour listes
  fadeInStaggered: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.1 }
  }),
  
  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 }
  },
  
  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 }
  },
  
  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  }
} as const

/**
 * Animations de sortie
 */
export const EXIT_ANIMATIONS = {
  fadeOut: {
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 }
  },
  
  scaleOut: {
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 }
  }
} as const

/**
 * Transitions Spring pour des animations plus naturelles
 */
export const SPRING_TRANSITIONS = {
  default: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 500, damping: 30 },
  gentle: { type: "spring", stiffness: 200, damping: 40 },
} as const

/**
 * Animations pour les états de chargement
 */
export const LOADING_ANIMATIONS = {
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  },
  
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 1.5, repeat: Infinity }
  },
  
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 0.6, repeat: Infinity }
  }
} as const

/**
 * Animations pour les notifications et toasts
 */
export const NOTIFICATION_ANIMATIONS = {
  slideInFromTop: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  },
  
  slideInFromRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  }
} as const

/**
 * Animations pour les modales
 */
export const MODAL_ANIMATIONS = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  
  content: {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
} as const

/**
 * Variantes d'animation pour les conteneurs avec enfants
 */
export const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
} as const

export const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
} as const

/**
 * Durées standard pour l'application
 */
export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 1.0
} as const

/**
 * Utility function pour créer des animations avec délai
 */
export const withDelay = (animation: any, delay: number) => ({
  ...animation,
  transition: {
    ...animation.transition,
    delay
  }
})

export default {
  BUTTON_ANIMATIONS,
  ENTRANCE_ANIMATIONS,
  EXIT_ANIMATIONS,
  SPRING_TRANSITIONS,
  LOADING_ANIMATIONS,
  NOTIFICATION_ANIMATIONS,
  MODAL_ANIMATIONS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
  DURATIONS,
  withDelay
}
