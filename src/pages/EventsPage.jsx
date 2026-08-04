import SiteLayout from '@/layouts/SiteLayout'
import { Link } from 'react-router-dom'
import MapPinIcon from '@/components/ui/MapPinIcon'
import CheckIcon from '@/components/ui/CheckIcon'
import EventWebsitesGallery from '@/components/events/EventWebsitesGallery'
import communityGatheringImg from '@assets/images/generated/community-gathering.png'
import CommunityCalendar from '@/components/events/CommunityCalendar'

const typeColors = {
  'Innovation Summit': 'bg-primary/10 text-primary border-primary/20',
  'Pride Summit': 'bg-primary/10 text-primary border-primary/20',
  Hackathon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Industry Event': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const journeyStages = [
  {
    id: 'engage',
    label: 'Engage',
    color: 'text-primary',
    bg: 'bg-primary/10',
    desc: 'Discover, attend, belong',
  },
  {
    id: 'build',
    label: 'Build',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    desc: 'Skills, portfolio, confidence',
  },
  {
    id: 'connect',
    label: 'Connect',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    desc: 'Employers meet talent',
  },
  {
    id: 'hire',
    label: 'Hire',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    desc: 'Co-ops, roles & careers',
  },
]

function isUpcoming(dateStr) {
  // Handle year-only format like "2026"
  if (/^\d{4}$/.test(dateStr)) return true
  const parsed = new Date(`1 ${dateStr}`)
  if (isNaN(parsed)) return true
  const now = new Date()
  parsed.setMonth(parsed.getMonth() + 1, 0)
  return parsed >= now
}

const allEvents = [
  {
    name: 'Black History Month Innovation Summit',
    date: 'February 2026',
    month: 'FEB',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
    stages: ['engage', 'connect'],
    desc: 'Celebrating Black excellence in technology with keynotes, panels, and networking focused on career advancement and innovation.',
  },
  {
    name: "International Women's Day Innovation Summit",
    date: 'March 2026',
    month: 'MAR',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
    stages: ['engage', 'connect'],
    desc: 'Honoring women leading in technology with sessions on leadership, career growth, and breaking barriers in the industry.',
  },
  {
    name: 'Detroit Pride Innovation Summit',
    date: 'June 2026',
    month: 'JUN',
    location: 'IBM Detroit, 500 Woodward Ave',
    type: 'Pride Summit',
    stages: ['engage', 'connect'],
    desc: "Celebrating LGBTQ+ leaders, technologists, and allies in Michigan's tech ecosystem — breaking the pattern with inclusive innovation. Featuring talks by Greg Miller and Shugmi Shumunov.",
    url: 'https://www.detroitpridesummit.com/',
    speakers: ['Greg Miller', 'Shugmi Shumunov'],
  },
  {
    name: 'Hispanic Heritage Month Innovation Summit',
    date: 'September 2026',
    month: 'SEP',
    location: 'Detroit, MI',
    type: 'Innovation Summit',
    stages: ['engage', 'connect'],
    desc: 'Highlighting Hispanic and Latinx contributions to technology with career-focused programming and community building.',
  },
  {
    name: 'Hack Michigan',
    date: '2026',
    month: 'TBD',
    location: 'Detroit, MI',
    type: 'Hackathon',
    stages: ['build', 'connect'],
    desc: "Michigan's premier community hackathon bringing together developers, designers, and innovators to build solutions for real-world challenges.",
  },
  {
    name: 'Michigan DevFest',
    date: 'November 2026',
    month: 'NOV',
    location: 'Detroit, MI',
    type: 'Industry Event',
    stages: ['engage', 'build', 'connect'],
    desc: 'A flagship technology conference featuring sessions on cloud, AI, mobile, web, and career development — co-produced with GDG Detroit.',
  },
]

const pastEvents = allEvents.filter((ev) => !isUpcoming(ev.date))
const events = allEvents.filter((ev) => isUpcoming(ev.date))

const programs = [
  {
    title: 'Innovation Summits',
    desc: 'Quarterly events tied to cultural heritage months, featuring keynotes from industry leaders, technical workshops, career panels, and networking. Each summit connects 200+ Navigators with employers and community partners.',
    highlights: [
      'Keynote speakers from major tech companies',
      'Hands-on workshops and career panels',
      'Direct employer networking opportunities',
      'Cultural celebration and community building',
    ],
  },
  {
    title: 'Hack Michigan',
    desc: "Michigan's community hackathon, bringing together developers, designers, and domain experts to solve real problems. Participants build portfolio-worthy projects while connecting with mentors and potential employers.",
    highlights: [
      'Team-based project development',
      'Industry mentorship',
      'Portfolio building',
      'Prize tracks for social impact',
    ],
  },
  {
    title: 'Michigan DevFest',
    desc: 'A full-day technology conference produced in partnership with Google Developer Groups. Multiple tracks covering cloud, AI/ML, mobile, web, and career development with talks from industry practitioners.',
    highlights: [
      'Multi-track conference format',
      'Google technology ecosystem',
      'Speaker opportunities for Navigators',
      'Career pathways workshops',
    ],
  },
  {
    title: 'Career Pathways',
    desc: 'Ongoing programming that prepares Navigators for their next career move — from resume workshops and mock interviews to portfolio reviews and certification study groups.',
    highlights: [
      'Resume and portfolio reviews',
      'Mock interview preparation',
      'Certification study groups',
      'Professional development workshops',
    ],
  },
]

