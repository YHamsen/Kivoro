import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchCryptoTickers, fetchForexRates, realtimeManager } from '../utils/api'

export const useMarketData = (marketType: 'exchange' | 'forex') => {
  const queryClient = useQueryClient()
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketData', marketType],
    queryFn: () => marketType === 'exchange' ? fetchCryptoTickers() : fetchForexRates(),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  })

  // Set up real-time updates for crypto data
  useEffect(() => {
    if (marketType === 'exchange') {
      const handleRealtimeUpdate = (wsData: any) => {
        if (wsData.topic && wsData.topic.includes('tickers')) {
          // Update the query cache with real-time data
          queryClient.setQueryData(['marketData', 'exchange'], (oldData: any) => {
            if (!oldData) return oldData
            
            // Transform WebSocket data to match our format
            const updatedData = { ...oldData }
            if (wsData.data) {
              // Update the relevant ticker data
              // This would need to be customized based on actual Bybit WebSocket response format
              console.log('Received real-time update:', wsData.data)
            }
            return updatedData
          })
        }
      }

      const ws = realtimeManager.connectBybitWS(handleRealtimeUpdate)
      
      return () => {
        realtimeManager.disconnect('bybit')
      }
    }
  }, [marketType, queryClient])

  return {
    data,
    isLoading,
    error,
    refetch
  }
}

export const useAccountData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['accountData'],
    queryFn: async () => {
      // Simulate account data since we're using paper trading
      return {
        totalBalance: '11236.29',
        currency: 'EUR',
        btcEquivalent: '0.11586374',
        alpacaBalance: '5247.83',
        alpacaCurrency: 'USD'
      }
    },
    refetchInterval: 60000, // Refetch every minute
  })

  return {
    data,
    isLoading,
    error
  }
}

export const usePriceHistory = (symbol: string, interval: string = '1h') => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['priceHistory', symbol, interval],
    queryFn: async () => {
      // Generate mock price history data for demo
      const now = Date.now()
      const points = 24 // 24 hours of data
      const basePrice = symbol.includes('BTC') ? 103000 : symbol.includes('EUR') ? 1.15 : 2400
      
      return Array.from({ length: points }, (_, i) => {
        const timestamp = now - (points - i) * 3600000 // 1 hour intervals
        const price = basePrice + (Math.random() - 0.5) * basePrice * 0.05 // ±5% variation
        return {
          timestamp,
          price: price.toFixed(symbol.includes('EUR') ? 5 : 2),
          volume: Math.random() * 1000000
        }
      })
    },
    enabled: !!symbol,
    staleTime: 300000, // 5 minutes
  })

  return {
    data,
    isLoading,
    error
  }
}

export const useRealtimePrice = (symbol: string) => {
  const [price, setPrice] = useState<string>('')
  const [change, setChange] = useState<string>('')
  const queryClient = useQueryClient()

  useEffect(() => {
    // Use realistic and consistent price updates
    const interval = setInterval(() => {
      const marketData = queryClient.getQueryData(['marketData', 'exchange']) as any
      if (marketData && marketData.favorites) {
        const pair = marketData.favorites.find((p: any) => p.symbol === symbol)
        if (pair) {
          // More realistic small price movements (max ±0.05% change)
          const currentPrice = parseFloat(pair.price.replace(/,/g, ''))
          const maxChange = currentPrice * 0.0005 // ±0.05% maximum change
          const priceChange = (Math.random() - 0.5) * maxChange
          const newPrice = currentPrice + priceChange
          const changePercent = (priceChange / currentPrice) * 100

          setPrice(newPrice.toFixed(2))
          setChange(changePercent.toFixed(2))

          // Update the cache with consistent data
          queryClient.setQueryData(['marketData', 'exchange'], (oldData: any) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              favorites: oldData.favorites.map((p: any) =>
                p.symbol === symbol
                  ? { 
                      ...p, 
                      price: newPrice.toLocaleString(), 
                      changePercent: changePercent.toFixed(2),
                      change: priceChange.toFixed(2)
                    }
                  : p
              )
            }
          })
        }
      }
    }, 10000) // Update every 10 seconds for more stability

    return () => clearInterval(interval)
  }, [symbol, queryClient])

  return { price, change }
}

export const useBanners = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await fetch('/data/banners.json')
      if (!response.ok) throw new Error('Failed to fetch banners')
      return response.json()
    },
    staleTime: 300000, // 5 minutes
  })

  return {
    data: data || [],
    isLoading,
    error
  }
}

export const useSearchPairs = (query: string, marketType: 'exchange' | 'forex') => {
  const { data: marketData } = useMarketData(marketType)
  
  const filteredPairs = marketData ? 
    Object.values(marketData).flat().filter((pair: any) =>
      pair.symbol.toLowerCase().includes(query.toLowerCase())
    ) : []

  return {
    results: filteredPairs.slice(0, 10), // Limit to 10 results
    isLoading: !marketData
  }
}
