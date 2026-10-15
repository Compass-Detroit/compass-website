import DetroitHackerHouse from '@/assets/images/sponsors/Detroit_Hacker_House.png'
import DevOpsDetroit from '@/assets/images/sponsors/DevOps_Detroit_Logo.webp'
import DTE from '@/assets/images/sponsors/spo-dte-logo.webp'
import Google from '@/assets/images/sponsors/Google_logo.webp'
import IBM from '@/assets/images/sponsors/IBM_logo.webp'
import LittleCaesars from '@/assets/images/sponsors/Little_Caesars.webp'
import GDGAnnArbor from '@/assets/images/organizations/org-gdg-a2.webp'
import GDGDetroit from '@/assets/images/organizations/org-gdg-detroit.webp'
import GDGToledo from '@/assets/images/organizations/org-gdg-toledo.webp'
import GDGUofMDearborn from '@/assets/images/organizations/org-gdg-umd.webp'
import GDGWindsor from '@/assets/images/organizations/org-gdg-windsor.webp'
import NSBE from '@/assets/images/organizations/org-nsbe-logo.webp'
import SHPE from '@/assets/images/organizations/org-shpe-logo.webp'

// Michigan DevFest 2026 partners, mirrored from the "2026 Partners" section of
// midevfest.com. Logos without a local copy are served from that site's
// Sanity project (5qtiaw9u).
const MIDEVFEST_CDN = 'https://cdn.sanity.io/images/5qtiaw9u/production'

