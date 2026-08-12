import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

export default function AnimatedCompass({ sceneIndex = 0 }) {
  const [mounted, setMounted] = useState(false)
  const [twitching, setTwitching] = useState(false)
  const initialMount = useRef(true)

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
    const timer = setTimeout(() => setTwitching(false), 300) // length of twitch animation
    return () => clearTimeout(timer)
  }, [sceneIndex])

  return (
    <div className="animated-compass-wrap flex flex-col items-center gap-3 w-[120px] md:w-[160px]">
      <svg viewBox="0 0 200 200" className="w-full h-auto">
        <style>{`
          .compass-needle {
            transform-origin: 140px 160px;
          }
          .compass-animate .compass-needle {
            animation: compass-spin 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .compass-twitch .compass-needle {
            animation: compass-twitch 0.3s ease-in-out;
            transform: rotate(1080deg); /* keep it at final position */
          }
          
          @keyframes compass-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(1080deg); }
          }
          
          @keyframes compass-twitch {
            0% { transform: rotate(1080deg); }
            25% { transform: rotate(1077deg); }
            75% { transform: rotate(1083deg); }
            100% { transform: rotate(1080deg); }
          }
        `}</style>

        <defs>
          <filter id="needle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className={mounted ? 'compass-animate' : ''}>
          {/* Michigan Lower Peninsula Outline */}
          <path
            d="M 140 160 L 60 160 L 50 110 L 45 70 L 55 45 L 100 30 L 120 50 L 145 85 L 150 95 L 125 115 L 155 130 Z"
            fill="rgba(0, 198, 5, 0.05)"
            stroke="#00c605"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Detroit Hub Point / Pivot */}
          <circle cx="140" cy="160" r="4.5" fill="#00c605" />

          {/* Needle Group */}
          <g className={`compass-needle ${twitching ? 'compass-twitch' : ''}`}>
            {/* South half */}
            <polygon
              points="140,160 146,160 140,185 134,160"
              fill="rgba(255, 255, 255, 0.15)"
            />
            {/* North half */}
            <polygon
              points="140,160 146,160 140,70 134,160"
              fill="#efb403"
              filter="url(#needle-glow)"
            />

            {/* Center dot */}
            <circle cx="140" cy="160" r="2.5" fill="#222" />
          </g>
        </g>
      </svg>

      <span
        className={`text-xs md:text-sm font-medium tracking-widest text-[#00c605] transition-all duration-700 ease-out ${
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
