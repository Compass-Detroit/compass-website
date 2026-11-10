import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DevFestPortal from './DevFestPortal'

const renderPortal = () =>
  render(
    <MemoryRouter>
      <DevFestPortal />
    </MemoryRouter>
  )

const world = (container) => container.querySelector('[class*="world"]')

describe('DevFestPortal scene', () => {
  const original = window.matchMedia
  afterEach(() => {
    window.matchMedia = original
    vi.restoreAllMocks()
  })

  it('holds a still pose and starts no animation loop with reduced motion', () => {
    window.matchMedia = (query) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    const { container } = renderPortal()
    expect(world(container).style.transform).toBe(
      'rotateX(5.000deg) rotateY(-9.000deg)'
    )
    expect(raf).not.toHaveBeenCalled()
  })

  it('runs one camera loop when motion is allowed', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    renderPortal()
    expect(raf).toHaveBeenCalled()
  })
})
