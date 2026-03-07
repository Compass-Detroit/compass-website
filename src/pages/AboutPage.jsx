import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SiteLayout from '@/layouts/SiteLayout'

import NSBELogo from '@/assets/images/organizations/org-nsbe-logo.webp'
import SHPELogo from '@/assets/images/organizations/org-shpe-logo.webp'
import GDGDetroitLogo from '@/assets/images/organizations/org-gdg-detroit.webp'
import WTMLogo from '@/assets/images/organizations/org-wtm-logo.webp'

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#666"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const weDo = [
  'Recruit and prepare talent',
  'Build confidence and belonging',
  'Connect Navigators to opportunities',
  'Provide wraparound support',
  'Partner with employers for career exposure',
]

const weDont = [
  'Run a bootcamp or training program',
  'Compete with existing programs',
  'Guarantee job placements',
  'Control employer hiring decisions',
]

const journeySteps = [
  {
    num: '01',
    title: 'Engage',
    desc: 'Discover COMPASS through Innovation Summits, Michigan DevFest, and Hack Michigan — building skills, confidence, and professional networks.',
    events: ['Innovation Summits', 'Hack Michigan', 'DevFest'],
  },
  {
    num: '02',
    title: 'Prepare & Connect',
    desc: 'Build career readiness through professional development, interview prep, portfolio building, and pathways to industry certifications.',
    events: ['Portfolio reviews', 'Mock interviews', 'Certifications'],
  },
  {
    num: '03',
    title: 'Grow',
    desc: 'Advance through co-ops, internships, apprenticeships, and full-time roles — with continued COMPASS community support.',
    events: ['Co-ops & internships', 'Full-time roles', 'Mentorship'],
  },
]

const traction = [
  {
    company: 'DTE Energy',
    role: 'Co-Op (2+ semesters)',
    detail:
      'Corporate partner hired a Navigator into a Co-Op role after connecting at a COMPASS 2025 event. Michigan-based role.',
  },
  {
    company: 'Little Caesars',
    role: 'Software Engineer',
    detail:
      'Corporate partner hired a Navigator into a full-time Software Engineer role after connecting at a COMPASS 2025 event. Michigan-based role.',
  },
  {
    company: 'IBM',
    role: 'Product Manager',
    detail:
      'A Navigator and active COMPASS community member was hired into a full-time PM role, building their professional network through COMPASS programming.',
  },
]

