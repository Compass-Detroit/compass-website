import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('@/components/SiteNavbar', () => ({
  default: () => <nav data-testid="navbar" />,
}))
vi.mock('@/components/SiteFooter', () => ({
  default: () => <footer data-testid="footer" />,
}))
vi.mock('@/components/dev/TechHeroCanvas', () => ({
  default: () => <div data-testid="tech-hero-canvas" />,
}))
vi.mock('@/components/AnimatedCompass', () => ({
  default: () => <div data-testid="animated-compass" />,
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('HomePage', () => {
  it('renders without crash', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('has main content', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
