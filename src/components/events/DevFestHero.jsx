import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import DevFestShare from '@/components/events/DevFestShare'
import { FaShirt } from 'react-icons/fa6'
import { DEVFEST_2026, devfestCalendarUrl } from '@/data/2026/devfest'
import styles from './DevFestHero.module.css'

const KICKOFF = new Date(DEVFEST_2026.startsAt).getTime()
const SHIRT_DEADLINE = new Date(DEVFEST_2026.shirtDeadline).getTime()

const DIRECTIONS_URL = `https://www.google.com/maps/search/?${new URLSearchParams(
  { api: '1', query: `${DEVFEST_2026.venue}, ${DEVFEST_2026.address}` }
)}`

const TICKER = [
  'AI Hackathon · Nov 13',
  'Conference · Nov 14',
  'Tickets on sale',
  'Hollywood Casino · Greektown',
  '12th annual Michigan DevFest',
  'Powered by Google + Compass Detroit',
]

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  return {
    done: diff === 0,
    parts: [
      { label: 'Days', value: Math.floor(diff / 86_400_000) },
      { label: 'Hrs', value: Math.floor(diff / 3_600_000) % 24 },
      { label: 'Min', value: Math.floor(diff / 60_000) % 60 },
      { label: 'Sec', value: Math.floor(diff / 1000) % 60 },
    ],
  }
}

function Countdown() {
  const { done, parts } = useCountdown(KICKOFF)
  if (done) return null

  return (
    <div className={styles.countdown}>
      <p className={styles.countdownLabel}>Kickoff in</p>
      {/* Visual clock; screen readers get one stable sentence instead of a ticking region */}
      <div className={styles.countdownClock} aria-hidden="true">
        {parts.map(({ label, value }) => (
          <div key={label} className={styles.countdownCell}>
            <span className={styles.countdownValue}>
              {String(value).padStart(2, '0')}
            </span>
            <span className={styles.countdownUnit}>{label}</span>
          </div>
        ))}
      </div>
      <span className="sr-only">
        {parts[0].value} days until Michigan DevFest kicks off
      </span>
    </div>
  )
}