const coalitionOrgs = [
  { name: 'NSBE Detroit', logo: NSBELogo, initials: null },
  { name: 'SHPE Detroit', logo: SHPELogo, initials: null },
  { name: 'GDG Detroit', logo: GDGDetroitLogo, initials: null },
  { name: 'Women Techmakers', logo: WTMLogo, initials: null },
  {
    name: 'MCWT',
    logo: null,
    initials: 'MCWT',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    name: 'Out in Tech Detroit',
    logo: null,
    initials: 'OiT',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'SWE Detroit',
    logo: null,
    initials: 'SWE',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Automation Workz',
    logo: null,
    initials: 'AW',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

// Growth metric animation
function GrowthRing({ label, pct, delay }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const r = 36
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
    <div ref={ref} className="flex flex-col items-center">
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="#222"
          strokeWidth="6"
        />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="#D4A017"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={visible ? circ - (pct / 100) * circ : circ}
          style={{ transition: `stroke-dashoffset 1.2s ease-out ${delay}s` }}
        />
      </svg>
      <span className="mt-2 text-xl font-extrabold text-primary">{pct}%</span>
      <span className="mt-1 text-center text-xs text-gray-500">{label}</span>
    </div>
  )
}

GrowthRing.propTypes = {
  label: PropTypes.string.isRequired,
  pct: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
}

// Diversity breakdown donut
function DiversityDonut() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const r = 40
  const circ = 2 * Math.PI * r
  const segments = [
    { label: 'Black / African-American', pct: 52, color: '#D4A017' },
    { label: 'Hispanic / Latinx', pct: 18, color: '#10b981' },
    { label: 'Asian / Pacific Islander', pct: 12, color: '#6366f1' },
    { label: 'White / Other', pct: 18, color: '#4b5563' },
  ]

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

  let offset = 0

  return (
    <div
      ref={ref}
      className="rounded-xl border border-surface bg-surface-card p-6"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
        Community Breakdown
      </p>
      <p className="mb-5 text-sm font-semibold text-white">
        Racial & ethnic diversity
      </p>
      <div className="flex items-center gap-8">
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          className="shrink-0 -rotate-90"
          aria-hidden="true"
        >
          {segments.map((seg) => {
            const dashLen = (seg.pct / 100) * circ
            const dashGap = circ - dashLen
            const currentOffset = offset
            offset += dashLen
            return (
              <circle
                key={seg.label}
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeDasharray={`${visible ? dashLen : 0} ${
                  visible ? dashGap : circ
                }`}
                strokeDashoffset={-currentOffset}
                style={{ transition: 'stroke-dasharray 1.2s ease-out 0.2s' }}
              />
            )
          })}
        </svg>
        <div className="flex flex-col gap-2.5">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2.5 text-xs">
              <div
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-gray-400">{seg.label}</span>
              <span className="ml-auto font-bold text-gray-300">
                {seg.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 size-[400px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            About COMPASS
          </p>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            The career infrastructure Detroit&apos;s tech talent deserves.
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            COMPASS — the Collective of Minority Professionals and STEAM
            Societies — is a 501(c)(3) nonprofit building the pathways that
            connect prepared, underrepresented tech talent in Michigan to
            technology careers.
          </p>
        </div>
      </section>

      {/* Community rings — animated demographic data */}
      <section className="border-y border-surface bg-white/[0.01]">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Our Community
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              2,203 Members and Growing
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <GrowthRing label="Black / African-American" pct={52} delay={0} />
            <GrowthRing label="Women" pct={75} delay={0.15} />
            <GrowthRing label="Actively Job-Seeking" pct={51} delay={0.3} />
            <GrowthRing label="3-Yr Growth" pct={100} delay={0.45} />
          </div>
          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-gray-600">
            234% member growth over 3 years — driven by word-of-mouth and
            events.
          </p>
          <div className="mx-auto mt-10 max-w-lg">
            <DiversityDonut />
          </div>
        </div>
      </section>

      {/* Mission + Do/Don't */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                Our Mission
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight">
                Building the pathways that don&apos;t exist yet.
              </h2>
              <p className="mb-6 leading-[1.7] text-gray-500">
                Detroit is producing tech talent — but losing it. Despite
                historic investments in training programs, 45% of Michigan STEM
                graduates leave the state within two years. The gap isn&apos;t
                skills. It&apos;s infrastructure: no one is connecting prepared
                talent to careers.
              </p>
              <p className="leading-[1.7] text-gray-500">
                COMPASS is a 501(c)(3) nonprofit building the career
                infrastructure that closes this gap — operating as a collective
                of professional organizations including NSBE, SHPE, SWE, MCWT,
                Out in Tech, and more.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                What We Do — and Don&apos;t Do
              </p>
              <div className="flex flex-col gap-3">
                {weDo.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-primary/15 bg-primary/[0.06] px-4 py-2.5"
                  >
                    <CheckIcon />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
                <div className="h-2" />
                {weDont.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-surface bg-white/[0.02] px-4 py-2.5"
                  >
                    <XIcon />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Coalition — org logos */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              The Collective
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Eight organizations, one mission
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {coalitionOrgs.map((org) => (
              <div
                key={org.name}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-surface bg-surface-card p-5 transition-colors hover:border-primary/30"
              >
                {org.logo ? (
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="h-10 w-auto object-contain opacity-80"
                  />
                ) : (
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${org.gradient}`}
                  >
                    <span className="text-xs font-extrabold tracking-tight text-white">
                      {org.initials}
                    </span>
                  </div>
                )}
                <span className="text-center text-xs font-semibold text-gray-500">
                  {org.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigator Journey — vertical timeline */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-16 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              The Navigator Journey
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight">
              From preparation to prosperity
            </h2>
            <p className="leading-relaxed text-gray-500">
              Navigators are our community members — individuals charting their
              course through the technology industry with COMPASS as their
              guide.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-[680px]">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:block"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-8">
              {journeySteps.map((step) => (
                <div
                  key={step.num}
                  className="group relative flex gap-6 md:pl-16"
                >
                  {/* Dot on timeline */}
                  <div
                    className="absolute left-4 top-4 hidden size-5 items-center justify-center rounded-full border-2 border-primary bg-[#0a0a0a] md:flex"
                    aria-hidden="true"
                  >
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                  <div className="w-full rounded-xl border border-surface bg-surface-card p-6 transition-colors group-hover:border-primary/30">
                    <div className="mb-1 text-xs font-bold text-primary">
                      {step.num}
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                    <p className="mb-4 text-sm leading-[1.7] text-gray-500">
                      {step.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.events.map((ev) => (
                        <span
                          key={ev}
                          className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traction — with visual emphasis */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Pilot Traction
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              The model is working
            </h2>
            <p className="leading-relaxed text-gray-500">
              COMPASS partners are not just supporting our events — they&apos;re
              interviewing and hiring Navigators they meet there.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {traction.map((t) => (
              <div
                key={t.company}
                className="rounded-xl border border-surface bg-surface-card p-8"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                  Corporate Partner
                </p>
                <p className="mb-1 text-xl font-bold text-primary">
                  {t.company}
                </p>
                <h3 className="mb-3 text-base font-bold">{t.role}</h3>
                <p className="text-sm leading-[1.7] text-gray-500">
                  {t.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-primary/20 bg-primary/[0.04] p-6 text-center">
            <p className="text-lg font-semibold text-gray-300">
              Three Navigators. Three job offers. Partners came to our events
              looking for talent — and found it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Ready to be part of the{' '}
              <span className="text-primary">mission?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[500px] text-lg leading-relaxed text-gray-500">
              Join the collective of organizations and individuals building
              Detroit&apos;s tech talent pipeline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-involved"
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-primary-400"
              >
                Get Involved
              </Link>
              <Link
                to="/programs"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold text-white transition-colors hover:border-gray-500"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
