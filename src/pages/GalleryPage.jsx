import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import { CATALOG_PHOTOS } from '@/data/galleryData'
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaXmark,
  FaExpand,
  FaWandMagicSparkles,
  FaCamera,
  FaHeart,
} from 'react-icons/fa6'

const ALL_GALLERY_PHOTOS =
  CATALOG_PHOTOS && CATALOG_PHOTOS.length > 0
    ? CATALOG_PHOTOS
    : [
        {
          id: 'img-1',
          src: '/assets/gallery/iwd26/image0.jpeg',
          title: 'IWD Summit 2026 Group Photo',
          category: 'IWD Summit 2026',
          photographer: 'Heart of the City Photography',
        },
      ]

const FEATURED_SLIDES = [
  {
    id: 'iwd26-feat',
    src: '/assets/gallery/iwd26/image0.jpeg',
    title: 'IWD Summit 2026 Group Showcase',
    subtitle:
      'Captured by Heart of the City Photography · Celebrating Inclusion & Empowerment',
    tag: 'Heart of the City Spotlight',
  },
  {
    id: 'devfest25-feat',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0598.jpg',
    title: 'Michigan DevFest Keynote',
    subtitle: 'Pioneering emerging tech & inclusive leadership in Detroit',
    tag: 'DevFest Stage',
  },
  {
    id: 'iwd25-feat',
    src: '/assets/gallery/iwd26/image1.jpeg',
    title: 'Navigators & Mentors Circle',
    subtitle: 'Connecting students directly to corporate tech leaders',
    tag: 'IWD 2026',
  },
]

