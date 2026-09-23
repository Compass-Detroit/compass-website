import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import {
  IoChevronBack,
  IoChevronForward,
  IoLinkOutline,
  IoArrowBack,
  IoArrowDown,
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoPlayCircleOutline,
  IoCalendarOutline,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5'
import {
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaMastodon,
  FaMicrophone,
  FaXTwitter,
} from 'react-icons/fa6'
import colors from 'tailwindcss/colors'

import SiteLayout from '@/layouts/SiteLayout'
import SpeakerSpotlightCard from '@/components/speakers/SpeakerSpotlightCard'
import { getSpeakerBySlug, getAllSpeakers } from '@/utils/speakerRegistry'

import GDEIcon from '@/assets/images/icons/gdge.svg'
import WTMLogo from '@/assets/images/icons/wtm.svg'
import styles from './SpeakerProfilePage.module.css'

// Convert Tailwind hex to rgba for gradients/patterns
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const TRACK_THEMES = {
  default: {
    gradient: `linear-gradient(135deg, ${colors.sky[900]} 0%, ${colors.sky[800]} 48%, ${colors.sky[950]} 100%)`,
    pattern: `radial-gradient(circle at 22% 18%, ${hexToRgba(
      colors.sky[400],
      0.32
    )} 0, ${hexToRgba(
      colors.sky[400],
      0.08
    )} 36%, transparent 62%), radial-gradient(circle at 78% 22%, ${hexToRgba(
      colors.sky[500],
      0.28
    )} 0, ${hexToRgba(colors.sky[500], 0.08)} 35%, transparent 64%)`,
    fallbackColor: colors.sky[950],
    badgeBorder: hexToRgba(colors.sky[300], 0.55),
    badgeText: colors.white,
    focusColor: colors.sky[700],
    focusRingOffset: hexToRgba(colors.sky[950], 0.6),
  },
  'Build with AI': {
    gradient: `linear-gradient(135deg, ${colors.violet[600]} 0%, ${colors.violet[800]} 52%, ${colors.violet[950]} 100%)`,
    pattern: `radial-gradient(circle at 24% 20%, ${hexToRgba(
      colors.violet[300],
      0.38
    )} 0, ${hexToRgba(
      colors.violet[300],
      0.12
    )} 35%, transparent 60%), radial-gradient(circle at 78% 18%, ${hexToRgba(
      colors.pink[400],
      0.32
    )} 0, ${hexToRgba(colors.pink[400], 0.1)} 38%, transparent 65%)`,
    fallbackColor: colors.violet[950],
    badgeBorder: hexToRgba(colors.violet[300], 0.6),
    badgeText: colors.white,
    focusColor: colors.violet[700],
    focusRingOffset: hexToRgba(colors.violet[900], 0.65),
  },
  Innovation: {
    gradient: `linear-gradient(135deg, ${colors.amber[500]} 0%, ${colors.amber[600]} 40%, ${colors.amber[900]} 70%, ${colors.amber[950]} 100%)`,
    pattern: `radial-gradient(circle at 26% 22%, ${hexToRgba(
      colors.amber[200],
      0.52
    )} 0, ${hexToRgba(
      colors.amber[200],
      0.16
    )} 34%, transparent 58%), radial-gradient(circle at 80% 20%, ${hexToRgba(
      colors.amber[300],
      0.4
    )} 0, ${hexToRgba(colors.amber[300], 0.12)} 36%, transparent 64%)`,
    fallbackColor: colors.amber[950],
    badgeBorder: hexToRgba(colors.amber[200], 0.6),
    badgeText: colors.white,
    focusColor: colors.amber[700],
    focusRingOffset: hexToRgba(colors.amber[800], 0.55),
  },
  'Tech+Design': {
    gradient: `linear-gradient(135deg, ${colors.pink[500]} 0%, ${colors.pink[600]} 46%, ${colors.pink[800]} 80%, ${colors.pink[950]} 100%)`,
    pattern: `radial-gradient(circle at 24% 24%, ${hexToRgba(
      colors.pink[300],
      0.42
    )} 0, ${hexToRgba(
      colors.pink[300],
      0.14
    )} 32%, transparent 58%), radial-gradient(circle at 78% 16%, ${hexToRgba(
      colors.pink[400],
      0.38
    )} 0, ${hexToRgba(colors.pink[400], 0.14)} 36%, transparent 64%)`,
    fallbackColor: colors.pink[950],
    badgeBorder: hexToRgba(colors.pink[300], 0.55),
    badgeText: colors.white,
    focusColor: colors.pink[700],
    focusRingOffset: hexToRgba(colors.pink[800], 0.55),
  },
  Workshops: {
    gradient: `linear-gradient(135deg, ${colors.orange[500]} 0%, ${colors.orange[600]} 48%, ${colors.orange[700]} 78%, ${colors.orange[950]} 100%)`,
    pattern: `radial-gradient(circle at 24% 22%, ${hexToRgba(
      colors.orange[300],
      0.48
    )} 0, ${hexToRgba(
      colors.orange[300],
      0.16
    )} 30%, transparent 58%), radial-gradient(circle at 78% 20%, ${hexToRgba(
      colors.orange[400],
      0.36
    )} 0, ${hexToRgba(colors.orange[400], 0.12)} 34%, transparent 62%)`,
    fallbackColor: colors.orange[950],
    badgeBorder: hexToRgba(colors.orange[300], 0.58),
    badgeText: colors.white,
    focusColor: colors.orange[700],
    focusRingOffset: hexToRgba(colors.orange[900], 0.6),
  },
  'Level Up': {
    gradient: `linear-gradient(135deg, ${colors.green[500]} 0%, ${colors.green[600]} 48%, ${colors.green[700]} 74%, ${colors.green[950]} 100%)`,
    pattern: `radial-gradient(circle at 18% 20%, ${hexToRgba(
      colors.green[400],
      0.42
    )} 0, ${hexToRgba(
      colors.green[400],
      0.14
    )} 33%, transparent 58%), radial-gradient(circle at 80% 24%, ${hexToRgba(
      colors.green[300],
      0.36
    )} 0, ${hexToRgba(colors.green[300], 0.12)} 35%, transparent 62%)`,
    fallbackColor: colors.green[950],
    badgeBorder: hexToRgba(colors.green[200], 0.5),
    badgeText: colors.white,
    focusColor: colors.green[700],
    focusRingOffset: hexToRgba(colors.green[950], 0.6),
  },
  Leadership: {
    gradient: `linear-gradient(135deg, ${colors.sky[400]} 0%, ${colors.sky[500]} 45%, ${colors.sky[700]} 78%, ${colors.sky[950]} 100%)`,
    pattern: `radial-gradient(circle at 22% 20%, ${hexToRgba(
      colors.sky[300],
      0.46
    )} 0, ${hexToRgba(
      colors.sky[300],
      0.14
    )} 32%, transparent 58%), radial-gradient(circle at 80% 22%, ${hexToRgba(
      colors.sky[400],
      0.34
    )} 0, ${hexToRgba(colors.sky[400], 0.12)} 36%, transparent 64%)`,
    fallbackColor: colors.sky[950],
    badgeBorder: hexToRgba(colors.sky[200], 0.55),
    badgeText: colors.white,
    focusColor: colors.sky[700],
    focusRingOffset: hexToRgba(colors.sky[950], 0.6),
  },
}

const EXCERPT_LENGTH = 280

const isLinkedInUrl = (url = '') => /linkedin\.com/i.test(url)

const twitterUrl = (handle) =>
  handle.startsWith('http')
    ? handle
    : `https://x.com/${handle.replace(/^@/, '')}`

const twitterHandle = (handle) =>
  `@${handle
    .replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, '')
    .replace(/^@/, '')}`

const githubUrl = (handle) =>
  handle.startsWith('http') ? handle : `https://github.com/${handle}`

// "@user@instance.social" -> https://instance.social/@user
const mastodonUrl = (handle) => {
  if (handle.startsWith('http')) return handle
  const [user, host] = handle.replace(/^@/, '').split('@')
  return host ? `https://${host}/@${user}` : handle
}

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'Website'
  }
}

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

