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

// Hero showcase slides — large cinematic carousel
const HERO_SLIDES = [
  {
    src: '/assets/gallery/iwd26/image0.jpeg',
    title: 'IWD Innovation Summit 2026',
    subtitle:
      "Celebrating inclusion, empowerment, and Detroit's tech community",
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
  {
    src: '/assets/gallery/iwd26/image1.jpeg',
    title: 'Navigators & Mentors Circle',
    subtitle: 'Connecting students directly to corporate tech leaders',
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
  {
    src: '/assets/gallery/iwd26/image2.jpeg',
    title: 'Community in Action',
    subtitle: 'Building pathways through shared purpose and collaboration',
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
  {
    src: '/assets/gallery/iwd26/image3.jpeg',
    title: 'IWD Group Celebration',
    subtitle: '250+ attendees, 40 speakers, 8 tracks of innovation',
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
  {
    src: '/assets/gallery/iwd26/image4.jpeg',
    title: 'Tech Leaders Unite',
    subtitle: '120+ companies represented at Google Detroit',
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
  {
    src: '/assets/gallery/iwd26/image5.jpeg',
    title: 'The COMPASS Community',
    subtitle:
      "Every face, every story — building Michigan's inclusive tech future",
    credit: 'Heart of the City Photography x Shawn Lee Studios',
  },
]

const SPOTLIGHT_SLIDES = [
  {
    id: 'devfest25-feat',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0598.jpg',
    title: 'Shams Ahsan at Michigan DevFest',
    subtitle:
      'Sharing insights on emerging tech & inclusive leadership in Detroit',
    tag: 'DevFest 2025',
  },
  {
    id: 'iwd26-group',
    src: '/assets/gallery/iwd26/image0.jpeg',
    title: 'IWD Summit 2026 Group Showcase',
    subtitle: 'Captured by Heart of the City Photography x Shawn Lee Studios',
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
  const [heroIndex, setHeroIndex] = useState(0)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [visibleCount, setVisibleCount] = useState(24)

  // Filtered photos
  const filteredPhotos =
    selectedCategory === 'All'
      ? ALL_GALLERY_PHOTOS
      : ALL_GALLERY_PHOTOS.filter((p) => p.category === selectedCategory)

  const displayedPhotos = filteredPhotos.slice(0, visibleCount)

  // Hero carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Spotlight auto-play
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_SLIDES.length)
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
    setVisibleCount(24)
  }

  const openMarqueeLightbox = (globalIndex) => {
    setSelectedCategory('All')
    setLightboxIndex(globalIndex % ALL_GALLERY_PHOTOS.length)
  }

  return (
    <SiteLayout>
      {/* ========== HERO: Large IWD Photo Carousel ========== */}
      <section className="relative overflow-hidden">
        {/* Full-width cinematic carousel */}
        <div className="media-overlay relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9] lg:aspect-[24/9]">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === heroIndex
            return (
              <div
                key={`hero-${idx}`}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive
                    ? 'z-10 opacity-100 scale-100'
                    : 'z-0 opacity-0 scale-105'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="size-full object-cover"
                />
                {/* Strong gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
            )
          })}

          {/* Hero text overlay — always visible, high contrast */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-[1200px] px-6 pb-8 md:pb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                <FaWandMagicSparkles className="size-3 animate-pulse text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  {ALL_GALLERY_PHOTOS.length}+ Event Moments
                </span>
              </div>
              <h1
                className="mb-3 max-w-[700px] text-3xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
              >
                {HERO_SLIDES[heroIndex].title}
              </h1>
              <p
                className="mb-4 max-w-[500px] text-sm font-medium text-gray-200 drop-shadow-lg md:text-base"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}
              >
                {HERO_SLIDES[heroIndex].subtitle}
              </p>

              {/* Photographer credit pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
                <FaCamera className="size-3 text-primary" />
                <span className="text-xs font-semibold text-white">
                  {HERO_SLIDES[heroIndex].credit}
                </span>
              </div>

              {/* Navigation dots */}
              <div className="flex items-center gap-3">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={`hero-dot-${i}`}
                    onClick={() => setHeroIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === heroIndex
                        ? 'w-10 bg-primary shadow-lg shadow-primary/40'
                        : 'w-3 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() =>
              setHeroIndex(
                (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
              )
            }
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:border-white/40"
          >
            <FaChevronLeft className="size-4" />
          </button>
          <button
            onClick={() =>
              setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)
            }
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:border-white/40"
          >
            <FaChevronRight className="size-4" />
          </button>
        </div>
      </section>

      {/* ========== Photographer Credit Card — compact, elegant ========== */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-surface bg-surface-card p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <FaCamera className="size-7 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Official Event Photography
              </p>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight">
                Heart of the City Photography{' '}
                <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
                  x Shawn Lee Studios
                </span>
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                28+ years combined experience · Event, corporate & portrait
                photography · Metro Detroit
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                to="/gallery/photographer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-primary-400 hover:shadow-lg hover:shadow-primary/20"
              >
                Meet the Photographer
              </Link>
              <a
                href="https://www.hocxsls.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface px-5 py-2.5 text-sm font-semibold text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <FaCamera className="size-3.5 text-primary" /> Visit Studio
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Spotlight Highlights Carousel ========== */}
      {SPOTLIGHT_SLIDES.length > 0 && (
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
                    setSpotlightIndex(
                      (prev) =>
                        (prev - 1 + SPOTLIGHT_SLIDES.length) %
                        SPOTLIGHT_SLIDES.length
                    )
                  }
                  className="flex size-10 items-center justify-center rounded-xl border border-surface bg-surface-card text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Previous featured slide"
                >
                  <FaChevronLeft className="size-3.5" />
                </button>
                <button
                  onClick={() =>
                    setSpotlightIndex(
                      (prev) => (prev + 1) % SPOTLIGHT_SLIDES.length
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
            <div className="media-overlay relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/20 bg-surface-card shadow-2xl md:aspect-[21/9]">
              {SPOTLIGHT_SLIDES.map((slide, idx) => {
                const isActive = idx === spotlightIndex
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
                    <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-black/80 p-6 shadow-2xl backdrop-blur-2xl md:inset-x-8 md:bottom-8 md:p-8">
                      <div className="flex max-w-3xl flex-col gap-2">
                        <span className="w-fit rounded-full border border-primary/50 bg-primary/25 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary backdrop-blur-md">
                          {slide.tag}
                        </span>
                        <h3
                          className="text-2xl font-extrabold tracking-tight text-white md:text-3xl"
                          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                        >
                          {slide.title}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-gray-200 md:text-base">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Slide Navigation Dots */}
              <div className="absolute right-8 top-6 z-20 flex items-center gap-2">
                {SPOTLIGHT_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSpotlightIndex(i)}
                    className={`h-2.5 rounded-full shadow-sm transition-all duration-300 ${
                      i === spotlightIndex
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
      )}

      {/* ========== Infinite Photo Stream Marquee ========== */}
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
                    <FaExpand className="size-5 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== Filterable Full Photo Gallery Grid ========== */}
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
            {displayedPhotos.map((img, i) => (
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
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card transition-colors duration-200 hover:border-primary/40"
                style={{
                  contentVisibility: 'auto',
                  containIntrinsicSize: '0 225px',
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  width={400}
                  height={300}
                  decoding="async"
                  className="size-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="mb-1.5 w-fit rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
                    {img.category}
                  </span>
                  <p className="text-sm font-bold leading-tight text-white drop-shadow-lg">
                    {img.title}
                  </p>
                  {img.photographer && (
                    <p className="mt-1.5 text-xs font-semibold text-amber-300 flex items-center gap-1.5 drop-shadow-lg">
                      <FaCamera className="size-3" /> {img.photographer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredPhotos.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-black shadow-lg transition-all hover:bg-primary-400 hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Load More Photos ({filteredPhotos.length - visibleCount}{' '}
                remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== Lightbox Modal ========== */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="media-overlay fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl md:p-10">
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
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <FaCamera className="size-3" />
                    {filteredPhotos[lightboxIndex].photographer}
                  </span>
                </div>
              )}
              <p className="mt-3 text-xs text-gray-400">
                Photo {lightboxIndex + 1} of {filteredPhotos.length} ·{' '}
                {filteredPhotos[lightboxIndex].category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========== Final CTA ========== */}
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
