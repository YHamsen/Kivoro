import React from 'react'
import { motion } from 'framer-motion'

interface EnhancedSparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  isPositive?: boolean
  showFill?: boolean
  animated?: boolean
  strokeWidth?: number
}

const EnhancedSparkline: React.FC<EnhancedSparklineProps> = ({
  data,
  width = 60,
  height = 20,
  color,
  isPositive = true,
  showFill = true,
  animated = true,
  strokeWidth = 2
}) => {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-slate-800/50 rounded" 
        style={{ width, height }}
      >
        <div className="w-1 h-1 bg-slate-600 rounded-full animate-pulse"></div>
      </div>
    )
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  // Calculer les points de la ligne
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  // Couleur adaptative
  const lineColor = color || (isPositive ? '#10b981' : '#ef4444')
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  // Animation du tracé
  const pathLength = data.length * 2
  
  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          {showFill && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.4"/>
              <stop offset="50%" stopColor={lineColor} stopOpacity="0.2"/>
              <stop offset="100%" stopColor={lineColor} stopOpacity="0"/>
            </linearGradient>
          )}
          
          {/* Filtre pour effet de glow */}
          <filter id={`glow-${gradientId}`}>
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Zone de remplissage */}
        {showFill && (
          <motion.polygon
            points={`0,${height} ${points} ${width},${height}`}
            fill={`url(#${gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}

        {/* Ligne principale avec animation */}
        <motion.polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${gradientId})`}
          initial={animated ? { 
            pathLength: 0,
            opacity: 0 
          } : {}}
          animate={animated ? { 
            pathLength: 1,
            opacity: 1 
          } : {}}
          transition={animated ? { 
            duration: 1.5, 
            ease: "easeInOut" 
          } : {}}
        />

        {/* Point de fin avec animation */}
        {data.length > 0 && (
          <motion.circle
            cx={(data.length - 1) / (data.length - 1) * width}
            cy={height - ((data[data.length - 1] - min) / range) * height}
            r="2"
            fill={lineColor}
            initial={animated ? { 
              scale: 0, 
              opacity: 0 
            } : {}}
            animate={animated ? { 
              scale: 1, 
              opacity: 1 
            } : {}}
            transition={animated ? { 
              duration: 0.3, 
              delay: 1.2 
            } : {}}
          >
            <animate 
              attributeName="r" 
              values="2;3;2" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </motion.circle>
        )}

        {/* Ligne de tendance subtile */}
        {data.length > 1 && (
          <line
            x1="0"
            y1={height - ((data[0] - min) / range) * height}
            x2={width}
            y2={height - ((data[data.length - 1] - min) / range) * height}
            stroke={lineColor}
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.3"
          />
        )}
      </svg>

      {/* Indicateur de tendance */}
      <div className="absolute -top-1 -right-1">
        {isPositive ? (
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        ) : (
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  )
}

export default EnhancedSparkline
