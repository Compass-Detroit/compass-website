/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SiteFooter from './SiteFooter'

vi.mock('@/assets/images/compass-logo.svg', () => ({
  ReactComponent: (props) => <svg data-testid="compass-logo" {...props} />,
}))

vi.mock('@/components/newsletter/NewsletterSignup', () => ({
  default: () => <div data-testid="newsletter-signup" />,
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('SiteFooter', () => {
  it('renders footer', () => {
    renderWithRouter(<SiteFooter />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('shows copyright with current year', () => {
    renderWithRouter(<SiteFooter />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument()
  })

  it('has GitHub social link', () => {
    renderWithRouter(<SiteFooter />)
    const link = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('github'))
    expect(link).toBeTruthy()
  })

  it('has LinkedIn social link', () => {
    renderWithRouter(<SiteFooter />)
    const link = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('linkedin'))
    expect(link).toBeTruthy()
  })

  it('has program links', () => {
    renderWithRouter(<SiteFooter />)
    expect(screen.getByText('Programs')).toBeInTheDocument()
  })

  it('has community links', () => {
    renderWithRouter(<SiteFooter />)
    expect(screen.getByText('Community')).toBeInTheDocument()
  })

  it('has contact email', () => {
    renderWithRouter(<SiteFooter />)
    expect(screen.getByText(/@/)).toBeInTheDocument()
  })
})
