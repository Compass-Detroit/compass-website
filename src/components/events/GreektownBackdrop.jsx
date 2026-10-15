import PropTypes from 'prop-types'

// Downtown Detroit at dusk with the Hollywood Casino at Greektown tower, the
// DevFest '26 venue. Tower windows light up as the event gets closer, and the
// venue sign switches on for the final week.
const COLS = 8
const ROWS = 20
const WINDOWS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: 496 + (i % COLS) * 18,
  y: 138 + Math.floor(i / COLS) * 22,
}))

// Fixed pseudo-random order so lights come on scattered, not row by row
const LIGHT_ORDER = (() => {
  const order = WINDOWS.map((_, i) => i)
  let seed = 1226
  for (let i = order.length - 1; i > 0; i--) {
    seed = (seed * 16807) % 2147483647
    const j = seed % (i + 1)
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
})()

export default function GreektownBackdrop({
  lit = 1,
  signOn = true,
  className,
}) {
  const litSet = new Set(LIGHT_ORDER.slice(0, Math.round(lit * WINDOWS.length)))

  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gt-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a4d" stopOpacity="0" />
          <stop offset="0.75" stopColor="#ff9a4d" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d9708a" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="gt-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26306a" />
          <stop offset="1" stopColor="#121a42" />
        </linearGradient>
        <linearGradient id="gt-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c2558" />
          <stop offset="0.55" stopColor="#2d3a7c" />
          <stop offset="1" stopColor="#151c47" />
        </linearGradient>
        <linearGradient id="gt-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb35c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7fb2ff" stopOpacity="0.2" />
        </linearGradient>
        <pattern
          id="gt-win"
          width="10"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect x="3" y="3" width="3" height="5" fill="#ffd38a" opacity="0.5" />
        </pattern>
        <pattern
          id="gt-win-blue"
          width="10"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="3"
            y="3"
            width="3"
            height="5"
            fill="#a9c8ff"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <rect width="1200" height="600" fill="url(#gt-haze)" />

      <g fill="url(#gt-far)">
        <rect x="0" y="420" width="70" height="180" />
        <rect x="60" y="360" width="50" height="240" />
        <rect x="120" y="400" width="80" height="200" />
        <rect x="210" y="300" width="56" height="300" />
        <polygon points="210,300 238,250 266,300" />
        <rect x="280" y="380" width="70" height="220" />
        <rect x="780" y="390" width="70" height="210" />
        <rect x="860" y="320" width="60" height="280" />
        <rect x="930" y="370" width="90" height="230" />
        <rect x="1030" y="300" width="50" height="300" />
        <polygon points="1030,300 1055,262 1080,300" />
        <rect x="1090" y="410" width="110" height="190" />
      </g>
      <g fill="url(#gt-win-blue)">
        <rect x="66" y="370" width="38" height="230" />
        <rect x="216" y="310" width="44" height="290" />
        <rect x="866" y="330" width="48" height="270" />
        <rect x="1036" y="310" width="38" height="290" />
      </g>

      {/* Hollywood Casino at Greektown: hotel tower with curved glass crown */}
      <rect x="470" y="40" width="190" height="560" fill="url(#gt-tower)" />
      <path d="M470 40 Q565 -8 660 40 Z" fill="#2d3a7c" />
      <g>
        {WINDOWS.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width="8"
            height="11"
            rx="1"
            fill={litSet.has(i) ? '#ffd38a' : '#1a2352'}
            opacity={litSet.has(i) ? 0.9 : 1}
          />
        ))}
      </g>
      <rect x="548" y="40" width="34" height="560" fill="url(#gt-glass)" />

      <g opacity={signOn ? 1 : 0.35}>
        <rect
          x="478"
          y="56"
          width="174"
          height="44"
          rx="6"
          fill="#0b1633"
          stroke={signOn ? '#ffc27a' : '#4a4f74'}
          strokeWidth="2"
        />
        <text
          x="565"
          y="85"
          textAnchor="middle"
          fontFamily="Montserrat, Arial, sans-serif"
          fontSize="17"
          fontWeight="900"
          letterSpacing="2"
          fill={signOn ? '#ffd66b' : '#6b6f8f'}
          style={
            signOn
              ? { filter: 'drop-shadow(0 0 6px rgba(255, 200, 110, 0.9))' }
              : undefined
          }
        >
          HOLLYWOOD
        </text>
        <text
          x="565"
          y="120"
          textAnchor="middle"
          fontFamily="Montserrat, Arial, sans-serif"
          fontSize="12"
          fontWeight="800"
          letterSpacing="4"
          fill={signOn ? '#ffc27a' : '#6b6f8f'}
          opacity="0.85"
        >
          GREEKTOWN
        </text>
      </g>

      <rect x="400" y="500" width="330" height="100" fill="#141b44" />
      <rect
        x="400"
        y="500"
        width="330"
        height="6"
        fill="#ff9a4d"
        opacity="0.8"
      />
      <rect
        x="420"
        y="520"
        width="290"
        height="60"
        fill="url(#gt-win)"
        opacity="0.7"
      />

      <g fill="url(#gt-far)">
        <rect x="360" y="330" width="70" height="270" />
        <rect x="690" y="280" width="70" height="320" />
        <rect x="740" y="420" width="60" height="180" />
      </g>
      <g fill="url(#gt-win)" opacity="0.7">
        <rect x="366" y="340" width="58" height="260" />
        <rect x="696" y="290" width="58" height="310" />
      </g>
    </svg>
  )
}

GreektownBackdrop.propTypes = {
  lit: PropTypes.number,
  signOn: PropTypes.bool,
  className: PropTypes.string,
}
