import PropTypes from 'prop-types'
import { formatTime } from '@/data/2026/devfestProgram'
import { TONE_HEX } from '../programUtils'
import SessionCard from './SessionCard'
import SharedBlock from './SharedBlock'

/** Saturday on desktop: tracks across, time down; long workshops span rows. */
export default function TrackGrid({
  tracks,
  talks,
  blocks,
  saved,
  onOpen,
  onToggleSave,
}) {
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
