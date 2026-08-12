import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import {
  EVENT_TYPES,
  previousEvents,
  getAvailableYears,
  getAvailableTypes,
} from '@/data/previousEventsData'

const renderTypeIcon = (iconType) => {
  switch (iconType) {
    case 'mic':
      return (
        <svg
          className="size-3.5 text-blue-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )
    case 'heart':
      return (
        <svg
          className="size-3.5 text-purple-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    case 'fist':
      return (
        <svg
          className="size-3.5 text-amber-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg
          className="size-3.5 text-rose-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L9.19 8.63 2 12l7.19 3.37L12 22l2.81-6.63L22 12l-7.19-3.37z" />
        </svg>
      )
    case 'code':
      return (
        <svg
          className="size-3.5 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    default:
      return (
        <svg
          className="size-3.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}

export default function PreviousEventsPage() {
  const [filterType, setFilterType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const availableYears = getAvailableYears()
  const availableTypes = getAvailableTypes()

  // Aggregate stats
  const totalEvents = previousEvents.length
  const totalSpeakers = previousEvents.reduce(
    (acc, event) => acc + (event.speakers || 0),
    0
  )
  const totalSessions = previousEvents.reduce(
    (acc, event) => acc + (event.sessions || 0),
    0
  )
  const yearsActive = availableYears.length

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-black">
        {/* Decorations */}
        <div className="hero-orb-1 absolute top-0 left-1/4" />
        <div className="hero-orb-2 absolute bottom-0 right-1/4" />
        <div className="hero-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface/50 bg-surface/30 px-3 py-1 mb-6 backdrop-blur-md">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              History &amp; Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              Our Event Legacy
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-400 mb-12">
            Every event, every speaker, every session — building pathways across
            Michigan since 2023.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div
              className="rounded-xl border border-surface bg-surface-card p-6 reveal-stagger"
              style={{ '--stagger': 1 }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                {totalSpeakers}+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Total Speakers
              </div>
            </div>
            <div
              className="rounded-xl border border-surface bg-surface-card p-6 reveal-stagger"
              style={{ '--stagger': 2 }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                {totalSessions}+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Total Sessions
              </div>
            </div>
            <div
              className="rounded-xl border border-surface bg-surface-card p-6 reveal-stagger"
              style={{ '--stagger': 3 }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                {totalEvents}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Major Events
              </div>
            </div>
            <div
              className="rounded-xl border border-surface bg-surface-card p-6 reveal-stagger"
              style={{ '--stagger': 4 }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                {yearsActive}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Years Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="border-t border-surface bg-black sticky top-16 md:top-20 z-40 py-4 shadow-2xl backdrop-blur-md bg-black/90">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-1 no-scrollbar items-center">
            <button
              onClick={() => setSelectedYear('all')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedYear === 'all'
                  ? 'bg-primary text-black'
                  : 'border border-surface text-gray-400 hover:border-primary/40'
              }`}
            >
              All Years
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year.toString())}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedYear === year.toString()
                    ? 'bg-primary text-black'
                    : 'border border-surface text-gray-400 hover:border-primary/40'
                }`}
              >
                {year}
              </button>
            ))}
            <div className="h-4 w-px bg-surface mx-1 shrink-0" />
            <button
              onClick={() => setFilterType('all')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filterType === 'all'
                  ? 'bg-white/20 text-white'
                  : 'border border-surface text-gray-400 hover:border-primary/40'
              }`}
            >
              All Types
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  filterType === type
                    ? 'bg-white/20 text-white border border-primary/50'
                    : 'border border-surface text-gray-400 hover:border-primary/40'
                }`}
              >
                {renderTypeIcon(EVENT_TYPES[type]?.icon)}
                {EVENT_TYPES[type]?.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search past events..."
              className="w-full rounded-full border border-surface bg-surface-card py-2 pl-9 pr-4 text-xs font-medium text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 size-3.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-black py-20 pb-32">
        <div className="mx-auto max-w-[1200px] px-6">
          {availableYears
            .filter(
              (year) =>
                selectedYear === 'all' || selectedYear === year.toString()
            )
            .map((year) => {
              const yearEvents = previousEvents.filter((e) => {
                const matchesYear = e.year === year
                const matchesType =
                  filterType === 'all' || e.type === filterType
                const query = searchQuery.toLowerCase().trim()
                const matchesSearch =
                  !query ||
                  e.name.toLowerCase().includes(query) ||
                  e.description.toLowerCase().includes(query) ||
                  e.location.toLowerCase().includes(query)
                return matchesYear && matchesType && matchesSearch
              })

              if (yearEvents.length === 0) return null

              return (
                <div key={year} className="mb-24 last:mb-0 relative">
                  <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                      {year}
                    </h2>
                    <div className="h-px bg-surface flex-grow"></div>
                    <div className="text-gray-400 font-medium whitespace-nowrap">
                      {yearEvents.length} Event{yearEvents.length !== 1 && 's'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yearEvents.map((event, index) => {
                      const eventType =
                        EVENT_TYPES[event.type] || EVENT_TYPES.devfest

                      return (
                        <div
                          key={`${year}-${event.type}-${index}`}
                          className="group rounded-xl border border-surface bg-surface-card overflow-hidden hover:border-primary/30 transition-colors hover-lift flex flex-col h-full reveal-stagger"
                          style={{ '--stagger': index + 1 }}
                        >
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="mb-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/50 border border-surface px-2.5 py-1 text-xs font-semibold text-white">
                                {renderTypeIcon(eventType.icon)}
                                {eventType.label}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {event.name}
                            </h3>
                            <div className="text-sm text-gray-400 mb-4 flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="size-4 text-primary"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2">
                                <svg
                                  className="size-4 text-primary"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {event.location}
                              </div>
                            </div>

                            <p className="text-sm leading-relaxed text-gray-400 mb-6 flex-grow">
                              {event.description}
                            </p>

                            <div className="grid grid-cols-3 gap-2 border-y border-surface py-3 mb-6">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">
                                  {event.speakers}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                                  Speakers
                                </div>
                              </div>
                              <div className="text-center border-x border-surface">
                                <div className="text-lg font-bold text-white">
                                  {event.sessions || event.tracks}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                                  {event.sessions ? 'Sessions' : 'Tracks'}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">
                                  {event.attendees}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                                  Attendees
                                </div>
                              </div>
                            </div>

                            <div className="mt-auto">
                              {event.hasSpeakerData ? (
                                <Link
                                  to={`/previous-events/${event.year}`}
                                  className="block w-full text-center rounded-lg bg-surface/50 border border-surface px-4 py-2.5 text-sm font-semibold text-white hover:bg-surface hover:text-primary transition-colors"
                                >
                                  View Speakers &amp; Sessions
                                </Link>
                              ) : event.externalUrl ? (
                                <a
                                  href={event.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-center rounded-lg bg-surface/50 border border-surface px-4 py-2.5 text-sm font-semibold text-white hover:bg-surface hover:text-primary transition-colors flex items-center justify-center gap-2"
                                >
                                  Visit Event Site
                                  <svg
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <button
                                  disabled
                                  className="block w-full text-center rounded-lg bg-surface/20 border border-surface/50 px-4 py-2.5 text-sm font-semibold text-gray-600 cursor-not-allowed"
                                >
                                  Details Unavailable
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-surface bg-surface-card py-20 relative overflow-hidden">
        <div className="hero-orb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[800px] px-6 text-center z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6">
            Keep exploring our community
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Discover what&apos;s coming next or dive into our media gallery to
            see photos from these past events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-black hover:bg-primary-400 transition-colors"
            >
              View Upcoming Events
            </Link>
            <Link
              to="/gallery"
              className="rounded-full bg-surface border border-surface-border px-8 py-3.5 text-sm font-bold text-white hover:border-primary/50 transition-colors"
            >
              Browse Photo Gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
