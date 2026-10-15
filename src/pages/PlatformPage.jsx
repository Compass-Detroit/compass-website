import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import { CONNECTORS } from '@/services/connectors'
import { groq, LHM_LIVE_QUERY, sanityImage } from '@/services/sanity'
import { useResource } from '@/hooks/useResource'
import { LHM_SESSIONS } from '@/data/2026/lhmSummit'
import speakersExport from '@/data/2026/lhm/speakers.json'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { getAllSpeakers } from '@/utils/speakerRegistry'

const STATUS = {
  checking: {
    label: 'Checking',
    dot: 'bg-gray-400 motion-safe:animate-pulse',
    text: 'text-gray-400',
  },
  live: { label: 'Live', dot: 'bg-emerald-400', text: 'text-emerald-300' },
  local: {
    label: 'Local adapter',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
  },
  planned: { label: 'Planned', dot: 'bg-sky-400', text: 'text-sky-300' },
  offline: { label: 'Unreachable', dot: 'bg-rose-500', text: 'text-rose-300' },
}

const LAYERS = [
  {
    title: 'Sources',
    items: [
      'Sanity (per-event projects)',
      'Google Calendar',
      'Vercel Analytics',
      'Email provider',
      'Blob storage',
    ],
  },
  {
    title: 'Service layer',
    items: [
      'src/services/* adapters',
      'useResource + snapshot fallback',
      'api/* serverless functions',
      'Build-time sync scripts',
    ],
  },
  {
    title: 'Experiences',
    items: [
      'Speaker directory',
      'Event archive & recaps',
      'Community calendar',
      'Navigator journeys',
      'Team tools',
    ],
  },
]

function useConnectorStatuses() {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(
      CONNECTORS.map((c) => [c.id, { status: c.probe ? 'checking' : c.status }])
    )
  )

  useEffect(() => {
    const controller = new AbortController()
    for (const connector of CONNECTORS.filter((c) => c.probe)) {
      connector
        .probe(controller.signal)
        .then((result) => ({ status: 'live', result }))
        .catch((error) => {
          console.warn(`${connector.name} probe failed:`, error)
          return {
            status: 'offline',
            result:
              'Couldn’t reach this source just now. Pages fall back to their bundled copy.',
          }
        })
        .then((next) => {
          if (!controller.signal.aborted)
            setStatuses((prev) => ({ ...prev, [connector.id]: next }))
        })
    }
    return () => controller.abort()
  }, [])

  return statuses
}

