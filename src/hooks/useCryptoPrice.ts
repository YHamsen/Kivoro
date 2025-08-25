import { useState, useEffect } from 'react'
import { cryptoExchangeService } from '../services/cryptoExchangeService'

interface UseCryptoPriceReturn {
  cryptoPrice: string
  isLoading: boolean
  error: string | null
}

/**
 * Hook personnalisé pour récupérer et formater les prix crypto en temps réel
 */
export const useCryptoPrice = (usdPrice: number, crypto: 'bitcoin' | 'ethereum' = 'bitcoin'): UseCryptoPriceReturn => {
  const [cryptoPrice, setCryptoPrice] = useState<string>('...')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchCryptoPrice = async () => {
      if (usdPrice <= 0) {
        setCryptoPrice('Gratuit')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        let formattedPrice: string

        if (crypto === 'bitcoin') {
          const btcAmount = await cryptoExchangeService.convertUsdToBtc(usdPrice)
          formattedPrice = cryptoExchangeService.formatCryptoPrice(btcAmount, 'bitcoin')
        } else {
          const ethAmount = await cryptoExchangeService.convertUsdToEth(usdPrice)
          formattedPrice = cryptoExchangeService.formatCryptoPrice(ethAmount, 'ethereum')
        }

        if (isMounted) {
          setCryptoPrice(formattedPrice)
          setIsLoading(false)
        }
      } catch (err) {
        console.warn('⚠️ Erreur lors du calcul du prix crypto:', err)
        
        if (isMounted) {
          // Prix de secours
          const fallbackAmount = usdPrice / (crypto === 'bitcoin' ? 38000 : 2500)
          const fallbackPrice = cryptoExchangeService.formatCryptoPrice(fallbackAmount, crypto)
          
          setCryptoPrice(fallbackPrice)
          setError('Prix estimé (hors ligne)')
          setIsLoading(false)
        }
      }
    }

    fetchCryptoPrice()

    // Cleanup
    return () => {
      isMounted = false
    }
  }, [usdPrice, crypto])

  return { cryptoPrice, isLoading, error }
}

/**
 * Hook pour récupérer plusieurs prix crypto en une fois
 */
export const useMultipleCryptoPrices = (
  prices: Array<{ usd: number; crypto: 'bitcoin' | 'ethereum' }>
): Array<UseCryptoPriceReturn> => {
  const [results, setResults] = useState<Array<UseCryptoPriceReturn>>(
    prices.map(() => ({ cryptoPrice: '...', isLoading: true, error: null }))
  )

  useEffect(() => {
    let isMounted = true

    const fetchAllPrices = async () => {
      try {
        const newResults = await Promise.all(
          prices.map(async ({ usd, crypto }) => {
            if (usd <= 0) {
              return { cryptoPrice: 'Gratuit', isLoading: false, error: null }
            }

            try {
              let formattedPrice: string

              if (crypto === 'bitcoin') {
                const btcAmount = await cryptoExchangeService.convertUsdToBtc(usd)
                formattedPrice = cryptoExchangeService.formatCryptoPrice(btcAmount, 'bitcoin')
              } else {
                const ethAmount = await cryptoExchangeService.convertUsdToEth(usd)
                formattedPrice = cryptoExchangeService.formatCryptoPrice(ethAmount, 'ethereum')
              }

              return { cryptoPrice: formattedPrice, isLoading: false, error: null }
            } catch (err) {
              const fallbackAmount = usd / (crypto === 'bitcoin' ? 38000 : 2500)
              const fallbackPrice = cryptoExchangeService.formatCryptoPrice(fallbackAmount, crypto)
              
              return { 
                cryptoPrice: fallbackPrice, 
                isLoading: false, 
                error: 'Prix estimé (hors ligne)' 
              }
            }
          })
        )

        if (isMounted) {
          setResults(newResults)
        }
      } catch (err) {
        console.error('Erreur lors du calcul des prix crypto multiples:', err)
      }
    }

    fetchAllPrices()

    return () => {
      isMounted = false
    }
  }, [prices])

  return results
}

export default useCryptoPrice
