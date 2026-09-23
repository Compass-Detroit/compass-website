/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

const THEME_KEY = 'compass-theme'
const VARIANT_KEY = 'compass-theme-variant'
const FONT_KEY = 'compass-font'

// `swatch` previews each palette in the settings drawer (surface + accent)
export const THEME_VARIANTS = [
  {
    id: 'midnight',
    label: 'Midnight',
    cssClass: 'dark',
    base: 'dark',
    swatch: { bg: '#0a0a0a', accent: '#efb403' },
  },
  {
    id: 'daylight',
    label: 'Daylight',
    cssClass: 'light',
    base: 'light',
    swatch: { bg: '#ffffff', accent: '#a16207' },
  },
  {
    id: 'motor-city',
    label: 'Motor City',
    cssClass: 'theme-motor-city',
    base: 'dark',
    swatch: { bg: '#0a1322', accent: '#3b82f6' },
  },
  {
    id: 'campus',
    label: 'Campus',
    cssClass: 'theme-campus',
    base: 'light',
    swatch: { bg: '#faf7f2', accent: '#047857' },
  },
  {
    id: 'neon',
    label: 'Neon',
    cssClass: 'theme-neon',
    base: 'dark',
    swatch: { bg: '#050505', accent: '#22c55e' },
  },
  {
    id: 'ember',
    label: 'Ember',
    cssClass: 'theme-ember',
    base: 'dark',
    swatch: { bg: '#120c08', accent: '#f97316' },
  },
  {
    id: 'cyber',
    label: 'Cyber Matrix',
    cssClass: 'theme-cyber',
    base: 'dark',
    swatch: { bg: '#010c04', accent: '#4ade80' },
  },
]

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
  const [variant, setVariant] = useState(() => {
    const saved = localStorage.getItem(VARIANT_KEY)
    if (THEME_VARIANTS.some((v) => v.id === saved)) return saved
    const savedMode = localStorage.getItem(THEME_KEY)
    if (savedMode === 'light') return 'daylight'
    if (savedMode === 'dark') return 'midnight'
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'daylight'
      : 'midnight'
  })

  const currentVariant =
    THEME_VARIANTS.find((v) => v.id === variant) || THEME_VARIANTS[0]
  const mode = currentVariant.base

  const [font, setFont] = useState(() => {
    const saved = localStorage.getItem(FONT_KEY)
    if (FONT_OPTIONS.some((f) => f.id === saved)) return saved
    return 'montserrat'
  })

  useEffect(() => {
    const root = document.documentElement
    const allVariantClasses = THEME_VARIANTS.map((v) => v.cssClass)
    root.classList.remove('light', 'dark', ...allVariantClasses)

    root.classList.add(currentVariant.cssClass)
    if (currentVariant.cssClass !== currentVariant.base) {
      root.classList.add(currentVariant.base)
    }

    localStorage.setItem(VARIANT_KEY, variant)
    localStorage.setItem(THEME_KEY, mode)
  }, [variant, currentVariant, mode])

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

  const toggle = () => {
    setVariant((current) => {
      const idx = THEME_VARIANTS.findIndex((v) => v.id === current)
      return THEME_VARIANTS[(idx + 1) % THEME_VARIANTS.length].id
    })
  }

  return (
    <ThemeContext.Provider
      value={{ mode, variant, setVariant, toggle, font, setFont }}
    >
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
