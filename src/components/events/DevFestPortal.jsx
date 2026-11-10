import { useEffect, useRef, useState } from 'react'
import { FiMapPin, FiClock, FiTruck } from 'react-icons/fi'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import GreektownBackdrop from '@/components/events/GreektownBackdrop'
import { Link } from 'react-router-dom'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import {
  DEVFEST_DAY_BY_ID,
  DEVFEST_PROGRAM_STATS,
  DEVFEST_TALKS,
  DEVFEST_TRACKS,
  formatTime,
} from '@/data/2026/devfestProgram'
import { sanityImage } from '@/services/sanity'
import { TONE_HEX, eventPhase } from '@/components/devfest/programUtils'
import { partnersData } from '@/data/2026/partners'
import CompassDetroitLogo from '@/assets/images/sponsors/Compass_Detroit_logo.webp'
import WomenTechmakersLogo from '@/assets/images/organizations/org-wtm-logo.webp'
import PropTypes from 'prop-types'
import styles from './DevFestPortal.module.css'

const SKYLINE = '/assets/devfest26/detroit-sunset.svg'
// The doorway starts filling with light this many days out
const RUN_UP_DAYS = 45
const FINAL_WEEK = 7
// Stacked slices give the glyphs real depth under CSS 3D
const DEPTH = Array.from({ length: 14 }, (_, i) => i + 1)

const MAPS_URL = `https://www.google.com/maps/search/?${new URLSearchParams({
  api: '1',
  query: `${DEVFEST_2026.venue}, ${DEVFEST_2026.address}`,
})}`

// Three sessions that show the range of the weekend
const MUST_SEE = [
  'Build with AI Workshop',
  'Design to Production with Google Stitch',
  'When AI Agents Should Stop',
]
  .map((t) => DEVFEST_TALKS.find((s) => s.title.startsWith(t)))
  .filter(Boolean)

const LINEUP = DEVFEST_TRACKS.map((t) => ({
  ...t,
  count: DEVFEST_TALKS.filter((s) => s.track === t.name).length,
}))

const GDG_DETROIT = partnersData.organizations.find(
  (o) => o.name === 'GDG Detroit'
)

// The organizers behind the event, called out ahead of the wider community
const HOSTS = [
  {
    name: 'GDG Detroit',
    role: 'Host',
    logo: GDG_DETROIT.logo,
    url: GDG_DETROIT.url,
  },
  {
    name: 'Compass Detroit',
    role: 'Producing partner',
    logo: CompassDetroitLogo,
    url: 'https://compass-detroit.com/',
  },
  {
    name: 'Women Techmakers',
    role: 'Program partner',
    logo: WomenTechmakersLogo,
    url: 'https://www.womentechmakers.com/',
  },
]

const COMMUNITIES = partnersData.organizations.filter((o) => o !== GDG_DETROIT)

const SPONSOR_TIERS = partnersData.tierOrder.map((tier) => ({
  tier,
  partners: partnersData[tier],
}))

// Whole days until kickoff; -1 once the event is over. In dev, `?days=N`
// previews any point in the run-up.
function useDaysLeft() {
  const preview = import.meta.env.DEV
    ? Number.parseInt(new URLSearchParams(window.location.search).get('days'))
    : Number.NaN
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!Number.isNaN(preview)) return Math.max(-1, preview)
  return eventPhase(now).days
}

// 0 = dark doorway at the start of the run-up, 1 = fully lit on event day
const lightFor = (days) => Math.min(1, Math.max(0.08, 1 - days / RUN_UP_DAYS))

const COUNT_LABELS = {
  '-1': 'Thanks for coming',
  0: 'Doors are open',
  1: 'Doors open tomorrow',
}
const countLabel = (days) => COUNT_LABELS[days] ?? null

const REST = { rx: 5, ry: -9 }

/**
 * Camera for the doorway scene. One rAF loop eases toward the pointer (lerp,
 * frame-rate independent), blended with a slow idle sway computed in JS, so
 * there's never a hand-off snap. Per frame it writes two transforms: the
 * world's rotation and a small counter-shift on the dust for parallax. The
 * stage rect is cached outside the loop; the loop sleeps off screen.
 * Touch steers too: drag across the scene.
 */
