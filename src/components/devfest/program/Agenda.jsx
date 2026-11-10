import PropTypes from 'prop-types'
import { formatTime } from '@/data/2026/devfestProgram'
import SessionCard from './SessionCard'
import SharedBlock from './SharedBlock'

/** Saturday on phones and tablets: stacked by time slot. */
export default function Agenda({ talks, blocks, saved, onOpen, onToggleSave }) {
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
