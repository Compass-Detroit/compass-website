import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import {
  DEVFEST_2026_COLORS,
  DEVFEST_LOGOS,
  DEVFEST_GLYPHS,
  DEVFEST_ROLE_BADGES,
  DEVFEST_BANNERS,
  DEVFEST_ANIMATED,
  OFFICIAL_TEMPLATE_LINKS,
} from '@/utils/devfestBrandAssets'
import {
  FaCopy,
  FaCheck,
  FaDownload,
  FaArrowUpRightFromSquare,
  FaPalette,
  FaShapes,
  FaIdBadge,
  FaImage,
  FaFilm,
  FaFolderOpen,
  FaCircleInfo,
} from 'react-icons/fa6'

export default function BrandKitPage() {
  const [copiedHex, setCopiedHex] = useState(null)
  const [activeTab, setActiveTab] = useState('colors')
  const [logoTheme, setLogoTheme] = useState('light')
  const [stickerFilter, setStickerFilter] = useState('all')

  const copyToClipboard = (hex) => {
    navigator.clipboard?.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 2000)
  }

  const filteredGlyphs =
    stickerFilter === 'all'
      ? DEVFEST_GLYPHS
      : DEVFEST_GLYPHS.filter((g) => g.category === stickerFilter)

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-white transition-colors duration-200 dark:bg-gray-950">
        {/* Decorative Grid & Halftone Background */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-devfest-blue/10 via-devfest-yellow/5 to-transparent opacity-70" />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#4285f4 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-devfest-blue/30 bg-devfest-pastel-blue/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-devfest-blue dark:bg-devfest-blue/10 dark:text-devfest-ht-blue">
              <span className="size-2 rounded-full bg-devfest-blue animate-pulse" />
              Official 2026 Brand Design System
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-orbitron">
              DevFest <span className="text-devfest-yellow">2026</span> Brand
              Kit
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Complete brand identity, color tokens, vector sticker sheets, role
              badges, motion graphics, and template resources for Michigan
              DevFest and COMPASS Detroit organizers.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4 dark:border-gray-800">
            {[
              { id: 'colors', label: 'Color System', icon: FaPalette },
              { id: 'logos', label: 'Logos & Lockups', icon: FaImage },
              { id: 'stickers', label: 'Stickers & Glyphs', icon: FaShapes },
              { id: 'roles', label: 'Role Badges', icon: FaIdBadge },
              { id: 'banners', label: 'Banners & Key Art', icon: FaImage },
              { id: 'animated', label: 'Motion & GIFs', icon: FaFilm },
              {
                id: 'templates',
                label: 'Official Templates',
                icon: FaFolderOpen,
              },
              { id: 'guidelines', label: 'Guidelines', icon: FaCircleInfo },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-devfest-blue text-white shadow-lg shadow-devfest-blue/25 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* TAB 1: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-12 animate-fade-in-up">
              {/* Core Colors */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="size-3 rounded-full bg-devfest-blue" />
                    Core Google Palette
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Primary palette for branding, key call-to-actions, and main
                    interface anchors.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {DEVFEST_2026_COLORS.core.map((color) => (
                    <div
                      key={color.hex}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div
                        className="relative mb-4 h-28 w-full rounded-xl flex items-end justify-end p-3 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex)}
                          className="rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-opacity hover:bg-black/60 flex items-center gap-1.5"
                          title="Copy Hex Code"
                        >
                          {copiedHex === color.hex ? (
                            <>
                              <FaCheck className="size-3 text-green-400" />{' '}
                              Copied!
                            </>
                          ) : (
                            <>
                              <FaCopy className="size-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {color.name}
                      </h3>
                      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        {color.hex.toUpperCase()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {color.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Halftones */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="size-3 rounded-full bg-devfest-ht-green" />
                    Halftones & Vibrant Accents
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    High-contrast vibrant variations for badges, tags, glow
                    states, and interactive accents.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {DEVFEST_2026_COLORS.halftones.map((color) => (
                    <div
                      key={color.hex}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div
                        className="relative mb-4 h-28 w-full rounded-xl flex items-end justify-end p-3 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex)}
                          className="rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-opacity hover:bg-black/60 flex items-center gap-1.5"
                        >
                          {copiedHex === color.hex ? (
                            <>
                              <FaCheck className="size-3 text-green-400" />{' '}
                              Copied!
                            </>
                          ) : (
                            <>
                              <FaCopy className="size-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {color.name}
                      </h3>
                      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        {color.hex.toUpperCase()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {color.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pastels */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="size-3 rounded-full bg-devfest-pastel-yellow" />
                    Pastels & Soft Tones
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subtle backgrounds, card containers, and soft highlights.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {DEVFEST_2026_COLORS.pastels.map((color) => (
                    <div
                      key={color.hex}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div
                        className="relative mb-4 h-28 w-full rounded-xl flex items-end justify-end p-3 shadow-inner border border-black/5"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex)}
                          className="rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-opacity hover:bg-black/60 flex items-center gap-1.5"
                        >
                          {copiedHex === color.hex ? (
                            <>
                              <FaCheck className="size-3 text-green-400" />{' '}
                              Copied!
                            </>
                          ) : (
                            <>
                              <FaCopy className="size-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {color.name}
                      </h3>
                      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        {color.hex.toUpperCase()}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {color.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* COMPASS Ecosystem Harmony */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="size-3 rounded-full bg-primary" />
                    COMPASS Detroit Brand Tokens
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detroit ecosystem brand identity tokens harmonized with
                    DevFest 2026.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {DEVFEST_2026_COLORS.compass.map((color) => (
                    <div
                      key={color.hex}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div
                        className="relative mb-4 h-24 w-full rounded-xl flex items-end justify-end p-3 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      >
                        <button
                          onClick={() => copyToClipboard(color.hex)}
                          className="rounded-lg bg-black/40 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md transition-opacity hover:bg-black/60 flex items-center gap-1"
                        >
                          {copiedHex === color.hex ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {color.name}
                      </h3>
                      <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                        {color.hex.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: LOGOS */}
          {activeTab === 'logos' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Official Logo Lockups
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    High-resolution wordmarks, chapter lockups, and compact
                    marks with transparent backgrounds.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-900">
                  <button
                    onClick={() => setLogoTheme('light')}
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${
                      logoTheme === 'light'
                        ? 'bg-white shadow text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Light Preview
                  </button>
                  <button
                    onClick={() => setLogoTheme('dark')}
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${
                      logoTheme === 'dark'
                        ? 'bg-gray-800 shadow text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    Dark Preview
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {DEVFEST_LOGOS.map((logo) => (
                  <div
                    key={logo.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div
                      className={`flex h-48 items-center justify-center p-8 transition-colors ${
                        logoTheme === 'light' ? 'bg-gray-50' : 'bg-gray-950'
                      }`}
                    >
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-h-24 max-w-full object-contain drop-shadow-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between p-5 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="inline-block rounded-full bg-devfest-pastel-blue px-2.5 py-0.5 text-xs font-medium text-devfest-blue dark:bg-devfest-blue/20 dark:text-devfest-ht-blue">
                          {logo.tag}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-white">
                          {logo.name}
                        </h3>
                      </div>
                      <a
                        href={logo.url}
                        download={`${logo.id}-lockup.png`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-devfest-blue px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                      >
                        <FaDownload className="size-3" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STICKERS & GLYPHS */}
          {activeTab === 'stickers' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Tech Stickers & Monoline Glyphs
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Official DevFest iconographic language. Use in hero layouts,
                    cards, and social templates.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'monoline', 'bold', 'sticker'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setStickerFilter(cat)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                        stickerFilter === cat
                          ? 'bg-devfest-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredGlyphs.map((glyph) => (
                  <div
                    key={glyph.id}
                    className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-devfest-blue hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="flex size-20 items-center justify-center rounded-xl bg-gray-50 p-2 transition-transform group-hover:scale-110 dark:bg-gray-950">
                      <img
                        src={glyph.url}
                        alt={glyph.name}
                        className="max-h-16 max-w-16 object-contain"
                      />
                    </div>
                    <span className="mt-3 text-xs font-bold text-gray-900 dark:text-white">
                      {glyph.name}
                    </span>
                    <a
                      href={glyph.url}
                      download={`devfest-glyph-${glyph.id}.png`}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-devfest-blue hover:underline dark:text-devfest-ht-blue"
                    >
                      <FaDownload className="size-2.5" /> PNG
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Role Badges & Stickers
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Official attendee, speaker, volunteer, organizer, and
                  Navigator badges.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {DEVFEST_ROLE_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="flex size-24 items-center justify-center rounded-2xl bg-gray-50 p-3 dark:bg-gray-950">
                      <img
                        src={badge.url}
                        alt={badge.name}
                        className="max-h-20 max-w-20 object-contain drop-shadow"
                      />
                    </div>
                    <span className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                      {badge.name}
                    </span>
                    <a
                      href={badge.url}
                      download={`role-${badge.id}.png`}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-devfest-blue hover:text-white dark:bg-gray-800 dark:text-gray-300 transition-colors"
                    >
                      <FaDownload className="size-2.5" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BANNERS & KEY ART */}
          {activeTab === 'banners' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Key Art & Event Banners
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Official hero illustrations, platform banners, and landing
                  page backdrops.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {DEVFEST_BANNERS.map((banner) => (
                  <div
                    key={banner.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="relative h-48 bg-gray-950 flex items-center justify-center p-4">
                      <img
                        src={banner.url}
                        alt={banner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          {banner.aspect}
                        </span>
                        <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                          {banner.name}
                        </h3>
                      </div>
                      <a
                        href={banner.url}
                        download={`${banner.id}.png`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-devfest-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                      >
                        <FaDownload className="size-3" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANIMATED & MOTION */}
          {activeTab === 'animated' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Motion Graphics & Announcement GIFs
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Animated brand loops for social posts, email newsletters, and
                  hero announcements.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {DEVFEST_ANIMATED.map((anim) => (
                  <div
                    key={anim.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="relative h-44 bg-gray-950 flex items-center justify-center p-2">
                      <img
                        src={anim.url}
                        alt={anim.name}
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-devfest-blue dark:text-devfest-ht-blue font-medium">
                          {anim.type}
                        </span>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                          {anim.name}
                        </h3>
                      </div>
                      <a
                        href={anim.url}
                        download={`${anim.id}.gif`}
                        className="rounded-lg bg-gray-100 p-2 text-gray-700 hover:bg-devfest-blue hover:text-white dark:bg-gray-800 dark:text-gray-300"
                      >
                        <FaDownload className="size-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Official Google Drive Templates
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access official editable Google Drawings, Google Slides decks,
                  and print layouts directly.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {OFFICIAL_TEMPLATE_LINKS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-devfest-blue hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div>
                      <span className="inline-block rounded-full bg-devfest-pastel-yellow px-2.5 py-1 text-xs font-semibold text-gray-900 dark:bg-devfest-yellow/20 dark:text-devfest-ht-yellow">
                        {item.category}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-devfest-blue px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-102"
                    >
                      Open in Drive{' '}
                      <FaArrowUpRightFromSquare className="size-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Brand Usage & Accessibility Guidelines
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rules for keeping DevFest and COMPASS branding consistent and
                  accessible across all media.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6 dark:border-green-900/40 dark:bg-green-950/20">
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <FaCheck className="size-4 text-green-600" /> Do
                  </h3>
                  <ul className="space-y-2 text-sm text-green-900 dark:text-green-200">
                    <li>
                      • Always maintain ample clear space around logo lockups
                      (minimum equal to the height of the &apos;D&apos;).
                    </li>
                    <li>
                      • Use official core colors (#4285F4, #34A853, #F9AB00,
                      #EA4335) for primary branding.
                    </li>
                    <li>
                      • Ensure minimum 4.5:1 text-to-background contrast ratio
                      (WCAG 2.1 AA).
                    </li>
                    <li>
                      • Use monoline glyphs as accents, track markers, and
                      supportive graphic elements.
                    </li>
                    <li>
                      • Pair Orbitron/Russell display headings with clean
                      Inter/Montserrat body typography.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-red-600" />{' '}
                    Don&apos;t
                  </h3>
                  <ul className="space-y-2 text-sm text-red-900 dark:text-red-200">
                    <li>
                      • Never distort, stretch, rotate, or skew the DevFest
                      wordmark or location lockups.
                    </li>
                    <li>
                      • Never place the full color logo on a busy photographic
                      background without a scrim.
                    </li>
                    <li>
                      • Do not invent unofficial color combinations outside the
                      core and halftone palette.
                    </li>
                    <li>
                      • Do not display private speaker contact details or
                      unverified emails on public assets.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
