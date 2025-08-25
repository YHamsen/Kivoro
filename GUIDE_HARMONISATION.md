# Guide d'Harmonisation UI - Kivoro

## 🎯 Objectif

Ce guide décrit comment utiliser les constantes harmonisées pour maintenir la cohérence visuelle et d'interaction dans toute l'application Kivoro.

## 📁 Structure des Constantes

```
src/constants/
├── colors.ts      # Palette de couleurs harmonisée
├── animations.ts  # Animations standardisées  
└── haptics.ts     # Types de retour haptique
```

## 🎨 Utilisation des Couleurs

### Import et utilisation basique

```tsx
import { COLORS, TAILWIND_COLORS, GRADIENTS } from '../constants/colors'

// Utilisation avec style object
const buttonStyle = {
  backgroundColor: COLORS.primary,
  color: COLORS.textPrimary
}

// Utilisation avec Tailwind (recommandé)
<div className={`${TAILWIND_COLORS.bgCard} ${TAILWIND_COLORS.borderDefault}`}>
  <h1 className={TAILWIND_COLORS.textOrange}>Titre</h1>
</div>

// Utilisation des gradients
<div className={GRADIENTS.cardGradient}>
  Contenu avec gradient
</div>
```

### Palette de couleurs disponible

```tsx
// Couleurs principales
COLORS.primary          // #F7931A (Orange Bitcoin)
COLORS.background       // #0a0a0a (Fond principal)
COLORS.card            // #1a1a1a (Cartes)
COLORS.control         // #2a2a2a (Contrôles)

// Couleurs d'état
COLORS.success         // #22c55e (Vert)
COLORS.error          // #ef4444 (Rouge)
COLORS.warning        // #eab308 (Jaune)
COLORS.info           // #3b82f6 (Bleu)

// Classes Tailwind prêtes
TAILWIND_COLORS.bgPrimary     // bg-[#0a0a0a]
TAILWIND_COLORS.bgOrange      // bg-[#F7931A]
TAILWIND_COLORS.textOrange    // text-[#F7931A]
TAILWIND_COLORS.hoverOrange   // hover:bg-[#F7931A]/90
```

## 🎬 Utilisation des Animations

### Import et utilisation

```tsx
import { 
  BUTTON_ANIMATIONS, 
  ENTRANCE_ANIMATIONS, 
  SPRING_TRANSITIONS 
} from '../constants/animations'

// Boutons avec animations standardisées
<motion.button
  whileHover={BUTTON_ANIMATIONS.hover}      // { scale: 1.02 }
  whileTap={BUTTON_ANIMATIONS.tap}          // { scale: 0.98 }
  transition={SPRING_TRANSITIONS.default}   // Spring naturel
>
  Bouton
</motion.button>

// Entrées de composants
<motion.div
  {...ENTRANCE_ANIMATIONS.fadeIn}
>
  Contenu qui apparaît
</motion.div>

// Avec délai pour listes
{items.map((item, index) => (
  <motion.div
    key={item.id}
    {...ENTRANCE_ANIMATIONS.fadeInStaggered(index)}
  >
    {item.content}
  </motion.div>
))}
```

### Types d'animations disponibles

```tsx
// Animations de boutons
BUTTON_ANIMATIONS.hover        // Scale 1.02
BUTTON_ANIMATIONS.hoverLarge   // Scale 1.05 (boutons importants)
BUTTON_ANIMATIONS.hoverSubtle  // Scale 1.01 (petits boutons)

// Animations d'entrée
ENTRANCE_ANIMATIONS.fadeIn           // Apparition standard
ENTRANCE_ANIMATIONS.fadeInStaggered  // Avec délai (pour listes)
ENTRANCE_ANIMATIONS.slideInLeft      // Depuis la gauche
ENTRANCE_ANIMATIONS.scaleIn          // Avec effet de zoom

// Animations de chargement
LOADING_ANIMATIONS.spin     // Rotation continue
LOADING_ANIMATIONS.pulse    // Pulsation
LOADING_ANIMATIONS.bounce   // Rebond
```

## 📳 Utilisation du Retour Haptique

### Import et utilisation

```tsx
import useHapticFeedback from '../hooks/useHapticFeedback'
import { INTERACTION_HAPTICS, getHapticForInteraction } from '../constants/haptics'

const Component = () => {
  const { withHaptic } = useHapticFeedback()
  
  return (
    <button
      onClick={withHaptic(
        () => handleAction(),
        INTERACTION_HAPTICS.buttonPrimary
      )}
    >
      Action
    </button>
  )
}
```

### Types d'interactions disponibles

```tsx
// Navigation
INTERACTION_HAPTICS.navigationTab      // 'selection'
INTERACTION_HAPTICS.navigationBack     // 'selection'

// Boutons
INTERACTION_HAPTICS.buttonPrimary      // 'medium'
INTERACTION_HAPTICS.buttonSecondary    // 'light'
INTERACTION_HAPTICS.buttonDanger       // 'heavy'

// Trading
INTERACTION_HAPTICS.buyAction          // 'medium'
INTERACTION_HAPTICS.sellAction         // 'medium'
INTERACTION_HAPTICS.tradeConfirm       // 'heavy'

// P2P
INTERACTION_HAPTICS.p2pOfferSelect     // 'selection'
INTERACTION_HAPTICS.p2pModeSwitch      // 'selection'

// Assets
INTERACTION_HAPTICS.assetSelect        // 'selection'
INTERACTION_HAPTICS.portfolioRefresh   // 'light'
INTERACTION_HAPTICS.balanceToggle      // 'light'
```

