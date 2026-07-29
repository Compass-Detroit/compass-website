import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function CompassIcon({ className = 'size-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="7" stroke="currentColor" opacity="0.15" />
      <polygon points="12,2.5 14,10 12,8 10,10" fill="#D4A017" stroke="none" />
      <polygon
        points="12,21.5 14,14 12,16 10,14"
        fill="currentColor"
        opacity="0.4"
        stroke="none"
      />
      <polygon
        points="2.5,12 10,10 8,12 10,14"
        fill="currentColor"
        opacity="0.4"
        stroke="none"
      />
      <polygon
        points="21.5,12 14,10 16,12 14,14"
        fill="currentColor"
        opacity="0.4"
        stroke="none"
      />
      <circle cx="12" cy="12" r="2" fill="#D4A017" stroke="none" />
    </svg>
  )
}

CompassIcon.propTypes = {
  className: PropTypes.string,
}

export default function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(true) // start hidden, reveal after check
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const wasDismissed = localStorage.getItem('compass-welcome-dismissed')
    if (!wasDismissed) {
      setDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    setExiting(true)
    setTimeout(() => {
      setDismissed(true)
      localStorage.setItem('compass-welcome-dismissed', 'true')
    }, 500)
  }

  if (dismissed) return null

  return (
    <div
      className={`mx-auto max-w-[1200px] px-6 ${
        exiting ? 'welcome-banner-exit' : 'welcome-banner'
      }`}
    >
      <div className="glass-card relative overflow-hidden rounded-2xl border border-primary/20 p-8 md:p-10">
        {/* Subtle golden glow background */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-primary/[0.06] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 size-40 rounded-full bg-primary/[0.04] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="compass-pulse text-primary">
              <CompassIcon className="size-8" />
            </span>
            <h2 className="text-xl font-bold md:text-2xl">
              New here? <span className="text-primary">Perfect.</span>
            </h2>
          </div>

          <p className="mb-4 max-w-2xl leading-relaxed text-gray-400">
            You don&apos;t need to be an expert. You don&apos;t need to know
            anyone. You don&apos;t even need to talk if you don&apos;t want to —
            showing up is enough. We&apos;re a group of curious people who
            believe tech is better when we figure it out together.
          </p>

          <p className="mb-6 max-w-2xl text-sm italic text-gray-500">
            &ldquo;We may not have all the answers, but we&apos;re committed to
            discovering them.&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#first-visit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-400"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('first-visit')
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              See what a first visit looks like
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>

            <button
              onClick={handleDismiss}
              className="welcome-banner-dismiss inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/[0.08] px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/[0.15]"
            >
              Got it, I&apos;m in!
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
