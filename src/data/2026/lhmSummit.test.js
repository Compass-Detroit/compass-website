import { describe, expect, it } from 'vitest'
import { LHM_SESSIONS, SpeakersData } from './lhmSummit'
import { previousEvents } from '../previousEventsData'
import { getSpeakerBySlug } from '../../utils/speakerRegistry'

describe('LHM Summit 2026 data', () => {
  it('applies program updates to speakers and shared sessions', () => {
    expect(SpeakersData.some((s) => s.name === 'Julea Ferrara')).toBe(false)
    expect(getSpeakerBySlug('julea-ferrara')).toBeNull()
  })

  it('credits Cindy as panel moderator with Ricardo and Jordan on the panel', () => {
    const panel = LHM_SESSIONS.find((s) => s.title.includes('Panel'))
    expect(panel.moderators).toEqual(['Cindy Cruz Rodriguez'])
    expect(panel.panelists).toEqual(['Ricardo Tapia Vargas', 'Jordan Mazaira'])
    expect(getSpeakerBySlug('jordan-mazaira')).not.toBeNull()
  })

  it('opens the day with William Bowen leading yoga from 8:00', () => {
    const yoga = LHM_SESSIONS[0]
    expect(yoga.title).toBe('Morning Mindfulness & Meditative Yoga')
    expect(yoga.time).toBe('08:00')
    expect(yoga.sessionDuration).toBe(45)
    expect(yoga.speakers).toEqual(['William Bowen'])
    const william = SpeakersData.find((s) => s.name === 'William Bowen')
    expect(william.session).toHaveLength(2)
  })

  it('lists the SHPE Detroit talk at lunch with all three presenters', () => {
    const shpe = LHM_SESSIONS.find((s) => s.title === 'SHPE Detroit Lunch Talk')
    expect(shpe.time).toBe('12:15')
    expect(shpe.speakers).toHaveLength(3)
  })

  it('keeps Engineering Lotería with its two hosts at 2 PM', () => {
    const loteria = LHM_SESSIONS.find((s) => s.title === 'Engineering Lotería')
    expect(loteria.time).toBe('14:00')
    expect(loteria.speakers).toEqual(['Cindy Cruz Rodriguez', 'Raquel Estrada'])
    const cindy = SpeakersData.find((s) => s.name === 'Cindy Cruz Rodriguez')
    expect(cindy.session.map((s) => s.title)).toEqual([
      'SHPE Detroit Lunch Talk',
      'Detroit Latin Heritage Month Innovation Summit Panel Discussion',
      'Engineering Lotería',
    ])
  })

  it('lists each session once in time order', () => {
    const times = LHM_SESSIONS.map((s) => s.time)
    expect(new Set(LHM_SESSIONS.map((s) => s.title)).size).toBe(times.length)
    expect(times).toEqual([...times].sort())
  })

  it('tags registry sessions with the summit name', () => {
    const profile = getSpeakerBySlug('andre-arbelaez')
    expect(profile.sessions[0].event).toBe('LHM Innovation Summit')
  })
})

describe('previousEvents', () => {
  it('includes the LHM summit and excludes events that have not ended', () => {
    expect(previousEvents.some((e) => e.type === 'lhm')).toBe(true)
    const now = new Date()
    for (const { endDate } of previousEvents)
      if (endDate)
        expect(new Date(endDate).getTime()).toBeLessThan(now.getTime())
  })
})
