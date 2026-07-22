import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaXmark,
  FaExpand,
  FaWandMagicSparkles,
} from 'react-icons/fa6'

// Complete inventory of converted gallery photos
const ALL_GALLERY_PHOTOS = [
  // AI Hackathon
  {
    id: 'ai-1',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0520.jpg',
    title: 'AI Hackathon Opening Kickoff',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-2',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0521.jpg',
    title: 'AI Solution Architecture',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-3',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0522.jpg',
    title: 'AI Hackathon Final Pitch',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-4',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0523.jpg',
    title: 'AI Demo & Prototype Testing',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-5',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0524.jpg',
    title: 'Prompt Engineering & System Design',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-6',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0526.jpg',
    title: 'AI Model Building Sprint',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-7',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0527.jpg',
    title: 'AI Challenge Brainstorming',
    category: 'AI Hackathon',
  },
  {
    id: 'ai-8',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0529.jpg',
    title: 'AI Hackathon Team Collaboration',
    category: 'AI Hackathon',
  },

  // Keynotes & Speakers
  {
    id: 'spk-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0598.jpg',
    title: 'Keynote Speaker on Stage',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-2',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0593.jpg',
    title: 'AI Keynote Address',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-3',
    src: '/assets/gallery/devfest25/Student pictures/11421de5-2098-462e-8dc6-d2251b2493ac.jpg',
    title: 'Panel Discussion & Q&A',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-4',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0592.jpg',
    title: 'Leadership Panel Session',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-5',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0597.jpg',
    title: 'Tech Trends Keynote Presentation',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-6',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0594.jpg',
    title: 'Audience Engagement & Q&A',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-7',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0596.jpg',
    title: 'Speaker Stage Spotlight',
    category: 'Keynotes & Speakers',
  },
  {
    id: 'spk-8',
    src: '/assets/gallery/devfest25/Student pictures/dadc3fd6-cfaa-454b-994e-8c439cda346b.JPG',
    title: 'DevFest Main Hall Keynote',
    category: 'Keynotes & Speakers',
  },

  // Mentorship & Careers
  {
    id: 'car-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0576.jpg',
    title: 'Tech Mentorship & Career Guidance',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-2',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0605.jpg',
    title: 'Corporate Partner Networking',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-3',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0604.jpg',
    title: 'Resume Review & Career Advice',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-4',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0577.jpg',
    title: 'Portfolio Review Session',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-5',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0588.jpg',
    title: 'COMPASS Executive Advisory',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-6',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0585.jpg',
    title: 'Corporate Partner Hiring Table',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-7',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0587.jpg',
    title: 'Industry Partner Connections',
    category: 'Mentorship & Careers',
  },
  {
    id: 'car-8',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0584.jpg',
    title: 'Mentorship Connection Circle',
    category: 'Mentorship & Careers',
  },

  // DevFest 2025 Workshops & Hackathons
  {
    id: 'dev-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0558.jpg',
    title: 'Interactive Coding Workshop',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-2',
    src: '/assets/gallery/devfest25/Student pictures/022e16f6-4555-4285-847d-f98332ebcf8d.jpg',
    title: 'Student Engineer Showcase',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-3',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0559.jpg',
    title: 'Collaborative Engineering Sprint',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-4',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0599.jpg',
    title: 'Innovators Project Pitch',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-5',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0600.jpg',
    title: 'Michigan DevFest General Assembly',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-6',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0601.jpg',
    title: 'Student Solution Architects',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-7',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0575.jpg',
    title: 'Hackathon Team Sprint',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-8',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0603.jpg',
    title: 'Tech Community Networking Lounge',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-9',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0602.jpg',
    title: 'Live Code Demonstration',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-10',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0560.jpg',
    title: 'DevFest Hands-on Lab',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-11',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0548.jpg',
    title: 'Student Project Display',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-12',
    src: '/assets/gallery/devfest25/Student pictures/IMG_6572.JPG',
    title: 'DevFest Community Gathering',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-13',
    src: '/assets/gallery/devfest25/Student pictures/IMG_6573.JPG',
    title: 'Student Innovators Meetup',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-14',
    src: '/assets/gallery/devfest25/Student pictures/IMG_6571.JPG',
    title: 'Employer Expo & Career Booths',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-15',
    src: '/assets/gallery/devfest25/Student pictures/IMG_6570.JPG',
    title: 'Registration & Welcome Counter',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-16',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0539.jpg',
    title: 'STEAM Cohort Group',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-17',
    src: '/assets/gallery/devfest25/Student pictures/IMG_6574.JPG',
    title: 'Team Awards & Recognition',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-18',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0532.jpg',
    title: 'Participant Idea Whiteboarding',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-19',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0533.jpg',
    title: 'Hacker House Accelerator Session',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-20',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0534.jpg',
    title: 'Final Pitch Preparation',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-21',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0545.jpg',
    title: 'Peer Code Review',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-22',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0579.jpg',
    title: 'Mentor Guidance Circle',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-23',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0578.jpg',
    title: 'Hackathon Project Pitch',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-24',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0544.jpg',
    title: 'Technical Workshop Lab',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-25',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0591.jpg',
    title: 'Navigator Developer Spotlight',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-26',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0546.jpg',
    title: 'Collaborative Coding Session',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-27',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0553.jpg',
    title: 'Group Hackathon Pitch',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-28',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0547.jpg',
    title: 'Hackathon Prototype Polish',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-29',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0590.jpg',
    title: 'Audience Q&A Session',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-30',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0580.jpg',
    title: 'Student Recognition & Awards',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-31',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0543.jpg',
    title: 'Software Architecture Workshop',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-32',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0557.jpg',
    title: 'Tech Talent Pipeline Discussion',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-33',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0556.jpg',
    title: 'Student Developer Demo',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-34',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0595.jpg',
    title: 'Innovation Summit Highlights',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-35',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0581.jpg',
    title: 'Career Pathways Advisory',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-36',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0554.jpg',
    title: 'Group Hackathon Showcase',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-37',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0540.jpg',
    title: 'Student Cohort Photo',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-38',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0555.jpg',
    title: 'Final Showcase Ceremony',
    category: 'DevFest 2025',
  },
  {
    id: 'dev-39',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0582.jpg',
    title: 'COMPASS Community Gathering',
    category: 'DevFest 2025',
  },
]

