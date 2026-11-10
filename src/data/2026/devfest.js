// Michigan DevFest 2026 — single source for dates, venue and links
import { DEVFEST_PROGRAM_STATS } from './devfestProgram'

const ASSETS = '/assets/devfest26'

const DEVFEST_ATTENDEES = '300+'

export const DEVFEST_2026 = {
  name: 'Michigan DevFest 2026',
  edition: '12th annual',
  attendees: DEVFEST_ATTENDEES,
  dateLabel: 'November 13–14, 2026',
  shortDateLabel: 'Nov 13–14',
  // Detroit is on EST (UTC-5) in November. Doors open at 8 AM on the
  // Friday; Techie Hour wraps at 6 PM on the Saturday.
  utcOffset: '-05:00',
  startsAt: '2026-11-13T08:00:00-05:00',
  endsAt: '2026-11-14T18:00:00-05:00',
  endDate: '2026-11-14',
  venue: 'Hollywood Casino at Greektown',
  address: '1200 Saint Antoine St, Detroit, MI 48226',
  registerUrl:
    'https://gdg.community.dev/events/details/google-gdg-detroit-presents-michigan-devfest-ai-hackathon-2026/',
  siteUrl: 'https://www.midevfest.com/',
  // Check-in is at the conference center entrance, not the hotel address
  // Check-in is at the conference center entrance, not the hotel address
  entrance: 'Conference Center, 555 E. Lafayette St',
  checkIn:
    'Check-in at the Conference Center, 555 E. Lafayette St · doors open 8:00 AM',
  parking: [
    {
      name: 'Greektown parking structure (free)',
      detail:
        "1211 Crysler Dr. Enter from the I-375 Lafayette ramp and tell the guard you're there for Michigan DevFest.",
    },
  ],
  // Full speaker and session lineup lives on this site's program page
  programPath: '/devfest',
  days: [
    {
      date: 'Fri · Nov 13',
      title: 'AI Hackathon',
      desc: 'Google and IBM workshops, an afternoon of hacking, then demos and prizes.',
    },
    {
      date: 'Sat · Nov 14',
      title: 'Conference',
      desc: `${DEVFEST_PROGRAM_STATS.talks} talks and workshops across ${DEVFEST_PROGRAM_STATS.tracks} tracks from Michigan builders.`,
    },
  ],
  stats: [
    { value: DEVFEST_ATTENDEES, label: 'Attendees' },
    { value: String(DEVFEST_PROGRAM_STATS.speakers), label: 'Speakers' },
    { value: String(DEVFEST_PROGRAM_STATS.tracks), label: 'Tracks' },
  ],
  logoWhite: `${ASSETS}/midevfest-logo-white.svg`,
  logoBlack: `${ASSETS}/midevfest-logo-black.svg`,
  flyer: {
    title: 'Michigan DevFest ’26 event flyer',
    alt: 'Michigan DevFest ’26 flyer: Tech Conference plus AI Hackathon, November 13–14 at Hollywood Casino Hotel, Greektown, 1200 Saint Antoine Street, Detroit. The 12th annual Michigan DevFest Conference, powered by Google and Compass Detroit.',
    src: `${ASSETS}/midevfest26-event-flyer-640.webp`,
    srcSet: `${ASSETS}/midevfest26-event-flyer-640.webp 640w, ${ASSETS}/midevfest26-event-flyer-898.webp 898w`,
    full: `${ASSETS}/midevfest26-event-flyer.png`,
    width: 898,
    height: 1250,
  },
}

// All-day Google Calendar link (dates end is exclusive)
export const devfestCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams(
  {
    action: 'TEMPLATE',
    text: DEVFEST_2026.name,
    dates: '20261113/20261115',
    details: `AI Hackathon (Nov 13) + Conference (Nov 14). Register: ${DEVFEST_2026.registerUrl}`,
    location: `${DEVFEST_2026.venue}, ${DEVFEST_2026.address}`,
  }
)}`
