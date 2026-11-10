import { useEffect } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import './reveal.css'

/**
 * Fades and lifts `[data-reveal-item]` elements inside `rootRef` as they
 * scroll into view, staggered within each batch.
 *
 * Content is visible by default: an item is only hidden (`data-reveal=
 * "pending"`) when IntersectionObserver exists, motion is allowed and the
 * item starts below the fold. If JS or the observer never runs, nothing is
 * hidden. The site-wide `.reveal` class hides in CSS up front, so it isn't
 * used here.
 *
 * `key` re-scans after the list changes (filters, search).
 */
export default function useRevealOnScroll(rootRef, key) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced || typeof IntersectionObserver === 'undefined')
      return undefined

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target
          el.style.setProperty('--reveal-delay', `${Math.min(n++, 6) * 60}ms`)
          el.dataset.reveal = 'shown'
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -6% 0px' }
    )

    // Read every position first, then write, to avoid layout thrash
    const fold = window.innerHeight * 0.92
    const items = [...root.querySelectorAll('[data-reveal-item]')]
      .filter((el) => el.dataset.reveal !== 'shown')
      .map((el) => [el, el.getBoundingClientRect().top > fold])

    for (const [el, below] of items) {
      if (below) {
        el.dataset.reveal = 'pending'
        io.observe(el)
      } else {
        el.dataset.reveal = 'shown'
      }
    }

    return () => io.disconnect()
  }, [rootRef, key, reduced])
}
