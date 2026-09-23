import { useState, useEffect, useCallback, useRef } from 'react'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const ROTATE_MS = 5500
const EXIT_MS = 400

const quotes = [
  {
    text: 'I was terrified to walk in alone. Left with three new friends.',
    author: 'First-time Navigator',
  },
  {
    text: 'Nobody asked me to justify my experience level. That was new.',
    author: 'Career Changer',
  },
  {
    text: 'I finally found a tech community that looks like Detroit.',
    author: 'Software Engineer',
  },
  {
    text: 'The Saturday sessions are my favorite part of the week now.',
    author: 'Junior Developer',
  },
  {
    text: 'I learned more in one summit than six months of tutorials.',
    author: 'Self-taught Developer',
  },
  {
    text: "They didn't just welcome me — they made space for me to lead.",
    author: 'Community Organizer',
  },
  {
    text: 'COMPASS gave me my first tech talk. Now I keynote conferences.',
    author: 'Senior Engineer',
  },
]

export default function CommunityVibes() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animClass, setAnimClass] = useState('quote-enter')
  // User toggle (WCAG 2.2.2) vs. transient pauses (hover, focus, hidden tab)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [pageHidden, setPageHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden
  )
  const reducedMotion = usePrefersReducedMotion()
  const exitTimerRef = useRef(null)
  const pauseButtonRef = useRef(null)
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  const goTo = useCallback((index) => {
    if (index === activeIndexRef.current) return
    clearTimeout(exitTimerRef.current)
    setAnimClass('quote-exit')
    exitTimerRef.current = setTimeout(() => {
      exitTimerRef.current = null
      setActiveIndex(index)
      setAnimClass('quote-enter')
    }, EXIT_MS)
  }, [])

  useEffect(() => () => clearTimeout(exitTimerRef.current), [])

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const autoRotate =
    !userPaused && !hovered && !focusWithin && !pageHidden && !reducedMotion

  useEffect(() => {
    if (!autoRotate) return
    const timer = setInterval(() => {
      goTo((activeIndexRef.current + 1) % quotes.length)
    }, ROTATE_MS)
    return () => clearInterval(timer)
  }, [autoRotate, goTo, activeIndex])

  const quote = quotes[activeIndex]

  return (
    <section className="border-y border-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mb-10">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Community Vibes
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Don&apos;t take our word for it
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Quote carousel */}
          <div
            className="flex flex-col justify-between"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={(e) => {
              // Keyboard focus pauses; mouse clicks and the toggle itself don't
              let keyboardFocus = true
              try {
                keyboardFocus = e.target.matches(':focus-visible')
              } catch {
                // :focus-visible unsupported — treat as keyboard focus
              }
              setFocusWithin(
                keyboardFocus && e.target !== pauseButtonRef.current
              )
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setFocusWithin(false)
              }
            }}
          >
            <div
              className="relative min-h-[180px] md:min-h-[160px]"
              aria-live={autoRotate ? 'off' : 'polite'}
            >
              <div key={activeIndex} className={animClass}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mb-4 text-primary/30"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <blockquote className="mb-4 text-xl font-semibold leading-relaxed md:text-2xl">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <p className="text-sm text-gray-500">— {quote.author}</p>
              </div>
            </div>

            {/* Dots + pause control */}
            <div className="mt-6 flex items-center gap-2">
              {!reducedMotion && (
                <button
                  ref={pauseButtonRef}
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-pressed={userPaused}
                  aria-label={
                    userPaused
                      ? 'Resume quote rotation'
                      : 'Pause quote rotation'
                  }
                  className="mr-2 flex size-7 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
                >
                  {userPaused ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2 1l7 4-7 4z" />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="1.5" y="1" width="2.5" height="8" rx="0.5" />
                      <rect x="6" y="1" width="2.5" height="8" rx="0.5" />
                    </svg>
                  )}
                </button>
              )}
              {quotes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  className={`quote-dot ${
                    i === activeIndex ? 'quote-dot-active' : ''
                  }`}
                  aria-label={`Go to quote ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Community pulse + quick stats */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-card)] p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  Community Active
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg bg-primary/[0.06] px-4 py-3">
                  <span className="text-sm text-gray-400">
                    Growth this year
                  </span>
                  <span className="text-sm font-bold text-primary">324%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-primary/[0.06] px-4 py-3">
                  <span className="text-sm text-gray-400">
                    Navigator retention
                  </span>
                  <span className="text-sm font-bold text-primary">78%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-primary/[0.06] px-4 py-3">
                  <span className="text-sm text-gray-400">Referred a peer</span>
                  <span className="text-sm font-bold text-primary">41%</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-transparent p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                The vibe check
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                We&apos;re not a networking group. We&apos;re not a bootcamp.
                We&apos;re a collective of curious technologists who show up for
                each other — whether that means debugging code, sharing job
                leads, or just making sure nobody eats lunch alone at a
                conference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
