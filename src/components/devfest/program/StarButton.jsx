import PropTypes from 'prop-types'
import { FaStar, FaRegStar } from 'react-icons/fa6'

/** Save or unsave a session in My schedule. */
export default function StarButton({ session, saved, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(session.id)}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remove' : 'Save'} ${session.title} ${
        saved ? 'from' : 'to'
      } my schedule`}
      className={`relative z-[1] -m-1.5 shrink-0 rounded-full p-1.5 transition-colors ${
        saved ? 'text-primary' : 'text-theme-muted hover:text-theme-primary'
      }`}
    >
      {saved ? <FaStar aria-hidden="true" /> : <FaRegStar aria-hidden="true" />}
    </button>
  )
}

StarButton.propTypes = {
  session: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}