const legacyColorMap = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const eventLegacy = [
  {
    name: 'Michigan DevFest',
    year: 2026,
    edition: '12th Annual',
    color: 'blue',
    desc: "Michigan's flagship technology conference spanning cloud, AI, mobile, web, and careers.",
    link: 'https://midevfest.com',
    stats: { speakers: '100+', attendees: '500+', tracks: '6' },
  },
  {
    name: 'BHM Innovation Summit',
    year: 2026,
    edition: '4th Annual',
    color: 'orange',
    desc: 'Celebrating Black innovation and excellence in technology across Detroit.',
    link: 'https://bit.ly/bhm-summit-website',
    stats: { speakers: '30+', attendees: '200+', tracks: '4' },
  },
  {
    name: 'IWD Innovation Summit',
    year: 2026,
    edition: '4th Annual',
    color: 'purple',
    desc: 'Empowering women in tech through innovation, leadership, and community.',
    link: 'https://bit.ly/det-iwd-25-website',
    stats: { speakers: '40+', attendees: '250+', tracks: '8' },
  },
  {
    name: 'AI Hackathon',
    year: 2026,
    edition: '2nd Annual',
    color: 'cyan',
    desc: 'Hands-on agentic AI hackathon building real-world solutions.',
    link: 'http://ibm.biz/agentic-ai-hackathon',
    stats: { speakers: '10+', attendees: '100+', tracks: '2' },
  },
  {
    name: 'Detroit Pride Innovation Summit',
    year: 2026,
    edition: '2nd Annual',
    color: 'rose',
    desc: 'Celebrating LGBTQ+ innovation and inclusive technology leadership.',
    link: 'https://detroitpridesummit.com',
    stats: { speakers: '20+', attendees: '150+', tracks: '3' },
  },
  {
    name: 'Hack Michigan',
    year: 2026,
    edition: '3rd Annual',
    color: 'emerald',
    desc: 'Multi-day hackathon building solutions for Michigan communities.',
    link: '/events',
    stats: { speakers: '15+', attendees: '200+', tracks: '3' },
  },
]

