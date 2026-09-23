import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import { DEVFEST_2026, devfestCalendarUrl } from '@/data/2026/devfest'
import styles from './DevFestHero.module.css'

const KICKOFF = new Date(DEVFEST_2026.startsAt).getTime()

const TICKER = [
  'AI Hackathon · Nov 13',
  'Conference · Nov 14',
  'Call for Speakers open',
  'Little Caesars HQ · Detroit',
  '12th annual Michigan DevFest',
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
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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

export default function DevFestHero() {
  const [openFlyer, setOpenFlyer] = useState(null)
  const { days, stats, flyers } = DEVFEST_2026

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
            Registration + Call for Speakers open
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
            developers, designers and tech leaders in the heart of Detroit.
          </p>

          <div className={styles.ctas}>
            <a
              href={DEVFEST_2026.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${styles.ctaPrimary}`}
            >
              Register now
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </a>
            <a
              href={DEVFEST_2026.cfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Submit a talk
            </a>
            <a
              href={devfestCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              Add to calendar
            </a>
          </div>

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
          <ul className={styles.flyers} aria-label="Event flyers">
            {flyers.map((f, i) => (
              <li key={f.id} className={styles.flyerItem} data-index={i}>
                <button
                  type="button"
                  className={styles.flyerButton}
                  onClick={() => setOpenFlyer(f)}
                  aria-label={`View ${f.title}`}
                >
                  <img
                    src={f.src}
                    srcSet={f.srcSet}
                    sizes="(min-width: 1024px) 320px, 45vw"
                    alt=""
                    width={f.width}
                    height={f.height}
                    className={styles.flyerImage}
                  />
                </button>
              </li>
            ))}
          </ul>
          <p className={styles.flyerHint}>
            Tap a flyer to view full size · share it with your crew
          </p>
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
