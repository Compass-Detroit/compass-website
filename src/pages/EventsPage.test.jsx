import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventsPage from './EventsPage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('@/components/SiteNavbar', () => ({
  default: () => <nav data-testid="navbar" />,
}))
vi.mock('@/components/SiteFooter', () => ({
  default: () => <footer data-testid="footer" />,
}))
vi.mock('@/utils/eventData', () => ({
  getAvailableYears: () => [2026, 2025, 2024, 2023],
  getEventData: () => ({ speakers: [], sponsors: [], team: [] }),
  getEventMetadata: () => ({
    available: true,
    sessionCount: 10,
    speakerCount: 5,
    tracks: ['AI'],
    year: 2026,
  }),
  getAllEventsMetadata: () => [{ available: true, year: 2026 }],
  getMostRecentYear: () => 2026,
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('EventsPage', () => {
  it('renders without crash', () => {
    renderWithRouter(<EventsPage />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('has main content', () => {
    renderWithRouter(<EventsPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
