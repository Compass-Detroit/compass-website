import { useState, useEffect, useCallback } from 'react'
import { fetchCalendarEvents } from '@/utils/calendarApi'

const STORAGE_KEY = 'compass-calendar-source'
const REFRESH_INTERVAL = 15 * 60 * 1000 // 15 minutes

export function useCalendarEvents({
  calendarId,
  fallbackEvents = [],
  enabled = true,
}) {
  const defaultSource =
    import.meta.env.VITE_USE_LIVE_CALENDAR === 'false' ? 'placeholder' : 'auto'

  const [dataSource, setDataSourceState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || defaultSource
    }
    return defaultSource
  })

  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState(null)

  const setDataSource = useCallback((newSource) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newSource)
    }
    setDataSourceState(newSource)
  }, [])

  const refresh = useCallback(async () => {
    if (!enabled || !calendarId) return

    if (dataSource === 'placeholder') {
      setEvents(fallbackEvents)
      setIsLive(false)
      setError(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCalendarEvents(calendarId)
      setEvents(data)
      setIsLive(true)
    } catch (err) {
      if (dataSource === 'auto') {
        setEvents(fallbackEvents)
        setIsLive(false)
      } else if (dataSource === 'live') {
        setEvents([])
        setError(err.message || 'Failed to fetch calendar events')
      }
    } finally {
      setIsLoading(false)
    }
  }, [calendarId, dataSource, enabled, fallbackEvents])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [isLive, refresh])

  return {
    events,
    isLoading,
    isLive,
    error,
    refresh,
    dataSource,
    setDataSource,
  }
}
