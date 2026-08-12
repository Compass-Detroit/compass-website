/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpeakerProfilePage from './SpeakerProfilePage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useParams: () => ({ slug: 'test-speaker' }) }
})

vi.mock('@/layouts/SiteLayout', () => ({
  default: ({ children }) => <div data-testid="site-layout">{children}</div>,
}))
vi.mock('@/components/ui/ProfileCard', () => ({
  default: ({ name }) => <div data-testid="profile-card">{name}</div>,
}))
vi.mock('@/utils/speakerRegistry', () => ({
  getSpeakerBySlug: () => ({
    slug: 'test-speaker',
    name: 'Test Speaker',
    avatar: '/test.jpg',
    bio: 'Test bio text',
    organization: 'TestOrg',
    position: 'Dev',
    sessions: [{ year: 2025, title: 'Test Talk', track: 'AI', tags: ['AI'] }],
    categories: ['AI'],
    yearsActive: [2025],
    avatarHistory: [{ year: 2025, avatar: '/test.jpg' }],
  }),
  getAllSpeakers: () => [],
  getTotalSpeakerCount: () => 1,
  getYearRange: () => ({ earliest: 2023, latest: 2026 }),
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('SpeakerProfilePage', () => {
  it('renders speaker name', () => {
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getAllByText('Test Speaker').length).toBeGreaterThan(0)
  })

  it('renders bio', () => {
    renderWithRouter(<SpeakerProfilePage />)
    expect(screen.getByText('Test bio text')).toBeInTheDocument()
  })
})
