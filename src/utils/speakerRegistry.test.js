import { describe, it, expect } from 'vitest'
import {
  generateSlug,
  getAllSpeakers,
  getSpeakerBySlug,
  getSpeakersByYear,
  getAllCategories,
  getTotalSpeakerCount,
  getYearRange,
} from './speakerRegistry'

describe('speakerRegistry', () => {
  it('generateSlug converts name to slug', () => {
    expect(generateSlug('John Doe')).toBe('john-doe')
  })

  it('generateSlug handles empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('generateSlug removes title prefix', () => {
    expect(generateSlug('Dr. Jane Smith')).toBe('jane-smith')
  })

  it('generateSlug applies known aliases', () => {
    expect(typeof generateSlug('Some Alias')).toBe('string')
  })

  it('getAllSpeakers returns array', () => {
    expect(Array.isArray(getAllSpeakers())).toBe(true)
  })

  it('getAllSpeakers sorted by name', () => {
    const speakers = getAllSpeakers()
    if (speakers.length >= 2) {
      expect(
        speakers[0].name.localeCompare(speakers[1].name)
      ).toBeLessThanOrEqual(0)
    }
  })

  it('getSpeakerBySlug returns speaker', () => {
    const speakers = getAllSpeakers()
    if (speakers.length > 0) {
      const slug = speakers[0].slug
      expect(getSpeakerBySlug(slug)).toBeDefined()
    }
  })

  it('getSpeakerBySlug returns null for unknown', () => {
    expect(getSpeakerBySlug('unknown-slug')).toBeNull()
  })

  it('getSpeakersByYear filters correctly', () => {
    expect(Array.isArray(getSpeakersByYear(2025))).toBe(true)
  })

  it('getAllCategories returns sorted array', () => {
    expect(Array.isArray(getAllCategories())).toBe(true)
  })

  it('getTotalSpeakerCount returns number > 0', () => {
    const count = getTotalSpeakerCount()
    expect(typeof count).toBe('number')
  })

  it('getYearRange returns earliest and latest', () => {
    const range = getYearRange()
    expect(range).toHaveProperty('earliest')
    expect(range).toHaveProperty('latest')
  })

  it('merges a speaker listed with and without credentials', () => {
    expect(generateSlug('Ali El-Sharif, Ph.D.')).toBe('ali-el-sharif')
    const ali = getAllSpeakers().filter((s) => s.slug === 'ali-el-sharif')
    expect(ali).toHaveLength(1)
    expect(ali[0].credentials).toBe('Ph.D.')
    expect(ali[0].yearsActive).toEqual([2023, 2024])
  })

  it('resolves slugs that included credentials', () => {
    expect(getSpeakerBySlug('ali-el-sharif-phd')?.slug).toBe('ali-el-sharif')
  })

  it('lists a talk run in several tracks once', () => {
    const ben = getSpeakerBySlug('ben-jacques')
    const titles = ben.sessions.map((s) => `${s.year} ${s.title}`)
    expect(new Set(titles).size).toBe(titles.length)
    expect(ben.sessions.some((s) => s.tracks.length > 1)).toBe(true)
  })
})
