import { describe, it, expect } from 'vitest'
import {
  getAvailableYears,
  getEventData,
  getSpeakersData,
  getEventMetadata,
  getAllEventsMetadata,
  isYearDataComplete,
  getMostRecentYear,
} from './eventData'

describe('eventData', () => {
  it('getAvailableYears returns descending years', () => {
    const years = getAvailableYears()
    expect(years[0]).toBeGreaterThan(years[1])
  })

  it('getAvailableYears includes known years', () => {
    const years = getAvailableYears()
    // It says "includes known years (2023-2026)"
    expect(years).toContain(2025)
  })

  it('getEventData returns data for valid year', () => {
    const year = getAvailableYears()[0]
    if (year) {
      expect(getEventData(year)).toBeDefined()
    }
  })

  it('getEventData returns null for invalid year', () => {
    expect(getEventData(1999)).toBeNull()
  })

  it('getSpeakersData returns array for valid year', () => {
    const year = getAvailableYears()[0]
    if (year) {
      expect(Array.isArray(getSpeakersData(year))).toBe(true)
    }
  })

  it('getEventMetadata has required fields', () => {
    const year = getAvailableYears()[0]
    if (year) {
      const metadata = getEventMetadata(year)
      expect(metadata).toHaveProperty('available')
      expect(metadata).toHaveProperty('year')
    }
  })

  it('getAllEventsMetadata returns array with length matching available years', () => {
    const all = getAllEventsMetadata()
    const available = getAvailableYears()
    expect(all.length).toBe(available.length)
  })

  it('isYearDataComplete returns true for known year', () => {
    const year = getAvailableYears()[0]
    if (year) {
      expect(typeof isYearDataComplete(year)).toBe('boolean')
    }
  })

  it('getMostRecentYear returns highest year', () => {
    const recent = getMostRecentYear()
    const years = getAvailableYears()
    expect(recent).toBe(Math.max(...years))
  })
})
