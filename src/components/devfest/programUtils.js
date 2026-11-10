import { useCallback, useEffect, useState } from 'react'
import { DEVFEST_DAYS } from '@/data/2026/devfestProgram'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { DEVFEST_PALETTE } from '@/constants/devfestPalette'

/** Track colours from the DevFest 2026 brand palette, light and dark. */
export const TONES = {
  yellow: {
    chip: 'border-devfest-yellow/50 bg-devfest-pastel-yellow text-amber-900 dark:border-devfest-yellow/40 dark:bg-devfest-yellow/15 dark:text-devfest-ht-yellow',
    bar: 'bg-devfest-yellow',
  },
  blue: {
    chip: 'border-devfest-blue/40 bg-devfest-pastel-blue text-devfest-blue-ink dark:bg-devfest-blue/15 dark:text-devfest-ht-blue',
    bar: 'bg-devfest-blue',
  },
  green: {
    chip: 'border-devfest-green/40 bg-devfest-pastel-green text-green-900 dark:bg-devfest-green/15 dark:text-devfest-ht-green',
    bar: 'bg-devfest-green',
  },
  red: {
    chip: 'border-devfest-red/40 bg-devfest-pastel-red text-red-800 dark:bg-devfest-red/15 dark:text-red-300',
    bar: 'bg-devfest-red',
  },
  pink: {
    chip: 'border-pink-400/40 bg-pink-100 text-pink-900 dark:border-devfest-ht-red/40 dark:bg-devfest-ht-red/15 dark:text-devfest-ht-red',
    bar: 'bg-devfest-ht-red',
  },
  cyan: {
    chip: 'border-cyan-400/40 bg-cyan-100 text-cyan-900 dark:border-devfest-ht-blue/40 dark:bg-devfest-ht-blue/15 dark:text-devfest-ht-blue',
    bar: 'bg-devfest-ht-blue',
  },
  slate: {
    chip: 'border-surface bg-surface-card text-theme-secondary',
    bar: 'bg-gray-400',
  },
}

export const toneOf = (tone) => TONES[tone] ?? TONES.slate

const DAY_DATE = Object.fromEntries(DEVFEST_DAYS.map((d) => [d.id, d.date]))

export const sessionDate = (day, time) =>
  new Date(`${DAY_DATE[day]}T${time}:00${DEVFEST_2026.utcOffset}`)

/** A speaker's session that hasn't ended yet, else their first one. */
export const nextSessionFor = (sessions, now) =>
  sessions.find((s) => sessionDate(s.day, s.timeEnd).getTime() > now) ??
  sessions[0]

export const calendarEvent = (session) => ({
  id: `midevfest26-${session.id ?? session.title}`,
  name: `${session.title} · ${DEVFEST_2026.name}`,
  desc: [
    session.speakers?.map((p) => p.name).join(', '),
    session.abstract,
    typeof window !== 'undefined' &&
      `${window.location.origin}${DEVFEST_2026.programPath}?session=${session.id}`,
  ]
    .filter(Boolean)
    .join('\n\n'),
  location: [session.room, DEVFEST_2026.venue, DEVFEST_2026.address]
    .filter(Boolean)
    .join(', '),
  startTime: sessionDate(session.day, session.time).toISOString(),
  endTime: sessionDate(session.day, session.timeEnd).toISOString(),
})

const STORAGE_KEY = 'midevfest26:my-schedule'

const readSaved = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [])
  } catch {
    return new Set()
  }
}

/** Sessions the visitor starred, kept in this browser only. */
export function useMySchedule() {
  const [saved, setSaved] = useState(readSaved)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]))
    } catch {
      // Private mode or blocked storage: the list lasts for this visit
    }
  }, [saved])

  const toggle = useCallback(
    (id) =>
      setSaved((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
    []
  )

  return { saved, toggle }
}

/**
 * Current time, ticking every 30s. `?now=2026-11-14T10:20` previews the
 * event-day banner at any moment (Detroit time).
 */
export function useNow(override) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (override) return undefined
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [override])
  if (override) {
    const preview = new Date(
      `${override}:00${DEVFEST_2026.utcOffset}`
    ).getTime()
    if (!Number.isNaN(preview)) return preview
  }
  return now
}

/** The event day `now` falls on, between doors and the last block. */
export const liveDay = (now) =>
  DEVFEST_DAYS.find(
    (d) =>
      now >= sessionDate(d.id, '07:30').getTime() &&
      now <= sessionDate(d.id, '20:30').getTime()
  )?.id ?? null

const overlaps = (a, b) =>
  a.day === b.day && a.time < b.timeEnd && b.time < a.timeEnd

/** Saved sessions that clash with `session`. */
export const clashesWith = (session, savedSessions) =>
  savedSessions.filter((s) => s.id !== session.id && overlaps(s, session))

/** Solid track colours for rings, glows and SVG strokes. */
export const TONE_HEX = {
  yellow: DEVFEST_PALETTE.yellow,
  blue: DEVFEST_PALETTE.blue,
  green: DEVFEST_PALETTE.green,
  red: DEVFEST_PALETTE.red,
  pink: DEVFEST_PALETTE['ht-red'],
  cyan: DEVFEST_PALETTE['ht-blue'],
  slate: '#9ca3af',
}

const KICKOFF = new Date(DEVFEST_2026.startsAt).getTime()
const WRAP_UP = new Date(DEVFEST_2026.endsAt).getTime()
const DAY = 86_400_000
const OFFSET_MS =
  (DEVFEST_2026.utcOffset.startsWith('-') ? -1 : 1) *
  (Number(DEVFEST_2026.utcOffset.slice(1, 3)) * 60 +
    Number(DEVFEST_2026.utcOffset.slice(4, 6))) *
  60_000
// Calendar day number in Detroit, so "tomorrow" means the next date there
const detroitDay = (ts) => Math.floor((ts + OFFSET_MS) / DAY)

/**
 * Where we are relative to the event: `upcoming` (more than a week out),
 * `week` (final seven days), `live` or `over`. `days` counts calendar days
 * left, so Monday of event week reads "4 days".
 */
export function eventPhase(now) {
  if (now > WRAP_UP) return { phase: 'over', days: -1 }
  if (now >= KICKOFF) return { phase: 'live', days: 0 }
  const days = detroitDay(KICKOFF) - detroitDay(now)
  return { phase: days <= 7 ? 'week' : 'upcoming', days }
}

export const phaseLabel = ({ phase, days }) =>
  ({
    over: 'That’s a wrap. Thank you, Detroit!',
    live: 'Happening now in Greektown',
    week:
      days === 0
        ? 'Doors open at 8 AM'
        : days === 1
          ? 'Event week · Tomorrow'
          : `Event week · ${days} days to go`,
    upcoming: `${days} days to go`,
  })[phase]
