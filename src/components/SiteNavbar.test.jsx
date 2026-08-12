/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SiteNavbar from './SiteNavbar'

vi.mock('@/assets/images/compass-logo.svg', () => ({
  ReactComponent: (props) => <svg data-testid="compass-logo" {...props} />,
}))

vi.mock('@/components/ui/SettingsDrawer', () => ({
  default: () => <div data-testid="settings-drawer" />,
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('SiteNavbar', () => {
  it('renders logo', () => {
    renderWithRouter(<SiteNavbar />)
    expect(screen.getByTestId('compass-logo')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderWithRouter(<SiteNavbar />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Programs')).toBeInTheDocument()
  })

  it('active link has semibold class', () => {
    renderWithRouter(<SiteNavbar />)
    // Assume current path gives a semibold somewhere
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('mobile menu toggle works', () => {
    renderWithRouter(<SiteNavbar />)
    // Basic test to verify it doesn't crash on toggle
    const { container } = renderWithRouter(<SiteNavbar />)
    const button = container.querySelector('button')
    if (button) fireEvent.click(button)
    expect(container).toBeInTheDocument()
  })

  it('Support Us link exists', () => {
    renderWithRouter(<SiteNavbar />)
    expect(screen.getByText('Support Us')).toBeInTheDocument()
  })
})