function usePortalCamera() {
  const reduced = usePrefersReducedMotion()
  const stageRef = useRef(null)
  const worldRef = useRef(null)
  const dustRef = useRef(null)
  const input = useRef({ x: 0, y: 0, active: 0, rect: null })

  useEffect(() => {
    const stage = stageRef.current
    const world = worldRef.current
    if (!stage || !world) return undefined
    const dust = dustRef.current

    const pose = (rx, ry, px = 0, py = 0) => {
      world.style.transform = `rotateX(${rx.toFixed(
        3
      )}deg) rotateY(${ry.toFixed(3)}deg)`
      if (dust)
        dust.style.transform = `translate3d(${(px * -24).toFixed(2)}px, ${(
          py * -14
        ).toFixed(2)}px, 0)`
    }

    if (reduced) {
      pose(REST.rx, REST.ry)
      return undefined
    }

    const cur = { x: 0, y: 0, blend: 0 }
    const t0 = performance.now()
    let last = t0
    let frame = 0
    let onScreen = true

    const tick = (t) => {
      const dt = Math.min(64, t - last)
      last = t
      const k = 1 - (1 - 0.085) ** (dt / 16.67)
      const target = input.current
      cur.x += (target.x - cur.x) * k
      cur.y += (target.y - cur.y) * k
      cur.blend += (target.active - cur.blend) * (k * 0.6)
      const s = (t - t0) / 1000
      // Idle drift: a slow figure-eight, damped while the pointer steers
      const idle = 1 - cur.blend * 0.8
      const ry = REST.ry + Math.sin(s * 0.22) * 11 * idle + cur.x * 26
      const rx = REST.rx + Math.sin(s * 0.16) * 1.8 * idle - cur.y * 9
      pose(rx, ry, cur.x, cur.y)
      frame = requestAnimationFrame(tick)
    }

    const run = () => {
      cancelAnimationFrame(frame)
      last = performance.now()
      if (onScreen && !document.hidden) frame = requestAnimationFrame(tick)
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting
            run()
          })
        : null
    io?.observe(stage)
    document.addEventListener('visibilitychange', run)
    // The cached rect goes stale when the page moves; the next move re-reads it
    const forgetRect = () => {
      input.current.rect = null
    }
    window.addEventListener('scroll', forgetRect, { passive: true })
    window.addEventListener('resize', forgetRect)
    run()

    return () => {
      cancelAnimationFrame(frame)
      io?.disconnect()
      document.removeEventListener('visibilitychange', run)
      window.removeEventListener('scroll', forgetRect)
      window.removeEventListener('resize', forgetRect)
    }
  }, [reduced])

  const steer = (e) => {
    const state = input.current
    // Mouse steers on hover; touch and pen steer while pressed
    if (e.pointerType !== 'mouse' && !e.buttons) return
    if (!state.rect) state.rect = stageRef.current.getBoundingClientRect()
    state.active = 1
    state.x = Math.max(
      -0.5,
      Math.min(0.5, (e.clientX - state.rect.left) / state.rect.width - 0.5)
    )
    state.y = Math.max(
      -0.5,
      Math.min(0.5, (e.clientY - state.rect.top) / state.rect.height - 0.5)
    )
  }

  const release = () => {
    Object.assign(input.current, { x: 0, y: 0, active: 0, rect: null })
  }

  const handlers = reduced
    ? {}
    : {
        onPointerMove: steer,
        onPointerDown: steer,
        onPointerLeave: release,
        onPointerUp: (e) => e.pointerType !== 'mouse' && release(),
        onPointerCancel: release,
      }

  return { stageRef, worldRef, dustRef, handlers }
}

// Pre-shaded extrusion slices, as on the flyer: the arch's sides glow warm
// orange, the "2" is dark navy behind a blue rim. Colour steps, no filters.
const archShade = (d) => ({
  '--d': d,
  background: `linear-gradient(180deg, hsl(28 90% ${
    60 - d * 2.6
  }%), hsl(16 62% ${26 - d * 1.1}%))`,
})
const twoShade = (d) => ({
  '--d': d,
  color: `hsl(226 58% ${30 - d * 1.4}%)`,
})

