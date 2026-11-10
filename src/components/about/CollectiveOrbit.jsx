import { useEffect, useId, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

// The collective as a scene: member orgs orbit the COMPASS needle on a
// tilted ring (faked 3D: depth drives scale, opacity and stacking), joined to
// the hub by pulsing links. The needle eases toward the pointer.
const SIZE = 360
const C = SIZE / 2
const RX = 150
const RY = 62
const TILT = -14 // degrees the whole orbit leans
const NODE_R = 24
const ORBIT_SECONDS = 48

const rad = (deg) => (deg * Math.PI) / 180
const COS_T = Math.cos(rad(TILT))
const SIN_T = Math.sin(rad(TILT))

/** Point on the tilted ellipse, plus depth in [0 back, 1 front]. */
const orbitPoint = (angle) => {
  const x = Math.cos(angle) * RX
  const y = Math.sin(angle) * RY
  return {
    x: C + x * COS_T - y * SIN_T,
    y: C + x * SIN_T + y * COS_T,
    depth: (Math.sin(angle) + 1) / 2,
  }
}

const shortestTurn = (from, to) => ((((to - from) % 360) + 540) % 360) - 180

export default function CollectiveOrbit({ orgs }) {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef(null)
  const nodeRefs = useRef([])
  const linkRefs = useRef([])
  const needleRef = useRef(null)
  const activeRef = useRef(null)
  const [active, setActive] = useState(null)

  activeRef.current = active

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined

    const place = (phase) => {
      const placed = orgs.map((_, i) => {
        const p = orbitPoint(phase + (i / orgs.length) * Math.PI * 2)
        const node = nodeRefs.current[i]
        const link = linkRefs.current[i]
        const scale = 0.72 + p.depth * 0.42
        node?.setAttribute(
          'transform',
          `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) scale(${scale.toFixed(
            3
          )})`
        )
        node?.style.setProperty('opacity', (0.45 + p.depth * 0.55).toFixed(3))
        if (link) {
          link.setAttribute('x2', p.x.toFixed(2))
          link.setAttribute('y2', p.y.toFixed(2))
          link.style.setProperty('opacity', (0.25 + p.depth * 0.6).toFixed(3))
        }
        return { node, depth: p.depth }
      })
      // Paint back-to-front so nearer orgs overlap farther ones. Safe with
      // React: the org list is fixed, so it never re-inserts these nodes.
      const layer = placed[0]?.node?.parentNode
      if (layer)
        placed
          .sort((a, b) => a.depth - b.depth)
          .forEach(({ node }) => node && layer.appendChild(node))
    }

    if (reduced) {
      place(-Math.PI / 2)
      needleRef.current?.setAttribute('transform', `rotate(0 ${C} ${C})`)
      return undefined
    }

    let raf = 0
    let last = performance.now()
    let phase = -Math.PI / 2
    let needle = 0
    let target = 0
    let restSpin = 0
    let pointerAt = 0
    let speed = 1
    let pointerX = null
    let pointerY = null
    let hitCheckAt = 0

    const onPointer = (e) => {
      pointerX = e.clientX
      pointerY = e.clientY
      const box = svg.getBoundingClientRect()
      const dx = e.clientX - (box.left + box.width / 2)
      const dy = e.clientY - (box.top + box.height / 2)
      target = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      pointerAt = performance.now()
    }

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // Hovering an org slows the orbit so it can be read; it never stops
      const want = activeRef.current === null ? 1 : 0.2
      speed += (want - speed) * Math.min(1, dt * 4)
      phase += (speed * dt * Math.PI * 2) / ORBIT_SECONDS
      place(phase)

      // Orgs drift under a still cursor, so re-check what it is over
      if (pointerX !== null && now - hitCheckAt > 120) {
        hitCheckAt = now
        const hit = document
          .elementFromPoint(pointerX, pointerY)
          ?.closest?.('[data-org-index]')
        const index =
          hit && svg.contains(hit) ? Number(hit.dataset.orgIndex) : null
        if (
          index !== activeRef.current &&
          !svg.contains(document.activeElement)
        )
          setActive(index)
      }

      // With no pointer for a while the needle drifts gently, like a compass at rest
      if (now - pointerAt > 2500) {
        restSpin += dt
        target = Math.sin(restSpin * 0.6) * 18
      }
      needle += shortestTurn(needle, target) * Math.min(1, dt * 6)
      needleRef.current?.setAttribute(
        'transform',
        `rotate(${needle.toFixed(2)} ${C} ${C})`
      )
      raf = requestAnimationFrame(tick)
    }

    // Only animate while on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(svg)
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [orgs, reduced])

  return (
    <figure className="relative mx-auto w-full max-w-[420px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label="COMPASS member organizations"
      >
        <defs>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0%" stopColor="#ffa706" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#ffa706" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffa706" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${uid}-clip`}>
            <circle r={NODE_R - 3} />
          </clipPath>
        </defs>

        <circle cx={C} cy={C} r={C - 10} fill={`url(#${uid}-glow)`} />

        {/* Orbit guides */}
        <g
          transform={`rotate(${TILT} ${C} ${C})`}
          fill="none"
          className="stroke-primary"
        >
          <ellipse cx={C} cy={C} rx={RX} ry={RY} strokeOpacity="0.28" />
          <ellipse
            cx={C}
            cy={C}
            rx={RX + 22}
            ry={RY + 10}
            strokeOpacity="0.12"
            strokeDasharray="2 6"
          />
          <ellipse
            cx={C}
            cy={C}
            rx={RX - 46}
            ry={RY - 20}
            strokeOpacity="0.14"
          />
        </g>

        {/* Links from the hub to every org; dashes travel outward */}
        <g className="stroke-primary" strokeWidth="1.25">
          {orgs.map((org, i) => (
            <line
              key={org.name}
              ref={(el) => (linkRefs.current[i] = el)}
              x1={C}
              y1={C}
              x2={C}
              y2={C}
              strokeDasharray="3 9"
              className={reduced ? undefined : 'orbit-pulse'}
              strokeOpacity={active === i ? 1 : 0.55}
              strokeWidth={active === i ? 2 : undefined}
            />
          ))}
        </g>

        {/* Hub: gear ring and needle from the COMPASS mark */}
        <g aria-hidden="true">
          <circle
            cx={C}
            cy={C}
            r="38"
            className="fill-[var(--surface)]"
            stroke="#00c605"
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          <circle
            cx={C}
            cy={C}
            r="31"
            fill="none"
            stroke="#00c605"
            strokeOpacity="0.35"
            strokeDasharray="2 4"
          />
          <g ref={needleRef}>
            <path
              d={`M${C} ${C - 27} L${C + 7} ${C} L${C - 7} ${C} Z`}
              fill="#ee7d33"
            />
            <path
              d={`M${C} ${C + 27} L${C + 7} ${C} L${C - 7} ${C} Z`}
              fill="#ffa706"
              fillOpacity="0.55"
            />
          </g>
          <circle cx={C} cy={C} r="4" fill="#ffa706" />
        </g>

        {/* Orgs */}
        <g>
          {orgs.map((org, i) => (
            <g
              key={org.name}
              ref={(el) => (nodeRefs.current[i] = el)}
              transform={`translate(${C} ${C})`}
              data-org-index={i}
              tabIndex={0}
              role="img"
              aria-label={org.name}
              className="cursor-pointer outline-none"
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <circle
                r={NODE_R}
                className="fill-[var(--surface-card)]"
                stroke={active === i ? '#ffa706' : 'currentColor'}
                strokeOpacity={active === i ? 1 : 0.18}
                strokeWidth={active === i ? 2.5 : 1.5}
              />
              {org.logo ? (
                <image
                  href={org.logo}
                  x={-(NODE_R - 3)}
                  y={-(NODE_R - 3)}
                  width={(NODE_R - 3) * 2}
                  height={(NODE_R - 3) * 2}
                  clipPath={`url(#${uid}-clip)`}
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <>
                  <circle r={NODE_R - 3} fill={org.color} fillOpacity="0.9" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={org.initials.length > 3 ? 9 : 11}
                    fontWeight="800"
                    fill="#fff"
                  >
                    {org.initials}
                  </text>
                </>
              )}
            </g>
          ))}
        </g>
      </svg>

      <figcaption
        className="mt-2 h-5 text-center text-sm font-semibold text-theme-secondary"
        aria-live="polite"
      >
        {active === null ? (
          <span className="text-theme-muted">
            {orgs.length} societies, one collective
          </span>
        ) : (
          orgs[active].name
        )}
      </figcaption>
    </figure>
  )
}

CollectiveOrbit.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
      initials: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
}
