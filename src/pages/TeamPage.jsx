import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SiteLayout from '@/layouts/SiteLayout'
import LeadershipShowcase from '@/components/team/LeadershipShowcase'
import TeamMemberCard from '@/components/team/TeamMemberCard'
import { teamData as team2026 } from '@/data/2026/team'
import { teamData as team2025 } from '@/data/2025/team'
import { teamData as team2024 } from '@/data/2024/team'
import { teamData as team2023 } from '@/data/2023/team'

const yearData = {
  2026: team2026,
  2025: team2025,
  2024: team2024,
  2023: team2023,
}

const years = [2026, 2025, 2024, 2023]

const organizers = team2026.filter((m) => m.devfest === 'organizer')
const devTeam = team2026.filter((m) => m.devfest === 'devteam')
const marketing = team2026.filter((m) => m.devfest === 'marketing')

const githubContributors = [
  { username: 'shrinkray', name: 'Greg Miller' },
  { username: 'aaronamano', name: 'Aaron Amano' },
  { username: 'ShugKnight24', name: 'Shugmi Shumunov' },
  { username: 'justinbeaudry', name: 'Justin Beaudry' },
  { username: 'soham02', name: 'Soham Mhatre' },
  { username: 'sohank1', name: 'Sohan Ketireddy' },
  { username: 'kaybusenbark', name: 'Kaylee Busenbark' },
  { username: 'rehanashri', name: 'Rehanashri' },
  { username: 'Terlam', name: 'Terrell McKinney' },
]

const repos = [
  'compass-website',
  'pridemi26',
  'iwdsummit',
  'hackmi26',
  'BHM-website',
]

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

function getBadges(member) {
  const badges = []
  if (member.name === 'Greg Miller') {
    badges.push('Lead')
  }
  if (member.name === 'Greg Miller' || member.name === 'Shugmi Shumunov') {
    badges.push('Pride Summit Speaker')
  }
  return badges
}

export default function TeamPage() {
  const [activeYear, setActiveYear] = useState(2026)

  return (
    <SiteLayout>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="hero-orb-1 absolute -right-40 -top-40 size-[400px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 -left-20 size-[300px] rounded-full bg-gradient-to-tr from-indigo-500/[0.04] to-transparent blur-3xl" />
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              22+ Contributors
            </span>
          </div>
          <h1 className="mx-auto mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            The people behind the{' '}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              mission.
            </span>
          </h1>
          <p className="mx-auto max-w-screen-sm text-lg leading-relaxed text-gray-500">
            Organizers, engineers, designers, and community builders — every
            person on this page helps create career infrastructure for
            underrepresented tech talent in Michigan.
          </p>
        </div>
      </section>

      {/* ─── Leadership ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Leadership
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Organizers &amp;{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                Co-Founders
              </span>
            </h2>
            <p className="leading-relaxed text-gray-500">
              The leadership team driving COMPASS Detroit&apos;s mission —
              building events, partnerships, and programs that open doors.
            </p>
          </div>
          <LeadershipShowcase members={organizers} />
        </div>
      </section>

      {/* ─── Dev Team ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Dev Team
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Built by the{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
            <p className="leading-relaxed text-gray-500">
              The engineers and developers building this website and all COMPASS
              digital properties — fully open source.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {devTeam.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                badges={getBadges(member)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
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
          </div>
        </div>
      </section>

      {/* ─── Marketing & Community ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Marketing &amp; Community
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Amplifying the{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="leading-relaxed text-gray-500">
              The creative and community team spreading the word, building
              partnerships, and making sure every event reaches the people who
              need it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marketing.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contributors Through the Years ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Through the Years
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Every contributor{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                matters.
              </span>
            </h2>
            <p className="leading-relaxed text-gray-500">
              Since 2023, dozens of people have contributed their time and
              talent to COMPASS Detroit.
            </p>
          </div>

          {/* Year tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={
                  year === activeYear
                    ? 'rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black'
                    : 'rounded-full border border-surface px-4 py-2 text-sm text-gray-500 transition-colors hover:border-primary/30 hover:text-gray-300'
                }
              >
                {year}
              </button>
            ))}
          </div>

          {/* Team grid for selected year */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {yearData[activeYear].map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── GitHub Contributors ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mx-auto mb-12 max-w-[700px] text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Open Source
            </p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              GitHub{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                Contributors
              </span>
            </h2>
            <p className="leading-relaxed text-gray-500">
              Pull requests, code reviews, and commits — these contributors keep
              our projects moving forward.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {githubContributors.map((contributor) => (
              <a
                key={contributor.username}
                href={`https://github.com/${contributor.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-surface bg-surface-card p-6 text-center transition-colors hover:border-primary/40"
              >
                <img
                  src={`https://github.com/${contributor.username}.png`}
                  alt={contributor.name}
                  className="mx-auto mb-3 size-16 rounded-full border-2 border-primary/20 object-cover"
                  loading="lazy"
                />
                <h3 className="text-sm font-semibold transition-colors group-hover:text-primary">
                  {contributor.name}
                </h3>
                <p className="mt-0.5 text-[12px] text-gray-600">
                  @{contributor.username}
                </p>
              </a>
            ))}
          </div>

          {/* Repo badges */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Repositories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {repos.map((repo) => (
                <a
                  key={repo}
                  href={`https://github.com/Compass-Detroit/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:bg-primary/[0.06] hover:text-primary"
                >
                  <GitHubIcon className="size-3" />
                  {repo}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="rounded-xl border border-surface bg-surface-card p-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Want to{' '}
              <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                contribute?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-screen-sm leading-relaxed text-gray-500">
              Whether you write code, design experiences, or build community —
              there&apos;s a place for you on the COMPASS team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Compass-Detroit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
              >
                <GitHubIcon className="size-4" />
                View on GitHub
              </a>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border border-surface px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-primary/40 hover:text-primary"
              >
                Get Involved
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
        </div>
      </section>
    </SiteLayout>
  )
}
