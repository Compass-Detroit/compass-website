import { useEffect, useId, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import {
  DETROIT_POINT,
  MICHIGAN_LOWER_PENINSULA,
  MICHIGAN_UPPER_PENINSULA,
} from '@/constants/michigan'

// Crisp, snappy motion: strong ease-out, tiny overshoot only where it reads
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const SPIN_MS = 1400
const TWITCH_MS = 420

// Theme-aware palette, taken from the COMPASS logo mark: green gear
// (#00c605), orange needle (#ee7d33) and amber wordmark (#ffa706).
// Dark values are the default; every light theme also carries `light` on <html>.
// Contrast against the hero background (graphics need 3:1, text 4.5:1):
//  - dark themes: gear 8:1, needle 6.7:1+, letters 9.5:1
//  - light themes: gear 3.7:1, needle 3.6:1+, letters 5:1, Michigan 4.5:1
const COMPASS_STYLES = `
  .animated-compass-wrap {
    --compass-gear: #00c605;
    --compass-letter: #ffa706;
    --compass-needle-n: #ee7d33;
    --compass-needle-s: #ffa706;
    --compass-hub: var(--surface, #0a0a0a);
    --compass-accent: #00c605;
    --compass-accent-fill: rgba(0, 198, 5, 0.12);
    --compass-accent-text: #00c605;
    --compass-detroit: #ee7d33;
  }
  .light .animated-compass-wrap {
    --compass-gear: #009a04;
    --compass-letter: #b45309;
    --compass-needle-n: #c2410c;
    --compass-needle-s: #d9651a;
    --compass-hub: #ffffff;
    --compass-accent: #008a04;
    --compass-accent-fill: rgba(0, 138, 4, 0.1);
    --compass-accent-text: #166534;
    --compass-detroit: #c2410c;
  }

  .compass-gear,
  .compass-needle-wrapper,
  .compass-twitch-layer {
    transform-origin: 90px 90px;
  }
  .pulse-circle {
    transform-box: fill-box;
    transform-origin: center;
    opacity: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    .compass-animate .compass-needle-wrapper {
      animation: compass-spin ${SPIN_MS}ms ${EASE_OUT} both;
    }
    .compass-animate .compass-gear {
      animation: gear-turn ${SPIN_MS}ms ${EASE_OUT} both;
    }
    /* Twitch lives on its own layer so it never restarts the mount spin */
    .compass-twitch-layer.compass-twitch {
      animation: compass-twitch ${TWITCH_MS}ms ${EASE_OUT};
    }
    .compass-animate .pulse-circle {
      animation: pulse-ring 2.4s ${EASE_OUT} ${SPIN_MS}ms infinite;
    }
    .compass-animate .pulse-circle-delayed {
      animation-delay: ${SPIN_MS + 1200}ms;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .compass-animate .compass-needle-wrapper {
      transform: rotate(0deg);
    }
    .pulse-circle {
      display: none;
    }
  }

  /* Two full turns, a 5deg overshoot, then settle — no long floaty tail */
  @keyframes compass-spin {
    0% { transform: rotate(0deg); }
    82% { transform: rotate(725deg); }
    100% { transform: rotate(720deg); }
  }

  /* The gear advances one tooth while the needle finds north */
  @keyframes gear-turn {
    from { transform: rotate(-45deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes compass-twitch {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(-10deg); }
    48% { transform: rotate(5deg); }
    74% { transform: rotate(-2deg); }
    100% { transform: rotate(0deg); }
  }

  /* One crisp ring per cycle, then rest (no continuous shimmer) */
  @keyframes pulse-ring {
    0% { transform: scale(0.5); opacity: 0.9; }
    60% { transform: scale(2.6); opacity: 0; }
    100% { transform: scale(2.6); opacity: 0; }
  }
`

// Logo gear: 8 rounded teeth around a hollow face, centred on the rose (90,90)
const GEAR = { teeth: 8, outer: 64, root: 53, hole: 42, tip: 0.14, base: 0.26 }

const smoothstep = (x) => x * x * (3 - 2 * x)

// Sampled outline; smoothstep flanks give the logo's soft tooth corners
function gearPath({ teeth, outer, root, hole, tip, base }, cx = 90, cy = 90) {
  const steps = teeth * 32
  const points = []
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const phase = (t * teeth) % 1
    const d = Math.min(phase, 1 - phase)
    const lift =
      d <= tip ? 1 : d >= base ? 0 : smoothstep((base - d) / (base - tip))
    const r = root + (outer - root) * lift
    const a = t * 2 * Math.PI - Math.PI / 2
    points.push(
      `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(
        2
      )}`
    )
  }
  // Second subpath punches the face out (evenodd)
  const face = `M${cx + hole} ${cy}A${hole} ${hole} 0 1 0 ${
    cx - hole
  } ${cy}A${hole} ${hole} 0 1 0 ${cx + hole} ${cy}Z`
  return `M${points.join('L')}Z${face}`
}

