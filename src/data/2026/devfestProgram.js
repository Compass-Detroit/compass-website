/**
 * Michigan DevFest 2026 program — speakers, sessions, tracks and topics.
 *
 * `devfest/program.json` is a snapshot of the midevfest.com Sanity project
 * (published sessions and their speakers). Refresh with `npm run sync:devfest`.
 * Everything here is derived from it, so a re-sync updates every view.
 */
import program from './devfest/program.json'

const EVENT_NAME = 'Michigan DevFest 2026'

export const DEVFEST_PROGRAM_SYNCED_AT = program.syncedAt

export const DEVFEST_DAYS = [
  {
    id: 'hackathon',
    date: '2026-11-13',
    label: 'Fri · Nov 13',
    title: 'AI Hackathon',
    blurb:
      'Workshops from Google and IBM, a full afternoon of hacking, then demos, judging and prizes.',
  },
  {
    id: 'conference',
    date: '2026-11-14',
    label: 'Sat · Nov 14',
    title: 'DevFest Conference',
    blurb:
      'Five tracks of talks and workshops from Michigan builders, then Techie Hour.',
  },
]

/** Tracks in program order. `tone` keys the colour set in the UI. */
export const DEVFEST_TRACKS = [
  {
    name: 'Hackathon',
    day: 'hackathon',
    tone: 'yellow',
    blurb: 'Hands-on workshops that feed straight into the build.',
  },
  {
    name: 'Build with AI',
    day: 'conference',
    tone: 'blue',
    blurb: 'Ship with Gemini, Google Cloud and Stitch. Long-form workshops.',
  },
  {
    name: 'AI Foundations',
    day: 'conference',
    tone: 'green',
    blurb: 'How agents work, how to test them and where AI meets people.',
  },
  {
    name: 'Innovation',
    day: 'conference',
    tone: 'red',
    blurb: 'UX, security, Android and the systems around coding agents.',
  },
  {
    name: 'Leadership',
    day: 'conference',
    tone: 'pink',
    blurb: 'Teams, product strategy, communication and responsible AI.',
  },
  {
    name: 'Level Up',
    day: 'conference',
    tone: 'cyan',
    blurb: 'Grow your career, your habits and your side projects.',
  },
]

const TRACK_BY_NAME = Object.fromEntries(DEVFEST_TRACKS.map((t) => [t.name, t]))

/**
 * Cross-track themes. A session joins a topic when its title, abstract or
 * tags match; topics cut across tracks so attendees can follow one thread.
 */
export const DEVFEST_TOPIC_RULES = [
  // `deep` rules are specific enough to also scan the full description
  { id: 'agents', label: 'AI agents', match: /\bagent/i, deep: true },
  {
    id: 'google',
    label: 'Gemini & Google AI',
    match: /gemini|google|android|stitch/i,
  },
  {
    id: 'design',
    label: 'Design & UX',
    match: /\bux\b|\bdesign\b|accessib|user experience/i,
  },
  {
    id: 'trust',
    label: 'Security & responsible AI',
    match: /security|ethical hacking|auditing|fairness|accountab|authenticat/i,
  },
  {
    id: 'quality',
    label: 'Testing & evaluation',
    match: /evaluat|\btesting\b|judge|detail-oriented|grading/i,
  },
  {
    id: 'ship',
    label: 'Ship fast: MVPs & vibe coding',
    match:
      /vibe|\bmvp\b|rapid|build something|design to production|proof of concept/i,
  },
  {
    id: 'career',
    label: 'Careers & growth',
    match: /career|teach while|relationships in tech|productivity|level up/i,
  },
  {
    id: 'leadership',
    label: 'Leading teams',
    match: /leader|burnout|teams|communication/i,
  },
  {
    id: 'human',
    label: 'Human-centered tech',
    match:
      /humanity|human success|curiosity|software is personal|wellness|mindful|burnout/i,
  },
]

const SPEAKERS_BY_SLUG = Object.fromEntries(
  program.speakers.map((s) => [s.slug, s])
)

const minutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const hhmm = (total) =>
  `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(
    total % 60
  ).padStart(2, '0')}`

