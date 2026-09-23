import { useEffect, useRef, useState } from 'react'

/**
 * Loads async data with a static fallback. `load(signal)` runs whenever `key`
 * changes; while it is pending, or if it fails, `data` is the fallback so the
 * UI never renders empty.
 *
 * status: 'loading' | 'live' | 'fallback'
 */
export function useResource(key, load, fallback) {
  const loadRef = useRef(load)
  loadRef.current = load
  const [state, setState] = useState({ key, status: 'loading', data: fallback })

  useEffect(() => {
    const controller = new AbortController()
    loadRef
      .current(controller.signal)
      .then((data) => setState({ key, status: 'live', data }))
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({ key, status: 'fallback', data: fallback, error })
      })
    return () => controller.abort()
    // fallback is a snapshot; only a new key should refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // A stale result from the previous key reads as loading, not as data.
  return state.key === key ? state : { key, status: 'loading', data: fallback }
}
