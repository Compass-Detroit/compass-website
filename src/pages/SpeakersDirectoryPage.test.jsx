/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpeakersDirectoryPage from './SpeakersDirectoryPage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('@/layouts/PageLayout', () => ({
  PageLayout: ({ children }) => <div data-testid="page-layout">{children}</div>,
}))
vi.mock('@/components/ui/ProfileCard', () => ({
  default: ({ name }) => <div data-testid="profile-card">{name}</div>,
}))
vi.mock('@/utils/speakerRegistry', () => ({
  getAllSpeakers: () => [
    {
      slug: 'test-speaker',
      name: 'Test Speaker',
      avatar: '/test.jpg',
      organization: 'TestOrg',
      position: 'Dev',
      sessions: [{ year: 2025, track: 'AI' }],
      categories: ['AI'],
      yearsActive: [2025],
    },
  ],
  getAllCategories: () => ['AI', 'Web'],
  getAllTracks: () => ['Build with AI'],
  getTotalSpeakerCount: () => 1,
  getYearRange: () => ({ earliest: 2023, latest: 2026 }),
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('SpeakersDirectoryPage', () => {
  it('renders page layout', () => {
    renderWithRouter(<SpeakersDirectoryPage />)
    expect(screen.getByTestId('page-layout')).toBeInTheDocument()
  })

  it('shows speaker name', () => {
    renderWithRouter(<SpeakersDirectoryPage />)
    expect(screen.getByText('Test Speaker')).toBeInTheDocument()
  })
})
