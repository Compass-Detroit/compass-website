import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '@/layouts/PageLayout'
import ProfileCardBuilder from '@/components/community/ProfileCardBuilder'
import MemberProfileCard from '@/components/community/MemberProfileCard'
import { getAllSpeakers } from '@/utils/speakerRegistry'
import {
  FaMicrophone,
  FaUser,
  FaUsers,
  FaHandshake,
  FaRocket,
  FaGraduationCap,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCircleCheck,
  FaCalendarDays,
  FaCompass,
  FaCode,
  FaCloud,
  FaMobileScreen,
  FaShieldHalved,
} from 'react-icons/fa6'

const WORKING_GROUPS = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Guild',
    icon: FaCode,
    badgeColor: 'bg-devfest-blue text-white',
    lead: 'Dr. Kimberly Vance (GDG Detroit / Google)',
    membersCount: 340,
    meetingSchedule: 'Every 2nd Tuesday @ 6:30 PM EST',
    topics: [
      'Agentic Workflows',
      'Gemini & Local LLMs',
      'Computer Vision',
      'MLOps on Cloud',
    ],
    desc: 'Hands-on AI labs, model fine-tuning discussions, and real-world AI applications in Detroit industry.',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Circle',
    icon: FaCloud,
    badgeColor: 'bg-devfest-green text-white',
    lead: 'Marcus Thompson (Ally Financial)',
    membersCount: 285,
    meetingSchedule: 'Every 3rd Thursday @ 7:00 PM EST',
    topics: [
      'Kubernetes',
      'Terraform CI/CD',
      'Multi-Cloud Architecture',
      'Serverless',
    ],
    desc: 'Deep dives into scalable infrastructure, observability, cloud security, and automation.',
  },
  {
    id: 'mobile-web',
    title: 'Modern Web & Mobile Studio',
    icon: FaMobileScreen,
    badgeColor: 'bg-devfest-yellow text-gray-950',
    lead: 'DeShawn Williams (Rocket Companies)',
    membersCount: 420,
    meetingSchedule: 'Every 1st Wednesday @ 6:00 PM EST',
    topics: [
      'React 19 & Next.js',
      'Flutter & Android',
      'Web Performance',
      'Design Systems',
    ],
    desc: 'Collaborative frontend development, mobile UI crafting, accessibility, and modern web standards.',
  },
  {
    id: 'wtm-leadership',
    title: 'Women in Tech & Leadership',
    icon: FaUsers,
    badgeColor: 'bg-devfest-red text-white',
    lead: 'Fatima Al-Hassan (StockX & WTM)',
    membersCount: 510,
    meetingSchedule: 'Monthly 4th Saturday @ 11:00 AM EST',
    topics: [
      'Tech Leadership',
      'Public Speaking CFS',
      'Executive Presence',
      'Negotiation',
    ],
    desc: 'Empowering women technologists through mentorship, speaker readiness, and executive sponsorship.',
  },
  {
    id: 'career-pathways',
    title: 'Career Pathways & Mentorship',
    icon: FaGraduationCap,
    badgeColor: 'bg-primary text-gray-950',
    lead: 'Jenna Ritten (COMPASS Detroit)',
    membersCount: 680,
    meetingSchedule: 'Weekly Office Hours: Saturday @ 10:00 AM EST',
    topics: [
      'Resume Review',
      'Mock Tech Interviews',
      'Co-Op Connections',
      'Portfolio Prep',
    ],
    desc: 'Direct employer matching, resume workshops, and mentorship from Detroit tech veterans.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Defense Lab',
    icon: FaShieldHalved,
    badgeColor: 'bg-indigo-600 text-white',
    lead: 'Aisha Robinson (DTE Energy)',
    membersCount: 230,
    meetingSchedule: 'Every 3rd Tuesday @ 6:00 PM EST',
    topics: ['Zero Trust', 'Threat Hunting', 'AppSec', 'Security Compliance'],
    desc: 'Security best practices, penetration testing workshops, and defense architecture.',
  },
]

