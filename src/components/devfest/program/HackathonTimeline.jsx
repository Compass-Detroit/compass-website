import PropTypes from 'prop-types'
import { formatTime } from '@/data/2026/devfestProgram'
import SessionCard from './SessionCard'
import SharedBlock from './SharedBlock'

/** Friday: one track, so a vertical run-of-show. */
export default function HackathonTimeline({
  items,
  saved,
  onOpen,
  onToggleSave,
}) {
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
