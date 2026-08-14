import { useParams, Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import SessionsSection from '@/layouts/SessionsSection'
import SpeakersSection from '@/layouts/SpeakersSection'
import SponsorsSection from '@/layouts/SponsorsSection'
import TeamSection from '@/layouts/TeamSection'
import {
  getEventData,
  getEventMetadata,
  getAvailableYears,
} from '@/utils/eventData'

const PreviousEvent = () => {
  const { year } = useParams()
  const yearNumber = parseInt(year, 10)
  const eventData = getEventData(yearNumber)
  const eventMetadata = getEventMetadata(yearNumber)
  const availableYears = getAvailableYears()

  const currentIndex = availableYears.indexOf(yearNumber)
  const nextYear = currentIndex > 0 ? availableYears[currentIndex - 1] : null
  const prevYear =
    currentIndex < availableYears.length - 1
      ? availableYears[currentIndex + 1]
      : null

  if (!eventData || !eventMetadata.available) {
    return (
      <SiteLayout>
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20">
          <div className="hero-grid-pattern absolute inset-0 opacity-20"></div>
          <div className="hero-orb-1 opacity-20"></div>
          <div className="hero-orb-2 opacity-20"></div>

          <div className="relative z-10 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Event{' '}
              <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
                Not Found
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-500">
              The DevFest {year} event data is not available.
            </p>
            <Link
              to="/events/previous"
              className="inline-flex rounded-xl bg-primary px-8 py-3 font-semibold text-primary-950 transition-transform hover:scale-105"
            >
              Back to All Events
            </Link>
          </div>
        </section>
      </SiteLayout>
    )
  }

  const speakersData = eventData.speakers
  const sponsorsData = eventData.sponsors || []
  const teamData = eventData.team || []

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="hero-grid-pattern absolute inset-0"></div>
        <div className="hero-orb-1 opacity-40"></div>
        <div className="hero-orb-2 opacity-40"></div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <Link
            to="/events/previous"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-400"
          >
            ← Back to All Events
          </Link>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Michigan DevFest{' '}
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              {year}
            </span>
          </h1>

          <div className="mb-12 flex flex-wrap justify-center gap-4 reveal-stagger">
            <div className="trust-badge flex items-center gap-2 rounded-xl border border-surface bg-surface-card px-4 py-2">
              <span className="font-bold text-primary">
                {eventMetadata.speakerCount}
              </span>
              <span className="text-sm text-gray-400">
                Speaker{eventMetadata.speakerCount !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="trust-badge flex items-center gap-2 rounded-xl border border-surface bg-surface-card px-4 py-2">
              <span className="font-bold text-primary">
                {eventMetadata.sessionCount}
              </span>
              <span className="text-sm text-gray-400">
                Session{eventMetadata.sessionCount !== 1 ? 's' : ''}
              </span>
            </div>
            {eventMetadata.tracks.length > 0 && (
              <div className="trust-badge flex items-center gap-2 rounded-xl border border-surface bg-surface-card px-4 py-2">
                <span className="font-bold text-primary">
                  {eventMetadata.tracks.length}
                </span>
                <span className="text-sm text-gray-400">
                  Track{eventMetadata.tracks.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            {prevYear ? (
              <Link
                to={`/previous-events/${prevYear}`}
                className="rounded-lg border border-surface bg-surface-card px-4 py-2 text-sm font-semibold text-gray-400 transition-colors hover:text-primary hover:border-primary/50"
              >
                ← {prevYear}
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm font-semibold text-gray-600">
                ← Prev
              </span>
            )}

            <div className="h-4 w-px bg-surface"></div>

            {nextYear ? (
              <Link
                to={`/previous-events/${nextYear}`}
                className="rounded-lg border border-surface bg-surface-card px-4 py-2 text-sm font-semibold text-gray-400 transition-colors hover:text-primary hover:border-primary/50"
              >
                {nextYear} →
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm font-semibold text-gray-600">
                Next →
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <SessionsSection
            year={yearNumber}
            speakersData={speakersData}
            tracks={eventMetadata.tracks}
          />
        </div>
      </section>

      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <SpeakersSection year={yearNumber} speakersData={speakersData} />
        </div>
      </section>

      {sponsorsData.length > 0 && (
        <section className="border-t border-surface">
          <div className="mx-auto max-w-[1200px] px-6 py-20">
            <SponsorsSection
              year={yearNumber}
              sponsorsData={sponsorsData}
              defaultExpanded
              collapsible
            />
          </div>
        </section>
      )}

      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <TeamSection teamData={teamData} year={yearNumber} />
        </div>
      </section>

      {/* Photo Gallery Teaser */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Event Photos
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            View photos from this event in our gallery
          </p>
          <Link
            to="/gallery"
            className="inline-flex rounded-xl border border-surface bg-surface-card px-8 py-3 font-semibold text-primary transition-all hover:-translate-y-1 hover:border-primary/50"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/events/previous"
              className="w-full rounded-xl border border-surface bg-surface-card px-6 py-4 text-center font-semibold text-gray-400 transition-colors hover:text-primary hover:border-primary/50 sm:w-auto"
            >
              Back to All Events
            </Link>
            <Link
              to="/events"
              className="w-full rounded-xl bg-primary px-6 py-4 text-center font-semibold text-primary-950 transition-transform hover:scale-105 sm:w-auto"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default PreviousEvent
