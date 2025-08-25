#!/usr/bin/env node

/**
 * Script de vérification de la cohérence UI pour Kivoro
 * Vérifie que les composants suivent les bonnes pratiques d'harmonisation
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Couleurs de console pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

class UIConsistencyChecker {
  constructor() {
    this.errors = []
    this.warnings = []
    this.successes = []
    
    // Patterns à rechercher
    this.patterns = {
      // Couleurs hardcodées à éviter
      hardcodedColors: [
        /#[0-9a-fA-F]{6}/g,  // Couleurs hex
        /rgb\(/g,            // RGB
        /rgba\(/g,           // RGBA
        /hsl\(/g,            // HSL
      ],
      
      // Bonnes pratiques
      goodPractices: {
        useHapticFeedback: /useHapticFeedback/,
        framerMotion: /from ['"]framer-motion['"]/,
        colorConstants: /from ['"].*constants\/colors['"]/,
        animationConstants: /from ['"].*constants\/animations['"]/,
        hapticConstants: /from ['"].*constants\/haptics['"]/,
      },
      
      // Animations standardisées
      standardAnimations: {
        whileHover: /whileHover/,
        whileTap: /whileTap/,
        buttonAnimations: /BUTTON_ANIMATIONS/,
        entranceAnimations: /ENTRANCE_ANIMATIONS/,
      }
    }
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
  }

  logHeader(message) {
    this.log(`\n${'='.repeat(60)}`, 'cyan')
    this.log(`  ${message}`, 'bright')
    this.log('='.repeat(60), 'cyan')
  }

  logSection(message) {
    this.log(`\n${'-'.repeat(40)}`, 'blue')
    this.log(`  ${message}`, 'blue')
    this.log('-'.repeat(40), 'blue')
  }

  addError(file, message) {
    this.errors.push({ file, message })
  }

  addWarning(file, message) {
    this.warnings.push({ file, message })
  }

  addSuccess(file, message) {
    this.successes.push({ file, message })
  }

  /**
   * Analyse un fichier pour vérifier la cohérence UI
   */
  analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const relativePath = path.relative(process.cwd(), filePath)
    
    // Skip les fichiers de constantes eux-mêmes
    if (filePath.includes('/constants/')) {
      return
    }

    // Vérification des couleurs hardcodées
    this.checkHardcodedColors(relativePath, content)
    
    // Vérification des bonnes pratiques
    this.checkGoodPractices(relativePath, content)
    
    // Vérification des animations
    this.checkAnimations(relativePath, content)
    
    // Vérification du retour haptique
    this.checkHapticFeedback(relativePath, content)
  }

  /**
   * Vérifie les couleurs hardcodées
   */
  checkHardcodedColors(file, content) {
    let hasHardcodedColors = false
    
    this.patterns.hardcodedColors.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches && matches.length > 0) {
        // Exceptions autorisées
        const allowedColors = ['#F7931A', '#0a0a0a', '#1a1a1a', '#2a2a2a']
        const hasUnallowedColors = matches.some(match => 
          !allowedColors.some(allowed => content.includes(allowed))
        )
        
        if (hasUnallowedColors) {
          hasHardcodedColors = true
        }
      }
    })
    
    if (hasHardcodedColors) {
      this.addWarning(file, 'Contient des couleurs hardcodées - considérer l\'utilisation des constantes')
    }
  }

  /**
   * Vérifie les bonnes pratiques
   */
  checkGoodPractices(file, content) {
    const isComponent = file.includes('/components/') || file.includes('/pages/')
    
    if (!isComponent) return
    
    // Vérifie l'import de useHapticFeedback
    if (content.includes('onClick') && !this.patterns.goodPractices.useHapticFeedback.test(content)) {
      this.addWarning(file, 'Contient des onClick sans retour haptique')
    }
    
    // Vérifie l'utilisation de Framer Motion pour les animations
    if (content.includes('whileHover') && !this.patterns.goodPractices.framerMotion.test(content)) {
      this.addError(file, 'Utilise des animations sans importer framer-motion')
    }
    
    // Vérifie l'utilisation des constantes de couleurs
    if ((content.includes('bg-[#') || content.includes('text-[#')) && 
        !this.patterns.goodPractices.colorConstants.test(content)) {
      this.addWarning(file, 'Utilise des couleurs Tailwind hardcodées - considérer les constantes')
    }
  }

  /**
   * Vérifie les animations
   */
  checkAnimations(file, content) {
    const hasMotionElements = content.includes('motion.')
    const hasWhileHover = this.patterns.standardAnimations.whileHover.test(content)
    const hasWhileTap = this.patterns.standardAnimations.whileTap.test(content)
    
    if (hasMotionElements) {
      if (hasWhileHover && !hasWhileTap) {
        this.addWarning(file, 'A whileHover mais pas whileTap - considérer l\'ajout pour une meilleure UX')
      }
      
      if (!this.patterns.standardAnimations.buttonAnimations.test(content) && 
          !this.patterns.standardAnimations.entranceAnimations.test(content)) {
        this.addWarning(file, 'Utilise framer-motion sans les constantes d\'animation standardisées')
      }
      
      this.addSuccess(file, 'Utilise correctement Framer Motion')
    }
  }

  /**
   * Vérifie le retour haptique
   */
  checkHapticFeedback(file, content) {
    const hasHapticFeedback = this.patterns.goodPractices.useHapticFeedback.test(content)
    const hasClickHandlers = content.includes('onClick')
    
    if (hasClickHandlers && hasHapticFeedback) {
      this.addSuccess(file, 'Implémente correctement le retour haptique')
    } else if (hasClickHandlers && !hasHapticFeedback) {
      this.addWarning(file, 'A des interactions sans retour haptique')
    }
  }

  /**
   * Génère le rapport final
   */
  generateReport() {
    this.logHeader('RAPPORT DE COHÉRENCE UI - KIVORO')
    
    // Statistiques générales
    this.log(`Fichiers analysés: ${this.errors.length + this.warnings.length + this.successes.length}`)
    this.log(`Erreurs: ${this.errors.length}`, 'red')
    this.log(`Avertissements: ${this.warnings.length}`, 'yellow')
    this.log(`Succès: ${this.successes.length}`, 'green')

    // Erreurs
    if (this.errors.length > 0) {
      this.logSection('ERREURS À CORRIGER')
      this.errors.forEach(error => {
        this.log(`❌ ${error.file}`, 'red')
        this.log(`   ${error.message}`, 'red')
      })
    }

    // Avertissements
    if (this.warnings.length > 0) {
      this.logSection('AVERTISSEMENTS')
      this.warnings.forEach(warning => {
        this.log(`⚠️  ${warning.file}`, 'yellow')
        this.log(`   ${warning.message}`, 'yellow')
      })
    }

    // Succès
    if (this.successes.length > 0) {
      this.logSection('BONNES PRATIQUES DÉTECTÉES')
      this.successes.slice(0, 10).forEach(success => {  // Limite à 10 pour éviter le spam
        this.log(`✅ ${success.file}`, 'green')
        this.log(`   ${success.message}`, 'green')
      })
      
      if (this.successes.length > 10) {
        this.log(`... et ${this.successes.length - 10} autres fichiers conformes`, 'green')
      }
    }

    // Recommandations
    this.logSection('RECOMMANDATIONS')
    this.log('1. Utilisez les constantes de couleurs depuis /constants/colors.ts')
    this.log('2. Implémentez le retour haptique sur toutes les interactions')
    this.log('3. Utilisez les animations standardisées depuis /constants/animations.ts')
    this.log('4. Consultez le guide: GUIDE_HARMONISATION.md')

    // Score de cohérence
    const totalFiles = this.errors.length + this.warnings.length + this.successes.length
    const score = totalFiles > 0 ? Math.round((this.successes.length / totalFiles) * 100) : 0
    
    this.logSection('SCORE DE COHÉRENCE UI')
    const scoreColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'
    this.log(`Score global: ${score}%`, scoreColor)
    
    if (score >= 90) {
      this.log('🎉 Excellente cohérence UI !', 'green')
    } else if (score >= 70) {
      this.log('👍 Bonne cohérence, quelques améliorations possibles', 'yellow')
    } else {
      this.log('🔧 Améliorations nécessaires pour la cohérence', 'red')
    }

    return {
      score,
      errors: this.errors.length,
      warnings: this.warnings.length,
      successes: this.successes.length
    }
  }

  /**
   * Lance l'analyse complète
   */
  async run() {
    this.logHeader('DÉMARRAGE DE L\'ANALYSE DE COHÉRENCE UI')
    
    // Trouve tous les fichiers React/TypeScript
    const patterns = [
      'src/**/*.tsx',
      'src/**/*.ts',
      '!src/**/*.test.ts',
      '!src/**/*.test.tsx',
      '!src/**/*.spec.ts',
      '!src/**/*.spec.tsx'
    ]
    
    const files = []
    patterns.forEach(pattern => {
      const matches = glob.sync(pattern)
      files.push(...matches)
    })
    
    this.log(`Analyse de ${files.length} fichiers...`)
    
    // Analyse chaque fichier
    files.forEach(file => {
      try {
        this.analyzeFile(file)
      } catch (error) {
        this.addError(file, `Erreur lors de l'analyse: ${error.message}`)
      }
    })
    
    // Génère le rapport
    return this.generateReport()
  }
}

// Exécution du script
if (require.main === module) {
  const checker = new UIConsistencyChecker()
  checker.run().then(result => {
    process.exit(result.errors > 0 ? 1 : 0)
  }).catch(error => {
    console.error('Erreur lors de l\'exécution:', error)
    process.exit(1)
  })
}

module.exports = UIConsistencyChecker
