import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaStar, FaRegStar, FaXmark, FaCalendarPlus } from 'react-icons/fa6'
import { formatTime, DEVFEST_DAYS } from '@/data/2026/devfestProgram'
import { generateSlug } from '@/utils/speakerRegistry'
import { sanityImage } from '@/services/sanity'
import { downloadICS, getGoogleCalendarUrl } from '@/utils/generateICS'
import { calendarEvent, toneOf } from './programUtils'

const DAY_LABEL = Object.fromEntries(DEVFEST_DAYS.map((d) => [d.id, d.label]))

export default function SessionDialog({
  session,
  saved,
  clashes,
  onToggleSave,
  onClose,
}) {
  const ref = useRef(null)

  // Clicking the dimmed backdrop closes the dialog. Keyboard users already
  // have Escape, which <dialog> handles natively.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return undefined
    const onBackdrop = (e) => e.target === dialog && dialog.close?.()
    dialog.addEventListener('click', onBackdrop)
    return () => dialog.removeEventListener('click', onBackdrop)
  }, [])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (session && !dialog.open) {
      if (dialog.showModal) dialog.showModal()
      else dialog.setAttribute('open', '')
    }
    if (!session && dialog.open) dialog.close?.()
  }, [session])

  const tone = toneOf(session?.tone)

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="session-dialog-title"
      className="w-[min(680px,calc(100vw-32px))] max-h-[88vh] overflow-y-auto rounded-2xl border border-surface bg-surface-card p-0 text-theme-primary shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {session && (
        <article>
          <div className={`h-1.5 ${tone.bar}`} />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${tone.chip}`}
              >
                {session.track}
              </span>
              <button
                type="button"
                onClick={() => ref.current?.close?.()}
                className="rounded-full p-2 text-theme-muted transition-colors hover:bg-surface-elevated hover:text-theme-primary"
                aria-label="Close session details"
              >
                <FaXmark aria-hidden="true" />
              </button>
            </div>

            <h2
              id="session-dialog-title"
              className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl"
            >
              {session.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-theme-secondary">
              {DAY_LABEL[session.day]} · {formatTime(session.time)} –{' '}
              {formatTime(session.timeEnd)} · {session.duration} min
            </p>

            {clashes.length > 0 && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-devfest-yellow/50 bg-devfest-yellow/10 px-4 py-2 text-sm"
              >
                Overlaps with{' '}
                <strong>{clashes.map((c) => c.title).join(', ')}</strong> in
                your schedule.
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onToggleSave(session.id)}
                aria-pressed={saved}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  saved
                    ? 'bg-primary text-gray-950'
                    : 'border border-surface hover:border-primary/60'
                }`}
              >
                {saved ? (
                  <FaStar aria-hidden="true" />
                ) : (
                  <FaRegStar aria-hidden="true" />
                )}
                {saved ? 'In my schedule' : 'Add to my schedule'}
              </button>
              <a
                href={getGoogleCalendarUrl(calendarEvent(session))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-surface px-4 py-2 text-sm font-bold transition-colors hover:border-primary/60"
              >
                <FaCalendarPlus aria-hidden="true" />
                Google Calendar
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={() => downloadICS(calendarEvent(session))}
                className="inline-flex items-center gap-2 rounded-full border border-surface px-4 py-2 text-sm font-bold transition-colors hover:border-primary/60"
              >
                Download .ics
              </button>
            </div>

            {session.abstract && (
              <p className="mt-6 text-base font-medium leading-relaxed">
                {session.abstract}
              </p>
            )}
            {session.description &&
              session.description !== session.abstract && (
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-theme-secondary">
                  {session.description}
                </p>
              )}

            {session.speakers.length > 0 && (
              <section className="mt-8 border-t border-surface pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                  {session.speakers.length > 1 ? 'Speakers' : 'Speaker'}
                </h3>
                <ul className="mt-4 space-y-5">
                  {session.speakers.map((p) => (
                    <li key={p.slug} className="flex gap-4">
                      {p.avatar && (
                        <img
                          src={sanityImage(p.avatar, { w: 128, h: 128 })}
                          alt=""
                          width="56"
                          height="56"
                          loading="lazy"
                          className="size-14 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <Link
                          to={`/speakers/${generateSlug(p.name)}`}
                          className="font-bold hover:text-primary hover:underline"
                        >
                          {p.name}
                        </Link>
                        <p className="text-sm text-theme-secondary">
                          {[p.position, p.organization]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                        {p.bio && (
                          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-theme-muted">
                            {p.bio}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      )}
    </dialog>
  )
}

SessionDialog.propTypes = {
  session: PropTypes.object,
  saved: PropTypes.bool.isRequired,
  clashes: PropTypes.array.isRequired,
  onToggleSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}
