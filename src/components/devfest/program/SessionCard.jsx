import PropTypes from 'prop-types'
import { formatTime } from '@/data/2026/devfestProgram'
import { TONE_HEX } from '../programUtils'
import Faces from './Faces'
import StarButton from './StarButton'

/** Schedule card: track colour on the left edge, speakers up front. */
export default function SessionCard({
  session,
  saved,
  onOpen,
  onToggleSave,
  showTrack,
}) {
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
              {session.room && ` · ${session.room}`}
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
          {session.speakers.map((p) => p.name).join(', ') || session.presenter}
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
