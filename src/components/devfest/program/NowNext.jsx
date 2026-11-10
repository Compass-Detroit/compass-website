import PropTypes from 'prop-types'
import {
  DEVFEST_RUN_OF_SHOW,
  DEVFEST_SESSIONS,
  formatTime,
} from '@/data/2026/devfestProgram'
import { liveDay, sessionDate } from '../programUtils'

/** On event days: what's on now and what starts next. */
export default function NowNext({ now, onOpen }) {
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
