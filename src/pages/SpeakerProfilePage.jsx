import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  IoChevronBack,
  IoChevronForward,
  IoLinkOutline,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoLinkedin,
  IoArrowBack,
  IoDocumentTextOutline,
  IoPlayCircleOutline,
  IoCalendarOutline,
  IoChevronDown,
  IoChevronUp,
} from 'react-icons/io5'
import { FaMastodon, FaMicrophone } from 'react-icons/fa6'
import colors from 'tailwindcss/colors'

import SiteLayout from '@/layouts/SiteLayout'
import ProfileCard from '@/components/ui/ProfileCard'
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

function ExpandableDescription({ text }) {
  const [expanded, setExpanded] = useState(false)
  const maxLength = 250
  const needsExpansion = text?.length > maxLength

  if (!needsExpansion) {
    return (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
    )
  }

  return (
    <div className="flex flex-col items-start">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {expanded ? text : `${text.slice(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary-400 focus:outline-none"
      >
        {expanded ? (
          <>
            Show less <IoChevronUp className="ml-1" />
          </>
        ) : (
          <>
            Read more <IoChevronDown className="ml-1" />
          </>
        )}
      </button>
    </div>
  )
}

ExpandableDescription.propTypes = {
  text: PropTypes.string,
}

export default function SpeakerProfilePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [speaker, setSpeaker] = useState(null)
  const [relatedSpeakers, setRelatedSpeakers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch speaker data
    try {
      const foundSpeaker = getSpeakerBySlug(slug)
      if (foundSpeaker) {
        setSpeaker(foundSpeaker)
        document.title = `${foundSpeaker.name} — COMPASS Detroit Speaker`

        // Add JSON-LD Person schema
        const scriptId = 'speaker-json-ld'
        let script = document.getElementById(scriptId)
        if (!script) {
          script = document.createElement('script')
          script.id = scriptId
          script.type = 'application/ld+json'
          document.head.appendChild(script)
        }
        script.innerHTML = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: foundSpeaker.name,
          jobTitle: foundSpeaker.position,
          worksFor: {
            '@type': 'Organization',
            name: foundSpeaker.organization,
          },
          url: window.location.href,
          image: foundSpeaker.avatar,
          description: foundSpeaker.bio,
        })

        // Find related speakers (shared categories or tracks)
        const all = getAllSpeakers()
        const related = all
          .filter((s) => {
            if (s.slug === foundSpeaker.slug) return false
            const sharedCategories = s.categories?.some((c) =>
              foundSpeaker.categories?.includes(c)
            )
            const sharedTracks = s.sessions?.some((s1) =>
              foundSpeaker.sessions?.some((s2) => s1.track === s2.track)
            )
            return sharedCategories || sharedTracks
          })
          .slice(0, 6)

        setRelatedSpeakers(related)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </SiteLayout>
    )
  }

  if (!speaker) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Speaker Not Found
          </h1>
          <p className="mb-8 text-lg text-gray-500">
            We couldn&apos;t find the speaker profile you&apos;re looking for.
          </p>
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
          >
            <IoArrowBack className="size-4" />
            Back to Speakers
          </Link>
        </div>
      </SiteLayout>
    )
  }

  // Use the most recent session's track for theme, or default
  const primaryTrack = speaker.sessions?.[0]?.track
  const trackTheme = TRACK_THEMES[primaryTrack] ?? TRACK_THEMES.default

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
      {/* 1. Hero Section */}
      <section className="relative w-full pt-16">
        <div
          className="relative px-6 py-20 text-white lg:py-24"
          style={heroStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent"></div>

          <div className="mx-auto max-w-[1200px] relative z-20">
            {/* Breadcrumbs / Back */}
            <div className="mb-8 flex items-center gap-2 text-sm text-white/80 font-medium">
              <Link
                to="/"
                className="hover:text-white hover:underline transition-colors"
              >
                Home
              </Link>
              <span>›</span>
              <Link
                to="/speakers"
                className="hover:text-white hover:underline transition-colors"
              >
                Speakers
              </Link>
              <span>›</span>
              <span className="text-white">{speaker.name}</span>
            </div>

            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-end gap-10">
              <div className="relative">
                <div className="size-48 md:size-56 lg:size-64 rounded-full bg-black/30 p-2 border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                  <img
                    src={
                      speaker.avatar ||
                      `https://placehold.co/600x400/0F9D58/FFFFFF?text=${speaker.name.charAt(
                        0
                      )}`
                    }
                    alt={`${speaker.name}`}
                    className="size-full rounded-full object-cover"
                  />
                </div>
                {/* Badges positioning */}
                <div className="absolute -bottom-2 right-4 flex gap-2">
                  {speaker.isGDE && (
                    <div
                      className="rounded-full bg-white p-1.5 shadow-lg"
                      title="Google Developer Expert"
                    >
                      <img src={GDEIcon} alt="GDE" className="size-6" />
                    </div>
                  )}
                  {speaker.isWTM && (
                    <div
                      className="rounded-full bg-white p-1.5 shadow-lg"
                      title="Women Techmakers Ambassador"
                    >
                      <img src={WTMLogo} alt="WTM" className="size-6" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                  {speaker.yearsActive?.map((year) => (
                    <span
                      key={year}
                      className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide border border-white/20"
                    >
                      <FaMicrophone
                        className="size-3 text-primary"
                        aria-hidden="true"
                      />
                      {year}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2">
                  {speaker.name}
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-medium mb-1">
                  {speaker.position}
                </p>
                {speaker.organization && (
                  <p className="text-lg text-white/80">
                    {speaker.organization}
                  </p>
                )}

                {/* Social links */}
                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {speaker.twitter && (
                    <a
                      href={`https://twitter.com/${speaker.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <IoLogoTwitter className="mr-2 size-4" /> @
                      {speaker.twitter}
                    </a>
                  )}
                  {speaker.linkedIn && (
                    <a
                      href={speaker.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <IoLogoLinkedin className="mr-2 size-4" /> LinkedIn
                    </a>
                  )}
                  {speaker.github && (
                    <a
                      href={speaker.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <IoLogoGithub className="mr-2 size-4" /> GitHub
                    </a>
                  )}
                  {speaker.mastodon && (
                    <a
                      href={speaker.mastodon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <FaMastodon className="mr-2 size-4" /> Mastodon
                    </a>
                  )}
                  {speaker.url && (
                    <a
                      href={speaker.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors border border-white/20 backdrop-blur-md"
                    >
                      <IoLinkOutline className="mr-2 size-4" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* 2. About Section */}
            <section>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                About {speaker.name.split(' ')[0]}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-prose">
                <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
                  {speaker.bio}
                </p>
              </div>

              {speaker.categories && speaker.categories.length > 0 && (
                <div className="mt-8">
                  <h3
                    className={`mb-3 text-sm font-bold uppercase tracking-wide ${styles.sectionHeader}`}
                  >
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {speaker.categories.map((cat, i) => (
                      <Link
                        key={i}
                        to={`/speakers?category=${encodeURIComponent(cat)}`}
                        className="rounded-full bg-surface-card border border-surface px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:border-primary hover:text-primary"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3. Talk History Timeline */}
            {speaker.sessions && speaker.sessions.length > 0 && (
              <section>
                <h2 className="mb-8 text-3xl font-bold tracking-tight">
                  Session History
                </h2>
                <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 md:ml-6 space-y-12">
                  {speaker.sessions
                    .sort((a, b) => b.year - a.year)
                    .map((session, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-10">
                        {/* Timeline dot */}
                        <div
                          className="absolute left-[-11px] top-1 size-5 rounded-full border-4 border-[var(--surface)] bg-primary"
                          aria-hidden="true"
                        ></div>

                        <div className="mb-1 flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                            {session.year}
                          </span>
                          {session.track && (
                            <span
                              className={`inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-surface-card px-2.5 py-0.5 text-xs font-medium ${styles.trackBadge}`}
                            >
                              {session.track}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold tracking-tight mb-2">
                          {session.title}
                        </h3>

                        {session.tags && session.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {session.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`text-xs font-medium uppercase tracking-wider ${styles.tagLabel}`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mb-4">
                          <ExpandableDescription
                            text={session.abstract || session.description}
                          />
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                          {speaker.slidesUrl && idx === 0 && (
                            <a
                              href={speaker.slidesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                            >
                              <IoDocumentTextOutline className="size-4" />
                              View Slides
                            </a>
                          )}
                          {speaker.videoUrl && idx === 0 && (
                            <a
                              href={speaker.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                            >
                              <IoPlayCircleOutline className="size-4" />
                              Watch Recording
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* 4. Resources Section */}
            {speaker.resources && speaker.resources.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold tracking-tight">
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
                      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <IoLinkOutline className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p
                            className={`mt-1 text-sm line-clamp-2 ${styles.resourceDescription}`}
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
          <div className="lg:col-span-1 space-y-12">
            {/* 5. Talk Photos Gallery */}
            {speaker.talkPhotos && speaker.talkPhotos.length > 0 && (
              <section className="rounded-2xl border border-surface bg-surface-card p-6">
                <h3 className="mb-4 text-lg font-bold">In Action</h3>
                <div className="grid grid-cols-2 gap-2">
                  {speaker.talkPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-lg bg-gray-100 ${
                        idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${speaker.name} speaking`}
                        className="size-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-surface bg-primary/5 p-6 text-center">
              <IoCalendarOutline className="mx-auto mb-3 size-8 text-primary" />
              <h3 className="mb-2 text-lg font-bold">
                Book {speaker.name.split(' ')[0]}
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Interested in having {speaker.name.split(' ')[0]} speak at your
                next event?
              </p>
              {speaker.url ? (
                <a
                  href={speaker.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary-400"
                >
                  Visit Website
                </a>
              ) : speaker.twitter ? (
                <a
                  href={`https://twitter.com/${speaker.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary-400"
                >
                  Contact via X
                </a>
              ) : speaker.linkedIn ? (
                <a
                  href={speaker.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary-400"
                >
                  Contact via LinkedIn
                </a>
              ) : null}
            </section>
          </div>
        </div>

        {/* 6. Related Speakers */}
        {relatedSpeakers.length > 0 && (
          <section className="mt-24 border-t border-surface pt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Similar Speakers
              </h2>
              <Link
                to="/speakers"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View all speakers →
              </Link>
            </div>

            {/* Horizontal scroll container */}
            <div className="flex snap-x snap-mandatory overflow-x-auto pb-8 -mx-6 px-6 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
              {relatedSpeakers.map((rs) => (
                <div
                  key={rs.slug}
                  className="min-w-[280px] snap-start md:min-w-0"
                >
                  <Link
                    to={`/speakers/${rs.slug}`}
                    className="block h-full transition-transform hover:-translate-y-1"
                  >
                    <ProfileCard
                      avatar={
                        rs.avatar ||
                        `https://placehold.co/600x400/0F9D58/FFFFFF?text=${rs.name.charAt(
                          0
                        )}`
                      }
                      name={rs.name}
                      organization={rs.organization}
                      position={rs.position}
                      track={rs.sessions?.[0]?.track}
                      isGDE={rs.isGDE}
                      isWTM={rs.isWTM}
                      twitter={rs.twitter}
                      linkedin={rs.linkedIn}
                      github={rs.github}
                      mastodon={rs.mastodon}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Bottom Navigation */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-surface-card p-6 border border-surface">
          <button
            onClick={() => {
              const all = getAllSpeakers()
              const currentIndex = all.findIndex((s) => s.slug === speaker.slug)
              if (currentIndex > 0) {
                navigate(`/speakers/${all[currentIndex - 1].slug}`)
              }
            }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <IoChevronBack /> Previous Speaker
          </button>

          <Link
            to="/speakers"
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            All Speakers
          </Link>

          <button
            onClick={() => {
              const all = getAllSpeakers()
              const currentIndex = all.findIndex((s) => s.slug === speaker.slug)
              if (currentIndex < all.length - 1) {
                navigate(`/speakers/${all[currentIndex + 1].slug}`)
              }
            }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Next Speaker <IoChevronForward />
          </button>
        </div>
      </div>
    </SiteLayout>
  )
}
