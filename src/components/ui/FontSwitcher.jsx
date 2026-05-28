import { useState, useRef, useEffect } from 'react'
import { useTheme, FONT_OPTIONS } from '@/components/ThemeProvider'

export default function FontSwitcher() {
  const { font, setFont } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = FONT_OPTIONS.find((f) => f.id === font)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-theme-border bg-theme-surface-card px-2.5 text-sm transition-all hover:border-theme-border-light hover:bg-theme-surface-elevated"
        aria-label="Change font"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Change font"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
        <span
          className="hidden sm:inline"
          style={{ fontFamily: current?.family }}
        >
          {current?.label}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
          className={`hidden transition-transform sm:inline ${
            open ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Font options"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-theme-border bg-theme-surface-card shadow-xl"
        >
          {FONT_OPTIONS.map((option) => (
            <li
              key={option.id}
              role="option"
              aria-selected={font === option.id}
              tabIndex={0}
              onClick={() => {
                setFont(option.id)
                setOpen(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setFont(option.id)
                  setOpen(false)
                }
              }}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                font === option.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)]'
              }`}
              style={{ fontFamily: option.family }}
            >
              <span className="flex-1 text-left">{option.label}</span>
              {font === option.id && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
