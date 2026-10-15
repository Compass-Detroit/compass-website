// Michigan DevFest 2026 — single source for dates, venue and links
const ASSETS = '/assets/devfest26'

export const DEVFEST_2026 = {
  name: 'Michigan DevFest 2026',
  edition: '12th annual',
  dateLabel: 'November 13–14, 2026',
  shortDateLabel: 'Nov 13–14',
  // Kickoff for the countdown; Detroit is on EST (UTC-5) in November
  startsAt: '2026-11-13T00:00:00-05:00',
  endDate: '2026-11-14',
  venue: 'Hollywood Casino at Greektown',
  address: '1200 Saint Antoine St, Detroit, MI 48226',
  registerUrl:
    'https://gdg.community.dev/events/details/google-gdg-detroit-presents-michigan-devfest-ai-hackathon-2026/',
  siteUrl: 'https://www.midevfest.com/',
  // Registrations through this date (inclusive) get a DevFest T-shirt
  shirtDeadline: '2026-10-30T23:59:59-04:00',
  shirtDeadlineLabel: 'October 30',
  // Check-in is at the conference center entrance, not the hotel address
  checkIn:
    'Check-in at the Conference Center, 555 E. Lafayette St · doors open 8:00 AM',
  parking: [
    {
      name: 'Greektown Self-Park Garage',
      detail:
        '1211 Crysler Dr. Enter from the I-375 Lafayette ramp; pay by card at the kiosk.',
    },
    {
      name: 'MGM Grand Garage (free)',
      detail: 'Free parking at MGM Grand Detroit, across town from Greektown.',
    },
  ],
  comingSoon: ['Speaker lineup', 'Full schedule', 'Session tracks'],
  days: [
    {
      date: 'Fri · Nov 13',
      title: 'AI Hackathon',
      desc: 'Team up, build with AI and demo what you shipped.',
    },
    {
      date: 'Sat · Nov 14',
      title: 'Conference',
      desc: 'Talks, workshops and panels from Michigan builders. Track lineup coming soon.',
    },
  ],
  stats: [
    { value: '300+', label: 'Attendees' },
    { value: '30+', label: 'Speakers' },
    { value: 'TBD', label: 'Tracks' },
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