export default function EventsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-orb-1 absolute -right-32 -top-32 size-[350px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 left-1/3 size-[250px] rounded-full bg-gradient-to-tr from-emerald-500/[0.04] to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              6 Events Planned
            </span>
          </div>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Where talent meets{' '}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              opportunity.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            From Innovation Summits to hackathons to Michigan DevFest — every
            COMPASS event is designed to build confidence, create connections,
            and open career pathways.
          </p>
        </div>
      </section>

      {/* Navigator Journey Flow — how events connect */}
      <section className="border-y border-surface bg-white/[0.01]">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="img-zoom mb-10 overflow-hidden rounded-2xl border border-surface">
            <img
              src={communityGatheringImg}
              alt="COMPASS Detroit event with community members networking"
              className="aspect-[4/1] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              The Navigator Journey
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              How everything connects
            </h2>
            <p className="mx-auto max-w-lg text-sm text-gray-500">
              Every COMPASS event maps to a stage in the Navigator journey.
              Attend any event and you&apos;re progressing toward career
              outcomes.
            </p>
          </div>
          {/* Horizontal flow */}
          <div className="relative flex items-stretch justify-between gap-2 overflow-x-auto pb-2 md:gap-0">
            {journeyStages.map((stage, i) => (
              <div
                key={stage.id}
                className="flex min-w-[140px] flex-1 items-center"
              >
                <div
                  className={`flex w-full flex-col items-center rounded-xl border border-surface ${stage.bg} p-4 text-center`}
                >
                  <span
                    className={`mb-1 text-lg font-extrabold ${stage.color}`}
                  >
                    {stage.label}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {stage.desc}
                  </span>
                </div>
                {i < journeyStages.length - 1 && (
                  <svg
                    width="28"
                    height="20"
                    viewBox="0 0 28 20"
                    className="shrink-0 text-gray-600"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10h20M18 4l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events — timeline with journey tags */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              2026 Calendar
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Upcoming Events
            </h2>
          </div>
          <div className="relative flex flex-col gap-4">
            {/* Timeline accent line */}
            <div
              className="absolute inset-y-0 left-[27px] hidden w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:block"
              aria-hidden="true"
            />
            {events.map((ev) => (
              <div key={ev.name} className="group relative flex gap-5 md:pl-16">
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] top-6 hidden md:block"
                  aria-hidden="true"
                >
                  <div className="flex size-[20px] items-center justify-center rounded-full border-2 border-primary bg-[#0a0a0a]">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="w-full rounded-xl border border-surface bg-surface-card p-6 transition-colors hover:border-primary/40">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-5">
                      <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/[0.08]">
                        <span className="text-[10px] font-bold text-primary">
                          {ev.month}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold">{ev.name}</h3>
                        <div className="mt-1.5 flex flex-wrap gap-4">
                          <span className="flex items-center gap-2 text-[13px] text-gray-600">
                            {ev.date}
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                              Placeholder Date
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-[13px] text-gray-600">
                            <MapPinIcon /> {ev.location}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-500">
                          {ev.desc}
                        </p>
                        {/* Journey stage tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {ev.stages.map((stageId) => {
                            const stage = journeyStages.find(
                              (s) => s.id === stageId
                            )
                            return stage ? (
                              <span
                                key={stageId}
                                className={`rounded-full ${stage.bg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stage.color}`}
                              >
                                {stage.label}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`w-fit shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        typeColors[ev.type] || 'bg-primary/10 text-primary'
                      }`}
                    >
                      {ev.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Event Legacy */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Our Event Legacy
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Celebrating years of innovation, community, and impact across
              Michigan
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {eventLegacy.map((ev) => (
              <div
                key={ev.name}
                className="group flex flex-col rounded-xl border border-surface bg-surface-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      legacyColorMap[ev.color]
                    }`}
                  >
                    {ev.edition}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {ev.year}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{ev.name}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
                  {ev.desc}
                </p>
                <div className="mb-6 grid grid-cols-3 gap-2 border-y border-surface py-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-200">
                      {ev.stats.speakers}
                    </span>
                    <span className="text-[10px] uppercase text-gray-500">
                      Speakers
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-200">
                      {ev.stats.attendees}
                    </span>
                    <span className="text-[10px] uppercase text-gray-500">
                      Attendees
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-200">
                      {ev.stats.tracks}
                    </span>
                    <span className="text-[10px] uppercase text-gray-500">
                      Tracks
                    </span>
                  </div>
                </div>
                {ev.link.startsWith('/') ? (
                  <Link
                    to={ev.link}
                    className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary-400"
                  >
                    Visit Website &rarr;
                  </Link>
                ) : (
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary-400"
                  >
                    Visit Website &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-surface bg-surface-card px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              <span>
                <span role="img" aria-label="camera">
                  📸
                </span>{' '}
                Photos from past events
              </span>
            </Link>
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

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="border-y border-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-600">
              Past Events
            </p>
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-400">
              Earlier this year
            </h2>
            <div className="flex flex-col gap-3">
              {pastEvents.map((ev) => (
                <div
                  key={ev.name}
                  className="flex flex-col gap-3 rounded-xl border border-surface bg-surface-card p-5 opacity-70 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                      <span className="text-[10px] font-bold text-gray-500">
                        {ev.month}
                      </span>
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-gray-400">
                        {ev.name}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4">
                        <span className="text-[13px] text-gray-600">
                          {ev.date}
                        </span>
                        <span className="flex items-center gap-1 text-[13px] text-gray-600">
                          <MapPinIcon /> {ev.location}
                        </span>
                      </div>
                      {ev.speakers && ev.speakers.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {ev.speakers.map((speaker) => (
                            <span
                              key={speaker}
                              className="rounded-full bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-violet-500/20 px-2.5 py-0.5 text-[10px] font-bold text-gray-400"
                            >
                              <span role="img" aria-label="Speaker">
                                🎤
                              </span>{' '}
                              {speaker}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-semibold text-primary/60 transition-colors hover:text-primary"
                        aria-label={`Visit ${ev.name} website`}
                      >
                        Website →
                      </a>
                    )}
                    <span className="w-fit whitespace-nowrap rounded-full bg-white/[0.04] px-3 py-1 text-xs font-semibold text-gray-500">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Detail */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-16 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Our Programs
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Career infrastructure, not just events
            </h2>
            <p className="leading-relaxed text-gray-500">
              Each program serves a specific purpose in the Navigator journey —
              from first engagement through career advancement.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program.title}
                className="group rounded-xl border border-surface bg-surface-card p-8 transition-colors hover:border-primary/30"
              >
                <h3 className="mb-3 text-xl font-bold">{program.title}</h3>
                <p className="mb-5 text-sm leading-[1.7] text-gray-500">
                  {program.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className="mt-0.5 shrink-0" />
                      <span className="text-gray-400">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Websites Gallery */}
      <EventWebsitesGallery />

      {/* CTA */}
      <section className="border-t border-surface">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-6 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
              Ready to attend?{' '}
              <span className="text-primary">Let&apos;s go.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[500px] leading-relaxed text-gray-500">
              Join as a Navigator, partner as an employer, or sponsor a program
              — every pathway starts here.
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