const SAMPLE_COMMUNITY_MEMBERS = [
  {
    name: 'Maya Chen',
    title: 'Senior ML Engineer',
    organization: 'Ford Motor Company',
    bio: 'Building autonomous vehicle models and passionate about AI ethics in Detroit.',
    skills: ['Python', 'TensorFlow', 'MLOps', 'PyTorch'],
    role: 'Mentor',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'DeShawn Williams',
    title: 'Full-Stack Developer',
    organization: 'Rocket Companies',
    bio: 'React and Node enthusiast. DevFest speaker and mentor for Detroit high school coders.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    role: 'Speaker',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Fatima Al-Hassan',
    title: 'UX Research Lead',
    organization: 'StockX',
    bio: 'Making e-commerce accessible, inclusive, and delightful for everyone.',
    skills: ['User Research', 'Figma', 'Design Systems', 'A/B Testing'],
    role: 'Organizer',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Marcus Thompson',
    title: 'DevOps Architect',
    organization: 'Ally Financial',
    bio: 'Automating everything. Cloud infrastructure specialist and open-source contributor.',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    role: 'Navigator',
    github: 'https://github.com',
    website: 'https://example.com',
  },
]

const CAREER_TRACKS = [
  {
    id: 'se',
    title: 'Software Engineering',
    opportunities: 'Full-Stack, Backend, Systems',
    partners: ['Little Caesars', 'IBM', 'Rocket Companies'],
    mentorsAvailable: 24,
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    opportunities: 'MLOps, LLM Engineering, Data Analytics',
    partners: ['Google', 'Ford Motor Company', 'StockX'],
    mentorsAvailable: 18,
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    opportunities: 'DevOps, SRE, Cloud Architecture',
    partners: ['DTE Energy', 'General Motors', 'Ally Financial'],
    mentorsAvailable: 15,
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    opportunities: 'Security Analysis, Threat Intel, AppSec',
    partners: ['DTE Energy', 'Blue Cross Blue Shield'],
    mentorsAvailable: 12,
  },
]

