/**
 * Latin Heritage Month Innovation Summit 2026 — archived event data.
 *
 * `lhm/*.json` are snapshots of the mishpe26 site's Sanity export
 * (github.com/Compass-Detroit/mishpe26, src/data/2026/*.generated.json).
 * Refresh with `npm run sync:lhm`. The live source is the same Sanity
 * project, which src/services/content can query at runtime.
 */
import speakersSnapshot from './lhm/speakers.json'
import partnersSnapshot from './lhm/partners.json'

export const LHM_EVENT = {
  slug: 'lhm-summit-2026',
  name: 'Latin Heritage Month Innovation Summit 2026',
  shortName: 'LHM Innovation Summit',
  date: '2026-09-19',
  dateLabel: 'Saturday, September 19, 2026',
  venue: 'WSU James and Patricia Anderson College of Engineering Building',
  address: '5050 Anthony Wayne Drive, Detroit, MI 48202',
  url: 'https://hhmsummit.com',
  repo: 'https://github.com/Compass-Detroit/mishpe26',
  theme: 'Break the Pattern',
  sanity: { projectId: 'd1h6cagq', dataset: 'production' },
}

/** Run-of-show from the summit site (non-speaker blocks). */
export const LHM_RUN_OF_SHOW = [
  { time: '08:00', timeEnd: '09:00', title: 'Check-In & Breakfast' },
  {
    time: '08:15',
    timeEnd: '08:45',
    title: 'Morning Mindfulness & Meditative Yoga',
  },
  { time: '08:45', timeEnd: '09:00', title: 'Welcome & Opening Remarks' },
  { time: '12:15', timeEnd: '13:00', title: 'Lunch Break & Networking' },
  { time: '15:30', timeEnd: '15:45', title: 'Closing Remarks & Prizes' },
  { time: '15:45', timeEnd: '16:00', title: 'Fiesta Begins!' },
]

const rows = (list) => (Array.isArray(list) ? list : [])

/**
 * Final program as delivered. The Sanity export (and the snapshot that
 * `npm run sync:lhm` pulls) holds the published pre-event schedule, so program
 * updates are applied here rather than in the JSON.
 */
const OFF_PROGRAM = new Set(['Julea Ferrara'])

const SESSION_UPDATES = {
  'Engineering Loteria': {
    title: 'SHPE Detroit Lunch Talk',
    time: '12:15',
    sessionDuration: 45,
    tags: ['SHPE Detroit', 'STEM Pipeline'],
    description:
      'A lunchtime talk on SHPE Detroit, the Detroit chapter of the Society of Hispanic Professional Engineers, and how it connects students and professionals with engineering careers.',
  },
}

// Engineering Lotería at 2 PM, hosted by two of the SHPE presenters
const LOTERIA_HOSTS = new Set(['Cindy Cruz Rodriguez', 'Raquel Estrada'])

const present = (names) => rows(names).filter((n) => !OFF_PROGRAM.has(n))
const hosts = (names) => rows(names).filter((n) => LOTERIA_HOSTS.has(n))

const loteria = (session) => ({
  ...session,
  title: 'Engineering Lotería',
  speakers: hosts(session.speakers),
  moderators: [],
  panelists: hosts(session.panelists),
  participants: rows(session.participants).filter((p) =>
    LOTERIA_HOSTS.has(p.name)
  ),
})

const correctSession = (session) => ({
  ...session,
  ...SESSION_UPDATES[session.title],
  speakers: present(session.speakers),
  moderators: present(session.moderators),
  panelists: present(session.panelists),
  participants: rows(session.participants).filter(
    (p) => !OFF_PROGRAM.has(p.name)
  ),
})

const recapRows = rows(speakersSnapshot)
  .filter(({ name }) => !OFF_PROGRAM.has(name))
  .flatMap(({ session, ...speaker }) => {
    const corrected = {
      ...speaker,
      session: session && correctSession(session),
    }
    return session?.title === 'Engineering Loteria' &&
      LOTERIA_HOSTS.has(speaker.name)
      ? [corrected, { ...speaker, session: loteria(session) }]
      : [corrected]
  })

/**
 * One entry per speaker in the shape the speaker registry reads. The Sanity
 * export has one row per (speaker, session) pair, so multi-session speakers
 * are merged and keep every session.
 */
export const SpeakersData = Object.values(
  recapRows.reduce((acc, { session, ...speaker }) => {
    const entry = (acc[speaker.name] ??= { ...speaker, session: [] })
    if (session) entry.session.push({ ...session, event: LHM_EVENT.shortName })
    return acc
  }, {})
)

/** Unique sessions, ordered by start time, with their participants. */
export const LHM_SESSIONS = Object.values(
  recapRows.reduce((acc, { session }) => {
    if (session && !acc[session.title]) acc[session.title] = session
    return acc
  }, {})
).sort((a, b) => a.time.localeCompare(b.time))

export const LHM_PARTNERS = {
  sponsors: rows(partnersSnapshot.sponsors),
  community: rows(partnersSnapshot.community),
}
