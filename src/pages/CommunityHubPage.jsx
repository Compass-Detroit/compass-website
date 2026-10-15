import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import CommunityCalendar from '@/components/events/CommunityCalendar'
import {
  getAllSpeakers,
  getTotalSpeakerCount,
  getYearRange,
} from '@/utils/speakerRegistry'
import { sanityImage } from '@/services/sanity'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { partnersData } from '@/data/2026/partners'
import { jobBoardData } from '@/data/2026/jobboard'
import {
  FaMicrophone,
  FaUsers,
  FaHandshake,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCalendarDays,
  FaCompass,
  FaBriefcase,
  FaHandHoldingHeart,
  FaChalkboardUser,
  FaXmark,
} from 'react-icons/fa6'

const CONTACT_EMAIL = 'whatupdoe@compass-detroit.com'
const PAGE_SIZE = 9
const TOPIC_CHIPS = 10

const SECTIONS = [
  { id: 'speakers', label: 'Speakers', icon: FaMicrophone },
  { id: 'communities', label: 'Communities', icon: FaUsers },
  { id: 'events', label: 'Events', icon: FaCalendarDays },
  { id: 'get-involved', label: 'Get involved', icon: FaHandHoldingHeart },
  { id: 'careers', label: 'Careers', icon: FaBriefcase },
]

const speakers = getAllSpeakers()
const yearRange = getYearRange()
const talkCount = speakers.reduce((n, s) => n + s.sessions.length, 0)
const years = Array.from(
  { length: yearRange.latest - yearRange.earliest + 1 },
  (_, i) => yearRange.latest - i
)

// Default order surfaces the most active returning speakers, not the A-names
const byActivity = [...speakers].sort(
  (a, b) =>
    b.sessions.length - a.sessions.length ||
    b.yearsActive.length - a.yearsActive.length ||
    Number(Boolean(b.avatar)) - Number(Boolean(a.avatar)) ||
    a.name.localeCompare(b.name)
)

// Most-used session topics become quick filter chips; tags vary in case
// across years ("Leadership" / "leadership"), so count them case-insensitively
// Session formats aren't topics
const NOT_TOPICS = new Set(['in-person', 'virtual', 'hybrid'])
const capitals = (str) => str.replace(/[^A-Z]/g, '').length
const topicCounts = new Map()
speakers
  .flatMap((s) => s.categories)
  .forEach((c) => {
    const key = c.toLowerCase()
    if (NOT_TOPICS.has(key)) return
    const entry = topicCounts.get(key) ?? { label: c, count: 0 }
    // Show the best-cased spelling ("DevOps" over "devops")
    if (capitals(c) > capitals(entry.label)) entry.label = c
    entry.count += 1
    topicCounts.set(key, entry)
  })
const topTopics = [...topicCounts.values()]
  .sort((a, b) => b.count - a.count)
  .slice(0, TOPIC_CHIPS)
  .map((t) => t.label)

const hasTopic = (speaker, topic) =>
  speaker.categories.some((c) => c.toLowerCase() === topic.toLowerCase())