export default function CommunityHubPage() {
  const [activePhase, setActivePhase] = useState('all')
  const [speakers, setSpeakers] = useState([])
  const [speakerFilter, setSpeakerFilter] = useState('')
  const [joinedGroups, setJoinedGroups] = useState({})
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [matchSubmitted, setMatchSubmitted] = useState(false)

  useEffect(() => {
    setSpeakers(getAllSpeakers())
  }, [])

  const handleJoinGroup = (groupId) => {
    setJoinedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      localStorage.setItem('compass_community_early_access', email)
      setSubscribed(true)
      setEmail('')
    }
  }

  const filteredSpeakers = speakerFilter
    ? speakers.filter(
        (s) =>
          s.name?.toLowerCase().includes(speakerFilter.toLowerCase()) ||
          s.organization?.toLowerCase().includes(speakerFilter.toLowerCase()) ||
          s.position?.toLowerCase().includes(speakerFilter.toLowerCase())
      )
    : speakers.slice(0, 6)

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-white transition-colors duration-200 dark:bg-gray-950">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-devfest-blue/5 to-transparent opacity-70" />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#4285f4 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* HERO SECTION */}
        <section className="relative z-10 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary dark:text-primary">
              <FaCompass className="size-3.5 text-primary" />
              COMPASS Detroit Community Hub
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-orbitron">
              The Detroit Tech <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-devfest-yellow to-devfest-blue bg-clip-text text-transparent">
                Community Platform
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Connecting 5,000+ Navigators across Detroit. Explore our Speaker
              Network, build your Verified Profile Card, join Tech Working
              Groups, and match with Mentorship Pathways.
            </p>

            {/* Phase Navigation Bar */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {[
                { id: 'all', label: 'All Features', icon: FaCompass },
                {
                  id: 'phase1',
                  label: 'Phase 1: Speaker Network',
                  icon: FaMicrophone,
                },
                { id: 'phase2', label: 'Phase 2: Profile Cards', icon: FaUser },
                {
                  id: 'phase3',
                  label: 'Phase 3: Working Spaces',
                  icon: FaUsers,
                },
                {
                  id: 'phase4',
                  label: 'Phase 4: Career Pathways',
                  icon: FaRocket,
                },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activePhase === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePhase(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-devfest-blue text-white shadow-lg shadow-devfest-blue/25 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 space-y-24">
          {/* ========================================================================= */}
          {/* PHASE 1: SPEAKER NETWORK */}
          {/* ========================================================================= */}
          {(activePhase === 'all' || activePhase === 'phase1') && (
            <section id="speakers" className="animate-fade-in-up">
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6 dark:border-gray-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-devfest-blue dark:text-devfest-ht-blue mb-1">
                    <FaCircleCheck className="size-3.5" /> Phase 1 · Live
                    Feature
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-orbitron">
                    Speaker Network & Knowledge Base
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-xl">
                    Discover and learn from 120+ industry leaders, GDG experts,
                    and innovators who headline our Innovation Summits and
                    DevFest.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3.5" />
                    <input
                      type="text"
                      placeholder="Search speakers or topics..."
                      value={speakerFilter}
                      onChange={(e) => setSpeakerFilter(e.target.value)}
                      className="rounded-xl border border-gray-300 bg-white pl-9 pr-4 py-2 text-xs shadow-sm focus:border-devfest-blue dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <Link
                    to="/speakers"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-devfest-blue px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition-colors"
                  >
                    Full Directory <FaArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSpeakers.map((sp) => (
                  <div
                    key={sp.slug}
                    className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-devfest-blue hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={
                            sp.avatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
                          }
                          alt={sp.name}
                          className="size-16 rounded-2xl border-2 border-primary/40 object-cover shadow bg-gray-200"
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-devfest-blue transition-colors">
                            {sp.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {sp.position}
                          </p>
                          {sp.organization && (
                            <span className="mt-1 inline-block text-[11px] font-semibold text-primary">
                              {sp.organization}
                            </span>
                          )}
                        </div>
                      </div>

                      {sp.sessions?.[0] && (
                        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          <span className="font-bold text-gray-900 dark:text-white block mb-0.5">
                            Featured Talk:
                          </span>
                          &ldquo;{sp.sessions[0].title}&rdquo;
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                      <span className="rounded-md bg-devfest-pastel-blue/60 px-2 py-0.5 text-[11px] font-semibold text-devfest-blue dark:bg-devfest-blue/20 dark:text-devfest-ht-blue">
                        {sp.sessions?.[0]?.track || 'Keynote Speaker'}
                      </span>
                      <Link
                        to={`/speakers/${sp.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-devfest-blue hover:underline dark:text-devfest-ht-blue"
                      >
                        View Profile <FaArrowRight className="size-2.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 2: PROFILE CARDS & MEMBER DIRECTORY */}
          {/* ========================================================================= */}
          {(activePhase === 'all' || activePhase === 'phase2') && (
            <section id="profile-builder" className="animate-fade-in-up">
              <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-devfest-green dark:text-devfest-ht-green mb-1">
                  <FaCircleCheck className="size-3.5" /> Phase 2 · Interactive
                  Member Cards
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-orbitron">
                  Build & Verify Your Community Profile
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                  Establish your professional identity in Detroit. Choose your
                  skills, showcase your role badge, and preview your custom
                  community profile card.
                </p>
              </div>

              {/* Profile Card Builder Interactive Component */}
              <div className="rounded-3xl border border-gray-200 bg-gray-50/50 p-6 md:p-10 dark:border-gray-800 dark:bg-gray-900/50 shadow-inner">
                <ProfileCardBuilder />
              </div>

              {/* Verified Community Members Preview */}
              <div className="mt-16">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaUsers className="size-5 text-primary" /> Verified
                    Navigators & Members
                  </h3>
                  <Link
                    to="/members"
                    className="text-xs font-bold text-devfest-blue hover:underline dark:text-devfest-ht-blue"
                  >
                    Browse All Members →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {SAMPLE_COMMUNITY_MEMBERS.map((member, idx) => (
                    <div key={idx} className="flex justify-center">
                      <MemberProfileCard {...member} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 3: COMMUNITY WORKING SPACES */}
          {/* ========================================================================= */}
          {(activePhase === 'all' || activePhase === 'phase3') && (
            <section id="spaces" className="animate-fade-in-up">
              <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-devfest-yellow dark:text-devfest-ht-yellow mb-1">
                  <FaCircleCheck className="size-3.5" /> Phase 3 · Working
                  Groups & Hubs
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-orbitron">
                  Technical Working Groups & Hubs
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                  Collaborate in active guilds across AI, Cloud, Frontend, and
                  Leadership. Join monthly meetups, collaborate on real-world
                  projects, and lead community initiatives.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {WORKING_GROUPS.map((group) => {
                  const Icon = group.icon
                  const isJoined = joinedGroups[group.id]
                  return (
                    <div
                      key={group.id}
                      className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                            <Icon className="size-6" />
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            <FaUsers className="size-3" /> {group.membersCount}{' '}
                            Navigators
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {group.title}
                        </h3>
                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {group.desc}
                        </p>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <FaCalendarDays className="size-3.5 text-devfest-blue" />
                            <span>{group.meetingSchedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <FaCompass className="size-3.5 text-primary" />
                            <span>Lead: {group.lead}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {group.topics.map((t, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                            isJoined
                              ? 'bg-green-600 text-white shadow'
                              : 'bg-gray-900 text-white hover:bg-primary hover:text-black dark:bg-gray-800 dark:hover:bg-primary dark:hover:text-black'
                          }`}
                        >
                          {isJoined ? (
                            <>
                              <FaCircleCheck className="size-3.5" /> Working
                              Group Joined!
                            </>
                          ) : (
                            <>
                              <FaUsers className="size-3.5" /> Join Working
                              Group
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* PHASE 4: CAREER PATHWAYS & MENTORSHIP MATCHER */}
          {/* ========================================================================= */}
          {(activePhase === 'all' || activePhase === 'phase4') && (
            <section id="pathways" className="animate-fade-in-up">
              <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  <FaCircleCheck className="size-3.5" /> Phase 4 · Career &
                  Mentorship Infrastructure
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-orbitron">
                  Career Matcher & Employer Pathways
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                  Over 51% of our community is actively looking for
                  opportunities. We match prepared Navigators directly to
                  co-ops, apprenticeships, and hiring partners.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Career Track Selector */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    Select Your Pathway to View Matching Partners & Mentors
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {CAREER_TRACKS.map((track) => {
                      const isSelected = selectedTrack?.id === track.id
                      return (
                        <button
                          type="button"
                          key={track.id}
                          onClick={() => setSelectedTrack(track)}
                          className={`w-full text-left cursor-pointer rounded-2xl border p-5 transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary'
                              : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {track.title}
                            </span>
                            <span className="rounded-full bg-devfest-pastel-yellow px-2 py-0.5 text-[10px] font-bold text-gray-900">
                              {track.mentorsAvailable} Mentors
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {track.opportunities}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {track.partners.map((p, i) => (
                              <span
                                key={i}
                                className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Mentorship Intake Form */}
                  <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Get Matched for the 2026–2027 Cohort
                    </h4>
                    {matchSubmitted ? (
                      <div className="rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-800 dark:bg-green-950/30 dark:text-green-300 border border-green-200 dark:border-green-800 flex items-center gap-2">
                        <FaCircleCheck className="size-4 text-green-600" />
                        Application received! A COMPASS Pathway Lead will
                        contact you within 48 hours.
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          setMatchSubmitted(true)
                        }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            className="rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            className="rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                        <div className="flex gap-2">
                          <select className="flex-1 rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <option>Goal: Seeking Job / Apprenticeship</option>
                            <option>Goal: Seeking 1-on-1 Mentorship</option>
                            <option>Goal: Volunteer as Mentor</option>
                          </select>
                          <button
                            type="submit"
                            className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-gray-950 hover:bg-primary-400 transition-colors shadow"
                          >
                            Submit Application
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Outcome Proof & Ecosystem Highlights */}
                <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-950 p-8 text-white shadow-xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                    <FaHandshake className="size-3.5" /> Verified Hires & Impact
                  </div>
                  <h3 className="text-xl font-bold font-orbitron mb-3">
                    Navigators Are Getting Hired
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    Our corporate partners don&apos;t just sponsor events — they
                    hire the talent they meet on our platform.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                      <span className="text-xs font-bold text-primary">
                        DTE Energy
                      </span>
                      <p className="text-xs font-medium text-white">
                        Co-Op Placement (2+ Semesters)
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Hired after connecting at a 2025 Innovation Summit.
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                      <span className="text-xs font-bold text-primary">
                        Little Caesars
                      </span>
                      <p className="text-xs font-medium text-white">
                        Software Engineer (Full-Time)
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Hired directly after portfolio review session.
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                      <span className="text-xs font-bold text-primary">
                        IBM
                      </span>
                      <p className="text-xs font-medium text-white">
                        Product Manager (Full-Time)
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Built network through COMPASS, WTM & GDG Detroit.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <Link
                      to="/impact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Read Full 2023–2026 Impact Report{' '}
                      <FaArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* COMMUNITY WAITLIST / NEWSLETTER */}
          {/* ========================================================================= */}
          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-12 text-center dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-orbitron">
              Stay Connected with Detroit&apos;s Tech Scene
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              Get invitations to technical working groups, CFS announcements,
              and career opportunities directly in your inbox.
            </p>

            <div className="mt-8 mx-auto max-w-md">
              {subscribed ? (
                <div className="rounded-2xl bg-green-50 p-4 border border-green-200 dark:bg-green-950/30 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Thank you for joining! You&apos;ll receive updates for all 4
                    community phases.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-xs sm:text-sm focus:border-devfest-blue dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-devfest-blue px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-blue-600 transition-all shrink-0"
                  >
                    Join Platform
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
