import PropTypes from 'prop-types'
import { DEVFEST_DAYS } from '@/data/2026/devfestProgram'
import { TONE_HEX } from '../programUtils'
import { scrollToId } from './helpers'

/** Sticky day bar: both days stay visible while scrolling the schedule. */
export default function DayNav({ activeDay, counts }) {
  return (
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
          const hex = TONE_HEX[d.tone]
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
                {d.numeral}
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-theme-muted md:text-[11px]">
                  {d.weekday}
                </span>
                <span className="block truncate text-sm font-extrabold md:text-base">
                  {d.title}
                </span>
              </span>
              <span className="ml-auto hidden rounded-full bg-surface-elevated px-2 py-0.5 text-xs font-bold tabular-nums sm:inline">
                {counts[d.id] ?? 0}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

DayNav.propTypes = {
  activeDay: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
}
