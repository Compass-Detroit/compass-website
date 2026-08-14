import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { ReactComponent as CompassLogo } from '@/assets/images/compass-logo.svg'
import SettingsDrawer from '@/components/ui/SettingsDrawer'
import { useTheme, THEME_VARIANTS } from '@/components/ThemeProvider'

const THEME_SWATCHES = {
  midnight: { bg: '#0a0a0a', border: '#efb403' },
  daylight: { bg: '#ffffff', border: '#a16207' },
  'motor-city': { bg: '#0a1322', border: '#3b82f6' },
  campus: { bg: '#faf7f2', border: '#047857' },
  neon: { bg: '#050505', border: '#22c55e' },
  ember: { bg: '#120c08', border: '#f97316' },
  cyber: { bg: '#010c04', border: '#4ade80' },
}

function ThemePicker() {
  const { variant, setVariant } = useTheme()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Theme selector"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Change theme"
      >
        <IoColorPaletteOutline size={20} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Theme options"
          className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-2 shadow-2xl backdrop-blur-xl"
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Theme Palette
          </div>
          {THEME_VARIANTS.map((v) => {
            const swatch = THEME_SWATCHES[v.id] || {
              bg: '#0a0a0a',
              border: '#efb403',
            }
            const isSelected = variant === v.id
            return (
              <button
                key={v.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setVariant(v.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? 'bg-[var(--card-hover-bg)] font-semibold text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="size-3.5 rounded-full border-2"
                    style={{
                      backgroundColor: swatch.bg,
                      borderColor: swatch.border,
                    }}
                    aria-hidden="true"
                  />
                  <span>{v.label}</span>
                </div>
                {isSelected && (
                  <span
                    className="size-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/community', label: 'Community' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/impact', label: 'Impact' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
  { to: '/get-involved', label: 'Get Involved' },
]

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { variant, setVariant } = useTheme()

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--surface) 85%, transparent)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="COMPASS home"
        >
          <CompassLogo
            className="h-28 w-auto"
            aria-label="Compass Detroit logo"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'font-semibold text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemePicker />
          <SettingsDrawer />
          <a href="/get-involved" className="btn-donate">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Support Us
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <SettingsDrawer />
          <button
            className="text-[var(--text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-6 pb-6 lg:hidden">
          <div className="flex flex-col gap-1 pt-4">
            {/* Mobile Theme Picker */}
            <div className="mb-4 rounded-xl border border-[var(--border)] p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Theme Palette
              </p>
              <div className="grid grid-cols-2 gap-2">
                {THEME_VARIANTS.map((v) => {
                  const swatch = THEME_SWATCHES[v.id] || {
                    bg: '#0a0a0a',
                    border: '#efb403',
                  }
                  const isSelected = variant === v.id
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setVariant(v.id)
                        setMobileOpen(false)
                      }}
                      className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors ${
                        isSelected
                          ? 'bg-[var(--card-hover-bg)] font-semibold text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span
                        className="size-3 shrink-0 rounded-full border-2"
                        style={{
                          backgroundColor: swatch.bg,
                          borderColor: swatch.border,
                        }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{v.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <a
              href="/get-involved"
              className="btn-donate mb-3 w-full justify-center py-3 text-base"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support Us
            </a>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-[var(--text-muted)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
