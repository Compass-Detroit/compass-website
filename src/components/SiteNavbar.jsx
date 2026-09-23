import { useEffect, useId, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaChevronDown, FaXmark } from 'react-icons/fa6'
import { ReactComponent as CompassLogo } from '@/assets/images/compass-logo.svg'
import SettingsDrawer from '@/components/ui/SettingsDrawer'

// The logo artwork sits in a 508x116 band of a 512x512 canvas; crop to it so
// the mark can render at nav height instead of needing a 112px box.
const LOGO_VIEWBOX = '0 190 512 122'

const primaryLinks = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/community', label: 'Community' },
  { to: '/impact', label: 'Impact' },
]

const moreLinks = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
  { to: '/get-involved', label: 'Get Involved' },
]

const isActive = (pathname, to) =>
  pathname === to || pathname.startsWith(`${to}/`)

const HeartIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const linkClass = (active) =>
  `rounded-full px-3 py-1.5 text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
    active
      ? 'bg-[var(--card-hover-bg)] font-semibold text-[var(--text-primary)]'
      : 'text-[var(--text-muted)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
  }`

function MoreMenu({ pathname }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()
  const hasActive = moreLinks.some((l) => isActive(pathname, l.to))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        className={`${linkClass(hasActive)} inline-flex items-center gap-1.5`}
      >
        More
        <FaChevronDown
          className={`size-2.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-1.5 shadow-xl shadow-black/20"
      >
        {moreLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, link.to) ? 'page' : undefined}
              className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                isActive(pathname, link.to)
                  ? 'bg-[var(--card-hover-bg)] font-semibold text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

MoreMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  // Any navigation closes the mobile menu
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--surface) 85%, transparent)',
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-6">
        <Link
          to="/"
          className="shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="COMPASS home"
        >
          <CompassLogo
            viewBox={LOGO_VIEWBOX}
            className="h-7 w-auto"
            aria-hidden="true"
          />
        </Link>

        {/* Desktop links */}
        <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
          {primaryLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive(pathname, link.to) ? 'page' : undefined}
                className={linkClass(isActive(pathname, link.to))}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <MoreMenu pathname={pathname} />
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <SettingsDrawer />
          <Link to="/get-involved" className="btn-donate px-3 py-1.5 sm:px-4">
            <HeartIcon />
            <span className="max-sm:sr-only">Support Us</span>
          </Link>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--card-hover-bg)] lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-[var(--border)] bg-[var(--surface)] px-6 pb-5 pt-3 lg:hidden"
        >
          <ul className="grid grid-cols-2 gap-1">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={
                    isActive(pathname, link.to) ? 'page' : undefined
                  }
                  className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive(pathname, link.to)
                      ? 'bg-primary/10 font-semibold text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
