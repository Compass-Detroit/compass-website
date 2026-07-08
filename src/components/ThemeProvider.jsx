/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const THEME_KEY = 'compass-theme'
const FONT_KEY = 'compass-font'

export const FONT_OPTIONS = [
  {
    id: 'montserrat',
    label: 'Montserrat',
    family: "Montserrat, 'Open Sans', Helvetica, Arial, sans-serif",
    heading: 'BioRhyme, serif',
  },
  {
    id: 'inter',
    label: 'Inter',
    family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  {
    id: 'biorhyme',
    label: 'BioRhyme',
    family: 'BioRhyme, Georgia, serif',
    heading: 'BioRhyme, Georgia, serif',
  },
  {
    id: 'orbitron',
    label: 'Orbitron',
    family: 'Orbitron, monospace',
    heading: 'Orbitron, monospace',
  },
  {
    id: 'asimovian',
    label: 'Asimovian',
    family: "Asimovian, Georgia, 'Times New Roman', serif",
    heading: "Asimovian, Georgia, 'Times New Roman', serif",
  },
]

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })

  const [font, setFont] = useState(() => {
    const saved = localStorage.getItem(FONT_KEY)
    if (FONT_OPTIONS.some((f) => f.id === saved)) return saved
    return 'montserrat'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
    localStorage.setItem(THEME_KEY, mode)
  }, [mode])

  useEffect(() => {
    const selected = FONT_OPTIONS.find((f) => f.id === font)
    if (selected) {
      document.documentElement.style.setProperty('--site-font', selected.family)
      document.documentElement.style.setProperty(
        '--heading-font',
        selected.heading
      )
    }
    localStorage.setItem(FONT_KEY, font)
  }, [font])

  const toggle = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggle, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