export const partnersData = {
  // Diamond is the top tier for 2026 (2023–2025 led with Platinum)
  tierOrder: ['diamond', 'platinum', 'gold'],
  organizationsLabel: 'Community Partners',
  diamond: [
    {
      id: 1,
      name: 'Google',
      logo: Google,
      desc: `Our mission is to organize the world's information and make it universally accessible and useful.

We are committed to significantly improving the lives of as many people as possible by protecting users, building belonging, expanding opportunity, responding to crises, and advancing sustainability.`,
      url: 'https://about.google/',
      tier: 'Diamond Sponsor',
    },
  ],
  platinum: [
    {
      id: 2,
      name: 'IBM',
      logo: IBM,
      desc: 'IBM is a global technology and innovation company with expertise in hybrid cloud, AI, and consulting services.',
      url: 'https://www.ibm.com/',
      tier: 'Platinum Sponsor',
    },
    {
      id: 3,
      name: 'Vonage',
      logo: `${MIDEVFEST_CDN}/7ea06aa76369352c38b13b801e51f24efa7fd84b-1000x400.png`,
      desc: 'Vonage, part of Ericsson, provides communications APIs for voice, video and messaging that developers build into their apps.',
      url: 'https://www.vonage.com/',
      tier: 'Platinum Sponsor',
    },
  ],
  gold: [
    {
      id: 4,
      name: 'DTE Energy',
      logo: DTE,
      desc: 'DTE Energy is a Detroit-based diversified energy company involved in the development and management of energy-related businesses and services.',
      url: 'https://www.dteenergy.com/',
      tier: 'Gold Sponsor',
    },
    {
      id: 5,
      name: 'Little Caesars',
      logo: LittleCaesars,
      desc: 'Founded in Detroit in 1959, Little Caesars is one of the largest pizza chains in the world and home to a growing technology organization.',
      url: 'https://www.littlecaesars.com/',
      tier: 'Gold Sponsor',
    },
    {
      id: 6,
      name: 'Major League Hacking',
      logo: `${MIDEVFEST_CDN}/4c63c92c0056d148ef86fd27a6d241a37e5a3979-300x126.webp`,
      desc: 'Major League Hacking is the official student hackathon league, supporting builders at hackathons and developer events worldwide.',
      url: 'https://mlh.io/',
      tier: 'Gold Sponsor',
    },
    {
      id: 7,
      name: 'Kaggle',
      logo: `${MIDEVFEST_CDN}/5e3ad129362e4b262170c7f9eb832e1693806ab1-300x136.webp`,
      desc: "Kaggle is Google's data science and machine learning community, with competitions, datasets, notebooks and courses.",
      url: 'https://www.kaggle.com/',
      tier: 'Gold Sponsor',
    },
  ],
  organizations: [
    {
      id: 8,
      name: 'GDG Detroit',
      logo: GDGDetroit,
      desc: 'Google Developer Group Detroit is a community of developers interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-detroit/',
      tier: 'Community Partner',
    },
    {
      id: 9,
      name: 'GDG Ann Arbor',
      logo: GDGAnnArbor,
      desc: 'Google Developer Group Ann Arbor is a community of developers interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-ann-arbor/',
      tier: 'Community Partner',
    },
    {
      id: 10,
      name: 'NSBE',
      logo: NSBE,
      desc: 'The National Society of Black Engineers supports Black engineers and their communities.',
      url: 'https://www.nsbe.org/',
      tier: 'Community Partner',
    },
    {
      id: 11,
      name: 'SHPE',
      logo: SHPE,
      desc: 'The Society of Hispanic Professional Engineers empowers the Hispanic community to realize its fullest potential in STEM.',
      url: 'https://shpe.org/',
      tier: 'Community Partner',
    },
    {
      id: 12,
      name: 'Techqueria',
      // White mark; needs a dark backing
      darkLogo: true,
      logo: `${MIDEVFEST_CDN}/2b46a87d03ae72ff40ce01ce4298cdb32d7dd1b1-300x300.webp`,
      desc: 'Techqueria is a nonprofit community of Latinx professionals in tech.',
      url: 'https://techqueria.org/',
      tier: 'Community Partner',
    },
    {
      id: 13,
      name: 'Detroit Hacker House',
      logo: DetroitHackerHouse,
      desc: 'Our goal is to incubate technology companies through a residential, cohort-based accelerator program in Detroit, MI.',
      url: 'https://detroithackerhouse.com/',
      tier: 'Community Partner',
    },
    {
      id: 14,
      name: 'DevOps Detroit',
      logo: DevOpsDetroit,
      desc: 'DevOps Detroit is a meetup community for DevOps, cloud and platform engineering practitioners in Metro Detroit.',
      url: 'https://www.devopsdetroit.io/',
      tier: 'Community Partner',
    },
    {
      id: 15,
      name: 'Dev of Detroit',
      // White mark; needs a dark backing
      darkLogo: true,
      logo: `${MIDEVFEST_CDN}/a690148c3c3a477ccc6034218415633c84c02164-300x388.webp`,
      desc: 'Developers of Detroit is a local community connecting software developers across the city.',
      url: 'https://www.instagram.com/developersofdetroit/',
      tier: 'Community Partner',
    },
    {
      id: 16,
      name: 'AI Collective Detroit',
      logo: `${MIDEVFEST_CDN}/ad81ef6b8dcde076aac0d1bb88e1b8865099cf26-884x511.png`,
      desc: 'The Detroit chapter of The AI Collective, a community of builders, researchers and founders working with AI.',
      url: 'https://www.aicollective.com/chapters/detroit',
      tier: 'Community Partner',
    },
    {
      id: 17,
      name: 'GDG Toledo',
      logo: GDGToledo,
      desc: 'Google Developer Group Toledo is a community of developers interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-toledo-1/',
      tier: 'Community Partner',
    },
    {
      id: 18,
      name: 'GDG Windsor',
      logo: GDGWindsor,
      desc: 'Google Developer Group Windsor is a community of developers interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-windsor/',
      tier: 'Community Partner',
    },
    {
      id: 19,
      name: 'GDG on Campus UM-Dearborn',
      logo: GDGUofMDearborn,
      desc: 'Google Developer Group at University of Michigan-Dearborn is a student chapter interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-on-campus-university-of-michigan-dearborn-dearborn-united-states/',
      tier: 'Community Partner',
    },
    {
      id: 20,
      name: 'GDG on Campus EMU',
      logo: `${MIDEVFEST_CDN}/c5a1c43602f3e2a92e702d95c5f67e8b834a609e-400x400.png`,
      desc: 'Google Developer Group at Eastern Michigan University is a student chapter interested in Google technologies.',
      url: 'https://gdg.community.dev/gdg-on-campus-eastern-michigan-university/',
      tier: 'Community Partner',
    },
  ],
  fuel: [
    {
      id: 21,
      name: 'Luminesso Coffee',
      logo: `${MIDEVFEST_CDN}/afc186ce94985415d037115cbaae3942ffdab6b0-300x250.png`,
      desc: 'Luminesso Coffee keeps DevFest builders caffeinated.',
      url: 'https://www.luminessocoffee.com/',
      tier: 'Fuel Partner',
    },
  ],
}
