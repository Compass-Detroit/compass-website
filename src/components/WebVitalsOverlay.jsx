import { useState, useEffect } from 'react'
import { useWebVitals } from '@/hooks/useTelemetry'

export default function WebVitalsOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const metrics = useWebVitals()

  useEffect(() => {
    if (!import.meta.env.DEV) return

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        setIsVisible((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!import.meta.env.DEV || !isVisible) return null

  const getColor = (rating) => {
    if (rating === 'good') return 'bg-green-500 text-white'
    if (rating === 'needs-improvement') return 'bg-[#FFA706] text-white'
    if (rating === 'poor') return 'bg-red-500 text-white'
    return 'bg-gray-200 text-gray-800'
  }

  const formatValue = (metric, value) => {
    if (value === null) return '---'
    if (metric === 'CLS') return value.toFixed(3)
    return `${Math.round(value)}ms`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-2xl backdrop-blur-lg dark:bg-gray-900/80">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Web Vitals
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">
        {Object.entries(metrics).map(([key, data]) => {
          if (!data.rating && data.value === null) return null
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg bg-white/50 p-2 dark:bg-gray-800/50"
            >
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {key}
              </span>
              <span
                className={`rounded px-2 py-1 text-xs font-bold ${getColor(
                  data.rating
                )}`}
              >
                {formatValue(key, data.value)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
