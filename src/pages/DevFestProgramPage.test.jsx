import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DevFestProgramPage from './DevFestProgramPage'
import SpeakerGlobe from '@/components/devfest/SpeakerGlobe'
import {
  DEVFEST_SPEAKERS,
  DEVFEST_PROGRAM_STATS,
} from '@/data/2026/devfestProgram'

vi.mock('@/layouts/SiteLayout', () => ({
  default: ({ children }) => <div>{children}</div>,
}))

// The shared setup's ResizeObserver mock can't be called with `new`
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const renderAt = (path = '/devfest') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <DevFestProgramPage />
    </MemoryRouter>
  )

describe('DevFestProgramPage', () => {
  afterEach(() => localStorage.clear())

  it('shows every speaker as a card and on the globe', () => {
    renderAt()
    expect(
      screen.getByRole('heading', { level: 1, name: /38 speakers/ })
    ).toBeInTheDocument()
    const globe = screen.getByRole('list', { name: 'Speakers on the globe' })
    expect(within(globe).getAllByRole('button')).toHaveLength(
      DEVFEST_PROGRAM_STATS.speakers
    )
    expect(screen.getByRole('heading', { name: 'Meet the speakers' }))
  })

  it('keeps both days on the page with a day bar', () => {
    renderAt()
    const bar = screen.getByRole('navigation', { name: 'Jump to day' })
    expect(within(bar).getByText('AI Hackathon')).toBeInTheDocument()
    expect(within(bar).getByText('Conference')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Friday, Nov 13/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Saturday, Nov 14/ })
    ).toBeInTheDocument()
  })

  it('filters both the speakers and the schedule by track', () => {
    renderAt('/devfest?track=Build%20with%20AI')
    expect(screen.getByText('4 sessions match')).toBeInTheDocument()
    expect(screen.getByText('Nothing matches on Friday.')).toBeInTheDocument()
  })

  it('saves a starred session to my schedule', () => {
    renderAt()
    const [star] = screen.getAllByRole('button', {
      name: /Save Curiosity as an Engine/,
    })
    fireEvent.click(star)
    expect(
      screen.getByRole('button', { name: /My schedule\s*1/ })
    ).toBeInTheDocument()
  })
})

describe('SpeakerGlobe', () => {
  it('starts with the tour paused when motion is reduced', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    render(<SpeakerGlobe speakers={DEVFEST_SPEAKERS} onSelect={() => {}} />)
    // The label carries the state: "Play tour" means the tour is paused
    expect(
      screen.getByRole('button', { name: 'Play tour' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Pause tour' })).toBeNull()
  })
})

describe('SpeakerGlobe tour', () => {
  it('visits every speaker exactly once per lap', async () => {
    const { tourOrder, fibonacciSphere } = await import(
      '@/components/devfest/globeMath'
    )
    const order = tourOrder(fibonacciSphere(DEVFEST_SPEAKERS.length))
    expect(order).toHaveLength(DEVFEST_SPEAKERS.length)
    expect(new Set(order).size).toBe(DEVFEST_SPEAKERS.length)
  })
})
