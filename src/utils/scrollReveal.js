/**
 * Site-wide scroll reveal. Any element with .reveal, .reveal-stagger or
 * .timeline-step starts hidden (see index.css) and gets .revealed when it
 * scrolls into view. One IntersectionObserver plus a MutationObserver covers
 * every page and component, so markup no longer depends on a page-level hook
 * being wired up — without one, that content stayed invisible.
 */
import { prefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const SELECTOR = '.reveal, .reveal-stagger, .timeline-step'

export function initScrollReveal(root = document.body) {
  // React rewrites className on re-render, dropping .revealed; remember what
  // was shown so it can be restored instead of disappearing again
  const shown = new WeakSet()
  const reveal = (el) => {
    shown.add(el)
    el.classList.add('revealed')
  }

  // No observer support or reduced motion: show everything immediately
  const immediate =
    typeof IntersectionObserver === 'undefined' || prefersReducedMotion()

  const io = immediate
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )

  const track = (node) => {
    if (!(node instanceof Element)) return
    const targets = node.matches(SELECTOR)
      ? [node, ...node.querySelectorAll(SELECTOR)]
      : node.querySelectorAll(SELECTOR)
    for (const el of targets) {
      if (el.classList.contains('revealed')) continue
      if (io) io.observe(el)
      else reveal(el)
    }
  }

  track(root)
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') m.addedNodes.forEach(track)
      else if (shown.has(m.target) && !m.target.classList.contains('revealed'))
        m.target.classList.add('revealed')
    }
  })
  mo.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  })

  return () => {
    mo.disconnect()
    io?.disconnect()
  }
}
