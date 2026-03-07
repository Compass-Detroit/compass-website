import { useState, useEffect, useCallback } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

export default function ScrollProgressButton() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    setScrollPercent(Math.min(percent, 100))
    setIsVisible(scrollTop > 300)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    const startPosition = window.scrollY
    const startTime = performance.now()
    const duration = 1200

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startPosition * (1 - easeOutQuart(progress)))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  // SVG circle math: radius 20, circumference = 2 * PI * 20
  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-primary transition-all duration-150"
        style={{ width: `${scrollPercent}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Floating button with circular progress */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-surface-card/90 text-white shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Return to top of page"
        title="Return to top of page"
      >
        {/* Circular progress ring */}
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
            r="20"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#D4A017"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150"
          />
        </svg>
        <FaArrowUp className="relative z-10 size-4" aria-hidden="true" />
      </button>
    </>
  )
}
