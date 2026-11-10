import PropTypes from 'prop-types'
import { FaArrowDown } from 'react-icons/fa6'
import {
  DEVFEST_DAYS,
  DEVFEST_PROGRAM_STATS,
  DEVFEST_SPEAKERS,
  DEVFEST_TRACK_LIST,
} from '@/data/2026/devfestProgram'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import SpeakerGlobe from '../SpeakerGlobe'
import { TONE_HEX, nextSessionFor, phaseLabel } from '../programUtils'
import { scrollToId } from './helpers'

const BRAND_STRIPE = [
  'bg-devfest-blue',
  'bg-devfest-red',
  'bg-devfest-yellow',
  'bg-devfest-green',
]

/** Hero: the whole lineup on a globe, with a jump to each day. */
export default function ProgramHero({ phase, now, globePaused, onOpen }) {
  const stats = DEVFEST_PROGRAM_STATS
  return (
    <section
      aria-labelledby="devfest-program-title"
      className="dark-surface relative overflow-hidden bg-[#05070c] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_50%_at_75%_45%,theme(colors.devfest.blue/24%),transparent_70%),radial-gradient(40%_40%_at_8%_95%,theme(colors.devfest.green/16%),transparent_70%),radial-gradient(30%_35%_at_98%_98%,theme(colors.devfest.red/14%),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1.5">
        {BRAND_STRIPE.map((c) => (
          <span key={c} className={`flex-1 ${c}`} />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-6 px-6 pb-10 pt-14 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-devfest-green/40 bg-devfest-green/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-devfest-ht-green">
            <span className="size-2 rounded-full bg-devfest-ht-green motion-safe:animate-pulse" />
            {phaseLabel(phase)}
          </p>
          <h1
            id="devfest-program-title"
            className="mt-5 text-[2.6rem] font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
          >
            {stats.speakers} speakers.
            <br />
            <span className="bg-gradient-to-r from-devfest-ht-blue via-devfest-ht-green to-devfest-ht-yellow bg-clip-text text-transparent">
              Two days of building.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            Michigan DevFest ’26 lands in Greektown{' '}
            {DEVFEST_2026.shortDateLabel}. Friday you ship something with AI.
            Saturday you choose from {stats.talks} talks and workshops across{' '}
            {stats.tracks} tracks: {DEVFEST_TRACK_LIST}.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {DEVFEST_DAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => scrollToId(`day-${d.id}`)}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-left backdrop-blur transition-colors hover:border-white/40 hover:bg-white/[0.09]"
              >
                <span
                  className="text-5xl font-black tabular-nums leading-none"
                  style={{ color: TONE_HEX[d.tone] }}
                >
                  {d.numeral}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-white/60">
                    {d.weekday} · Nov
                  </span>
                  <span className="block text-lg font-extrabold text-white">
                    {d.title}
                  </span>
                  <span className="block text-sm text-white/70">
                    {d.tagline}
                  </span>
                </span>
                <FaArrowDown
                  aria-hidden="true"
                  className="ml-auto shrink-0 text-white/40 transition-transform group-hover:translate-y-0.5 group-hover:text-white"
                />
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={DEVFEST_2026.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-gray-950 transition-transform hover:scale-[1.03] motion-reduce:hover:scale-100"
            >
              Get tickets
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToId('speakers')}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white"
            >
              Meet the speakers
            </button>
          </div>
        </div>

        <div className="-order-1 mx-auto w-full max-w-[380px] lg:order-none lg:max-w-none">
          <SpeakerGlobe
            speakers={DEVFEST_SPEAKERS}
            paused={globePaused}
            onSelect={(p) => onOpen(nextSessionFor(p.sessions, now).id)}
          />
        </div>
      </div>
    </section>
  )
}

ProgramHero.propTypes = {
  phase: PropTypes.object.isRequired,
  now: PropTypes.number.isRequired,
  globePaused: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
}
