import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SiteLayout from '@/layouts/SiteLayout'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import MapPinIcon from '@/components/ui/MapPinIcon'
import CheckIcon from '@/components/ui/CheckIcon'
import DevTeamShowcase from '@/components/dev/DevTeamShowcase'
import CommunityCalendar from '@/components/events/CommunityCalendar'

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
      <div className="mb-2 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
        {formatted}
      </div>
      <div className="mb-1 text-sm font-semibold text-white">{stat.label}</div>
      <div className="text-xs text-gray-600">{stat.sub}</div>
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
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
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
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
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
                <span className="text-xs text-gray-500">{item.desc}</span>
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
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
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
              <span className="text-gray-500">{item.label}</span>
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

// Animated compass constellation for hero section
function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="hero-spin-slow absolute size-[420px] rounded-full border border-primary/10" />
      <div className="hero-spin-reverse absolute size-[340px] rounded-full border border-dashed border-primary/15" />
      <div className="absolute size-[260px] rounded-full border border-primary/20" />

      {/* Floating nodes */}
      {[
        { x: '10%', y: '15%', size: 'size-3', delay: '0s', label: 'Engage' },
        { x: '85%', y: '20%', size: 'size-2.5', delay: '0.5s', label: 'Build' },
        { x: '75%', y: '80%', size: 'size-3', delay: '1s', label: 'Connect' },
        { x: '15%', y: '75%', size: 'size-2', delay: '1.5s', label: 'Hire' },
      ].map((node) => (
        <div
          key={node.label}
          className="hero-float absolute flex flex-col items-center gap-1.5"
          style={{
            left: node.x,
            top: node.y,
            animationDelay: node.delay,
          }}
        >
          <div
            className={`${node.size} rounded-full bg-primary shadow-lg shadow-primary/30`}
          />
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
            {node.label}
          </span>
        </div>
      ))}

      {/* Center compass element */}
      <div className="relative flex size-[160px] items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary/[0.08] to-transparent backdrop-blur-sm">
        <div className="flex size-[100px] items-center justify-center rounded-full border border-primary/20 bg-[var(--surface-card)]">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#D4A017"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle cx="24" cy="24" r="4" fill="#D4A017" opacity="0.8" />
            <path
              d="M24 2 L27 14 L24 10 L21 14 Z"
              fill="#D4A017"
              opacity="0.9"
            />
            <path
              d="M24 46 L27 34 L24 38 L21 34 Z"
              fill="#D4A017"
              opacity="0.4"
            />
            <path
              d="M46 24 L34 21 L38 24 L34 27 Z"
              fill="#D4A017"
              opacity="0.4"
            />
            <path
              d="M2 24 L14 21 L10 24 L14 27 Z"
              fill="#D4A017"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Connecting lines */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="42"
          y1="63"
          x2="170"
          y2="170"
          stroke="#D4A017"
          strokeWidth="0.5"
          opacity="0.2"
        />
        <line
          x1="357"
          y1="84"
          x2="250"
          y2="170"
          stroke="#D4A017"
          strokeWidth="0.5"
          opacity="0.2"
        />
        <line
          x1="315"
          y1="336"
          x2="250"
          y2="250"
          stroke="#D4A017"
          strokeWidth="0.5"
          opacity="0.2"
        />
        <line
          x1="63"
          y1="315"
          x2="170"
          y2="250"
          stroke="#D4A017"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>

      {/* Floating stat cards */}
      <div
        className="hero-float absolute -right-4 top-[15%] rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2 shadow-lg"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="text-lg font-extrabold text-primary">52%</div>
        <div className="text-[9px] text-gray-500">Black / African-American</div>
      </div>
      <div
        className="hero-float absolute -left-4 bottom-[20%] rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-3 py-2 shadow-lg"
        style={{ animationDelay: '0.8s' }}
      >
        <div className="text-lg font-extrabold text-primary">75%</div>
        <div className="text-[9px] text-gray-500">Women Leaders</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const revealRef = useScrollReveal()

  return (
    <SiteLayout>
      {/* Hero — immersive with animated abstract visual */}
      <section className="relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="hero-orb-1 absolute -right-24 -top-24 size-[600px] rounded-full bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-32 -left-32 size-[500px] rounded-full bg-gradient-to-tr from-indigo-500/[0.06] via-primary/[0.02] to-transparent blur-3xl" />
        <div className="hero-orb-3 absolute left-1/2 top-1/4 size-[400px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/[0.04] to-transparent blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-20 md:pt-28 lg:pb-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary">
                  2026 Programming Live
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.06] tracking-tight md:text-5xl lg:text-[56px]">
                Training programs create talent.{' '}
                <span className="bg-gradient-to-r from-primary via-primary-400 to-primary bg-clip-text text-transparent">
                  COMPASS creates pathways.
                </span>
              </h1>
              <p className="mb-10 max-w-[520px] text-lg leading-relaxed text-gray-500">
                We build the career infrastructure that connects prepared,
                underrepresented tech talent in Michigan to technology careers —
                creating confidence, belonging, and economic mobility.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/get-involved"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-[15px] font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
                >
                  Join the Community
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center rounded-lg border border-[var(--border)] px-7 py-3.5 text-[15px] font-semibold transition-all hover:border-primary/40 hover:bg-primary/[0.04]"
                >
                  Partner with Us
                </Link>
              </div>
              {/* Social proof strip */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[
                    'bg-primary',
                    'bg-emerald-500',
                    'bg-indigo-500',
                    'bg-rose-400',
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`flex size-8 items-center justify-center rounded-full border-2 border-[var(--surface)] text-[10px] font-bold text-white ${bg}`}
                    >
                      {['JR', 'MK', 'AS', 'TL'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold">4,111+ Navigators</div>
                  <div className="text-xs text-gray-500">
                    and growing every month
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract visual — compass constellation */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By — infinite double marquee */}
      <section className="border-y border-surface bg-white/[0.01]">
        <div className="py-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-600">
            Trusted by leading organizations
          </p>
          <div className="flex flex-col gap-2">
            <MarqueeRow logos={row1Logos} direction="left" />
            <MarqueeRow logos={row2Logos} direction="right" />
          </div>
        </div>
      </section>

      {/* Stats — animated counters */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Our Impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            The numbers tell the story
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
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
              <p className="mb-6 leading-relaxed text-gray-500">
                Detroit is producing tech talent — but losing it. Despite
                historic investments in training programs, 45% of Michigan STEM
                graduates leave the state within two years.
              </p>

              {/* Inline viz: the talent gap */}
              <TalentGapViz />

              <p className="mt-6 leading-relaxed text-gray-500">
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
                    'Recruit and prepare talent',
                    'Build confidence and belonging',
                    'Connect Navigators to opportunities',
                    'Provide wraparound support',
                    'Partner with employers for career exposure',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-primary/15 bg-primary/[0.06] px-4 py-2.5"
                    >
                      <CheckIcon />
                      <span className="text-sm text-gray-300">{item}</span>
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
                      <span className="text-[13px] text-gray-600">
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1 text-[13px] text-gray-600">
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
              <p className="mb-8 leading-relaxed text-gray-500">
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  {t.type}
                </span>
                <p className="mt-2 text-xl font-bold text-primary">
                  {t.company}
                </p>
                <p className="mt-1 text-sm text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
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
            <p className="max-w-lg text-sm text-gray-500">
              Browse upcoming workshops, meetups, and community events.
              Something for every Navigator, every week.
            </p>
          </div>
          <CommunityCalendar />
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
            <p className="mx-auto mb-10 max-w-[540px] text-lg leading-relaxed text-gray-500">
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
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
