import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { AnimatedCounter } from '../ui/AnimatedCounter'

// Reusable hook for triggering animations on scroll
function useOnScreen(threshold = 0.3) {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersecting) {
          setIntersecting(true)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isIntersecting, threshold])
  return [ref, isIntersecting]
}

export function GrowthChart({ className = '' }) {
  const [ref, isVisible] = useOnScreen()

  const pathD =
    'M50,223.6 C133,223.6 133,190 216,190 C299,190 299,161.88 383,161.88 C466,161.88 466,50 550,50'
  const areaD =
    'M50,250 L50,223.6 C133,223.6 133,190 216,190 C299,190 299,161.88 383,161.88 C466,161.88 466,50 550,50 L550,250 Z'

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[800px] mx-auto ${className}`}
    >
      <svg viewBox="0 0 600 300" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-primary, #F5B301)"
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor="var(--color-primary, #F5B301)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[50, 100, 150, 200, 250].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="560"
            y2={y}
            stroke="#333"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
        ))}

        {/* X-axis */}
        <line
          x1="40"
          y1="250"
          x2="560"
          y2="250"
          stroke="#555"
          strokeWidth="2"
        />

        {/* Area fill */}
        <path
          d={areaD}
          fill="url(#growthArea)"
          className="transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 1 : 0, transitionDelay: '500ms' }}
        />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-primary, #F5B301)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-[2000ms] ease-out"
          style={{
            strokeDasharray: 800,
            strokeDashoffset: isVisible ? 0 : 800,
          }}
        />

        {/* Data points & labels */}
        {isVisible && (
          <g className="animate-[fadeInUp_0.5s_ease-out_1.5s_both]">
            <circle
              cx="50"
              cy="223.6"
              r="6"
              fill="#111"
              stroke="var(--color-primary, #F5B301)"
              strokeWidth="3"
            />
            <text
              x="50"
              y="275"
              fill="#999"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              2023
            </text>
            <text
              x="50"
              y="205"
              fill="#fff"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              660
            </text>

            <circle
              cx="216"
              cy="190"
              r="6"
              fill="#111"
              stroke="var(--color-primary, #F5B301)"
              strokeWidth="3"
            />
            <text
              x="216"
              y="275"
              fill="#999"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              2024
            </text>
            <text
              x="216"
              y="172"
              fill="#fff"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              ~1,500
            </text>

            <circle
              cx="383"
              cy="161.88"
              r="6"
              fill="#111"
              stroke="var(--color-primary, #F5B301)"
              strokeWidth="3"
            />
            <text
              x="383"
              y="275"
              fill="#999"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              2025
            </text>
            <text
              x="383"
              y="144"
              fill="#fff"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              2,203
            </text>

            <circle
              cx="550"
              cy="50"
              r="8"
              fill="var(--color-primary, #F5B301)"
              stroke="#111"
              strokeWidth="2"
            />
            <text
              x="550"
              y="275"
              fill="#999"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              2026
            </text>
            <text
              x="550"
              y="35"
              fill="var(--color-primary, #F5B301)"
              fontSize="16"
              textAnchor="middle"
              fontWeight="bold"
            >
              5,000+
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

GrowthChart.propTypes = { className: PropTypes.string }

export function DemographicRing({ className = '' }) {
  const [ref, isVisible] = useOnScreen()

  const circumference = 502.65
  const blackPct = 0.52
  const remainingPct = 1 - blackPct

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="-rotate-90"
      >
        {/* Remaining segment */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="20"
          strokeDasharray={`${circumference * remainingPct} ${circumference}`}
          strokeDashoffset={isVisible ? 0 : circumference * remainingPct}
          className="transition-all duration-1000 ease-out"
          style={{ transitionDelay: '500ms' }}
        />
        {/* Primary segment (Black/African-American) */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="var(--color-primary, #F5B301)"
          strokeWidth="20"
          strokeDasharray={`${circumference * blackPct} ${circumference}`}
          strokeDashoffset={
            isVisible ? -(circumference * remainingPct) : circumference
          }
          className="transition-all duration-[1500ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
          52%
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-tight mt-1 max-w-[80px]">
          Black/African American
        </span>
      </div>
    </div>
  )
}

DemographicRing.propTypes = { className: PropTypes.string }

export function GenderBar({ className = '' }) {
  const [ref, isVisible] = useOnScreen()
  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
          Women
        </span>
        <span className="text-xl font-bold text-white">75%</span>
      </div>
      <div className="h-3 w-full bg-surface-card rounded-full overflow-hidden border border-surface">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-400 rounded-full transition-all duration-[1500ms] ease-out"
          style={{ width: isVisible ? '75%' : '0%' }}
        />
      </div>
    </div>
  )
}

GenderBar.propTypes = { className: PropTypes.string }

export function GeographicBar({ className = '' }) {
  const [ref, isVisible] = useOnScreen()

  return (
    <div ref={ref} className={`w-full flex flex-col gap-6 ${className}`}>
      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Metro Detroit
          </span>
          <span className="text-xl font-bold text-white">91%</span>
        </div>
        <div className="h-3 w-full bg-surface-card rounded-full overflow-hidden border border-surface">
          <div
            className="h-full bg-primary rounded-full transition-all duration-[1500ms] ease-out"
            style={{ width: isVisible ? '91%' : '0%' }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            City of Detroit
          </span>
          <span className="text-xl font-bold text-white">52%</span>
        </div>
        <div className="h-3 w-full bg-surface-card rounded-full overflow-hidden border border-surface">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-[1500ms] ease-out delay-200"
            style={{ width: isVisible ? '52%' : '0%' }}
          />
        </div>
      </div>
    </div>
  )
}

GeographicBar.propTypes = { className: PropTypes.string }

export function EmploymentSplit({ className = '' }) {
  const [ref, isVisible] = useOnScreen()

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex justify-between text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400 mb-3">
        <span>Working Professionals</span>
        <span>Students / Self-Learners</span>
      </div>
      <div className="h-6 w-full bg-surface-card rounded-full flex overflow-hidden border border-surface">
        <div
          className="h-full bg-blue-500 transition-all duration-[1500ms] ease-out flex items-center justify-start pl-3 text-xs font-bold text-white"
          style={{ width: isVisible ? '58%' : '0%' }}
        >
          {isVisible && '58%'}
        </div>
        <div
          className="h-full bg-violet-500 transition-all duration-[1500ms] ease-out flex items-center justify-end pr-3 text-xs font-bold text-white"
          style={{ width: isVisible ? '42%' : '0%' }}
        >
          {isVisible && '42%'}
        </div>
      </div>
    </div>
  )
}

EmploymentSplit.propTypes = { className: PropTypes.string }

export function EcosystemImpactGrid({ className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
        <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col items-center text-center">
          <AnimatedCounter value={87} />
          <p className="mt-2 text-sm leading-relaxed text-gray-400 font-semibold">
            Prospective Student Engagements
          </p>
        </div>
        <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col items-center text-center">
          <AnimatedCounter value={8} />
          <p className="mt-2 text-sm leading-relaxed text-gray-400 font-semibold">
            Bootcamp Enrollments
          </p>
        </div>
        <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col items-center text-center">
          <AnimatedCounter value={7} />
          <p className="mt-2 text-sm leading-relaxed text-gray-400 font-semibold">
            Employment Offers
          </p>
        </div>
        <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col items-center text-center">
          <AnimatedCounter value={3} />
          <p className="mt-2 text-sm leading-relaxed text-gray-400 font-semibold">
            Direct COMPASS Connections
          </p>
        </div>
      </div>
      <p className="mt-6 text-sm text-center italic text-gray-400">
        Results reported by Grand Circus from a single COMPASS Innovation Summit
        hosted at Google Detroit.
      </p>
    </div>
  )
}

EcosystemImpactGrid.propTypes = { className: PropTypes.string }
