import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { ReactComponent as CompassLogo } from '@/assets/images/compass-logo.svg'
import SettingsDrawer from '@/components/ui/SettingsDrawer'

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
          <div className="flex flex-col gap-1 pt-2">
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
