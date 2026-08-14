import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasAnimated, target, duration])

  return { ref, count }
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className = '',
  duration = 1600,
}) {
  const { ref, count } = useCounter(value, duration)

  const displayValue = value >= 1000 ? count.toLocaleString() : count

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
        {prefix && (
          <span className="mr-1 text-2xl md:text-3xl text-primary">
            {prefix}
          </span>
        )}
        <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
          {displayValue}
        </span>
        {suffix && (
          <span className="ml-1 text-2xl md:text-3xl text-primary">
            {suffix}
          </span>
        )}
      </div>
      {label && (
        <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400 text-center">
          {label}
        </div>
      )}
    </div>
  )
}

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
}
