import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/* ── Step SVG Icons ── */

function DoorIcon({ className = 'size-5' }) {
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
      <path d="M18 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M14 3v18" />
      <path d="M4 12h10" />
      <circle cx="11" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
DoorIcon.propTypes = { className: PropTypes.string }

function WaveIcon({ className = 'size-5' }) {
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
      <path d="M7 11.5V7a2 2 0 0 1 4 0v4.5" />
      <path d="M11 9.5V6a2 2 0 0 1 4 0v5" />
      <path d="M15 9.5V7.5a2 2 0 0 1 4 0v6.5a8 8 0 0 1-8 8h-1a8 8 0 0 1-6.73-3.65l-1.77-2.8A2 2 0 0 1 3 13a2 2 0 0 1 2.75-.73L7 13" />
      <path d="M7 11.5V4a2 2 0 0 1 4 0" />
    </svg>
  )
}
WaveIcon.propTypes = { className: PropTypes.string }

function LightbulbIcon({ className = 'size-5' }) {
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
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
      <line
        x1="12"
        y1="6"
        x2="12"
        y2="6.01"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9.5 8.5a2.5 2.5 0 0 1 2.5-2.5" opacity="0.6" />
    </svg>
  )
}
LightbulbIcon.propTypes = { className: PropTypes.string }

function PeopleIcon({ className = 'size-5' }) {
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
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="8" r="2.5" opacity="0.6" />
      <path d="M21 21v-1.5a3.5 3.5 0 0 0-3-3.46" opacity="0.6" />
    </svg>
  )
}
PeopleIcon.propTypes = { className: PropTypes.string }

function RefreshIcon({ className = 'size-5' }) {
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
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  )
}
RefreshIcon.propTypes = { className: PropTypes.string }

/* ── Step data ── */

const stepIcons = [DoorIcon, WaveIcon, LightbulbIcon, PeopleIcon, RefreshIcon]

const steps = [
  {
    title: 'Show up',
    desc: "Walk in, grab a name tag. No prerequisites, no prep work, no awkward 'introduce yourself to the room' moments.",
  },
  {
    title: 'Find your pace',
    desc: 'Hang back and listen, or jump into a conversation — both are equally valid here. Our organizers look for wallflowers (lovingly) to make sure nobody feels invisible.',
  },
  {
    title: 'Learn something',
    desc: "Every event has structured content — talks, demos, workshops. You'll always have something to focus on beyond small talk.",
  },
  {
    title: 'Connect (when ready)',
    desc: "No forced networking. But when you're ready, you'll find people who are genuinely excited to meet you.",
  },
  {
    title: 'Come back',
    desc: "78% of our Navigators attend 2+ events. The first visit is the hardest — after that, you'll recognize faces.",
  },
]

export default function FirstVisitGuide() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const stepEls = containerRef.current.querySelectorAll('.timeline-step')
    stepEls.forEach((step) => observer.observe(step))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="first-visit" className="border-y border-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mb-12">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Your First Visit
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            What to expect (spoiler: it&apos;s chill)
          </h2>
          <p className="max-w-lg text-sm text-gray-500">
            Nervous about showing up to your first event? Here&apos;s exactly
            what happens. No surprises, no pressure.
          </p>
        </div>

        <div className="first-visit-timeline" ref={containerRef}>
          {steps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <div key={step.title} className="timeline-step mb-8 last:mb-0">
                {/* Timeline dot */}
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>

                {/* Card */}
                <div className="card-glow rounded-xl border border-[var(--border)] bg-[var(--surface-card)] p-5 transition-all md:p-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        Step {i + 1}
                      </span>
                      <h3 className="text-[15px] font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