// Bios arrive with single or double newlines between paragraphs
const toParagraphs = (text = '') =>
  text
    .split(/\n+/)
    .map((p) => p.replace(/[ \t]{2,}/g, ' ').trim())
    .filter(Boolean)

// Cut on a word boundary so excerpts never end mid-word
const excerpt = (text = '', max = EXCERPT_LENGTH) => {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  const cut = flat.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:—-]+$/, '')}…`
}

// Some sources pack tags into one "A; B; C" string, and casing varies by year
const normalizeTags = (tags = []) => {
  const seen = new Map()
  tags
    .flatMap((t) => String(t).split(';'))
    .map((t) => t.trim())
    .filter(Boolean)
    .forEach((t) => {
      const key = t.toLowerCase()
      if (!seen.has(key)) seen.set(key, t)
    })
  return [...seen.values()]
}

const sessionTracks = (session) =>
  session.tracks?.length ? session.tracks : session.track ? [session.track] : []

// Only name an event when the data does; otherwise the year says enough
const talkContext = (session) =>
  session.event ? `${session.event} ${session.year}` : `${session.year}`

/**
 * The speaker's own channels, website first. A LinkedIn URL filed as the
 * speaker's website is shown as LinkedIn, not as a generic "Website".
 */
function getSpeakerLinks(speaker) {
  const linkedIn =
    speaker.linkedIn || (isLinkedInUrl(speaker.url) ? speaker.url : null)
  const website =
    speaker.url && !isLinkedInUrl(speaker.url) ? speaker.url : null

  const links = [
    website && {
      key: 'website',
      href: website,
      text: hostname(website),
      label: `${speaker.name}'s website, ${hostname(website)}`,
      Icon: FaGlobe,
      primary: true,
    },
    linkedIn && {
      key: 'linkedin',
      href: linkedIn,
      text: 'LinkedIn',
      label: `${speaker.name} on LinkedIn`,
      Icon: FaLinkedinIn,
    },
    speaker.github && {
      key: 'github',
      href: githubUrl(speaker.github),
      text: 'GitHub',
      label: `${speaker.name} on GitHub`,
      Icon: FaGithub,
    },
    speaker.twitter && {
      key: 'x',
      href: twitterUrl(speaker.twitter),
      text: twitterHandle(speaker.twitter),
      label: `${speaker.name} on X, ${twitterHandle(speaker.twitter)}`,
      Icon: FaXTwitter,
    },
    speaker.mastodon && {
      key: 'mastodon',
      href: mastodonUrl(speaker.mastodon),
      text: 'Mastodon',
      label: `${speaker.name} on Mastodon`,
      Icon: FaMastodon,
    },
  ].filter(Boolean)

  return { website, linkedIn, links }
}

