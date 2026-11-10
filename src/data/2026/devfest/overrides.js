/**
 * Lineup changes that are newer than the midevfest.com Sanity project, taken
 * from the organizers' Speaker & Volunteer Schedule ("Sessions Schedule" tab,
 * Nov 10). Applied on top of `program.json` in devfestProgram.js, so they
 * survive `npm run sync:devfest`. Delete an entry once Sanity matches it.
 */
import IdaByrdHill from '@/assets/images/speakers/Ida_Byrd-Hill.jpeg'
import RolandFrohman from '@/data/2026/assets/images/team/roland_frohman.webp'

/** Sessions withdrawn since the last sync, by id. */
export const REMOVED_SESSIONS = [
  // Pragya Keshap no longer speaking; Kiruthika's workshop takes the slot
  'who-evaluates-the-evaluator-building-reliable-llm-as-a-judge-evaluations-with-gemini',
  // Rupali Sharma no longer speaking
  'strategist-systems-builder-customer-whisperer-the-product-leader-in-the-ai-era',
]

/** Field-level changes to synced sessions, by id. */
export const SESSION_CHANGES = {
  'design-for-ai-workshop-26': {
    speakers: ['hoda-solati', 'shima-solati', 'roland-frohman-iii'],
  },
  'build-with-ai-workshop-google-26': {
    title: 'AI Workshop with Google & Lovable',
    speakers: ['saeb-ahsan'],
  },
  // 80-minute workshops: 10:45 AM–12:05 PM
  'design-to-production-with-google-stitch': { duration: 80 },
  // 1:00–2:20 PM
  'spring-boot-gemini-demo': { duration: 80 },
  // 2:30–3:50 PM
  'self-refining-agents-that-earn-their-own-upgrades-on-google-cloud': {
    time: '14:30',
    duration: 80,
  },
  // New title; the old abstract described the previous talk
  'don-t-just-learn-about-ai-build-something-with-it': {
    title:
      'Beyond the Chatbot: Building Immersive AI Learning Environments for the Next Generation',
    abstract: '',
    description: '',
  },
  'humanos-build-systems-that-multiply-your-productivity-across-life-business-strategy':
    {
      title:
        'HumanOS: Build Systems That Multiply Your Productivity Across Life, Business & Service',
    },
  'leading-through-resilience-hispanic-latinos-engineers-shaping-the-future-of-steam':
    {
      title:
        'Leading Through Resilience: Hispanic/Latinos Engineers Shaping the Future of STEAM',
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
    id: 'why-human-behavior-is-the-missing-ingredient-in-ai-roi',
    title: 'Why Human Behavior is the Missing Ingredient in AI ROI',
    track: 'Build with AI',
    time: '10:00',
    duration: 35,
    speakers: ['ida-byrd-hill'],
  },
  {
    id: 'beyond-expectations-innovating-the-user-experience',
    title: 'Beyond Expectations: Innovating the User Experience',
    track: 'Leadership',
    time: '13:45',
    duration: 35,
    speakers: ['hoda-solati', 'shima-solati', 'roland-frohman-iii'],
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
  kiruthika: { name: 'Kiruthika Subramani' },
}

/** Speakers not yet in Sanity; photos and bios from their 2025 profiles. */
export const ADDED_SPEAKERS = [
  {
    slug: 'ida-byrd-hill',
    name: 'Ida Byrd-Hill',
    avatar: IdaByrdHill,
    bio: `Ida Byrd-Hill, MBA is CEO of Automation Workz, a behavior informatics firm, best known for implementing culture audits, executive coaching and training over 16,520 front-liners in AI, Cybersecurity, Data Analytics, Network Engineering, Tech Support and strategic sales.\n\nIda Byrd-Hill is a graduate of the University of Michigan - Ann Arbor with a BA, Economics and Jack Welch Management Institute with an MBA. Ida's career has been a wealth manager, an executive search consultant, Human Resources manager and a programmer.\n\nIda Byrd-Hill is a member of Detroit Regional Chamber, CEO Talent Council, SHRM, Society of Automotive Analysts and Automotive Press Association.\n\nIda is the author of Culture Re-Wired: Unleash Your Inner AI CEO. https://www.autoworkz.org/culture-re-wired`,
    organization: 'Automation Workz',
    position: 'Founder & CEO',
    linkedIn: 'https://www.linkedin.com/in/idabyrdhill/',
  },
  {
    slug: 'roland-frohman-iii',
    name: 'Roland Frohman III',
    avatar: RolandFrohman,
    bio: `Roland’s research explores the convergence of physical and digital interactions within connected product ecosystems, with particular focus on IoT devices and spatial computing interfaces. His work investigates how emerging technologies—including AR/VR/XR, voice interfaces, and AI-driven interactions—shape human-centered design across multiple touch points. Through his practice and teaching, he examines the evolution from traditional 2D interfaces to spatial computing environments, developing pedagogical approaches that prepare designers for increasingly complex, multi-modal experiences. His current research involves creating frameworks for seamless cross-platform experiences that bridge the gap between industrial design and digital interaction.`,
    organization: 'College for Creative Studies',
    position: 'Graduate Adjunct Professor',
    linkedIn: 'https://www.linkedin.com/in/rhfrohman3/',
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
