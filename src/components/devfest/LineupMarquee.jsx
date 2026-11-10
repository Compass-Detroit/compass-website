import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPause, FaPlay } from 'react-icons/fa6'
import PropTypes from 'prop-types'
import {
  DEVFEST_DAY_BY_ID,
  DEVFEST_SPEAKERS,
  formatTime,
} from '@/data/2026/devfestProgram'
import { DEVFEST_2026 } from '@/data/2026/devfest'
import { sanityImage } from '@/services/sanity'
import { TONE_HEX } from './programUtils'
import styles from './LineupMarquee.module.css'

const LINEUP = DEVFEST_SPEAKERS.filter((p) => p.avatar)

function Card({ speaker, hidden }) {
  const talk = speaker.sessions[0]
  return (
    <li className={styles.item} aria-hidden={hidden || undefined}>
      <Link
        to={`${DEVFEST_2026.programPath}?session=${talk.id}`}
        tabIndex={hidden ? -1 : undefined}
        className={styles.card}
        style={{ '--ring': TONE_HEX[talk.tone] }}
      >
        <img
          src={sanityImage(speaker.avatar, { w: 112, h: 112 })}
          alt=""
          width="52"
          height="52"
          loading="lazy"
          className={styles.photo}
        />
        <span className={styles.text}>
          <span className={styles.name}>{speaker.name}</span>
          <span className={styles.talk}>{talk.title}</span>
          <span className={styles.when}>
            {DEVFEST_DAY_BY_ID[talk.day].short} {formatTime(talk.time)} ·{' '}
            {talk.track}
          </span>
        </span>
      </Link>
    </li>
  )
}

Card.propTypes = {
  speaker: PropTypes.object.isRequired,
  hidden: PropTypes.bool,
}

/**
 * Every speaker with their talk, gliding past. Pauses on hover or focus, and
 * the button stops it for touch and keyboard users (WCAG 2.2.2).
 */
export default function LineupMarquee({ label = 'On stage this weekend' }) {
  const [paused, setPaused] = useState(false)
  return (
    <section className={styles.strip} aria-label={label}>
      <p className={styles.label}>
        <span>{label}</span>
        <span className={styles.controls}>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className={styles.pause}
          >
            {paused ? (
              <FaPlay aria-hidden="true" />
            ) : (
              <FaPause aria-hidden="true" />
            )}
            <span className="sr-only">
              {paused ? 'Play speaker lineup' : 'Pause speaker lineup'}
            </span>
          </button>
          <Link to={DEVFEST_2026.programPath} className={styles.all}>
            Full lineup →
          </Link>
        </span>
      </p>
      <div className={styles.viewport}>
        <ul className={styles.track} data-paused={paused || undefined}>
          {LINEUP.map((p) => (
            <Card key={p.slug} speaker={p} />
          ))}
          {LINEUP.map((p) => (
            <Card key={`${p.slug}-loop`} speaker={p} hidden />
          ))}
        </ul>
      </div>
    </section>
  )
}

LineupMarquee.propTypes = { label: PropTypes.string }
