import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import { communityPhotos } from '@/data/galleryPhotos'
import MiniCarousel from '@/components/ui/MiniCarousel'
import CommunityCalendar from '@/components/events/CommunityCalendar'

import NSBELogo from '@/assets/images/organizations/org-nsbe-logo.webp'
import SHPELogo from '@/assets/images/organizations/org-shpe-logo.webp'
import GDGDetroitLogo from '@/assets/images/organizations/org-gdg-detroit.webp'
import WTMLogo from '@/assets/images/organizations/org-wtm-logo.webp'

const collective = [
  {
    name: 'NSBE Detroit',
    full: 'National Society of Black Engineers — Detroit Chapter',
    desc: 'Professional engineers driving diversity in STEM through outreach, career development, and community building.',
    logo: NSBELogo,
    initials: null,
    gradient: null,
  },
  {
    name: 'SHPE Detroit',
    full: 'Society of Hispanic Professional Engineers — Detroit',
    desc: 'Empowering Hispanic professionals in engineering and science through development programs and networking.',
    logo: SHPELogo,
    initials: null,
    gradient: null,
  },
  {
    name: 'MCWT',
    full: 'Michigan Council of Women in Technology',
    desc: 'Growing the number of women in technology through programs, events, and community engagement across Michigan.',
    logo: null,
    initials: 'MCWT',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    name: 'GDG Detroit',
    full: 'Google Developer Group — Detroit',
    desc: 'A community of developers interested in Google technologies, learning, and building solutions together.',
    logo: GDGDetroitLogo,
    initials: null,
    gradient: null,
  },
  {
    name: 'Out in Tech Detroit',
    full: 'Out in Tech — Detroit Chapter',
    desc: 'Creating opportunities for LGBTQ+ professionals in the technology industry through events and advocacy.',
    logo: null,
    initials: 'OiT',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Women Techmakers',
    full: 'Women Techmakers — Detroit',
    desc: 'A Google program providing visibility, community, and resources for women in technology across Detroit.',
    logo: WTMLogo,
    initials: null,
    gradient: null,
  },
  {
    name: 'SWE Detroit',
    full: 'Society of Women Engineers — Detroit',
    desc: 'Empowering women to achieve full potential in careers as engineers and leaders through professional development.',
    logo: null,
    initials: 'SWE',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Automation Workz',
    full: 'Automation Workz Foundation',
    desc: 'Training and placing underrepresented talent in automation, IT, and cybersecurity career pathways.',
    logo: null,
    initials: 'AW',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

const communityStats = [
  { num: '4,111', label: 'Community members' },
  { num: '52%', label: 'Black/African-American' },
  { num: '75%', label: 'Women' },
  { num: '6+', label: 'Coalition organizations' },
]

export default function CommunityPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-orb-1 absolute -left-32 -top-32 size-[400px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 -right-20 size-[300px] rounded-full bg-gradient-to-tr from-pink-500/[0.04] to-transparent blur-3xl" />
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              8 Organizations
            </span>
          </div>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            A collective built on{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-amber-300 bg-clip-text text-transparent">
              belonging.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            COMPASS isn&apos;t a single organization — it&apos;s a coalition of
            professional societies united by a shared mission: building career
            infrastructure for underrepresented tech talent in Michigan.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {communityStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-surface bg-surface-card p-6 text-center"
              >
                <div className="mb-1 text-3xl font-extrabold tracking-tight text-primary">
                  {stat.num}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Collective — with logos */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-16 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Our Collective
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Stronger together
            </h2>
            <p className="leading-relaxed text-gray-500">
              Each organization in the COMPASS collective brings unique
              expertise, networks, and cultural perspective to our shared work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {collective.map((org) => (
              <div
                key={org.name}
                className="group rounded-xl border border-surface bg-surface-card p-8 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex items-center gap-4">
                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt=""
                      className="size-10 rounded-lg object-contain"
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${org.gradient}`}
                    >
                      <span className="text-xs font-extrabold text-white">
                        {org.initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold">{org.name}</h3>
                    <p className="text-[11px] text-gray-600">{org.full}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  {org.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
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

      {/* For Navigators / Employers — with accent borders */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="img-zoom mb-10 overflow-hidden rounded-2xl border border-surface">
            <MiniCarousel
              photos={communityPhotos}
              aspectRatio="3/1"
              className="w-full object-cover"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-primary/20 bg-surface-card p-8">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                For Navigators
              </p>
              <h3 className="mb-4 text-2xl font-bold tracking-tight">
                Your community is here
              </h3>
              <p className="mb-6 leading-relaxed text-gray-500">
                As a Navigator, you&apos;re not just attending events —
                you&apos;re joining a community of professionals who share your
                background, your ambitions, and your drive. COMPASS programming
                is designed to build your confidence, expand your network, and
                connect you to real career opportunities.
              </p>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
              >
                Join as a Navigator
              </Link>
            </div>
            <div className="rounded-xl border border-surface bg-surface-card p-8">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                For Employers
              </p>
              <h3 className="mb-4 text-2xl font-bold tracking-tight">
                Talent is already here
              </h3>
              <p className="mb-6 leading-relaxed text-gray-500">
                Stop searching. Start connecting. COMPASS events bring you
                face-to-face with prepared, diverse tech professionals who are
                ready for their next opportunity. Our partners aren&apos;t just
                sponsoring events — they&apos;re hiring the Navigators they meet
                there.
              </p>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-lg border border-surface px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-500"
              >
                Partner as an Employer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
