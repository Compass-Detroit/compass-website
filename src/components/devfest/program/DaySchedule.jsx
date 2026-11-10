import PropTypes from 'prop-types'
import { TONE_HEX } from '../programUtils'
import Agenda from './Agenda'
import HackathonTimeline from './HackathonTimeline'
import TrackGrid from './TrackGrid'

/**
 * One day of the schedule: Friday as a single-track timeline, Saturday as a
 * track grid on desktop and a stacked agenda on smaller screens.
 */
export default function DaySchedule({
  day,
  talks,
  blocks,
  tracks,
  emptyMessage,
  saved,
  onOpen,
  onToggleSave,
}) {
  const shared = { saved, onOpen, onToggleSave }
  return (
    <section
      id={`day-${day.id}`}
      data-day={day.id}
      aria-labelledby={`day-${day.id}-title`}
      className="scroll-mt-36 pt-12"
    >
      <header
        className="mb-8 flex items-end gap-5 border-b border-surface pb-5"
        data-reveal-item
      >
        <p
          className="text-6xl font-black tabular-nums leading-none md:text-7xl"
          style={{ color: TONE_HEX[day.tone] }}
          aria-hidden="true"
        >
          {day.numeral}
        </p>
        <div className="min-w-0 flex-1">
          <h3
            id={`day-${day.id}-title`}
            className="text-2xl font-black md:text-3xl"
          >
            {day.weekday}, Nov {day.numeral} · {day.title}
          </h3>
          <p className="mt-1 text-theme-secondary">{day.blurb}</p>
        </div>
      </header>

      {emptyMessage ? (
        <p className="rounded-2xl border border-dashed border-surface p-8 text-center text-theme-muted">
          {emptyMessage}
        </p>
      ) : day.id === 'hackathon' ? (
        <HackathonTimeline
          items={[...talks, ...blocks].sort((a, b) =>
            a.time.localeCompare(b.time)
          )}
          {...shared}
        />
      ) : (
        <>
          <TrackGrid
            tracks={tracks}
            talks={talks}
            blocks={blocks}
            {...shared}
          />
          <Agenda talks={talks} blocks={blocks} {...shared} />
        </>
      )}
    </section>
  )
}

DaySchedule.propTypes = {
  day: PropTypes.object.isRequired,
  talks: PropTypes.array.isRequired,
  blocks: PropTypes.array.isRequired,
  tracks: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string,
  saved: PropTypes.instanceOf(Set).isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleSave: PropTypes.func.isRequired,
}