function PortalScene({ days }) {
  const { stageRef, worldRef, dustRef, handlers } = usePortalCamera()
  const lit = lightFor(days)
  const label = countLabel(days)

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      {...handlers}
      style={{ '--lit': lit }}
      aria-hidden="true"
    >
      <div className={styles.halftone} />

      <div ref={worldRef} className={styles.world}>
        {/* The venue: Greektown skyline with the Hollywood Casino tower */}
        <GreektownBackdrop
          lit={lit}
          signOn={days <= FINAL_WEEK}
          className={styles.backdrop}
        />
        <p className={styles.venue}>
          <strong>{DEVFEST_2026.venue}</strong>
          <br />
          {DEVFEST_2026.entrance}
        </p>

        <div className={styles.floor}>
          <div className={styles.beam} />
          <div className={styles.sheen} />
        </div>

        {/* Glossy-floor reflections: flipped copies under each glyph */}
        <div className={styles.archReflection}>
          <span style={{ backgroundImage: `url(${SKYLINE})` }} />
        </div>
        <div className={styles.twoReflection}>
          <span style={{ backgroundImage: `url(${SKYLINE})` }}>2</span>
        </div>

        <div className={styles.arch}>
          {DEPTH.map((d) => (
            <span key={d} className={styles.archSlice} style={archShade(d)} />
          ))}
          <span
            className={styles.archFace}
            style={{ backgroundImage: `url(${SKYLINE})` }}
          />
          {/* Darkness above the light line; recedes as kickoff nears */}
          <span className={styles.archShade} />
          <span className={styles.archGlow} />
        </div>

        <div className={styles.two}>
          {DEPTH.map((d) => (
            <span key={d} className={styles.twoSlice} style={twoShade(d)}>
              2
            </span>
          ))}
          <span
            className={styles.twoFace}
            style={{ backgroundImage: `url(${SKYLINE})` }}
          >
            2
          </span>
        </div>

        <p className={styles.count}>
          {label ?? (
            <>
              <span className={styles.countNumber}>{days}</span>
              <span className={styles.countUnit}>days to go</span>
            </>
          )}
        </p>

        <p className={`${styles.label} ${styles.labelLeft}`}>
          Tech
          <br />+<br />
          Design
          <br />+<br />
          Experience
        </p>
        <p className={`${styles.label} ${styles.labelRight}`}>
          <span className={styles.labelAccent}>Powered by</span>
          <br />
          Google &amp;
          <br />
          Compass Detroit
        </p>
        <p className={styles.caption}>
          The 12th Annual Michigan
          <br />
          DevFest Conference
        </p>
      </div>

      <div className={styles.dustWrap}>
        <div ref={dustRef} className={styles.dust} />
      </div>
    </div>
  )
}

PortalScene.propTypes = {
  days: PropTypes.number.isRequired,
}

