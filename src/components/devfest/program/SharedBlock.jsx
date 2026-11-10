import PropTypes from 'prop-types'
import { formatTime } from '@/data/2026/devfestProgram'

/** A run-of-show block every track shares: breaks, keynote, check-in. */
export default function SharedBlock({ block, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-xl border border-dashed border-surface px-4 py-2.5 text-sm ${className}`}
    >
      <span className="font-semibold">{block.title}</span>
      <span className="tabular-nums text-theme-muted">
        {formatTime(block.time)} – {formatTime(block.timeEnd)}
      </span>
      {block.note && <span className="text-theme-muted">{block.note}</span>}
    </div>
  )
}

SharedBlock.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
}