function getRelatedSpeakers(speaker, all, limit = 4) {
  const myTracks = new Set(speaker.sessions?.flatMap(sessionTracks))
  const myCategories = new Set(
    normalizeTags(speaker.categories).map((c) => c.toLowerCase())
  )

  return all
    .filter((s) => s.slug !== speaker.slug)
    .map((s) => {
      const sharedTracks = new Set(
        s.sessions?.flatMap(sessionTracks).filter((t) => myTracks.has(t))
      ).size
      const sharedCategories = normalizeTags(s.categories).filter((c) =>
        myCategories.has(c.toLowerCase())
      ).length
      return { s, score: sharedTracks * 2 + sharedCategories }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ s }) => s)
}

function TrackChips({ tracks, size = 'sm' }) {
  if (!tracks.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tracks">
      {tracks.map((track) => (
        <li
          key={track}
          className={`inline-flex items-center gap-1.5 rounded-full border border-surface bg-surface-elevated font-semibold ${
            styles.trackBadge
          } ${size === 'lg' ? 'px-3.5 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'}`}
        >
          <span
            className="size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {track}
        </li>
      ))}
    </ul>
  )
}

TrackChips.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
}

function TagList({ tags }) {
  const list = normalizeTags(tags)
  if (!list.length) return null
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Topics">
      {list.map((tag) => (
        <li
          key={tag}
          className={`text-xs font-semibold uppercase tracking-wider ${styles.tagLabel}`}
        >
          #{tag}
        </li>
      ))}
    </ul>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

function ExpandableDescription({ text, maxLength = EXCERPT_LENGTH }) {
  const [expanded, setExpanded] = useState(false)
  if (!text?.trim()) return null

  const paragraphs = toParagraphs(text)
  const needsExpansion = text.length > maxLength

  if (!needsExpansion || expanded) {
    return (
      <div className="flex flex-col items-start">
        <div className={styles.prose}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {needsExpansion && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-expanded="true"
            className="mt-2 inline-flex items-center rounded text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Show less <IoChevronUp className="ml-1" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start">
      <p className="leading-relaxed text-theme-secondary">
        {excerpt(text, maxLength)}
      </p>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-expanded="false"
        className="mt-2 inline-flex items-center rounded text-sm font-semibold text-primary transition-colors hover:underline"
      >
        Read more <IoChevronDown className="ml-1" aria-hidden="true" />
      </button>
    </div>
  )
}

ExpandableDescription.propTypes = {
  text: PropTypes.string,
  maxLength: PropTypes.number,
}

function FeaturedTalk({ session, speaker, gradient, hasHistory }) {
  const abstract = session.abstract?.trim()
  const description = session.description?.trim()
  // With a session history below, the poster stays short and links down to
  // the full text; otherwise this card is the only place the talk appears.
  const lede =
    abstract || (hasHistory && description ? excerpt(description) : null)
  const details =
    !hasHistory && description && description !== abstract ? description : null
  const hasMore =
    hasHistory && !!description && description.replace(/\s+/g, ' ') !== lede

  return (
    <section
      aria-labelledby="featured-talk-heading"
      className="relative overflow-hidden rounded-3xl border border-surface bg-surface-card shadow-sm"
    >
      <div
        className="h-1.5"
        style={{ backgroundImage: gradient }}
        aria-hidden="true"
      />
      <FaMicrophone
        className={`pointer-events-none absolute -right-6 top-6 size-40 ${styles.posterMark}`}
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2
            id="featured-talk-heading"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <FaMicrophone className="size-3.5" aria-hidden="true" />
            Featured talk
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-theme-muted">
            <span aria-hidden="true">· </span>
            {talkContext(session)}
          </p>
        </div>

        <h3 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight text-theme-primary md:text-4xl">
          {session.title}
        </h3>

        <div className="mt-5">
          <TrackChips tracks={sessionTracks(session)} size="lg" />
        </div>

        {lede && (
          <p className="mt-6 text-pretty text-lg leading-relaxed text-theme-secondary">
            {lede}
          </p>
        )}
        {details && (
          <div className={lede ? 'mt-4' : 'mt-6 text-lg'}>
            <ExpandableDescription text={details} />
          </div>
        )}

        <div className="mt-6">
          <TagList tags={session.tags} />
        </div>

        {(speaker.slidesUrl || speaker.videoUrl || hasMore) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {speaker.slidesUrl && (
              <a
                href={speaker.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-surface bg-surface-elevated px-4 py-2 text-sm font-semibold text-theme-primary transition-colors hover:border-primary"
              >
                <IoDocumentTextOutline className="size-4" aria-hidden="true" />
                View slides
              </a>
            )}
            {speaker.videoUrl && (
              <a
                href={speaker.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-surface bg-surface-elevated px-4 py-2 text-sm font-semibold text-theme-primary transition-colors hover:border-primary"
              >
                <IoPlayCircleOutline className="size-4" aria-hidden="true" />
                Watch recording
              </a>
            )}
            {hasMore && (
              <a
                href="#talk-0"
                className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline"
              >
                Full session details
                <IoArrowDown className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

FeaturedTalk.propTypes = {
  session: PropTypes.object.isRequired,
  speaker: PropTypes.object.isRequired,
  gradient: PropTypes.string,
  hasHistory: PropTypes.bool,
}

export default function SpeakerProfilePage() {
  const { slug } = useParams()
  const speaker = useMemo(() => getSpeakerBySlug(slug), [slug])
  const displayName = speaker
    ? speaker.credentials
      ? `${speaker.name}, ${speaker.credentials}`
      : speaker.name
    : ''

  const relatedSpeakers = useMemo(
    () => (speaker ? getRelatedSpeakers(speaker, getAllSpeakers()) : []),
    [speaker]
  )

  const { prevSpeaker, nextSpeaker } = useMemo(() => {
    if (!speaker) return {}
    const all = getAllSpeakers()
    const i = all.findIndex((s) => s.slug === speaker.slug)
    return {
      prevSpeaker: i > 0 ? all[i - 1] : null,
      nextSpeaker: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
    }
  }, [speaker])

  useEffect(() => {
    // Profile-to-profile links reuse this route; start each profile at the top
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!speaker) return undefined
    document.title = `${displayName} — COMPASS Detroit Speaker`

    const { links } = getSpeakerLinks(speaker)
    const script = document.createElement('script')
    script.id = 'speaker-json-ld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: speaker.name,
      ...(speaker.credentials && { honorificSuffix: speaker.credentials }),
      jobTitle: speaker.position,
      worksFor: {
        '@type': 'Organization',
        name: speaker.organization,
      },
      url: window.location.href,
      image: speaker.avatar,
      description: speaker.bio,
      ...(links.length && { sameAs: links.map((l) => l.href) }),
    })
    document.getElementById(script.id)?.remove()
    document.head.appendChild(script)
    return () => script.remove()
  }, [speaker, displayName])

  if (!speaker) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Speaker Not Found
          </h1>
          <p className="mb-8 text-lg text-theme-muted">
            We couldn&apos;t find the speaker profile you&apos;re looking for.
          </p>
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-primary-400"
          >
            <IoArrowBack className="size-4" aria-hidden="true" />
            Back to Speakers
          </Link>
        </div>
      </SiteLayout>
    )
  }

  const firstName = speaker.name.split(' ')[0]
  const sessions = speaker.sessions ?? []
  const featured = sessions[0]
  const hasHistory = sessions.length > 1
  const bioParagraphs = toParagraphs(speaker.bio ?? '')
  const categories = normalizeTags(speaker.categories)
  const { website, linkedIn, links } = getSpeakerLinks(speaker)
  const bookingUrl = website || linkedIn
  const allTracks = [...new Set(sessions.flatMap(sessionTracks))]

  // Theme the hero from the most recent talk's first themed track
  const themedTrack = featured
    ? sessionTracks(featured).find((t) => TRACK_THEMES[t])
    : null
  const trackTheme = TRACK_THEMES[themedTrack] ?? TRACK_THEMES.default

  const heroStyle = {
    backgroundImage: [trackTheme.pattern, trackTheme.gradient].join(', '),
    backgroundColor: trackTheme.fallbackColor,
    backgroundBlendMode: 'overlay, normal',
    backgroundSize: 'auto, cover',
    backgroundRepeat: 'repeat, no-repeat',
    backgroundPosition: 'center, center',
  }

  return (
    <SiteLayout>
      {/* 1. Hero — intentionally dark on every theme; scrims keep white text AA on bright track colours */}
      <section className="dark-surface relative w-full">
        <div
          className="relative overflow-hidden pb-16 pt-10 text-white lg:pb-20 lg:pt-12"
          style={heroStyle}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent mix-blend-soft-light"
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            aria-hidden="true"
          ></div>

          <div className="relative z-20 mx-auto max-w-[1200px] px-6">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/90">
                <li>
                  <Link
                    to="/"
                    className="rounded hover:text-white hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link
                    to="/speakers"
                    className="rounded hover:text-white hover:underline"
                  >
                    Speakers
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-white">
                  {speaker.name}
                </li>
              </ol>
            </nav>

            <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:text-left">
              <div className="shrink-0">
                <div className="size-48 rounded-full border-4 border-white/20 bg-black/30 p-2 shadow-2xl backdrop-blur-sm md:size-56 lg:size-64">
                  {speaker.avatar ? (
                    <img
                      src={speaker.avatar}
                      alt={`Portrait of ${displayName}`}
                      className="size-full rounded-full object-cover object-top"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${displayName} (initials)`}
                      className="flex size-full items-center justify-center rounded-full bg-black/40 text-6xl font-black text-white"
                    >
                      {initials(speaker.name)}
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <ul
                  className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                  aria-label="Speaker highlights"
                >
                  {speaker.isGDE && (
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur-sm">
                      <img src={GDEIcon} alt="" className="size-4" />
                      Google Developer Expert
                    </li>
                  )}
                  {speaker.isWTM && (
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur-sm">
                      <img src={WTMLogo} alt="" className="size-4" />
                      Women Techmakers Ambassador
                    </li>
                  )}
                  {speaker.yearsActive?.map((year) => (
                    <li
                      key={year}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                    >
                      <FaMicrophone
                        className="size-3 text-primary"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Spoke in </span>
                      {year}
                    </li>
                  ))}
                </ul>

                <h1 className="mb-3 text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                  {speaker.name}
                  {speaker.credentials && (
                    <span className="font-semibold text-white/85">
                      , {speaker.credentials}
                    </span>
                  )}
                </h1>

                {speaker.position && (
                  <p className="text-xl font-medium text-white/90 md:text-2xl">
                    {speaker.position}
                  </p>
                )}
                {speaker.organization && (
                  <p className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-white md:text-xl">
                    <IoBusinessOutline
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="border-b-2 border-primary-400 pb-0.5">
                      {speaker.organization}
                    </span>
                  </p>
                )}

                {links.length > 0 && (
                  <ul
                    className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                    aria-label={`${speaker.name}'s links`}
                  >
                    {links.map(({ key, href, text, label, Icon, primary }) => (
                      <li key={key}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${label} (opens in a new tab)`}
                          className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-white ${
                            primary
                              ? 'border-primary-400 bg-primary text-gray-950 hover:bg-primary-400'
                              : 'border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-gray-900'
                          }`}
                        >
                          <Icon className="size-4" aria-hidden="true" />
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`mx-auto max-w-[1200px] px-6 py-16 ${styles.content}`}>
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="space-y-16 lg:col-span-2">
            {/* 2. Featured talk */}
            {featured && (
              <FeaturedTalk
                session={featured}
                gradient={trackTheme.gradient}
                speaker={speaker}
                hasHistory={hasHistory}
              />
            )}

            {/* 3. About */}
            {(bioParagraphs.length > 0 || categories.length > 0) && (
              <section aria-labelledby="about-heading">
                <h2
                  id="about-heading"
                  className="mb-6 text-3xl font-bold tracking-tight"
                >
                  About {firstName}
                </h2>
                {bioParagraphs.length > 0 && (
                  <div className={`max-w-prose text-lg ${styles.prose}`}>
                    {bioParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}

                {categories.length > 0 && (
                  <div className="mt-8">
                    <h3
                      className={`mb-3 text-sm font-bold uppercase tracking-wide ${styles.sectionHeader}`}
                    >
                      Expertise
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <Link
                            to={`/speakers?category=${encodeURIComponent(cat)}`}
                            className="inline-block rounded-full border border-surface bg-surface-card px-4 py-1.5 text-sm font-medium text-theme-secondary transition-colors hover:border-primary hover:text-primary"
                          >
                            {cat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* 4. Session history — one entry per talk, all of its tracks */}
            {hasHistory && (
              <section aria-labelledby="history-heading">
                <h2
                  id="history-heading"
                  className="mb-8 text-3xl font-bold tracking-tight"
                >
                  Session History
                </h2>
                <ol className="relative ml-4 space-y-12 border-l-2 border-surface md:ml-6">
                  {sessions.map((session, idx) => (
                    <li
                      key={`${session.year}-${session.title}`}
                      id={`talk-${idx}`}
                      className="relative scroll-mt-24 pl-8 md:pl-10"
                    >
                      <div
                        className={`absolute left-[-11px] top-1 size-5 rounded-full border-4 bg-primary ${styles.timelineDot}`}
                        aria-hidden="true"
                      ></div>

                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {talkContext(session)}
                        </span>
                        <TrackChips tracks={sessionTracks(session)} />
                      </div>

                      <h3 className="mb-2 text-xl font-bold tracking-tight text-theme-primary">
                        {session.title}
                      </h3>

                      <div className="mb-4">
                        <TagList tags={session.tags} />
                      </div>

                      <ExpandableDescription
                        text={session.description || session.abstract}
                      />
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* 5. Resources */}
            {speaker.resources && speaker.resources.length > 0 && (
              <section aria-labelledby="resources-heading">
                <h2
                  id="resources-heading"
                  className="mb-6 text-2xl font-bold tracking-tight"
                >
                  Resources &amp; Links
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {speaker.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-xl border border-surface bg-surface-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-gray-950">
                        <IoLinkOutline className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-theme-primary transition-colors group-hover:text-primary">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p
                            className={`mt-1 line-clamp-2 text-sm ${styles.resourceDescription}`}
                          >
                            {resource.description}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <aside
            className="space-y-12 lg:col-span-1"
            aria-label={`More about ${speaker.name}`}
          >
            {speaker.talkPhotos && speaker.talkPhotos.length > 0 && (
              <section
                aria-labelledby="photos-heading"
                className="rounded-2xl border border-surface bg-surface-card p-6"
              >
                <h2 id="photos-heading" className="mb-4 text-lg font-bold">
                  In Action
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {speaker.talkPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-lg bg-surface-elevated ${
                        idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${speaker.name} speaking (${idx + 1} of ${
                          speaker.talkPhotos.length
                        })`}
                        className="size-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="space-y-6 lg:sticky lg:top-24">
              <section
                aria-labelledby="snapshot-heading"
                className="rounded-2xl border border-surface bg-surface-card p-6"
              >
                <h2
                  id="snapshot-heading"
                  className={`mb-4 text-sm font-bold uppercase tracking-wide ${styles.sectionHeader}`}
                >
                  At a glance
                </h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs font-semibold text-theme-muted">
                      {sessions.length === 1 ? 'Talk' : 'Talks'}
                    </dt>
                    <dd className="text-3xl font-extrabold tabular-nums text-theme-primary">
                      {sessions.length}
                    </dd>
                  </div>
                  {speaker.yearsActive?.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold text-theme-muted">
                        Speaking since
                      </dt>
                      <dd className="text-3xl font-extrabold tabular-nums text-theme-primary">
                        {speaker.yearsActive[0]}
                      </dd>
                    </div>
                  )}
                </dl>
                {allTracks.length > 0 && (
                  <div className="mt-5">
                    <p
                      className="mb-2 text-xs font-semibold text-theme-muted"
                      aria-hidden="true"
                    >
                      Tracks
                    </p>
                    <TrackChips tracks={allTracks} />
                  </div>
                )}
              </section>

              {/* No website or LinkedIn means nowhere to send a booking: skip the card */}
              {bookingUrl && (
                <section
                  aria-labelledby="book-heading"
                  className="rounded-2xl border border-surface bg-primary/5 p-6 text-center"
                >
                  <IoCalendarOutline
                    className="mx-auto mb-3 size-8 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="book-heading" className="mb-2 text-lg font-bold">
                    Book {firstName}
                  </h2>
                  <p className="mb-4 text-sm text-theme-secondary">
                    Interested in having {firstName} speak at your next event?
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-gray-950 transition-colors hover:bg-primary-400"
                  >
                    {website ? 'Visit Website' : 'Connect on LinkedIn'}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </section>
              )}
            </div>
          </aside>
        </div>

        {/* 6. Related Speakers */}
        {relatedSpeakers.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mt-24 border-t border-surface pt-16"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2
                id="related-heading"
                className="text-2xl font-bold tracking-tight"
              >
                Similar Speakers
              </h2>
              <Link
                to="/speakers"
                className="rounded text-sm font-semibold text-primary hover:underline"
              >
                View all speakers <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {relatedSpeakers.map((rs) => (
                <li
                  key={rs.slug}
                  className="w-64 shrink-0 snap-start sm:w-auto"
                >
                  <SpeakerSpotlightCard
                    speaker={rs}
                    to={`/speakers/${rs.slug}`}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. Bottom Navigation */}
        <nav
          aria-label="Browse speakers"
          className="mt-16 grid items-center gap-4 rounded-2xl border border-surface bg-surface-card p-6 sm:grid-cols-3"
        >
          <div className="sm:justify-self-start">
            {prevSpeaker && (
              <Link
                to={`/speakers/${prevSpeaker.slug}`}
                className="flex items-center gap-2 rounded-lg border border-surface px-4 py-2.5 text-sm font-medium text-theme-primary transition-colors hover:border-primary"
              >
                <IoChevronBack aria-hidden="true" />
                <span>
                  <span className="block text-xs text-theme-muted">
                    Previous speaker
                  </span>
                  {prevSpeaker.name}
                </span>
              </Link>
            )}
          </div>

          <Link
            to="/speakers"
            className="justify-self-center rounded text-sm font-bold text-theme-muted transition-colors hover:text-theme-primary"
          >
            All Speakers
          </Link>

          <div className="sm:justify-self-end">
            {nextSpeaker && (
              <Link
                to={`/speakers/${nextSpeaker.slug}`}
                className="flex items-center justify-end gap-2 rounded-lg border border-surface px-4 py-2.5 text-right text-sm font-medium text-theme-primary transition-colors hover:border-primary"
              >
                <span>
                  <span className="block text-xs text-theme-muted">
                    Next speaker
                  </span>
                  {nextSpeaker.name}
                </span>
                <IoChevronForward aria-hidden="true" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </SiteLayout>
  )
}
