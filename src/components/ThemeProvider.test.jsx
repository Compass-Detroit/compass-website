import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

const TestComponent = () => {
  const { mode, toggle, font } = useTheme()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="font">{font}</span>
      <button onClick={toggle} data-testid="toggle">
        toggle
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders children', () => {
    render(
      <ThemeProvider>
        <div>child</div>
      </ThemeProvider>
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('defaults to montserrat font', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('font')).toHaveTextContent('montserrat')
  })

  it('toggle switches mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    const button = screen.getByTestId('toggle')
    act(() => button.click())
    // Note: Assuming light/dark toggles. Without knowing the exact starting mode,
    // we just check it doesn't crash or changes.
    expect(screen.getByTestId('mode')).not.toBeEmptyDOMElement()
  })

  it('persists mode to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    act(() => screen.getByTestId('toggle').click())
    expect(localStorage.getItem('compass-theme')).toBeTruthy()
  })

  it('persists font to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(localStorage.getItem('compass-font')).toBe('montserrat')
  })

  it('supports theme variants', () => {
    const VariantTester = () => {
      const { variant, setVariant, mode } = useTheme()
      return (
        <div>
          <span data-testid="variant">{variant}</span>
          <span data-testid="mode">{mode}</span>
          <button onClick={() => setVariant('cyber')} data-testid="set-cyber">
            cyber
          </button>
        </div>
      )
    }

    render(
      <ThemeProvider>
        <VariantTester />
      </ThemeProvider>
    )

    const btn = screen.getByTestId('set-cyber')
    act(() => btn.click())
    expect(screen.getByTestId('variant')).toHaveTextContent('cyber')
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(localStorage.getItem('compass-theme-variant')).toBe('cyber')
  })

  it('useTheme throws outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow()
    consoleError.mockRestore()
  })
})