const FEATURED_SLIDES = [
  {
    id: 'ai-3',
    src: '/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0522.jpg',
    title: 'AI Hackathon Final Pitch',
    subtitle: '50+ Developers · 12 AI Prototypes Built in 8 Hours',
    tag: 'Featured Highlight',
  },
  {
    id: 'spk-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0598.jpg',
    title: 'Michigan DevFest Keynote',
    subtitle: 'Pioneering emerging tech & inclusive leadership in Detroit',
    tag: 'Keynote Stage',
  },
  {
    id: 'car-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0576.jpg',
    title: '1-on-1 Career Mentorship',
    subtitle: 'Connecting Navigators directly to corporate tech partners',
    tag: 'Career Pathways',
  },
  {
    id: 'dev-1',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0558.jpg',
    title: 'Hands-on Technical Workshops',
    subtitle: 'Building production skills through collaborative coding',
    tag: 'DevFest 2025',
  },
  {
    id: 'car-2',
    src: '/assets/gallery/devfest25/Student pictures/IMG_0605.jpg',
    title: 'Employer Expo & Talent Pipeline',
    subtitle: 'Over 50% of Navigators actively connecting to new roles',
    tag: 'Corporate Partners',
  },
]

const CATEGORIES = [
  'All',
  'AI Hackathon',
  'DevFest 2025',
  'Keynotes & Speakers',
  'Mentorship & Careers',
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

  // Reset lightbox on category change
  const handleCategoryChange = (cat) => {
    setLightboxIndex(null)
    setSelectedCategory(cat)
  }

  // Marquee opens lightbox against ALL photos — reset filter first
  const openMarqueeLightbox = (globalIndex) => {
    setSelectedCategory('All')
    setLightboxIndex(globalIndex)
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="hero-orb-1 absolute -right-32 -top-32 size-[400px] rounded-full bg-gradient-to-br from-primary/[0.08] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 left-1/4 size-[300px] rounded-full bg-gradient-to-tr from-emerald-500/[0.05] to-transparent blur-3xl" />
        <div className="hero-grid-pattern pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1">
            <FaWandMagicSparkles className="size-3 animate-pulse text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              60+ Real Event Moments
            </span>
          </div>
          <h1 className="mb-6 max-w-[750px] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Experience our community{' '}
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              in action.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            From high-energy AI hackathons to 1-on-1 mentorship sessions —
            explore real moments from COMPASS Detroit events.
          </p>
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

            {/* Slide Navigation Dots — positioned above glass bar */}
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

          {/* Story 1: Parallax Picture-in-Picture Frame */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                onMouseEnter={() => setHoveredParallax(true)}
                onMouseLeave={() => setHoveredParallax(false)}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface bg-surface-card shadow-2xl transition-all duration-500 hover:border-primary/40"
              >
                {/* Background Outer Photo */}
                <img
                  src="/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0520.jpg"
                  alt="AI Hackathon Hall"
                  className={`size-full object-cover transition-transform duration-700 ease-out ${
                    hoveredParallax ? 'scale-105 brightness-75' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/30" />

                {/* Picture-in-Picture Floating Inner Photo Frame */}
                <div
                  className={`absolute bottom-6 right-6 aspect-[4/3] w-3/5 overflow-hidden rounded-xl border-2 border-primary/40 shadow-2xl transition-all duration-700 ease-out ${
                    hoveredParallax
                      ? 'translate-y-[-12px] scale-105 border-primary'
                      : 'translate-y-0 scale-100'
                  }`}
                >
                  <img
                    src="/assets/gallery/devfest25/Student pictures/Ai hackathon/IMG_0529.jpg"
                    alt="AI Hackathon Team"
                    className="size-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-primary backdrop-blur-sm">
                    AI Team Sprint
                  </div>
                </div>

                {/* Floating Tag Badge */}
                <div className="absolute left-6 top-6 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md">
                  <span className="text-xs font-bold text-white">
                    AI Hackathon Cohort
                  </span>
                  <p className="text-[10px] text-gray-400">Detroit, Michigan</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Hackathon Spotlight
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                Building AI prototypes in 8 hours
              </h3>
              <p className="mb-6 leading-relaxed text-gray-400">
                Our Navigators collaborated with industry software engineers and
                product managers to design, build, and pitch functional AI
                applications.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-surface bg-surface-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-400">
                    12
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    Functional AI prototypes demonstrated live
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-surface bg-surface-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm font-bold text-violet-400">
                    50+
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    Diverse student developers &amp; mentors paired
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: Mentorship & Keynote Parallax Cards */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <span className="mb-3 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-400">
                Career Pathways
              </span>
              <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                Mentorship that leads to job offers
              </h3>
              <p className="mb-6 leading-relaxed text-gray-400">
                At every summit, Navigators receive 1-on-1 resume feedback,
                portfolio reviews, and direct employer networking with partners
                like DTE, IBM, and Little Caesars.
              </p>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
              >
                Become a Partner
              </Link>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="group overflow-hidden rounded-2xl border border-surface bg-surface-card transition-transform duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src="/assets/gallery/devfest25/Student pictures/IMG_0576.jpg"
                      alt="Mentorship Review"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-primary">
                      1-on-1 Mentorship
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Portfolio &amp; Interview Prep
                    </p>
                  </div>
                </div>

                <div className="group mt-8 overflow-hidden rounded-2xl border border-surface bg-surface-card transition-transform duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src="/assets/gallery/devfest25/Student pictures/IMG_0605.jpg"
                      alt="Corporate Connections"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-emerald-400">
                      Corporate Connections
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Direct Employer Pipelines
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Photo Stream Marquee */}
      <section className="overflow-hidden border-t border-surface bg-black/40 py-16">
        <div className="mb-8 px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Continuous Photo Stream
          </p>
          <h3 className="text-xl font-bold tracking-tight">
            Hover to pause · Click to expand
          </h3>
        </div>

        {/* Row 1 Marquee (Scroll Left) */}
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
          <div
            className="animate-marquee-left flex shrink-0 gap-4 group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {ALL_GALLERY_PHOTOS.slice(0, 20).map((photo, i) => (
              <div
                key={`m1-dup-${i}`}
                className="relative h-44 w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card transition-transform hover:scale-105 hover:border-primary/40"
              >
                <img
                  src={photo.src}
                  alt=""
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee (Scroll Right) */}
        <div className="group flex gap-4 overflow-hidden">
          <div className="animate-marquee-right flex shrink-0 gap-4 group-hover:[animation-play-state:paused]">
            {ALL_GALLERY_PHOTOS.slice(20, 40).map((photo, i) => (
              <div
                key={`m2-${i}`}
                role="button"
                tabIndex={0}
                onClick={() => openMarqueeLightbox(i + 20)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openMarqueeLightbox(i + 20)
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
          <div
            className="animate-marquee-right flex shrink-0 gap-4 group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {ALL_GALLERY_PHOTOS.slice(20, 40).map((photo, i) => (
              <div
                key={`m2-dup-${i}`}
                className="relative h-44 w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-surface bg-surface-card transition-transform hover:scale-105 hover:border-primary/40"
              >
                <img
                  src={photo.src}
                  alt=""
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Full Photo Gallery Grid */}
      <section className="border-t border-surface py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                Full Collection
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Browse All Event Photos
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
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

          {/* Photo Grid */}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl md:p-10">
          {/* Backdrop Click Dismiss */}
          <div
            className="absolute inset-0"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          {/* Lightbox Controls */}
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

          {/* Active Image Container */}
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
