import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface MiniSparklineChartProps {
  data: number[]
  color?: string
  height?: number
  width?: number
  animate?: boolean
  className?: string
}

const MiniSparklineChart: React.FC<MiniSparklineChartProps> = ({
  data,
  color = '#00D4AA',
  height = 24,
  width = 60,
  animate = true,
  className = ''
}) => {
  const pathData = useMemo(() => {
    if (!data || data.length < 2) return ''

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })

    return `M ${points.join(' L ')}`
  }, [data, width, height])

  const fillPath = useMemo(() => {
    if (!pathData) return ''
    
    const lastPoint = data[data.length - 1]
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const lastY = height - ((lastPoint - min) / range) * height
    
    return `${pathData} L ${width},${height} L 0,${height} Z`
  }, [pathData, data, width, height])

  if (!data || data.length < 2) {
    return (
      <div className={`${className}`} style={{ width, height }}>
        <svg width={width} height={height} className="opacity-30">
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>
      </div>
    )
  }

  const isPositive = data[data.length - 1] >= data[0]
  const chartColor = isPositive ? '#00D4AA' : '#EF4444'

  return (
    <div className={`${className}`} style={{ width, height }}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={`gradient-${chartColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={chartColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        {fillPath && (
          <motion.path
            d={fillPath}
            fill={`url(#gradient-${chartColor})`}
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={animate ? { duration: 0.8, delay: 0.2 } : undefined}
          />
        )}

        {/* Line Path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={chartColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animate ? { duration: 1, ease: "easeInOut" } : undefined}
        />

        {/* End Point */}
        {pathData && (
          <motion.circle
            cx={width}
            cy={height - ((data[data.length - 1] - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * height}
            r="2"
            fill={chartColor}
            initial={animate ? { scale: 0, opacity: 0 } : undefined}
            animate={animate ? { scale: 1, opacity: 1 } : undefined}
            transition={animate ? { duration: 0.3, delay: 1 } : undefined}
          />
        )}
      </svg>
    </div>
  )
}

// Mock data generator for demonstration
export const generateMockChartData = (days: number = 7, basePrice: number = 100): number[] => {
  const data: number[] = [basePrice]
  
  for (let i = 1; i < days; i++) {
    const change = (Math.random() - 0.5) * 0.1 // Random change between -5% and +5%
    const newPrice = data[i - 1] * (1 + change)
    data.push(Math.max(newPrice, basePrice * 0.7)) // Prevent price from going too low
  }
  
  return data
}

export default MiniSparklineChart