export default function DevFestPortal() {
  const days = useDaysLeft()

  return (
    <section
      className={`dark-surface ${styles.portal}`}
      aria-labelledby="devfest-portal-title"
    >
      <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Still on the fence?</p>
            <h2 id="devfest-portal-title" className={styles.title}>
              Step through the door to Michigan&apos;s biggest{' '}
              <span className={styles.titleGlow}>dev weekend</span>
            </h2>
            <p className={styles.lede}>
              Ship something with AI on Friday. Learn from{' '}
              {DEVFEST_PROGRAM_STATS.conferenceSpeakers} speakers on Saturday.
              Leave with the people you&apos;ll build with next. Here&apos;s
              what you&apos;d miss:
            </p>
            <ul className="mt-6 space-y-3">
              {MUST_SEE.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`${DEVFEST_2026.programPath}?session=${s.id}`}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                    style={{ boxShadow: `inset 3px 0 0 ${TONE_HEX[s.tone]}` }}
                  >
                    <span className="flex shrink-0 -space-x-3 pl-1">
                      {s.speakers.slice(0, 3).map((p) => (
                        <img
                          key={p.slug}
                          src={sanityImage(p.avatar, { w: 96, h: 96 })}
                          alt=""
                          width="40"
                          height="40"
                          loading="lazy"
                          className="size-10 rounded-full border-2 border-black object-cover"
                        />
                      ))}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-white group-hover:underline">
                        {s.title}
                      </span>
                      <span className="block truncate text-xs text-white/65">
                        {DEVFEST_DAY_BY_ID[s.day].short} {formatTime(s.time)} ·{' '}
                        {s.speakers.map((p) => p.name).join(', ')}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={DEVFEST_2026.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${styles.cta}`}
              >
                Get tickets
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </a>
              <span className={styles.ctaNote}>
                {countLabel(days) ?? `${days} days to go`}
              </span>
            </div>
          </div>

          <PortalScene days={days} />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr]">
          <article className={styles.card} aria-labelledby="devfest-venue">
            <p className={styles.cardKicker}>The venue</p>
            <h3 id="devfest-venue" className={styles.cardTitle}>
              {DEVFEST_2026.venue}
            </h3>
            <ul className={styles.facts}>
              <li>
                <FiMapPin aria-hidden="true" />
                <span>{DEVFEST_2026.address}</span>
              </li>
              <li>
                <FiClock aria-hidden="true" />
                <span>
                  {DEVFEST_2026.checkIn}. Have your registration QR code ready.
                </span>
              </li>
              {DEVFEST_2026.parking.map((p) => (
                <li key={p.name}>
                  <FiTruck aria-hidden="true" />
                  <span>
                    <strong>{p.name}.</strong> {p.detail}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Open in Google Maps
              <ArrowRightIcon size={14} />
            </a>
          </article>

          <article className={styles.card} aria-labelledby="devfest-lineup">
            <p className={styles.cardKicker}>The lineup is live</p>
            <h3 id="devfest-lineup" className={styles.cardTitle}>
              {DEVFEST_PROGRAM_STATS.speakers} speakers, the AI Hackathon and{' '}
              {DEVFEST_PROGRAM_STATS.tracks} conference tracks
            </h3>
            <ul className={styles.lineupList}>
              {LINEUP.map(({ name, tone, count }) => (
                <li key={name} className={styles.lineupItem}>
                  <span
                    aria-hidden="true"
                    className={styles.lineupDot}
                    style={{ background: TONE_HEX[tone] }}
                  />
                  <span>{name}</span>
                  <span className={styles.lineupBadge}>{count} sessions</span>
                </li>
              ))}
            </ul>
            <Link to={DEVFEST_2026.programPath} className={styles.cardLink}>
              Explore speakers and sessions
              <ArrowRightIcon size={14} />
            </Link>
          </article>
        </div>

        <section className={styles.sponsors} aria-labelledby="devfest-sponsors">
          <h3 id="devfest-sponsors" className={styles.sponsorsTitle}>
            Made possible by our 2026 partners
          </h3>
          {SPONSOR_TIERS.map(({ tier, partners }) => (
            <div key={tier} className={styles.tier}>
              <p className={styles.tierName}>{tier}</p>
              <ul className={styles.logoRow} data-tier={tier}>
                {partners.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.logoChip}
                      title={p.name}
                    >
                      <img
                        src={p.logo}
                        alt={p.name}
                        loading="lazy"
                        className={styles.logo}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={styles.sponsorsMore}>
            Plus {partnersData.fuel.map((p) => p.name).join(', ')} keeping
            everyone caffeinated.{' '}
            <a href="mailto:sponsors@midevfest.com">Become a partner</a>
          </p>
        </section>

        <section
          className={styles.community}
          aria-labelledby="devfest-community"
        >
          <p className={styles.eyebrow}>Community-built</p>
          <h3 id="devfest-community" className={styles.communityTitle}>
            Put together by Michigan&apos;s tech communities
          </h3>
          <p className={styles.communityLede}>
            DevFest is run by volunteers. Meetups, student chapters and
            professional societies from Detroit to Ann Arbor, Toledo and Windsor
            bring their members, speakers and energy to make it happen. Thank
            you.
          </p>

          <ul className={styles.hosts}>
            {HOSTS.map((h) => (
              <li key={h.name}>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hostCard}
                >
                  <span className={styles.hostLogo}>
                    <img src={h.logo} alt="" loading="lazy" />
                  </span>
                  <span>
                    <span className={styles.hostRole}>{h.role}</span>
                    <span className={styles.hostName}>{h.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className={styles.communityGrid}>
            {COMMUNITIES.map((c) => (
              <li key={c.id}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communityCard}
                  title={c.desc}
                >
                  <span
                    className={styles.communityLogo}
                    data-dark={c.darkLogo || undefined}
                  >
                    <img src={c.logo} alt="" loading="lazy" />
                  </span>
                  <span className={styles.communityName}>{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
