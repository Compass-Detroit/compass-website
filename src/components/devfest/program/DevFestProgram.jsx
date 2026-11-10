import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DEVFEST_DAYS,
  DEVFEST_RUN_OF_SHOW,
  DEVFEST_SESSIONS,
  DEVFEST_TOPICS,
  DEVFEST_TRACKS,
  isTalk,
} from '@/data/2026/devfestProgram'
import SessionDialog from '../SessionDialog'
import useRevealOnScroll from '../useRevealOnScroll'
import {
  clashesWith,
  eventPhase,
  liveDay,
  useMySchedule,
  useNow,
} from '../programUtils'
import DayNav from './DayNav'
import DaySchedule from './DaySchedule'
import NowNext from './NowNext'
import ProgramHero from './ProgramHero'
import ScheduleFilters from './ScheduleFilters'
import SpeakerShowcase from './SpeakerShowcase'
import VenueMap from './VenueMap'
import { matchesQuery, scrollToId } from './helpers'
import useActiveDay from './useActiveDay'

const SESSION_BY_ID = Object.fromEntries(DEVFEST_SESSIONS.map((s) => [s.id, s]))

/**
 * The /devfest program: hero, speakers and the two-day schedule. Filters and
 * the open session live in the URL so any view can be shared; saved sessions
 * live in this browser.
 */
export default function DevFestProgram() {
  const [params, setParams] = useSearchParams()
  const now = useNow(params.get('now'))
  const { saved, toggle } = useMySchedule()
  const activeDay = useActiveDay()
  const scheduleRef = useRef(null)
  const jumpedToToday = useRef(false)

  const filters = {
    track: params.get('track') ?? '',
    topic: params.get('topic') ?? '',
    query: params.get('q') ?? '',
    mine: params.get('mine') === '1',
  }
  const { track, topic, query, mine } = filters
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
  const open = (id) => update({ session: id })

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
          isTalk(s) &&
          (!track || s.track === track) &&
          (!topic || topicIds.has(s.id)) &&
          (!mine || saved.has(s.id)) &&
          matchesQuery(s, query)
      ),
    [track, topic, topicIds, mine, saved, query]
  )
  const talksOn = (dayId) => talks.filter((s) => s.day === dayId)
  const counts = Object.fromEntries(
    DEVFEST_DAYS.map((d) => [d.id, talksOn(d.id).length])
  )

  useRevealOnScroll(scheduleRef, `${track}|${topic}|${mine}|${query}`)

  return (
    <>
      <ProgramHero
        phase={eventPhase(now)}
        now={now}
        globePaused={Boolean(openSession)}
        onOpen={open}
      />
      <NowNext now={now} onOpen={open} />
      <SpeakerShowcase
        track={track}
        onTrackChange={(t) => update({ track: t })}
        onOpen={open}
      />

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
          <ScheduleFilters
            filters={filters}
            savedCount={saved.size}
            matchCount={talks.length}
            onChange={update}
          />
        </div>

        <DayNav activeDay={activeDay} counts={counts} />

        <div ref={scheduleRef} className="mx-auto max-w-[1200px] px-6 pb-20">
          {DEVFEST_DAYS.map((d) => {
            const dayTalks = talksOn(d.id)
            // Breaks and logistics only make sense on the unfiltered schedule
            const blocks = filtering
              ? []
              : [
                  ...DEVFEST_RUN_OF_SHOW.filter((b) => b.day === d.id),
                  ...DEVFEST_SESSIONS.filter(
                    (s) => s.day === d.id && !isTalk(s)
                  ),
                ]
            const emptyMessage =
              filtering && dayTalks.length === 0
                ? mine && saved.size === 0
                  ? 'Star sessions to build your schedule.'
                  : `Nothing matches on ${d.weekday}.`
                : undefined
            return (
              <DaySchedule
                key={d.id}
                day={d}
                talks={dayTalks}
                blocks={blocks}
                tracks={DEVFEST_TRACKS.filter(
                  (t) => t.day === d.id && (!track || t.name === track)
                )}
                emptyMessage={emptyMessage}
                saved={saved}
                onOpen={open}
                onToggleSave={toggle}
              />
            )
          })}
        </div>
      </section>

      <VenueMap />

      <SessionDialog
        session={openSession}
        saved={openSession ? saved.has(openSession.id) : false}
        clashes={openSession ? clashesWith(openSession, savedSessions) : []}
        onToggleSave={toggle}
        onOpenSession={open}
        onClose={() => update({ session: '' })}
      />
    </>
  )
}
