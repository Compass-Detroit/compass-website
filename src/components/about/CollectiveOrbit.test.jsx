import { describe, expect, it } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import CollectiveOrbit from './CollectiveOrbit'

const ORGS = [
  { name: 'NSBE Detroit', initials: 'NSBE', color: '#000' },
  { name: 'SHPE Detroit', initials: 'SHPE', color: '#000' },
  { name: 'GDG Detroit', initials: 'GDG', color: '#000' },
]

const frames = (n) =>
  act(
    () =>
      new Promise((resolve) => {
        let left = n
        const step = () => (--left ? requestAnimationFrame(step) : resolve())
        requestAnimationFrame(step)
      })
  )

describe('CollectiveOrbit', () => {
  it('renders without IntersectionObserver (jsdom)', () => {
    render(<CollectiveOrbit orgs={ORGS} />)
    expect(screen.getByText('3 societies, one collective')).toBeInTheDocument()
  })

  it('names the focused org and keeps focus while the orbit re-stacks', async () => {
    render(<CollectiveOrbit orgs={ORGS} />)
    const node = screen.getByRole('img', { name: 'GDG Detroit' })
    act(() => node.focus())
    fireEvent.focus(node)
    await frames(30)
    expect(document.activeElement).toBe(node)
    expect(
      screen.getByText('GDG Detroit', { selector: 'figcaption' })
    ).toBeInTheDocument()
  })
})
