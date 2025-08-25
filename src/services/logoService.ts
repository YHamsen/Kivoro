// Company Logo Service
export interface CompanyLogo {
  symbol: string
  logoUrl: string
  backgroundColor?: string
  fallbackInitials: string
}

class LogoService {
  private logoCache = new Map<string, CompanyLogo>()

  // Popular company logos with reliable URLs
  private knownLogos: { [key: string]: CompanyLogo } = {
    'AAPL': {
      symbol: 'AAPL',
      logoUrl: 'https://logo.clearbit.com/apple.com',
      backgroundColor: '#000000',
      fallbackInitials: 'AP'
    },
    'GOOGL': {
      symbol: 'GOOGL',
      logoUrl: 'https://logo.clearbit.com/google.com',
      backgroundColor: '#4285F4',
      fallbackInitials: 'GO'
    },
    'MSFT': {
      symbol: 'MSFT',
      logoUrl: 'https://logo.clearbit.com/microsoft.com',
      backgroundColor: '#00BCF2',
      fallbackInitials: 'MS'
    },
    'TSLA': {
      symbol: 'TSLA',
      logoUrl: 'https://logo.clearbit.com/tesla.com',
      backgroundColor: '#CC0000',
      fallbackInitials: 'TS'
    },
    'META': {
      symbol: 'META',
      logoUrl: 'https://logo.clearbit.com/meta.com',
      backgroundColor: '#1877F2',
      fallbackInitials: 'ME'
    },
    'AMZN': {
      symbol: 'AMZN',
      logoUrl: 'https://logo.clearbit.com/amazon.com',
      backgroundColor: '#FF9900',
      fallbackInitials: 'AM'
    },
    'NVDA': {
      symbol: 'NVDA',
      logoUrl: 'https://logo.clearbit.com/nvidia.com',
      backgroundColor: '#76B900',
      fallbackInitials: 'NV'
    },
    'NFLX': {
      symbol: 'NFLX',
      logoUrl: 'https://logo.clearbit.com/netflix.com',
      backgroundColor: '#E50914',
      fallbackInitials: 'NF'
    },
    'ADBE': {
      symbol: 'ADBE',
      logoUrl: 'https://logo.clearbit.com/adobe.com',
      backgroundColor: '#FF0000',
      fallbackInitials: 'AD'
    },
    'CRM': {
      symbol: 'CRM',
      logoUrl: 'https://logo.clearbit.com/salesforce.com',
      backgroundColor: '#00A1E0',
      fallbackInitials: 'SF'
    },
    'UBER': {
      symbol: 'UBER',
      logoUrl: 'https://logo.clearbit.com/uber.com',
      backgroundColor: '#000000',
      fallbackInitials: 'UB'
    },
    'SHOP': {
      symbol: 'SHOP',
      logoUrl: 'https://logo.clearbit.com/shopify.com',
      backgroundColor: '#7AB55C',
      fallbackInitials: 'SH'
    },
    'SPOT': {
      symbol: 'SPOT',
      logoUrl: 'https://logo.clearbit.com/spotify.com',
      backgroundColor: '#1DB954',
      fallbackInitials: 'SP'
    },
    'TWTR': {
      symbol: 'TWTR',
      logoUrl: 'https://logo.clearbit.com/twitter.com',
      backgroundColor: '#1DA1F2',
      fallbackInitials: 'TW'
    },
    'SNAP': {
      symbol: 'SNAP',
      logoUrl: 'https://logo.clearbit.com/snap.com',
      backgroundColor: '#FFFC00',
      fallbackInitials: 'SN'
    }
  }

  // Domain mapping for common stocks
  private getDomainForSymbol(symbol: string): string {
    const domainMap: { [key: string]: string } = {
      'AAPL': 'apple.com',
      'GOOGL': 'google.com',
      'GOOG': 'google.com',
      'MSFT': 'microsoft.com',
      'TSLA': 'tesla.com',
      'META': 'meta.com',
      'FB': 'meta.com',
      'AMZN': 'amazon.com',
      'NVDA': 'nvidia.com',
      'NFLX': 'netflix.com',
      'ADBE': 'adobe.com',
      'CRM': 'salesforce.com',
      'UBER': 'uber.com',
      'SHOP': 'shopify.com',
      'SPOT': 'spotify.com',
      'TWTR': 'twitter.com',
      'SNAP': 'snap.com',
      'DIS': 'disney.com',
      'INTC': 'intel.com',
      'AMD': 'amd.com',
      'IBM': 'ibm.com',
      'ORCL': 'oracle.com',
      'V': 'visa.com',
      'MA': 'mastercard.com',
      'PYPL': 'paypal.com',
      'BA': 'boeing.com',
      'KO': 'coca-cola.com',
      'PEP': 'pepsi.com',
      'WMT': 'walmart.com',
      'HD': 'homedepot.com',
      'MCD': 'mcdonalds.com',
      'NKE': 'nike.com'
    }
    
    return domainMap[symbol] || `${symbol.toLowerCase()}.com`
  }

  async getLogo(symbol: string): Promise<CompanyLogo> {
    // Check cache first
    if (this.logoCache.has(symbol)) {
      return this.logoCache.get(symbol)!
    }

    // Check known logos
    if (this.knownLogos[symbol]) {
      const logo = this.knownLogos[symbol]
      this.logoCache.set(symbol, logo)
      return logo
    }

    // Generate logo using Clearbit or similar service
    const domain = this.getDomainForSymbol(symbol)
    const logo: CompanyLogo = {
      symbol,
      logoUrl: `https://logo.clearbit.com/${domain}`,
      backgroundColor: this.generateColorFromSymbol(symbol),
      fallbackInitials: symbol.substring(0, 2).toUpperCase()
    }

    this.logoCache.set(symbol, logo)
    return logo
  }

  // Generate a consistent color based on symbol
  private generateColorFromSymbol(symbol: string): string {
    const colors = [
      '#00D4AA', '#F7931A', '#6366F1', '#EF4444', '#F59E0B',
      '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
      '#F97316', '#3B82F6', '#14B8A6', '#A855F7', '#EAB308'
    ]
    
    let hash = 0
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  // Check if logo URL is working
  async validateLogoUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
      return response.ok
    } catch {
      return false
    }
  }

  // Get multiple logos at once
  async getLogos(symbols: string[]): Promise<Map<string, CompanyLogo>> {
    const logoMap = new Map<string, CompanyLogo>()
    
    await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const logo = await this.getLogo(symbol)
          logoMap.set(symbol, logo)
        } catch (error) {
          console.warn(`Failed to get logo for ${symbol}:`, error)
          // Create fallback
          logoMap.set(symbol, {
            symbol,
            logoUrl: '',
            backgroundColor: this.generateColorFromSymbol(symbol),
            fallbackInitials: symbol.substring(0, 2).toUpperCase()
          })
        }
      })
    )
    
    return logoMap
  }

  // Clear cache
  clearCache(): void {
    this.logoCache.clear()
  }
}

export const logoService = new LogoService()
