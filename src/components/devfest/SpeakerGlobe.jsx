import { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FaPause, FaPlay } from 'react-icons/fa6'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { sanityImage } from '@/services/sanity'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { DEVFEST_DAY_BY_ID } from '@/data/2026/devfestProgram'
import { TONE_HEX } from './programUtils'
import styles from './SpeakerGlobe.module.css'
import {
  clampX,
  facing,
  fibonacciSphere,
  nearest,
  rotate,
  tourOrder,
} from './globeMath'

const DRAG = 0.006 // radians per pixel dragged
const DWELL = 3200 // ms each speaker holds the front
const RESUME = 1600 // ms after a drag, hover or focus before the tour resumes

/**
 * Every speaker's face on a globe that tours the whole lineup: each face
 * eases to the front in turn, its name and talk in the caption. Faces are
 * real buttons: drag to spin (the tour resumes after), hover or Tab to read
 * who's who, click to open their session. Reduced motion starts paused.
 * The tour picks up from whoever was last hovered, focused or clicked, and
 * holds still while `paused` (a session dialog is open over it).
 */
export default function SpeakerGlobe({ speakers, onSelect, paused = false }) {
  const reduced = usePrefersReducedMotion()
  const points = useMemo(() => fibonacciSphere(speakers.length), [speakers])
  const order = useMemo(() => tourOrder(points), [points])
  const stageRef = useRef(null)
  const faceRefs = useRef([])
  const motion = useRef({ rx: -0.35, ry: 0, vx: 0, vy: 0, target: null })
  const tour = useRef({ k: 0, nextAt: 0, holdUntil: 0 })
  const pointer = useRef(null)
  const hovering = useRef(false)
  const [size, setSize] = useState(480)
  const [active, setActive] = useState(null)
  const [featured, setFeatured] = useState(order[0])
  const [playing, setPlaying] = useState(!reduced)
  const playingRef = useRef(playing)
  playingRef.current = playing
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  // Restarts the render loop after it has gone idle (see below)
  const wakeRef = useRef(() => {})
  const wake = () => wakeRef.current()

  // Reduced motion pauses the tour; the visitor can still start it
  useEffect(() => setPlaying(!reduced), [reduced])
  useEffect(() => wake(), [playing, paused])

  // Track the stage size so radius and face size scale with it
  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const radius = size * 0.38
  const face = Math.round(Math.min(68, Math.max(40, size * 0.12)))

  const hold = () => {
    tour.current.holdUntil = performance.now() + RESUME
  }

  // Continue the tour from this speaker instead of where it left off: they
  // get a full dwell at the front, then the tour moves on to their neighbour
  const anchor = (i) => {
    tour.current.k = order.indexOf(i)
    tour.current.nextAt = 0
    setFeatured(i)
  }

  // Render loop: writes transforms directly, no React re-render per frame.
  // It stops once the globe is still (paused, hovered, reduced motion, or a
  // drag has coasted to rest) and wakes on input or when the tour resumes,
  // so an idle globe costs nothing.
  useEffect(() => {
    let frame = 0
    let running = false
    let resumeTimer = 0
    let visible = true
    let last = performance.now()

    const paint = () => {
      const m = motion.current
      points.forEach((p, i) => {
        const el = faceRefs.current[i]
        if (!el) return
        const q = rotate(p, m.rx, m.ry)
        const depth = (q.z + 1) / 2
        el.style.transform = `translate3d(${q.x * radius}px, ${
          q.y * radius
        }px, 0) scale(${0.5 + depth * 0.65})`
        el.style.opacity = String(0.18 + depth * 0.82)
        el.style.zIndex = String(Math.round(depth * 100))
        el.dataset.back = depth < 0.42 ? 'true' : 'false'
      })
    }

    const tick = (t) => {
      // Frame-rate independent easing: same feel at 60 Hz and 120 Hz
      const dt = Math.min(64, t - last)
      last = t
      const ease = (k) => 1 - (1 - k) ** (dt / 16.67)
      const m = motion.current
      const tr = tour.current
      const touring =
        playingRef.current &&
        !pausedRef.current &&
        !pointer.current &&
        !hovering.current &&
        !m.target &&
        t >= tr.holdUntil

      const before = m.rx + m.ry
      if (m.target) {
        // Ease toward a keyboard-focused face
        m.rx += (m.target.rx - m.rx) * ease(0.12)
        m.ry += (m.target.ry - m.ry) * ease(0.12)
      } else if (touring) {
        if (t >= tr.nextAt) {
          if (tr.nextAt) tr.k = (tr.k + 1) % order.length
          tr.nextAt = t + DWELL
          setFeatured(order[tr.k])
        }
        const goal = facing(points[order[tr.k]])
        m.ry += (nearest(m.ry, goal.ry) - m.ry) * ease(0.055)
        m.rx += (clampX(goal.rx) - m.rx) * ease(0.055)
        m.vx = 0
        m.vy = 0
      } else if (!pointer.current) {
        // Coast after a drag, then settle
        m.vy *= 0.95 ** (dt / 16.67)
        m.vx *= 0.92 ** (dt / 16.67)
        m.ry += m.vy
        m.rx = clampX(m.rx + m.vx)
      }
      paint()

      const still =
        !touring &&
        !pointer.current &&
        Math.abs(m.vx) < 1e-5 &&
        Math.abs(m.vy) < 1e-5 &&
        Math.abs(m.rx + m.ry - before) < 1e-6
      if (still) {
        running = false
        // Paused only for a moment after a drag or hover: come back for it
        const waitingToResume =
          playingRef.current &&
          !pausedRef.current &&
          !hovering.current &&
          !m.target
        if (waitingToResume && tr.holdUntil > t)
          resumeTimer = setTimeout(start, tr.holdUntil - t + 16)
        return
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(tick)
      else running = false
    }

    const start = () => {
      cancelAnimationFrame(frame)
      clearTimeout(resumeTimer)
      last = performance.now()
      running = visible && !document.hidden
      if (running) frame = requestAnimationFrame(tick)
    }
    wakeRef.current = () => {
      if (!running) start()
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            start()
          })
        : null
    if (io && stageRef.current) io.observe(stageRef.current)
    document.addEventListener('visibilitychange', start)
    paint()
    start()

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resumeTimer)
      wakeRef.current = () => {}
      io?.disconnect()
      document.removeEventListener('visibilitychange', start)
    }
  }, [points, order, radius])

  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY, moved: 0 }
    motion.current.target = null
    wake()
  }

  const onPointerMove = (e) => {
    const p = pointer.current
    if (!p) return
    const dx = e.clientX - p.x
    const dy = e.clientY - p.y
    p.moved += Math.abs(dx) + Math.abs(dy)
    p.x = e.clientX
    p.y = e.clientY
    const m = motion.current
    m.vy = dx * DRAG
    m.vx = -dy * DRAG
    wake()
    m.ry += m.vy
    m.rx = clampX(m.rx + m.vx)
    if (p.moved > 6 && !stageRef.current.hasPointerCapture?.(e.pointerId))
      stageRef.current.setPointerCapture?.(e.pointerId)
  }

  const onPointerUp = (e) => {
    const dragged = (pointer.current?.moved ?? 0) > 6
    pointer.current = null
    stageRef.current.releasePointerCapture?.(e.pointerId)
    wake()
    if (dragged) {
      // Resume the tour at the next speaker once the coast settles
      hold()
      tour.current.nextAt = tour.current.holdUntil
      // Swallow the click that follows a drag
      const block = (ev) => ev.stopPropagation()
      stageRef.current.addEventListener('click', block, {
        capture: true,
        once: true,
      })
      setTimeout(
        () => stageRef.current?.removeEventListener('click', block, true),
        0
      )
    }
  }

  const focusFace = (i) => {
    const m = motion.current
    const { rx, ry } = facing(points[i])
    m.target = { rx: clampX(rx), ry: nearest(m.ry, ry) }
    setActive(i)
    anchor(i)
    wake()
  }

  const blurFace = () => {
    motion.current.target = null
    setActive(null)
    hold()
    wake()
  }

  const shown = speakers[active ?? featured]
  const talks = shown?.sessions ?? []

  return (
    <div className={styles.wrap}>
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') hovering.current = true
        }}
        onPointerLeave={() => {
          hovering.current = false
          setActive(null)
          hold()
          wake()
        }}
        style={{ '--face': `${face}px` }}
      >
        <svg
          className={styles.rings}
          viewBox="-100 -100 200 200"
          aria-hidden="true"
        >
          <circle r="84" className={styles.orbit} />
          <circle r="96" className={styles.orbitOuter} />
        </svg>
        <div className={styles.core} aria-hidden="true">
          <img src={DEVFEST_2026.logoWhite} alt="" className={styles.logo} />
        </div>

        <ul className={styles.faces} aria-label="Speakers on the globe">
          {speakers.map((p, i) => (
            <li
              key={p.slug}
              ref={(el) => {
                faceRefs.current[i] = el
              }}
              className={styles.faceItem}
              style={{
                '--ring': TONE_HEX[p.sessions[0]?.tone],
                '--ring-paint': ringPaint(p.sessions),
              }}
            >
              <button
                type="button"
                className={styles.face}
                data-active={(active ?? featured) === i || undefined}
                onClick={() => {
                  anchor(i)
                  onSelect(p)
                }}
                onFocus={() => focusFace(i)}
                onBlur={blurFace}
                onMouseEnter={() => {
                  setActive(i)
                  anchor(i)
                }}
                aria-label={`${p.name}: ${p.sessions
                  .map((s) => s.title)
                  .join('; ')}`}
              >
                {p.avatar ? (
                  <img
                    src={sanityImage(p.avatar, { w: 144, h: 144 })}
                    alt=""
                    draggable="false"
                    loading="lazy"
                  />
                ) : (
                  <span>{p.name[0]}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.caption}>
        {shown && (
          <div aria-hidden="true">
            <p className={styles.captionName}>
              <span
                className={styles.captionDot}
                style={{ background: TONE_HEX[talks[0]?.tone] }}
              />
              {shown.name}
              <span className={styles.captionOrg}>
                {shown.organization && ` · ${shown.organization}`}
              </span>
            </p>
            {talks.map((s) => (
              <p key={s.id} className={styles.captionTalk}>
                {talks.length > 1 && (
                  <span className={styles.captionDay}>
                    {DEVFEST_DAY_BY_ID[s.day].short}
                  </span>
                )}
                {s.title}
              </p>
            ))}
          </div>
        )}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.tourButton}
            onClick={() => {
              setPlaying((on) => !on)
              tour.current.holdUntil = 0
            }}
          >
            {playing ? (
              <FaPause aria-hidden="true" />
            ) : (
              <FaPlay aria-hidden="true" />
            )}
            {playing ? 'Pause tour' : 'Play tour'}
          </button>
          <span className={styles.progress} aria-hidden="true">
            {order.indexOf(active ?? featured) + 1} / {speakers.length}
          </span>
          <span className={styles.hint} aria-hidden="true">
            Drag to spin · tap a face
          </span>
        </div>
      </div>
    </div>
  )
}

SpeakerGlobe.propTypes = {
  speakers: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      organization: PropTypes.string,
      sessions: PropTypes.array.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  paused: PropTypes.bool,
}

/** Ring paint: one segment per track colour the speaker presents in. */
function ringPaint(sessions) {
  const colors = [...new Set(sessions.map((s) => TONE_HEX[s.tone]))]
  if (colors.length < 2) return `linear-gradient(${colors[0]}, ${colors[0]})`
  const step = 100 / colors.length
  return `conic-gradient(${colors
    .map((c, i) => `${c} ${i * step}% ${(i + 1) * step}%`)
    .join(', ')})`
}
