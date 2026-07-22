import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'

// Animated counter hook
function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
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
  }, [hasAnimated, target, duration])

  return { ref, count }
}

function ImpactNumber({ value, suffix = '', label }) {
  const { ref, count } = useCounter(value)
  const formatted = value >= 1000 ? count.toLocaleString() : count
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
        {formatted}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-500">{label}</div>
    </div>
  )
}

ImpactNumber.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default function ImpactReportPage() {
  return (
    <SiteLayout>
      {/* Slide 1: Title */}
      <section className="impact-slide relative overflow-hidden">
        <div className="hero-orb-1 absolute -right-40 -top-40 size-[500px] rounded-full bg-gradient-to-br from-primary/[0.08] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-32 -left-32 size-[400px] rounded-full bg-gradient-to-tr from-violet-500/[0.06] to-transparent blur-3xl" />
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[900px] text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary">
              Impact Report 2024–2026
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.06] tracking-tight md:text-7xl">
            Building{' '}
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              pathways
            </span>{' '}
            that didn&apos;t exist.
          </h1>
          <p className="mx-auto mb-10 max-w-[600px] text-lg leading-relaxed text-gray-500">
            COMPASS — Collective of Minority Professionals and STEAM Societies —
            is a 501(c)(3) nonprofit creating career infrastructure for
            underrepresented tech talent in Michigan.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <span>Founded 2000</span>
            <span className="size-1 rounded-full bg-gray-600" />
            <span>Detroit, Michigan</span>
            <span className="size-1 rounded-full bg-gray-600" />
            <span>501(c)(3)</span>
          </div>
        </div>
      </section>

      {/* Slide 2: The Problem */}
      <section className="impact-slide">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            The Challenge
          </p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
            Michigan is producing tech talent —{' '}
            <span className="text-gray-500">but losing it.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-surface bg-surface-card p-8">
              <div className="mb-3 text-4xl font-extrabold text-red-400">
                45%
              </div>
              <p className="text-sm font-semibold">STEM grads leave Michigan</p>
              <p className="mt-2 text-xs text-gray-500">
                Within 2 years of graduation
              </p>
            </div>
            <div className="rounded-xl border border-surface bg-surface-card p-8">
              <div className="mb-3 text-4xl font-extrabold text-amber-400">
                28%
              </div>
              <p className="text-sm font-semibold">Land local tech jobs</p>
              <p className="mt-2 text-xs text-gray-500">
                Despite robust training programs
              </p>
            </div>
            <div className="rounded-xl border border-surface bg-surface-card p-8">
              <div className="mb-3 text-4xl font-extrabold text-emerald-400">
                8%
              </div>
              <p className="text-sm font-semibold">
                Industry diversity average
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Black/African-American representation
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-lg text-gray-400">
            The gap isn&apos;t skills — it&apos;s{' '}
            <strong className="text-[var(--text-primary)]">
              infrastructure
            </strong>
            .
          </p>
        </div>
      </section>

      {/* Slide 3: The Numbers */}
      <section className="impact-slide bg-gradient-to-b from-primary/[0.03] to-transparent">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            By The Numbers
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Our community in numbers
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <ImpactNumber value={4111} label="Community Members" />
            <ImpactNumber
              value={52}
              suffix="%"
              label="Black / African-American"
            />
            <ImpactNumber value={75} suffix="%" label="Women in Leadership" />
            <ImpactNumber value={51} suffix="%" label="Actively Job-Seeking" />
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-surface bg-surface-card p-6 text-center">
              <div className="mb-2 text-2xl font-extrabold text-primary">
                4+
              </div>
              <p className="text-sm text-gray-400">
                Innovation Summits per year
              </p>
            </div>
            <div className="rounded-xl border border-surface bg-surface-card p-6 text-center">
              <div className="mb-2 text-2xl font-extrabold text-primary">
                20+
              </div>
              <p className="text-sm text-gray-400">Coalition organizations</p>
            </div>
            <div className="rounded-xl border border-surface bg-surface-card p-6 text-center">
              <div className="mb-2 text-2xl font-extrabold text-primary">
                78%
              </div>
              <p className="text-sm text-gray-400">Navigator return rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: The Model */}
      <section className="impact-slide">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Our Model
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
            From community to career
          </h2>
          <div className="flex flex-col gap-4">
            {[
              {
                step: '01',
                title: 'Engage',
                desc: 'Innovation Summits, Hack Michigan, and Michigan DevFest build skills, confidence, and professional networks.',
                color: 'from-emerald-500/20 to-emerald-500/5',
              },
              {
                step: '02',
                title: 'Prepare',
                desc: 'Professional development, interview prep, portfolio building, and industry certification pathways.',
                color: 'from-blue-500/20 to-blue-500/5',
              },
              {
                step: '03',
                title: 'Connect',
                desc: 'Employers meet prepared, diverse talent at our events. Navigators gain exposure to real career opportunities.',
                color: 'from-violet-500/20 to-violet-500/5',
              },
              {
                step: '04',
                title: 'Hire',
                desc: 'Co-ops, internships, apprenticeships, and full-time roles — with continued COMPASS community support.',
                color: 'from-primary/20 to-primary/5',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`rounded-xl bg-gradient-to-r ${item.color} border border-surface p-6 md:p-8`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-2xl font-extrabold text-gray-600">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 5: Proof */}
      <section className="impact-slide bg-gradient-to-b from-primary/[0.03] to-transparent">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Proof of Impact
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Navigators hired through COMPASS events
          </h2>
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
                className="rounded-xl border border-surface bg-surface-card p-8"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  {t.type}
                </span>
                <p className="mt-3 text-2xl font-bold text-primary">
                  {t.company}
                </p>
                <p className="mt-1 text-sm text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Partners came to our events looking for talent — and found it.
          </p>
        </div>
      </section>

      {/* Slide 6: The Coalition */}
      <section className="impact-slide">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            The Collective
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Stronger together
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-sm text-gray-500">
            COMPASS operates as a collective of organizations — each serving
            underrepresented professionals in STEAM, all amplifying each
            other&apos;s impact.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {[
              'NSBE Detroit',
              'SHPE Detroit',
              'GDG Detroit',
              'Women Techmakers',
              'Out in Tech',
              'SWE Detroit',
              'MCWT',
              'Wayne State University',
            ].map((org) => (
              <div
                key={org}
                className="rounded-xl border border-surface bg-surface-card px-4 py-6 text-center"
              >
                <p className="text-sm font-semibold">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 7: The Ask */}
      <section className="impact-slide relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-violet-500/[0.04]" />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[700px] text-center">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Let&apos;s build Detroit&apos;s{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-amber-300 bg-clip-text text-transparent">
              future together.
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-[500px] text-lg leading-relaxed text-gray-500">
            Your investment funds career infrastructure — not overhead. Every
            dollar creates pathways for Michigan&apos;s underrepresented tech
            talent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:jritten@compass-detroit.com?subject=Partnership Inquiry"
              className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">Partner with COMPASS</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-surface px-8 py-4 text-base font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              All Pathways <ArrowRightIcon />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="trust-badge trust-badge-accent">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              501(c)(3) Nonprofit
            </span>
            <span className="trust-badge">Est. 2000</span>
            <span className="trust-badge">Detroit, Michigan</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