function FlyerDialog({ flyer, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (flyer && !dialog.open) dialog.showModal()
    if (!flyer && dialog.open) dialog.close()
  }, [flyer])

  // Native Esc handling is skipped by some embedded browsers; close explicitly
  useEffect(() => {
    if (!flyer) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    // Backdrop clicks close it as a mouse/touch convenience; keyboard users
    // already have Esc and the Close button. The flyer and actions don't close it.
    const onClick = (e) => {
      if (!e.target.closest('img, a, button')) onClose()
    }
    const dialog = ref.current
    document.addEventListener('keydown', onKey)
    dialog.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      dialog.removeEventListener('click', onClick)
    }
  }, [flyer, onClose])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={flyer?.title}
      onClose={onClose}
    >
      {flyer && (
        <figure className={styles.dialogFigure}>
          <img
            src={flyer.full}
            alt={flyer.alt}
            width={flyer.width}
            height={flyer.height}
            className={styles.dialogImage}
          />
          <figcaption className={styles.dialogActions}>
            <a href={flyer.full} download className={styles.dialogLink}>
              Download flyer
            </a>
            <button
              type="button"
              onClick={onClose}
              className={styles.dialogClose}
            >
              Close
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}

FlyerDialog.propTypes = {
  flyer: PropTypes.shape({
    title: PropTypes.string,
    alt: PropTypes.string,
    full: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
}

// Follows the pointer with a few degrees of tilt; CSS drops it for reduced motion
function tiltFlyer(e) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty(
    '--tilt-x',
    `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`
  )
  el.style.setProperty(
    '--tilt-y',
    `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`
  )
}

function resetFlyer(e) {
  e.currentTarget.style.removeProperty('--tilt-x')
  e.currentTarget.style.removeProperty('--tilt-y')
}

export default function DevFestHero() {
  const [openFlyer, setOpenFlyer] = useState(null)
  const { days, stats, flyer } = DEVFEST_2026

  return (
    <section
      className={`dark-surface ${styles.hero}`}
      aria-labelledby="devfest-hero-title"
    >
      <div className={styles.halftone} aria-hidden="true" />
      <img
        src={DEVFEST_2026.logoWhite}
        alt=""
        aria-hidden="true"
        className={styles.ring}
      />

      <div className="relative z-[2] mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-16 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-20">
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.liveDot} aria-hidden="true" />
            Tickets on sale now
          </p>

          <p className={styles.kicker}>
            Tech Conference <span className={styles.plus}>+</span> AI Hackathon
          </p>
          <h1 id="devfest-hero-title" className={styles.title}>
            Michigan{' '}
            <span className={styles.titleGradient}>
              DevFest <span className={styles.titleYear}>’26</span>
            </span>
          </h1>

          <p className={styles.meta}>
            <time dateTime="2026-11-13/2026-11-14">
              {DEVFEST_2026.dateLabel}
            </time>
            <span aria-hidden="true" className={styles.metaDivider} />
            {DEVFEST_2026.venue}, Detroit
          </p>

          <p className={styles.lede}>
            Michigan&apos;s flagship developer festival returns for year 12.
            Build with AI on Friday, level up on Saturday, and meet 300+
            developers, designers and tech leaders in Greektown, downtown
            Detroit.
          </p>

          <div className={styles.ctas}>
            <a
              href={DEVFEST_2026.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${styles.ctaPrimary}`}
            >
              Get tickets
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </a>
            <a
              href={devfestCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Add to calendar
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              Get directions
            </a>
          </div>

          {Date.now() <= SHIRT_DEADLINE && (
            <p className={styles.perk}>
              <FaShirt className={styles.perkIcon} aria-hidden="true" />
              Register by <strong>{DEVFEST_2026.shirtDeadlineLabel}</strong> to
              get a free DevFest T-shirt
            </p>
          )}

          <ol className={styles.days}>
            {days.map((d, i) => (
              <li key={d.title} className={styles.day}>
                <span className={styles.dayIndex}>0{i + 1}</span>
                <div>
                  <p className={styles.dayDate}>{d.date}</p>
                  <p className={styles.dayTitle}>{d.title}</p>
                  <p className={styles.dayDesc}>{d.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.footerRow}>
            <Countdown />
            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className={styles.statLabel}>{s.label}</dt>
                  <dd className={styles.statValue}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.flyerStage}>
          <div
            className={styles.flyerFrame}
            onPointerMove={tiltFlyer}
            onPointerLeave={resetFlyer}
          >
            <div className={styles.flyerGlow} aria-hidden="true" />
            <button
              type="button"
              className={styles.flyerButton}
              onClick={() => setOpenFlyer(flyer)}
              aria-label={`View ${flyer.title}`}
            >
              <img
                src={flyer.src}
                srcSet={flyer.srcSet}
                sizes="(min-width: 1024px) 400px, 80vw"
                alt=""
                width={flyer.width}
                height={flyer.height}
                className={styles.flyerImage}
              />
            </button>
            <a
              href={DEVFEST_2026.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.stamp}
            >
              <svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className={styles.stampRing}
              >
                <defs>
                  <path
                    id="df-stamp-path"
                    d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
                  />
                </defs>
                <text>
                  <textPath href="#df-stamp-path">
                    Get tickets ✦ Nov 13–14 ✦ Greektown ✦
                  </textPath>
                </text>
              </svg>
              <span className={styles.stampCore}>
                <ArrowRightIcon size={22} />
              </span>
              <span className="sr-only">Get Michigan DevFest tickets</span>
            </a>
          </div>
          <p className={styles.flyerHint}>Tap the flyer to view full size</p>
          <DevFestShare className="mt-3" />
          <p className={styles.presented}>
            Presented by <strong>Compass Detroit</strong> ×{' '}
            <strong>GDG Detroit</strong>
          </p>
        </div>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={`marquee-left ${styles.tickerTrack}`}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className={styles.tickerItem}>
              {t}
              <span className={styles.tickerStar}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <FlyerDialog flyer={openFlyer} onClose={() => setOpenFlyer(null)} />
    </section>
  )
}
