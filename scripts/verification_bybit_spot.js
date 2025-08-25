/**
 * 🧪 Script de Vérification - Intégration Bybit Spot
 * 
 * Instructions d'utilisation :
 * 1. Ouvrir https://ykxidnlt3t.space.minimax.io/assets
 * 2. Ouvrir la Console DevTools (F12)
 * 3. Copier-coller ce script et appuyer Entrée
 * 4. Suivre les instructions qui s'affichent
 */

console.clear();
console.log('🚀 VÉRIFICATION INTÉGRATION BYBIT SPOT');
console.log('=====================================');

// Vérification 1 : Page actuelle
const currentUrl = window.location.href;
console.log('📍 URL actuelle :', currentUrl);

if (currentUrl.includes('/assets')) {
    console.log('✅ Vous êtes sur la page Assets - Parfait !');
    
    // Vérification 2 : Présence du composant Bybit
    setTimeout(() => {
        const bybitElements = document.querySelectorAll('*');
        let bybitFound = false;
        
        bybitElements.forEach(el => {
            if (el.textContent && el.textContent.toLowerCase().includes('bybit')) {
                bybitFound = true;
                console.log('✅ Élément Bybit trouvé :', el.textContent.trim());
            }
        });
        
        if (bybitFound) {
            console.log('✅ Section Bybit Exchange détectée !');
            console.log('');
            console.log('🎯 ÉTAPE SUIVANTE :');
            console.log('1. Localisez la carte "Bybit Exchange" dans l\'interface');
            console.log('2. Cliquez dessus');
            console.log('3. Vous devriez être redirigé vers /bybit-spot');
            console.log('');
            console.log('📱 Alternative : Accès direct à l\'interface Spot');
            console.log('   → https://ykxidnlt3t.space.minimax.io/bybit-spot');
        } else {
            console.log('⚠️ Élément Bybit non trouvé - Scroll vers le bas pour voir les wallets');
        }
    }, 2000);
    
} else if (currentUrl.includes('/bybit-spot')) {
    console.log('🎉 Vous êtes sur l\'interface Spot Trading !');
    
    // Vérification de l'interface Spot
    setTimeout(() => {
        console.log('');
        console.log('🔍 VÉRIFICATIONS INTERFACE SPOT :');
        
        // Check header
        const header = document.querySelector('h1, [class*="header"]');
        if (header && header.textContent.includes('Funding')) {
            console.log('✅ Header "Funding Account" détecté');
        }
        
        // Check onglets
        const tabs = document.querySelectorAll('[class*="tab"], button');
        let cryptoTab = false, fiatTab = false;
        tabs.forEach(tab => {
            if (tab.textContent && tab.textContent.toLowerCase().includes('crypto')) {
                cryptoTab = true;
            }
            if (tab.textContent && tab.textContent.toLowerCase().includes('fiat')) {
                fiatTab = true;
            }
        });
        
        if (cryptoTab && fiatTab) {
            console.log('✅ Onglets Crypto/Fiat détectés');
        }
        
        // Check boutons d'actions
        const buttons = document.querySelectorAll('button, [role="button"]');
        let depositBtn = false, withdrawBtn = false;
        buttons.forEach(btn => {
            if (btn.textContent && btn.textContent.toLowerCase().includes('deposit')) {
                depositBtn = true;
            }
            if (btn.textContent && btn.textContent.toLowerCase().includes('withdraw')) {
                withdrawBtn = true;
            }
        });
        
        if (depositBtn || withdrawBtn) {
            console.log('✅ Boutons d\'actions détectés');
        }
        
        console.log('');
        console.log('🎯 TESTS À EFFECTUER :');
        console.log('1. Cliquer sur l\'onglet "Crypto" - voir les cryptomonnaies');
        console.log('2. Cliquer sur l\'onglet "Fiat" - voir les devises');
        console.log('3. Tester l\'icône œil (masquer/afficher soldes)');
        console.log('4. Cliquer sur le bouton refresh (🔄)');
        console.log('5. Tester la barre de recherche');
        console.log('');
        console.log('📊 Si vous voyez des données se charger → API Bybit fonctionne !');
        
    }, 2000);
    
} else {
    console.log('📍 Vous n\'êtes pas sur la bonne page.');
    console.log('');
    console.log('🎯 NAVIGATION RECOMMANDÉE :');
    console.log('1. Assets : https://ykxidnlt3t.space.minimax.io/assets');
    console.log('2. Spot Trading : https://ykxidnlt3t.space.minimax.io/bybit-spot');
    console.log('');
    console.log('💡 Pour tester la navigation automatique :');
    console.log('   Allez sur /assets et cliquez sur Bybit Exchange');
}

// Fonction utilitaire pour tester la navigation
window.testBybitNavigation = function() {
    console.log('🧪 Test de navigation Bybit...');
    window.location.href = '/assets';
    setTimeout(() => {
        console.log('📍 Maintenant sur Assets - Cherchez et cliquez sur Bybit Exchange');
    }, 1000);
};

// Fonction pour aller directement au Spot
window.goToBybitSpot = function() {
    console.log('🚀 Navigation directe vers Bybit Spot...');
    window.location.href = '/bybit-spot';
};

console.log('');
console.log('🛠️ FONCTIONS UTILITAIRES DISPONIBLES :');
console.log('• testBybitNavigation() - Aller aux Assets pour tester');
console.log('• goToBybitSpot() - Aller directement au Spot Trading');
console.log('');
console.log('🎉 Script chargé avec succès !');