const GEAR_PATH = gearPath(GEAR)

// Connector runs from just outside the gear toward Detroit
const CONNECTOR = (() => {
  const dx = DETROIT_POINT.x - 90
  const dy = DETROIT_POINT.y - 90
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: 90 + ux * (GEAR.outer + 6),
    y1: 90 + uy * (GEAR.outer + 6),
    x2: DETROIT_POINT.x - ux * 9,
    y2: DETROIT_POINT.y - uy * 9,
  }
})()

// Letters sit outside the outer ring (r = 78) so they never collide with it
const LETTERS = [
  { label: 'N', x: 90, y: 12 },
  { label: 'E', x: 168, y: 90 },
  { label: 'S', x: 90, y: 168 },
  { label: 'W', x: 12, y: 90 },
]

export default function AnimatedCompass({ sceneIndex = 0 }) {
  const [mounted, setMounted] = useState(false)
  const [twitching, setTwitching] = useState(false)
  const initialMount = useRef(true)
  const svgRef = useRef(null)
  const innerNeedleRef = useRef(null)
  const rectRef = useRef(null)
  const pointerRef = useRef(null)
  const rafRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const needleMaskId = `compass-needle-cut-${useId().replace(/:/g, '')}`

  useEffect(() => {
    // Slight delay to ensure smooth start of mount animation
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
      return
    }
    setTwitching(true)
    const timer = setTimeout(() => setTwitching(false), TWITCH_MS)
    return () => clearTimeout(timer)
  }, [sceneIndex])

  // Cached rect goes stale on scroll/resize; re-measure lazily on next move
  useEffect(() => {
    const invalidate = () => {
      rectRef.current = null
    }
    window.addEventListener('scroll', invalidate, { passive: true })
    window.addEventListener('resize', invalidate)
    return () => {
      window.removeEventListener('scroll', invalidate)
      window.removeEventListener('resize', invalidate)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const updateNeedle = () => {
    rafRef.current = null
    const pointer = pointerRef.current
    if (!pointer || !svgRef.current || !innerNeedleRef.current) return

    if (!rectRef.current) {
      rectRef.current = svgRef.current.getBoundingClientRect()
    }
    const rect = rectRef.current
    // Center of the compass rose is at 90,90 in a 360x180 viewBox (25% width, 50% height)
    const cx = rect.left + rect.width * 0.25
    const cy = rect.top + rect.height * 0.5
    const mouseX = pointer.x
    const mouseY = pointer.y

    let angle = Math.atan2(mouseY - cy, mouseX - cx) * (180 / Math.PI)
    let diff = angle - -90

    // Normalize difference
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360

    // Limit rotation to a subtle range and apply dampening
    const maxTwist = 18
    const targetAngle = Math.max(-maxTwist, Math.min(maxTwist, diff * 0.15))
    innerNeedleRef.current.style.transform = `rotate(${targetAngle}deg)`
  }

  // rAF-throttled: at most one needle update per frame
  const handleMouseMove = (e) => {
    if (reducedMotion) return
    pointerRef.current = { x: e.clientX, y: e.clientY }
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateNeedle)
    }
  }

  const handleMouseEnter = () => {
    rectRef.current = null
  }

  const handleMouseLeave = () => {
    pointerRef.current = null
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (!innerNeedleRef.current) return
    innerNeedleRef.current.style.transform = `rotate(0deg)`
  }

  return (
    <div className="animated-compass-wrap flex w-[280px] flex-col items-center gap-3 sm:w-[320px] md:w-[280px] lg:w-[380px]">
      <style>{COMPASS_STYLES}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 360 180"
        className="h-auto w-full cursor-default overflow-visible"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className={mounted ? 'compass-animate' : ''}>
          {/* Michigan, both peninsulas */}
          <g
            fill="var(--compass-accent-fill)"
            stroke="var(--compass-accent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          >
            <path d={MICHIGAN_UPPER_PENINSULA} />
            <path d={MICHIGAN_LOWER_PENINSULA} />
          </g>

          {/* Connector: gear edge → Detroit (never crosses the needle) */}
          <line
            {...CONNECTOR}
            stroke="var(--compass-accent)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />

          {/* Detroit Pulse Dot & Rings */}
          {['', ' pulse-circle-delayed'].map((extra) => (
            <circle
              key={extra}
              className={`pulse-circle${extra}`}
              cx={DETROIT_POINT.x}
              cy={DETROIT_POINT.y}
              r="7"
              fill="none"
              stroke="var(--compass-detroit)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <circle
            cx={DETROIT_POINT.x}
            cy={DETROIT_POINT.y}
            r="5"
            fill="var(--compass-detroit)"
            stroke="var(--compass-hub)"
            strokeWidth="2"
          />

          {/* Logo gear */}
          <path
            className="compass-gear"
            d={GEAR_PATH}
            fill="var(--compass-gear)"
            fillRule="evenodd"
          />

          {/* Cardinal Directions */}
          {LETTERS.map(({ label, x, y }) => (
            <text
              key={label}
              x={x}
              y={y}
              fill="var(--compass-letter)"
              fontSize="16"
              fontWeight="800"
              textAnchor="middle"
              dominantBaseline="central"
              textRendering="geometricPrecision"
            >
              {label}
            </text>
          ))}

          {/* Logo needle: split diamond with a cut through the hub */}
          <defs>
            <mask
              id={needleMaskId}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="180"
              height="180"
            >
              <rect width="180" height="180" fill="white" />
              <rect x="74" y="88.2" width="32" height="3.6" fill="black" />
              <circle cx="90" cy="90" r="5" fill="black" />
            </mask>
          </defs>
          <g className="compass-needle-wrapper">
            <g
              className={`compass-twitch-layer ${
                twitching ? 'compass-twitch' : ''
              }`}
            >
              <g
                ref={innerNeedleRef}
                style={{
                  transformOrigin: '90px 90px',
                  transition: `transform 0.2s ${EASE_OUT}`,
                }}
              >
                <g mask={`url(#${needleMaskId})`}>
                  <polygon
                    points="90,52 103,90 77,90"
                    fill="var(--compass-needle-n)"
                  />
                  <polygon
                    points="90,128 103,90 77,90"
                    fill="var(--compass-needle-s)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      {/* Detroit Coordinates Text */}
      <span
        className={`text-xs font-bold tabular-nums tracking-[0.2em] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none md:text-sm ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
        style={{
          color: 'var(--compass-accent-text)',
          transitionDelay: `${SPIN_MS - 300}ms`,
        }}
      >
        42.3°N 83.0°W
      </span>
    </div>
  )
}

AnimatedCompass.propTypes = {
  sceneIndex: PropTypes.number,
}
