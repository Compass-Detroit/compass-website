import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CTAButton from './CTAButton'

describe('CTAButton', () => {
  it('renders with label text', () => {
    render(<CTAButton href="/" label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with children', () => {
    render(<CTAButton href="/">Child Content</CTAButton>)
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('has correct href', () => {
    render(<CTAButton href="/test">Link</CTAButton>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('primary variant has sky-900 class', () => {
    render(
      <CTAButton href="/" variant="primary">
        Link
      </CTAButton>
    )
    expect(screen.getByRole('link').className).toMatch(/sky-900/)
  })

  it('secondary variant has border class', () => {
    render(
      <CTAButton href="/" variant="secondary">
        Link
      </CTAButton>
    )
    expect(screen.getByRole('link').className).toMatch(/border/)
  })

  it('auto aria-label for _blank target', () => {
    render(<CTAButton href="/" target="_blank" label="External" />)
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      'External (opens in new tab)'
    )
  })

  it('uses custom ariaLabel when provided', () => {
    render(
      <CTAButton
        href="/"
        target="_blank"
        label="External"
        ariaLabel="Custom Label"
      />
    )
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      'Custom Label'
    )
  })

  it('icon renders on left by default', () => {
    render(
      <CTAButton href="/" icon={<svg data-testid="icon" />}>
        Link
      </CTAButton>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('icon renders on right when iconPosition="right"', () => {
    render(
      <CTAButton
        href="/"
        iconPosition="right"
        icon={<svg data-testid="icon" />}
      >
        Link
      </CTAButton>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
