import { useEffect, useMemo, useState } from 'react'

export function useCountdown(targetTimestamp: number) {
  const [currentTimestamp, setCurrentTimestamp] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return useMemo(() => Math.max(0, targetTimestamp - currentTimestamp), [targetTimestamp, currentTimestamp])
}
