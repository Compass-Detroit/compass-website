import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { ReactComponent as CompassLogo } from '@/assets/images/compass-logo.svg'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/community', label: 'Community' },
  { to: '/events', label: 'Events' },
  { to: '/resources', label: 'Resources' },
  { to: '/get-involved', label: 'Get Involved' },
]

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav
      className="sticky top-0 z-50 border-b border-surface bg-[#0a0a0a]/95 backdrop-blur-md"
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
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-surface bg-[#0a0a0a] px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
