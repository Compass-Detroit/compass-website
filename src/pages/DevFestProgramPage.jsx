import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  FaMagnifyingGlass,
  FaStar,
  FaRegStar,
  FaXmark,
  FaArrowDown,
} from 'react-icons/fa6'
import SiteLayout from '@/layouts/SiteLayout'
import SessionDialog from '@/components/devfest/SessionDialog'
import SpeakerGlobe from '@/components/devfest/SpeakerGlobe'
import useRevealOnScroll from '@/components/devfest/useRevealOnScroll'
import {
  DEVFEST_DAYS,
  DEVFEST_PROGRAM_STATS,
  DEVFEST_RUN_OF_SHOW,
  DEVFEST_SESSIONS,
  DEVFEST_SPEAKERS,
  DEVFEST_TOPICS,
  DEVFEST_TRACKS,
  formatTime,
} from '@/data/2026/devfestProgram'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { sanityImage } from '@/services/sanity'
import {
  TONE_HEX,
  clashesWith,
  eventPhase,
  liveDay,
  phaseLabel,
  sessionDate,
  useMySchedule,
  useNow,
} from '@/components/devfest/programUtils'

const chipClass = (active) =>
  `whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
    active
      ? 'border-primary bg-primary text-gray-950'
      : 'border-surface bg-surface-card text-theme-secondary hover:border-primary/50'
  }`

const SESSION_BY_ID = Object.fromEntries(DEVFEST_SESSIONS.map((s) => [s.id, s]))

const DAY_META = {
  hackathon: { weekday: 'Friday', numeral: '13', hex: TONE_HEX.yellow },
  conference: { weekday: 'Saturday', numeral: '14', hex: TONE_HEX.blue },
}

const matchesQuery = (session, q) =>
  !q ||
  [
    session.title,
    session.abstract,
    session.track,
    ...session.tags,
    ...session.speakers.flatMap((p) => [p.name, p.organization]),
  ]
    .join(' ')
    .toLowerCase()
    .includes(q.toLowerCase())

const scrollToId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function Faces({ people }) {
  return (
    <span className="flex shrink-0 -space-x-2">
      {people.slice(0, 4).map((p) =>
        p.avatar ? (
          <img
            key={p.slug}
            src={sanityImage(p.avatar, { w: 72, h: 72 })}
            alt=""
            loading="lazy"
            className="size-7 rounded-full border-2 border-[var(--surface-card)] object-cover"
          />
        ) : (
          <span
            key={p.slug}
            className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--surface-card)] bg-surface-elevated text-[10px] font-bold"
          >
            {p.name[0]}
          </span>
        )
      )}
    </span>
  )
}

Faces.propTypes = { people: PropTypes.array.isRequired }

function StarButton({ session, saved, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(session.id)}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remove' : 'Save'} ${session.title} ${
        saved ? 'from' : 'to'
      } my schedule`}
      className={`relative z-[1] -m-1.5 shrink-0 rounded-full p-1.5 transition-colors ${
        saved ? 'text-primary' : 'text-theme-muted hover:text-theme-primary'
      }`}
    >
      {saved ? <FaStar aria-hidden="true" /> : <FaRegStar aria-hidden="true" />}
    </button>
  )
}

StarButton.propTypes = {
  session: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

/** Schedule card: track colour on the left edge, speakers up front. */
function SessionCard({ session, saved, onOpen, onToggleSave, showTrack }) {
  const hex = TONE_HEX[session.tone]
  return (
    <article
      className="group relative flex h-full flex-col rounded-xl border border-surface bg-surface-card p-4 pl-5 transition-colors duration-200 hover:border-primary/50"
      style={{ boxShadow: `inset 4px 0 0 ${hex}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tabular-nums text-theme-muted">
          {formatTime(session.time)} – {formatTime(session.timeEnd)}
          {showTrack && (
            <>
              {' · '}
              <span className="font-bold text-theme-secondary">
                {session.track}
              </span>
            </>
          )}
        </p>
        <StarButton session={session} saved={saved} onToggle={onToggleSave} />
      </div>
      <h4 className="mt-1.5 font-bold leading-snug">
        <button
          type="button"
          onClick={() => onOpen(session.id)}
          className="text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none group-focus-within:underline"
        >
          {session.title}
        </button>
      </h4>
      <div className="mt-auto flex items-center gap-2.5 pt-3">
        <Faces people={session.speakers} />
        <p className="min-w-0 truncate text-sm text-theme-secondary">
          {session.speakers.map((p) => p.name).join(', ')}
        </p>
      </div>
    </article>
  )
}

