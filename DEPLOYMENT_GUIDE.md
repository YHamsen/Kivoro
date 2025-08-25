# Guide de Déploiement - Kivoro Enhanced

## 🚀 Déploiement Rapide

### Pré-requis
- Node.js 18+ installé
- npm ou pnpm installé

### 1. Installation des Dépendances
```bash
cd kivoro-enhanced
npm install
# ou
pnpm install
```

### 2. Build de Production
```bash
npm run build
# ou
pnpm run build
```

### 3. Test Local
```bash
npm run dev
# ou
pnpm run dev
```

## 📱 Test des Nouvelles Fonctionnalités

### Page Profil
1. **Accéder au profil** : Cliquer sur l'avatar en haut à gauche
2. **Changer de langue** : Utiliser le sélecteur de langue dans la section profil
3. **Tester les animations** : Observer les transitions fluides

### Notifications
1. **Centre de notifications** : Cliquer sur l'icône Bell en haut à droite
2. **Paramètres** : Accéder via l'icône Settings ou le menu profil
3. **Filtrage** : Tester les différents filtres dans le centre de notifications

### Navigation
1. **Navigation mobile** : Utiliser la navigation en bas (icône User pour le profil)
2. **Navigation desktop** : Utiliser les boutons en haut de page

## 🌍 Test Multilingue

### Changement de Langue
1. Aller dans **Profil > Langue**
2. Sélectionner une langue (simulation de téléchargement pour ES, RU, ZH)
3. Observer les traductions dans l'interface

### Langues Disponibles
- 🇫🇷 Français (installé)
- 🇺🇸 English (installé)  
- 🇪🇸 Español (à télécharger)
- 🇷🇺 Русский (à télécharger)
- 🇨🇳 中文 (à télécharger)

## 🔔 Test des Notifications

### Paramètres Globaux
1. **Activation** : Basculer le switch principal
2. **Son** : Tester le contrôle de volume
3. **Heures silencieuses** : Configurer les plages horaires

### Types de Notifications
1. **Trading** : Activer/désactiver les alertes de trading
2. **Prix** : Configurer les alertes de prix
3. **Sécurité** : Paramétrer les notifications de sécurité
4. **Promotions** : Gérer les communications marketing

### Centre de Notifications
1. **Affichage** : Voir les notifications simulées
2. **Filtrage** : Tester les filtres (toutes, non lues, par type)
3. **Actions** : Marquer comme lu, supprimer

## 🎯 Points de Test Spécifiques

### Responsiveness
- [ ] Test sur mobile (320px+)
- [ ] Test sur tablette (768px+)
- [ ] Test sur desktop (1024px+)

### Interactions
- [ ] Haptic feedback fonctionnel
- [ ] Animations fluides
- [ ] Transitions cohérentes

### Persistance
- [ ] Langue sauvegardée après rechargement
- [ ] Paramètres notifications conservés
- [ ] État des filtres maintenu

## 🐛 Debug et Résolution de Problèmes

### Erreurs Communes
1. **Dépendances manquantes** : `npm install`
2. **Build errors** : Vérifier les types TypeScript
3. **Styles manquants** : Rebuilder CSS avec Tailwind

### Logs de Développement
```bash
# Console browser pour voir les interactions
console.log('Language changed to:', languageCode)
console.log('Notification setting updated:', id, enabled)
```

### Performance
- Surveiller la taille du bundle (1.2MB actuel)
- Optimiser avec code splitting si nécessaire

## 📊 Métriques à Surveiller

### Bundle Analysis
```bash
npm run build
# Observer les warnings de taille de chunk
```

### Lighthouse Score
- Performance
- Accessibilité
- Best Practices
- SEO

## 🔄 Intégration Continue

### Script de Build Automatique
```bash
#!/bin/bash
cd kivoro-enhanced
npm ci
npm run build
# Tests automatisés ici
```

### Déploiement
```bash
# Après build réussi
npm run deploy
# ou copier le dossier dist/ vers votre serveur
```

---

**Status** : ✅ **Prêt pour Production**  
**Version** : 1.0.0  
**Dernière mise à jour** : 22 juin 2025
