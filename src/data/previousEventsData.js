export const EVENT_TYPES = {
  devfest: { label: 'Michigan DevFest', color: 'blue', icon: 'mic' },
  iwd: { label: 'IWD Innovation Summit', color: 'purple', icon: 'heart' },
  bhm: { label: 'BHM Innovation Summit', color: 'orange', icon: 'fist' },
  pride: { label: 'Pride Innovation Summit', color: 'rose', icon: 'sparkle' },
  hackathon: { label: 'Hack Michigan', color: 'emerald', icon: 'code' },
}

export const previousEvents = [
  // 2026
  {
    year: 2026,
    type: 'devfest',
    name: 'Michigan DevFest 2026',
    date: 'November 2026',
    location: 'MotorCity Casino Hotel, Detroit',
    speakers: 50,
    sessions: 45,
    tracks: 6,
    attendees: '1,000+',
    hasSpeakerData: true,
    description:
      "Michigan's 12th annual flagship developer conference — 1,000+ attendees, technical training, hands-on AI workshops, and industry tracks.",
    externalUrl: 'https://midevfest26.vercel.app/',
    photoCategory: 'DevFest 2026',
  },
  {
    year: 2026,
    type: 'iwd',
    name: 'IWD Innovation Summit 2026',
    date: 'March 2026',
    location: 'Google Detroit',
    speakers: 40,
    sessions: 32,
    tracks: 8,
    attendees: '250+',
    hasSpeakerData: true,
    description:
      "Detroit International Women's Day Innovation Summit at Google Detroit with complimentary professional headshots by Heart of the City Photography.",
    externalUrl: 'https://iwdsummit.com',
    photoCategory: 'IWD Summit 2026',
  },
  {
    year: 2026,
    type: 'bhm',
    name: 'BHM Innovation Summit 2026',
    date: 'February 2026',
    location: 'Detroit, MI',
    speakers: 35,
    sessions: 25,
    tracks: 5,
    attendees: '300+',
    hasSpeakerData: true,
    description:
      'Honoring Black History Month with AI upskilling, resume reviews, technical panels, and direct employer networking.',
    photoCategory: 'BHM Summit 2026',
  },

  // 2025
  {
    year: 2025,
    type: 'devfest',
    name: 'Michigan DevFest 2025',
    date: 'November 2025',
    location: 'MotorCity Casino Hotel, Detroit',
    speakers: 46,
    sessions: 40,
    tracks: 6,
    attendees: '800+',
    hasSpeakerData: true,
    description:
      "Michigan's 11th annual flagship developer conference featuring 6 tracks across AI, Cloud, Mobile, Web, Leadership, and Innovation.",
    externalUrl: 'https://midevfest.com',
    photoCategory: 'DevFest 2025',
  },
  {
    year: 2025,
    type: 'iwd',
    name: 'IWD Innovation Summit 2025',
    date: 'March 2025',
    location: 'Google Detroit',
    speakers: 40,
    sessions: 30,
    tracks: 8,
    attendees: '250+',
    hasSpeakerData: true,
    description:
      "International Women's Day celebration with 8 tracks, 120+ companies, and complimentary headshots by Heart of the City Photography.",
    externalUrl: 'https://bit.ly/det-iwd-25-website',
    photoCategory: 'IWD Summit 2025',
  },
  {
    year: 2025,
    type: 'bhm',
    name: 'BHM Innovation Summit 2025',
    date: 'February 2025',
    location: 'Detroit, MI',
    speakers: 30,
    sessions: 22,
    tracks: 4,
    attendees: '200+',
    hasSpeakerData: true,
    description:
      'Celebrating Black excellence in technology with keynotes, panels, and networking focused on career advancement and innovation.',
    externalUrl: 'https://bit.ly/bhm-summit-website',
    photoCategory: 'BHM Summit 2025',
  },

  // 2024
  {
    year: 2024,
    type: 'devfest',
    name: 'Michigan DevFest 2024',
    date: 'November 2024',
    location: 'Detroit, MI',
    speakers: 30,
    sessions: 28,
    tracks: 5,
    attendees: '500+',
    hasSpeakerData: true,
    description:
      "Michigan's 10th annual developer conference with technical tracks and career-focused workshops.",
    photoCategory: 'DevFest 2024',
  },
  {
    year: 2024,
    type: 'iwd',
    name: 'IWD Innovation Summit 2024',
    date: 'March 2024',
    location: 'Google Detroit',
    speakers: 25,
    sessions: 20,
    tracks: 6,
    attendees: '200+',
    hasSpeakerData: true,
    description:
      "The first Detroit International Women's Day Innovation Summit, hosted at Google Detroit — where Grand Circus reported 87 prospective student engagements.",
    photoCategory: 'IWD Summit 2024',
  },
  {
    year: 2024,
    type: 'bhm',
    name: 'BHM Innovation Summit 2024',
    date: 'February 2024',
    location: 'Detroit, MI',
    speakers: 20,
    sessions: 16,
    tracks: 3,
    attendees: '150+',
    hasSpeakerData: true,
    description: 'Celebrating Black innovation and excellence in technology.',
    photoCategory: 'BHM Summit 2024',
  },

  // 2023
  {
    year: 2023,
    type: 'devfest',
    name: 'Michigan DevFest 2023',
    date: 'November 2023',
    location: 'Little Caesars HQ, Detroit',
    speakers: 21,
    sessions: 20,
    tracks: 4,
    attendees: '300+',
    hasSpeakerData: true,
    description:
      "Michigan's 9th annual developer conference — the year COMPASS started building pathways.",
    photoCategory: 'DevFest 2023',
  },
]

export const getEventsByYear = (year) =>
  previousEvents.filter((e) => e.year === year)
export const getEventsByType = (type) =>
  previousEvents.filter((e) => e.type === type)
export const getAvailableYears = () =>
  [...new Set(previousEvents.map((e) => e.year))].sort((a, b) => b - a)
export const getAvailableTypes = () => [
  ...new Set(previousEvents.map((e) => e.type)),
]
