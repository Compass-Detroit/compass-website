import { SpeakersData as Speakers2023 } from '../data/2023/speakers.js';
import { SpeakersData as Speakers2024 } from '../data/2024/speakers.js';
import { SpeakersData as Speakers2025 } from '../data/2025/speakers.js';
import { SpeakersData as Speakers2026 } from '../data/2026/speakers.js';

export function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const rawData = [
  { year: 2023, data: Speakers2023 },
  { year: 2024, data: Speakers2024 },
  { year: 2025, data: Speakers2025 },
  { year: 2026, data: Speakers2026 },
];

function buildRegistry() {
  const registry = new Map();

  rawData.forEach(({ year, data }) => {
    data.forEach((speaker) => {
      const slug = generateSlug(speaker.name);
      
      if (!registry.has(slug)) {
        registry.set(slug, {
          slug,
          name: speaker.name,
          avatar: speaker.avatar || null,
          bio: speaker.bio || null,
          organization: speaker.organization || null,
          position: speaker.position || null,
          twitter: speaker.twitter || null,
          linkedIn: speaker.linkedIn || null,
          github: speaker.github || null,
          url: speaker.url || null,
          mastodon: speaker.mastodon || null,
          isGDE: speaker.isGDE || false,
          isWTM: speaker.isWTM || false,
          categories: new Set(),
          yearsActive: new Set(),
          sessions: [],
          slidesUrl: null,
          videoUrl: null,
          resources: [],
          talkPhotos: [],
          featured: false,
        });
      }

      const profile = registry.get(slug);

      // Update latest info
      // We process years in chronological order, so later years overwrite earlier ones if present
      if (speaker.avatar) profile.avatar = speaker.avatar;
      if (speaker.bio) profile.bio = speaker.bio;
      if (speaker.organization) profile.organization = speaker.organization;
      if (speaker.position) profile.position = speaker.position;
      if (speaker.twitter) profile.twitter = speaker.twitter;
      if (speaker.linkedIn) profile.linkedIn = speaker.linkedIn;
      if (speaker.github) profile.github = speaker.github;
      if (speaker.url) profile.url = speaker.url;
      if (speaker.mastodon) profile.mastodon = speaker.mastodon;
      if (speaker.isGDE) profile.isGDE = speaker.isGDE;
      if (speaker.isWTM) profile.isWTM = speaker.isWTM;

      profile.yearsActive.add(year);

      // Some speakers might have an array of sessions or a single session object
      const sessions = Array.isArray(speaker.session) ? speaker.session : (speaker.session ? [speaker.session] : []);
      
      sessions.forEach(sess => {
        if (sess) {
          const sessionObj = {
            year,
            title: sess.title,
            track: sess.track,
            tags: sess.tags || [],
            abstract: sess.abstract,
            description: sess.description,
            time: sess.time,
            room: sess.room,
          };
          profile.sessions.push(sessionObj);
          
          if (Array.isArray(sess.tags)) {
            sess.tags.forEach(tag => {
              if (tag) profile.categories.add(tag.trim());
            });
          }
        }
      });
    });
  });

  // Convert Sets to Arrays and sort
  const finalRegistry = Array.from(registry.values()).map(profile => ({
    ...profile,
    categories: Array.from(profile.categories).sort(),
    yearsActive: Array.from(profile.yearsActive).sort((a, b) => a - b),
    sessions: profile.sessions.sort((a, b) => b.year - a.year)
  }));

  // Sort by name
  return finalRegistry.sort((a, b) => a.name.localeCompare(b.name));
}

const allSpeakers = buildRegistry();

export function getAllSpeakers() {
  return allSpeakers;
}

export function getSpeakerBySlug(slug) {
  return allSpeakers.find(s => s.slug === slug) || null;
}

export function getSpeakersByCategory(category) {
  return allSpeakers.filter(s => s.categories.some(c => c.toLowerCase() === category.toLowerCase()));
}

export function getSpeakersByYear(year) {
  return allSpeakers.filter(s => s.yearsActive.includes(Number(year)));
}

export function getSpeakersByTrack(track) {
  return allSpeakers.filter(s => s.sessions.some(sess => sess.track === track));
}

export function getAllCategories() {
  const cats = new Set();
  allSpeakers.forEach(s => s.categories.forEach(c => cats.add(c)));
  return Array.from(cats).sort((a, b) => a.localeCompare(b));
}

export function getAllTracks() {
  const tracks = new Set();
  allSpeakers.forEach(s => s.sessions.forEach(sess => {
    if (sess.track) tracks.add(sess.track);
  }));
  return Array.from(tracks).sort((a, b) => a.localeCompare(b));
}

export function getTotalSpeakerCount() {
  return allSpeakers.length;
}

export function getYearRange() {
  if (allSpeakers.length === 0) return { earliest: null, latest: null };
  const allYears = new Set();
  allSpeakers.forEach(s => s.yearsActive.forEach(y => allYears.add(y)));
  const yearsArr = Array.from(allYears);
  if (yearsArr.length === 0) return { earliest: null, latest: null };
  return {
    earliest: Math.min(...yearsArr),
    latest: Math.max(...yearsArr),
  };
}
