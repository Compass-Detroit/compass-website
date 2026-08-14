import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const MiniCarousel = ({
  photos = [],
  aspectRatio = '16/9',
  autoPlay = true,
  interval = 4000,
  className = '',
  showDots = true,
  showArrows = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const nextSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1
    )
  }, [photos.length])

  const prevSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1
    )
  }, [photos.length])

  useEffect(() => {
    if (!autoPlay || isHovered || isReducedMotion || photos.length <= 1) return

    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isHovered, interval, nextSlide, isReducedMotion, photos.length])

  if (!photos || photos.length === 0) return null

  return (
    <div
      className={`group relative overflow-hidden outline-none ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo carousel"
    >
      {photos.map((photo, index) => {
        const isActive = isReducedMotion ? index === 0 : index === activeIndex
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="size-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            {photo.caption && (
              <div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-gray-900/80 to-transparent">
                <p className="text-white text-sm font-inter">{photo.caption}</p>
              </div>
            )}
          </div>
        )
      })}

      {!isReducedMotion && photos.length > 1 && showArrows && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 size-8 flex items-center justify-center rounded-full bg-gray-900/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-900/80 outline-none focus-visible:ring-2 focus-visible:ring-[#efb403]"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 size-8 flex items-center justify-center rounded-full bg-gray-900/50 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-900/80 outline-none focus-visible:ring-2 focus-visible:ring-[#efb403]"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </>
      )}

      {!isReducedMotion && photos.length > 1 && showDots && (
        <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-2 px-4">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex(index)
              }}
              className={`size-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-white ${
                index === activeIndex
                  ? 'bg-[#efb403] w-4'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
      )}
    </div>
  )
}

MiniCarousel.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
  aspectRatio: PropTypes.oneOf(['3/1', '4/3', '16/9', '2/1']),
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  className: PropTypes.string,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
}

export default MiniCarousel