const CATEGORIES = [
  'All',
  'IWD Summit 2026',
  'DevFest 2025',
  'IWD Summit 2025',
  'DevFest 2024',
  'IWD Summit 2024',
  'BHM Summit 2024',
  'Level Up 2024',
  'Winter Mixer 2023',
  'COMPES PDC 2023',
  'COMPES PDC Channel 4',
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [hoveredParallax, setHoveredParallax] = useState(false)

  // Filtered photos
  const filteredPhotos =
    selectedCategory === 'All'
      ? ALL_GALLERY_PHOTOS
      : ALL_GALLERY_PHOTOS.filter((p) => p.category === selectedCategory)

  // 3D Carousel Auto-play
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % FEATURED_SLIDES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null || filteredPhotos.length === 0) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length)
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(
          (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        )
      }
    },
    [lightboxIndex, filteredPhotos.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const handleCategoryChange = (cat) => {
    setLightboxIndex(null)
    setSelectedCategory(cat)
  }

  const openMarqueeLightbox = (globalIndex) => {
    setSelectedCategory('All')
    setLightboxIndex(globalIndex % ALL_GALLERY_PHOTOS.length)
  }

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="hero-orb-1 absolute -right-32 -top-32 size-[400px] rounded-full bg-gradient-to-br from-primary/[0.08] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 left-1/4 size-[300px] rounded-full bg-gradient-to-tr from-emerald-500/[0.05] to-transparent blur-3xl" />
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1">
            <FaWandMagicSparkles className="size-3 animate-pulse text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              {ALL_GALLERY_PHOTOS.length}+ Event Moments Cataloged
            </span>
          </div>
          <h1 className="mb-6 max-w-[750px] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Experience our community{' '}
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              in action.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            From DevFest and IWD Summits to BHM Summits and COMPES PDC events —
            explore high-resolution memories from our COMPASS Detroit community.
          </p>
        </div>
      </section>

      {/* Heart of the City Photography Recognition Banner */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12">
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-primary/10 to-purple-500/10 p-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shadow-md">
                <FaCamera className="size-6" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Special Recognition
                  </span>
                  <FaHeart className="size-3 animate-pulse text-red-500" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                  Heart of the City Photography
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-300">
                  A massive thank you to{' '}
                  <strong className="text-white">
                    Heart of the City Photography
                  </strong>{' '}
                  for capturing our stunning{' '}
                  <strong className="text-primary">
                    2026 International Women&apos;s Day (IWD) Group Pictures
                  </strong>
                  ! Their artistry, dedication, and passion beautifully showcase
                  the vibrancy of our COMPASS community.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleCategoryChange('IWD Summit 2026')}
              className="shrink-0 rounded-xl border border-amber-400/40 bg-amber-500/20 px-5 py-2.5 text-xs font-bold text-amber-300 transition-all hover:bg-amber-500 hover:text-black hover:shadow-lg"
            >
              View IWD 2026 Photos
            </button>
          </div>
        </div>
      </section>

      {/* 3D Showcase Carousel Section */}
      <section className="border-t border-surface bg-gradient-to-b from-primary/[0.02] to-transparent py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                Featured Gallery
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Spotlight Highlights
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="flex size-10 items-center justify-center rounded-xl border border-surface bg-surface-card text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
                aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
              >
                {isPlaying ? (
                  <FaPause className="size-3.5" />
                ) : (
                  <FaPlay className="size-3.5" />
                )}
              </button>
              <button
                onClick={() =>
                  setActiveSlideIndex(
                    (prev) =>
                      (prev - 1 + FEATURED_SLIDES.length) %
                      FEATURED_SLIDES.length
                  )
                }
                className="flex size-10 items-center justify-center rounded-xl border border-surface bg-surface-card text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Previous featured slide"
              >
                <FaChevronLeft className="size-3.5" />
              </button>
              <button
                onClick={() =>
                  setActiveSlideIndex(
                    (prev) => (prev + 1) % FEATURED_SLIDES.length
                  )
                }
                className="flex size-10 items-center justify-center rounded-xl border border-surface bg-surface-card text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Next featured slide"
              >
                <FaChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Featured Stage Display */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/20 bg-surface-card shadow-2xl md:aspect-[21/9]">
            {FEATURED_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive
                      ? 'pointer-events-auto scale-100 opacity-100'
                      : 'pointer-events-none scale-105 opacity-0'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                  {/* Slide Content Overlay Glass Bar */}
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/30 bg-black/90 p-6 shadow-2xl backdrop-blur-2xl md:inset-x-8 md:bottom-8 md:p-8">
                    <div className="flex max-w-3xl flex-col gap-2">
                      <span className="w-fit rounded-full border border-primary/50 bg-primary/25 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary backdrop-blur-md">
                        {slide.tag}
                      </span>
                      <h3 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-3xl">
                        {slide.title}
                      </h3>
                      <p className="text-sm font-medium leading-relaxed text-gray-100 md:text-base">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Slide Navigation Dots */}
            <div className="absolute right-8 top-6 z-20 flex items-center gap-2">
              {FEATURED_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlideIndex(i)}
                  className={`h-2.5 rounded-full shadow-sm transition-all duration-300 ${
                    i === activeSlideIndex
                      ? 'w-8 bg-primary shadow-primary/30'
                      : 'w-2.5 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Picture-in-Picture Parallax Story Section */}
      <section className="border-t border-surface py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-primary">
              Visual Stories
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Moments of Impact
            </h2>
          </div>

          <div className="mb-24 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                onMouseEnter={() => setHoveredParallax(true)}
                onMouseLeave={() => setHoveredParallax(false)}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface bg-surface-card shadow-2xl transition-all duration-500 hover:border-primary/40"
              >
                <img
                  src="/assets/gallery/iwd26/image0.jpeg"
                  alt="IWD 2026 Group"
                  className={`size-full object-cover transition-transform duration-700 ease-out ${
                    hoveredParallax ? 'scale-105 brightness-75' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/30" />

                <div
                  className={`absolute bottom-6 right-6 aspect-[4/3] w-3/5 overflow-hidden rounded-xl border-2 border-primary/40 shadow-2xl transition-all duration-700 ease-out ${
                    hoveredParallax
                      ? 'translate-y-[-12px] scale-105 border-primary'
                      : 'translate-y-0 scale-100'
                  }`}
                >
                  <img
                    src="/assets/gallery/iwd26/image2.jpeg"
                    alt="IWD 2026 Group Detail"
                    className="size-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-primary backdrop-blur-sm">
                    Heart of the City Photography
                  </div>
                </div>

                <div className="absolute left-6 top-6 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md">
                  <span className="text-xs font-bold text-white">
                    IWD 2026 Group Celebration
                  </span>
                  <p className="text-[10px] text-gray-400">Detroit, Michigan</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="mb-3 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                Special Photography Spotlight
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                IWD 2026 Group Pictures by Heart of the City Photography
              </h3>
              <p className="mb-6 leading-relaxed text-gray-400">
                We extend our deepest gratitude to Heart of the City Photography
                for capturing the inspiring energy and unity of the 2026
                International Women&apos;s Day Summit in Detroit.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-surface bg-surface-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-sm font-bold text-amber-400">
                    <FaCamera />
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    Professional Group &amp; Speaker Photography
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-surface bg-surface-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">
                    <FaHeart />
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    Thank you, Heart of the City Photography!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Photo Stream Marquee */}
      {ALL_GALLERY_PHOTOS.length > 0 && (
        <section className="overflow-hidden border-t border-surface bg-[var(--surface-elevated)] py-16">
          <div className="mb-8 px-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Continuous Photo Stream
            </p>
            <h3 className="text-xl font-bold tracking-tight">
              Hover to pause · Click to expand
            </h3>
          </div>

          <div className="group mb-4 flex gap-4 overflow-hidden">
            <div className="animate-marquee-left flex shrink-0 gap-4 group-hover:[animation-play-state:paused]">
              {ALL_GALLERY_PHOTOS.slice(0, 20).map((photo, i) => (
                <div
                  key={`m1-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => openMarqueeLightbox(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openMarqueeLightbox(i)
                    }
                  }}
                  className="relative h-44 w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card transition-transform hover:scale-105 hover:border-primary/40"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                    <FaExpand className="size-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filterable Full Photo Gallery Grid */}
      <section className="border-t border-surface py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                Full Collection
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Browse Event Drive Catalog ({filteredPhotos.length} Photos)
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary font-bold text-black shadow-md shadow-primary/20'
                      : 'border border-surface bg-surface-card text-gray-400 hover:border-primary/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((img, i) => (
              <div
                key={img.id}
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(i)
                  }
                }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-1 w-fit rounded-full border border-primary/30 bg-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                    {img.category}
                  </span>
                  <p className="text-xs font-bold leading-tight text-white">
                    {img.title}
                  </p>
                  {img.photographer && (
                    <p className="mt-1 text-[10px] font-medium text-amber-300">
                      <span role="img" aria-label="camera">
                        📸
                      </span>{' '}
                      {img.photographer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl md:p-10">
          <div
            className="absolute inset-0"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Close Lightbox"
          >
            <FaXmark className="size-5" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex(
                (prev) =>
                  (prev - 1 + filteredPhotos.length) % filteredPhotos.length
              )
            }
            className="absolute left-6 z-20 flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Previous photo"
          >
            <FaChevronLeft className="size-5" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length)
            }
            className="absolute right-6 z-20 flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Next photo"
          >
            <FaChevronRight className="size-5" />
          </button>

          <div className="relative z-10 max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={filteredPhotos[lightboxIndex].src}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain"
            />
            <div className="bg-black/80 p-4 text-center backdrop-blur-md">
              <p className="text-sm font-bold text-white">
                {filteredPhotos[lightboxIndex].title}
              </p>
              {filteredPhotos[lightboxIndex].photographer && (
                <p className="mt-1 text-xs font-semibold text-amber-300">
                  Photo by {filteredPhotos[lightboxIndex].photographer}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                Photo {lightboxIndex + 1} of {filteredPhotos.length} ·{' '}
                {filteredPhotos[lightboxIndex].category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <section className="border-t border-surface">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-6 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Be part of our next event.{' '}
              <span className="text-primary">Join COMPASS Detroit.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base text-gray-500">
              Whether as a Navigator, employer, or sponsor — there&apos;s a
              place for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/events"
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
              >
                View Upcoming Events
              </Link>
              <Link
                to="/get-involved"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
