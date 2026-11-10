import { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  DEVFEST_DAY_BY_ID,
  DEVFEST_PROGRAM_STATS,
  DEVFEST_SPEAKERS,
  DEVFEST_TRACKS,
  formatTime,
} from '@/data/2026/devfestProgram'
import { sanityImage } from '@/services/sanity'
import { TONE_HEX } from '../programUtils'
import { chipClass } from './helpers'

/** Speakers, photo first, filterable by track. */
export default function SpeakerShowcase({ track, onTrackChange, onOpen }) {
  const speakers = useMemo(
    () =>
      DEVFEST_SPEAKERS.filter(
        (p) => !track || p.sessions.some((s) => s.track === track)
      ),
    [track]
  )

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-16"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-theme-muted">
        The lineup
      </p>
      <h2
        id="speakers-title"
        className="mt-2 text-3xl font-black tracking-tight md:text-4xl"
      >
        Meet the speakers
      </h2>
      <p className="mt-2 max-w-xl text-theme-secondary">
        Engineers, founders, designers and researchers from{' '}
        {DEVFEST_PROGRAM_STATS.organizations} organizations. Tap anyone to read
        their session.
      </p>

      <div
        className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none]"
        role="group"
        aria-label="Filter by track"
      >
        <button
          type="button"
          aria-pressed={!track}
          onClick={() => onTrackChange('')}
          className={chipClass(!track)}
        >
          All tracks
        </button>
        {DEVFEST_TRACKS.map((t) => (
          <button
            key={t.name}
            type="button"
            aria-pressed={track === t.name}
            onClick={() => onTrackChange(track === t.name ? '' : t.name)}
            className={`inline-flex items-center gap-2 ${chipClass(
              track === t.name
            )}`}
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: TONE_HEX[t.tone] }}
            />
            {t.name}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {speakers.map((p) => (
          <SpeakerCard key={p.slug} speaker={p} track={track} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  )
}

SpeakerShowcase.propTypes = {
  track: PropTypes.string.isRequired,
  onTrackChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
}

function SpeakerCard({ speaker: p, track, onOpen }) {
  // With a track picked, show the talk that belongs to it
  const talk =
    p.sessions.find((s) => !track || s.track === track) ?? p.sessions[0]
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(talk.id)}
        className="group flex size-full flex-col overflow-hidden rounded-2xl border border-surface bg-surface-card text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-xl"
      >
        <span className="relative isolate block aspect-[4/5] overflow-hidden bg-surface-elevated">
          {p.avatar ? (
            <img
              src={sanityImage(p.avatar, { w: 480, h: 600 })}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span className="flex size-full items-center justify-center text-5xl font-black text-theme-muted">
              {p.name[0]}
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-14">
            <span className="block text-base font-extrabold leading-tight text-white md:text-lg">
              {p.name}
            </span>
            <span className="mt-0.5 block truncate text-xs text-white/80">
              {p.organization}
            </span>
          </span>
          <span
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-950"
            style={{ background: TONE_HEX[talk.tone] }}
          >
            {talk.track}
          </span>
        </span>
        <span className="flex flex-1 flex-col p-3.5">
          <span className="line-clamp-3 text-sm font-bold leading-snug">
            {talk.title}
          </span>
          <span className="mt-auto pt-2 text-xs font-semibold tabular-nums text-theme-muted">
            {DEVFEST_DAY_BY_ID[talk.day].weekday} · {formatTime(talk.time)}
          </span>
        </span>
      </button>
    </li>
  )
}

SpeakerCard.propTypes = {
  speaker: PropTypes.object.isRequired,
  track: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
}
