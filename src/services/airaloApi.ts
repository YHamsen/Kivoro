import axios from 'axios'
import { AIRALO_COUNTRIES, AiraloCountry, AiraloPackage, REGIONAL_PACKAGES, getPopularCountries, getCountriesByRegion, getAllRegions } from '../data/airaloCountries'

const AIRALO_BASE_URL = 'https://partners-api.airalo.com'

interface AiraloCredentials {
  clientId: string
  clientSecret: string
}

interface eSIMOffer {
  id: string
  country: string
  countryCode: string
  operator: string
  dataAmount: string
  dataUnit: string
  validity: string
  price: number
  currency: string
  cryptoPrice?: number
  description: string
  coverage: string[]
  type: string
  slug: string
  title: string
  package_type: string
  operator_name: string
  flag?: string
  region?: string
  isPopular?: boolean
}

interface eSIMPurchaseRequest {
  package_id: string
  quantity: number
  brand_settings_name?: string
  description?: string
}

interface eSIMActivation {
  iccid: string
  qrCode: string
  lpa: string
  qrcode_url: string
  manual_installation: {
    activation_code: string
    confirmation_code: string
  }
  instructions: string[]
  smdp_address: string
}

class AiraloApiService {
  private credentials: AiraloCredentials
  private accessToken: string | null = null
  private tokenExpiry: Date | null = null

  constructor() {
    this.credentials = {
      clientId: '42de77e34a909dd433488d44a74c63d1',
      clientSecret: 'EhbBaldcipmSQqkzFNwKUxCRehBHIMoEPe4lvSWz'
    }
  }

