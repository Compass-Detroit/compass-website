/**
 * Registry of every system the Compass platform reads from or writes to.
 * `probe` resolves to a short detail string when the connector answers and
 * throws when it does not. Connectors without a probe report their static
 * `status`: 'local' = browser-only adapter today, 'planned' = not built yet.
 */
import { fetchCalendarEvents } from '@/utils/calendarApi'
import { groq } from '@/services/sanity'

export const COMMUNITY_CALENDAR_ID = 'community-calendar@compass-detroit.com'

export const CONNECTORS = [
  {
    id: 'sanity-lhm',
    name: 'Sanity CMS',
    kind: 'Content',
    detail: 'Speakers, sessions & partners for event sites',
    feeds: ['Speaker directory', 'Previous events', 'Spotlight'],
    probe: async (signal) => {
      const { result, ms } = await groq(
        'count(*[_type in ["speaker", "session", "partner"]])',
        {},
        { project: 'lhm2026', signal }
      )
      return `${result} docs · ${ms}ms`
    },
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    kind: 'Events',
    detail: 'Community calendar via /api/calendar ICS proxy',
    feeds: ['Community calendar', 'ICS export'],
    probe: async (signal) => {
      const events = await fetchCalendarEvents(COMMUNITY_CALENDAR_ID, {
        signal,
      })
      return `${events.length} events`
    },
  },
  {
    id: 'vercel-analytics',
    name: 'Vercel Analytics',
    kind: 'Analytics',
    detail: 'Page views and Core Web Vitals',
    feeds: ['Speed Insights'],
    status: 'live',
  },
  {
    id: 'telemetry',
    name: 'Telemetry ingest',
    kind: 'Analytics',
    detail: 'First-party interaction events via sendBeacon',
    feeds: ['Analytics dashboard'],
    status: import.meta.env.VITE_TELEMETRY_ENDPOINT ? 'live' : 'planned',
    next: 'Add api/telemetry.js and set VITE_TELEMETRY_ENDPOINT',
  },
  {
    id: 'newsletter',
    name: 'Newsletter / ESP',
    kind: 'Email',
    detail: 'Subscribers and drafts',
    feeds: ['Newsletter Studio', 'Subscriber analytics'],
    status: 'local',
    next: 'api/subscribe.js to an email provider',
  },
  {
    id: 'submissions',
    name: 'Talk submissions',
    kind: 'Forms',
    detail: 'Call-for-speakers proposals',
    feeds: ['Submit a talk'],
    status: 'local',
    next: 'api/submissions.js writing Sanity drafts',
  },
  {
    id: 'media',
    name: 'Photo storage',
    kind: 'Media',
    detail: 'Event galleries and headshots',
    feeds: ['Gallery manager'],
    status: 'local',
    next: 'Vercel Blob or the Sanity media library',
  },
  {
    id: 'identity',
    name: 'Member identity',
    kind: 'Auth',
    detail: 'Navigator accounts and profiles',
    feeds: ['Member directory', 'Community hub'],
    status: 'planned',
    next: 'OAuth sign-in with member profiles in Sanity',
  },
]
