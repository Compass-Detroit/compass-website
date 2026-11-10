/**
 * Michigan DevFest 2026 program — speakers, sessions, tracks and topics.
 *
 * `devfest/program.json` is a snapshot of the midevfest.com Sanity project
 * (published sessions and their speakers). Refresh with `npm run sync:devfest`.
 * Everything here is derived from it, so a re-sync updates every view.
 */
import program from './devfest/program.json'

const EVENT_NAME = 'Michigan DevFest 2026'

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
  // Saturday only; some speakers lead just the Friday hackathon workshops
  conferenceSpeakers: DEVFEST_SPEAKERS.filter((s) =>
    s.sessions.some((t) => t.day === 'conference')
  ).length,
  talks: DEVFEST_TALKS.filter((s) => s.day === 'conference').length,
  workshops: DEVFEST_TALKS.filter((s) => s.day === 'hackathon').length,
  tracks: DEVFEST_TRACKS.filter((t) => t.day === 'conference').length,
  organizations: new Set(
    program.speakers.map((s) => s.organization).filter(Boolean)
  ).size,
}

/**
 * The two event days: the only per-day data in the codebase, used by the
 * home page hero, the /devfest page, the lineup strip and session dialogs.
 * `tone` keys the day colour (see TONE_HEX in programUtils).
 */
export const DEVFEST_DAYS = [
  {
    id: 'hackathon',
    date: '2026-11-13',
    short: 'Fri',
    weekday: 'Friday',
    numeral: '13',
    label: 'Fri · Nov 13',
    tone: 'yellow',
    title: 'AI Hackathon',
    tagline: 'Workshops, hacking, demos, prizes',
    blurb:
      'Workshops from Google and IBM, an afternoon of hacking, then demos, judging and prizes.',
  },
  {
    id: 'conference',
    date: '2026-11-14',
    short: 'Sat',
    weekday: 'Saturday',
    numeral: '14',
    label: 'Sat · Nov 14',
    tone: 'blue',
    title: 'Conference',
    tagline: `${DEVFEST_PROGRAM_STATS.talks} talks · ${DEVFEST_PROGRAM_STATS.tracks} tracks`,
    blurb: `${DEVFEST_PROGRAM_STATS.talks} talks and workshops across ${DEVFEST_PROGRAM_STATS.tracks} tracks, then Techie Hour.`,
  },
]

/** Saturday's track names in program order, e.g. for copy that lists them. */
export const DEVFEST_CONFERENCE_TRACKS = DEVFEST_TRACKS.filter(
  (t) => t.day === 'conference'
).map((t) => t.name)

/** Day lookup by id ('hackathon' | 'conference'). */
export const DEVFEST_DAY_BY_ID = Object.fromEntries(
  DEVFEST_DAYS.map((d) => [d.id, d])
)

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
