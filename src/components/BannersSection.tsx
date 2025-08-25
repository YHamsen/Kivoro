import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBanners } from '../hooks/useMarketData'

interface Banner {
  id: number
  title: string
  subtitle: string
  buttonText: string
  background: string
  textColor: string
}

const BannersSection: React.FC = () => {
  const { data: banners, isLoading } = useBanners()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }, 5000) // Auto-scroll every 5 seconds

      return () => clearInterval(interval)
    }
  }, [banners.length])

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (isLoading || banners.length === 0) return null

  return (
    <div className="px-4 py-4 bg-[#0a0a0a]">
      <div className="relative overflow-hidden rounded-xl h-32">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="w-full flex-shrink-0 h-full p-4 flex items-center justify-between relative overflow-hidden rounded-xl"
              style={{ background: banner.background }}
            >
              <div className="z-10">
                <h3 
                  className="text-lg font-bold mb-1"
                  style={{ color: banner.textColor }}
                >
                  {banner.title}
                </h3>
                <p 
                  className="text-sm opacity-90 mb-3"
                  style={{ color: banner.textColor }}
                >
                  {banner.subtitle}
                </p>
                <motion.button
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/30"
                  style={{ color: banner.textColor }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {banner.buttonText}
                </motion.button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
                <div className="w-16 h-16 rounded-full border-2 border-current"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevBanner}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextBanner}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannersSection
