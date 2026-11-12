import { useState } from 'react'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { TONE_HEX } from '../programUtils'

// Floor plan traced from the hotel's banquet & convention spec sheet, in its
// own coordinates. The salon wing is a slanted strip, so each salon is the
// slice of that strip between two x positions.
const stripTop = (x) => 352 + (x - 52) * 0.075
const stripBottom = (x) => 410 + (x - 52) * 0.0696
const slice = (x1, x2) =>
  [
    [x1, stripTop(x1)],
    [x2, stripTop(x2)],
    [x2, stripBottom(x2)],
    [x1, stripBottom(x1)],
  ]
    .map(([x, y]) => `${x},${y.toFixed(1)}`)
    .join(' ')

// What each room is for on the day. Track rooms take the track's colour so
// the map matches the schedule; `use` is split into lines that fit the room.
const SALONS = [
  {
    name: 'Salon F',
    x: [52, 152],
    size: '1,910 sq ft',
    dims: '46′3″ × 46′',
    use: ['AI Foundations'],
    tone: 'green',
  },
  {
    name: 'Salon E',
    x: [152, 220],
    size: '540 sq ft',
    dims: '18′6″ × 29′2″',
    use: ['Leadership'],
    tone: 'pink',
  },
  {
    name: 'Salon D',
    x: [220, 290],
    size: '541 sq ft',
    dims: '18′4″ × 29′6″',
    use: ['Career, Mentorship', '& Resumes'],
    tone: 'slate',
  },
  {
    name: 'Salon C',
    x: [290, 358],
    size: '533 sq ft',
    dims: '18′4″ × 29′6″',
    use: ['Speakers'],
    tone: 'slate',
  },
  {
    name: 'Salon B',
    x: [358, 428],
    size: '539 sq ft',
    dims: '18′1″ × 30′3″',
    use: ['Volunteers'],
    tone: 'slate',
  },
  {
    name: 'Salon A',
    x: [428, 497],
    size: '504 sq ft',
    dims: '17′7″ × 28′8″',
    use: ['Compass Team'],
    tone: 'slate',
  },
]

// The Grand Ballroom (3,752 sq ft, 40′8″ × 92′3″) splits into three track
// rooms; the opening keynote is announced there before the split.
const BALLROOMS = [
  {
    name: 'Ballroom C',
    letter: 'C',
    x: [220, 284],
    use: ['Innovation'],
    tone: 'red',
  },
  {
    name: 'Ballroom B',
    letter: 'B',
    x: [284, 364],
    use: ['Build with AI'],
    tone: 'blue',
  },
  {
    name: 'Ballroom A',
    letter: 'A',
    x: [364, 430],
    use: ['Level Up'],
    tone: 'cyan',
  },
]
const BOARDROOM = {
  name: 'Executive Boardroom',
  use: [],
  tone: 'slate',
}
const ROOMS = [...BALLROOMS, ...SALONS, BOARDROOM]

/** "Salon F · Level Up · 1,910 sq ft (46′3″ × 46′)" */
const details = (room) =>
  [
    room.name,
    room.use.join(' ') || null,
    room.size && `${room.size}${room.dims ? ` (${room.dims})` : ''}`,
  ]
    .filter(Boolean)
    .join(' · ')

const label = 'fill-[var(--text-primary)] font-extrabold'
const useLabel = 'fill-[var(--text-secondary)] font-semibold'

