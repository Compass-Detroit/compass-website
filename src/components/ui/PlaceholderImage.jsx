import PropTypes from 'prop-types'

const presets = {
  community: {
    gradient: 'from-primary/20 via-indigo-500/10 to-emerald-500/10',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: 'Community',
  },
  event: {
    gradient: 'from-primary/20 via-rose-500/10 to-violet-500/10',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: 'Event',
  },
  tech: {
    gradient: 'from-indigo-500/20 via-primary/10 to-cyan-500/10',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: 'Technology',
  },
  career: {
    gradient: 'from-emerald-500/20 via-primary/10 to-teal-500/10',
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    label: 'Career',
  },
}

export default function PlaceholderImage({
  preset = 'community',
  aspectRatio = 'aspect-video',
  className = '',
}) {
  const config = presets[preset] || presets.community
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${config.gradient} ${aspectRatio} ${className}`}
      role="img"
      aria-label={`${config.label} placeholder image`}
    >
      <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
        {config.icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider opacity-40">
          {config.label}
        </span>
      </div>
    </div>
  )
}

PlaceholderImage.propTypes = {
  preset: PropTypes.oneOf(['community', 'event', 'tech', 'career']),
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
}
