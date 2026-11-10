import PropTypes from 'prop-types'
import { sanityImage } from '@/services/sanity'

/** Up to four speaker avatars, overlapped. */
export default function Faces({ people }) {
  return (
    <span className="flex shrink-0 -space-x-2">
      {people.slice(0, 4).map((p) =>
        p.avatar ? (
          <img
            key={p.slug}
            src={sanityImage(p.avatar, { w: 72, h: 72 })}
            alt=""
            loading="lazy"
            className="size-7 rounded-full border-2 border-[var(--surface-card)] object-cover"
          />
        ) : (
          <span
            key={p.slug}
            className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--surface-card)] bg-surface-elevated text-[10px] font-bold"
          >
            {p.name[0]}
          </span>
        )
      )}
    </span>
  )
}

Faces.propTypes = { people: PropTypes.array.isRequired }
