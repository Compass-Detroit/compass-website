import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import CheckIcon from '@/components/ui/CheckIcon'
import PlaceholderImage from '@/components/ui/PlaceholderImage'

const programs = [
  {
    title: 'Innovation Summits',
    tagline: 'Quarterly cultural celebrations of tech excellence',
    desc: "Each Innovation Summit is tied to a cultural heritage month — Black History Month, International Women's Day, Hispanic Heritage Month — and brings together 200+ Navigators, employers, and community partners for a day of keynotes, workshops, career panels, and networking.",
    details: [
      'Full-day programming with keynote speakers from major tech companies',
      'Technical workshops and hands-on learning sessions',
      'Career panels with hiring managers and recruiters',
      'Resume reviews and on-site interview opportunities',
      'Cultural celebration and community recognition',
    ],
    impact: '600+ Navigators served across 3 summits annually',
  },
  {
    title: 'Hack Michigan',
    tagline: "Michigan's premier community hackathon",
    desc: 'A weekend-long hackathon bringing together developers, designers, data scientists, and domain experts to build solutions for real-world challenges. Participants gain portfolio-worthy projects, industry mentorship, and direct connections to employers.',
    details: [
      'Team-based project development over 48 hours',
      'Mentorship from industry professionals',
      'Multiple prize tracks including social impact',
      'Direct recruitment opportunities with sponsors',
      'Portfolio building and presentation skills',
    ],
    impact: '300+ participants, 50+ projects shipped',
  },
  {
    title: 'Michigan DevFest',
    tagline: 'A flagship technology conference',
    desc: 'Produced in partnership with Google Developer Groups, Michigan DevFest is a full-day, multi-track technology conference covering cloud, AI/ML, mobile, web, and career development — featuring talks from industry practitioners and community leaders.',
    details: [
      'Multi-track conference with 30+ sessions',
      'Google technology ecosystem deep-dives',
      'Speaker opportunities for community members',
      'Career pathways workshops and networking',
      'Co-produced with GDG Detroit and regional chapters',
    ],
    impact: '500+ attendees, 30+ speakers, 8 tracks',
  },
  {
    title: 'Career Pathways',
    tagline: 'Ongoing professional development',
    desc: 'Year-round programming that prepares Navigators for their next career move. From resume workshops and mock interviews to portfolio reviews and certification study groups — Career Pathways is the connective tissue between COMPASS events and career outcomes.',
    details: [
      'Monthly resume and portfolio review workshops',
      'Mock interview preparation with industry professionals',
      'Certification study groups (Google Cloud, AWS, CompTIA)',
      'Professional development and leadership programming',
      'Mentorship matching and career coaching',
    ],
    impact: '51% of Navigators actively job-seeking find pathways',
  },
]

export default function ProgramsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-orb-1 absolute -left-40 -top-40 size-[400px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 -right-20 size-[300px] rounded-full bg-gradient-to-tr from-emerald-500/[0.04] to-transparent blur-3xl" />
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              4 Programs
            </span>
          </div>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Career infrastructure,{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-amber-300 bg-clip-text text-transparent">
              not just events.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            Every COMPASS program serves a specific purpose in the Navigator
            journey — from first engagement through career advancement.
            Together, they form the career infrastructure that Michigan&apos;s
            tech talent deserves.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <PlaceholderImage preset="event" aspectRatio="aspect-[3/2]" />
            <PlaceholderImage preset="hackathon" aspectRatio="aspect-[3/2]" />
            <PlaceholderImage preset="impact" aspectRatio="aspect-[3/2]" />
          </div>
          <div className="flex flex-col gap-8">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className="overflow-hidden rounded-xl border border-surface bg-surface-card"
              >
                <div className="grid lg:grid-cols-5">
                  {/* Info */}
                  <div className="p-8 md:p-10 lg:col-span-3">
                    <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      0{i + 1}
                    </span>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight">
                      {program.title}
                    </h2>
                    <p className="mb-4 text-sm font-medium text-gray-600">
                      {program.tagline}
                    </p>
                    <p className="leading-[1.7] text-gray-500">
                      {program.desc}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="border-t border-surface bg-white/[0.02] p-8 md:p-10 lg:col-span-2 lg:border-l lg:border-t-0">
                    <ul className="mb-6 flex flex-col gap-2.5">
                      {program.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckIcon className="mt-0.5 shrink-0" />
                          <span className="text-gray-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg border border-primary/15 bg-primary/[0.06] px-4 py-3">
                      <p className="text-sm font-semibold text-primary">
                        {program.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-24 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-emerald-500/[0.04]" />
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="relative">
            <PlaceholderImage
              preset="tech"
              aspectRatio="aspect-[16/5]"
              className="mx-auto mb-10 max-w-[700px]"
            />
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
              Ready to start your{' '}
              <span className="bg-gradient-to-r from-primary to-amber-300 bg-clip-text text-transparent">
                journey?
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-[500px] leading-relaxed text-gray-500">
              Join as a Navigator, partner as an employer, or sponsor a program
              — every pathway starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/events"
                className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="relative z-10">See Upcoming Events</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <Link
                to="/get-involved"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
