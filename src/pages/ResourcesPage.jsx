import SiteLayout from '@/layouts/SiteLayout'
import { Link } from 'react-router-dom'
import devCollaborationImg from '@assets/images/generated/dev-collaboration.png'
import hackathonSceneImg from '@assets/images/generated/hackathon-scene.png'

function BriefcaseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M2 12h20" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
      <path d="M2 8h0M22 8h0" />
    </svg>
  )
}

const proposedTopics = [
  {
    category: 'Career Development',
    icon: <BriefcaseIcon />,
    topics: [
      'Resume & portfolio reviews',
      'Mock interview preparation',
      'LinkedIn optimization',
      'Salary negotiation strategies',
      'Personal branding in tech',
    ],
  },
  {
    category: 'Technical Skills',
    icon: <CodeIcon />,
    topics: [
      'Cloud computing (GCP, AWS, Azure)',
      'AI & machine learning fundamentals',
      'Full-stack web development',
      'Cybersecurity foundations',
      'Data analytics & visualization',
    ],
  },
  {
    category: 'Community & Connection',
    icon: <UsersIcon />,
    topics: [
      'Mentorship matching',
      'Michigan tech community directory',
      'Past event recordings & slides',
      'Job board with partner companies',
      'Peer study & accountability groups',
    ],
  },
  {
    category: 'For Employers & Partners',
    icon: <BuildingIcon />,
    topics: [
      'Inclusive hiring playbook',
      'Co-op & internship frameworks',
      'Sponsorship prospectus',
      'DEI pipeline best practices',
      'Talent engagement guides',
    ],
  },
]

export default function ResourcesPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 size-[400px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Resources
          </p>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Built by the community,{' '}
            <span className="text-primary">for the community.</span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            We&apos;re building a resource hub shaped by what our Navigators
            actually need. We&apos;re asking our membership what they want to
            hear, see, and learn — and doing our best to find speakers and
            create content that meet those needs.
          </p>
        </div>
      </section>

      {/* Active callout */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-8 text-center md:p-10">
            <div className="mb-4 flex justify-center" aria-hidden="true">
              <BellIcon />
            </div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              We want to hear from you
            </h2>
            <p className="mx-auto mb-6 max-w-lg leading-relaxed text-gray-400">
              The resources below represent topics our community has expressed
              interest in. Nothing here is final — everything is driven by what{' '}
              <strong className="text-white">you</strong> tell us matters most.
              Help us prioritize by sharing what you&apos;d find most valuable.
            </p>
            <a
              href="mailto:jritten@compass-detroit.com?subject=Resource%20Suggestion&body=Hi%20COMPASS%20team%2C%0A%0AI'd%20love%20to%20see%20resources%20on%3A%0A%0A"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-[15px] font-semibold text-black transition-colors hover:bg-primary-400"
            >
              Share what you want to learn
            </a>
          </div>
        </div>
      </section>

      {/* Proposed topics grid */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-12 grid gap-4 md:grid-cols-2">
            <div className="img-zoom overflow-hidden rounded-xl border border-surface">
              <img
                src={devCollaborationImg}
                alt="Developers collaborating on code during a workshop"
                className="aspect-[2/1] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="img-zoom overflow-hidden rounded-xl border border-surface">
              <img
                src={hackathonSceneImg}
                alt="Hackathon teams building projects together"
                className="aspect-[2/1] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mb-12 text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              What We&apos;re Hearing
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Topics our community is asking for
            </h2>
            <p className="mx-auto max-w-lg text-sm text-gray-500">
              These are the areas Navigators and members have told us matter
              most. We&apos;re actively sourcing speakers, building workshops,
              and curating content around these themes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {proposedTopics.map((cat) => (
              <div
                key={cat.category}
                className="rounded-xl border border-dashed border-surface bg-surface-card p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{cat.category}</h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                      Community requested
                    </span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {cat.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-3 text-sm">
                      <div className="size-1.5 shrink-0 rounded-full bg-primary/50" />
                      <span className="text-gray-400">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Our Process
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Community-driven, always
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Listen',
                desc: 'We survey our Navigators and members to understand what skills, topics, and support they need most right now.',
              },
              {
                num: '02',
                title: 'Source',
                desc: 'We find speakers, build workshops, partner with experts, and curate content that directly addresses those needs.',
              },
              {
                num: '03',
                title: 'Deliver',
                desc: 'Resources launch through our events, online hub, and community channels — then we listen again and iterate.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-surface bg-surface-card p-8"
              >
                <span className="mb-3 inline-block text-xs font-bold text-primary">
                  {step.num}
                </span>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-[1.7] text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-6 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Have a topic in mind?{' '}
              <span className="text-primary">Tell us.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[500px] leading-relaxed text-gray-500">
              Whether it&apos;s a speaker you want to hear, a skill you want to
              build, or a resource you wish existed — we&apos;re listening.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:jritten@compass-detroit.com?subject=Resource%20Suggestion"
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-primary-400"
              >
                Suggest a Resource
              </a>
              <Link
                to="/get-involved"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold text-white transition-colors hover:border-gray-500"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
