import { useState, useEffect, useRef } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import { getAllSpeakers } from '@/utils/speakerRegistry'
import {
  DEVFEST_LOGOS,
  DEVFEST_GLYPHS,
  DEVFEST_ROLE_BADGES,
} from '@/utils/devfestBrandAssets'
import {
  FaDownload,
  FaPalette,
  FaShapes,
  FaIdBadge,
  FaSliders,
  FaCheck,
} from 'react-icons/fa6'

const templates = [
  { id: 'ig-post', name: 'Square (1:1)', width: 1080, height: 1080 },
  { id: 'tw-card', name: 'Social Promo (16:9)', width: 1200, height: 675 },
  { id: 'li-post', name: 'Banner (1.91:1)', width: 1200, height: 627 },
  { id: 'ig-story', name: 'Story (9:16)', width: 1080, height: 1920 },
]

const backgrounds = [
  {
    id: 'devfest-blue',
    name: 'Google Blue',
    class: 'bg-[#4285f4] text-white',
    color: '#4285f4',
  },
  {
    id: 'devfest-green',
    name: 'Google Green',
    class: 'bg-[#34a853] text-white',
    color: '#34a853',
  },
  {
    id: 'devfest-yellow',
    name: 'Google Yellow',
    class: 'bg-[#f9ab00] text-gray-950',
    color: '#f9ab00',
  },
  {
    id: 'devfest-red',
    name: 'Google Red',
    class: 'bg-[#ea4335] text-white',
    color: '#ea4335',
  },
  {
    id: 'devfest-dark',
    name: 'Dark 02 (#1E1E1E)',
    class: 'bg-[#1e1e1e] text-white',
    color: '#1e1e1e',
  },
  {
    id: 'compass-gold',
    name: 'COMPASS Gold',
    class: 'bg-[#efb403] text-gray-950',
    color: '#efb403',
  },
  {
    id: 'ht-blue',
    name: 'Halftone Cyan',
    class: 'bg-[#57caff] text-gray-950',
    color: '#57caff',
  },
  {
    id: 'ht-green',
    name: 'Halftone Green',
    class: 'bg-[#5cdb6d] text-gray-950',
    color: '#5cdb6d',
  },
  {
    id: 'pastel-blue',
    name: 'Pastel Blue',
    class: 'bg-[#c3ecf6] text-gray-950',
    color: '#c3ecf6',
  },
  {
    id: 'pastel-yellow',
    name: 'Pastel Yellow',
    class: 'bg-[#ffe7a5] text-gray-950',
    color: '#ffe7a5',
  },
  {
    id: 'gradient-devfest',
    name: 'DevFest Glow',
    class:
      'bg-gradient-to-br from-[#4285f4] via-[#6366f1] to-[#ea4335] text-white',
    color: '#4285f4',
  },
  {
    id: 'gradient-compass',
    name: 'Detroit Sunrise',
    class:
      'bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#efb403] text-white',
    color: '#efb403',
  },
]

const tracks = [
  'AI & Machine Learning',
  'Mobile & Android',
  'Cloud & DevOps',
  'Web & Frontend',
  'Cybersecurity',
  'Career & Leadership',
  'Community Keynote',
]