SessionCard.propTypes = {
  session: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleSave: PropTypes.func.isRequired,
  showTrack: PropTypes.bool,
}

function SharedBlock({ block, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-xl border border-dashed border-surface px-4 py-2.5 text-sm ${className}`}
    >
      <span className="font-semibold">{block.title}</span>
      <span className="tabular-nums text-theme-muted">
        {formatTime(block.time)} – {formatTime(block.timeEnd)}
      </span>
      {block.note && <span className="text-theme-muted">{block.note}</span>}
    </div>
  )
}

SharedBlock.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
}

/** Friday: one track, so a vertical run-of-show. */
function HackathonTimeline({ items, saved, onOpen, onToggleSave }) {
  return (
    <ol className="relative ml-2 space-y-4 border-l-2 border-dashed border-devfest-yellow/60 pl-6 md:ml-28">
      {items.map((item) => (
        <li key={item.id} className="relative" data-reveal-item>
          <span
            aria-hidden="true"
            className={`absolute top-4 rounded-full ring-4 ring-[var(--surface)] ${
              item.speakers.length
                ? 'left-[-33px] size-4 bg-devfest-yellow'
                : 'left-[-31px] size-3 bg-gray-400'
            }`}
          />
          <p className="mb-1.5 text-sm font-extrabold tabular-nums md:absolute md:-left-32 md:top-3 md:mb-0 md:w-20 md:text-right">
            {formatTime(item.time)}
          </p>
          {item.speakers.length ? (
            <div className="max-w-2xl">
              <SessionCard
                session={item}
                saved={saved.has(item.id)}
                onOpen={onOpen}
                onToggleSave={onToggleSave}
              />
            </div>
          ) : (
            <SharedBlock block={item} className="max-w-2xl" />
          )}
        </li>
      ))}
    </ol>
  )
}

HackathonTimeline.propTypes = {
  items: PropTypes.array.isRequired,
  saved: PropTypes.instanceOf(Set).isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleSave: PropTypes.func.isRequired,
}

/** Saturday on desktop: tracks across, time down; long workshops span rows. */
function TrackGrid({ tracks, talks, blocks, saved, onOpen, onToggleSave }) {
  const times = [...new Set([...talks, ...blocks].map((s) => s.time))].sort()
  const row = (time) => times.indexOf(time) + 2
  const span = (s) =>
    times.filter((t) => t >= s.time && t < s.timeEnd).length || 1

  return (
    <div
      className="hidden gap-3 xl:grid"
      style={{
        gridTemplateColumns: `5rem repeat(${tracks.length}, minmax(0, 1fr))`,
      }}
    >
      {tracks.map((t, i) => (
        <div
          key={t.name}
          style={{
            gridColumn: i + 2,
            gridRow: 1,
            borderTopColor: TONE_HEX[t.tone],
          }}
          className="rounded-xl border-t-4 bg-surface-card px-3 py-2.5"
          data-reveal-item
        >
          <p className="text-sm font-extrabold">{t.name}</p>
          <p className="mt-0.5 line-clamp-2 text-xs text-theme-muted">
            {t.blurb}
          </p>
        </div>
      ))}
      {times.map((time) => (
        <p
          key={time}
          style={{ gridColumn: 1, gridRow: row(time) }}
          className="pt-2 text-sm font-extrabold tabular-nums"
          data-reveal-item
        >
          {formatTime(time)}
        </p>
      ))}
      {blocks.map((b) => (
        <div
          key={b.title}
          style={{ gridColumn: '2 / -1', gridRow: row(b.time) }}
          data-reveal-item
        >
          <SharedBlock block={b} />
        </div>
      ))}
      {talks.map((s) => (
        <div
          key={s.id}
          style={{
            gridColumn: tracks.findIndex((t) => t.name === s.track) + 2,
            gridRow: `${row(s.time)} / span ${span(s)}`,
          }}
          data-reveal-item
        >
          <SessionCard
            session={s}
            saved={saved.has(s.id)}
            onOpen={onOpen}
            onToggleSave={onToggleSave}
          />
        </div>
      ))}
    </div>
  )
}

TrackGrid.propTypes = {
  tracks: PropTypes.array.isRequired,
  talks: PropTypes.array.isRequired,
  blocks: PropTypes.array.isRequired,
  saved: PropTypes.instanceOf(Set).isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleSave: PropTypes.func.isRequired,
}

/** Saturday on phones and tablets: stacked by time slot. */
function Agenda({ talks, blocks, saved, onOpen, onToggleSave }) {
  const slots = [...new Set([...talks, ...blocks].map((s) => s.time))].sort()
  return (
    <ol className="space-y-6 xl:hidden">
      {slots.map((time) => (
        <li key={time} data-reveal-item>
          <p className="mb-2 text-sm font-extrabold tabular-nums">
            {formatTime(time)}
          </p>
          <div className="space-y-3">
            {blocks
              .filter((b) => b.time === time)
              .map((b) => (
                <SharedBlock key={b.title} block={b} />
              ))}
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {talks
                .filter((s) => s.time === time)
                .map((s) => (
                  <li key={s.id}>
                    <SessionCard
                      session={s}
                      saved={saved.has(s.id)}
                      onOpen={onOpen}
                      onToggleSave={onToggleSave}
                      showTrack
                    />
                  </li>
                ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}

Agenda.propTypes = {
  talks: PropTypes.array.isRequired,
  blocks: PropTypes.array.isRequired,
  saved: PropTypes.instanceOf(Set).isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleSave: PropTypes.func.isRequired,
}

function NowNext({ now, onOpen }) {
  const day = liveDay(now)
  if (!day) return null
  const blocks = [
    ...DEVFEST_SESSIONS.filter((s) => s.day === day),
    ...DEVFEST_RUN_OF_SHOW.filter((b) => b.day === day),
  ]
  const start = (b) => sessionDate(day, b.time).getTime()
  const end = (b) => sessionDate(day, b.timeEnd).getTime()
  const live = blocks.filter((b) => start(b) <= now && now < end(b))
  const upcoming = blocks.filter((b) => start(b) > now)
  const nextTime = upcoming.length
    ? Math.min(...upcoming.map(start))
    : Number.NaN
  const next = upcoming.filter((b) => start(b) === nextTime)

  const item = (b) =>
    b.id ? (
      <li key={b.id}>
        <button
          type="button"
          onClick={() => onOpen(b.id)}
          className="text-left font-semibold hover:text-primary hover:underline"
        >
          {b.title}
        </button>{' '}
        <span className="text-theme-muted">· {b.track}</span>
      </li>
    ) : (
      <li key={b.title} className="font-semibold">
        {b.title}
      </li>
    )

  return (
    <section
      aria-label="Happening now"
      aria-live="polite"
      className="mx-auto mt-8 grid max-w-[1200px] gap-4 px-6 md:grid-cols-2"
    >
      <div className="rounded-2xl border border-devfest-green/50 bg-devfest-green/10 p-5">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-green-800 dark:text-devfest-ht-green">
          <span className="size-2 rounded-full bg-devfest-green motion-safe:animate-ping" />
          Happening now
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {live.length ? (
            live.map(item)
          ) : (
            <li className="text-theme-secondary">Between sessions</li>
          )}
        </ul>
      </div>
      <div className="rounded-2xl border border-surface bg-surface-card p-5">
        <p className="text-xs font-extrabold uppercase tracking-wider text-theme-muted">
          Up next
          {next.length > 0 && ` · ${formatTime(next[0].time)}`}
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {next.length ? (
            next.map(item)
          ) : (
            <li className="text-theme-secondary">That&apos;s a wrap!</li>
          )}
        </ul>
      </div>
    </section>
  )
}

NowNext.propTypes = {
  now: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
}

// Which day section is in view, for the sticky day bar
function useActiveDay() {
  const [active, setActive] = useState('hackathon')
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(e.target.dataset.day)
        ),
      { rootMargin: '-35% 0px -60% 0px' }
    )
    DEVFEST_DAYS.forEach((d) => {
      const el = document.getElementById(`day-${d.id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

export default function DevFestProgramPage() {
  const [params, setParams] = useSearchParams()
  const now = useNow(params.get('now'))
  const { saved, toggle } = useMySchedule()
  const activeDay = useActiveDay()
  const scheduleRef = useRef(null)
  const jumpedToToday = useRef(false)

  const track = params.get('track') ?? ''
  const topic = params.get('topic') ?? ''
  const query = params.get('q') ?? ''
  const mine = params.get('mine') === '1'
  const openSession = SESSION_BY_ID[params.get('session')] ?? null

  const update = useCallback(
    (changes) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(changes)) {
            if (value === '' || value == null || value === false)
              next.delete(key)
            else next.set(key, value === true ? '1' : value)
          }
          return next
        },
        { replace: true }
      ),
    [setParams]
  )

  // On an event day, open straight onto today's schedule
  useEffect(() => {
    const day = liveDay(now)
    if (day && !jumpedToToday.current && !params.get('session')) {
      jumpedToToday.current = true
      scrollToId(`day-${day}`)
    }
  }, [now, params])

  const savedSessions = useMemo(
    () => DEVFEST_SESSIONS.filter((s) => saved.has(s.id)),
    [saved]
  )

  const topicIds = useMemo(
    () =>
      new Set(
        DEVFEST_TOPICS.find((t) => t.id === topic)?.sessions.map((s) => s.id)
      ),
    [topic]
  )

  const filtering = Boolean(track || topic || mine || query)
  const talks = useMemo(
    () =>
      DEVFEST_SESSIONS.filter(
        (s) =>
          s.speakers.length &&
          (!track || s.track === track) &&
          (!topic || topicIds.has(s.id)) &&
          (!mine || saved.has(s.id)) &&
          matchesQuery(s, query)
      ),
    [track, topic, topicIds, mine, saved, query]
  )
  const talksOn = (day) => talks.filter((s) => s.day === day)

  useRevealOnScroll(scheduleRef, `${track}|${topic}|${mine}|${query}`)

  const showcase = useMemo(
    () =>
      DEVFEST_SPEAKERS.filter(
        (p) => !track || p.sessions.some((s) => s.track === track)
      ),
    [track]
  )

  const open = (id) => update({ session: id })
  const phase = eventPhase(now)
  const stats = DEVFEST_PROGRAM_STATS

  return (
    <SiteLayout>
      {/* Hero: the whole lineup on a globe */}
      <section
        aria-labelledby="devfest-program-title"
        className="dark-surface relative overflow-hidden bg-[#05070c] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_50%_at_75%_45%,theme(colors.devfest.blue/24%),transparent_70%),radial-gradient(40%_40%_at_8%_95%,theme(colors.devfest.green/16%),transparent_70%),radial-gradient(30%_35%_at_98%_98%,theme(colors.devfest.red/14%),transparent_70%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1.5">
          {[
            'bg-devfest-blue',
            'bg-devfest-red',
            'bg-devfest-yellow',
            'bg-devfest-green',
          ].map((c) => (
            <span key={c} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-6 px-6 pb-10 pt-14 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-devfest-green/40 bg-devfest-green/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-devfest-ht-green">
              <span className="size-2 rounded-full bg-devfest-ht-green motion-safe:animate-pulse" />
              {phaseLabel(phase)}
            </p>
            <h1
              id="devfest-program-title"
              className="mt-5 text-[2.6rem] font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
            >
              {stats.speakers} speakers.
              <br />
              <span className="bg-gradient-to-r from-devfest-ht-blue via-devfest-ht-green to-devfest-ht-yellow bg-clip-text text-transparent">
                Two days of building.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Michigan DevFest ’26 lands in Greektown{' '}
              {DEVFEST_2026.shortDateLabel}. Friday you ship something with AI.
              Saturday you choose from {stats.talks} talks on agents, Gemini,
              design, security and leading teams.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {DEVFEST_DAYS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => scrollToId(`day-${d.id}`)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-left backdrop-blur transition-colors hover:border-white/40 hover:bg-white/[0.09]"
                >
                  <span
                    className="text-5xl font-black tabular-nums leading-none"
                    style={{ color: DAY_META[d.id].hex }}
                  >
                    {DAY_META[d.id].numeral}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-white/60">
                      {DAY_META[d.id].weekday} · Nov
                    </span>
                    <span className="block text-lg font-extrabold text-white">
                      {d.title}
                    </span>
                    <span className="block text-sm text-white/70">
                      {d.id === 'hackathon'
                        ? 'Workshops, hacking, demos, prizes'
                        : `${stats.talks} talks · ${stats.tracks} tracks`}
                    </span>
                  </span>
                  <FaArrowDown
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-white/40 transition-transform group-hover:translate-y-0.5 group-hover:text-white"
                  />
                </button>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={DEVFEST_2026.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-gray-950 transition-transform hover:scale-[1.03] motion-reduce:hover:scale-100"
              >
                Get tickets
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToId('speakers')}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white"
              >
                Meet the speakers
              </button>
            </div>
          </div>

          <div className="-order-1 mx-auto w-full max-w-[380px] lg:order-none lg:max-w-none">
            <SpeakerGlobe
              speakers={DEVFEST_SPEAKERS}
              onSelect={(p) => open(p.sessions[0].id)}
            />
          </div>
        </div>
      </section>

      <NowNext now={now} onOpen={open} />

      {/* Speakers, photo first */}
      <section
        id="speakers"
        aria-labelledby="speakers-title"
        className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-16"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-theme-muted">
          The lineup
        </p>
        <h2
          id="speakers-title"
          className="mt-2 text-3xl font-black tracking-tight md:text-4xl"
        >
          Meet the speakers
        </h2>
        <p className="mt-2 max-w-xl text-theme-secondary">
          Engineers, founders, designers and researchers from{' '}
          {stats.organizations} organizations. Tap anyone to read their session.
        </p>

        <div
          className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none]"
          role="group"
          aria-label="Filter by track"
        >
          <button
            type="button"
            aria-pressed={!track}
            onClick={() => update({ track: '' })}
            className={chipClass(!track)}
          >
            All tracks
          </button>
          {DEVFEST_TRACKS.map((t) => (
            <button
              key={t.name}
              type="button"
              aria-pressed={track === t.name}
              onClick={() => update({ track: track === t.name ? '' : t.name })}
              className={`inline-flex items-center gap-2 ${chipClass(
                track === t.name
              )}`}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ background: TONE_HEX[t.tone] }}
              />
              {t.name}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {showcase.map((p) => {
            const talk =
              p.sessions.find((s) => !track || s.track === track) ??
              p.sessions[0]
            const hex = TONE_HEX[talk.tone]
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => open(talk.id)}
                  className="group flex size-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface-card text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-xl"
                >
                  <span className="relative isolate block aspect-[4/5] overflow-hidden bg-surface-elevated">
                    {p.avatar ? (
                      <img
                        src={sanityImage(p.avatar, { w: 480, h: 600 })}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center text-5xl font-black text-theme-muted">
                        {p.name[0]}
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-14">
                      <span className="block text-base font-extrabold leading-tight text-white md:text-lg">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-white/80">
                        {p.organization}
                      </span>
                    </span>
                    <span
                      className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-950"
                      style={{ background: hex }}
                    >
                      {talk.track}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-3.5">
                    <span className="line-clamp-3 text-sm font-bold leading-snug">
                      {talk.title}
                    </span>
                    <span className="mt-auto pt-2 text-xs font-semibold tabular-nums text-theme-muted">
                      {DAY_META[talk.day].weekday} · {formatTime(talk.time)}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Schedule */}
      <section
        id="schedule"
        aria-labelledby="schedule-title"
        className="border-t border-surface"
      >
        <div className="mx-auto max-w-[1200px] px-6 pt-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-theme-muted">
            Schedule
          </p>
          <h2
            id="schedule-title"
            className="mt-2 text-3xl font-black tracking-tight md:text-4xl"
          >
            Plan your two days
          </h2>
          <p className="mt-2 max-w-xl text-theme-secondary">
            Friday and Saturday are both below. Star sessions to build your own
            schedule; it stays in this browser.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search sessions and speakers</span>
              <FaMagnifyingGlass
                className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-theme-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search talks, speakers, companies…"
                className="w-full rounded-full border border-surface bg-surface-card py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <button
              type="button"
              aria-pressed={mine}
              onClick={() => update({ mine: !mine })}
              className={`inline-flex items-center justify-center gap-2 ${chipClass(
                mine
              )}`}
            >
              <FaStar aria-hidden="true" /> My schedule{' '}
              <span className="tabular-nums opacity-70">{saved.size}</span>
            </button>
          </div>

          <div
            className="-mx-6 mt-3 flex items-center gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none]"
            role="group"
            aria-label="Filter by topic"
          >
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-theme-muted">
              Topics
            </span>
            {DEVFEST_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={topic === t.id}
                onClick={() => update({ topic: topic === t.id ? '' : t.id })}
                className={chipClass(topic === t.id)}
              >
                {t.label}{' '}
                <span className="tabular-nums opacity-70">
                  {t.sessions.length}
                </span>
              </button>
            ))}
          </div>

          {filtering && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-theme-muted">
                {talks.length} sessions match
              </span>
              {[
                track && ['track', track],
                topic && [
                  'topic',
                  DEVFEST_TOPICS.find((t) => t.id === topic)?.label,
                ],
                mine && ['mine', 'My schedule'],
                query && ['q', `“${query}”`],
              ]
                .filter(Boolean)
                .map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update({ [key]: '' })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-surface bg-surface-card px-3 py-1 font-medium hover:border-primary/50"
                  >
                    {label}
                    <FaXmark aria-hidden="true" />
                    <span className="sr-only">Remove filter</span>
                  </button>
                ))}
              <button
                type="button"
                onClick={() =>
                  update({ track: '', topic: '', mine: '', q: '' })
                }
                className="font-semibold text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Sticky day bar: both days stay visible while scrolling */}
        <nav
          aria-label="Jump to day"
          className="sticky top-16 z-30 mt-8 border-y border-surface backdrop-blur-md"
          style={{
            background: 'color-mix(in srgb, var(--surface) 90%, transparent)',
          }}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-2 px-4 py-2 sm:px-6">
            {DEVFEST_DAYS.map((d) => {
              const active = activeDay === d.id
              const { hex, numeral, weekday } = DAY_META[d.id]
              return (
                <button
                  key={d.id}
                  type="button"
                  aria-current={active ? 'true' : undefined}
                  onClick={() => scrollToId(`day-${d.id}`)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-[background-color,opacity] ${
                    active
                      ? 'bg-surface-card shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={active ? { boxShadow: `inset 0 -3px 0 ${hex}` } : {}}
                >
                  <span
                    className="text-2xl font-black tabular-nums leading-none md:text-3xl"
                    style={{ color: hex }}
                  >
                    {numeral}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted md:text-[11px]">
                      {weekday}
                    </span>
                    <span className="block truncate text-sm font-extrabold md:text-base">
                      {d.title}
                    </span>
                  </span>
                  <span className="ml-auto hidden rounded-full bg-surface-elevated px-2 py-0.5 text-xs font-bold tabular-nums sm:inline">
                    {talksOn(d.id).length}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        <div ref={scheduleRef} className="mx-auto max-w-[1200px] px-6 pb-20">
          {DEVFEST_DAYS.map((d) => {
            const dayTalks = talksOn(d.id)
            const blocks = filtering
              ? []
              : [
                  ...DEVFEST_RUN_OF_SHOW.filter((b) => b.day === d.id),
                  ...DEVFEST_SESSIONS.filter(
                    (s) => s.day === d.id && !s.speakers.length
                  ),
                ]
            const tracks = DEVFEST_TRACKS.filter(
              (t) => t.day === d.id && (!track || t.name === track)
            )
            const { hex, numeral, weekday } = DAY_META[d.id]
            return (
              <section
                key={d.id}
                id={`day-${d.id}`}
                data-day={d.id}
                aria-labelledby={`day-${d.id}-title`}
                className="scroll-mt-36 pt-12"
              >
                <header
                  className="mb-8 flex items-end gap-5 border-b border-surface pb-5"
                  data-reveal-item
                >
                  <p
                    className="text-6xl font-black tabular-nums leading-none md:text-7xl"
                    style={{ color: hex }}
                    aria-hidden="true"
                  >
                    {numeral}
                  </p>
                  <div className="min-w-0 flex-1">
                    <h3
                      id={`day-${d.id}-title`}
                      className="text-2xl font-black md:text-3xl"
                    >
                      {weekday}, Nov {numeral} · {d.title}
                    </h3>
                    <p className="mt-1 text-theme-secondary">{d.blurb}</p>
                  </div>
                </header>

                {dayTalks.length === 0 && filtering ? (
                  <p className="rounded-2xl border border-dashed border-surface p-8 text-center text-theme-muted">
                    {mine && saved.size === 0
                      ? 'Star sessions to build your schedule.'
                      : `Nothing matches on ${weekday}.`}
                  </p>
                ) : d.id === 'hackathon' ? (
                  <HackathonTimeline
                    items={[...dayTalks, ...blocks].sort((a, b) =>
                      a.time.localeCompare(b.time)
                    )}
                    saved={saved}
                    onOpen={open}
                    onToggleSave={toggle}
                  />
                ) : (
                  <>
                    <TrackGrid
                      tracks={tracks}
                      talks={dayTalks}
                      blocks={blocks}
                      saved={saved}
                      onOpen={open}
                      onToggleSave={toggle}
                    />
                    <Agenda
                      talks={dayTalks}
                      blocks={blocks}
                      saved={saved}
                      onOpen={open}
                      onToggleSave={toggle}
                    />
                  </>
                )}
              </section>
            )
          })}
        </div>
      </section>

      <SessionDialog
        session={openSession}
        saved={openSession ? saved.has(openSession.id) : false}
        clashes={openSession ? clashesWith(openSession, savedSessions) : []}
        onToggleSave={toggle}
        onClose={() => update({ session: '' })}
      />
    </SiteLayout>
  )
}
