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
  venue: 'Little Caesars HQ',
  address: '2125 Woodward Ave, Detroit, MI 48201',
  registerUrl: 'https://www.midevfest.com/',
  cfsUrl: 'https://bit.ly/compass-speakers-26',
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
  flyers: [
    {
      id: 'event',
      title: 'Michigan DevFest ’26 event flyer',
      alt: 'Michigan DevFest ’26 flyer: Tech Conference plus AI Hackathon, November 13–14 at Little Caesars HQ, 2125 Woodward Ave, Detroit. The 12th annual Michigan DevFest, powered by Compass Detroit and Little Caesars HQ.',
      src: `${ASSETS}/midevfest26-event-flyer-640.webp`,
      srcSet: `${ASSETS}/midevfest26-event-flyer-640.webp 640w, ${ASSETS}/midevfest26-event-flyer-898.webp 898w`,
      full: `${ASSETS}/midevfest26-event-flyer.png`,
      width: 898,
      height: 1250,
    },
    {
      id: 'cfs',
      title: 'Michigan DevFest 2026 call for speakers flyer',
      alt: 'Michigan DevFest 2026 Call for Speakers flyer: venue Little Caesars HQ, 13–14 November 2026, with a QR code to midevfest.com. Presented by Compass Detroit and GDG Detroit.',
      src: `${ASSETS}/midevfest26-call-for-speakers-flyer-640.webp`,
      srcSet: `${ASSETS}/midevfest26-call-for-speakers-flyer-640.webp 640w, ${ASSETS}/midevfest26-call-for-speakers-flyer-1200.webp 1200w`,
      full: `${ASSETS}/midevfest26-call-for-speakers-flyer.png`,
      width: 1545,
      height: 1999,
    },
  ],
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
