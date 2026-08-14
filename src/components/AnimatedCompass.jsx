import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

export default function AnimatedCompass({ sceneIndex = 0 }) {
  const [mounted, setMounted] = useState(false)
  const [twitching, setTwitching] = useState(false)
  const initialMount = useRef(true)
  const svgRef = useRef(null)
  const innerNeedleRef = useRef(null)

  useEffect(() => {
    // Slight delay to ensure smooth start of mount animation
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
      return
    }
    setTwitching(true)
    const timer = setTimeout(() => setTwitching(false), 500)
    return () => clearTimeout(timer)
  }, [sceneIndex])

  const handleMouseMove = (e) => {
    if (!svgRef.current || !innerNeedleRef.current) return
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (isReducedMotion) return

    const rect = svgRef.current.getBoundingClientRect()
    // Center of the compass rose is at 90,90 in a 360x180 viewBox (25% width, 50% height)
    const cx = rect.left + rect.width * 0.25
    const cy = rect.top + rect.height * 0.5
    const mouseX = e.clientX
    const mouseY = e.clientY

    let angle = Math.atan2(mouseY - cy, mouseX - cx) * (180 / Math.PI)
    let diff = angle - -90

    // Normalize difference
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360

    // Limit rotation to a subtle range and apply dampening
    const maxTwist = 18
    const targetAngle = Math.max(-maxTwist, Math.min(maxTwist, diff * 0.15))
    innerNeedleRef.current.style.transform = `rotate(${targetAngle}deg)`
  }

  const handleMouseLeave = () => {
    if (!innerNeedleRef.current) return
    innerNeedleRef.current.style.transform = `rotate(0deg)`
  }

  return (
    <div className="animated-compass-wrap flex flex-col items-center gap-3 w-[180px] md:w-[220px]">
      <svg
        ref={svgRef}
        viewBox="0 0 360 180"
        className="w-full h-auto cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <style>{`
          .compass-needle-wrapper {
            transform-origin: 90px 90px;
          }
          
          @media (prefers-reduced-motion: no-preference) {
            .compass-animate .compass-needle-wrapper {
              animation: compass-spin 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            .compass-twitch .compass-needle-wrapper {
              animation: compass-twitch 0.5s ease-in-out;
              transform: rotate(1080deg);
            }
            .pulse-circle {
              animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
              transform-origin: 315px 145px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .compass-animate .compass-needle-wrapper {
              transform: rotate(0deg);
            }
            .pulse-circle {
              display: none;
            }
          }
          
          @keyframes compass-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(1080deg); }
          }
          
          @keyframes compass-twitch {
            0% { transform: rotate(1080deg); }
            25% { transform: rotate(1072deg); }
            50% { transform: rotate(1086deg); }
            75% { transform: rotate(1077deg); }
            100% { transform: rotate(1080deg); }
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(0.3); opacity: 1; stroke-width: 2px; }
            100% { transform: scale(3.5); opacity: 0; stroke-width: 0.5px; }
          }
        `}</style>

        <defs>
          <filter id="needle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className={mounted ? 'compass-animate' : ''}>
          {/* Connector Line to Detroit */}
          <line
            x1="90"
            y1="90"
            x2="315"
            y2="145"
            stroke="#00c605"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.3"
          />

          {/* Michigan Lower Peninsula Outline */}
          <path
            d="M 240 170 L 305 170 L 315 155 L 318 140 L 325 125 L 328 105 L 320 85 L 305 105 L 315 80 L 310 50 L 295 25 L 280 20 L 265 30 L 255 50 L 245 40 L 240 60 L 235 85 L 235 120 L 230 150 Z"
            fill="rgba(0, 198, 5, 0.05)"
            stroke="#00c605"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Detroit Pulse Dot & Rings */}
          <circle cx="315" cy="145" r="3.5" fill="#00c605" />
          <circle
            className="pulse-circle"
            cx="315"
            cy="145"
            r="8"
            fill="none"
            stroke="#00c605"
          />
          <circle
            className="pulse-circle"
            style={{ animationDelay: '1.25s' }}
            cx="315"
            cy="145"
            r="8"
            fill="none"
            stroke="#00c605"
          />

          {/* Compass Rose Rings */}
          <circle
            cx="90"
            cy="90"
            r="65"
            stroke="rgba(239, 180, 3, 0.15)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="90"
            cy="90"
            r="55"
            stroke="rgba(239, 180, 3, 0.05)"
            strokeWidth="1"
            fill="none"
          />

          {/* Cardinal Directions */}
          <text
            x="90"
            y="22"
            fill="#efb403"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
          >
            N
          </text>
          <text
            x="90"
            y="158"
            fill="#efb403"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
          >
            S
          </text>
          <text
            x="158"
            y="90"
            fill="#efb403"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
          >
            E
          </text>
          <text
            x="22"
            y="90"
            fill="#efb403"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity="0.9"
          >
            W
          </text>

          {/* Ordinal Tick Marks */}
          {[45, 135, 225, 315].map((angle) => (
            <line
              key={angle}
              x1="90"
              y1="30"
              x2="90"
              y2="40"
              stroke="#efb403"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
              transform={`rotate(${angle} 90 90)`}
            />
          ))}

          {/* Needle Group */}
          <g
            className={`compass-needle-wrapper ${
              twitching ? 'compass-twitch' : ''
            }`}
          >
            <g
              ref={innerNeedleRef}
              style={{
                transformOrigin: '90px 90px',
                transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {/* South half */}
              <polygon
                points="90,90 96,90 90,145 84,90"
                fill="rgba(255, 255, 255, 0.15)"
              />
              {/* North half */}
              <polygon
                points="90,90 96,90 90,30 84,90"
                fill="#efb403"
                filter="url(#needle-glow)"
              />
              {/* Center dot pivot */}
              <circle
                cx="90"
                cy="90"
                r="4.5"
                fill="#111"
                stroke="#efb403"
                strokeWidth="1.5"
              />
            </g>
          </g>
        </g>
      </svg>

      {/* Detroit Coordinates Text */}
      <span
        className={`text-[10px] md:text-xs font-medium tracking-widest text-[#00c605] transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{ transitionDelay: '2.5s' }}
      >
        42.3°N 83.0°W
      </span>
    </div>
  )
}

AnimatedCompass.propTypes = {
  sceneIndex: PropTypes.number,
}
