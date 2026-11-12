/**
 * Lineup changes that are newer than the midevfest.com Sanity project, taken
 * from the organizers' Speaker & Volunteer Schedule ("Sessions Schedule" tab,
 * Nov 10). Applied on top of `program.json` in devfestProgram.js, so they
 * survive `npm run sync:devfest`. Delete an entry once Sanity matches it.
 */

/** Sessions withdrawn since the last sync, by id. */
export const REMOVED_SESSIONS = []

/** Field-level changes to synced sessions, by id. */
export const SESSION_CHANGES = {
  // Sanity points at an unpublished duplicate of Roland's profile
  'design-for-ai-workshop-26': {
    speakers: ['hoda-solati', 'shima-solati', 'roland-frohman-iii-26'],
  },
  // Michael Mati leads the IBM workshop on his own
  'build-with-ai-workshop-ibm-26': {
    title: 'Build with AI Workshop by IBM',
    speakers: ['michael-mati'],
  },
  // The old abstract described the previous talk
  'don-t-just-learn-about-ai-build-something-with-it': {
    abstract: '',
    description: '',
  },
  // Jordan Mazaira joins the SHPE panel in place of Hernando
  'leading-through-resilience-hispanic-latinos-engineers-shaping-the-future-of-steam':
    {
      speakers: ['jordan-mazaira', 'cindy-cruz-rodriguez', 'anthony-bernal'],
    },
}

/**
 * Sessions not yet in Sanity. `plenary` sessions run for everyone at once:
 * the schedule shows them full width, and they carry their own `tone`,
 * `day` and `room` since they belong to no track.
 */
export const ADDED_SESSIONS = [
  {
    id: 'saturday-morning-mindfulness-yoga-26',
    title: 'Morning Mindfulness & Meditative Yoga',
    track: 'Wellness',
    plenary: true,
    day: 'conference',
    tone: 'slate',
    time: '08:15',
    duration: 30,
    speakers: ['william-bowen-26'],
  },
  {
    id: 'keynote-ai-for-scale-people-for-success-26',
    title: 'Keynote: AI for Scale. People for Success.',
    track: 'Keynote',
    plenary: true,
    day: 'conference',
    tone: 'yellow',
    room: 'Grand Ballroom',
    time: '09:00',
    duration: 45,
    speakers: ['w-scott-richardson-26'],
  },
  {
    id: 'michigan-devfest-hackathon-winners-26',
    title: 'Michigan DevFest Hackathon Winners',
    abstract:
      "The winning teams from Friday's AI Hackathon present what they built.",
    track: 'Innovation',
    time: '15:15',
    duration: 35,
    speakers: [],
    // Shown in place of speaker names; the teams aren't known until Friday
    presenter: 'Hackathon winners',
  },
].map((s) => ({
  abstract: '',
  description: '',
  tags: [],
  isPanel: false,
  moderators: [],
  ...s,
}))

/** Field-level changes to synced speakers, by slug. */
export const SPEAKER_CHANGES = {
  'ida-byrd-hill-26': { linkedIn: 'https://www.linkedin.com/in/idabyrdhill/' },
  // Sanity still lists TBA; role from the GDG event page
  'jordan-mazaira': {
    organization: 'Ford',
    position: 'System and Controls Engineer',
    linkedIn: 'https://www.linkedin.com/in/jordan-mazaira-94058a161/',
  },
}

/** Speakers not yet (or no longer) published in Sanity. */
export const ADDED_SPEAKERS = [
  {
    slug: 'michael-mati',
    name: 'Michael Mati',
    avatar:
      'https://cdn.sanity.io/images/5qtiaw9u/production/5d522a9488a163eb0a255bd10b22be8f83e75ebc-982x999.jpg',
    bio: 'Hi everyone! My name is Michael Mati, and I am an Automation Customer Success Engineer at IBM. Even though I live in Michigan, I was born in New York and have lived in Texas most of my life until last year. I graduated from the University of Texas at Dallas with a B.S. in Computer Information Systems and Technology. In my free time, I love playing basketball, going to the gym, and watching movies!',
    organization: 'IBM',
    position: 'Automation Customer Success Engineer',
    linkedIn: 'https://www.linkedin.com/in/michael-mati/',
  },
].map((p) => ({
  avatar: null,
  bio: null,
  organization: null,
  position: null,
  linkedIn: null,
  twitter: null,
  isGDE: false,
  isWTM: false,
  ...p,
}))
