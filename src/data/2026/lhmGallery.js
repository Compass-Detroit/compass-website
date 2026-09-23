/**
 * Photo selection from the "Detroit LHM Innovation Summit 2026" shared album,
 * stored at 1600px (`src`) and 800px (`thumb`) in public/assets/gallery/lhm26.
 * Ordered by session so the lightbox walks through the day.
 */
const SESSIONS = {
  group: { label: 'Summit group photo' },
  andre: {
    label: 'Hispanic Leadership in Technology',
    by: 'Andre Arbelaez',
    short: 'Andre Arbelaez',
  },
  shpe: {
    label: 'SHPE Detroit Lunch Talk',
    by: 'Cindy Cruz Rodriguez, Raquel Estrada & Maridy Mazaira',
    short: 'SHPE Detroit',
  },
}

const photo = (n, session, alt) => {
  const base = `/assets/gallery/lhm26/lhm-${String(n).padStart(2, '0')}`
  return {
    id: `lhm26-${n}`,
    src: `${base}.jpg`,
    thumb: `${base}-sm.jpg`,
    alt,
    session: SESSIONS[session],
  }
}

export const LHM_PHOTOS = [
  photo(
    1,
    'group',
    'Attendees, speakers and organizers in front of the SHPE Detroit Hispanic Heritage Month slide'
  ),
  photo(
    3,
    'andre',
    'Andre Arbelaez presents the “Positioning” part of his talk'
  ),
  photo(
    8,
    'andre',
    'Andre’s “Positioning” slide: right place, right time, right things to be said, right people to be with'
  ),
  photo(7, 'andre', 'Andre Arbelaez speaks to a full room'),
  photo(
    2,
    'andre',
    'The room during Andre’s talk, with flags from across Latin America overhead'
  ),
  photo(4, 'andre', 'Attendees at round tables listen beneath the flags'),
  photo(5, 'andre', 'Attendees follow the talk from tables along the windows'),
  photo(
    6,
    'shpe',
    'Attendees settle in over lunch as the SHPE Detroit talk begins'
  ),
  photo(9, 'shpe', 'A SHPE Detroit presenter introduces the chapter'),
  photo(10, 'shpe', 'The “What you will find in SHPE Detroit” slide'),
  photo(
    11,
    'shpe',
    'SHPE Detroit presenters walk the room through the chapter'
  ),
  photo(12, 'shpe', 'SHPE Detroit presenters take questions from attendees'),
]

/** Catalog rows for the site-wide gallery page. */
export const LHM_CATALOG_PHOTOS = LHM_PHOTOS.map(
  ({ id, src, alt, session }, i) => ({
    id,
    src,
    title: `${session.short ?? 'LHM Innovation Summit 2026'} — ${alt}`,
    category: 'LHM Summit 2026',
    folder: 'lhm26',
    featured: i === 0,
  })
)
