import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpeakersDirectoryPage from './SpeakersDirectoryPage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('@/layouts/SiteLayout', () => ({
  default: ({ children }) => <div data-testid="page-layout">{children}</div>,
}))
vi.mock('@/utils/speakerRegistry', () => ({
  getAllSpeakers: () => [
    {
      slug: 'test-speaker',
      name: 'Test Speaker',
      avatar: '/test.jpg',
      organization: 'TestOrg',
      position: 'Dev',
      sessions: [
        { year: 2025, title: 'Agents 101', track: 'AI', tracks: ['AI'] },
      ],
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

  it('finds a speaker by talk title', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    renderWithRouter(<SpeakersDirectoryPage />)
    await userEvent.type(screen.getByRole('searchbox'), 'agents')
    expect(screen.getByText('Test Speaker')).toBeInTheDocument()
    await userEvent.clear(screen.getByRole('searchbox'))
    await userEvent.type(screen.getByRole('searchbox'), 'nothing matches')
    expect(screen.queryByText('Test Speaker')).not.toBeInTheDocument()
  })
})
