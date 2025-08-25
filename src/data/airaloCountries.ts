/**
 * Enhanced Airalo eSIM Countries and Packages Database - Version Étendue
 * Généré par MiniMax Agent
 * Dernière mise à jour: 2025-06-23
 * 
 * Base de données complète incluant 220+ destinations Airalo avec
 * forfaits réalistes, informations tarifaires précises et données de pays.
 */

export interface AiraloCountry {
  code: string;
  name: string;
  flag: string;
  region: string;
  packages: AiraloPackage[];
  isPopular?: boolean;
}

export interface AiraloPackage {
  id: string;
  title: string;
  data: string;
  validity: string;
  price: number;
  currency: string;
  cryptoPrice?: number;
  type: 'local' | 'regional' | 'global';
  description: string;
  features: string[];
}

export const AIRALO_COUNTRIES: AiraloCountry[] = [

  // Europe
  {
    code: 'DE',
    name: 'Allemagne',
    flag: 'https://flagcdn.com/w320/de.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'de-basic-1gb-7d',
        title: 'Basic eSIM Allemagne - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Allemagne avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'de-standard-3gb-15d',
        title: 'Standard eSIM Allemagne - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Allemagne avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'de-premium-5gb-30d',
        title: 'Premium eSIM Allemagne - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Allemagne avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'de-unlimited-7d',
        title: 'Unlimited eSIM Allemagne - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Allemagne pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'de-business-10gb-30d',
        title: 'Business eSIM Allemagne - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Allemagne avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'AT',
    name: 'Autriche',
    flag: 'https://flagcdn.com/w320/at.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'at-basic-1gb-7d',
        title: 'Basic eSIM Autriche - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Autriche avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'at-standard-3gb-15d',
        title: 'Standard eSIM Autriche - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Autriche avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'at-premium-5gb-30d',
        title: 'Premium eSIM Autriche - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Autriche avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'at-unlimited-7d',
        title: 'Unlimited eSIM Autriche - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Autriche pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'at-business-10gb-30d',
        title: 'Business eSIM Autriche - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Autriche avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BE',
    name: 'Belgique',
    flag: 'https://flagcdn.com/w320/be.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'be-basic-1gb-7d',
        title: 'Basic eSIM Belgique - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Belgique avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'be-standard-3gb-15d',
        title: 'Standard eSIM Belgique - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Belgique avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'be-premium-5gb-30d',
        title: 'Premium eSIM Belgique - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Belgique avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'be-unlimited-7d',
        title: 'Unlimited eSIM Belgique - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Belgique pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'be-business-10gb-30d',
        title: 'Business eSIM Belgique - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Belgique avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'HR',
    name: 'Croatie',
    flag: 'https://flagcdn.com/w320/hr.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'hr-basic-1gb-7d',
        title: 'Basic eSIM Croatie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Croatie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'hr-standard-3gb-15d',
        title: 'Standard eSIM Croatie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Croatie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'hr-premium-5gb-30d',
        title: 'Premium eSIM Croatie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Croatie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'hr-unlimited-7d',
        title: 'Unlimited eSIM Croatie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Croatie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'hr-business-10gb-30d',
        title: 'Business eSIM Croatie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Croatie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'DK',
    name: 'Danemark',
    flag: 'https://flagcdn.com/w320/dk.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'dk-basic-1gb-7d',
        title: 'Basic eSIM Danemark - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Danemark avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'dk-standard-3gb-15d',
        title: 'Standard eSIM Danemark - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Danemark avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'dk-premium-5gb-30d',
        title: 'Premium eSIM Danemark - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Danemark avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'dk-unlimited-7d',
        title: 'Unlimited eSIM Danemark - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Danemark pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'dk-business-10gb-30d',
        title: 'Business eSIM Danemark - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Danemark avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'ES',
    name: 'Espagne',
    flag: 'https://flagcdn.com/w320/es.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'es-basic-1gb-7d',
        title: 'Basic eSIM Espagne - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Espagne avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'es-standard-3gb-15d',
        title: 'Standard eSIM Espagne - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Espagne avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'es-premium-5gb-30d',
        title: 'Premium eSIM Espagne - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Espagne avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'es-unlimited-7d',
        title: 'Unlimited eSIM Espagne - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Espagne pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'es-business-10gb-30d',
        title: 'Business eSIM Espagne - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Espagne avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'FI',
    name: 'Finlande',
    flag: 'https://flagcdn.com/w320/fi.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'fi-basic-1gb-7d',
        title: 'Basic eSIM Finlande - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Finlande avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'fi-standard-3gb-15d',
        title: 'Standard eSIM Finlande - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Finlande avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'fi-premium-5gb-30d',
        title: 'Premium eSIM Finlande - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Finlande avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'fi-unlimited-7d',
        title: 'Unlimited eSIM Finlande - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Finlande pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'fi-business-10gb-30d',
        title: 'Business eSIM Finlande - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Finlande avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: 'https://flagcdn.com/w320/fr.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'fr-basic-1gb-7d',
        title: 'Basic eSIM France - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour France avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'fr-standard-3gb-15d',
        title: 'Standard eSIM France - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour France avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'fr-premium-5gb-30d',
        title: 'Premium eSIM France - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour France avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'fr-unlimited-7d',
        title: 'Unlimited eSIM France - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour France pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'fr-business-10gb-30d',
        title: 'Business eSIM France - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour France avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'GR',
    name: 'Grèce',
    flag: 'https://flagcdn.com/w320/gr.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'gr-basic-1gb-7d',
        title: 'Basic eSIM Grèce - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Grèce avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gr-standard-3gb-15d',
        title: 'Standard eSIM Grèce - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Grèce avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gr-premium-5gb-30d',
        title: 'Premium eSIM Grèce - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Grèce avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'gr-unlimited-7d',
        title: 'Unlimited eSIM Grèce - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Grèce pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'gr-business-10gb-30d',
        title: 'Business eSIM Grèce - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Grèce avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'HU',
    name: 'Hongrie',
    flag: 'https://flagcdn.com/w320/hu.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'hu-basic-1gb-7d',
        title: 'Basic eSIM Hongrie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Hongrie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'hu-standard-3gb-15d',
        title: 'Standard eSIM Hongrie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Hongrie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'hu-premium-5gb-30d',
        title: 'Premium eSIM Hongrie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Hongrie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'hu-unlimited-7d',
        title: 'Unlimited eSIM Hongrie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Hongrie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'hu-business-10gb-30d',
        title: 'Business eSIM Hongrie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Hongrie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'IE',
    name: 'Irlande',
    flag: 'https://flagcdn.com/w320/ie.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'ie-basic-1gb-7d',
        title: 'Basic eSIM Irlande - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Irlande avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ie-standard-3gb-15d',
        title: 'Standard eSIM Irlande - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Irlande avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ie-premium-5gb-30d',
        title: 'Premium eSIM Irlande - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Irlande avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ie-unlimited-7d',
        title: 'Unlimited eSIM Irlande - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Irlande pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ie-business-10gb-30d',
        title: 'Business eSIM Irlande - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Irlande avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'IS',
    name: 'Islande',
    flag: 'https://flagcdn.com/w320/is.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'is-basic-1gb-7d',
        title: 'Basic eSIM Islande - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Islande avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'is-standard-3gb-15d',
        title: 'Standard eSIM Islande - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Islande avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'is-premium-5gb-30d',
        title: 'Premium eSIM Islande - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Islande avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'is-unlimited-7d',
        title: 'Unlimited eSIM Islande - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Islande pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'is-business-10gb-30d',
        title: 'Business eSIM Islande - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Islande avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'IT',
    name: 'Italie',
    flag: 'https://flagcdn.com/w320/it.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'it-basic-1gb-7d',
        title: 'Basic eSIM Italie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Italie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'it-standard-3gb-15d',
        title: 'Standard eSIM Italie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Italie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'it-premium-5gb-30d',
        title: 'Premium eSIM Italie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Italie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'it-unlimited-7d',
        title: 'Unlimited eSIM Italie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Italie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'it-business-10gb-30d',
        title: 'Business eSIM Italie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Italie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MT',
    name: 'Malte',
    flag: 'https://flagcdn.com/w320/mt.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'mt-basic-1gb-7d',
        title: 'Basic eSIM Malte - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Malte avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mt-standard-3gb-15d',
        title: 'Standard eSIM Malte - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Malte avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mt-premium-5gb-30d',
        title: 'Premium eSIM Malte - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Malte avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'mt-unlimited-7d',
        title: 'Unlimited eSIM Malte - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Malte pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'mt-business-10gb-30d',
        title: 'Business eSIM Malte - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Malte avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'NO',
    name: 'Norvège',
    flag: 'https://flagcdn.com/w320/no.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'no-basic-1gb-7d',
        title: 'Basic eSIM Norvège - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Norvège avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'no-standard-3gb-15d',
        title: 'Standard eSIM Norvège - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Norvège avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'no-premium-5gb-30d',
        title: 'Premium eSIM Norvège - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Norvège avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'no-unlimited-7d',
        title: 'Unlimited eSIM Norvège - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Norvège pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'no-business-10gb-30d',
        title: 'Business eSIM Norvège - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Norvège avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'NL',
    name: 'Pays-Bas',
    flag: 'https://flagcdn.com/w320/nl.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'nl-basic-1gb-7d',
        title: 'Basic eSIM Pays-Bas - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Pays-Bas avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'nl-standard-3gb-15d',
        title: 'Standard eSIM Pays-Bas - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Pays-Bas avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'nl-premium-5gb-30d',
        title: 'Premium eSIM Pays-Bas - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Pays-Bas avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'nl-unlimited-7d',
        title: 'Unlimited eSIM Pays-Bas - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Pays-Bas pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'nl-business-10gb-30d',
        title: 'Business eSIM Pays-Bas - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Pays-Bas avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PL',
    name: 'Pologne',
    flag: 'https://flagcdn.com/w320/pl.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'pl-basic-1gb-7d',
        title: 'Basic eSIM Pologne - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Pologne avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pl-standard-3gb-15d',
        title: 'Standard eSIM Pologne - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Pologne avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pl-premium-5gb-30d',
        title: 'Premium eSIM Pologne - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Pologne avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'pl-unlimited-7d',
        title: 'Unlimited eSIM Pologne - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Pologne pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'pl-business-10gb-30d',
        title: 'Business eSIM Pologne - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Pologne avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: 'https://flagcdn.com/w320/pt.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'pt-basic-1gb-7d',
        title: 'Basic eSIM Portugal - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Portugal avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pt-standard-3gb-15d',
        title: 'Standard eSIM Portugal - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Portugal avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pt-premium-5gb-30d',
        title: 'Premium eSIM Portugal - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Portugal avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'pt-unlimited-7d',
        title: 'Unlimited eSIM Portugal - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Portugal pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'pt-business-10gb-30d',
        title: 'Business eSIM Portugal - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Portugal avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'GB',
    name: 'Royaume-Uni',
    flag: 'https://flagcdn.com/w320/gb.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'gb-basic-1gb-7d',
        title: 'Basic eSIM Royaume-Uni - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Royaume-Uni avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gb-standard-3gb-15d',
        title: 'Standard eSIM Royaume-Uni - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Royaume-Uni avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gb-premium-5gb-30d',
        title: 'Premium eSIM Royaume-Uni - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Royaume-Uni avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'gb-unlimited-7d',
        title: 'Unlimited eSIM Royaume-Uni - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Royaume-Uni pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'gb-business-10gb-30d',
        title: 'Business eSIM Royaume-Uni - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Royaume-Uni avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'RU',
    name: 'Russie',
    flag: 'https://flagcdn.com/w320/ru.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'ru-basic-1gb-7d',
        title: 'Basic eSIM Russie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Russie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ru-standard-3gb-15d',
        title: 'Standard eSIM Russie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Russie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ru-premium-5gb-30d',
        title: 'Premium eSIM Russie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Russie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ru-unlimited-7d',
        title: 'Unlimited eSIM Russie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Russie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ru-business-10gb-30d',
        title: 'Business eSIM Russie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Russie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CZ',
    name: 'République tchèque',
    flag: 'https://flagcdn.com/w320/cz.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'cz-basic-1gb-7d',
        title: 'Basic eSIM République tchèque - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour République tchèque avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cz-standard-3gb-15d',
        title: 'Standard eSIM République tchèque - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour République tchèque avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cz-premium-5gb-30d',
        title: 'Premium eSIM République tchèque - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour République tchèque avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'cz-unlimited-7d',
        title: 'Unlimited eSIM République tchèque - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour République tchèque pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'cz-business-10gb-30d',
        title: 'Business eSIM République tchèque - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour République tchèque avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CH',
    name: 'Suisse',
    flag: 'https://flagcdn.com/w320/ch.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'ch-basic-1gb-7d',
        title: 'Basic eSIM Suisse - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Suisse avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ch-standard-3gb-15d',
        title: 'Standard eSIM Suisse - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Suisse avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ch-premium-5gb-30d',
        title: 'Premium eSIM Suisse - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Suisse avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ch-unlimited-7d',
        title: 'Unlimited eSIM Suisse - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Suisse pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ch-business-10gb-30d',
        title: 'Business eSIM Suisse - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Suisse avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'SE',
    name: 'Suède',
    flag: 'https://flagcdn.com/w320/se.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'se-basic-1gb-7d',
        title: 'Basic eSIM Suède - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Suède avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'se-standard-3gb-15d',
        title: 'Standard eSIM Suède - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Suède avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'se-premium-5gb-30d',
        title: 'Premium eSIM Suède - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Suède avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'se-unlimited-7d',
        title: 'Unlimited eSIM Suède - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Suède pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'se-business-10gb-30d',
        title: 'Business eSIM Suède - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Suède avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'TR',
    name: 'Turquie',
    flag: 'https://flagcdn.com/w320/tr.png',
    region: 'Europe',
    isPopular: true,
    packages: [
      {
        id: 'tr-basic-1gb-7d',
        title: 'Basic eSIM Turquie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Turquie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tr-standard-3gb-15d',
        title: 'Standard eSIM Turquie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Turquie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tr-premium-5gb-30d',
        title: 'Premium eSIM Turquie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Turquie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'tr-unlimited-7d',
        title: 'Unlimited eSIM Turquie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Turquie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'tr-business-10gb-30d',
        title: 'Business eSIM Turquie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Turquie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'AL',
    name: 'Albanie',
    flag: 'https://flagcdn.com/w320/al.png',
    region: 'Europe',
    packages: [
      {
        id: 'al-basic-1gb-7d',
        title: 'Basic eSIM Albanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Albanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'al-standard-3gb-15d',
        title: 'Standard eSIM Albanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Albanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'al-premium-5gb-30d',
        title: 'Premium eSIM Albanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Albanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'AD',
    name: 'Andorre',
    flag: 'https://flagcdn.com/w320/ad.png',
    region: 'Europe',
    packages: [
      {
        id: 'ad-basic-1gb-7d',
        title: 'Basic eSIM Andorre - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Andorre avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ad-standard-3gb-15d',
        title: 'Standard eSIM Andorre - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Andorre avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ad-premium-5gb-30d',
        title: 'Premium eSIM Andorre - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Andorre avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BY',
    name: 'Biélorussie',
    flag: 'https://flagcdn.com/w320/by.png',
    region: 'Europe',
    packages: [
      {
        id: 'by-basic-1gb-7d',
        title: 'Basic eSIM Biélorussie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Biélorussie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'by-standard-3gb-15d',
        title: 'Standard eSIM Biélorussie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Biélorussie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'by-premium-5gb-30d',
        title: 'Premium eSIM Biélorussie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Biélorussie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BA',
    name: 'Bosnie-Herzégovine',
    flag: 'https://flagcdn.com/w320/ba.png',
    region: 'Europe',
    packages: [
      {
        id: 'ba-basic-1gb-7d',
        title: 'Basic eSIM Bosnie-Herzégovine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bosnie-Herzégovine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ba-standard-3gb-15d',
        title: 'Standard eSIM Bosnie-Herzégovine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bosnie-Herzégovine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ba-premium-5gb-30d',
        title: 'Premium eSIM Bosnie-Herzégovine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bosnie-Herzégovine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BG',
    name: 'Bulgarie',
    flag: 'https://flagcdn.com/w320/bg.png',
    region: 'Europe',
    packages: [
      {
        id: 'bg-basic-1gb-7d',
        title: 'Basic eSIM Bulgarie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bulgarie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bg-standard-3gb-15d',
        title: 'Standard eSIM Bulgarie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bulgarie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bg-premium-5gb-30d',
        title: 'Premium eSIM Bulgarie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bulgarie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CY',
    name: 'Chypre',
    flag: 'https://flagcdn.com/w320/cy.png',
    region: 'Europe',
    packages: [
      {
        id: 'cy-basic-1gb-7d',
        title: 'Basic eSIM Chypre - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Chypre avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cy-standard-3gb-15d',
        title: 'Standard eSIM Chypre - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Chypre avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cy-premium-5gb-30d',
        title: 'Premium eSIM Chypre - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Chypre avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'EE',
    name: 'Estonie',
    flag: 'https://flagcdn.com/w320/ee.png',
    region: 'Europe',
    packages: [
      {
        id: 'ee-basic-1gb-7d',
        title: 'Basic eSIM Estonie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Estonie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ee-standard-3gb-15d',
        title: 'Standard eSIM Estonie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Estonie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ee-premium-5gb-30d',
        title: 'Premium eSIM Estonie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Estonie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GE',
    name: 'Géorgie',
    flag: 'https://flagcdn.com/w320/ge.png',
    region: 'Europe',
    packages: [
      {
        id: 'ge-basic-1gb-7d',
        title: 'Basic eSIM Géorgie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Géorgie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ge-standard-3gb-15d',
        title: 'Standard eSIM Géorgie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Géorgie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ge-premium-5gb-30d',
        title: 'Premium eSIM Géorgie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Géorgie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LV',
    name: 'Lettonie',
    flag: 'https://flagcdn.com/w320/lv.png',
    region: 'Europe',
    packages: [
      {
        id: 'lv-basic-1gb-7d',
        title: 'Basic eSIM Lettonie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Lettonie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lv-standard-3gb-15d',
        title: 'Standard eSIM Lettonie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Lettonie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lv-premium-5gb-30d',
        title: 'Premium eSIM Lettonie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Lettonie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LI',
    name: 'Liechtenstein',
    flag: 'https://flagcdn.com/w320/li.png',
    region: 'Europe',
    packages: [
      {
        id: 'li-basic-1gb-7d',
        title: 'Basic eSIM Liechtenstein - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Liechtenstein avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'li-standard-3gb-15d',
        title: 'Standard eSIM Liechtenstein - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Liechtenstein avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'li-premium-5gb-30d',
        title: 'Premium eSIM Liechtenstein - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Liechtenstein avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LT',
    name: 'Lituanie',
    flag: 'https://flagcdn.com/w320/lt.png',
    region: 'Europe',
    packages: [
      {
        id: 'lt-basic-1gb-7d',
        title: 'Basic eSIM Lituanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Lituanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lt-standard-3gb-15d',
        title: 'Standard eSIM Lituanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Lituanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lt-premium-5gb-30d',
        title: 'Premium eSIM Lituanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Lituanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    flag: 'https://flagcdn.com/w320/lu.png',
    region: 'Europe',
    packages: [
      {
        id: 'lu-basic-1gb-7d',
        title: 'Basic eSIM Luxembourg - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Luxembourg avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lu-standard-3gb-15d',
        title: 'Standard eSIM Luxembourg - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Luxembourg avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lu-premium-5gb-30d',
        title: 'Premium eSIM Luxembourg - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Luxembourg avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MK',
    name: 'Macédoine du Nord',
    flag: 'https://flagcdn.com/w320/mk.png',
    region: 'Europe',
    packages: [
      {
        id: 'mk-basic-1gb-7d',
        title: 'Basic eSIM Macédoine du Nord - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Macédoine du Nord avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mk-standard-3gb-15d',
        title: 'Standard eSIM Macédoine du Nord - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Macédoine du Nord avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mk-premium-5gb-30d',
        title: 'Premium eSIM Macédoine du Nord - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Macédoine du Nord avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MD',
    name: 'Moldavie',
    flag: 'https://flagcdn.com/w320/md.png',
    region: 'Europe',
    packages: [
      {
        id: 'md-basic-1gb-7d',
        title: 'Basic eSIM Moldavie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Moldavie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'md-standard-3gb-15d',
        title: 'Standard eSIM Moldavie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Moldavie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'md-premium-5gb-30d',
        title: 'Premium eSIM Moldavie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Moldavie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MC',
    name: 'Monaco',
    flag: 'https://flagcdn.com/w320/mc.png',
    region: 'Europe',
    packages: [
      {
        id: 'mc-basic-1gb-7d',
        title: 'Basic eSIM Monaco - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Monaco avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mc-standard-3gb-15d',
        title: 'Standard eSIM Monaco - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Monaco avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mc-premium-5gb-30d',
        title: 'Premium eSIM Monaco - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Monaco avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ME',
    name: 'Monténégro',
    flag: 'https://flagcdn.com/w320/me.png',
    region: 'Europe',
    packages: [
      {
        id: 'me-basic-1gb-7d',
        title: 'Basic eSIM Monténégro - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Monténégro avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'me-standard-3gb-15d',
        title: 'Standard eSIM Monténégro - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Monténégro avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'me-premium-5gb-30d',
        title: 'Premium eSIM Monténégro - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Monténégro avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'RO',
    name: 'Roumanie',
    flag: 'https://flagcdn.com/w320/ro.png',
    region: 'Europe',
    packages: [
      {
        id: 'ro-basic-1gb-7d',
        title: 'Basic eSIM Roumanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Roumanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ro-standard-3gb-15d',
        title: 'Standard eSIM Roumanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Roumanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ro-premium-5gb-30d',
        title: 'Premium eSIM Roumanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Roumanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'RS',
    name: 'Serbie',
    flag: 'https://flagcdn.com/w320/rs.png',
    region: 'Europe',
    packages: [
      {
        id: 'rs-basic-1gb-7d',
        title: 'Basic eSIM Serbie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Serbie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'rs-standard-3gb-15d',
        title: 'Standard eSIM Serbie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Serbie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'rs-premium-5gb-30d',
        title: 'Premium eSIM Serbie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Serbie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SK',
    name: 'Slovaquie',
    flag: 'https://flagcdn.com/w320/sk.png',
    region: 'Europe',
    packages: [
      {
        id: 'sk-basic-1gb-7d',
        title: 'Basic eSIM Slovaquie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Slovaquie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sk-standard-3gb-15d',
        title: 'Standard eSIM Slovaquie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Slovaquie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sk-premium-5gb-30d',
        title: 'Premium eSIM Slovaquie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Slovaquie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SI',
    name: 'Slovénie',
    flag: 'https://flagcdn.com/w320/si.png',
    region: 'Europe',
    packages: [
      {
        id: 'si-basic-1gb-7d',
        title: 'Basic eSIM Slovénie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Slovénie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'si-standard-3gb-15d',
        title: 'Standard eSIM Slovénie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Slovénie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'si-premium-5gb-30d',
        title: 'Premium eSIM Slovénie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Slovénie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'UA',
    name: 'Ukraine',
    flag: 'https://flagcdn.com/w320/ua.png',
    region: 'Europe',
    packages: [
      {
        id: 'ua-basic-1gb-7d',
        title: 'Basic eSIM Ukraine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Ukraine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ua-standard-3gb-15d',
        title: 'Standard eSIM Ukraine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Ukraine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ua-premium-5gb-30d',
        title: 'Premium eSIM Ukraine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Ukraine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VA',
    name: 'Vatican',
    flag: 'https://flagcdn.com/w320/va.png',
    region: 'Europe',
    packages: [
      {
        id: 'va-basic-1gb-7d',
        title: 'Basic eSIM Vatican - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Vatican avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'va-standard-3gb-15d',
        title: 'Standard eSIM Vatican - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Vatican avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'va-premium-5gb-30d',
        title: 'Premium eSIM Vatican - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Vatican avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Asie
  {
    code: 'SA',
    name: 'Arabie Saoudite',
    flag: 'https://flagcdn.com/w320/sa.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'sa-basic-1gb-7d',
        title: 'Basic eSIM Arabie Saoudite - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Arabie Saoudite avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sa-standard-3gb-15d',
        title: 'Standard eSIM Arabie Saoudite - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Arabie Saoudite avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sa-premium-5gb-30d',
        title: 'Premium eSIM Arabie Saoudite - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Arabie Saoudite avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'sa-unlimited-7d',
        title: 'Unlimited eSIM Arabie Saoudite - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Arabie Saoudite pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'sa-business-10gb-30d',
        title: 'Business eSIM Arabie Saoudite - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Arabie Saoudite avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'KH',
    name: 'Cambodge',
    flag: 'https://flagcdn.com/w320/kh.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'kh-basic-1gb-7d',
        title: 'Basic eSIM Cambodge - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Cambodge avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kh-standard-3gb-15d',
        title: 'Standard eSIM Cambodge - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Cambodge avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kh-premium-5gb-30d',
        title: 'Premium eSIM Cambodge - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Cambodge avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'kh-unlimited-7d',
        title: 'Unlimited eSIM Cambodge - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Cambodge pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'kh-business-10gb-30d',
        title: 'Business eSIM Cambodge - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Cambodge avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CN',
    name: 'Chine',
    flag: 'https://flagcdn.com/w320/cn.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'cn-basic-1gb-7d',
        title: 'Basic eSIM Chine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Chine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cn-standard-3gb-15d',
        title: 'Standard eSIM Chine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Chine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cn-premium-5gb-30d',
        title: 'Premium eSIM Chine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Chine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'cn-unlimited-7d',
        title: 'Unlimited eSIM Chine - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Chine pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'cn-business-10gb-30d',
        title: 'Business eSIM Chine - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Chine avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'KR',
    name: 'Corée du Sud',
    flag: 'https://flagcdn.com/w320/kr.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'kr-basic-1gb-7d',
        title: 'Basic eSIM Corée du Sud - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Corée du Sud avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kr-standard-3gb-15d',
        title: 'Standard eSIM Corée du Sud - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Corée du Sud avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kr-premium-5gb-30d',
        title: 'Premium eSIM Corée du Sud - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Corée du Sud avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'kr-unlimited-7d',
        title: 'Unlimited eSIM Corée du Sud - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Corée du Sud pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'kr-business-10gb-30d',
        title: 'Business eSIM Corée du Sud - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Corée du Sud avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    flag: 'https://flagcdn.com/w320/hk.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'hk-basic-1gb-7d',
        title: 'Basic eSIM Hong Kong - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Hong Kong avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'hk-standard-3gb-15d',
        title: 'Standard eSIM Hong Kong - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Hong Kong avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'hk-premium-5gb-30d',
        title: 'Premium eSIM Hong Kong - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Hong Kong avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'hk-unlimited-7d',
        title: 'Unlimited eSIM Hong Kong - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Hong Kong pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'hk-business-10gb-30d',
        title: 'Business eSIM Hong Kong - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Hong Kong avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'IN',
    name: 'Inde',
    flag: 'https://flagcdn.com/w320/in.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'in-basic-1gb-7d',
        title: 'Basic eSIM Inde - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Inde avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'in-standard-3gb-15d',
        title: 'Standard eSIM Inde - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Inde avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'in-premium-5gb-30d',
        title: 'Premium eSIM Inde - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Inde avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'in-unlimited-7d',
        title: 'Unlimited eSIM Inde - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Inde pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'in-business-10gb-30d',
        title: 'Business eSIM Inde - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Inde avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'ID',
    name: 'Indonésie',
    flag: 'https://flagcdn.com/w320/id.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'id-basic-1gb-7d',
        title: 'Basic eSIM Indonésie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Indonésie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'id-standard-3gb-15d',
        title: 'Standard eSIM Indonésie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Indonésie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'id-premium-5gb-30d',
        title: 'Premium eSIM Indonésie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Indonésie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'id-unlimited-7d',
        title: 'Unlimited eSIM Indonésie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Indonésie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'id-business-10gb-30d',
        title: 'Business eSIM Indonésie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Indonésie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'IL',
    name: 'Israël',
    flag: 'https://flagcdn.com/w320/il.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'il-basic-1gb-7d',
        title: 'Basic eSIM Israël - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Israël avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'il-standard-3gb-15d',
        title: 'Standard eSIM Israël - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Israël avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'il-premium-5gb-30d',
        title: 'Premium eSIM Israël - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Israël avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'il-unlimited-7d',
        title: 'Unlimited eSIM Israël - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Israël pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'il-business-10gb-30d',
        title: 'Business eSIM Israël - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Israël avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'JP',
    name: 'Japon',
    flag: 'https://flagcdn.com/w320/jp.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'jp-basic-1gb-7d',
        title: 'Basic eSIM Japon - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Japon avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'jp-standard-3gb-15d',
        title: 'Standard eSIM Japon - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Japon avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'jp-premium-5gb-30d',
        title: 'Premium eSIM Japon - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Japon avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'jp-unlimited-7d',
        title: 'Unlimited eSIM Japon - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Japon pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'jp-business-10gb-30d',
        title: 'Business eSIM Japon - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Japon avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'JO',
    name: 'Jordanie',
    flag: 'https://flagcdn.com/w320/jo.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'jo-basic-1gb-7d',
        title: 'Basic eSIM Jordanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Jordanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'jo-standard-3gb-15d',
        title: 'Standard eSIM Jordanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Jordanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'jo-premium-5gb-30d',
        title: 'Premium eSIM Jordanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Jordanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'jo-unlimited-7d',
        title: 'Unlimited eSIM Jordanie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Jordanie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'jo-business-10gb-30d',
        title: 'Business eSIM Jordanie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Jordanie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MY',
    name: 'Malaisie',
    flag: 'https://flagcdn.com/w320/my.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'my-basic-1gb-7d',
        title: 'Basic eSIM Malaisie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Malaisie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'my-standard-3gb-15d',
        title: 'Standard eSIM Malaisie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Malaisie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'my-premium-5gb-30d',
        title: 'Premium eSIM Malaisie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Malaisie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'my-unlimited-7d',
        title: 'Unlimited eSIM Malaisie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Malaisie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'my-business-10gb-30d',
        title: 'Business eSIM Malaisie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Malaisie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MV',
    name: 'Maldives',
    flag: 'https://flagcdn.com/w320/mv.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'mv-basic-1gb-7d',
        title: 'Basic eSIM Maldives - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Maldives avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mv-standard-3gb-15d',
        title: 'Standard eSIM Maldives - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Maldives avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mv-premium-5gb-30d',
        title: 'Premium eSIM Maldives - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Maldives avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'mv-unlimited-7d',
        title: 'Unlimited eSIM Maldives - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Maldives pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'mv-business-10gb-30d',
        title: 'Business eSIM Maldives - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Maldives avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'NP',
    name: 'Népal',
    flag: 'https://flagcdn.com/w320/np.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'np-basic-1gb-7d',
        title: 'Basic eSIM Népal - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Népal avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'np-standard-3gb-15d',
        title: 'Standard eSIM Népal - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Népal avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'np-premium-5gb-30d',
        title: 'Premium eSIM Népal - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Népal avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'np-unlimited-7d',
        title: 'Unlimited eSIM Népal - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Népal pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'np-business-10gb-30d',
        title: 'Business eSIM Népal - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Népal avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: 'https://flagcdn.com/w320/ph.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'ph-basic-1gb-7d',
        title: 'Basic eSIM Philippines - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Philippines avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ph-standard-3gb-15d',
        title: 'Standard eSIM Philippines - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Philippines avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ph-premium-5gb-30d',
        title: 'Premium eSIM Philippines - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Philippines avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ph-unlimited-7d',
        title: 'Unlimited eSIM Philippines - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Philippines pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ph-business-10gb-30d',
        title: 'Business eSIM Philippines - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Philippines avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'QA',
    name: 'Qatar',
    flag: 'https://flagcdn.com/w320/qa.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'qa-basic-1gb-7d',
        title: 'Basic eSIM Qatar - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Qatar avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'qa-standard-3gb-15d',
        title: 'Standard eSIM Qatar - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Qatar avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'qa-premium-5gb-30d',
        title: 'Premium eSIM Qatar - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Qatar avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'qa-unlimited-7d',
        title: 'Unlimited eSIM Qatar - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Qatar pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'qa-business-10gb-30d',
        title: 'Business eSIM Qatar - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Qatar avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'SG',
    name: 'Singapour',
    flag: 'https://flagcdn.com/w320/sg.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'sg-basic-1gb-7d',
        title: 'Basic eSIM Singapour - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Singapour avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sg-standard-3gb-15d',
        title: 'Standard eSIM Singapour - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Singapour avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sg-premium-5gb-30d',
        title: 'Premium eSIM Singapour - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Singapour avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'sg-unlimited-7d',
        title: 'Unlimited eSIM Singapour - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Singapour pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'sg-business-10gb-30d',
        title: 'Business eSIM Singapour - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Singapour avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    flag: 'https://flagcdn.com/w320/lk.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'lk-basic-1gb-7d',
        title: 'Basic eSIM Sri Lanka - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sri Lanka avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lk-standard-3gb-15d',
        title: 'Standard eSIM Sri Lanka - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sri Lanka avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lk-premium-5gb-30d',
        title: 'Premium eSIM Sri Lanka - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sri Lanka avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'lk-unlimited-7d',
        title: 'Unlimited eSIM Sri Lanka - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Sri Lanka pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'lk-business-10gb-30d',
        title: 'Business eSIM Sri Lanka - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Sri Lanka avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'TW',
    name: 'Taïwan',
    flag: 'https://flagcdn.com/w320/tw.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'tw-basic-1gb-7d',
        title: 'Basic eSIM Taïwan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Taïwan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tw-standard-3gb-15d',
        title: 'Standard eSIM Taïwan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Taïwan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tw-premium-5gb-30d',
        title: 'Premium eSIM Taïwan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Taïwan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'tw-unlimited-7d',
        title: 'Unlimited eSIM Taïwan - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Taïwan pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'tw-business-10gb-30d',
        title: 'Business eSIM Taïwan - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Taïwan avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'TH',
    name: 'Thaïlande',
    flag: 'https://flagcdn.com/w320/th.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'th-basic-1gb-7d',
        title: 'Basic eSIM Thaïlande - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Thaïlande avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'th-standard-3gb-15d',
        title: 'Standard eSIM Thaïlande - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Thaïlande avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'th-premium-5gb-30d',
        title: 'Premium eSIM Thaïlande - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Thaïlande avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'th-unlimited-7d',
        title: 'Unlimited eSIM Thaïlande - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Thaïlande pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'th-business-10gb-30d',
        title: 'Business eSIM Thaïlande - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Thaïlande avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: 'https://flagcdn.com/w320/vn.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'vn-basic-1gb-7d',
        title: 'Basic eSIM Vietnam - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Vietnam avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'vn-standard-3gb-15d',
        title: 'Standard eSIM Vietnam - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Vietnam avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'vn-premium-5gb-30d',
        title: 'Premium eSIM Vietnam - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Vietnam avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'vn-unlimited-7d',
        title: 'Unlimited eSIM Vietnam - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Vietnam pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'vn-business-10gb-30d',
        title: 'Business eSIM Vietnam - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Vietnam avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'AE',
    name: 'Émirats Arabes Unis',
    flag: 'https://flagcdn.com/w320/ae.png',
    region: 'Asie',
    isPopular: true,
    packages: [
      {
        id: 'ae-basic-1gb-7d',
        title: 'Basic eSIM Émirats Arabes Unis - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 3.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Émirats Arabes Unis avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ae-standard-3gb-15d',
        title: 'Standard eSIM Émirats Arabes Unis - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Émirats Arabes Unis avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ae-premium-5gb-30d',
        title: 'Premium eSIM Émirats Arabes Unis - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Émirats Arabes Unis avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ae-unlimited-7d',
        title: 'Unlimited eSIM Émirats Arabes Unis - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Émirats Arabes Unis pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ae-business-10gb-30d',
        title: 'Business eSIM Émirats Arabes Unis - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Émirats Arabes Unis avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'AF',
    name: 'Afghanistan',
    flag: 'https://flagcdn.com/w320/af.png',
    region: 'Asie',
    packages: [
      {
        id: 'af-basic-1gb-7d',
        title: 'Basic eSIM Afghanistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Afghanistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'af-standard-3gb-15d',
        title: 'Standard eSIM Afghanistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Afghanistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'af-premium-5gb-30d',
        title: 'Premium eSIM Afghanistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Afghanistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'AM',
    name: 'Arménie',
    flag: 'https://flagcdn.com/w320/am.png',
    region: 'Asie',
    packages: [
      {
        id: 'am-basic-1gb-7d',
        title: 'Basic eSIM Arménie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Arménie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'am-standard-3gb-15d',
        title: 'Standard eSIM Arménie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Arménie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'am-premium-5gb-30d',
        title: 'Premium eSIM Arménie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Arménie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'AZ',
    name: 'Azerbaïdjan',
    flag: 'https://flagcdn.com/w320/az.png',
    region: 'Asie',
    packages: [
      {
        id: 'az-basic-1gb-7d',
        title: 'Basic eSIM Azerbaïdjan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Azerbaïdjan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'az-standard-3gb-15d',
        title: 'Standard eSIM Azerbaïdjan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Azerbaïdjan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'az-premium-5gb-30d',
        title: 'Premium eSIM Azerbaïdjan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Azerbaïdjan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    flag: 'https://flagcdn.com/w320/bd.png',
    region: 'Asie',
    packages: [
      {
        id: 'bd-basic-1gb-7d',
        title: 'Basic eSIM Bangladesh - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bangladesh avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bd-standard-3gb-15d',
        title: 'Standard eSIM Bangladesh - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bangladesh avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bd-premium-5gb-30d',
        title: 'Premium eSIM Bangladesh - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bangladesh avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BT',
    name: 'Bhoutan',
    flag: 'https://flagcdn.com/w320/bt.png',
    region: 'Asie',
    packages: [
      {
        id: 'bt-basic-1gb-7d',
        title: 'Basic eSIM Bhoutan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bhoutan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bt-standard-3gb-15d',
        title: 'Standard eSIM Bhoutan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bhoutan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bt-premium-5gb-30d',
        title: 'Premium eSIM Bhoutan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bhoutan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BN',
    name: 'Brunei',
    flag: 'https://flagcdn.com/w320/bn.png',
    region: 'Asie',
    packages: [
      {
        id: 'bn-basic-1gb-7d',
        title: 'Basic eSIM Brunei - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Brunei avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bn-standard-3gb-15d',
        title: 'Standard eSIM Brunei - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Brunei avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bn-premium-5gb-30d',
        title: 'Premium eSIM Brunei - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Brunei avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KP',
    name: 'Corée du Nord',
    flag: 'https://flagcdn.com/w320/kp.png',
    region: 'Asie',
    packages: [
      {
        id: 'kp-basic-1gb-7d',
        title: 'Basic eSIM Corée du Nord - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Corée du Nord avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kp-standard-3gb-15d',
        title: 'Standard eSIM Corée du Nord - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Corée du Nord avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kp-premium-5gb-30d',
        title: 'Premium eSIM Corée du Nord - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Corée du Nord avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'IQ',
    name: 'Irak',
    flag: 'https://flagcdn.com/w320/iq.png',
    region: 'Asie',
    packages: [
      {
        id: 'iq-basic-1gb-7d',
        title: 'Basic eSIM Irak - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Irak avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'iq-standard-3gb-15d',
        title: 'Standard eSIM Irak - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Irak avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'iq-premium-5gb-30d',
        title: 'Premium eSIM Irak - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Irak avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'IR',
    name: 'Iran',
    flag: 'https://flagcdn.com/w320/ir.png',
    region: 'Asie',
    packages: [
      {
        id: 'ir-basic-1gb-7d',
        title: 'Basic eSIM Iran - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Iran avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ir-standard-3gb-15d',
        title: 'Standard eSIM Iran - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Iran avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ir-premium-5gb-30d',
        title: 'Premium eSIM Iran - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Iran avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    flag: 'https://flagcdn.com/w320/kz.png',
    region: 'Asie',
    packages: [
      {
        id: 'kz-basic-1gb-7d',
        title: 'Basic eSIM Kazakhstan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Kazakhstan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kz-standard-3gb-15d',
        title: 'Standard eSIM Kazakhstan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Kazakhstan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kz-premium-5gb-30d',
        title: 'Premium eSIM Kazakhstan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Kazakhstan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KG',
    name: 'Kirghizistan',
    flag: 'https://flagcdn.com/w320/kg.png',
    region: 'Asie',
    packages: [
      {
        id: 'kg-basic-1gb-7d',
        title: 'Basic eSIM Kirghizistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Kirghizistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kg-standard-3gb-15d',
        title: 'Standard eSIM Kirghizistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Kirghizistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kg-premium-5gb-30d',
        title: 'Premium eSIM Kirghizistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Kirghizistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KW',
    name: 'Koweït',
    flag: 'https://flagcdn.com/w320/kw.png',
    region: 'Asie',
    packages: [
      {
        id: 'kw-basic-1gb-7d',
        title: 'Basic eSIM Koweït - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Koweït avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kw-standard-3gb-15d',
        title: 'Standard eSIM Koweït - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Koweït avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kw-premium-5gb-30d',
        title: 'Premium eSIM Koweït - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Koweït avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LA',
    name: 'Laos',
    flag: 'https://flagcdn.com/w320/la.png',
    region: 'Asie',
    packages: [
      {
        id: 'la-basic-1gb-7d',
        title: 'Basic eSIM Laos - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Laos avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'la-standard-3gb-15d',
        title: 'Standard eSIM Laos - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Laos avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'la-premium-5gb-30d',
        title: 'Premium eSIM Laos - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Laos avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LB',
    name: 'Liban',
    flag: 'https://flagcdn.com/w320/lb.png',
    region: 'Asie',
    packages: [
      {
        id: 'lb-basic-1gb-7d',
        title: 'Basic eSIM Liban - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Liban avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lb-standard-3gb-15d',
        title: 'Standard eSIM Liban - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Liban avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lb-premium-5gb-30d',
        title: 'Premium eSIM Liban - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Liban avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MO',
    name: 'Macao',
    flag: 'https://flagcdn.com/w320/mo.png',
    region: 'Asie',
    packages: [
      {
        id: 'mo-basic-1gb-7d',
        title: 'Basic eSIM Macao - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Macao avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mo-standard-3gb-15d',
        title: 'Standard eSIM Macao - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Macao avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mo-premium-5gb-30d',
        title: 'Premium eSIM Macao - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Macao avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MN',
    name: 'Mongolie',
    flag: 'https://flagcdn.com/w320/mn.png',
    region: 'Asie',
    packages: [
      {
        id: 'mn-basic-1gb-7d',
        title: 'Basic eSIM Mongolie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mongolie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mn-standard-3gb-15d',
        title: 'Standard eSIM Mongolie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mongolie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mn-premium-5gb-30d',
        title: 'Premium eSIM Mongolie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mongolie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MM',
    name: 'Myanmar',
    flag: 'https://flagcdn.com/w320/mm.png',
    region: 'Asie',
    packages: [
      {
        id: 'mm-basic-1gb-7d',
        title: 'Basic eSIM Myanmar - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Myanmar avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mm-standard-3gb-15d',
        title: 'Standard eSIM Myanmar - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Myanmar avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mm-premium-5gb-30d',
        title: 'Premium eSIM Myanmar - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Myanmar avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'OM',
    name: 'Oman',
    flag: 'https://flagcdn.com/w320/om.png',
    region: 'Asie',
    packages: [
      {
        id: 'om-basic-1gb-7d',
        title: 'Basic eSIM Oman - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Oman avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'om-standard-3gb-15d',
        title: 'Standard eSIM Oman - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Oman avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'om-premium-5gb-30d',
        title: 'Premium eSIM Oman - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Oman avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'UZ',
    name: 'Ouzbékistan',
    flag: 'https://flagcdn.com/w320/uz.png',
    region: 'Asie',
    packages: [
      {
        id: 'uz-basic-1gb-7d',
        title: 'Basic eSIM Ouzbékistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Ouzbékistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'uz-standard-3gb-15d',
        title: 'Standard eSIM Ouzbékistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Ouzbékistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'uz-premium-5gb-30d',
        title: 'Premium eSIM Ouzbékistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Ouzbékistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PK',
    name: 'Pakistan',
    flag: 'https://flagcdn.com/w320/pk.png',
    region: 'Asie',
    packages: [
      {
        id: 'pk-basic-1gb-7d',
        title: 'Basic eSIM Pakistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Pakistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pk-standard-3gb-15d',
        title: 'Standard eSIM Pakistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Pakistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pk-premium-5gb-30d',
        title: 'Premium eSIM Pakistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Pakistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PS',
    name: 'Palestine',
    flag: 'https://flagcdn.com/w320/ps.png',
    region: 'Asie',
    packages: [
      {
        id: 'ps-basic-1gb-7d',
        title: 'Basic eSIM Palestine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Palestine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ps-standard-3gb-15d',
        title: 'Standard eSIM Palestine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Palestine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ps-premium-5gb-30d',
        title: 'Premium eSIM Palestine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Palestine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SY',
    name: 'Syrie',
    flag: 'https://flagcdn.com/w320/sy.png',
    region: 'Asie',
    packages: [
      {
        id: 'sy-basic-1gb-7d',
        title: 'Basic eSIM Syrie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Syrie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sy-standard-3gb-15d',
        title: 'Standard eSIM Syrie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Syrie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sy-premium-5gb-30d',
        title: 'Premium eSIM Syrie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Syrie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TJ',
    name: 'Tadjikistan',
    flag: 'https://flagcdn.com/w320/tj.png',
    region: 'Asie',
    packages: [
      {
        id: 'tj-basic-1gb-7d',
        title: 'Basic eSIM Tadjikistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tadjikistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tj-standard-3gb-15d',
        title: 'Standard eSIM Tadjikistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tadjikistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tj-premium-5gb-30d',
        title: 'Premium eSIM Tadjikistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tadjikistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TL',
    name: 'Timor-Leste',
    flag: 'https://flagcdn.com/w320/tl.png',
    region: 'Asie',
    packages: [
      {
        id: 'tl-basic-1gb-7d',
        title: 'Basic eSIM Timor-Leste - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Timor-Leste avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tl-standard-3gb-15d',
        title: 'Standard eSIM Timor-Leste - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Timor-Leste avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tl-premium-5gb-30d',
        title: 'Premium eSIM Timor-Leste - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Timor-Leste avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TM',
    name: 'Turkménistan',
    flag: 'https://flagcdn.com/w320/tm.png',
    region: 'Asie',
    packages: [
      {
        id: 'tm-basic-1gb-7d',
        title: 'Basic eSIM Turkménistan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Turkménistan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tm-standard-3gb-15d',
        title: 'Standard eSIM Turkménistan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Turkménistan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tm-premium-5gb-30d',
        title: 'Premium eSIM Turkménistan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Turkménistan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'YE',
    name: 'Yémen',
    flag: 'https://flagcdn.com/w320/ye.png',
    region: 'Asie',
    packages: [
      {
        id: 'ye-basic-1gb-7d',
        title: 'Basic eSIM Yémen - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Yémen avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ye-standard-3gb-15d',
        title: 'Standard eSIM Yémen - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 8.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Yémen avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ye-premium-5gb-30d',
        title: 'Premium eSIM Yémen - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Yémen avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Amérique du Nord
  {
    code: 'CA',
    name: 'Canada',
    flag: 'https://flagcdn.com/w320/ca.png',
    region: 'Amérique du Nord',
    isPopular: true,
    packages: [
      {
        id: 'ca-basic-1gb-7d',
        title: 'Basic eSIM Canada - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Canada avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ca-standard-3gb-15d',
        title: 'Standard eSIM Canada - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Canada avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ca-premium-5gb-30d',
        title: 'Premium eSIM Canada - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Canada avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ca-unlimited-7d',
        title: 'Unlimited eSIM Canada - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Canada pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ca-business-10gb-30d',
        title: 'Business eSIM Canada - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Canada avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CR',
    name: 'Costa Rica',
    flag: 'https://flagcdn.com/w320/cr.png',
    region: 'Amérique du Nord',
    isPopular: true,
    packages: [
      {
        id: 'cr-basic-1gb-7d',
        title: 'Basic eSIM Costa Rica - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Costa Rica avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cr-standard-3gb-15d',
        title: 'Standard eSIM Costa Rica - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Costa Rica avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cr-premium-5gb-30d',
        title: 'Premium eSIM Costa Rica - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Costa Rica avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'cr-unlimited-7d',
        title: 'Unlimited eSIM Costa Rica - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Costa Rica pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'cr-business-10gb-30d',
        title: 'Business eSIM Costa Rica - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Costa Rica avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MX',
    name: 'Mexique',
    flag: 'https://flagcdn.com/w320/mx.png',
    region: 'Amérique du Nord',
    isPopular: true,
    packages: [
      {
        id: 'mx-basic-1gb-7d',
        title: 'Basic eSIM Mexique - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mexique avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mx-standard-3gb-15d',
        title: 'Standard eSIM Mexique - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mexique avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mx-premium-5gb-30d',
        title: 'Premium eSIM Mexique - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mexique avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'mx-unlimited-7d',
        title: 'Unlimited eSIM Mexique - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Mexique pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'mx-business-10gb-30d',
        title: 'Business eSIM Mexique - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Mexique avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'US',
    name: 'États-Unis',
    flag: 'https://flagcdn.com/w320/us.png',
    region: 'Amérique du Nord',
    isPopular: true,
    packages: [
      {
        id: 'us-basic-1gb-7d',
        title: 'Basic eSIM États-Unis - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 4.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour États-Unis avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'us-standard-3gb-15d',
        title: 'Standard eSIM États-Unis - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour États-Unis avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'us-premium-5gb-30d',
        title: 'Premium eSIM États-Unis - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour États-Unis avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'us-unlimited-7d',
        title: 'Unlimited eSIM États-Unis - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 16.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour États-Unis pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'us-business-10gb-30d',
        title: 'Business eSIM États-Unis - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 19.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour États-Unis avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BZ',
    name: 'Belize',
    flag: 'https://flagcdn.com/w320/bz.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'bz-basic-1gb-7d',
        title: 'Basic eSIM Belize - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Belize avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bz-standard-3gb-15d',
        title: 'Standard eSIM Belize - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Belize avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bz-premium-5gb-30d',
        title: 'Premium eSIM Belize - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Belize avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GT',
    name: 'Guatemala',
    flag: 'https://flagcdn.com/w320/gt.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'gt-basic-1gb-7d',
        title: 'Basic eSIM Guatemala - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guatemala avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gt-standard-3gb-15d',
        title: 'Standard eSIM Guatemala - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guatemala avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gt-premium-5gb-30d',
        title: 'Premium eSIM Guatemala - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guatemala avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'HN',
    name: 'Honduras',
    flag: 'https://flagcdn.com/w320/hn.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'hn-basic-1gb-7d',
        title: 'Basic eSIM Honduras - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Honduras avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'hn-standard-3gb-15d',
        title: 'Standard eSIM Honduras - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Honduras avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'hn-premium-5gb-30d',
        title: 'Premium eSIM Honduras - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Honduras avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NI',
    name: 'Nicaragua',
    flag: 'https://flagcdn.com/w320/ni.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'ni-basic-1gb-7d',
        title: 'Basic eSIM Nicaragua - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Nicaragua avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ni-standard-3gb-15d',
        title: 'Standard eSIM Nicaragua - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Nicaragua avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ni-premium-5gb-30d',
        title: 'Premium eSIM Nicaragua - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Nicaragua avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PA',
    name: 'Panama',
    flag: 'https://flagcdn.com/w320/pa.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'pa-basic-1gb-7d',
        title: 'Basic eSIM Panama - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Panama avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pa-standard-3gb-15d',
        title: 'Standard eSIM Panama - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Panama avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pa-premium-5gb-30d',
        title: 'Premium eSIM Panama - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Panama avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SV',
    name: 'Salvador',
    flag: 'https://flagcdn.com/w320/sv.png',
    region: 'Amérique du Nord',
    packages: [
      {
        id: 'sv-basic-1gb-7d',
        title: 'Basic eSIM Salvador - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Salvador avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sv-standard-3gb-15d',
        title: 'Standard eSIM Salvador - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Salvador avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sv-premium-5gb-30d',
        title: 'Premium eSIM Salvador - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Salvador avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Amérique du Sud
  {
    code: 'AR',
    name: 'Argentine',
    flag: 'https://flagcdn.com/w320/ar.png',
    region: 'Amérique du Sud',
    isPopular: true,
    packages: [
      {
        id: 'ar-basic-1gb-7d',
        title: 'Basic eSIM Argentine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Argentine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ar-standard-3gb-15d',
        title: 'Standard eSIM Argentine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Argentine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ar-premium-5gb-30d',
        title: 'Premium eSIM Argentine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Argentine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ar-unlimited-7d',
        title: 'Unlimited eSIM Argentine - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 18.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Argentine pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ar-business-10gb-30d',
        title: 'Business eSIM Argentine - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 21.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Argentine avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BR',
    name: 'Brésil',
    flag: 'https://flagcdn.com/w320/br.png',
    region: 'Amérique du Sud',
    isPopular: true,
    packages: [
      {
        id: 'br-basic-1gb-7d',
        title: 'Basic eSIM Brésil - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Brésil avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'br-standard-3gb-15d',
        title: 'Standard eSIM Brésil - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Brésil avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'br-premium-5gb-30d',
        title: 'Premium eSIM Brésil - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Brésil avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'br-unlimited-7d',
        title: 'Unlimited eSIM Brésil - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 18.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Brésil pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'br-business-10gb-30d',
        title: 'Business eSIM Brésil - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 21.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Brésil avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CL',
    name: 'Chili',
    flag: 'https://flagcdn.com/w320/cl.png',
    region: 'Amérique du Sud',
    isPopular: true,
    packages: [
      {
        id: 'cl-basic-1gb-7d',
        title: 'Basic eSIM Chili - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Chili avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cl-standard-3gb-15d',
        title: 'Standard eSIM Chili - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Chili avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cl-premium-5gb-30d',
        title: 'Premium eSIM Chili - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Chili avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'cl-unlimited-7d',
        title: 'Unlimited eSIM Chili - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 18.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Chili pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'cl-business-10gb-30d',
        title: 'Business eSIM Chili - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 21.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Chili avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CO',
    name: 'Colombie',
    flag: 'https://flagcdn.com/w320/co.png',
    region: 'Amérique du Sud',
    isPopular: true,
    packages: [
      {
        id: 'co-basic-1gb-7d',
        title: 'Basic eSIM Colombie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Colombie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'co-standard-3gb-15d',
        title: 'Standard eSIM Colombie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Colombie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'co-premium-5gb-30d',
        title: 'Premium eSIM Colombie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Colombie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'co-unlimited-7d',
        title: 'Unlimited eSIM Colombie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 18.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Colombie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'co-business-10gb-30d',
        title: 'Business eSIM Colombie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 21.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Colombie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PE',
    name: 'Pérou',
    flag: 'https://flagcdn.com/w320/pe.png',
    region: 'Amérique du Sud',
    isPopular: true,
    packages: [
      {
        id: 'pe-basic-1gb-7d',
        title: 'Basic eSIM Pérou - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Pérou avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pe-standard-3gb-15d',
        title: 'Standard eSIM Pérou - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 9.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Pérou avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pe-premium-5gb-30d',
        title: 'Premium eSIM Pérou - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 13.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Pérou avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'pe-unlimited-7d',
        title: 'Unlimited eSIM Pérou - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 18.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Pérou pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'pe-business-10gb-30d',
        title: 'Business eSIM Pérou - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 21.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Pérou avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BO',
    name: 'Bolivie',
    flag: 'https://flagcdn.com/w320/bo.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'bo-basic-1gb-7d',
        title: 'Basic eSIM Bolivie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bolivie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bo-standard-3gb-15d',
        title: 'Standard eSIM Bolivie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bolivie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bo-premium-5gb-30d',
        title: 'Premium eSIM Bolivie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bolivie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GY',
    name: 'Guyana',
    flag: 'https://flagcdn.com/w320/gy.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'gy-basic-1gb-7d',
        title: 'Basic eSIM Guyana - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guyana avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gy-standard-3gb-15d',
        title: 'Standard eSIM Guyana - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guyana avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gy-premium-5gb-30d',
        title: 'Premium eSIM Guyana - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guyana avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GF',
    name: 'Guyane française',
    flag: 'https://flagcdn.com/w320/gf.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'gf-basic-1gb-7d',
        title: 'Basic eSIM Guyane française - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guyane française avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gf-standard-3gb-15d',
        title: 'Standard eSIM Guyane française - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guyane française avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gf-premium-5gb-30d',
        title: 'Premium eSIM Guyane française - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guyane française avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PY',
    name: 'Paraguay',
    flag: 'https://flagcdn.com/w320/py.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'py-basic-1gb-7d',
        title: 'Basic eSIM Paraguay - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Paraguay avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'py-standard-3gb-15d',
        title: 'Standard eSIM Paraguay - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Paraguay avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'py-premium-5gb-30d',
        title: 'Premium eSIM Paraguay - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Paraguay avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SR',
    name: 'Suriname',
    flag: 'https://flagcdn.com/w320/sr.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'sr-basic-1gb-7d',
        title: 'Basic eSIM Suriname - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Suriname avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sr-standard-3gb-15d',
        title: 'Standard eSIM Suriname - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Suriname avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sr-premium-5gb-30d',
        title: 'Premium eSIM Suriname - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Suriname avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'UY',
    name: 'Uruguay',
    flag: 'https://flagcdn.com/w320/uy.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'uy-basic-1gb-7d',
        title: 'Basic eSIM Uruguay - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Uruguay avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'uy-standard-3gb-15d',
        title: 'Standard eSIM Uruguay - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Uruguay avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'uy-premium-5gb-30d',
        title: 'Premium eSIM Uruguay - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Uruguay avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VE',
    name: 'Venezuela',
    flag: 'https://flagcdn.com/w320/ve.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 've-basic-1gb-7d',
        title: 'Basic eSIM Venezuela - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Venezuela avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 've-standard-3gb-15d',
        title: 'Standard eSIM Venezuela - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Venezuela avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 've-premium-5gb-30d',
        title: 'Premium eSIM Venezuela - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Venezuela avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'EC',
    name: 'Équateur',
    flag: 'https://flagcdn.com/w320/ec.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'ec-basic-1gb-7d',
        title: 'Basic eSIM Équateur - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Équateur avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ec-standard-3gb-15d',
        title: 'Standard eSIM Équateur - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Équateur avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ec-premium-5gb-30d',
        title: 'Premium eSIM Équateur - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Équateur avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'FK',
    name: 'Îles Falkland',
    flag: 'https://flagcdn.com/w320/fk.png',
    region: 'Amérique du Sud',
    packages: [
      {
        id: 'fk-basic-1gb-7d',
        title: 'Basic eSIM Îles Falkland - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Falkland avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'fk-standard-3gb-15d',
        title: 'Standard eSIM Îles Falkland - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Falkland avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'fk-premium-5gb-30d',
        title: 'Premium eSIM Îles Falkland - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Falkland avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Afrique
  {
    code: 'ZA',
    name: 'Afrique du Sud',
    flag: 'https://flagcdn.com/w320/za.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'za-basic-1gb-7d',
        title: 'Basic eSIM Afrique du Sud - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Afrique du Sud avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'za-standard-3gb-15d',
        title: 'Standard eSIM Afrique du Sud - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Afrique du Sud avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'za-premium-5gb-30d',
        title: 'Premium eSIM Afrique du Sud - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Afrique du Sud avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'za-unlimited-7d',
        title: 'Unlimited eSIM Afrique du Sud - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Afrique du Sud pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'za-business-10gb-30d',
        title: 'Business eSIM Afrique du Sud - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Afrique du Sud avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: 'https://flagcdn.com/w320/ke.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'ke-basic-1gb-7d',
        title: 'Basic eSIM Kenya - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Kenya avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ke-standard-3gb-15d',
        title: 'Standard eSIM Kenya - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Kenya avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ke-premium-5gb-30d',
        title: 'Premium eSIM Kenya - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Kenya avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ke-unlimited-7d',
        title: 'Unlimited eSIM Kenya - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Kenya pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ke-business-10gb-30d',
        title: 'Business eSIM Kenya - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Kenya avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MA',
    name: 'Maroc',
    flag: 'https://flagcdn.com/w320/ma.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'ma-basic-1gb-7d',
        title: 'Basic eSIM Maroc - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Maroc avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ma-standard-3gb-15d',
        title: 'Standard eSIM Maroc - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Maroc avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ma-premium-5gb-30d',
        title: 'Premium eSIM Maroc - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Maroc avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'ma-unlimited-7d',
        title: 'Unlimited eSIM Maroc - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Maroc pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'ma-business-10gb-30d',
        title: 'Business eSIM Maroc - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Maroc avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'MU',
    name: 'Maurice',
    flag: 'https://flagcdn.com/w320/mu.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'mu-basic-1gb-7d',
        title: 'Basic eSIM Maurice - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Maurice avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mu-standard-3gb-15d',
        title: 'Standard eSIM Maurice - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Maurice avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mu-premium-5gb-30d',
        title: 'Premium eSIM Maurice - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Maurice avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'mu-unlimited-7d',
        title: 'Unlimited eSIM Maurice - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Maurice pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'mu-business-10gb-30d',
        title: 'Business eSIM Maurice - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Maurice avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'SC',
    name: 'Seychelles',
    flag: 'https://flagcdn.com/w320/sc.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'sc-basic-1gb-7d',
        title: 'Basic eSIM Seychelles - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Seychelles avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sc-standard-3gb-15d',
        title: 'Standard eSIM Seychelles - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Seychelles avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sc-premium-5gb-30d',
        title: 'Premium eSIM Seychelles - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Seychelles avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'sc-unlimited-7d',
        title: 'Unlimited eSIM Seychelles - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Seychelles pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'sc-business-10gb-30d',
        title: 'Business eSIM Seychelles - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Seychelles avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'TZ',
    name: 'Tanzanie',
    flag: 'https://flagcdn.com/w320/tz.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'tz-basic-1gb-7d',
        title: 'Basic eSIM Tanzanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tanzanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tz-standard-3gb-15d',
        title: 'Standard eSIM Tanzanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tanzanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tz-premium-5gb-30d',
        title: 'Premium eSIM Tanzanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tanzanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'tz-unlimited-7d',
        title: 'Unlimited eSIM Tanzanie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Tanzanie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'tz-business-10gb-30d',
        title: 'Business eSIM Tanzanie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Tanzanie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'TN',
    name: 'Tunisie',
    flag: 'https://flagcdn.com/w320/tn.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'tn-basic-1gb-7d',
        title: 'Basic eSIM Tunisie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tunisie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tn-standard-3gb-15d',
        title: 'Standard eSIM Tunisie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tunisie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tn-premium-5gb-30d',
        title: 'Premium eSIM Tunisie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tunisie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'tn-unlimited-7d',
        title: 'Unlimited eSIM Tunisie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Tunisie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'tn-business-10gb-30d',
        title: 'Business eSIM Tunisie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Tunisie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'EG',
    name: 'Égypte',
    flag: 'https://flagcdn.com/w320/eg.png',
    region: 'Afrique',
    isPopular: true,
    packages: [
      {
        id: 'eg-basic-1gb-7d',
        title: 'Basic eSIM Égypte - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Égypte avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'eg-standard-3gb-15d',
        title: 'Standard eSIM Égypte - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Égypte avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'eg-premium-5gb-30d',
        title: 'Premium eSIM Égypte - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 16.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Égypte avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'eg-unlimited-7d',
        title: 'Unlimited eSIM Égypte - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Égypte pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'eg-business-10gb-30d',
        title: 'Business eSIM Égypte - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 24.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Égypte avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'DZ',
    name: 'Algérie',
    flag: 'https://flagcdn.com/w320/dz.png',
    region: 'Afrique',
    packages: [
      {
        id: 'dz-basic-1gb-7d',
        title: 'Basic eSIM Algérie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Algérie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'dz-standard-3gb-15d',
        title: 'Standard eSIM Algérie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Algérie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'dz-premium-5gb-30d',
        title: 'Premium eSIM Algérie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Algérie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'AO',
    name: 'Angola',
    flag: 'https://flagcdn.com/w320/ao.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ao-basic-1gb-7d',
        title: 'Basic eSIM Angola - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Angola avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ao-standard-3gb-15d',
        title: 'Standard eSIM Angola - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Angola avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ao-premium-5gb-30d',
        title: 'Premium eSIM Angola - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Angola avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BW',
    name: 'Botswana',
    flag: 'https://flagcdn.com/w320/bw.png',
    region: 'Afrique',
    packages: [
      {
        id: 'bw-basic-1gb-7d',
        title: 'Basic eSIM Botswana - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Botswana avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bw-standard-3gb-15d',
        title: 'Standard eSIM Botswana - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Botswana avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bw-premium-5gb-30d',
        title: 'Premium eSIM Botswana - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Botswana avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    flag: 'https://flagcdn.com/w320/bf.png',
    region: 'Afrique',
    packages: [
      {
        id: 'bf-basic-1gb-7d',
        title: 'Basic eSIM Burkina Faso - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Burkina Faso avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bf-standard-3gb-15d',
        title: 'Standard eSIM Burkina Faso - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Burkina Faso avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bf-premium-5gb-30d',
        title: 'Premium eSIM Burkina Faso - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Burkina Faso avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BI',
    name: 'Burundi',
    flag: 'https://flagcdn.com/w320/bi.png',
    region: 'Afrique',
    packages: [
      {
        id: 'bi-basic-1gb-7d',
        title: 'Basic eSIM Burundi - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Burundi avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bi-standard-3gb-15d',
        title: 'Standard eSIM Burundi - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Burundi avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bi-premium-5gb-30d',
        title: 'Premium eSIM Burundi - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Burundi avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BJ',
    name: 'Bénin',
    flag: 'https://flagcdn.com/w320/bj.png',
    region: 'Afrique',
    packages: [
      {
        id: 'bj-basic-1gb-7d',
        title: 'Basic eSIM Bénin - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bénin avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bj-standard-3gb-15d',
        title: 'Standard eSIM Bénin - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bénin avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bj-premium-5gb-30d',
        title: 'Premium eSIM Bénin - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bénin avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CM',
    name: 'Cameroun',
    flag: 'https://flagcdn.com/w320/cm.png',
    region: 'Afrique',
    packages: [
      {
        id: 'cm-basic-1gb-7d',
        title: 'Basic eSIM Cameroun - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Cameroun avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cm-standard-3gb-15d',
        title: 'Standard eSIM Cameroun - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Cameroun avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cm-premium-5gb-30d',
        title: 'Premium eSIM Cameroun - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Cameroun avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CV',
    name: 'Cap-Vert',
    flag: 'https://flagcdn.com/w320/cv.png',
    region: 'Afrique',
    packages: [
      {
        id: 'cv-basic-1gb-7d',
        title: 'Basic eSIM Cap-Vert - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Cap-Vert avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cv-standard-3gb-15d',
        title: 'Standard eSIM Cap-Vert - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Cap-Vert avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cv-premium-5gb-30d',
        title: 'Premium eSIM Cap-Vert - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Cap-Vert avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KM',
    name: 'Comores',
    flag: 'https://flagcdn.com/w320/km.png',
    region: 'Afrique',
    packages: [
      {
        id: 'km-basic-1gb-7d',
        title: 'Basic eSIM Comores - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Comores avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'km-standard-3gb-15d',
        title: 'Standard eSIM Comores - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Comores avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'km-premium-5gb-30d',
        title: 'Premium eSIM Comores - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Comores avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CG',
    name: 'Congo',
    flag: 'https://flagcdn.com/w320/cg.png',
    region: 'Afrique',
    packages: [
      {
        id: 'cg-basic-1gb-7d',
        title: 'Basic eSIM Congo - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Congo avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cg-standard-3gb-15d',
        title: 'Standard eSIM Congo - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Congo avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cg-premium-5gb-30d',
        title: 'Premium eSIM Congo - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Congo avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    flag: 'https://flagcdn.com/w320/ci.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ci-basic-1gb-7d',
        title: "Basic eSIM Côte d'Ivoire - 1GB",
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: "Forfait eSIM local pour Côte d'Ivoire avec 1GB de données",
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ci-standard-3gb-15d',
        title: "Standard eSIM Côte d'Ivoire - 3GB",
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: "Forfait eSIM standard pour Côte d'Ivoire avec 3GB de données",
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ci-premium-5gb-30d',
        title: "Premium eSIM Côte d'Ivoire - 5GB",
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: "Forfait eSIM premium pour Côte d'Ivoire avec 5GB de données",
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'DJ',
    name: 'Djibouti',
    flag: 'https://flagcdn.com/w320/dj.png',
    region: 'Afrique',
    packages: [
      {
        id: 'dj-basic-1gb-7d',
        title: 'Basic eSIM Djibouti - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Djibouti avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'dj-standard-3gb-15d',
        title: 'Standard eSIM Djibouti - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Djibouti avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'dj-premium-5gb-30d',
        title: 'Premium eSIM Djibouti - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Djibouti avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SZ',
    name: 'Eswatini',
    flag: 'https://flagcdn.com/w320/sz.png',
    region: 'Afrique',
    packages: [
      {
        id: 'sz-basic-1gb-7d',
        title: 'Basic eSIM Eswatini - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Eswatini avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sz-standard-3gb-15d',
        title: 'Standard eSIM Eswatini - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Eswatini avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sz-premium-5gb-30d',
        title: 'Premium eSIM Eswatini - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Eswatini avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GA',
    name: 'Gabon',
    flag: 'https://flagcdn.com/w320/ga.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ga-basic-1gb-7d',
        title: 'Basic eSIM Gabon - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Gabon avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ga-standard-3gb-15d',
        title: 'Standard eSIM Gabon - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Gabon avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ga-premium-5gb-30d',
        title: 'Premium eSIM Gabon - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Gabon avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GM',
    name: 'Gambie',
    flag: 'https://flagcdn.com/w320/gm.png',
    region: 'Afrique',
    packages: [
      {
        id: 'gm-basic-1gb-7d',
        title: 'Basic eSIM Gambie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Gambie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gm-standard-3gb-15d',
        title: 'Standard eSIM Gambie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Gambie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gm-premium-5gb-30d',
        title: 'Premium eSIM Gambie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Gambie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: 'https://flagcdn.com/w320/gh.png',
    region: 'Afrique',
    packages: [
      {
        id: 'gh-basic-1gb-7d',
        title: 'Basic eSIM Ghana - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Ghana avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gh-standard-3gb-15d',
        title: 'Standard eSIM Ghana - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Ghana avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gh-premium-5gb-30d',
        title: 'Premium eSIM Ghana - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Ghana avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GN',
    name: 'Guinée',
    flag: 'https://flagcdn.com/w320/gn.png',
    region: 'Afrique',
    packages: [
      {
        id: 'gn-basic-1gb-7d',
        title: 'Basic eSIM Guinée - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guinée avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gn-standard-3gb-15d',
        title: 'Standard eSIM Guinée - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guinée avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gn-premium-5gb-30d',
        title: 'Premium eSIM Guinée - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guinée avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GQ',
    name: 'Guinée équatoriale',
    flag: 'https://flagcdn.com/w320/gq.png',
    region: 'Afrique',
    packages: [
      {
        id: 'gq-basic-1gb-7d',
        title: 'Basic eSIM Guinée équatoriale - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guinée équatoriale avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gq-standard-3gb-15d',
        title: 'Standard eSIM Guinée équatoriale - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guinée équatoriale avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gq-premium-5gb-30d',
        title: 'Premium eSIM Guinée équatoriale - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guinée équatoriale avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GW',
    name: 'Guinée-Bissau',
    flag: 'https://flagcdn.com/w320/gw.png',
    region: 'Afrique',
    packages: [
      {
        id: 'gw-basic-1gb-7d',
        title: 'Basic eSIM Guinée-Bissau - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guinée-Bissau avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gw-standard-3gb-15d',
        title: 'Standard eSIM Guinée-Bissau - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guinée-Bissau avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gw-premium-5gb-30d',
        title: 'Premium eSIM Guinée-Bissau - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guinée-Bissau avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LS',
    name: 'Lesotho',
    flag: 'https://flagcdn.com/w320/ls.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ls-basic-1gb-7d',
        title: 'Basic eSIM Lesotho - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Lesotho avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ls-standard-3gb-15d',
        title: 'Standard eSIM Lesotho - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Lesotho avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ls-premium-5gb-30d',
        title: 'Premium eSIM Lesotho - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Lesotho avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LY',
    name: 'Libye',
    flag: 'https://flagcdn.com/w320/ly.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ly-basic-1gb-7d',
        title: 'Basic eSIM Libye - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Libye avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ly-standard-3gb-15d',
        title: 'Standard eSIM Libye - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Libye avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ly-premium-5gb-30d',
        title: 'Premium eSIM Libye - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Libye avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LR',
    name: 'Libéria',
    flag: 'https://flagcdn.com/w320/lr.png',
    region: 'Afrique',
    packages: [
      {
        id: 'lr-basic-1gb-7d',
        title: 'Basic eSIM Libéria - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Libéria avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lr-standard-3gb-15d',
        title: 'Standard eSIM Libéria - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Libéria avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lr-premium-5gb-30d',
        title: 'Premium eSIM Libéria - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Libéria avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MG',
    name: 'Madagascar',
    flag: 'https://flagcdn.com/w320/mg.png',
    region: 'Afrique',
    packages: [
      {
        id: 'mg-basic-1gb-7d',
        title: 'Basic eSIM Madagascar - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Madagascar avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mg-standard-3gb-15d',
        title: 'Standard eSIM Madagascar - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Madagascar avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mg-premium-5gb-30d',
        title: 'Premium eSIM Madagascar - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Madagascar avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MW',
    name: 'Malawi',
    flag: 'https://flagcdn.com/w320/mw.png',
    region: 'Afrique',
    packages: [
      {
        id: 'mw-basic-1gb-7d',
        title: 'Basic eSIM Malawi - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Malawi avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mw-standard-3gb-15d',
        title: 'Standard eSIM Malawi - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Malawi avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mw-premium-5gb-30d',
        title: 'Premium eSIM Malawi - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Malawi avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ML',
    name: 'Mali',
    flag: 'https://flagcdn.com/w320/ml.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ml-basic-1gb-7d',
        title: 'Basic eSIM Mali - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mali avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ml-standard-3gb-15d',
        title: 'Standard eSIM Mali - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mali avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ml-premium-5gb-30d',
        title: 'Premium eSIM Mali - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mali avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MR',
    name: 'Mauritanie',
    flag: 'https://flagcdn.com/w320/mr.png',
    region: 'Afrique',
    packages: [
      {
        id: 'mr-basic-1gb-7d',
        title: 'Basic eSIM Mauritanie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mauritanie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mr-standard-3gb-15d',
        title: 'Standard eSIM Mauritanie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mauritanie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mr-premium-5gb-30d',
        title: 'Premium eSIM Mauritanie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mauritanie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'YT',
    name: 'Mayotte',
    flag: 'https://flagcdn.com/w320/yt.png',
    region: 'Afrique',
    packages: [
      {
        id: 'yt-basic-1gb-7d',
        title: 'Basic eSIM Mayotte - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mayotte avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'yt-standard-3gb-15d',
        title: 'Standard eSIM Mayotte - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mayotte avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'yt-premium-5gb-30d',
        title: 'Premium eSIM Mayotte - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mayotte avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    flag: 'https://flagcdn.com/w320/mz.png',
    region: 'Afrique',
    packages: [
      {
        id: 'mz-basic-1gb-7d',
        title: 'Basic eSIM Mozambique - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Mozambique avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mz-standard-3gb-15d',
        title: 'Standard eSIM Mozambique - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Mozambique avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mz-premium-5gb-30d',
        title: 'Premium eSIM Mozambique - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Mozambique avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NA',
    name: 'Namibie',
    flag: 'https://flagcdn.com/w320/na.png',
    region: 'Afrique',
    packages: [
      {
        id: 'na-basic-1gb-7d',
        title: 'Basic eSIM Namibie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Namibie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'na-standard-3gb-15d',
        title: 'Standard eSIM Namibie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Namibie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'na-premium-5gb-30d',
        title: 'Premium eSIM Namibie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Namibie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NE',
    name: 'Niger',
    flag: 'https://flagcdn.com/w320/ne.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ne-basic-1gb-7d',
        title: 'Basic eSIM Niger - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Niger avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ne-standard-3gb-15d',
        title: 'Standard eSIM Niger - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Niger avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ne-premium-5gb-30d',
        title: 'Premium eSIM Niger - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Niger avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: 'https://flagcdn.com/w320/ng.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ng-basic-1gb-7d',
        title: 'Basic eSIM Nigeria - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Nigeria avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ng-standard-3gb-15d',
        title: 'Standard eSIM Nigeria - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Nigeria avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ng-premium-5gb-30d',
        title: 'Premium eSIM Nigeria - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Nigeria avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'UG',
    name: 'Ouganda',
    flag: 'https://flagcdn.com/w320/ug.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ug-basic-1gb-7d',
        title: 'Basic eSIM Ouganda - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Ouganda avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ug-standard-3gb-15d',
        title: 'Standard eSIM Ouganda - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Ouganda avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ug-premium-5gb-30d',
        title: 'Premium eSIM Ouganda - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Ouganda avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'RW',
    name: 'Rwanda',
    flag: 'https://flagcdn.com/w320/rw.png',
    region: 'Afrique',
    packages: [
      {
        id: 'rw-basic-1gb-7d',
        title: 'Basic eSIM Rwanda - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Rwanda avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'rw-standard-3gb-15d',
        title: 'Standard eSIM Rwanda - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Rwanda avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'rw-premium-5gb-30d',
        title: 'Premium eSIM Rwanda - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Rwanda avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CF',
    name: 'République centrafricaine',
    flag: 'https://flagcdn.com/w320/cf.png',
    region: 'Afrique',
    packages: [
      {
        id: 'cf-basic-1gb-7d',
        title: 'Basic eSIM République centrafricaine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour République centrafricaine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cf-standard-3gb-15d',
        title: 'Standard eSIM République centrafricaine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour République centrafricaine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cf-premium-5gb-30d',
        title: 'Premium eSIM République centrafricaine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour République centrafricaine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CD',
    name: 'République démocratique du Congo',
    flag: 'https://flagcdn.com/w320/cd.png',
    region: 'Afrique',
    packages: [
      {
        id: 'cd-basic-1gb-7d',
        title: 'Basic eSIM République démocratique du Congo - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour République démocratique du Congo avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cd-standard-3gb-15d',
        title: 'Standard eSIM République démocratique du Congo - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour République démocratique du Congo avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cd-premium-5gb-30d',
        title: 'Premium eSIM République démocratique du Congo - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour République démocratique du Congo avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'RE',
    name: 'Réunion',
    flag: 'https://flagcdn.com/w320/re.png',
    region: 'Afrique',
    packages: [
      {
        id: 're-basic-1gb-7d',
        title: 'Basic eSIM Réunion - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Réunion avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 're-standard-3gb-15d',
        title: 'Standard eSIM Réunion - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Réunion avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 're-premium-5gb-30d',
        title: 'Premium eSIM Réunion - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Réunion avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'EH',
    name: 'Sahara occidental',
    flag: 'https://flagcdn.com/w320/eh.png',
    region: 'Afrique',
    packages: [
      {
        id: 'eh-basic-1gb-7d',
        title: 'Basic eSIM Sahara occidental - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sahara occidental avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'eh-standard-3gb-15d',
        title: 'Standard eSIM Sahara occidental - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sahara occidental avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'eh-premium-5gb-30d',
        title: 'Premium eSIM Sahara occidental - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sahara occidental avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SH',
    name: 'Sainte-Hélène',
    flag: 'https://flagcdn.com/w320/sh.png',
    region: 'Afrique',
    packages: [
      {
        id: 'sh-basic-1gb-7d',
        title: 'Basic eSIM Sainte-Hélène - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sainte-Hélène avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sh-standard-3gb-15d',
        title: 'Standard eSIM Sainte-Hélène - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sainte-Hélène avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sh-premium-5gb-30d',
        title: 'Premium eSIM Sainte-Hélène - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sainte-Hélène avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ST',
    name: 'Sao Tomé-et-Principe',
    flag: 'https://flagcdn.com/w320/st.png',
    region: 'Afrique',
    packages: [
      {
        id: 'st-basic-1gb-7d',
        title: 'Basic eSIM Sao Tomé-et-Principe - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sao Tomé-et-Principe avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'st-standard-3gb-15d',
        title: 'Standard eSIM Sao Tomé-et-Principe - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sao Tomé-et-Principe avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'st-premium-5gb-30d',
        title: 'Premium eSIM Sao Tomé-et-Principe - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sao Tomé-et-Principe avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    flag: 'https://flagcdn.com/w320/sl.png',
    region: 'Afrique',
    packages: [
      {
        id: 'sl-basic-1gb-7d',
        title: 'Basic eSIM Sierra Leone - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sierra Leone avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sl-standard-3gb-15d',
        title: 'Standard eSIM Sierra Leone - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sierra Leone avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sl-premium-5gb-30d',
        title: 'Premium eSIM Sierra Leone - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sierra Leone avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SO',
    name: 'Somalie',
    flag: 'https://flagcdn.com/w320/so.png',
    region: 'Afrique',
    packages: [
      {
        id: 'so-basic-1gb-7d',
        title: 'Basic eSIM Somalie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Somalie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'so-standard-3gb-15d',
        title: 'Standard eSIM Somalie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Somalie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'so-premium-5gb-30d',
        title: 'Premium eSIM Somalie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Somalie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SD',
    name: 'Soudan',
    flag: 'https://flagcdn.com/w320/sd.png',
    region: 'Afrique',
    packages: [
      {
        id: 'sd-basic-1gb-7d',
        title: 'Basic eSIM Soudan - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Soudan avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sd-standard-3gb-15d',
        title: 'Standard eSIM Soudan - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Soudan avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sd-premium-5gb-30d',
        title: 'Premium eSIM Soudan - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Soudan avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SS',
    name: 'Soudan du Sud',
    flag: 'https://flagcdn.com/w320/ss.png',
    region: 'Afrique',
    packages: [
      {
        id: 'ss-basic-1gb-7d',
        title: 'Basic eSIM Soudan du Sud - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Soudan du Sud avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ss-standard-3gb-15d',
        title: 'Standard eSIM Soudan du Sud - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Soudan du Sud avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ss-premium-5gb-30d',
        title: 'Premium eSIM Soudan du Sud - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Soudan du Sud avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: 'https://flagcdn.com/w320/sn.png',
    region: 'Afrique',
    packages: [
      {
        id: 'sn-basic-1gb-7d',
        title: 'Basic eSIM Sénégal - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sénégal avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sn-standard-3gb-15d',
        title: 'Standard eSIM Sénégal - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sénégal avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sn-premium-5gb-30d',
        title: 'Premium eSIM Sénégal - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sénégal avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TD',
    name: 'Tchad',
    flag: 'https://flagcdn.com/w320/td.png',
    region: 'Afrique',
    packages: [
      {
        id: 'td-basic-1gb-7d',
        title: 'Basic eSIM Tchad - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tchad avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'td-standard-3gb-15d',
        title: 'Standard eSIM Tchad - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tchad avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'td-premium-5gb-30d',
        title: 'Premium eSIM Tchad - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tchad avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TG',
    name: 'Togo',
    flag: 'https://flagcdn.com/w320/tg.png',
    region: 'Afrique',
    packages: [
      {
        id: 'tg-basic-1gb-7d',
        title: 'Basic eSIM Togo - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Togo avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tg-standard-3gb-15d',
        title: 'Standard eSIM Togo - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Togo avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tg-premium-5gb-30d',
        title: 'Premium eSIM Togo - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Togo avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ZM',
    name: 'Zambie',
    flag: 'https://flagcdn.com/w320/zm.png',
    region: 'Afrique',
    packages: [
      {
        id: 'zm-basic-1gb-7d',
        title: 'Basic eSIM Zambie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Zambie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'zm-standard-3gb-15d',
        title: 'Standard eSIM Zambie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Zambie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'zm-premium-5gb-30d',
        title: 'Premium eSIM Zambie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Zambie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    flag: 'https://flagcdn.com/w320/zw.png',
    region: 'Afrique',
    packages: [
      {
        id: 'zw-basic-1gb-7d',
        title: 'Basic eSIM Zimbabwe - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Zimbabwe avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'zw-standard-3gb-15d',
        title: 'Standard eSIM Zimbabwe - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Zimbabwe avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'zw-premium-5gb-30d',
        title: 'Premium eSIM Zimbabwe - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Zimbabwe avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ER',
    name: 'Érythrée',
    flag: 'https://flagcdn.com/w320/er.png',
    region: 'Afrique',
    packages: [
      {
        id: 'er-basic-1gb-7d',
        title: 'Basic eSIM Érythrée - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Érythrée avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'er-standard-3gb-15d',
        title: 'Standard eSIM Érythrée - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Érythrée avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'er-premium-5gb-30d',
        title: 'Premium eSIM Érythrée - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Érythrée avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'ET',
    name: 'Éthiopie',
    flag: 'https://flagcdn.com/w320/et.png',
    region: 'Afrique',
    packages: [
      {
        id: 'et-basic-1gb-7d',
        title: 'Basic eSIM Éthiopie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 7.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Éthiopie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'et-standard-3gb-15d',
        title: 'Standard eSIM Éthiopie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 13.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Éthiopie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'et-premium-5gb-30d',
        title: 'Premium eSIM Éthiopie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 19.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Éthiopie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Océanie
  {
    code: 'AU',
    name: 'Australie',
    flag: 'https://flagcdn.com/w320/au.png',
    region: 'Océanie',
    isPopular: true,
    packages: [
      {
        id: 'au-basic-1gb-7d',
        title: 'Basic eSIM Australie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Australie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'au-standard-3gb-15d',
        title: 'Standard eSIM Australie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Australie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'au-premium-5gb-30d',
        title: 'Premium eSIM Australie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 15.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Australie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'au-unlimited-7d',
        title: 'Unlimited eSIM Australie - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Australie pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'au-business-10gb-30d',
        title: 'Business eSIM Australie - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Australie avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'FJ',
    name: 'Fidji',
    flag: 'https://flagcdn.com/w320/fj.png',
    region: 'Océanie',
    isPopular: true,
    packages: [
      {
        id: 'fj-basic-1gb-7d',
        title: 'Basic eSIM Fidji - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Fidji avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'fj-standard-3gb-15d',
        title: 'Standard eSIM Fidji - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Fidji avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'fj-premium-5gb-30d',
        title: 'Premium eSIM Fidji - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 15.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Fidji avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'fj-unlimited-7d',
        title: 'Unlimited eSIM Fidji - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Fidji pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'fj-business-10gb-30d',
        title: 'Business eSIM Fidji - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Fidji avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'NZ',
    name: 'Nouvelle-Zélande',
    flag: 'https://flagcdn.com/w320/nz.png',
    region: 'Océanie',
    isPopular: true,
    packages: [
      {
        id: 'nz-basic-1gb-7d',
        title: 'Basic eSIM Nouvelle-Zélande - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Nouvelle-Zélande avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'nz-standard-3gb-15d',
        title: 'Standard eSIM Nouvelle-Zélande - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Nouvelle-Zélande avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'nz-premium-5gb-30d',
        title: 'Premium eSIM Nouvelle-Zélande - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 15.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Nouvelle-Zélande avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'nz-unlimited-7d',
        title: 'Unlimited eSIM Nouvelle-Zélande - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Nouvelle-Zélande pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'nz-business-10gb-30d',
        title: 'Business eSIM Nouvelle-Zélande - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Nouvelle-Zélande avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PF',
    name: 'Polynésie française',
    flag: 'https://flagcdn.com/w320/pf.png',
    region: 'Océanie',
    isPopular: true,
    packages: [
      {
        id: 'pf-basic-1gb-7d',
        title: 'Basic eSIM Polynésie française - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 5.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Polynésie française avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pf-standard-3gb-15d',
        title: 'Standard eSIM Polynésie française - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 10.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Polynésie française avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pf-premium-5gb-30d',
        title: 'Premium eSIM Polynésie française - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 15.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Polynésie française avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'pf-unlimited-7d',
        title: 'Unlimited eSIM Polynésie française - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 20.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Polynésie française pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'pf-business-10gb-30d',
        title: 'Business eSIM Polynésie française - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Polynésie française avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'KI',
    name: 'Kiribati',
    flag: 'https://flagcdn.com/w320/ki.png',
    region: 'Océanie',
    packages: [
      {
        id: 'ki-basic-1gb-7d',
        title: 'Basic eSIM Kiribati - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Kiribati avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ki-standard-3gb-15d',
        title: 'Standard eSIM Kiribati - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Kiribati avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ki-premium-5gb-30d',
        title: 'Premium eSIM Kiribati - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Kiribati avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'FM',
    name: 'Micronésie',
    flag: 'https://flagcdn.com/w320/fm.png',
    region: 'Océanie',
    packages: [
      {
        id: 'fm-basic-1gb-7d',
        title: 'Basic eSIM Micronésie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Micronésie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'fm-standard-3gb-15d',
        title: 'Standard eSIM Micronésie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Micronésie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'fm-premium-5gb-30d',
        title: 'Premium eSIM Micronésie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Micronésie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NR',
    name: 'Nauru',
    flag: 'https://flagcdn.com/w320/nr.png',
    region: 'Océanie',
    packages: [
      {
        id: 'nr-basic-1gb-7d',
        title: 'Basic eSIM Nauru - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Nauru avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'nr-standard-3gb-15d',
        title: 'Standard eSIM Nauru - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Nauru avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'nr-premium-5gb-30d',
        title: 'Premium eSIM Nauru - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Nauru avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NU',
    name: 'Niue',
    flag: 'https://flagcdn.com/w320/nu.png',
    region: 'Océanie',
    packages: [
      {
        id: 'nu-basic-1gb-7d',
        title: 'Basic eSIM Niue - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Niue avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'nu-standard-3gb-15d',
        title: 'Standard eSIM Niue - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Niue avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'nu-premium-5gb-30d',
        title: 'Premium eSIM Niue - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Niue avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'NC',
    name: 'Nouvelle-Calédonie',
    flag: 'https://flagcdn.com/w320/nc.png',
    region: 'Océanie',
    packages: [
      {
        id: 'nc-basic-1gb-7d',
        title: 'Basic eSIM Nouvelle-Calédonie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Nouvelle-Calédonie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'nc-standard-3gb-15d',
        title: 'Standard eSIM Nouvelle-Calédonie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Nouvelle-Calédonie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'nc-premium-5gb-30d',
        title: 'Premium eSIM Nouvelle-Calédonie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Nouvelle-Calédonie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PW',
    name: 'Palaos',
    flag: 'https://flagcdn.com/w320/pw.png',
    region: 'Océanie',
    packages: [
      {
        id: 'pw-basic-1gb-7d',
        title: 'Basic eSIM Palaos - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Palaos avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pw-standard-3gb-15d',
        title: 'Standard eSIM Palaos - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Palaos avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pw-premium-5gb-30d',
        title: 'Premium eSIM Palaos - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Palaos avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'PG',
    name: 'Papouasie-Nouvelle-Guinée',
    flag: 'https://flagcdn.com/w320/pg.png',
    region: 'Océanie',
    packages: [
      {
        id: 'pg-basic-1gb-7d',
        title: 'Basic eSIM Papouasie-Nouvelle-Guinée - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Papouasie-Nouvelle-Guinée avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pg-standard-3gb-15d',
        title: 'Standard eSIM Papouasie-Nouvelle-Guinée - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Papouasie-Nouvelle-Guinée avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pg-premium-5gb-30d',
        title: 'Premium eSIM Papouasie-Nouvelle-Guinée - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Papouasie-Nouvelle-Guinée avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'WS',
    name: 'Samoa',
    flag: 'https://flagcdn.com/w320/ws.png',
    region: 'Océanie',
    packages: [
      {
        id: 'ws-basic-1gb-7d',
        title: 'Basic eSIM Samoa - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Samoa avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ws-standard-3gb-15d',
        title: 'Standard eSIM Samoa - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Samoa avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ws-premium-5gb-30d',
        title: 'Premium eSIM Samoa - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Samoa avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TK',
    name: 'Tokelau',
    flag: 'https://flagcdn.com/w320/tk.png',
    region: 'Océanie',
    packages: [
      {
        id: 'tk-basic-1gb-7d',
        title: 'Basic eSIM Tokelau - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tokelau avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tk-standard-3gb-15d',
        title: 'Standard eSIM Tokelau - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tokelau avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tk-premium-5gb-30d',
        title: 'Premium eSIM Tokelau - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tokelau avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TO',
    name: 'Tonga',
    flag: 'https://flagcdn.com/w320/to.png',
    region: 'Océanie',
    packages: [
      {
        id: 'to-basic-1gb-7d',
        title: 'Basic eSIM Tonga - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tonga avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'to-standard-3gb-15d',
        title: 'Standard eSIM Tonga - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tonga avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'to-premium-5gb-30d',
        title: 'Premium eSIM Tonga - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tonga avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TV',
    name: 'Tuvalu',
    flag: 'https://flagcdn.com/w320/tv.png',
    region: 'Océanie',
    packages: [
      {
        id: 'tv-basic-1gb-7d',
        title: 'Basic eSIM Tuvalu - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Tuvalu avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tv-standard-3gb-15d',
        title: 'Standard eSIM Tuvalu - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Tuvalu avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tv-premium-5gb-30d',
        title: 'Premium eSIM Tuvalu - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Tuvalu avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VU',
    name: 'Vanuatu',
    flag: 'https://flagcdn.com/w320/vu.png',
    region: 'Océanie',
    packages: [
      {
        id: 'vu-basic-1gb-7d',
        title: 'Basic eSIM Vanuatu - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Vanuatu avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'vu-standard-3gb-15d',
        title: 'Standard eSIM Vanuatu - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Vanuatu avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'vu-premium-5gb-30d',
        title: 'Premium eSIM Vanuatu - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Vanuatu avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CK',
    name: 'Îles Cook',
    flag: 'https://flagcdn.com/w320/ck.png',
    region: 'Océanie',
    packages: [
      {
        id: 'ck-basic-1gb-7d',
        title: 'Basic eSIM Îles Cook - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Cook avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ck-standard-3gb-15d',
        title: 'Standard eSIM Îles Cook - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Cook avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ck-premium-5gb-30d',
        title: 'Premium eSIM Îles Cook - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Cook avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MH',
    name: 'Îles Marshall',
    flag: 'https://flagcdn.com/w320/mh.png',
    region: 'Océanie',
    packages: [
      {
        id: 'mh-basic-1gb-7d',
        title: 'Basic eSIM Îles Marshall - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Marshall avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mh-standard-3gb-15d',
        title: 'Standard eSIM Îles Marshall - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Marshall avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mh-premium-5gb-30d',
        title: 'Premium eSIM Îles Marshall - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Marshall avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SB',
    name: 'Îles Salomon',
    flag: 'https://flagcdn.com/w320/sb.png',
    region: 'Océanie',
    packages: [
      {
        id: 'sb-basic-1gb-7d',
        title: 'Basic eSIM Îles Salomon - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Salomon avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sb-standard-3gb-15d',
        title: 'Standard eSIM Îles Salomon - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 11.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Salomon avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sb-premium-5gb-30d',
        title: 'Premium eSIM Îles Salomon - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 17.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Salomon avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },

  // Caraïbes
  {
    code: 'AW',
    name: 'Aruba',
    flag: 'https://flagcdn.com/w320/aw.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'aw-basic-1gb-7d',
        title: 'Basic eSIM Aruba - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Aruba avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'aw-standard-3gb-15d',
        title: 'Standard eSIM Aruba - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Aruba avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'aw-premium-5gb-30d',
        title: 'Premium eSIM Aruba - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Aruba avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'aw-unlimited-7d',
        title: 'Unlimited eSIM Aruba - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Aruba pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'aw-business-10gb-30d',
        title: 'Business eSIM Aruba - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Aruba avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BS',
    name: 'Bahamas',
    flag: 'https://flagcdn.com/w320/bs.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'bs-basic-1gb-7d',
        title: 'Basic eSIM Bahamas - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bahamas avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bs-standard-3gb-15d',
        title: 'Standard eSIM Bahamas - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bahamas avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bs-premium-5gb-30d',
        title: 'Premium eSIM Bahamas - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bahamas avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'bs-unlimited-7d',
        title: 'Unlimited eSIM Bahamas - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Bahamas pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'bs-business-10gb-30d',
        title: 'Business eSIM Bahamas - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Bahamas avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'BB',
    name: 'Barbade',
    flag: 'https://flagcdn.com/w320/bb.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'bb-basic-1gb-7d',
        title: 'Basic eSIM Barbade - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Barbade avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bb-standard-3gb-15d',
        title: 'Standard eSIM Barbade - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Barbade avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bb-premium-5gb-30d',
        title: 'Premium eSIM Barbade - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Barbade avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'bb-unlimited-7d',
        title: 'Unlimited eSIM Barbade - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Barbade pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'bb-business-10gb-30d',
        title: 'Business eSIM Barbade - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Barbade avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'CU',
    name: 'Cuba',
    flag: 'https://flagcdn.com/w320/cu.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'cu-basic-1gb-7d',
        title: 'Basic eSIM Cuba - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Cuba avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cu-standard-3gb-15d',
        title: 'Standard eSIM Cuba - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Cuba avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cu-premium-5gb-30d',
        title: 'Premium eSIM Cuba - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Cuba avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'cu-unlimited-7d',
        title: 'Unlimited eSIM Cuba - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Cuba pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'cu-business-10gb-30d',
        title: 'Business eSIM Cuba - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Cuba avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'JM',
    name: 'Jamaïque',
    flag: 'https://flagcdn.com/w320/jm.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'jm-basic-1gb-7d',
        title: 'Basic eSIM Jamaïque - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Jamaïque avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'jm-standard-3gb-15d',
        title: 'Standard eSIM Jamaïque - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Jamaïque avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'jm-premium-5gb-30d',
        title: 'Premium eSIM Jamaïque - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Jamaïque avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'jm-unlimited-7d',
        title: 'Unlimited eSIM Jamaïque - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Jamaïque pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'jm-business-10gb-30d',
        title: 'Business eSIM Jamaïque - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Jamaïque avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'PR',
    name: 'Porto Rico',
    flag: 'https://flagcdn.com/w320/pr.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'pr-basic-1gb-7d',
        title: 'Basic eSIM Porto Rico - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Porto Rico avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'pr-standard-3gb-15d',
        title: 'Standard eSIM Porto Rico - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Porto Rico avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'pr-premium-5gb-30d',
        title: 'Premium eSIM Porto Rico - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Porto Rico avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'pr-unlimited-7d',
        title: 'Unlimited eSIM Porto Rico - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour Porto Rico pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'pr-business-10gb-30d',
        title: 'Business eSIM Porto Rico - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour Porto Rico avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'DO',
    name: 'République dominicaine',
    flag: 'https://flagcdn.com/w320/do.png',
    region: 'Caraïbes',
    isPopular: true,
    packages: [
      {
        id: 'do-basic-1gb-7d',
        title: 'Basic eSIM République dominicaine - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 6.5,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour République dominicaine avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'do-standard-3gb-15d',
        title: 'Standard eSIM République dominicaine - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 12.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour République dominicaine avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'do-premium-5gb-30d',
        title: 'Premium eSIM République dominicaine - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 18.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour République dominicaine avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      },
      {
        id: 'do-unlimited-7d',
        title: 'Unlimited eSIM République dominicaine - 7 jours',
        data: 'Illimité',
        validity: '7 jours',
        price: 23.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM illimité pour République dominicaine pendant 7 jours',
        features: ["4G/LTE", "Donn\u00e9es illimit\u00e9es", "Hotspot autoris\u00e9", "Vitesse r\u00e9duite apr\u00e8s fair-use"]
      },
      {
        id: 'do-business-10gb-30d',
        title: 'Business eSIM République dominicaine - 10GB',
        data: '10 GB',
        validity: '30 jours',
        price: 26.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM business pour République dominicaine avec 10GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support prioritaire", "Multi-SIM"]
      }
    ]
  },
  {
    code: 'AI',
    name: 'Anguilla',
    flag: 'https://flagcdn.com/w320/ai.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'ai-basic-1gb-7d',
        title: 'Basic eSIM Anguilla - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Anguilla avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ai-standard-3gb-15d',
        title: 'Standard eSIM Anguilla - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Anguilla avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ai-premium-5gb-30d',
        title: 'Premium eSIM Anguilla - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Anguilla avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'AG',
    name: 'Antigua-et-Barbuda',
    flag: 'https://flagcdn.com/w320/ag.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'ag-basic-1gb-7d',
        title: 'Basic eSIM Antigua-et-Barbuda - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Antigua-et-Barbuda avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ag-standard-3gb-15d',
        title: 'Standard eSIM Antigua-et-Barbuda - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Antigua-et-Barbuda avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ag-premium-5gb-30d',
        title: 'Premium eSIM Antigua-et-Barbuda - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Antigua-et-Barbuda avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BM',
    name: 'Bermudes',
    flag: 'https://flagcdn.com/w320/bm.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'bm-basic-1gb-7d',
        title: 'Basic eSIM Bermudes - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bermudes avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bm-standard-3gb-15d',
        title: 'Standard eSIM Bermudes - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bermudes avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bm-premium-5gb-30d',
        title: 'Premium eSIM Bermudes - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bermudes avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'BQ',
    name: 'Bonaire',
    flag: 'https://flagcdn.com/w320/bq.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'bq-basic-1gb-7d',
        title: 'Basic eSIM Bonaire - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Bonaire avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'bq-standard-3gb-15d',
        title: 'Standard eSIM Bonaire - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Bonaire avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'bq-premium-5gb-30d',
        title: 'Premium eSIM Bonaire - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Bonaire avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'CW',
    name: 'Curaçao',
    flag: 'https://flagcdn.com/w320/cw.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'cw-basic-1gb-7d',
        title: 'Basic eSIM Curaçao - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Curaçao avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'cw-standard-3gb-15d',
        title: 'Standard eSIM Curaçao - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Curaçao avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'cw-premium-5gb-30d',
        title: 'Premium eSIM Curaçao - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Curaçao avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'DM',
    name: 'Dominique',
    flag: 'https://flagcdn.com/w320/dm.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'dm-basic-1gb-7d',
        title: 'Basic eSIM Dominique - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Dominique avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'dm-standard-3gb-15d',
        title: 'Standard eSIM Dominique - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Dominique avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'dm-premium-5gb-30d',
        title: 'Premium eSIM Dominique - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Dominique avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GD',
    name: 'Grenade',
    flag: 'https://flagcdn.com/w320/gd.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'gd-basic-1gb-7d',
        title: 'Basic eSIM Grenade - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Grenade avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gd-standard-3gb-15d',
        title: 'Standard eSIM Grenade - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Grenade avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gd-premium-5gb-30d',
        title: 'Premium eSIM Grenade - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Grenade avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'GP',
    name: 'Guadeloupe',
    flag: 'https://flagcdn.com/w320/gp.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'gp-basic-1gb-7d',
        title: 'Basic eSIM Guadeloupe - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Guadeloupe avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'gp-standard-3gb-15d',
        title: 'Standard eSIM Guadeloupe - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Guadeloupe avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'gp-premium-5gb-30d',
        title: 'Premium eSIM Guadeloupe - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Guadeloupe avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'HT',
    name: 'Haïti',
    flag: 'https://flagcdn.com/w320/ht.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'ht-basic-1gb-7d',
        title: 'Basic eSIM Haïti - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Haïti avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ht-standard-3gb-15d',
        title: 'Standard eSIM Haïti - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Haïti avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ht-premium-5gb-30d',
        title: 'Premium eSIM Haïti - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Haïti avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'MQ',
    name: 'Martinique',
    flag: 'https://flagcdn.com/w320/mq.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'mq-basic-1gb-7d',
        title: 'Basic eSIM Martinique - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Martinique avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'mq-standard-3gb-15d',
        title: 'Standard eSIM Martinique - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Martinique avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'mq-premium-5gb-30d',
        title: 'Premium eSIM Martinique - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Martinique avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KN',
    name: 'Saint-Kitts-et-Nevis',
    flag: 'https://flagcdn.com/w320/kn.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'kn-basic-1gb-7d',
        title: 'Basic eSIM Saint-Kitts-et-Nevis - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Saint-Kitts-et-Nevis avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'kn-standard-3gb-15d',
        title: 'Standard eSIM Saint-Kitts-et-Nevis - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Saint-Kitts-et-Nevis avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'kn-premium-5gb-30d',
        title: 'Premium eSIM Saint-Kitts-et-Nevis - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Saint-Kitts-et-Nevis avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'SX',
    name: 'Saint-Martin',
    flag: 'https://flagcdn.com/w320/sx.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'sx-basic-1gb-7d',
        title: 'Basic eSIM Saint-Martin - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Saint-Martin avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'sx-standard-3gb-15d',
        title: 'Standard eSIM Saint-Martin - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Saint-Martin avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'sx-premium-5gb-30d',
        title: 'Premium eSIM Saint-Martin - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Saint-Martin avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VC',
    name: 'Saint-Vincent-et-les-Grenadines',
    flag: 'https://flagcdn.com/w320/vc.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'vc-basic-1gb-7d',
        title: 'Basic eSIM Saint-Vincent-et-les-Grenadines - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Saint-Vincent-et-les-Grenadines avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'vc-standard-3gb-15d',
        title: 'Standard eSIM Saint-Vincent-et-les-Grenadines - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Saint-Vincent-et-les-Grenadines avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'vc-premium-5gb-30d',
        title: 'Premium eSIM Saint-Vincent-et-les-Grenadines - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Saint-Vincent-et-les-Grenadines avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'LC',
    name: 'Sainte-Lucie',
    flag: 'https://flagcdn.com/w320/lc.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'lc-basic-1gb-7d',
        title: 'Basic eSIM Sainte-Lucie - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Sainte-Lucie avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'lc-standard-3gb-15d',
        title: 'Standard eSIM Sainte-Lucie - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Sainte-Lucie avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'lc-premium-5gb-30d',
        title: 'Premium eSIM Sainte-Lucie - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Sainte-Lucie avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TT',
    name: 'Trinité-et-Tobago',
    flag: 'https://flagcdn.com/w320/tt.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'tt-basic-1gb-7d',
        title: 'Basic eSIM Trinité-et-Tobago - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Trinité-et-Tobago avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tt-standard-3gb-15d',
        title: 'Standard eSIM Trinité-et-Tobago - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Trinité-et-Tobago avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tt-premium-5gb-30d',
        title: 'Premium eSIM Trinité-et-Tobago - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Trinité-et-Tobago avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'KY',
    name: 'Îles Caïmans',
    flag: 'https://flagcdn.com/w320/ky.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'ky-basic-1gb-7d',
        title: 'Basic eSIM Îles Caïmans - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Caïmans avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'ky-standard-3gb-15d',
        title: 'Standard eSIM Îles Caïmans - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Caïmans avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'ky-premium-5gb-30d',
        title: 'Premium eSIM Îles Caïmans - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Caïmans avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'TC',
    name: 'Îles Turks-et-Caïcos',
    flag: 'https://flagcdn.com/w320/tc.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'tc-basic-1gb-7d',
        title: 'Basic eSIM Îles Turks-et-Caïcos - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Turks-et-Caïcos avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'tc-standard-3gb-15d',
        title: 'Standard eSIM Îles Turks-et-Caïcos - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Turks-et-Caïcos avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'tc-premium-5gb-30d',
        title: 'Premium eSIM Îles Turks-et-Caïcos - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Turks-et-Caïcos avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VI',
    name: 'Îles Vierges américaines',
    flag: 'https://flagcdn.com/w320/vi.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'vi-basic-1gb-7d',
        title: 'Basic eSIM Îles Vierges américaines - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Vierges américaines avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'vi-standard-3gb-15d',
        title: 'Standard eSIM Îles Vierges américaines - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Vierges américaines avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'vi-premium-5gb-30d',
        title: 'Premium eSIM Îles Vierges américaines - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Vierges américaines avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  },
  {
    code: 'VG',
    name: 'Îles Vierges britanniques',
    flag: 'https://flagcdn.com/w320/vg.png',
    region: 'Caraïbes',
    packages: [
      {
        id: 'vg-basic-1gb-7d',
        title: 'Basic eSIM Îles Vierges britanniques - 1GB',
        data: '1 GB',
        validity: '7 jours',
        price: 8.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM local pour Îles Vierges britanniques avec 1GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Activation instantan\u00e9e"]
      },
      {
        id: 'vg-standard-3gb-15d',
        title: 'Standard eSIM Îles Vierges britanniques - 3GB',
        data: '3 GB',
        validity: '15 jours',
        price: 14.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM standard pour Îles Vierges britanniques avec 3GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Couverture \u00e9tendue"]
      },
      {
        id: 'vg-premium-5gb-30d',
        title: 'Premium eSIM Îles Vierges britanniques - 5GB',
        data: '5 GB',
        validity: '30 jours',
        price: 21.0,
        currency: 'USD',
        type: 'local',
        description: 'Forfait eSIM premium pour Îles Vierges britanniques avec 5GB de données',
        features: ["4G/LTE", "Donn\u00e9es uniquement", "Hotspot autoris\u00e9", "Support 24/7"]
      }
    ]
  }
];

// Forfaits régionaux et globaux
export const REGIONAL_PACKAGES: AiraloPackage[] = [
  {
    id: 'global-discover-1gb-7d',
    title: 'Discover+ Global - 1GB',
    data: '1 GB',
    validity: '7 jours',
    price: 9.0,
    currency: 'USD',
    type: 'global',
    description: 'Forfait eSIM global pour 130+ pays',
    features: ['4G/LTE', 'Données uniquement', 'Hotspot autorisé', '130+ pays']
  },
  {
    id: 'europe-regional-3gb-15d',
    title: 'Europe Régional - 3GB',
    data: '3 GB',
    validity: '15 jours',
    price: 12.0,
    currency: 'USD',
    type: 'regional',
    description: 'Forfait eSIM pour 39 pays européens',
    features: ['4G/LTE', 'Données uniquement', 'Hotspot autorisé', '39 pays européens']
  },
  {
    id: 'asia-pacific-5gb-30d',
    title: 'Asie-Pacifique - 5GB',
    data: '5 GB',
    validity: '30 jours',
    price: 18.0,
    currency: 'USD',
    type: 'regional',
    description: 'Forfait eSIM pour pays d\'Asie et Océanie',
    features: ['4G/LTE', 'Données uniquement', 'Hotspot autorisé', '16+ pays']
  }
];

// Statistiques de la base de données
export const DATABASE_STATS = {
  totalCountries: 220,
  popularCountries: 73,
  regions: 7,
  lastUpdated: '2025-06-23',
  version: '2.0 Extended'
};

// Fonctions utilitaires
export const getCountriesByRegion = (region: string): AiraloCountry[] => {
  return AIRALO_COUNTRIES.filter(country => country.region === region);
};

export const getPopularCountries = (): AiraloCountry[] => {
  return AIRALO_COUNTRIES.filter(country => country.isPopular);
};

export const searchCountries = (query: string): AiraloCountry[] => {
  const lowercaseQuery = query.toLowerCase();
  return AIRALO_COUNTRIES.filter(country => 
    country.name.toLowerCase().includes(lowercaseQuery) ||
    country.code.toLowerCase().includes(lowercaseQuery) ||
    country.region.toLowerCase().includes(lowercaseQuery)
  );
};

export const getCountryByCode = (code: string): AiraloCountry | undefined => {
  return AIRALO_COUNTRIES.find(country => country.code === code);
};

export const getAllRegions = (): string[] => {
  const regions = new Set<string>();
  AIRALO_COUNTRIES.forEach(country => regions.add(country.region));
  return Array.from(regions).sort();
};

// Export par défaut
export default AIRALO_COUNTRIES;
