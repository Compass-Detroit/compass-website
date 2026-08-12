import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SiteLayout from '@/layouts/SiteLayout'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import MapPinIcon from '@/components/ui/MapPinIcon'
import CheckIcon from '@/components/ui/CheckIcon'
import DevTeamShowcase from '@/components/dev/DevTeamShowcase'
import TechHeroCanvas from '@/components/dev/TechHeroCanvas'
import AnimatedCompass from '@/components/AnimatedCompass'
import CommunityCalendar from '@/components/events/CommunityCalendar'
import WelcomeBanner from '@/components/WelcomeBanner'
import FirstVisitGuide from '@/components/FirstVisitGuide'
import CommunityVibes from '@/components/CommunityVibes'
import EventSpotlightSection from '@/components/events/EventSpotlightSection'
import styles from './HomePage.module.css'

// Generated event images
import communityGatheringImg from '@assets/images/generated/community-gathering.png'
import prideSummitImg from '@assets/images/generated/pride-summit.png'
import innovationSummitImg from '@assets/images/generated/innovation-summit.png'
import careerMentorshipImg from '@assets/images/generated/career-mentorship.png'

// Scroll reveal hook — applies IntersectionObserver to add 'revealed' class
function useScrollReveal() {
  const observersRef = useRef(new Map())

  const observe = useCallback((node) => {
    if (!node) {
      observersRef.current.forEach((observer) => observer.disconnect())
      observersRef.current.clear()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    // Observe the node and any children with .reveal or .reveal-stagger
    if (
      node.classList.contains('reveal') ||
      node.classList.contains('reveal-stagger')
    ) {
      observer.observe(node)
    }
    node
      .querySelectorAll('.reveal, .reveal-stagger')
      .forEach((el) => observer.observe(el))

    observersRef.current.set(node, observer)
  }, [])

  return observe
}

// Partner & sponsor logos — Row 1
import GoogleLogo from '@/assets/images/sponsors/Google_logo.webp'
import IBMLogo from '@/assets/images/sponsors/spo-ibm-logo.webp'
import DTELogo from '@/assets/images/sponsors/spo-dte-logo.webp'
import LittleCaesarsLogo from '@/assets/images/sponsors/Little_Caesars.webp'
import MongoDBLogo from '@/assets/images/sponsors/MongoDB.webp'
import JetBrainsLogo from '@/assets/images/sponsors/Jet_Brains.webp'
import GrandCircusLogo from '@/assets/images/sponsors/Grand_Circus.webp'
import CCSLogo from '@/assets/images/sponsors/CCS_logo.webp'
import AXIOMLogo from '@/assets/images/sponsors/AXIOM.webp'
import AkkodisLogo from '@/assets/images/sponsors/Akkodis.webp'
// Partner & sponsor logos — Row 2
import NSBELogo from '@/assets/images/organizations/org-nsbe-logo.webp'
import SHPELogo from '@/assets/images/organizations/org-shpe-logo.webp'
import GDGDetroitLogo from '@/assets/images/organizations/org-gdg-detroit.webp'
import WTMLogo from '@/assets/images/organizations/org-wtm-logo.webp'
import WayneStateLogo from '@/assets/images/organizations/Wayne_State_University_seal.webp'
import CompassDetroitLogo from '@/assets/images/sponsors/Compass_Detroit_logo.webp'
import SpinDanceLogo from '@/assets/images/sponsors/SpinDance.webp'
import RIISLogo from '@/assets/images/sponsors/RIIS.webp'
import ComposablesLogo from '@/assets/images/sponsors/Composables.webp'
import RebusLogo from '@/assets/images/sponsors/rebus_blue70_on_blue20-260h.webp'

const stats = [
  {
    value: 4111,
    suffix: '',
    label: 'Community Members',
    sub: '324% growth over 3 years',
  },
  {
    value: 52,
    suffix: '%',
    label: 'Black / African-American',
    sub: 'Underrepresented talent',
  },
  {
    value: 75,
    suffix: '%',
    label: 'Women',
    sub: 'Leading our community',
  },
  {
    value: 51,
    suffix: '%',
    label: 'Actively Job-Seeking',
    sub: 'Pathways, not more training',
  },
]

const row1Logos = [
  { name: 'Google', logo: GoogleLogo },
  { name: 'IBM', logo: IBMLogo },
  { name: 'DTE Energy', logo: DTELogo },
  { name: 'Little Caesars', logo: LittleCaesarsLogo },
  { name: 'MongoDB', logo: MongoDBLogo },
  { name: 'JetBrains', logo: JetBrainsLogo },
  { name: 'Grand Circus', logo: GrandCircusLogo },
  { name: 'CCS', logo: CCSLogo },
  { name: 'AXIOM', logo: AXIOMLogo },
  { name: 'Akkodis', logo: AkkodisLogo },
]

const row2Logos = [
  { name: 'NSBE Detroit', logo: NSBELogo },
  { name: 'SHPE Detroit', logo: SHPELogo },
  { name: 'GDG Detroit', logo: GDGDetroitLogo },
  { name: 'Women Techmakers', logo: WTMLogo },
  { name: 'Wayne State University', logo: WayneStateLogo },
  { name: 'Compass Detroit', logo: CompassDetroitLogo },
  { name: 'SpinDance', logo: SpinDanceLogo },
  { name: 'RIIS', logo: RIISLogo },
  { name: 'Composables', logo: ComposablesLogo },
  { name: 'Rebus', logo: RebusLogo },
]

function MarqueeRow({ logos, direction = 'left' }) {
  // Duplicate the logo array so the strip is seamless
  const doubled = [...logos, ...logos]
  return (
    <div className="marquee-track relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--marquee-fade)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--marquee-fade)] to-transparent" />
      <div
        className={
          direction === 'left'
            ? 'marquee-left flex w-max items-center gap-16 py-6'
            : 'marquee-right flex w-max items-center gap-16 py-6'
        }
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="marquee-logo-wrap flex shrink-0 items-center justify-center rounded-xl bg-white/[0.06] px-6 py-4"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="marquee-logo h-12 w-auto object-contain md:h-14"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

MarqueeRow.propTypes = {
  logos: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.string,
}

const allEvents = [
  {
    name: 'Black History Month Innovation Summit',
    date: 'February 2026',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
  },
  {
    name: "International Women's Day Innovation Summit",
    date: 'March 2026',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
  },
  {
    name: 'Detroit Pride Innovation Summit',
    date: 'June 2026',
    location: 'IBM Detroit',
    type: 'Pride Summit',
    accent: 'pride',
  },
  {
    name: 'Hispanic Heritage Month Innovation Summit',
    date: 'September 2026',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
  },
]

function isUpcoming(dateStr) {
  const parsed = new Date(`1 ${dateStr}`)
  const now = new Date()
  // Compare by month: event is upcoming if its month-end hasn't passed
  parsed.setMonth(parsed.getMonth() + 1, 0) // last day of event month
  return parsed >= now
}

const upcomingEvents = allEvents.filter((ev) => isUpcoming(ev.date))

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// Animated stat counter using intersection observer
function AnimatedStat({ stat }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const target = stat.value
          const duration = 1600
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
  }, [hasAnimated, stat.value])

  const formatted =
    stat.value >= 1000
      ? count.toLocaleString() + stat.suffix
      : count + stat.suffix

  return (
    <div
      ref={ref}
      className="rounded-xl border border-surface bg-surface-card p-6 text-center"
    >
      <div
        className={`mb-2 text-3xl font-extrabold tracking-tight md:text-4xl ${styles.statValue}`}
      >
        {formatted}
      </div>
      <div className="mb-1 text-sm font-semibold text-white">{stat.label}</div>
      <div className={`text-xs ${styles.cardLabel}`}>{stat.sub}</div>
    </div>
  )
}

AnimatedStat.propTypes = {
  stat: PropTypes.shape({
    value: PropTypes.number.isRequired,
    suffix: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
  }).isRequired,
}

// Brain drain visualization bar chart
function TalentGapViz() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bars = [
    { label: 'STEM grads produced', pct: 100, color: 'bg-primary' },
    { label: 'Leave MI in 2 years', pct: 45, color: 'bg-red-500/80' },
    { label: 'Land local tech jobs', pct: 28, color: 'bg-emerald-500/80' },
  ]

  return (
    <div
      ref={ref}
      className="rounded-xl border border-surface bg-surface-card p-6"
    >
      <p
        className={`mb-1 text-xs font-semibold uppercase tracking-wider ${styles.cardLabel}`}
      >
        Michigan Talent Pipeline
      </p>
      <p className="mb-5 text-sm font-semibold text-white">
        The gap isn&apos;t skills — it&apos;s infrastructure
      </p>
      <div className="flex flex-col gap-4">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-gray-400">{bar.label}</span>
              <span className="font-semibold text-gray-300">{bar.pct}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                style={{ width: visible ? `${bar.pct}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Pipeline funnel visualization
function PipelineViz() {
  return (
    <div className="rounded-xl border border-surface bg-surface-card p-6">
      <p
        className={`mb-1 text-xs font-semibold uppercase tracking-wider ${styles.cardLabel}`}
      >
        The COMPASS Model
      </p>
      <p className="mb-5 text-sm font-semibold text-white">
        From community to career
      </p>
      <div className="flex flex-col gap-2">
        {[
          {
            step: 'Engage',
            desc: 'Innovation Summits & events',
            width: 'w-full',
            opacity: 'opacity-100',
          },
          {
            step: 'Build',
            desc: 'Skills, confidence & network',
            width: 'w-[85%]',
            opacity: 'opacity-90',
          },
          {
            step: 'Connect',
            desc: 'Employers meet Navigators',
            width: 'w-[70%]',
            opacity: 'opacity-80',
          },
          {
            step: 'Hire',
            desc: 'Co-ops, roles & careers',
            width: 'w-[55%]',
            opacity: 'opacity-100',
          },
        ].map((item) => (
          <div key={item.step} className={`${item.width} mx-auto`}>
            <div
              className={`${item.opacity} rounded-lg border border-primary/20 bg-primary/[0.08] px-4 py-2.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  {item.step}
                </span>
                <span className={`text-xs ${styles.cardLabel}`}>
                  {item.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Retention radial gauge
function RetentionGauge() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const pct = 78
  const r = 52
  const circ = 2 * Math.PI * r

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-xl border border-surface bg-surface-card p-6"
    >
      <p
        className={`mb-1 text-xs font-semibold uppercase tracking-wider ${styles.cardLabel}`}
      >
        Navigator Retention
      </p>
      <p className="mb-5 text-sm font-semibold text-white">
        Return rate across events
      </p>
      <div className="flex items-center gap-6">
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          className="shrink-0 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="10"
          />
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="#D4A017"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={visible ? circ - (pct / 100) * circ : circ}
            style={{ transition: 'stroke-dashoffset 1.4s ease-out 0.2s' }}
          />
          <text
            x="65"
            y="65"
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="22"
            fontWeight="800"
            transform="rotate(90 65 65)"
          >
            {visible ? `${pct}%` : '0%'}
          </text>
        </svg>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Attended 2+ events', value: '78%' },
            { label: 'Referred a peer', value: '41%' },
            { label: 'Joined coalition org', value: '23%' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <div className="size-1.5 rounded-full bg-primary/60" />
              <span className={styles.cardLabel}>{item.label}</span>
              <span className="ml-auto font-bold text-gray-300">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Animated 3D Tech Scene for hero section
export function HeroVisual() {
  return (
    <div className="relative w-full">
      <TechHeroCanvas />
    </div>
  )
}

// Easter egg — Konami Code
const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

function useKonamiCode(callback) {
  const indexRef = useRef(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI.length) {
          indexRef.current = 0
          callback()
        }
      } else {
        indexRef.current = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}

function triggerConfetti() {
  const colors = [
    '#D4A017',
    '#efb403',
    '#ffcb05',
    '#10b981',
    '#60a5fa',
    '#a78bfa',
    '#f472b6',
  ]
  const container = document.createElement('div')
  container.setAttribute('aria-hidden', 'true')
  document.body.appendChild(container)

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div')
    piece.className = 'confetti-piece'
    piece.style.left = `${Math.random() * 100}vw`
    piece.style.background = colors[Math.floor(Math.random() * colors.length)]
    piece.style.animationDelay = `${Math.random() * 1.5}s`
    piece.style.animationDuration = `${2 + Math.random() * 2}s`
    piece.style.width = `${6 + Math.random() * 8}px`
    piece.style.height = `${6 + Math.random() * 8}px`
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
    container.appendChild(piece)
  }

  // Show message
  const msg = document.createElement('div')
  msg.style.cssText =
    'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;background:var(--surface-card);border:1px solid rgba(212,160,23,0.3);border-radius:1rem;padding:2rem 3rem;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.4);animation:welcome-fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both'
  msg.innerHTML =
    '<div style="margin-bottom:0.75rem;display:flex;justify-content:center"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A017" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity="0.3"/><circle cx="12" cy="12" r="7" opacity="0.15"/><polygon points="12,2.5 14,10 12,8 10,10" fill="#D4A017" stroke="none"/><polygon points="12,21.5 14,14 12,16 10,14" fill="#9ca3af" stroke="none" opacity="0.5"/><polygon points="2.5,12 10,10 8,12 10,14" fill="#9ca3af" stroke="none" opacity="0.5"/><polygon points="21.5,12 14,10 16,12 14,14" fill="#9ca3af" stroke="none" opacity="0.5"/><circle cx="12" cy="12" r="2" fill="#D4A017" stroke="none"/></svg></div><div style="font-size:1.125rem;font-weight:700;margin-bottom:0.5rem">You found it!</div><div style="font-size:0.875rem;color:#9ca3af">This is the kind of curiosity we love.<br/>Welcome to COMPASS.</div>'
  document.body.appendChild(msg)

  setTimeout(() => {
    container.remove()
    msg.remove()
  }, 5000)
}

export default function HomePage() {
  const revealRef = useScrollReveal()
  const [sceneIndex, setSceneIndex] = useState(0)

  useKonamiCode(triggerConfetti)

  return (
    <SiteLayout>
      {/* Hero Section 1 — Centered text + animated compass */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#000804] via-[#02120a] to-[#081a10]">
        {/* Subtle background orb */}
        <div className="hero-orb-1 absolute -right-24 -top-24 size-[600px] rounded-full bg-gradient-to-br from-emerald-500/[0.06] via-primary/[0.02] to-transparent blur-3xl" />

        <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pb-12 pt-20 md:pt-28 lg:pb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12 lg:gap-16">
            {/* Animated Compass */}
            <div className="shrink-0">
              <AnimatedCompass sceneIndex={sceneIndex} />
            </div>

            {/* Hero Text — centered */}
            <div className="max-w-2xl text-center md:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  2026 Programming Live
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[56px]">
                Training programs create talent.{' '}
                <span className="bg-gradient-to-r from-primary via-amber-300 to-primary bg-clip-text text-transparent">
                  COMPASS creates pathways.
                </span>
              </h1>
              <p className="mx-auto mb-10 max-w-[520px] text-lg font-medium leading-relaxed text-gray-200 md:mx-0">
                We&apos;re building something Detroit hasn&apos;t had before:
                career infrastructure that connects talented, underrepresented
                technologists to real opportunities. Whether you&apos;re a
                student, career-changer, or seasoned engineer — you belong here.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Link
                  to="/get-involved"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-extrabold text-black shadow-xl shadow-primary/25 transition-all hover:bg-primary-400 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  Join the Community
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-[15px] font-extrabold text-white transition-all hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:-translate-y-0.5"
                >
                  Partner with Us
                </Link>
              </div>
              {/* Social proof strip */}
              <div className="mt-10 flex items-center justify-center gap-6 border-t border-white/15 pt-8 md:justify-start">
                <div className="flex -space-x-2">
                  {[
                    'bg-primary',
                    'bg-emerald-500',
                    'bg-indigo-500',
                    'bg-rose-400',
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`flex size-8 items-center justify-center rounded-full border-2 border-black text-[10px] font-black text-white ${bg}`}
                    >
                      {['JR', 'MK', 'AS', 'TL'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-base font-extrabold text-white">
                    5,000+ Navigators
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    and growing every month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 2 — Animated Detroit skyline scene */}
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden md:h-[60vh]">
        <TechHeroCanvas onSceneChange={setSceneIndex} />
        {/* Top fade from hero text section */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-[#081a10] to-transparent" />
        {/* Bottom fade to next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-[var(--surface)] to-transparent" />
      </section>

      {/* Welcome Banner for newcomers */}
      <div className="py-8">
        <WelcomeBanner />
      </div>

      {/* Trusted By — infinite double marquee */}
      <section className="border-y border-surface bg-white/[0.01]">
        <div className="py-10">
          <p
            className={`mb-6 text-center text-xs font-semibold uppercase tracking-widest ${styles.caption}`}
          >
            Trusted by leading organizations
          </p>
          <div className="flex flex-col gap-2">
            <MarqueeRow logos={row1Logos} direction="left" />
            <MarqueeRow logos={row2Logos} direction="right" />
          </div>
        </div>
      </section>

      {/* Impact — bento grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Our Impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            The numbers tell the story
          </h2>
        </div>
        <div className="bento-grid">
          {/* Large featured stat */}
          <div className="bento-span-2 bento-tall flex flex-col justify-between rounded-2xl border border-surface bg-gradient-to-br from-primary/[0.06] via-surface-card to-surface-card p-8">
            <div>
              <p
                className={`mb-1 text-xs font-semibold uppercase tracking-wider ${styles.cardLabel}`}
              >
                Community Growth
              </p>
              <p className={`text-sm ${styles.cardLabel}`}>
                324% growth over 3 years
              </p>
            </div>
            <div>
              <AnimatedStat stat={stats[0]} />
              <p className={`mt-3 text-sm ${styles.cardLabel}`}>
                Navigators across Michigan and growing every month
              </p>
            </div>
          </div>
          {/* Diversity stat with benchmark */}
          <div className="rounded-xl border border-surface bg-surface-card p-6">
            <AnimatedStat stat={stats[1]} />
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                vs. 8% industry avg
              </span>
            </div>
          </div>
          {/* Women leadership stat */}
          <div className="rounded-xl border border-surface bg-surface-card p-6">
            <AnimatedStat stat={stats[2]} />
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                Leading our mission
              </span>
            </div>
          </div>
          {/* Job-seeking stat */}
          <div className="bento-span-2 flex items-center gap-8 rounded-xl border border-surface bg-surface-card p-6">
            <AnimatedStat stat={stats[3]} />
            <p
              className={`hidden text-sm leading-relaxed md:block ${styles.bodyText}`}
            >
              Our Navigators aren&apos;t looking for more training —
              they&apos;re looking for pathways to careers. COMPASS builds the
              bridge.
            </p>
          </div>
        </div>
      </section>

      {/* Mission — with visualizations */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          {/* Community image banner */}
          <div className="img-zoom mb-12 overflow-hidden rounded-2xl border border-surface">
            <img
              src={communityGatheringImg}
              alt="Diverse tech professionals networking at a COMPASS Detroit community event"
              className="aspect-[3/1] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                Our Mission
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight">
                Building the pathways that don&apos;t exist yet.
              </h2>
              <p className={`mb-6 leading-relaxed ${styles.bodyText}`}>
                Detroit is producing tech talent — but losing it. Despite
                historic investments in training programs, 45% of Michigan STEM
                graduates leave the state within two years.
              </p>

              {/* Inline viz: the talent gap */}
              <TalentGapViz />

              <p className={`mt-6 leading-relaxed ${styles.bodyText}`}>
                The gap isn&apos;t skills. It&apos;s infrastructure. COMPASS is
                a 501(c)(3) nonprofit closing this gap through a collective of
                organizations: NSBE, SHPE, SWE, MCWT, Out in Tech, and more.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-400"
              >
                Learn more about our mission <ArrowRightIcon />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {/* Pipeline visualization */}
              <PipelineViz />

              {/* Retention gauge */}
              <RetentionGauge />

              {/* What we do checklist */}
              <div>
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  What We Do
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      label: 'Recruit and prepare talent',
                      tip: 'We meet people where they are — bootcamp grads, self-taught devs, career changers — and help them get career-ready.',
                    },
                    {
                      label: 'Build confidence and belonging',
                      tip: 'Imposter syndrome is real. We tackle it head-on with community, mentorship, and proof that you belong.',
                    },
                    {
                      label: 'Connect Navigators to opportunities',
                      tip: "Our employers don't just post jobs — they come to our events looking for people exactly like you.",
                    },
                    {
                      label: 'Provide wraparound support',
                      tip: "Resume reviews, mock interviews, portfolio feedback, and the pep talks you didn't know you needed.",
                    },
                    {
                      label: 'Partner with employers for career exposure',
                      tip: 'We bring companies to the table who are genuinely committed to diverse hiring — not just checking a box.',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="checklist-tooltip flex cursor-default items-center gap-3 rounded-lg border border-primary/15 bg-primary/[0.06] px-4 py-2.5"
                    >
                      <CheckIcon />
                      <span className="text-sm text-gray-300">
                        {item.label}
                      </span>
                      <div className="tooltip-content">{item.tip}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                2026 Programming
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Upcoming Events
              </h2>
            </div>
            <Link
              to="/events"
              className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-400 sm:inline-flex"
            >
              View all events <ArrowRightIcon />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.name}
                className="group flex flex-col gap-3 rounded-xl border border-surface bg-surface-card p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] text-primary">
                    <CalendarIcon />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">{ev.name}</div>
                    <div className="mt-1 flex gap-4">
                      <span className={`text-[13px] ${styles.cardLabel}`}>
                        {ev.date}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-[13px] ${styles.cardLabel}`}
                      >
                        <MapPinIcon /> {ev.location}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="w-fit whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View all events <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Event Spotlight — Michigan DevFest 2026 & HHM */}
      <EventSpotlightSection />

      {/* Your First Visit Guide */}
      <FirstVisitGuide />

      {/* Community Vibes — quotes and social proof */}
      <CommunityVibes />

      {/* Pride Innovation Summit Spotlight */}
      <section className="border-y border-surface" ref={revealRef}>
        <div className="reveal mx-auto max-w-[1200px] px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary">
                  June 2026 · IBM Detroit
                </span>
              </div>
              <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                Detroit Pride{' '}
                <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                  Innovation Summit
                </span>
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-400">
                Break the Pattern in Michigan&apos;s Tech Ecosystem —
                celebrating LGBTQ+ leaders, technologists, and allies building a
                more inclusive future in tech.
              </p>
              <p className={`mb-8 leading-relaxed ${styles.bodyText}`}>
                Partnered with Out in Tech Detroit and GDG Detroit, the Pride
                Innovation Summit brings together the brightest minds for talks,
                workshops, and networking focused on AI, emerging technology,
                inclusive leadership, and career development.
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                {[
                  'LGBTQ+ Leaders',
                  'Tech Workshops',
                  'Career Development',
                  'Inclusive Leadership',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://detroitpridesummit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-[15px] font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
              >
                Visit detroitpridesummit.com
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </a>
            </div>
            <div className="img-zoom overflow-hidden rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
              <img
                src={prideSummitImg}
                alt="Detroit Pride Innovation Summit — diverse professionals at an inclusive tech conference with subtle rainbow lighting"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Traction — compact proof points */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Proof of Impact
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Navigators hired through COMPASS events
            </h2>
          </div>
          <div className="reveal-stagger mb-10 grid gap-4 md:grid-cols-2">
            <div className="img-zoom overflow-hidden rounded-xl border border-surface">
              <img
                src={innovationSummitImg}
                alt="Keynote speaker on stage at a COMPASS Detroit Innovation Summit"
                className="aspect-[2/1] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="img-zoom overflow-hidden rounded-xl border border-surface">
              <img
                src={careerMentorshipImg}
                alt="Career mentorship session between professionals at a COMPASS event"
                className="aspect-[2/1] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                company: 'DTE Energy',
                role: 'Co-Op (2+ semesters)',
                type: 'Corporate Partner',
              },
              {
                company: 'Little Caesars',
                role: 'Software Engineer',
                type: 'Corporate Partner',
              },
              {
                company: 'IBM',
                role: 'Product Manager',
                type: 'Technology Partner',
              },
            ].map((t) => (
              <div
                key={t.company}
                className="rounded-xl border border-surface bg-surface-card p-6"
              >
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${styles.cardLabel}`}
                >
                  {t.type}
                </span>
                <p className="mt-2 text-xl font-bold text-primary">
                  {t.company}
                </p>
                <p className="mt-1 text-sm text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
          <p className={`mt-8 text-center text-sm ${styles.bodyText}`}>
            Three Navigators. Three offers. Partners came to our events looking
            for talent — and found it.
          </p>
        </div>
      </section>

      {/* Dev Team & Open Source */}
      <section ref={revealRef}>
        <DevTeamShowcase />
      </section>

      {/* Community Calendar */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Community Calendar
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              What&apos;s happening this month
            </h2>
            <p className={`max-w-lg text-sm ${styles.sectionSubtitle}`}>
              Browse upcoming workshops, meetups, and community events.
              Something for every Navigator, every week.
            </p>
          </div>
          <CommunityCalendar />
        </div>
      </section>

      {/* Fund This Work */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Support COMPASS
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              What your investment enables
            </h2>
            <p className={`mx-auto max-w-lg text-sm ${styles.sectionSubtitle}`}>
              Every dollar funds career infrastructure — not overhead.
              Here&apos;s what partnership makes possible.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                amount: 'TBD',
                title: 'Community Workshop',
                desc: 'Fund a full-day professional development workshop for 50+ Navigators',
                icon: (
                  <svg
                    className="size-7 text-amber-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ),
              },
              {
                amount: 'TBD',
                title: 'Innovation Summit',
                desc: 'Sponsor one complete Innovation Summit — 200+ attendees, speakers, and career connections',
                icon: (
                  <svg
                    className="size-7 text-sky-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.62-2 1.62-2L4.5 16.5z" />
                    <path d="M12 15l-3-3 7.5-7.5a2.121 2.121 0 0 1 3 3L12 15z" />
                  </svg>
                ),
              },
              {
                amount: 'TBD',
                title: 'Annual Programming',
                desc: 'Fund a full year of community events, workshops, and career pathway programs',
                icon: (
                  <svg
                    className="size-7 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                ),
              },
              {
                amount: 'TBD',
                title: 'Ecosystem Builder',
                desc: 'Transform the regional tech talent pipeline — fund scholarships, certifications, and employer partnerships',
                icon: (
                  <svg
                    className="size-7 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L9.19 8.63 2 12l7.19 3.37L12 22l2.81-6.63L22 12l-7.19-3.37z" />
                  </svg>
                ),
              },
            ].map((tier) => (
              <div key={tier.title} className="tier-card flex flex-col">
                <div className="mb-3">{tier.icon}</div>
                <span className="mb-1 text-2xl font-extrabold text-primary">
                  {tier.amount}
                </span>
                <span className="mb-2 text-sm font-bold">{tier.title}</span>
                <p
                  className={`mt-auto text-xs leading-relaxed ${styles.cardLabel}`}
                >
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="mailto:jritten@compass-detroit.com?subject=Sponsorship Inquiry"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">
                Request a Sponsorship Prospectus
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-6 py-24 text-center">
          {/* Animated background layers */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-violet-500/[0.04]" />
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute -right-20 -top-20 size-60 animate-[hero-orb-1_12s_ease-in-out_infinite] rounded-full bg-primary/[0.04] blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-60 animate-[hero-orb-2_14s_ease-in-out_infinite] rounded-full bg-violet-500/[0.04] blur-3xl" />
          </div>
          <div className="relative">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              Let&apos;s build Detroit&apos;s pathways{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-amber-300 bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p
              className={`mx-auto mb-10 max-w-[540px] text-lg leading-relaxed ${styles.sectionSubtitle}`}
            >
              Whether you&apos;re a tech professional, a student, an employer,
              or a community organization — there&apos;s a place for you at
              COMPASS.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-involved"
                className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="relative z-10">Become a Navigator</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <Link
                to="/get-involved"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Partner with COMPASS
              </Link>
              <Link
                to="/get-involved"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Sponsor an Event
              </Link>
              <Link
                to="/impact"
                className="rounded-lg border border-primary/30 bg-primary/[0.06] px-8 py-4 text-base font-semibold text-primary transition-colors hover:bg-primary/[0.1]"
              >
                View Impact Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
