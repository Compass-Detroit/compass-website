import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'

// Lead photo is a 2x2 tile; the last one goes wide so the final row closes.
const cellClass = (i, count) =>
  i === 0
    ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto'
    : i === count - 1 && count % 2 === 0
      ? 'col-span-2 aspect-[8/3] md:aspect-auto'
      : 'aspect-[4/3]'

/**
 * Photo grid with a native <dialog> lightbox: Esc, focus trap and backdrop
 * come from the browser. Arrow keys step through photos while it is open.
 */
export default function PhotoGallery({ photos, label }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [index, setIndex] = useState(null)
  const isOpen = index !== null
  const current = isOpen ? photos[index] : null

  const step = (delta) =>
    setIndex((i) => (i + delta + photos.length) % photos.length)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && !dialog.open) {
      dialog.showModal()
      closeRef.current?.focus()
    }
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Preload neighbours so arrowing through feels instant
  useEffect(() => {
    if (!isOpen) return
    for (const delta of [1, -1])
      new Image().src =
        photos[(index + delta + photos.length) % photos.length].src
  }, [index, isOpen, photos])

  // Arrow keys, Esc and backdrop clicks. Attached directly because <dialog>
  // counts as non-interactive for JSX a11y rules.
  useEffect(() => {
    const dialog = dialogRef.current
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
      // Native Esc handling can be skipped by Chrome's close-watcher rules
      if (e.key === 'Escape') {
        e.preventDefault()
        setIndex(null)
      }
    }
    const onClick = (e) => e.target === dialog && setIndex(null)
    dialog.addEventListener('keydown', onKeyDown)
    dialog.addEventListener('click', onClick)
    return () => {
      dialog.removeEventListener('keydown', onKeyDown)
      dialog.removeEventListener('click', onClick)
    }
    // step only reads photos.length through a functional update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length])

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {photos.map((p, i) => (
          <li key={p.id} className={cellClass(i, photos.length)}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${photos.length}: ${
                p.session ? `${p.session.label}. ` : ''
              }${p.alt}`}
              className="group relative block size-full overflow-hidden rounded-xl bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <img
                src={i === 0 ? p.src : p.thumb}
                alt=""
                width={i === 0 ? 1600 : 800}
                height={i === 0 ? 1200 : 600}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
              />
              {p.session?.short && (
                <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {p.session.short}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={label}
        onClose={() => setIndex(null)}
        className="m-auto max-h-[92vh] w-[min(92vw,1200px)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="relative">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm">
              <div className="min-w-0">
                {current.session && (
                  <p className="font-semibold text-white">
                    {current.session.label}
                    {current.session.by && (
                      <span className="font-normal text-white/70">
                        {' '}
                        · {current.session.by}
                      </span>
                    )}
                  </p>
                )}
                <p className="mt-0.5 text-white/80">{current.alt}</p>
              </div>
              <span className="shrink-0 tabular-nums text-white/70">
                {index + 1} / {photos.length}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-[41vh] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 md:-left-14 md:top-1/2"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 top-[41vh] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 md:-right-14 md:top-1/2"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="absolute right-2 top-2 flex size-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
            >
              <FaXmark aria-hidden="true" />
            </button>
          </figure>
        )}
      </dialog>
    </>
  )
}

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      session: PropTypes.shape({
        label: PropTypes.string.isRequired,
        by: PropTypes.string,
        short: PropTypes.string,
      }),
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
}