const SocialCardGeneratorPage = () => {
  const [speakers, setSpeakers] = useState([])
  const [template, setTemplate] = useState(templates[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [selectedSpeakerSlug, setSelectedSpeakerSlug] = useState('')
  const selectedLogo = DEVFEST_LOGOS[1] // 2026 logo
  const [selectedGlyph, setSelectedGlyph] = useState(DEVFEST_GLYPHS[0]) // spark
  const [selectedRole, setSelectedRole] = useState(DEVFEST_ROLE_BADGES[0]) // speaker
  const [isExporting, setIsExporting] = useState(false)
  const cardRef = useRef(null)

  const [manualMode, setManualMode] = useState(false)
  const [customData, setCustomData] = useState({
    name: 'Dr. Kimberly Vance',
    position: 'Lead AI Engineer',
    organization: 'Google Cloud & GDG Detroit',
    talkTitle: 'Building Resilient Agents with Gemini & Modern Web Standards',
    track: 'AI & Machine Learning',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  })

  const designOptions = {
    fontSize: 'M',
    showTrack: true,
    showYear: true,
    showRoleBadge: true,
    showGlyphSticker: true,
    eventName: 'Michigan DevFest 2026',
    tagline: 'compass-detroit.com',
  }

  useEffect(() => {
    setSpeakers(getAllSpeakers())
  }, [])

  const handleSpeakerChange = (e) => {
    const slug = e.target.value
    setSelectedSpeakerSlug(slug)

    if (slug) {
      const speaker = speakers.find((s) => s.slug === slug)
      if (speaker) {
        const session = speaker.sessions[0] || {}
        setCustomData({
          name: speaker.name || '',
          position: speaker.position || '',
          organization: speaker.organization || '',
          talkTitle: session.title || 'Innovative Detroit Tech Keynote',
          track: session.track || 'AI & Machine Learning',
          avatarUrl: speaker.avatar || customData.avatarUrl,
        })
      }
    }
  }

  const getFontSizeClass = (type) => {
    const scale = {
      S: {
        title: 'text-xl sm:text-2xl',
        name: 'text-lg sm:text-xl',
        subtitle: 'text-xs sm:text-sm',
      },
      M: {
        title: 'text-2xl sm:text-4xl',
        name: 'text-xl sm:text-2xl',
        subtitle: 'text-sm sm:text-base',
      },
      L: {
        title: 'text-3xl sm:text-5xl',
        name: 'text-2xl sm:text-3xl',
        subtitle: 'text-base sm:text-lg',
      },
    }
    return scale[designOptions.fontSize][type] || scale['M'][type]
  }

  const handleDownload = () => {
    setIsExporting(true)
    // Draw directly using canvas
    const canvas = document.createElement('canvas')
    canvas.width = template.width
    canvas.height = template.height
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = background.color || '#4285f4'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Inner card background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.roundRect(40, 40, canvas.width - 80, canvas.height - 80, 24)
    ctx.fill()

    // Title text
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 36px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(designOptions.eventName, canvas.width / 2, 100)

    ctx.font = 'bold 44px sans-serif'
    ctx.fillText(customData.name, canvas.width / 2, canvas.height / 2 + 60)

    ctx.font = '28px sans-serif'
    ctx.fillStyle = '#f0f0f0'
    ctx.fillText(
      `${customData.position} @ ${customData.organization}`,
      canvas.width / 2,
      canvas.height / 2 + 110
    )

    ctx.font = 'italic 34px sans-serif'
    ctx.fillStyle = '#ffd427'
    const talkSnippet = `"${customData.talkTitle.substring(0, 60)}${
      customData.talkTitle.length > 60 ? '...' : ''
    }"`
    ctx.fillText(talkSnippet, canvas.width / 2, canvas.height / 2 + 180)

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(designOptions.tagline, canvas.width / 2, canvas.height - 70)

    // Download file
    const link = document.createElement('a')
    link.download = `devfest-social-${customData.name
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()

    setTimeout(() => setIsExporting(false), 800)
  }

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-white transition-colors duration-200 dark:bg-gray-950 pt-20 pb-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-devfest-blue/10 via-transparent to-transparent opacity-60" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-devfest-blue/30 bg-devfest-pastel-blue/40 px-3.5 py-1 text-xs font-semibold text-devfest-blue dark:bg-devfest-blue/10 dark:text-devfest-ht-blue mb-3">
              <FaPalette className="size-3" />
              DevFest 2026 Social Studio
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-orbitron">
              Social Card <span className="text-devfest-yellow">Generator</span>
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Create high-impact, brand-aligned promotional cards with official
              2026 sticker sheets, role badges, and track tags.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Controls Panel */}
            <div className="w-full lg:w-5/12 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              {/* Template Format */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <FaSliders className="size-3.5 text-devfest-blue" />
                  Card Format
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t)}
                      className={`rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                        template.id === t.id
                          ? 'border-devfest-blue bg-devfest-pastel-blue/30 text-devfest-blue font-bold dark:border-devfest-ht-blue dark:bg-devfest-blue/20 dark:text-devfest-ht-blue'
                          : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div>{t.name}</div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        {t.width}×{t.height}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Selection */}
              <div>
                <div className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Brand Color & Gradient
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {backgrounds.map((bg) => (
                    <button
                      key={bg.id}
                      title={bg.name}
                      onClick={() => setBackground(bg)}
                      className={`h-10 w-full rounded-xl border-2 transition-transform hover:scale-105 ${
                        background.id === bg.id
                          ? 'border-gray-900 ring-2 ring-devfest-blue dark:border-white'
                          : 'border-black/10'
                      } ${bg.class}`}
                    />
                  ))}
                </div>
              </div>

              {/* Role Badge Selector */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <FaIdBadge className="size-3.5 text-devfest-green" />
                  Role Badge
                </div>
                <div className="flex flex-wrap gap-2">
                  {DEVFEST_ROLE_BADGES.slice(0, 6).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedRole.id === role.id
                          ? 'border-devfest-blue bg-devfest-blue text-white'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      <img
                        src={role.url}
                        alt={role.name}
                        className="size-4 object-contain"
                      />
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticker / Glyph Overlay */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <FaShapes className="size-3.5 text-devfest-yellow" />
                  Sticker Accent
                </div>
                <div className="flex flex-wrap gap-2">
                  {DEVFEST_GLYPHS.slice(0, 8).map((glyph) => (
                    <button
                      key={glyph.id}
                      onClick={() => setSelectedGlyph(glyph)}
                      className={`size-10 rounded-xl border p-1.5 transition-all ${
                        selectedGlyph.id === glyph.id
                          ? 'border-devfest-blue bg-devfest-pastel-blue/40 ring-2 ring-devfest-blue dark:bg-devfest-blue/20'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
                      }`}
                      title={glyph.name}
                    >
                      <img
                        src={glyph.url}
                        alt={glyph.name}
                        className="size-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Speaker / Content Details */}
              <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Content Details
                  </span>
                  <button
                    onClick={() => setManualMode(!manualMode)}
                    className="text-xs font-semibold text-devfest-blue hover:underline"
                  >
                    {manualMode ? 'Choose from Directory' : 'Custom Entry'}
                  </button>
                </div>

                {!manualMode ? (
                  <select
                    className="w-full rounded-xl border-gray-300 bg-gray-50 p-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    value={selectedSpeakerSlug}
                    onChange={handleSpeakerChange}
                  >
                    <option value="">Select a Speaker from Registry...</option>
                    {speakers.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} ({s.organization || 'Speaker'})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-xl border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      value={customData.name}
                      onChange={(e) =>
                        setCustomData({ ...customData, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Title / Role"
                      className="w-full rounded-xl border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      value={customData.position}
                      onChange={(e) =>
                        setCustomData({
                          ...customData,
                          position: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Company / Community"
                      className="w-full rounded-xl border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      value={customData.organization}
                      onChange={(e) =>
                        setCustomData({
                          ...customData,
                          organization: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Talk Title"
                      className="w-full rounded-xl border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      value={customData.talkTitle}
                      onChange={(e) =>
                        setCustomData({
                          ...customData,
                          talkTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {/* Track Selector */}
                <div className="mt-3">
                  <label
                    htmlFor="card-track-select"
                    className="mb-1 block text-xs text-gray-500 dark:text-gray-400"
                  >
                    Track
                  </label>
                  <select
                    id="card-track-select"
                    className="w-full rounded-xl border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    value={customData.track}
                    onChange={(e) =>
                      setCustomData({ ...customData, track: e.target.value })
                    }
                  >
                    {tracks.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Download Action */}
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-devfest-blue py-3.5 text-sm font-bold text-white shadow-lg shadow-devfest-blue/30 transition-all hover:bg-blue-600 hover:scale-102"
              >
                {isExporting ? (
                  <>
                    <FaCheck className="size-4 animate-bounce" /> Exporting
                    Card...
                  </>
                ) : (
                  <>
                    <FaDownload className="size-4" /> Download Branded PNG
                  </>
                )}
              </button>
            </div>

            {/* Live Interactive Preview Panel */}
            <div className="w-full lg:w-7/12 flex items-center justify-center overflow-auto rounded-3xl border border-gray-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900 min-h-[560px]">
              <div
                ref={cardRef}
                style={{
                  width: template.width,
                  height: template.height,
                  transform: `scale(${Math.min(
                    1,
                    540 / template.width,
                    500 / template.height
                  )})`,
                  transformOrigin: 'center center',
                }}
                className={`relative flex flex-col justify-between p-12 shadow-2xl transition-all rounded-3xl overflow-hidden ${background.class}`}
              >
                {/* Background decorative watermark */}
                {selectedGlyph && (
                  <img
                    src={selectedGlyph.url}
                    alt=""
                    className="pointer-events-none absolute -bottom-12 -right-12 size-80 opacity-15 invert dark:invert-0"
                  />
                )}

                {/* Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedLogo.url}
                      alt="DevFest 2026"
                      className="h-10 object-contain drop-shadow"
                    />
                  </div>

                  {selectedRole && (
                    <div className="flex items-center gap-2 rounded-full bg-black/25 px-4 py-1.5 backdrop-blur-md border border-white/20">
                      <img
                        src={selectedRole.url}
                        alt=""
                        className="size-6 object-contain"
                      />
                      <span className="text-sm font-bold tracking-wide uppercase">
                        {selectedRole.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Speaker & Presentation Focus */}
                <div className="my-auto flex flex-col items-center text-center px-4">
                  <div className="relative mb-6">
                    <img
                      src={customData.avatarUrl}
                      alt={customData.name}
                      className="size-44 rounded-3xl border-4 border-white/30 object-cover shadow-2xl bg-gray-300"
                    />
                    {selectedGlyph && (
                      <div className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-white p-2 shadow-lg dark:bg-gray-900">
                        <img
                          src={selectedGlyph.url}
                          alt=""
                          className="size-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <h2
                    className={`${getFontSizeClass(
                      'name'
                    )} font-extrabold tracking-tight leading-tight font-orbitron`}
                  >
                    {customData.name}
                  </h2>

                  <p
                    className={`${getFontSizeClass(
                      'subtitle'
                    )} mt-2 font-medium opacity-90`}
                  >
                    {customData.position}
                    {customData.position && customData.organization && ' · '}
                    {customData.organization}
                  </p>

                  <div className="mt-6 w-full max-w-xl rounded-2xl bg-black/30 p-6 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <p
                      className={`${getFontSizeClass(
                        'title'
                      )} font-bold text-devfest-pastel-yellow dark:text-devfest-ht-yellow leading-snug`}
                    >
                      &ldquo;{customData.talkTitle}&rdquo;
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
                        {customData.track}
                      </span>
                      <span className="rounded-full bg-devfest-yellow px-3.5 py-1 text-xs font-bold text-gray-950">
                        2026 Season
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs font-bold opacity-90">
                  <span className="tracking-wide">
                    {designOptions.eventName}
                  </span>
                  <span className="tracking-widest uppercase font-mono">
                    {designOptions.tagline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default SocialCardGeneratorPage
