import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpeakerProfilePage from './SpeakerProfilePage'
import { BrowserRouter } from 'react-router-dom'

const baseSpeaker = {
  slug: 'test-speaker',
  name: 'Test Speaker',
  credentials: null,
  avatar: '/test.jpg',
  bio: 'Test bio text',
  organization: 'TestOrg',
  position: 'Dev',
  sessions: [
    {
      year: 2025,
      title: 'Test Talk',
      track: 'AI',
      tracks: ['AI'],
      tags: ['AI'],
    },
  ],
  categories: ['AI'],
  yearsActive: [2025],
  avatarHistory: [{ year: 2025, avatar: '/test.jpg' }],
}

const mocks = vi.hoisted(() => ({ speaker: null }))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useParams: () => ({ slug: 'test-speaker' }) }
})

vi.mock('@/layouts/SiteLayout', () => ({
  default: ({ children }) => <div data-testid="site-layout">{children}</div>,
}))
vi.mock('@/utils/speakerRegistry', () => ({
  getSpeakerBySlug: () => mocks.speaker,
  getAllSpeakers: () => [],
  getTotalSpeakerCount: () => 1,
  getYearRange: () => ({ earliest: 2023, latest: 2026 }),
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('SpeakerProfilePage', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
    mocks.speaker = { ...baseSpeaker }
  })

  it('renders speaker name', () => {
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getAllByText('Test Speaker').length).toBeGreaterThan(0)
  })

  it('renders bio', () => {
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getByText('Test bio text')).toBeInTheDocument()
  })

  it('shows credentials in the heading and page title', () => {
    mocks.speaker = { ...baseSpeaker, credentials: 'Ph.D.' }
    renderWithRouter(<SpeakerProfilePage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Test Speaker, Ph.D.' })
    ).toBeInTheDocument()
    expect(document.title).toBe('Test Speaker, Ph.D. — COMPASS Detroit Speaker')
  })

  it('keeps bio paragraphs separate', () => {
    mocks.speaker = { ...baseSpeaker, bio: 'First paragraph.\n\nSecond one.' }
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getByText('First paragraph.').tagName).toBe('P')
    expect(screen.getByText('Second one.').tagName).toBe('P')
  })

  it('features the latest talk with every track it ran in', () => {
    mocks.speaker = {
      ...baseSpeaker,
      sessions: [
        {
          year: 2026,
          title: 'Merged Talk',
          track: 'Fullstack',
          tracks: ['Fullstack', 'Mobile'],
          event: 'LHM Innovation Summit',
          tags: [],
        },
      ],
    }
    renderWithRouter(<SpeakerProfilePage />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'Merged Talk' })
    ).toBeInTheDocument()
    expect(screen.getByText('LHM Innovation Summit 2026')).toBeInTheDocument()
    expect(screen.getAllByText('Mobile').length).toBeGreaterThan(0)
  })

  it('books via the website, else LinkedIn, else not at all', () => {
    mocks.speaker = {
      ...baseSpeaker,
      url: 'https://example.com',
      linkedIn: 'https://linkedin.com/in/test',
    }
    const { unmount } = renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getByText('Visit Website').closest('a')).toHaveAttribute(
      'href',
      'https://example.com'
    )
    unmount()

    mocks.speaker = { ...baseSpeaker, url: 'https://linkedin.com/in/test' }
    const second = renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getByText('Connect on LinkedIn')).toBeInTheDocument()
    second.unmount()

    mocks.speaker = { ...baseSpeaker }
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.queryByText(/Book Test/)).not.toBeInTheDocument()
  })
})