export const formatTime = (time) => {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`
}

const topicsFor = (session) => {
  // Titles and abstracts only: long descriptions over-match
  const text = [session.title, session.abstract, ...session.tags].join(' ')
  const full = `${text} ${session.description}`
  return DEVFEST_TOPIC_RULES.filter((t) =>
    t.match.test(t.deep ? full : text)
  ).map((t) => t.id)
}

/** Every published session, in time then track order, with speakers resolved. */
export const DEVFEST_SESSIONS = program.sessions
  .map((s) => {
    const track = TRACK_BY_NAME[s.track]
    return {
      ...s,
      day: track?.day ?? 'conference',
      tone: track?.tone ?? 'slate',
      timeEnd: hhmm(minutes(s.time) + (s.duration ?? 0)),
      speakers: s.speakers
        .map((slug) => SPEAKERS_BY_SLUG[slug])
        .filter(Boolean),
      topics: topicsFor(s),
    }
  })
  .sort(
    (a, b) =>
      a.time.localeCompare(b.time) ||
      DEVFEST_TRACKS.indexOf(TRACK_BY_NAME[a.track]) -
        DEVFEST_TRACKS.indexOf(TRACK_BY_NAME[b.track])
  )

/** Talks and workshops with someone on stage (no breaks or logistics). */
export const DEVFEST_TALKS = DEVFEST_SESSIONS.filter((s) => s.speakers.length)

/** Conference-day blocks shared by every track, from the midevfest.com run-of-show. */
export const DEVFEST_RUN_OF_SHOW = [
  { time: '08:00', timeEnd: '09:00', title: 'Check-In & Breakfast' },
  {
    time: '08:15',
    timeEnd: '08:45',
    title: 'Morning Mindfulness & Meditative Yoga',
  },
  { time: '08:45', timeEnd: '09:00', title: 'Welcome & Opening Remarks' },
  {
    time: '09:00',
    timeEnd: '09:45',
    title: 'Keynote',
    note: 'Keynote speaker to be announced.',
  },
  { time: '12:15', timeEnd: '13:00', title: 'Lunch Break & Networking' },
  { time: '16:00', timeEnd: '16:30', title: 'Closing Remarks & Prizes' },
  { time: '16:30', timeEnd: '18:00', title: 'Techie Hour & Networking' },
].map((block) => ({ ...block, day: 'conference', shared: true }))

/** Speakers with their sessions, ordered by name. */
export const DEVFEST_SPEAKERS = program.speakers.map((speaker) => ({
  ...speaker,
  sessions: DEVFEST_TALKS.filter((s) =>
    s.speakers.some((p) => p.slug === speaker.slug)
  ),
}))

export const DEVFEST_TOPICS = DEVFEST_TOPIC_RULES.map(({ id, label }) => ({
  id,
  label,
  sessions: DEVFEST_TALKS.filter((s) => s.topics.includes(id)),
})).filter((t) => t.sessions.length >= 2)

export const DEVFEST_PROGRAM_STATS = {
  speakers: DEVFEST_SPEAKERS.length,
  talks: DEVFEST_TALKS.filter((s) => s.day === 'conference').length,
  workshops: DEVFEST_TALKS.filter((s) => s.day === 'hackathon').length,
  tracks: DEVFEST_TRACKS.filter((t) => t.day === 'conference').length,
  organizations: new Set(
    program.speakers.map((s) => s.organization).filter(Boolean)
  ).size,
}

/**
 * One entry per speaker in the shape the speaker registry and the
 * past-events pages read (`session` is an array for multi-session speakers).
 */
export const SpeakersData = DEVFEST_SPEAKERS.map((speaker, i) => ({
  id: i + 1,
  name: speaker.name,
  avatar: speaker.avatar,
  bio: speaker.bio,
  twitter: speaker.twitter,
  linkedIn: speaker.linkedIn,
  organization: speaker.organization,
  position: speaker.position,
  isGDE: speaker.isGDE,
  isWTM: speaker.isWTM,
  session: speaker.sessions.map((s) => ({
    title: s.title,
    abstract: s.abstract,
    description: s.description,
    tags: s.tags,
    track: s.track,
    time: s.time,
    room: '',
    sessionDuration: s.duration,
    speakers: s.speakers.map((p) => p.name),
    event: EVENT_NAME,
  })),
}))
