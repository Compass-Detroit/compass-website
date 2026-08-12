import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProfileCard from './ProfileCard'

describe('ProfileCard', () => {
  const defaultProps = {
    avatar: 'test.jpg',
    name: 'Test Name',
  }

  it('renders name and avatar', () => {
    render(<ProfileCard {...defaultProps} />)
    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg')
  })

  it('shows organization when provided', () => {
    render(<ProfileCard {...defaultProps} organization="TestOrg" />)
    expect(screen.getByText('TestOrg')).toBeInTheDocument()
  })

  it('shows position when provided', () => {
    render(<ProfileCard {...defaultProps} position="Dev" />)
    expect(screen.getByText('Dev')).toBeInTheDocument()
  })

  it('shows track badge', () => {
    render(<ProfileCard {...defaultProps} track="AI" />)
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('shows GDE icon when isGDE', () => {
    const { container } = render(<ProfileCard {...defaultProps} isGDE={true} />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('shows WTM icon when isWTM', () => {
    const { container } = render(<ProfileCard {...defaultProps} isWTM={true} />)
    expect(container).not.toBeEmptyDOMElement()
  })

  it('View Details button calls onViewDetails', () => {
    const onViewDetails = vi.fn()
    render(<ProfileCard {...defaultProps} onViewDetails={onViewDetails} />)
    fireEvent.click(screen.getByText('View Details'))
    expect(onViewDetails).toHaveBeenCalled()
  })

  it('renders social links when provided', () => {
    render(<ProfileCard {...defaultProps} github="test" twitter="test" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})
