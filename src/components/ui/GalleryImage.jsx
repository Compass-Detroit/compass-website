import PropTypes from 'prop-types'

const GALLERY = '/assets/gallery/'
// Folders already published at web sizes (see scripts/make-gallery-web.py)
const SKIP = ['lhm26/']

/**
 * Web-sized copies of a gallery original, built by
 * scripts/make-gallery-web.py. Returns null for images outside the gallery.
 */
function galleryWebSources(src) {
  if (!src?.startsWith(GALLERY)) return null
  const rel = src.slice(GALLERY.length)
  if (SKIP.some((dir) => rel.startsWith(dir))) return null
  const base = `${GALLERY}_web/${rel.replace(/\.[^./]+$/, '')}`
  return {
    small: `${base}-640.webp`,
    large: `${base}-1600.webp`,
  }
}

/**
 * <img> for gallery photos: serves the 640/1600px WebP copies through
 * srcset instead of multi-megabyte camera originals, and falls back to the
 * original if a copy has not been generated yet.
 */
export default function GalleryImage({ src, alt, sizes = '100vw', ...rest }) {
  const web = galleryWebSources(src)
  if (!web) return <img src={src} alt={alt} sizes={sizes} {...rest} />

  const fallBack = (e) => {
    const img = e.currentTarget
    if (img.dataset.fallback) return
    img.dataset.fallback = 'true'
    img.removeAttribute('srcset')
    img.src = src
  }

  return (
    <img
      src={web.large}
      alt={alt}
      srcSet={`${web.small} 640w, ${web.large} 1600w`}
      sizes={sizes}
      onError={fallBack}
      {...rest}
    />
  )
}

GalleryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
}
