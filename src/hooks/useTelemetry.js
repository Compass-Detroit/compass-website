import { useEffect, useState } from 'react'
import { trackFeatureUsage, rateMetric } from '@/utils/telemetry'
export { useTelemetry } from '@/components/TelemetryProvider'

export function usePageTelemetry(pageName) {
  useEffect(() => {
    const startTime = Date.now()
    let maxScroll = 0

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      )
      if (scrollPercent > maxScroll) maxScroll = scrollPercent
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      const duration = Date.now() - startTime
      trackFeatureUsage('page_engagement', {
        page: pageName,
        durationMs: duration,
        maxScrollDepth: maxScroll,
      })
    }
  }, [pageName])
}

export function useWebVitals() {
  const [metrics, setMetrics] = useState({
    LCP: { value: null, rating: null },
    FID: { value: null, rating: null },
    CLS: { value: null, rating: null },
    INP: { value: null, rating: null },
    TTFB: { value: null, rating: null },
  })

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics((prev) => ({
            ...prev,
            LCP: {
              value: entry.startTime,
              rating: rateMetric('LCP', entry.startTime),
            },
          }))
        } else if (
          entry.entryType === 'layout-shift' &&
          !entry.hadRecentInput
        ) {
          setMetrics((prev) => {
            const newValue = (prev.CLS.value || 0) + entry.value
            return {
              ...prev,
              CLS: { value: newValue, rating: rateMetric('CLS', newValue) },
            }
          })
        }
      })
    })

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
      observer.observe({ type: 'layout-shift', buffered: true })

      const navEntry = performance.getEntriesByType('navigation')[0]
      if (navEntry) {
        setMetrics((prev) => ({
          ...prev,
          TTFB: {
            value: navEntry.responseStart,
            rating: rateMetric('TTFB', navEntry.responseStart),
          },
        }))
      }
    } catch (e) {
      // Observer not supported
    }

    return () => observer.disconnect()
  }, [])

  return metrics
}
