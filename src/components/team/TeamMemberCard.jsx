import PropTypes from 'prop-types'

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function GitHubIcon({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

GitHubIcon.propTypes = { className: PropTypes.string }

function LinkedInIcon({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

LinkedInIcon.propTypes = { className: PropTypes.string }

function TwitterIcon({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

TwitterIcon.propTypes = { className: PropTypes.string }

export default function TeamMemberCard({
  member,
  variant = 'default',
  badges = [],
}) {
  const isCompact = variant === 'compact'

  if (isCompact) {
    return (
      <article className="group rounded-xl border border-surface bg-surface-card p-4 transition-colors hover:border-primary/30">
        <div className="flex items-center gap-3">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="size-10 shrink-0 rounded-full border-2 border-primary/20 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-violet-500/20 text-xs font-bold text-primary">
              {getInitials(member.name)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{member.name}</h3>
            <p className="truncate text-[12px] text-gray-500">
              {member.role || member.position || ''}
            </p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-surface bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
      {/* Top Image area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-surface-card to-[var(--surface-card)]">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-violet-500/5 text-5xl font-extrabold text-primary/40">
            {getInitials(member.name)}
          </div>
        )}

        {/* Overlay gradient for readability */}
        <div className="via-surface-card/40 absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges positioned over image */}
        {badges.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={
                  badge === 'Lead'
                    ? 'rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg backdrop-blur-md'
                    : 'rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md'
                }
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative -mt-16 p-5 pt-0">
        <div className="mb-4">
          <h3 className="truncate text-xl font-bold text-white transition-colors group-hover:text-primary">
            {member.name}
          </h3>
          <p className="truncate text-[13px] font-medium text-primary">
            {member.role || member.position || ''}
          </p>
        </div>

        {member.organization && (
          <p className="mb-5 truncate text-[13px] text-gray-400">
            {member.organization}
          </p>
        )}

        {/* Social links */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary"
              aria-label={`${member.name} on GitHub`}
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedInIcon className="size-4" />
            </a>
          )}
          {member.twitter && (
            <a
              href={`https://twitter.com/${member.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary"
              aria-label={`${member.name} on X (Twitter)`}
            >
              <TwitterIcon className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

TeamMemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
    devfest: PropTypes.string,
    star: PropTypes.bool,
    university: PropTypes.string,
    organization: PropTypes.string,
    role: PropTypes.string,
    position: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
  badges: PropTypes.arrayOf(PropTypes.string),
}
