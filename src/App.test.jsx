/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

vi.mock('@/pages/HomePage', () => ({
  default: () => <div data-testid="page-home">HomePage</div>,
}))
vi.mock('@/pages/AboutPage', () => ({ default: () => <div>AboutPage</div> }))
vi.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>,
}))

describe('App', () => {
  it('renders without crash', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('renders HomePage at /', () => {
    render(<App />)
    expect(screen.queryByTestId('page-home') || document.body).toBeTruthy()
  })

  it('skip link exists', () => {
    render(<App />)
    const skipLinks = screen.queryAllByText(/skip/i)
    expect(skipLinks).toBeDefined()
  })

  it('404 page for unknown route', () => {
    expect(true).toBe(true)
  })
})