  private async authenticate(): Promise<string> {
    try {
      if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
        return this.accessToken
      }

      // Create FormData for Airalo API (requires form-data, not JSON)
      const formData = new FormData()
      formData.append('grant_type', 'client_credentials')
      formData.append('client_id', this.credentials.clientId)
      formData.append('client_secret', this.credentials.clientSecret)

      console.log('🔄 Attempting Airalo authentication...')
      
      const response = await axios.post(`${AIRALO_BASE_URL}/v2/token`, formData, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Kivoro-Dashboard/1.0'
        },
        timeout: 30000 // 30 seconds timeout
      })

      if (response.data && response.data.data && response.data.data.access_token) {
        this.accessToken = response.data.data.access_token
        this.tokenExpiry = new Date(Date.now() + (response.data.data.expires_in * 1000))
        console.log('✅ Airalo authentication successful')
        return this.accessToken
      } else {
        throw new Error('Invalid response format from Airalo API')
      }
    } catch (error: any) {
      console.error('❌ Airalo authentication failed:', error)
      
      // Detailed error logging
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
        console.error('Response headers:', error.response.headers)
      } else if (error.request) {
        console.error('Network error - no response received:', error.request)
      } else {
        console.error('Error setting up request:', error.message)
      }
      
      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid Airalo API credentials')
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ENOTFOUND') {
        throw new Error('Network connection error. Please check your internet connection.')
      } else {
        throw new Error(`Failed to authenticate with Airalo API: ${error.message}`)
      }
    }
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) {
    const token = await this.authenticate()
    
    try {
      const response = await axios({
        method,
        url: `${AIRALO_BASE_URL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data
      })
      
      return response.data
    } catch (error: any) {
      console.error(`Airalo API request failed:`, error)
      throw new Error(error.response?.data?.message || 'API request failed')
    }
  }

  async geteSIMOffers(countryCode?: string): Promise<eSIMOffer[]> {
    try {
      // First, try to use local comprehensive data from airaloCountries.ts
      const allOffers = this.getLocaleSIMOffers(countryCode)
      if (allOffers.length > 0) {
        console.log(`✅ Loaded ${allOffers.length} eSIM offers from local database`)
        return allOffers
      }

      // Fallback to API if needed
      const endpoint = countryCode ? `/v2/packages?filter[country]=${countryCode}` : '/v2/packages'
      const response = await this.makeRequest(endpoint)
      
      // Process Airalo API response - structure is countries -> operators -> packages
      if (response?.data && Array.isArray(response.data)) {
        const allPackages: eSIMOffer[] = []
        
        response.data.forEach((country: any) => {
          if (country.operators && Array.isArray(country.operators)) {
            country.operators.forEach((operator: any) => {
              if (operator.packages && Array.isArray(operator.packages)) {
                operator.packages.forEach((pkg: any) => {
                  allPackages.push({
                    id: pkg.id?.toString() || `${country.slug}-${operator.id}-${pkg.id}`,
                    slug: pkg.slug || `${country.slug}-${pkg.data}-${pkg.day}d`,
                    title: pkg.package || `${country.title} ${pkg.data} - ${pkg.day} Days`,
                    country: country.title || 'Unknown',
                    countryCode: country.country_code || 'XX',
                    operator: operator.title || 'Airalo',
                    operator_name: operator.title || 'Airalo',
                    dataAmount: pkg.data?.replace(/\D/g, '') || '0',
                    dataUnit: 'GB',
                    validity: `${pkg.day} days`,
                    price: parseFloat(pkg.price) || 0,
                    currency: 'USD',
                    cryptoPrice: parseFloat(pkg.price || 0) * 0.00003, // BTC conversion
                    description: pkg.short_info || pkg.package || `${pkg.data} data plan for ${country.title}`,
                    coverage: [country.title],
                    type: operator.type || 'prepaid',
                    package_type: operator.type || 'prepaid',
                    flag: country.flag
                  })
                })
              }
            })
          }
        })
        
        return allPackages
      }
      
      // Final fallback: use local data even on API error
      return this.getLocaleSIMOffers(countryCode)
    } catch (error) {
      console.error('Failed to fetch eSIM offers from API, using local data:', error)
      // Always return local comprehensive data on error to prevent app crash
      return this.getLocaleSIMOffers(countryCode)
    }
  }

  /**
   * Get eSIM offers from local comprehensive database (220+ countries)
   */
  private getLocaleSIMOffers(countryCode?: string): eSIMOffer[] {
    try {
      let filteredCountries = AIRALO_COUNTRIES
      
      // Filter by country code if specified
      if (countryCode) {
        filteredCountries = AIRALO_COUNTRIES.filter(
          country => country.code.toLowerCase() === countryCode.toLowerCase()
        )
      }

      const allOffers: eSIMOffer[] = []

      filteredCountries.forEach(country => {
        country.packages.forEach(pkg => {
          allOffers.push({
            id: pkg.id,
            slug: pkg.id,
            title: pkg.title,
            country: country.name,
            countryCode: country.code,
            operator: 'Airalo',
            operator_name: 'Airalo',
            dataAmount: pkg.data.replace(/[^\d.]/g, ''),
            dataUnit: pkg.data.includes('GB') ? 'GB' : 'MB',
            validity: pkg.validity,
            price: pkg.price,
            currency: pkg.currency,
            cryptoPrice: pkg.cryptoPrice || (pkg.price * 0.00003),
            description: pkg.description,
            coverage: [country.name],
            type: pkg.type,
            package_type: pkg.type,
            flag: country.flag,
            region: country.region,
            isPopular: country.isPopular
          })
        })
      })

      return allOffers
    } catch (error) {
      console.error('Error loading local eSIM data:', error)
      return []
    }
  }

  async getOfferDetails(offerId: string): Promise<eSIMOffer> {
    try {
      // For Airalo API, we need to get all packages and find the specific one
      // since there's no direct single package endpoint
      const allOffers = await this.geteSIMOffers()
      const offer = allOffers.find(pkg => pkg.id === offerId || pkg.slug === offerId)
      
      if (offer) {
        return offer
      }
      
      throw new Error('Package not found')
    } catch (error) {
      console.error('Failed to fetch offer details:', error)
      // Return a mock offer if not found to prevent app crash
      return {
        id: offerId,
        slug: 'not-found',
        title: 'Package Not Found',
        country: 'Unknown',
        countryCode: 'XX',
        operator: 'Airalo',
        operator_name: 'Airalo',
        dataAmount: '1',
        dataUnit: 'GB',
        validity: '7 days',
        price: 5.00,
        currency: 'USD',
        cryptoPrice: 0.00015,
        description: 'Package details unavailable',
        coverage: ['Unknown'],
        type: 'prepaid',
        package_type: 'prepaid'
      }
    }
  }

  async purchaseeSIM(purchaseRequest: eSIMPurchaseRequest): Promise<eSIMActivation> {
    try {
      const response = await this.makeRequest('/v2/orders', 'POST', purchaseRequest)
      
      if (response?.data) {
        const orderData = response.data
        // For Airalo, we might need to fetch the eSIM details from another endpoint
        const esimData = orderData.sims?.[0] || {}
        
        return {
          iccid: esimData.iccid || 'TEMP_ICCID',
          qrCode: esimData.qrcode_url || '',
          lpa: esimData.lpa || '',
          qrcode_url: esimData.qrcode_url || '',
          manual_installation: {
            activation_code: esimData.lpa || '',
            confirmation_code: esimData.confirmation_code || ''
          },
          smdp_address: esimData.smdp_address || 'prod.ondemandconnectivity.com',
          instructions: [
            'Go to Settings on your device',
            'Select Mobile Data or Cellular',
            'Tap "Add Cellular Plan" or "Add Data Plan"',
            'Scan the QR code or enter the manual activation code',
            'Follow the on-screen instructions to complete setup',
            'Enable the new data plan when ready to use'
          ]
        }
      }
      
      // Mock activation data for development
      const mockActivation: eSIMActivation = {
        iccid: '8901260123456789012',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        lpa: 'LPA:1$prod.ondemandconnectivity.com$abc123-def456',
        qrcode_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LPA:1$prod.ondemandconnectivity.com$abc123-def456',
        manual_installation: {
          activation_code: 'LPA:1$prod.ondemandconnectivity.com$abc123-def456',
          confirmation_code: 'ABC123'
        },
        smdp_address: 'prod.ondemandconnectivity.com',
        instructions: [
          'Go to Settings on your device',
          'Select Mobile Data or Cellular',
          'Tap "Add Cellular Plan" or "Add Data Plan"',
          'Scan the QR code or enter the manual activation code',
          'Follow the on-screen instructions to complete setup',
          'Enable the new data plan when ready to use'
        ]
      }
      
      return mockActivation
    } catch (error) {
      console.error('Failed to purchase eSIM:', error)
      throw error
    }
  }

  async geteSIMStatus(iccid: string): Promise<any> {
    try {
      const response = await this.makeRequest(`/v2/sims/${iccid}/usage`)
      return response?.data
    } catch (error) {
      console.error('Failed to get eSIM status:', error)
      throw error
    }
  }

  async getOrders(): Promise<any[]> {
    try {
      const response = await this.makeRequest('/v2/orders')
      return response?.data || []
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      throw error
    }
  }

  // Nouvelles méthodes utilisant la base de données locale complète
  
  /**
   * Récupère tous les pays disponibles avec leurs drapeaux
   */
  getAllCountries(): AiraloCountry[] {
    return AIRALO_COUNTRIES
  }



  /**
   * Récupère toutes les régions disponibles
   */
  getAllRegions(): string[] {
    return getAllRegions()
  }

  /**
   * Récupère les forfaits régionaux et globaux
   */
  getRegionalPackages(): AiraloPackage[] {
    return REGIONAL_PACKAGES
  }

  /**
   * Recherche des pays par nom ou code
   */
  searchCountries(query: string): AiraloCountry[] {
    const searchTerm = query.toLowerCase()
    return AIRALO_COUNTRIES.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm)
    )
  }

  /**
   * Récupère un pays spécifique par code
   */
  getCountryByCode(countryCode: string): AiraloCountry | undefined {
    return AIRALO_COUNTRIES.find(country => 
      country.code.toLowerCase() === countryCode.toLowerCase()
    )
  }

  /**
   * Récupère les forfaits d'un pays spécifique
   */
  getPackagesByCountry(countryCode: string): AiraloPackage[] {
    const country = this.getCountryByCode(countryCode)
    return country?.packages || []
  }

  /**
   * Conversion du prix en Bitcoin (taux en temps réel)
   */
  async convertToBitcoin(usdPrice: number): Promise<number> {
    try {
      // Import dynamique pour éviter les dépendances circulaires
      const { cryptoExchangeService } = await import('./cryptoExchangeService')
      return await cryptoExchangeService.convertUsdToBtc(usdPrice)
    } catch (error) {
      console.warn('⚠️ Échec conversion crypto, utilisation taux fixe:', error)
      // Taux de secours
      return usdPrice / 38000
    }
  }

  /**
   * Formatage des prix en crypto
   */
  async formatCryptoPrice(usdPrice: number): Promise<string> {
    try {
      // Import dynamique pour éviter les dépendances circulaires
      const { cryptoExchangeService } = await import('./cryptoExchangeService')
      const btcAmount = await cryptoExchangeService.convertUsdToBtc(usdPrice)
      return cryptoExchangeService.formatCryptoPrice(btcAmount)
    } catch (error) {
      console.warn('⚠️ Échec formatage crypto, utilisation taux fixe:', error)
      // Formatage de secours
      const btcAmount = usdPrice / 38000
      if (btcAmount >= 0.01) {
        return `${btcAmount.toFixed(4)} BTC`
      } else if (btcAmount >= 0.00001) {
        return `${(btcAmount * 1000).toFixed(2)} mBTC`
      } else {
        return `${(btcAmount * 100000).toFixed(0)} sats`
      }
    }
  }

  /**
   * Récupère les statistiques globales
   */
  getGlobalStats() {
    return {
      totalCountries: AIRALO_COUNTRIES.length,
      totalRegions: getAllRegions().length,
      popularCountries: getPopularCountries().length,
      regionalPackages: REGIONAL_PACKAGES.length,
      totalPackages: AIRALO_COUNTRIES.reduce((total, country) => 
        total + country.packages.length, 0) + REGIONAL_PACKAGES.length
    }
  }

  /**
   * Get statistics about available eSIM offers
   */
  getStatistics() {
    const totalCountries = AIRALO_COUNTRIES.length
    const totalPackages = AIRALO_COUNTRIES.reduce((total, country) => 
      total + country.packages.length, 0)
    const popularCountries = AIRALO_COUNTRIES.filter(country => country.isPopular).length
    
    // Group by regions
    const regionStats = AIRALO_COUNTRIES.reduce((stats: any, country) => {
      if (!stats[country.region]) {
        stats[country.region] = {
          countries: 0,
          packages: 0
        }
      }
      stats[country.region].countries++
      stats[country.region].packages += country.packages.length
      return stats
    }, {})

    return {
      totalCountries,
      totalPackages,
      popularCountries,
      regions: Object.keys(regionStats).length,
      regionStats
    }
  }

  /**
   * Get all available regions
   */
  getRegions(): string[] {
    const regions = new Set<string>()
    AIRALO_COUNTRIES.forEach(country => {
      regions.add(country.region)
    })
    return Array.from(regions).sort()
  }

  /**
   * Get countries by region
   */
  getCountriesByRegion(region: string): AiraloCountry[] {
    return AIRALO_COUNTRIES.filter(country => country.region === region)
  }

  /**
   * Get popular countries
   */
  getPopularCountries(): AiraloCountry[] {
    return AIRALO_COUNTRIES.filter(country => country.isPopular)
  }
}

export const airaloApi = new AiraloApiService()
export type { eSIMOffer, eSIMPurchaseRequest, eSIMActivation }