const searchText = (s) =>
  [
    s.name,
    s.organization,
    s.position,
    ...s.categories,
    ...s.sessions.map((sess) => sess.title),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

const SEARCH_INDEX = new Map(byActivity.map((s) => [s.slug, searchText(s)]))

const COMMUNITIES = partnersData.organizations

const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

function SectionHeader({ id, eyebrow, title, children }) {
  return (
    <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-devfest-blue-ink dark:text-devfest-ht-blue">
        {eyebrow}
      </p>
      <h2
        id={`${id}-title`}
        className="font-orbitron text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl"
      >
        {title}
      </h2>
      {children && (
        <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-300">
          {children}
        </p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  id: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function SpeakerCard({ speaker }) {
  const latest = speaker.sessions[0]
  return (
    <li className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-devfest-blue-ink hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-4">
        {speaker.avatar ? (
          <img
            src={sanityImage(speaker.avatar, { w: 128, h: 128 })}
            alt=""
            className="size-16 shrink-0 rounded-2xl bg-gray-200 object-cover"
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-devfest-pastel-blue font-bold text-devfest-blue-ink dark:bg-devfest-blue/20 dark:text-devfest-ht-blue"
          >
            {initials(speaker.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {speaker.name}
          </h3>
          {speaker.position && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {speaker.position}
            </p>
          )}
          {speaker.organization && (
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {speaker.organization}
            </p>
          )}
        </div>
      </div>

      {latest && (
        <p className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <span className="mb-0.5 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Latest talk · {latest.year}
          </span>
          &ldquo;{latest.title}&rdquo;
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {speaker.sessions.length} talk
          {speaker.sessions.length === 1 ? '' : 's'} ·{' '}
          {speaker.yearsActive.join(', ')}
        </span>
        <Link
          to={`/speakers/${speaker.slug}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-devfest-blue-ink hover:underline dark:text-devfest-ht-blue"
        >
          Profile
          <span className="sr-only"> for {speaker.name}</span>
          <FaArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>
    </li>
  )
}

SpeakerCard.propTypes = {
  speaker: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    position: PropTypes.string,
    organization: PropTypes.string,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string, year: PropTypes.number })
    ).isRequired,
    yearsActive: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
}

function SpeakerDirectory() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('')
  const [year, setYear] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return byActivity.filter(
      (s) =>
        (!q || SEARCH_INDEX.get(s.slug).includes(q)) &&
        (!topic || hasTopic(s, topic)) &&
        (!year || s.yearsActive.includes(Number(year)))
    )
  }, [query, topic, year])

  const filtered = query || topic || year
  const reset = () => {
    setQuery('')
    setTopic('')
    setYear('')
    setVisible(PAGE_SIZE)
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="speaker-search" className="sr-only">
            Search speakers, companies or talks
          </label>
          <FaMagnifyingGlass
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
          <input
            id="speaker-search"
            type="search"
            placeholder="Search speakers, companies or talks"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-base shadow-sm focus:border-devfest-blue-ink dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="speaker-year" className="sr-only">
            Filter by year
          </label>
          <select
            id="speaker-year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:flex-none"
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <Link
            to="/speakers"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-devfest-blue-ink px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800"
          >
            Full directory{' '}
            <FaArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by topic"
      >
        {topTopics.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={topic === t}
            onClick={() => {
              setTopic(topic === t ? '' : t)
              setVisible(PAGE_SIZE)
            }}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
              topic === t
                ? 'border-devfest-blue-ink bg-devfest-blue-ink text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-devfest-blue-ink dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p
          className="text-sm text-gray-600 dark:text-gray-300"
          aria-live="polite"
        >
          {filtered
            ? `${results.length} of ${speakers.length} speakers match`
            : `Most active of ${speakers.length} speakers`}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-sm font-bold text-devfest-blue-ink hover:underline dark:text-devfest-ht-blue"
          >
            <FaXmark className="size-3" aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      {results.length ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, visible).map((s) => (
            <SpeakerCard key={s.slug} speaker={s} />
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white">
            No speakers match those filters
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Try a broader search or another topic.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-900 hover:border-devfest-blue-ink dark:border-gray-700 dark:text-white"
          >
            Clear filters
          </button>
        </div>
      )}

      {visible < results.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:border-devfest-blue-ink dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            Show more speakers ({results.length - visible} left)
          </button>
        </div>
      )}
    </>
  )
}

const GOALS = [
  'Find a mentor',
  'Become a mentor',
  'Volunteer at an event',
  'Speak at a future event',
]

// No backend yet: the request opens the visitor's email app, prefilled
function InvolvementForm() {
  const [opened, setOpened] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const goal = data.get('goal')
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Interested in: ${goal}`,
      '',
      data.get('note') || '',
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?${new URLSearchParams({
      subject: `Community Hub: ${goal}`,
      body,
    })
      .toString()
      .replace(/\+/g, '%20')}`
    setOpened(true)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      aria-labelledby="involve-form-title"
    >
      <h3
        id="involve-form-title"
        className="text-lg font-bold text-gray-900 dark:text-white"
      >
        Tell us how you want to help
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        This opens your email app with your note filled in, addressed to the
        Compass Detroit organizers.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="involve-name"
            className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Name
          </label>
          <input
            id="involve-name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="involve-email"
            className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            id="involve-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="involve-goal"
            className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            I&apos;d like to
          </label>
          <select
            id="involve-goal"
            name="goal"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {GOALS.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="involve-note"
            className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Anything we should know?{' '}
            <span className="font-normal">(optional)</span>
          </label>
          <textarea
            id="involve-note"
            name="note"
            rows={3}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-gray-950 shadow transition-colors hover:bg-primary-400 sm:w-auto"
      >
        Open email to send
      </button>
      <p
        className="mt-3 text-sm text-gray-600 dark:text-gray-300"
        aria-live="polite"
      >
        {opened && (
          <>
            Your email app should have opened. If it didn&apos;t, write to{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-devfest-blue-ink underline dark:text-devfest-ht-blue"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </form>
  )
}

const WAYS_TO_HELP = [
  {
    icon: FaHandHoldingHeart,
    title: 'Volunteer at DevFest',
    desc: `Help run check-in, rooms and the hackathon on ${DEVFEST_2026.shortDateLabel} in Greektown.`,
  },
  {
    icon: FaChalkboardUser,
    title: 'Mentor or find a mentor',
    desc: 'We pair people across our partner communities for career and technical guidance.',
  },
  {
    icon: FaMicrophone,
    title: 'Speak at a future event',
    desc: 'The DevFest 2026 call for speakers has closed. Tell us your topic for the next one.',
  },
  {
    icon: FaHandshake,
    title: 'Partner with us',
    desc: 'Sponsor an event, host a meetup or bring your community into the network.',
    href: 'mailto:sponsors@midevfest.com',
    cta: 'Email the partnerships team',
  },
]

export default function CommunityHubPage() {
  const stats = [
    { value: getTotalSpeakerCount(), label: 'Speakers' },
    { value: talkCount, label: 'Talks' },
    { value: COMMUNITIES.length, label: 'Partner communities' },
    {
      value: yearRange.latest - yearRange.earliest + 1,
      label: `Years (${yearRange.earliest}–${yearRange.latest})`,
    },
  ]

  return (
    <SiteLayout>
      <div className="relative bg-white dark:bg-gray-950">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-primary/10 via-devfest-blue/5 to-transparent"
          aria-hidden="true"
        />

        <section className="relative pb-12 pt-20 text-center sm:pt-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
              <FaCompass
                className="size-4 text-devfest-blue-ink dark:text-devfest-ht-blue"
                aria-hidden="true"
              />
              Compass Detroit Community Hub
            </p>
            <h1 className="font-orbitron text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Detroit&apos;s tech community, in one place
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Find speakers and their talks, meet the communities behind our
              events, see what&apos;s coming up and pick a way to get involved.
            </p>

            <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col-reverse rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <dt className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {s.label}
                  </dt>
                  <dd className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <nav aria-label="Community Hub sections" className="mt-10">
              <ul className="flex flex-wrap justify-center gap-2">
                {SECTIONS.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={DEVFEST_2026.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-between gap-2 rounded-2xl bg-[#0b1633] px-5 py-4 text-left text-white transition-transform hover:-translate-y-0.5 motion-reduce:transition-none sm:flex-row"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-primary">
                  {DEVFEST_2026.shortDateLabel} · {DEVFEST_2026.venue}
                </span>
                <span className="font-bold">
                  Michigan DevFest &apos;26 tickets are on sale
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-gray-950">
                Get tickets{' '}
                <FaArrowRight className="size-3" aria-hidden="true" />
              </span>
            </a>
          </div>
        </section>

        <div className="relative mx-auto max-w-7xl space-y-24 px-4 pb-24 sm:px-6 lg:px-8">
          <section
            id="speakers"
            aria-labelledby="speakers-title"
            className="scroll-mt-24"
          >
            <SectionHeader
              id="speakers"
              eyebrow="Speaker network"
              title="Learn from people who've taken the stage"
            >
              Everyone who has spoken at Compass Detroit events since{' '}
              {yearRange.earliest}. Search by name, company, talk title or
              topic.
            </SectionHeader>
            <SpeakerDirectory />
          </section>

          <section
            id="communities"
            aria-labelledby="communities-title"
            className="scroll-mt-24"
          >
            <SectionHeader
              id="communities"
              eyebrow="Partner communities"
              title="The groups that make it happen"
            >
              Meetups, student chapters and professional societies that
              co-organize our events. Visit one to find their next meetup.
            </SectionHeader>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {COMMUNITIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-devfest-blue-ink motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <span
                      className={`grid size-16 place-items-center rounded-full p-2 ${
                        c.darkLogo
                          ? 'bg-[#0b1633]'
                          : 'bg-white ring-1 ring-gray-200 dark:ring-gray-700'
                      }`}
                    >
                      <img
                        src={c.logo}
                        alt=""
                        loading="lazy"
                        className="size-full object-contain"
                      />
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {c.name}
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="events"
            aria-labelledby="events-title"
            className="scroll-mt-24"
          >
            <SectionHeader
              id="events"
              eyebrow="Upcoming"
              title="What's on the calendar"
            >
              Meetups, workshops and summits from across the network.
            </SectionHeader>
            <CommunityCalendar />
          </section>

          <section
            id="get-involved"
            aria-labelledby="get-involved-title"
            className="scroll-mt-24"
          >
            <SectionHeader
              id="get-involved"
              eyebrow="Get involved"
              title="Find your way in"
            >
              Compass Detroit runs on volunteers, mentors and partners. Pick
              what fits and we&apos;ll follow up by email.
            </SectionHeader>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                {WAYS_TO_HELP.map(({ icon: Icon, title, desc, href, cta }) => (
                  <li
                    key={title}
                    className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <Icon
                      className="mb-3 size-6 text-devfest-blue-ink dark:text-devfest-ht-blue"
                      aria-hidden="true"
                    />
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {desc}
                    </p>
                    {href && (
                      <a
                        href={href}
                        className="mt-3 text-sm font-bold text-devfest-blue-ink hover:underline dark:text-devfest-ht-blue"
                      >
                        {cta}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="lg:col-span-6">
                <InvolvementForm />
              </div>
            </div>
          </section>

          <section
            id="careers"
            aria-labelledby="careers-title"
            className="scroll-mt-24"
          >
            <SectionHeader
              id="careers"
              eyebrow="Careers"
              title="Openings from our partners"
            >
              Partners who share their openings with our community.
            </SectionHeader>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {jobBoardData.map((job) => (
                <li key={job.id}>
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-devfest-blue-ink dark:border-gray-800 dark:bg-gray-900"
                  >
                    <img
                      src={job.logo}
                      alt=""
                      loading="lazy"
                      className="h-12 w-full object-contain"
                    />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {job.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      View openings
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                to="/careers-hub"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-devfest-blue-ink hover:underline dark:text-devfest-ht-blue"
              >
                Explore the Careers Hub{' '}
                <FaArrowRight className="size-3" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
