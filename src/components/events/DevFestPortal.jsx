import { useEffect, useRef, useState } from 'react'
import {
  FiMapPin,
  FiClock,
  FiTruck,
  FiMic,
  FiCalendar,
  FiLayers,
} from 'react-icons/fi'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import GreektownBackdrop from '@/components/events/GreektownBackdrop'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { partnersData } from '@/data/2026/partners'
import CompassDetroitLogo from '@/assets/images/sponsors/Compass_Detroit_logo.webp'
import WomenTechmakersLogo from '@/assets/images/organizations/org-wtm-logo.webp'
import PropTypes from 'prop-types'
import styles from './DevFestPortal.module.css'

const SKYLINE = '/assets/devfest26/detroit-sunset.svg'
const KICKOFF = new Date(DEVFEST_2026.startsAt).getTime()
const WRAP_UP = new Date(`${DEVFEST_2026.endDate}T23:59:59-05:00`).getTime()
const DAY_MS = 86_400_000
// The doorway starts filling with light this many days out
const RUN_UP_DAYS = 45
const FINAL_WEEK = 7
const SHIRT_DEADLINE = new Date(DEVFEST_2026.shirtDeadline).getTime()
// Stacked slices give the glyphs real depth under CSS 3D
const DEPTH = Array.from({ length: 14 }, (_, i) => i + 1)

const MAPS_URL = `https://www.google.com/maps/search/?${new URLSearchParams({
  api: '1',
  query: `${DEVFEST_2026.venue}, ${DEVFEST_2026.address}`,
})}`

const COMING_SOON_ICONS = [FiMic, FiCalendar, FiLayers]

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
  if (now > WRAP_UP) return -1
  return Math.max(0, Math.ceil((KICKOFF - now) / DAY_MS))
}

// 0 = dark doorway at the start of the run-up, 1 = fully lit on event day
const lightFor = (days) => Math.min(1, Math.max(0.08, 1 - days / RUN_UP_DAYS))

const COUNT_LABELS = {
  '-1': 'Thanks for coming',
  0: 'Doors are open',
  1: 'Doors open tomorrow',
}
const countLabel = (days) => COUNT_LABELS[days] ?? null

// Pointer steers the camera; touch and idle states fall back to a slow sway
function useTilt() {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.dataset.active = 'true'
    el.style.setProperty('--ry', `${x * 22}deg`)
    el.style.setProperty('--rx', `${8 - y * 10}deg`)
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
  }

  const onPointerLeave = () => {
    const el = ref.current
    delete el.dataset.active
    el.style.removeProperty('--ry')
    el.style.removeProperty('--rx')
    el.style.removeProperty('--mx')
  }

  return { ref, onPointerMove, onPointerLeave }
}

function PortalScene({ days }) {
  const tilt = useTilt()
  const lit = lightFor(days)
  const label = countLabel(days)

  return (
    <div
      className={styles.stage}
      {...tilt}
      style={{ '--lit': lit }}
      aria-hidden="true"
    >
      <div className={styles.world}>
        {/* Greektown skyline with the venue tower, set back behind the "12" */}
        <GreektownBackdrop
          lit={lit}
          signOn={days <= FINAL_WEEK}
          className={styles.backdrop}
        />
        <div className={styles.floor}>
          <div className={styles.spillWarm} />
          <div className={styles.spillCool} />
        </div>

        <div className={styles.arch}>
          {DEPTH.map((d) => (
            <span key={d} className={styles.archSlice} style={{ '--d': d }} />
          ))}
          <span
            className={styles.archFace}
            style={{ backgroundImage: `url(${SKYLINE})` }}
          />
          {/* Darkness above the light line; recedes as kickoff nears */}
          <span className={styles.archShade} />
        </div>

        <div className={styles.two}>
          {DEPTH.map((d) => (
            <span key={d} className={styles.twoSlice} style={{ '--d': d }}>
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
        <p className={styles.count}>
          {label ?? (
            <>
              <span className={styles.countNumber}>{days}</span>
              <span className={styles.countUnit}>days to go</span>
            </>
          )}
        </p>
        <p className={styles.caption}>
          The 12th Annual Michigan
          <br />
          DevFest Conference
        </p>
      </div>
      <div className={styles.dust} />
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
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Still on the fence?</p>
            <h2 id="devfest-portal-title" className={styles.title}>
              Step through the door to Michigan&apos;s biggest{' '}
              <span className={styles.titleGlow}>dev weekend</span>
            </h2>
            <p className={styles.lede}>
              Ship something with AI on Friday. Learn from Michigan&apos;s
              builders on Saturday. Leave with the people you&apos;ll build with
              next. Twelve years in, this is the room where Detroit tech meets.
            </p>
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
                {Date.now() <= SHIRT_DEADLINE &&
                  ` · Free T-shirt if you register by ${DEVFEST_2026.shirtDeadlineLabel}`}
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

          <article className={styles.card} aria-labelledby="devfest-soon">
            <p className={styles.cardKicker}>More to announce</p>
            <h3 id="devfest-soon" className={styles.cardTitle}>
              The lineup drops soon
            </h3>
            <ul className={styles.soonList}>
              {DEVFEST_2026.comingSoon.map((item, i) => {
                const Icon = COMING_SOON_ICONS[i % COMING_SOON_ICONS.length]
                return (
                  <li key={item} className={styles.soonItem}>
                    <Icon aria-hidden="true" />
                    <span>{item}</span>
                    <span className={styles.soonBadge}>Announcing soon</span>
                  </li>
                )
              })}
            </ul>
            <a
              href={DEVFEST_2026.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Follow updates on midevfest.com
              <ArrowRightIcon size={14} />
            </a>
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
