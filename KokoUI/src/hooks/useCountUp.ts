import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  durationMs?: number
  decimals?: number
}

export function useCountUp(targetValue: number, options: UseCountUpOptions = {}) {
  const { durationMs = 750, decimals = 0 } = options
  const [value, setValue] = useState(0)

  useEffect(() => {
    let animationFrame = 0
    const start = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start
      const progress = Math.min(1, elapsed / durationMs)
      const nextValue = targetValue * progress
      const roundedValue = Number(nextValue.toFixed(decimals))
      setValue(roundedValue)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [decimals, durationMs, targetValue])

  return value
}
