import { Link } from 'react-router-dom'
import {
  LHM_EVENT,
  LHM_PARTNERS,
  LHM_RUN_OF_SHOW,
  LHM_SESSIONS,
  SpeakersData as speakers,
} from '@/data/2026/lhmSummit'
import { generateSlug } from '@/utils/speakerRegistry'
import { sanityImage } from '@/services/sanity'
import { LHM_PHOTOS } from '@/data/2026/lhmGallery'
import PhotoGallery from '@/components/events/PhotoGallery'

const TIER_ORDER = ['diamond', 'platinum', 'gold', 'silver', 'bronze']

const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${
    h < 12 ? 'AM' : 'PM'
  }`
}

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const sponsors = [...LHM_PARTNERS.sponsors].sort(
  (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier)
)

// The day's timeline: every session, then the closing program
const timeline = [
  ...LHM_SESSIONS.map((s) => ({ ...s, kind: 'session' })),
  ...LHM_RUN_OF_SHOW.filter(({ time }) => time >= '15:30').map((item) => ({
    ...item,
    kind: 'program',
  })),
].sort((a, b) => a.time.localeCompare(b.time))

export default function LhmSummitRecap() {
  return (
    <section
      id="lhm-recap"
      aria-labelledby="lhm-recap-title"
      className="accent-contrast relative scroll-mt-24 overflow-hidden border-y border-amber-500/20 bg-gradient-to-b from-surface via-amber-500/[0.04] to-surface py-20"
    >
      <div className="pointer-events-none absolute -right-32 top-10 size-[28rem] rounded-full bg-amber-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 size-96 rounded-full bg-rose-500/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <header className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
              Just Wrapped · {LHM_EVENT.dateLabel}
            </span>
            <h2
              id="lhm-recap-title"
              className="text-3xl font-black tracking-tight text-theme-primary md:text-5xl"
            >
              Latin Heritage Month{' '}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Innovation Summit
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              {LHM_EVENT.venue}, {LHM_EVENT.address}. Theme:{' '}
              <em className="not-italic text-amber-200">{LHM_EVENT.theme}</em>.
            </p>
          </div>
          <a
            href={LHM_EVENT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-6 py-3 text-sm font-bold text-amber-200 transition-colors hover:bg-amber-500/20"
          >
            Visit Summit Site
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </header>

        <div className="mb-16">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Moments
            </h3>
            <a
              href="https://photos.google.com/share/AF1QipOfVff_uV6TJtyKTNAVrCzPrLC6r7jad43LOL7DNJ9-UxWeyNZ0QZbfrQTAU_Q9xw?key=Z3VHYm14Mm0yOGFJaE03YnVsa1NycHd0LVBCYnd3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-amber-300 hover:underline"
            >
              Full album
              <span className="sr-only">
                {' '}
                (opens Google Photos in a new tab)
              </span>
            </a>
          </div>
          <PhotoGallery
            photos={LHM_PHOTOS}
            label="LHM Innovation Summit 2026 photos"
          />
        </div>

        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-400">
          Speakers
        </h3>
        <ul className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {speakers.map((speaker) => (
            <li key={speaker.name}>
              <Link
                to={`/speakers/${generateSlug(speaker.name)}`}
                className="group block h-full rounded-xl border border-surface bg-surface-card p-3 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-amber-400/50 focus-visible:-translate-y-1"
              >
                {speaker.avatar ? (
                  <img
                    src={sanityImage(speaker.avatar, { w: 240, h: 240 })}
                    alt=""
                    width="240"
                    height="240"
                    loading="lazy"
                    className="mb-3 aspect-square w-full rounded-lg object-cover grayscale-[20%] transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="mb-3 flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/25 to-rose-500/15 text-3xl font-black text-amber-200"
                  >
                    {initials(speaker.name)}
                  </div>
                )}
                <div className="font-bold leading-tight text-theme-primary group-hover:text-amber-200">
                  {speaker.name}
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {speaker.organization}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mb-16 max-w-3xl">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-400">
            The Day
          </h3>
          <ol className="relative space-y-4 border-l border-amber-500/20 pl-6">
            {timeline.map((item) => (
              <li key={item.title} className="relative">
                <span
                  className={`absolute left-[-1.83rem] top-1.5 size-3 rounded-full ${
                    item.kind === 'session'
                      ? 'bg-amber-400 ring-4 ring-amber-400/20'
                      : 'border-2 border-amber-400 bg-[var(--surface)]'
                  }`}
                />
                <div className="text-xs font-bold tabular-nums text-amber-300">
                  {formatTime(item.time)}
                  {item.tags?.[0] && (
                    <span className="ml-2 rounded bg-surface-elevated px-1.5 py-0.5 font-semibold text-gray-400">
                      {item.tags[0]}
                    </span>
                  )}
                </div>
                <div
                  className={`mt-1 ${
                    item.kind === 'session'
                      ? 'font-semibold text-theme-primary'
                      : 'text-theme-secondary'
                  }`}
                >
                  {item.title}
                </div>
                {item.moderators?.length > 0 ? (
                  <div className="text-sm text-gray-400">
                    {item.panelists.join(', ')} · moderated by{' '}
                    {item.moderators.join(', ')}
                  </div>
                ) : (
                  item.speakers?.length > 0 && (
                    <div className="text-sm text-gray-400">
                      {item.speakers.join(', ')}
                    </div>
                  )
                )}
              </li>
            ))}
          </ol>
        </div>

        <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-400">
          Sponsors
        </h3>
        <ul className="mb-10 flex flex-wrap items-center gap-4">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id}>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-36 items-center justify-center rounded-xl border border-surface bg-white p-3 transition-transform hover:scale-105"
              >
                <img
                  src={sanityImage(sponsor.logo, { w: 280, fit: 'max' })}
                  alt={sponsor.logoAlt || sponsor.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </a>
            </li>
          ))}
        </ul>

        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
          Community Partners
        </h3>
        <ul className="flex flex-wrap gap-2">
          {LHM_PARTNERS.community.map((partner) => (
            <li
              key={partner.id}
              className="rounded-full border border-surface bg-surface-card px-3 py-1.5 text-xs font-semibold text-theme-secondary"
            >
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