/** Conference-center floor plan with every DevFest room labelled. */
export default function VenueMap() {
  // Room under the pointer (or last tapped on touch screens)
  const [active, setActive] = useState(null)
  const roomProps = (room) => ({
    onPointerEnter: () => setActive(room),
    onPointerLeave: (e) => e.pointerType === 'mouse' && setActive(null),
    onClick: () => setActive(room),
    className: 'cursor-pointer',
  })
  const fillOpacity = (room) => (active === room ? 0.42 : 0.15)

  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="border-t border-surface"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-theme-muted">
          Venue
        </p>
        <h2
          id="venue-title"
          className="mt-2 text-3xl font-black tracking-tight md:text-4xl"
        >
          Find your room
        </h2>
        <p className="mt-2 max-w-xl text-theme-secondary">
          Everything happens in the {DEVFEST_2026.venue} conference center. Each
          track has its own room, colored to match the schedule.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <figure className="min-w-0 rounded-2xl border border-surface bg-surface-card p-4">
            <div className="overflow-x-auto">
              <svg
                viewBox="36 196 532 262"
                role="img"
                aria-labelledby="venue-map-title venue-map-desc"
                className="w-full min-w-[640px] text-theme-muted"
              >
                <title id="venue-map-title">
                  {DEVFEST_2026.venue} conference center floor plan
                </title>
                <desc id="venue-map-desc">
                  The Grand Ballroom sits above the hallway, split from left to
                  right into Ballroom C (Innovation), Ballroom B (Build with AI)
                  and Ballroom A (Level Up). Across the hallway, from left to
                  right: Salon F (AI Foundations), Salon E (Leadership), Salon D
                  (career, mentorship and resumes), Salon C (speakers), Salon B
                  (volunteers), Salon A (Compass team) and the Executive
                  Boardroom, with the elevators beside the boardroom. Restrooms
                  are to the left of the ballroom.
                </desc>

                {/* Grand Ballroom: three track rooms */}
                {BALLROOMS.map((b) => {
                  const cx = (b.x[0] + b.x[1]) / 2
                  return (
                    <g key={b.name} {...roomProps(b)}>
                      <rect
                        x={b.x[0]}
                        y="210"
                        width={b.x[1] - b.x[0]}
                        height="118"
                        fill={TONE_HEX[b.tone]}
                        fillOpacity={fillOpacity(b)}
                        stroke={TONE_HEX[b.tone]}
                        strokeWidth="1.5"
                      />
                      <text
                        x={cx}
                        y="254"
                        textAnchor="middle"
                        fontSize="28"
                        className={label}
                      >
                        {b.letter}
                      </text>
                      <text
                        x={cx}
                        y="276"
                        textAnchor="middle"
                        fontSize="8.5"
                        className={useLabel}
                      >
                        {b.use[0]}
                      </text>
                    </g>
                  )
                })}
                <text
                  x="325"
                  y="314"
                  textAnchor="middle"
                  fontSize="8"
                  letterSpacing="1.5"
                  className={`${label} pointer-events-none`}
                >
                  GRAND BALLROOM
                </text>

                {/* Restrooms */}
                <rect
                  x="150"
                  y="252"
                  width="8"
                  height="66"
                  fill="currentColor"
                  fillOpacity="0.35"
                />
                <text
                  x="0"
                  y="0"
                  fontSize="8"
                  letterSpacing="1"
                  textAnchor="middle"
                  transform="translate(172 285) rotate(-90)"
                  fill="currentColor"
                  className="font-bold"
                >
                  RESTROOMS
                </text>

                {/* Hallway */}
                <text
                  x="300"
                  y="346"
                  textAnchor="middle"
                  fontSize="8"
                  letterSpacing="2"
                  fill="currentColor"
                  className="font-semibold"
                >
                  HALLWAY
                </text>

                {/* Salons */}
                {SALONS.map((s) => {
                  const cx = (s.x[0] + s.x[1]) / 2
                  const cy = (stripTop(cx) + stripBottom(cx)) / 2
                  // Name plus use lines, centred as one block
                  const top = cy - (s.use.length * 8) / 2
                  return (
                    <g key={s.name} {...roomProps(s)}>
                      <polygon
                        points={slice(...s.x)}
                        fill={TONE_HEX[s.tone]}
                        fillOpacity={fillOpacity(s)}
                        stroke={TONE_HEX[s.tone]}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <text
                        x={cx}
                        y={top + 2}
                        textAnchor="middle"
                        fontSize="10.5"
                        className={label}
                      >
                        {s.name}
                      </text>
                      <text
                        x={cx}
                        y={top + 13}
                        textAnchor="middle"
                        fontSize={s.use.length > 1 ? 6.2 : 7.5}
                        className={useLabel}
                      >
                        {s.use.map((line, i) => (
                          <tspan key={line} x={cx} dy={i ? 8 : 0}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  )
                })}

                {/* Elevators */}
                <g>
                  <rect
                    x="487"
                    y="298"
                    width="38"
                    height="84"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                  />
                  <rect
                    x="505"
                    y="310"
                    width="12"
                    height="16"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                  <rect
                    x="505"
                    y="332"
                    width="12"
                    height="16"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                  <text
                    x="0"
                    y="0"
                    fontSize="7.5"
                    letterSpacing="1"
                    textAnchor="middle"
                    transform="translate(498 340) rotate(-90)"
                    fill="currentColor"
                    className="font-bold"
                  >
                    ELEVATORS
                  </text>
                </g>

                {/* Executive Boardroom */}
                <g {...roomProps(BOARDROOM)}>
                  <polygon
                    points="497,386 530,386 530,292 557,292 557,446 497,442"
                    fill={TONE_HEX[BOARDROOM.tone]}
                    fillOpacity={fillOpacity(BOARDROOM)}
                    stroke={TONE_HEX[BOARDROOM.tone]}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x="527"
                    y="402"
                    textAnchor="middle"
                    fontSize="9"
                    className={label}
                  >
                    <tspan x="527">Executive</tspan>
                    <tspan x="527" dy="11">
                      Boardroom
                    </tspan>
                  </text>
                </g>
              </svg>
            </div>
            <figcaption
              aria-live="polite"
              className="mt-3 min-h-5 text-sm text-theme-muted"
            >
              {active ? (
                <span className="font-semibold text-theme-primary">
                  {details(active)}
                </span>
              ) : (
                'Not to scale. Hover or tap a room for details.'
              )}
            </figcaption>
          </figure>

          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-extrabold">Check-in</dt>
              <dd className="mt-1 text-theme-secondary">
                {DEVFEST_2026.checkIn}
              </dd>
            </div>
            {DEVFEST_2026.parking.map((p) => (
              <div key={p.name}>
                <dt className="font-extrabold">Parking: {p.name}</dt>
                <dd className="mt-1 text-theme-secondary">{p.detail}</dd>
              </div>
            ))}
            <div>
              <dt className="font-extrabold">Rooms</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-theme-secondary">
                  {ROOMS.map((room) => (
                    <li key={room.name} className="flex items-baseline gap-2">
                      <span
                        aria-hidden="true"
                        className="size-2.5 shrink-0 translate-y-px rounded-full"
                        style={{ background: TONE_HEX[room.tone] }}
                      />
                      <span>
                        <span className="font-semibold text-theme-primary">
                          {room.name}
                        </span>
                        {room.use.length > 0 && ` · ${room.use.join(' ')}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
