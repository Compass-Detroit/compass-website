import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

// Crisp, snappy motion: strong ease-out, tiny overshoot only where it reads
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const SPIN_MS = 1400
const TWITCH_MS = 420

// Theme-aware palette. Dark values are the default; every light theme
// (Daylight, Campus) also carries the `light` class on <html>.
// Contrast, worst case against the rendered hero background:
//  - dark themes: letters 7.5:1+, coords 6:1+, ring / needle shades 3.3:1+
//  - light themes: letters 5.8:1+, coords 6:1+, ring 3.1:1+,
//    Michigan outline 4.3:1+, needle outline #713f12 7.4:1+
const COMPASS_STYLES = `
  .animated-compass-wrap {
    --compass-letter: #efb403;
    --compass-needle-n: #efb403;
    --compass-needle-n-shade: #b88703;
    --compass-needle-s: #a1a1aa;
    --compass-needle-s-shade: #7c7c86;
    --compass-needle-edge: transparent;
    --compass-ring: #9a760b;
    --compass-ring-soft: rgba(239, 180, 3, 0.28);
    --compass-hub: var(--surface, #0a0a0a);
    --compass-accent: #00c605;
    --compass-accent-fill: rgba(0, 198, 5, 0.1);
    --compass-accent-text: #00c605;
  }
  .light .animated-compass-wrap {
    --compass-letter: #854d0e;
    --compass-needle-n: #ca8a04;
    --compass-needle-n-shade: #a16207;
    --compass-needle-s: #94a3b8;
    --compass-needle-s-shade: #64748b;
    --compass-needle-edge: #713f12;
    --compass-ring: #b7791f;
    --compass-ring-soft: rgba(133, 77, 14, 0.22);
    --compass-hub: #ffffff;
    --compass-accent: #15803d;
    --compass-accent-fill: rgba(21, 128, 61, 0.1);
    --compass-accent-text: #166534;
  }

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

// Ordinal ticks sit between the two rings (r 52 → 62)
const ORDINALS = [45, 135, 225, 315]
// Cardinal ticks are short and heavy, just inside the outer ring
const CARDINALS = [0, 90, 180, 270]

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
          {/* Michigan Lower Peninsula Outline */}
          <path
            d="M 240 170 L 305 170 L 315 155 L 318 140 L 325 125 L 328 105 L 320 85 L 305 105 L 315 80 L 310 50 L 295 25 L 280 20 L 265 30 L 255 50 L 245 40 L 240 60 L 235 85 L 235 120 L 230 150 Z"
            fill="var(--compass-accent-fill)"
            stroke="var(--compass-accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Connector: outer ring edge → Detroit (never crosses the needle) */}
          <line
            x1="152"
            y1="105"
            x2="308"
            y2="143"
            stroke="var(--compass-accent)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />

          {/* Detroit Pulse Dot & Rings */}
          <circle
            className="pulse-circle"
            cx="315"
            cy="145"
            r="7"
            fill="none"
            stroke="var(--compass-accent)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            className="pulse-circle pulse-circle-delayed"
            cx="315"
            cy="145"
            r="7"
            fill="none"
            stroke="var(--compass-accent)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="315"
            cy="145"
            r="5"
            fill="var(--compass-accent)"
            stroke="var(--compass-hub)"
            strokeWidth="2"
          />

          {/* Compass Rose Rings */}
          <circle
            cx="90"
            cy="90"
            r="62"
            stroke="var(--compass-ring)"
            strokeWidth="2.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="90"
            cy="90"
            r="52"
            stroke="var(--compass-ring-soft)"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* Cardinal + Ordinal Tick Marks */}
          {CARDINALS.map((angle) => (
            <line
              key={`c${angle}`}
              x1="90"
              y1="28"
              x2="90"
              y2="38"
              stroke="var(--compass-letter)"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 90 90)`}
            />
          ))}
          {ORDINALS.map((angle) => (
            <line
              key={`o${angle}`}
              x1="90"
              y1="31"
              x2="90"
              y2="37"
              stroke="var(--compass-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle} 90 90)`}
            />
          ))}

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

          {/* Needle Group */}
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
                stroke="var(--compass-needle-edge)"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                {/* South half — split shading gives a hard, readable edge */}
                <polygon
                  points="90,90 83,90 90,142"
                  fill="var(--compass-needle-s)"
                />
                <polygon
                  points="90,90 97,90 90,142"
                  fill="var(--compass-needle-s-shade)"
                />
                {/* North half */}
                <polygon
                  points="90,90 83,90 90,34"
                  fill="var(--compass-needle-n)"
                />
                <polygon
                  points="90,90 97,90 90,34"
                  fill="var(--compass-needle-n-shade)"
                />
                {/* Center pivot */}
                <circle
                  cx="90"
                  cy="90"
                  r="6"
                  fill="var(--compass-hub)"
                  stroke="var(--compass-needle-n)"
                  strokeWidth="2.5"
                />
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
