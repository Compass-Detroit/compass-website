import PropTypes from 'prop-types'
import { FaMagnifyingGlass, FaStar, FaXmark } from 'react-icons/fa6'
import { DEVFEST_TOPICS } from '@/data/2026/devfestProgram'
import { chipClass } from './helpers'

/** Search, My schedule, topic chips and the active-filter summary. */
export default function ScheduleFilters({
  filters: { track, topic, query, mine },
  savedCount,
  matchCount,
  onChange,
}) {
  const filtering = Boolean(track || topic || mine || query)
  const active = [
    track && ['track', track],
    topic && ['topic', DEVFEST_TOPICS.find((t) => t.id === topic)?.label],
    mine && ['mine', 'My schedule'],
    query && ['q', `“${query}”`],
  ].filter(Boolean)

  return (
    <>
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
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Search talks, speakers, companies…"
            className="w-full rounded-full border border-surface bg-surface-card py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <button
          type="button"
          aria-pressed={mine}
          onClick={() => onChange({ mine: !mine })}
          className={`inline-flex items-center justify-center gap-2 ${chipClass(
            mine
          )}`}
        >
          <FaStar aria-hidden="true" /> My schedule{' '}
          <span className="tabular-nums opacity-70">{savedCount}</span>
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
            onClick={() => onChange({ topic: topic === t.id ? '' : t.id })}
            className={chipClass(topic === t.id)}
          >
            {t.label}{' '}
            <span className="tabular-nums opacity-70">{t.sessions.length}</span>
          </button>
        ))}
      </div>

      {filtering && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-theme-muted">{matchCount} sessions match</span>
          {active.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ [key]: '' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-surface bg-surface-card px-3 py-1 font-medium hover:border-primary/50"
            >
              {label}
              <FaXmark aria-hidden="true" />
              <span className="sr-only">Remove filter</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange({ track: '', topic: '', mine: '', q: '' })}
            className="font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </>
  )
}

ScheduleFilters.propTypes = {
  filters: PropTypes.shape({
    track: PropTypes.string,
    topic: PropTypes.string,
    query: PropTypes.string,
    mine: PropTypes.bool,
  }).isRequired,
  savedCount: PropTypes.number.isRequired,
  matchCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
