import '@testing-library/jest-dom/vitest'
import { vi, afterEach } from 'vitest'

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

window.IntersectionObserver = vi.fn(function (callback) {
  this.observe = vi.fn()
  this.unobserve = vi.fn()
  this.disconnect = vi.fn()
  this.takeRecords = vi.fn(() => [])
  // Fire callback with intersecting entry after a tick
  Promise.resolve().then(() =>
    callback(
      [{ isIntersecting: true, target: document.createElement('div') }],
      this
    )
  )
})

window.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const localStorageMock = (() => {
  const store = new Map()
  return {
    getItem: (key) => store.get(key) || null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

afterEach(() => {
  vi.restoreAllMocks()
})
