import { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

// SVG circle math: radius 20, circumference = 2 * PI * 20
const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ScrollProgressButton() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const frame = useRef(0)
  const reducedMotion = usePrefersReducedMotion()

  // One state update per frame, however fast scroll events arrive
  useEffect(() => {
    const measure = () => {
      frame.current = 0
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
      setIsVisible(scrollTop > 300)
    }
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  const scrollToTop = () => {
    if (reducedMotion) return window.scrollTo(0, 0)
    const start = window.scrollY
    const startTime = performance.now()
    const duration = 700
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      window.scrollTo(0, start * (1 - easeOutQuart(t)))
      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return (
    <>
      {/* Top progress bar: scaled, not resized, so it stays on the compositor */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Solid gold with a dark arrow and ring: >= 7:1 on every theme */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-gray-950 shadow-lg shadow-black/25 ring-1 ring-black/10 transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-safe:hover:-translate-y-0.5 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Return to top of page"
        tabIndex={isVisible ? 0 : -1}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="rgba(3, 7, 18, 0.18)"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="#030712"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <FaArrowUp className="relative size-4" aria-hidden="true" />
      </button>
    </>
  )
}
