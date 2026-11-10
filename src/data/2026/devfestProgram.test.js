import { describe, expect, it } from 'vitest'
import {
  DEVFEST_SESSIONS,
  DEVFEST_SPEAKERS,
  DEVFEST_TALKS,
  DEVFEST_TOPICS,
  DEVFEST_TRACKS,
  SpeakersData,
  formatTime,
} from './devfestProgram'
import { getSpeakerBySlug } from '../../utils/speakerRegistry'

describe('DevFest 2026 program', () => {
  it('puts hackathon sessions on Friday and track talks on Saturday', () => {
    for (const s of DEVFEST_SESSIONS)
      expect(s.day).toBe(s.track === 'Hackathon' ? 'hackathon' : 'conference')
  })

  it('resolves every talk speaker and every speaker to a talk', () => {
    for (const s of DEVFEST_TALKS) expect(s.speakers.length).toBeGreaterThan(0)
    for (const p of DEVFEST_SPEAKERS)
      expect(p.sessions.length).toBeGreaterThan(0)
  })

  it('only uses known tracks and keeps sessions in time order', () => {
    const names = new Set(DEVFEST_TRACKS.map((t) => t.name))
    for (const s of DEVFEST_SESSIONS) expect(names.has(s.track)).toBe(true)
    const times = DEVFEST_SESSIONS.map((s) => s.time)
    expect(times).toEqual([...times].sort())
  })

  it('computes end times from durations', () => {
    const stitch = DEVFEST_SESSIONS.find((s) => s.title.includes('Stitch'))
    expect(stitch.timeEnd).toBe('12:05')
  })

  it('groups talks into cross-track topics', () => {
    expect(DEVFEST_TOPICS.length).toBeGreaterThanOrEqual(5)
    const agents = DEVFEST_TOPICS.find((t) => t.id === 'agents')
    expect(new Set(agents.sessions.map((s) => s.track)).size).toBeGreaterThan(1)
  })

  it('feeds the speaker registry with 2026 DevFest sessions', () => {
    expect(SpeakersData).toHaveLength(DEVFEST_SPEAKERS.length)
    const profile = getSpeakerBySlug('pragya-keshap')
    expect(profile.sessions.some((s) => s.title.includes('Evaluator'))).toBe(
      true
    )
  })

  it('formats 24h times for display', () => {
    expect(formatTime('08:15')).toBe('8:15 AM')
    expect(formatTime('12:00')).toBe('12:00 PM')
    expect(formatTime('19:30')).toBe('7:30 PM')
  })
})