## 🏗️ Exemple d'Implémentation Complète

```tsx
import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import useHapticFeedback from '../hooks/useHapticFeedback'

// Import des constantes harmonisées
import { TAILWIND_COLORS } from '../constants/colors'
import { BUTTON_ANIMATIONS, ENTRANCE_ANIMATIONS } from '../constants/animations'
import { INTERACTION_HAPTICS } from '../constants/haptics'

const HarmonizedComponent: React.FC = () => {
  const { withHaptic } = useHapticFeedback()
  
  return (
    <motion.div
      className={`${TAILWIND_COLORS.bgCard} ${TAILWIND_COLORS.borderDefault} p-4 rounded-lg`}
      {...ENTRANCE_ANIMATIONS.fadeIn}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className={`w-5 h-5 ${TAILWIND_COLORS.textOrange}`} />
        <h3 className="font-semibold">Composant Harmonisé</h3>
      </div>
      
      <div className="flex gap-2">
        {/* Bouton principal */}
        <motion.button
          className={`${TAILWIND_COLORS.bgOrange} text-black px-4 py-2 rounded-lg font-medium`}
          whileHover={BUTTON_ANIMATIONS.hover}
          whileTap={BUTTON_ANIMATIONS.tap}
          onClick={withHaptic(
            () => console.log('Action principale'),
            INTERACTION_HAPTICS.buttonPrimary
          )}
        >
          Action Principale
        </motion.button>
        
        {/* Bouton secondaire */}
        <motion.button
          className={`${TAILWIND_COLORS.borderDefault} border ${TAILWIND_COLORS.hoverControl} px-4 py-2 rounded-lg`}
          whileHover={BUTTON_ANIMATIONS.hoverSubtle}
          whileTap={BUTTON_ANIMATIONS.tapSubtle}
          onClick={withHaptic(
            () => console.log('Action secondaire'),
            INTERACTION_HAPTICS.buttonSecondary
          )}
        >
          Action Secondaire
        </motion.button>
      </div>
    </motion.div>
  )
}

export default HarmonizedComponent
```

## ✅ Checklist de Conformité

Lors de la création d'un nouveau composant, vérifiez :

### 🎨 Design
- [ ] Utilise les couleurs de `COLORS` ou `TAILWIND_COLORS`
- [ ] Respecte la palette : orange `#F7931A`, fonds sombres, texte blanc
- [ ] Utilise les gradients standards si applicable
- [ ] Bordures cohérentes avec `border-gray-800`

### 🎬 Animations
- [ ] Boutons avec `BUTTON_ANIMATIONS.hover` et `tap`
- [ ] Entrées avec `ENTRANCE_ANIMATIONS.fadeIn` ou équivalent
- [ ] Transitions spring pour un rendu naturel
- [ ] Délais échelonnés pour les listes

### 📳 Interactions
- [ ] Retour haptique sur tous les boutons et actions
- [ ] Types haptiques appropriés selon `INTERACTION_HAPTICS`
- [ ] Utilisation du hook `useHapticFeedback`

### 🏗️ Structure
- [ ] Import des constantes depuis `/constants/`
- [ ] Code lisible et maintenable
- [ ] Composant réutilisable et modulaire

## 🚀 Bonnes Pratiques

### 1. **Cohérence avant tout**
Utilisez toujours les constantes plutôt que des valeurs en dur :
```tsx
// ❌ Mauvais
<div className="bg-orange-500">

// ✅ Bon
<div className={TAILWIND_COLORS.bgOrange}>
```

### 2. **Animations fluides**
Combinez hover et tap pour une expérience naturelle :
```tsx
// ✅ Bon
<motion.button
  whileHover={BUTTON_ANIMATIONS.hover}
  whileTap={BUTTON_ANIMATIONS.tap}
>
```

### 3. **Retour haptique contextuel**
Choisissez le type de vibration selon l'importance de l'action :
```tsx
// ✅ Bon - Action critique
onClick={withHaptic(deleteItem, INTERACTION_HAPTICS.buttonDanger)}

// ✅ Bon - Navigation
onClick={withHaptic(navigateToPage, INTERACTION_HAPTICS.navigationTab)}
```

### 4. **Performance**
Les constantes sont optimisées pour éviter les re-renders inutiles.

## 🔄 Migration d'un Composant Existant

1. **Remplacer les couleurs en dur** par les constantes
2. **Ajouter les animations standardisées** avec Framer Motion
3. **Intégrer le retour haptique** sur les interactions
4. **Tester la cohérence** avec le reste de l'application

## 📞 Support

En cas de question sur l'harmonisation UI :
1. Consultez les exemples dans `/components/assets/QuickActionsGridOptimized.tsx`
2. Référez-vous à la section P2P comme modèle de référence
3. Vérifiez la documentation des hooks dans `/hooks/`

---

*Guide maintenu par l'équipe MiniMax Agent - Version 1.0*
