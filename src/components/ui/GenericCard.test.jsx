import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GenericCard from './GenericCard'

describe('GenericCard', () => {
  const defaultProps = {
    name: 'Test Name',
    avatar: 'test.jpg',
  }

  it('renders name', () => {
    render(<GenericCard {...defaultProps} />)
    expect(screen.getByText('Test Name')).toBeInTheDocument()
  })

  it('renders avatar image', () => {
    render(<GenericCard {...defaultProps} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg')
  })

  it('renders position and organization', () => {
    render(
      <GenericCard {...defaultProps} position="Dev" organization="TestOrg" />
    )
    expect(screen.getByText('Dev')).toBeInTheDocument()
    expect(screen.getByText('TestOrg')).toBeInTheDocument()
  })

  it('View Details button calls onOpen', () => {
    const onOpen = vi.fn()
    render(<GenericCard {...defaultProps} onOpen={onOpen} />)
    const btn = screen.getByText('View Details')
    fireEvent.click(btn)
    expect(onOpen).toHaveBeenCalled()
  })

  it('keyboard Enter triggers onOpen', () => {
    const onOpen = vi.fn()
    render(<GenericCard {...defaultProps} onOpen={onOpen} />)
    fireEvent.keyDown(screen.getByText('View Details'), { key: 'Enter' })
    expect(onOpen).toHaveBeenCalled()
  })

  it('keyboard Space triggers onOpen', () => {
    const onOpen = vi.fn()
    render(<GenericCard {...defaultProps} onOpen={onOpen} />)
    fireEvent.keyDown(screen.getByText('View Details'), { key: ' ' })
    expect(onOpen).toHaveBeenCalled()
  })
})
