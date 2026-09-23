import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getMediaQuery() {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  return window.matchMedia(QUERY)
}

// Non-hook read for imperative code (event handlers, one-off effects)
export function prefersReducedMotion() {
  return getMediaQuery()?.matches ?? false
}

// Subscribe to a MediaQueryList change event with the Safari < 14 fallback
export function onReducedMotionChange(callback) {
  const mq = getMediaQuery()
  if (!mq) return () => {}
  const handler = (e) => callback(e.matches)
  if (mq.addEventListener) {
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }
  mq.addListener?.(handler)
  return () => mq.removeListener?.(handler)
}

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    setReduced(prefersReducedMotion())
    return onReducedMotionChange(setReduced)
  }, [])

  return reduced
}
