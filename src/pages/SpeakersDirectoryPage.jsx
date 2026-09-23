import { useMemo, useState } from 'react'
import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6'
import SiteLayout from '@/layouts/SiteLayout'
import SpeakerSpotlightCard from '@/components/speakers/SpeakerSpotlightCard'
import {
  getAllSpeakers,
  getAllTracks,
  getAllCategories,
  getYearRange,
  getTotalSpeakerCount,
} from '@/utils/speakerRegistry'

const YEARS = [2026, 2025, 2024, 2023]

const SORTS = {
  recent: {
    label: 'Most recent',
    compare: (a, b) =>
      Math.max(...b.yearsActive) - Math.max(...a.yearsActive) ||
      a.name.localeCompare(b.name),
  },
  talks: {
    label: 'Most talks',
    compare: (a, b) =>
      b.sessions.length - a.sessions.length || a.name.localeCompare(b.name),
  },
  name: { label: 'Name A–Z', compare: (a, b) => a.name.localeCompare(b.name) },
}

const chipClass = (active) =>
  `whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
    active
      ? 'border-primary bg-primary text-gray-950'
      : 'border-surface bg-surface-card text-theme-secondary hover:border-primary/50'
  }`

export default function SpeakersDirectoryPage() {
  const allSpeakers = useMemo(() => getAllSpeakers(), [])
  const allTracks = useMemo(() => getAllTracks(), [])
  const allCategories = useMemo(() => getAllCategories(), [])
  const stats = useMemo(() => {
    const range = getYearRange()
    return {
      speakers: getTotalSpeakerCount(),
      talks: allSpeakers.reduce((n, s) => n + s.sessions.length, 0),
      returning: allSpeakers.filter((s) => s.yearsActive.length > 1).length,
      range: `${range.earliest}–${range.latest}`,
    }
  }, [allSpeakers])

  const [query, setQuery] = useState('')
  const [years, setYears] = useState([])
  const [tracks, setTracks] = useState([])
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('recent')

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  const toggleYear = toggle(setYears)
  const toggleTrack = toggle(setTracks)
  const hasFilters = query || years.length || tracks.length || category
  const clearFilters = () => {
    setQuery('')
    setYears([])
    setTracks([])
    setCategory('')
  }

  const speakers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allSpeakers
      .filter(
        (s) =>
          (!q ||
            s.name.toLowerCase().includes(q) ||
            s.organization?.toLowerCase().includes(q) ||
            s.sessions.some((t) => t.title?.toLowerCase().includes(q))) &&
          (!years.length || years.some((y) => s.yearsActive.includes(y))) &&
          (!tracks.length ||
            tracks.some((t) =>
              s.sessions.some((sess) => (sess.tracks ?? []).includes(t))
            )) &&
          (!category || s.categories.includes(category))
      )
      .sort(SORTS[sort].compare)
  }, [allSpeakers, query, years, tracks, category, sort])

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-surface pb-12 pt-16 md:pt-24">
        <div className="hero-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Speakers
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-theme-primary md:text-6xl">
            The voices behind{' '}
            <span className="bg-gradient-to-r from-primary via-amber-400 to-orange-500 bg-clip-text text-transparent">
              COMPASS Detroit
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-theme-secondary">
            Engineers, founders, designers and leaders who took the stage at
            Michigan DevFest and our Innovation Summits to share what they know.
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              [stats.speakers, 'Speakers'],
              [stats.talks, 'Talks'],
              [stats.returning, 'Returning speakers'],
              [stats.range, 'Years'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  {label}
                </dt>
                <dd className="text-3xl font-extrabold tabular-nums text-theme-primary">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Filters */}
      <section
        aria-label="Filter speakers"
        className="sticky top-16 z-30 border-y border-surface backdrop-blur-md"
        style={{
          background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search speakers</span>
              <FaMagnifyingGlass
                className="pointer-events-none absolute left-4 top-1/2 size-3.5 -translate-y-1/2 text-theme-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, company or talk…"
                className="w-full rounded-full border border-surface bg-surface-card py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder:text-theme-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <div className="flex gap-2">
              <label className="sr-only" htmlFor="speaker-category">
                Topic
              </label>
              <select
                id="speaker-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 rounded-full border border-surface bg-surface-card px-4 py-2.5 text-sm text-theme-primary focus:border-primary focus:outline-none sm:flex-none"
              >
                <option value="">All topics</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="speaker-sort">
                Sort
              </label>
              <select
                id="speaker-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-w-0 flex-1 rounded-full border border-surface bg-surface-card px-4 py-2.5 text-sm text-theme-primary focus:border-primary focus:outline-none sm:flex-none"
              >
                {Object.entries(SORTS).map(([id, { label }]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="-mx-6 flex items-center gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none]">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                aria-pressed={years.includes(y)}
                onClick={() => toggleYear(y)}
                className={chipClass(years.includes(y))}
              >
                {y}
              </button>
            ))}
            <span className="mx-1 h-5 w-px shrink-0 bg-[var(--border)]" />
            {allTracks.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tracks.includes(t)}
                onClick={() => toggleTrack(t)}
                className={chipClass(tracks.includes(t))}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-10 pb-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-theme-secondary" role="status">
              Showing{' '}
              <strong className="text-theme-primary">{speakers.length}</strong>{' '}
              of {allSpeakers.length} speakers
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <FaXmark className="size-3" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {speakers.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {speakers.map((speaker) => (
                <li key={speaker.slug}>
                  <SpeakerSpotlightCard
                    speaker={speaker}
                    to={`/speakers/${speaker.slug}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-dashed border-surface bg-surface-card p-12 text-center">
              <h2 className="text-xl font-semibold text-theme-primary">
                No speakers match those filters
              </h2>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-gray-950 hover:bg-primary-400"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
