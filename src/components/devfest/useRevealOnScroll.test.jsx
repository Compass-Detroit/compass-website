import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { useRef } from 'react'
import useRevealOnScroll from './useRevealOnScroll'

function List() {
  const ref = useRef(null)
  useRevealOnScroll(ref, 'k')
  return (
    <ul ref={ref}>
      <li data-reveal-item>One</li>
      <li data-reveal-item>Two</li>
    </ul>
  )
}

const below = () =>
  vi
    .spyOn(Element.prototype, 'getBoundingClientRect')
    .mockReturnValue({ top: 5000 })

const items = (container) => [...container.querySelectorAll('li')]

describe('useRevealOnScroll', () => {
  afterEach(() => vi.restoreAllMocks())

  it('hides only items that start below the fold', () => {
    below()
    const { container } = render(<List />)
    expect(items(container).map((li) => li.dataset.reveal)).toEqual([
      'pending',
      'pending',
    ])
  })

  it('leaves items above the fold visible', () => {
    const { container } = render(<List />)
    for (const li of items(container)) expect(li.dataset.reveal).toBe('shown')
  })

  it('hides nothing without IntersectionObserver', () => {
    below()
    const original = window.IntersectionObserver
    delete window.IntersectionObserver
    try {
      const { container } = render(<List />)
      for (const li of items(container))
        expect(li.dataset.reveal).toBeUndefined()
    } finally {
      window.IntersectionObserver = original
    }
  })

  it('hides nothing when motion is reduced', () => {
    below()
    const original = window.matchMedia
    window.matchMedia = (query) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })
    try {
      const { container } = render(<List />)
      for (const li of items(container))
        expect(li.dataset.reveal).toBeUndefined()
    } finally {
      window.matchMedia = original
    }
  })
})
