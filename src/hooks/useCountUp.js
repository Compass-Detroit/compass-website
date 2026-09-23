import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion, {
  prefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'

// Counts from 0 to `target` (easeOutCubic) the first time the element enters
// the viewport. Reduced motion shows the final value immediately.
// `started` flips true on reveal so sibling CSS transitions can sync to it.
export default function useCountUp(
  target,
  { duration = 1600, delay = 0, threshold = 0.3 } = {}
) {
  const reducedMotion = usePrefersReducedMotion()
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? target : 0
  )
  const [started, setStarted] = useState(prefersReducedMotion)
  const ref = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (
      reducedMotion ||
      startedRef.current ||
      !node ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setCount(target)
      setStarted(true)
      return
    }

    let rafId = null
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[entries.length - 1].isIntersecting) return
        if (startedRef.current) return
        startedRef.current = true
        observer.disconnect()
        setStarted(true)
        const startTime = performance.now() + delay
        const tick = (now) => {
          const progress = Math.min(
            Math.max((now - startTime) / duration, 0),
            1
          )
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          rafId = progress < 1 ? requestAnimationFrame(tick) : null
        }
        rafId = requestAnimationFrame(tick)
      },
      { threshold }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [target, duration, delay, threshold, reducedMotion])

  return { ref, count, started }
}
