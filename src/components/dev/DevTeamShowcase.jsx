import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { teamData } from '@/data/2026/team'
import { devCollaborationPhotos } from '@/data/galleryPhotos'
import MiniCarousel from '@/components/ui/MiniCarousel'
import TeamMemberCard from '@/components/team/TeamMemberCard'

const devTeam = teamData.filter((m) => m.devfest === 'devteam')

const techStack = ['React', 'Vite', 'Tailwind CSS', 'Vercel']

const codeLines = [
  {
    indent: 0,
    tokens: [
      { text: 'export default function ', color: 'text-violet-400' },
      { text: 'CompassApp', color: 'text-primary' },
      { text: '() {', color: 'text-gray-400' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'return ', color: 'text-violet-400' },
      { text: '(', color: 'text-gray-400' },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: '<', color: 'text-gray-400' },
      { text: 'Community', color: 'text-emerald-400' },
      { text: ' impact', color: 'text-blue-400' },
      { text: '=', color: 'text-gray-400' },
      { text: '"Detroit"', color: 'text-primary' },
      { text: '>', color: 'text-gray-400' },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: '<', color: 'text-gray-400' },
      { text: 'Navigators', color: 'text-emerald-400' },
      { text: ' />', color: 'text-gray-400' },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: '<', color: 'text-gray-400' },
      { text: 'Opportunity', color: 'text-emerald-400' },
      { text: ' for=', color: 'text-blue-400' },
      { text: '"everyone"', color: 'text-primary' },
      { text: ' />', color: 'text-gray-400' },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: '</', color: 'text-gray-400' },
      { text: 'Community', color: 'text-emerald-400' },
      { text: '>', color: 'text-gray-400' },
    ],
  },
  { indent: 1, tokens: [{ text: ')', color: 'text-gray-400' }] },
  { indent: 0, tokens: [{ text: '}', color: 'text-gray-400' }] },
]

function isLead(member) {
  return member.name === 'Greg Miller'
}

function GitHubIcon({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

GitHubIcon.propTypes = { className: PropTypes.string }

function LinkedInIcon({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

LinkedInIcon.propTypes = { className: PropTypes.string }

export default function DevTeamShowcase() {
  return (
    <section className="reveal border-t border-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Open Source
          </p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Built by the Community,{' '}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              for the Community
            </span>
          </h2>
          <p className="leading-relaxed text-gray-500">
            This website is fully open source. Every contributor, pull request,
            and line of code helps build career infrastructure for
            underrepresented tech talent in Michigan.
          </p>
        </div>

        {/* Top row: GitHub card + generated image */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {/* GitHub stats card */}
          <div className="glass-card hover-lift flex flex-col justify-between rounded-xl border border-surface p-8">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl bg-white/[0.06]">
                  <GitHubIcon className="size-8 text-[var(--text-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Compass-Detroit/compass-website
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-400">
                      Open Source
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech stack pills */}
              <div className="mb-8 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://github.com/Compass-Detroit/compass-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-surface px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-primary/40 hover:text-primary"
            >
              <GitHubIcon className="size-4" />
              View on GitHub
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Generated image */}
          <div className="overflow-hidden rounded-xl border border-surface">
            <MiniCarousel
              photos={devCollaborationPhotos}
              aspectRatio="16/9"
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Decorative code block */}
        <div className="mb-12 overflow-hidden rounded-xl border border-surface bg-[#0d0d0d]">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] text-gray-600">
              CompassApp.jsx
            </span>
          </div>
          {/* Code lines */}
          <div className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
            {codeLines.map((line, i) => (
              <div key={i} style={{ paddingLeft: `${line.indent * 20}px` }}>
                <span className="mr-4 inline-block w-5 select-none text-right text-gray-700">
                  {i + 1}
                </span>
                {line.tokens.map((token, j) => (
                  <span key={j} className={token.color}>
                    {token.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dev team grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {devTeam.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              badges={isLead(member) ? ['Lead'] : []}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <a
            href="https://github.com/Compass-Detroit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-surface px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-primary/40 hover:text-primary"
          >
            <GitHubIcon className="size-4" />
            Compass-Detroit on GitHub
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>

          <Link
            to="/team"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
          >
            Meet the Full Team
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
