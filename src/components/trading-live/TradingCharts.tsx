import React from 'react'
import EnhancedProfessionalChart from './EnhancedProfessionalChart'

interface TradingChartsProps {
  symbol: string
  onOpenOrder: (type: 'buy' | 'sell', symbol: string) => void
}

const TradingCharts: React.FC<TradingChartsProps> = ({ symbol, onOpenOrder }) => {
  return (
    <div className="h-full bg-slate-950/50">
      <EnhancedProfessionalChart 
        symbol={symbol} 
        onOpenOrder={onOpenOrder}
      />
    </div>
  )
}

export default TradingCharts
