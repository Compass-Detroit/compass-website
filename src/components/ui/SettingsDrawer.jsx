import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme, FONT_OPTIONS } from '@/components/ThemeProvider'
import {
  FaXmark,
  FaGear,
  FaSun,
  FaMoon,
  FaCheck,
  FaRotateLeft,
} from 'react-icons/fa6'

export default function SettingsDrawer() {
  const { mode, toggle, font, setFont } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef(null)

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleResetDefaults = () => {
    setFont('montserrat')
    if (mode !== 'dark') {
      toggle()
    }
  }

  return (
    <>
      {/* Settings Gear Button in Nav */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary transition-all hover:border-primary hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20"
        aria-label="Open Display Settings"
        title="Display & Font Settings"
      >
        <FaGear
          className={`size-4 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {/* Render Drawer to document.body via Portal (unconstrained by nav stacking context) */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel */}
            <aside
              ref={drawerRef}
              className="relative z-10 flex size-full max-w-sm flex-col border-l border-primary/40 bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-[0_0_80px_rgba(0,0,0,0.9)]"
              role="dialog"
              aria-modal="true"
              aria-label="Display Settings Drawer"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-card)] px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <FaGear className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[var(--text-primary)]">
                      Display &amp; Theme
                    </h2>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Customize site appearance
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex size-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-primary/40 hover:text-[var(--text-primary)]"
                  aria-label="Close Settings Drawer"
                >
                  <FaXmark className="size-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-6">
                  {/* Appearance Mode Section */}
                  <div>
                    <span
                      className="mb-3 block text-xs font-bold uppercase tracking-wider text-primary"
                      role="heading"
                      aria-level="3"
                    >
                      Appearance Mode
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => mode !== 'dark' && toggle()}
                        className={`flex items-center justify-center gap-2.5 rounded-xl border py-3.5 text-xs font-bold uppercase tracking-wider transition-all ${
                          mode === 'dark'
                            ? 'border-primary bg-primary text-black shadow-lg shadow-primary/20'
                            : 'border-[var(--border)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:border-primary/40 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <FaMoon className="size-4" />
                        Dark Mode
                      </button>
                      <button
                        onClick={() => mode !== 'light' && toggle()}
                        className={`flex items-center justify-center gap-2.5 rounded-xl border py-3.5 text-xs font-bold uppercase tracking-wider transition-all ${
                          mode === 'light'
                            ? 'border-primary bg-primary text-black shadow-lg shadow-primary/20'
                            : 'border-[var(--border)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:border-primary/40 hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <FaSun className="size-4" />
                        Light Mode
                      </button>
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="text-xs font-bold uppercase tracking-wider text-primary"
                        role="heading"
                        aria-level="3"
                      >
                        Font Family
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        Live Preview
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {FONT_OPTIONS.map((option) => {
                        const isSelected = font === option.id
                        return (
                          <button
                            key={option.id}
                            onClick={() => setFont(option.id)}
                            className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/15 text-[var(--text-primary)] shadow-sm'
                                : 'border-[var(--border)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:border-primary/40 hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span
                                className="text-sm font-semibold"
                                style={{ fontFamily: option.family }}
                              >
                                {option.label}
                              </span>
                              <span className="text-[10px] opacity-70">
                                {option.id === 'montserrat' &&
                                  'Clean Modern Sans'}
                                {option.id === 'inter' &&
                                  'System Precision Sans'}
                                {option.id === 'biorhyme' && 'Editorial Serif'}
                                {option.id === 'orbitron' &&
                                  'Tech Display Mono'}
                                {option.id === 'asimovian' &&
                                  'Classic Academic Serif'}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-black">
                                <FaCheck className="size-3" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Live Typography Sample Card */}
                  <div className="rounded-xl border border-primary/20 bg-[var(--surface-card)] p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Font Preview
                    </span>
                    <p
                      className="mt-2 text-base font-bold leading-tight text-[var(--text-primary)]"
                      style={{
                        fontFamily: FONT_OPTIONS.find((f) => f.id === font)
                          ?.family,
                      }}
                    >
                      COMPASS Detroit 2026
                    </p>
                    <p
                      className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]"
                      style={{
                        fontFamily: FONT_OPTIONS.find((f) => f.id === font)
                          ?.family,
                      }}
                    >
                      Building career infrastructure for underrepresented tech
                      talent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer / Reset Defaults */}
              <div className="border-t border-[var(--border)] bg-[var(--surface-card)] p-4">
                <button
                  onClick={handleResetDefaults}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 text-xs font-semibold text-[var(--text-muted)] transition-colors hover:border-primary/40 hover:text-[var(--text-primary)]"
                >
                  <FaRotateLeft className="size-3" />
                  Reset to Defaults
                </button>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  )
}
