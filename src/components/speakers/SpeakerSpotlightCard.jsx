import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaMastodon,
  FaXTwitter,
} from 'react-icons/fa6'
import GDEIcon from '@/assets/images/icons/gdge.svg'
import WTMLogo from '@/assets/images/icons/wtm.svg'

// Accent per track family; the card, chip and hover ring all read --accent
const TRACK_ACCENTS = [
  [/ai|ml|machine|agent/i, '#8b5cf6'],
  [/cloud|devops|infra/i, '#0ea5e9'],
  [/mobile|android|ios|flutter/i, '#10b981'],
  [/web|full ?stack|frontend/i, '#3b82f6'],
  [/lead|career|level up/i, '#f59e0b'],
  [/design|ux|tech\+design/i, '#f43f5e'],
  [/workshop|hands/i, '#14b8a6'],
  [/innovation|panel|stem/i, '#f97316'],
]

const trackAccent = (track = '') =>
  TRACK_ACCENTS.find(([re]) => re.test(track))?.[1] ?? '#efb403'

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const twitterUrl = (handle) =>
  handle.startsWith('http')
    ? handle
    : `https://x.com/${handle.replace(/^@/, '')}`

const githubUrl = (handle) =>
  handle.startsWith('http') ? handle : `https://github.com/${handle}`

/**
 * Speaker card that leads with the person: portrait, name with credentials,
 * role and brand, their latest talk, and links to their own channels.
 * The whole card opens the profile (`to`) or a detail view (`onSelect`);
 * social links sit above that hit area so they stay independently clickable.
 */
export default function SpeakerSpotlightCard({ speaker, to, onSelect }) {
  const {
    name,
    credentials,
    avatar,
    position,
    organization,
    isGDE,
    isWTM,
    yearsActive = [],
    sessions = [],
  } = speaker
  // Generated placeholder images read as broken; show the initials treatment
  const photo = avatar && !/placehold\.co/.test(avatar) ? avatar : null
  const talk = sessions[0]
  const tracks = talk?.tracks?.length
    ? talk.tracks
    : talk?.track
      ? [talk.track]
      : []
  const accent = trackAccent(tracks[0])
  const returning = yearsActive.length > 1

  const socials = [
    speaker.linkedIn && {
      href: speaker.linkedIn,
      label: 'LinkedIn',
      Icon: FaLinkedinIn,
    },
    speaker.github && {
      href: githubUrl(speaker.github),
      label: 'GitHub',
      Icon: FaGithub,
    },
    speaker.twitter && {
      href: twitterUrl(speaker.twitter),
      label: 'X',
      Icon: FaXTwitter,
    },
    speaker.mastodon && {
      href: speaker.mastodon,
      label: 'Mastodon',
      Icon: FaMastodon,
    },
    speaker.url && { href: speaker.url, label: 'Website', Icon: FaGlobe },
  ].filter(Boolean)

  const title = (
    <>
      {name}
      {credentials && (
        <span className="font-semibold text-theme-muted">, {credentials}</span>
      )}
    </>
  )

  // Stretched hit area: the card is one target without nesting links
  const hitArea =
    'after:absolute after:inset-0 after:z-[1] after:rounded-2xl focus-visible:outline-none'

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface-card transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:ring-2 focus-within:ring-[color:var(--accent)] hover:border-[color:var(--accent)] hover:shadow-[0_18px_40px_-18px_var(--accent)] motion-safe:hover:-translate-y-1"
      style={{ '--accent': accent }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
        {photo ? (
          <img
            src={photo}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center text-5xl font-black text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}, #111)`,
            }}
          >
            {initials(name)}
          </div>
        )}

        {/* Scrim keeps the chips legible on any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {isGDE && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              <img src={GDEIcon} alt="" className="size-3.5" />
              Google Developer Expert
            </span>
          )}
          {isWTM && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              <img src={WTMLogo} alt="" className="size-3.5" />
              WTM Ambassador
            </span>
          )}
        </div>

        {returning && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {yearsActive.length}× speaker
          </span>
        )}

        {tracks.length > 0 && (
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
            {tracks.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: trackAccent(t) }}
                  aria-hidden="true"
                />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-4">
        <h3 className="text-lg font-bold leading-snug text-theme-primary">
          {to ? (
            <Link to={to} className={hitArea}>
              {title}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onSelect}
              className={`text-left ${hitArea}`}
            >
              {title}
            </button>
          )}
        </h3>
        {position && (
          <p className="mt-1 line-clamp-2 text-sm text-theme-secondary">
            {position}
          </p>
        )}
        {organization && (
          <p className="mt-1 text-sm font-bold text-theme-primary">
            <span className="border-b-2 border-[color:var(--accent)] pb-px">
              {organization}
            </span>
          </p>
        )}

        {talk?.title && (
          <figure className="mt-4 rounded-xl border-l-[3px] border-[color:var(--accent)] bg-surface-elevated px-3 py-2.5">
            <figcaption className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              {talk.event
                ? `${talk.event} ${talk.year}`
                : talk.year
                  ? `${talk.year} talk`
                  : 'Talk'}
              {sessions.length > 1 && ` · +${sessions.length - 1} more`}
            </figcaption>
            <blockquote className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-theme-primary">
              {talk.title}
            </blockquote>
          </figure>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <ul className="relative z-[2] flex gap-1">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${label}`}
                  className="flex size-8 items-center justify-center rounded-full bg-surface-elevated text-theme-muted transition-colors hover:bg-[color:var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <span className="text-xs font-semibold tabular-nums text-theme-muted">
            {yearsActive.length > 2
              ? `${yearsActive[0]}–${yearsActive.at(-1)}`
              : yearsActive.join(' · ')}
          </span>
        </div>
      </div>
    </article>
  )
}

SpeakerSpotlightCard.propTypes = {
  speaker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    credentials: PropTypes.string,
    avatar: PropTypes.string,
    position: PropTypes.string,
    organization: PropTypes.string,
    isGDE: PropTypes.bool,
    isWTM: PropTypes.bool,
    linkedIn: PropTypes.string,
    github: PropTypes.string,
    twitter: PropTypes.string,
    mastodon: PropTypes.string,
    url: PropTypes.string,
    yearsActive: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  to: PropTypes.string,
  onSelect: PropTypes.func,
}