function ConnectorCard({ connector, state }) {
  const status = STATUS[state.status]
  return (
    <li className="flex h-full flex-col rounded-2xl border border-surface bg-surface-card p-5 transition-colors hover:border-primary/30">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-theme-muted">
          {connector.kind}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${status.text}`}
        >
          <span
            className={`size-2 rounded-full ${status.dot}`}
            aria-hidden="true"
          />
          {status.label}
        </span>
      </div>
      <h3 className="text-lg font-bold text-theme-primary">{connector.name}</h3>
      <p className="mt-1 text-sm text-theme-secondary">{connector.detail}</p>
      {state.result && (
        <p className="mt-3 font-mono text-xs tabular-nums text-theme-secondary">
          {state.result}
        </p>
      )}
      {state.status !== 'live' && connector.next && (
        <p className="mt-3 text-xs text-theme-muted">
          <span className="font-semibold text-theme-secondary">Next:</span>{' '}
          {connector.next}
        </p>
      )}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {connector.feeds.map((feed) => (
          <li
            key={feed}
            className="rounded-md bg-surface-elevated px-2 py-0.5 text-xs text-theme-secondary"
          >
            {feed}
          </li>
        ))}
      </ul>
    </li>
  )
}

ConnectorCard.propTypes = {
  connector: PropTypes.object.isRequired,
  state: PropTypes.shape({
    status: PropTypes.string.isRequired,
    result: PropTypes.string,
  }).isRequired,
}

// Drift is measured against the raw Sanity export, not LHM_SESSIONS, which
// carries deliberate post-event program edits (see lhmSummit.js)
const exportTitles = new Set(
  speakersExport.map((row) => row.session?.title).filter(Boolean)
)

// Sanity sends ISO datetimes; the snapshot already holds "HH:mm"
const formatTime = (value) => {
  if (!value || /^\d{1,2}:\d{2}$/.test(value)) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Detroit',
  })
}

const initials = (name = '') =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const snapshotSessions = LHM_SESSIONS.map((s) => ({
  title: s.title,
  startTime: s.time,
  speakers: s.participants?.map(({ name, avatar }) => ({ name, avatar })) ?? [],
}))

function LiveContentPreview() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { status, data } = useResource(
    `lhm-${refreshKey}`,
    (signal) =>
      groq(LHM_LIVE_QUERY, { year: 2026 }, { project: 'lhm2026', signal }).then(
        ({ result, ms }) => ({ sessions: result.sessions, ms })
      ),
    { sessions: snapshotSessions, ms: null }
  )

  let drift = 0
  if (status === 'live') {
    const liveTitles = new Set(data.sessions.map((s) => s.title))
    drift =
      [...liveTitles].filter((t) => !exportTitles.has(t)).length +
      [...exportTitles].filter((t) => !liveTitles.has(t)).length
  }

  return (
    <div className="min-w-0 rounded-2xl border border-surface bg-surface-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface p-5">
        <div>
          <h3 className="font-bold text-theme-primary">
            LHM Summit 2026 · sessions
          </h3>
          <p className="text-xs text-theme-secondary" role="status">
            {status === 'loading' && 'Querying Sanity…'}
            {status === 'live' &&
              `Live from Sanity in ${data.ms}ms — ${
                drift
                  ? `${drift} session change${
                      drift === 1 ? '' : 's'
                    } since the last export`
                  : 'snapshot in sync'
              }`}
            {status === 'fallback' &&
              'Sanity unreachable — showing the bundled snapshot'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          disabled={status === 'loading'}
          className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20 disabled:cursor-wait disabled:text-gray-400"
        >
          Refresh
        </button>
      </div>
      <ol className="divide-y divide-surface">
        {data.sessions.map((session) => (
          <li
            key={session._id ?? `${session.startTime}-${session.title}`}
            className="flex items-center gap-4 p-4"
          >
            <span className="w-16 shrink-0 font-mono text-xs tabular-nums text-primary">
              {formatTime(session.startTime)}
            </span>
            <span className="min-w-0 grow text-sm text-theme-secondary">
              {session.title}
            </span>
            <span className="flex shrink-0 -space-x-2">
              {session.speakers?.slice(0, 3).map((speaker) =>
                speaker.avatar ? (
                  <img
                    key={speaker.name}
                    src={sanityImage(speaker.avatar, { w: 64, h: 64 })}
                    alt={speaker.name}
                    title={speaker.name}
                    width="28"
                    height="28"
                    loading="lazy"
                    className="size-7 rounded-full border-2 border-[var(--surface-card)] object-cover"
                  />
                ) : (
                  <span
                    key={speaker.name}
                    role="img"
                    aria-label={speaker.name}
                    title={speaker.name}
                    className="grid size-7 place-items-center rounded-full border-2 border-[var(--surface-card)] bg-surface-elevated text-[0.625rem] font-bold text-theme-primary"
                  >
                    {initials(speaker.name)}
                  </span>
                )
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Speakers active in more than one year, most seasoned first
const veterans = getAllSpeakers()
  .filter((s) => s.yearsActive.length > 1)
  .sort(
    (a, b) =>
      b.yearsActive.length - a.yearsActive.length ||
      b.sessions.length - a.sessions.length
  )

function JourneyPreview() {
  const [slug, setSlug] = useState(() => veterans[0].slug)
  const person = veterans.find((s) => s.slug === slug)

  const byYear = person.yearsActive
    .map((year) => ({
      year,
      sessions: person.sessions.filter((s) => s.year === year),
    }))
    .reverse()
  const spokeThisYear = person.yearsActive.includes(2026)

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <div className="rounded-2xl border border-surface bg-surface-card p-6">
        <label
          htmlFor="journey-speaker"
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-theme-secondary"
        >
          Preview as
        </label>
        <select
          id="journey-speaker"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mb-6 w-full rounded-lg border border-surface bg-surface px-3 py-2 text-sm text-theme-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {veterans.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} · {s.yearsActive.length} years
            </option>
          ))}
        </select>
        <div className="flex items-center gap-4">
          {person.avatar && (
            <img
              src={sanityImage(person.avatar, { w: 160, h: 160 })}
              alt=""
              width="64"
              height="64"
              className="size-16 rounded-full object-cover ring-2 ring-primary/50"
            />
          )}
          <div>
            <div className="text-lg font-bold text-theme-primary">
              {person.name}
            </div>
            <div className="text-sm text-theme-secondary">
              {[person.position, person.organization]
                .filter(Boolean)
                .join(' · ')}
            </div>
          </div>
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-surface pt-4 text-center">
          <div>
            <dt className="text-xs font-bold uppercase text-theme-muted">
              Years
            </dt>
            <dd className="text-xl font-black tabular-nums text-theme-primary">
              {person.yearsActive.length}
            </dd>
          </div>
          <div className="border-x border-surface">
            <dt className="text-xs font-bold uppercase text-theme-muted">
              Talks
            </dt>
            <dd className="text-xl font-black tabular-nums text-theme-primary">
              {person.sessions.length}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase text-theme-muted">
              Topics
            </dt>
            <dd className="text-xl font-black tabular-nums text-theme-primary">
              {person.categories.length}
            </dd>
          </div>
        </dl>
        <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Next for you
          </div>
          <p className="mt-1 text-sm text-theme-secondary">
            {spokeThisYear
              ? `You spoke this year. Catch up with fellow speakers at ${DEVFEST_2026.name}, ${DEVFEST_2026.shortDateLabel} at ${DEVFEST_2026.venue}.`
              : `${DEVFEST_2026.name} is ${DEVFEST_2026.shortDateLabel} at ${DEVFEST_2026.venue}. Grab a ticket and come connect.`}
          </p>
        </div>
        <Link
          to={`/speakers/${person.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Full speaker profile →
        </Link>
      </div>

      <ol className="relative space-y-6 border-l border-surface pl-6">
        {byYear.map(({ year, sessions }) => (
          <li key={year} className="relative">
            <span className="absolute left-[-1.83rem] top-1 size-3 rounded-full bg-primary ring-4 ring-primary/20" />
            <div className="text-2xl font-black tabular-nums text-theme-primary">
              {year}
            </div>
            <ul className="mt-2 space-y-2">
              {sessions.map((session, i) => (
                <li
                  key={`${session.title}-${i}`}
                  className="rounded-lg border border-surface bg-surface-card px-4 py-3"
                >
                  <div className="text-sm font-semibold text-theme-secondary">
                    {session.title}
                  </div>
                  <div className="mt-0.5 text-xs text-theme-muted">
                    {[session.event, session.track].filter(Boolean).join(' · ')}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function PlatformPage() {
  const statuses = useConnectorStatuses()
  const live = Object.values(statuses).filter((s) => s.status === 'live').length

  return (
    <SiteLayout>
      <div className="accent-contrast">
        <section className="relative overflow-hidden bg-surface pb-16 pt-32 md:pt-40">
          <div className="hero-grid-pattern pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[1200px] px-6">
            <span className="mb-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Platform Preview
            </span>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-theme-primary md:text-6xl">
              One content graph for every{' '}
              <span className="bg-gradient-to-r from-primary via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Compass experience
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-theme-secondary">
              Each summit site already publishes to its own Sanity project. This
              page connects to them live, shows what is wired up today, and
              previews what members get once everything flows through one layer.
            </p>
            <p
              className="mt-4 text-sm tabular-nums text-theme-muted"
              role="status"
            >
              {live} of {CONNECTORS.length} connectors live
            </p>
          </div>
        </section>

        <section
          aria-labelledby="connectors-title"
          className="bg-surface py-12"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <h2
              id="connectors-title"
              className="mb-6 text-2xl font-bold text-theme-primary"
            >
              Connectors
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONNECTORS.map((connector) => (
                <ConnectorCard
                  key={connector.id}
                  connector={connector}
                  state={statuses[connector.id]}
                />
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="live-title" className="bg-surface py-12">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[2fr_3fr]">
            <div className="min-w-0">
              <h2
                id="live-title"
                className="text-2xl font-bold text-theme-primary"
              >
                Live content, static safety net
              </h2>
              <p className="mt-3 text-theme-secondary">
                Pages render from a bundled snapshot first, then reconcile with
                the CMS. If Sanity is down the site still works; when organizers
                edit a session, the change shows up here without a deploy.
              </p>
              <pre className="mt-6 overflow-x-auto rounded-xl border border-surface bg-surface-card p-4 text-xs leading-relaxed text-theme-secondary">
                <code>{`const { status, data } = useResource(
  'lhm-sessions',
  (signal) => groq(LHM_LIVE_QUERY, { year: 2026 },
    { project: 'lhm2026', signal }),
  snapshot
)`}</code>
              </pre>
            </div>
            <LiveContentPreview />
          </div>
        </section>

        {veterans.length > 0 && (
          <section aria-labelledby="journey-title" className="bg-surface py-12">
            <div className="mx-auto max-w-[1200px] px-6">
              <h2
                id="journey-title"
                className="text-2xl font-bold text-theme-primary"
              >
                Navigator journeys
              </h2>
              <p className="mb-8 mt-3 max-w-2xl text-theme-secondary">
                Joining speaker data across DevFest and every summit gives each
                person a history and a next step. With member sign-in, the same
                view covers attendees, volunteers and mentors.
              </p>
              <JourneyPreview />
            </div>
          </section>
        )}

        <section
          aria-labelledby="arch-title"
          className="bg-surface pb-24 pt-12"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <h2
              id="arch-title"
              className="mb-8 text-2xl font-bold text-theme-primary"
            >
              How it fits together
            </h2>
            <ol className="grid gap-4 md:grid-cols-3">
              {LAYERS.map((layer, i) => (
                <li
                  key={layer.title}
                  className="relative rounded-2xl border border-surface bg-surface-card p-6"
                >
                  <div className="mb-1 font-mono text-xs text-primary">
                    0{i + 1}
                  </div>
                  <h3 className="mb-4 text-lg font-bold text-theme-primary">
                    {layer.title}
                  </h3>
                  <ul className="space-y-2">
                    {layer.items.map((item) => (
                      <li key={item} className="text-sm text-theme-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}
