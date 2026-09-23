import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  useTheme,
  FONT_OPTIONS,
  THEME_VARIANTS,
} from '@/components/ThemeProvider'
import { FaXmark, FaGear, FaCheck, FaRotateLeft } from 'react-icons/fa6'

export default function SettingsDrawer() {
  const { variant, setVariant, font, setFont } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  // Focus the drawer on open; hand focus back to the trigger on close
  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
    else if (document.activeElement === document.body)
      triggerRef.current?.focus()
  }, [isOpen])

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
    setVariant('midnight')
  }

  return (
    <>
      {/* Settings Gear Button in Nav */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex size-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Theme and display settings"
        aria-expanded={isOpen}
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
                      Theme &amp; Display
                    </h2>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Customize site appearance
                    </p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
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
                  {/* Theme Palette Section */}
                  <div>
                    <span
                      className="mb-3 block text-xs font-bold uppercase tracking-wider text-primary"
                      role="heading"
                      aria-level="3"
                    >
                      Theme Palette
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {THEME_VARIANTS.map((v) => {
                        const isSelected = variant === v.id
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setVariant(v.id)}
                            aria-pressed={isSelected}
                            className={`flex items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
                              isSelected
                                ? 'border-primary bg-primary/15'
                                : 'border-[var(--border)] bg-[var(--surface-card)] hover:border-primary/40'
                            }`}
                          >
                            {/* Mini preview: the palette's surface with its accent */}
                            <span
                              className="flex size-9 shrink-0 items-end justify-end rounded-lg border border-black/10 p-1"
                              style={{ backgroundColor: v.swatch.bg }}
                              aria-hidden="true"
                            >
                              <span
                                className="size-3 rounded-full"
                                style={{ backgroundColor: v.swatch.accent }}
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">
                                {v.label}
                              </span>
                              <span className="block text-[11px] capitalize text-[var(--text-muted)]">
                                {v.base}
                              </span>
                            </span>
                          </button>
                        )
                      })}
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
