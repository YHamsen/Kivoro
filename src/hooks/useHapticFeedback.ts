import { useCallback } from 'react'

// Types of haptic feedback
export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'notification'

// Interface for the vibration API
interface Navigator {
  vibrate?: (pattern: number | number[]) => boolean
}

interface HapticFeedbackOptions {
  enabled?: boolean
  fallbackVibration?: boolean
}

const useHapticFeedback = (options: HapticFeedbackOptions = {}) => {
  const { enabled = true, fallbackVibration = true } = options

  const triggerHaptic = useCallback((type: HapticType = 'light') => {
    if (!enabled) return

    // Check if we're in a mobile environment with haptic feedback support
    if (window.DeviceMotionEvent && 'HapticEngine' in window) {
      // iOS Haptic Engine support
      const hapticEngine = (window as any).HapticEngine
      if (hapticEngine) {
        switch (type) {
          case 'light':
            hapticEngine.impactOccurred('light')
            break
          case 'medium':
            hapticEngine.impactOccurred('medium')
            break
          case 'heavy':
            hapticEngine.impactOccurred('heavy')
            break
          case 'selection':
            hapticEngine.selectionChanged()
            break
          case 'notification':
            hapticEngine.notificationOccurred('success')
            break
        }
        return
      }
    }

    // Android/Web Vibration API fallback
    if (fallbackVibration && navigator.vibrate) {
      let pattern: number
      switch (type) {
        case 'light':
          pattern = 10
          break
        case 'medium':
          pattern = 20
          break
        case 'heavy':
          pattern = 30
          break
        case 'selection':
          pattern = 5
          break
        case 'notification':
          pattern = 50
          break
        default:
          pattern = 10
      }
      navigator.vibrate(pattern)
    }
  }, [enabled, fallbackVibration])

  // Utility function to combine with onClick handlers
  const withHaptic = useCallback((
    callback?: () => void,
    hapticType: HapticType = 'light'
  ) => {
    return () => {
      triggerHaptic(hapticType)
      callback?.()
    }
  }, [triggerHaptic])

  return { triggerHaptic, withHaptic }
}

export default useHapticFeedback
