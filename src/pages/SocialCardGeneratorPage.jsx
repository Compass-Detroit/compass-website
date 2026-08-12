import { useState, useEffect } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import { getAllSpeakers } from '@/utils/speakerRegistry'

const templates = [
  { id: 'ig-post', name: 'Instagram Post', width: 1080, height: 1080 },
  { id: 'tw-card', name: 'Twitter/X Card', width: 1200, height: 675 },
  { id: 'li-post', name: 'LinkedIn Post', width: 1200, height: 627 },
  { id: 'ig-story', name: 'Instagram Story', width: 1080, height: 1920 },
]

const backgrounds = [
  { id: 'bg-primary', name: 'Primary', class: 'bg-[#efb403]' },
  { id: 'bg-charcoal', name: 'Charcoal', class: 'bg-[#1f2937]' },
  { id: 'bg-pumpkin', name: 'Pumpkin', class: 'bg-[#FFA706]' },
  { id: 'bg-burnt', name: 'Burnt Orange', class: 'bg-[#EE7D33]' },
  { id: 'bg-lime', name: 'Lime', class: 'bg-[#00C605]' },
  { id: 'bg-indigo', name: 'Indigo', class: 'bg-[#6366f1]' },
  {
    id: 'bg-gradient-1',
    name: 'Gradient 1',
    class: 'bg-gradient-to-br from-primary to-pumpkin',
  },
  {
    id: 'bg-gradient-2',
    name: 'Gradient 2',
    class: 'bg-gradient-to-br from-gray-900 to-indigo-900',
  },
]

const SocialCardGeneratorPage = () => {
  const [speakers, setSpeakers] = useState([])

  const [template, setTemplate] = useState(templates[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [selectedSpeakerSlug, setSelectedSpeakerSlug] = useState('')

  const [manualMode, setManualMode] = useState(false)
  const [customData, setCustomData] = useState({
    name: 'Jane Doe',
    position: 'Senior Engineer',
    organization: 'Tech Corp',
    talkTitle: 'The Future of Web Development',
    track: 'Engineering',
    avatarUrl: 'https://i.pravatar.cc/300',
  })

  const [designOptions, setDesignOptions] = useState({
    fontSize: 'M',
    logoPosition: 'top-left',
    showTrack: true,
    showYear: true,
    eventName: 'Michigan DevFest 2026',
    tagline: 'compassdetroit.org',
  })

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
          talkTitle: session.title || 'Talk Title TBA',
          track: session.track || 'General',
          avatarUrl: speaker.avatar || 'https://i.pravatar.cc/300',
        })
      }
    }
  }

  const getFontSizeClass = (type) => {
    const scale = {
      S: { title: 'text-2xl', name: 'text-xl', subtitle: 'text-sm' },
      M: { title: 'text-4xl', name: 'text-2xl', subtitle: 'text-lg' },
      L: { title: 'text-5xl', name: 'text-3xl', subtitle: 'text-xl' },
    }
    return scale[designOptions.fontSize][type] || scale['M'][type]
  }

  const getLogoPositionClass = () => {
    switch (designOptions.logoPosition) {
      case 'top-left':
        return 'top-8 left-8'
      case 'top-right':
        return 'top-8 right-8'
      case 'bottom-left':
        return 'bottom-8 left-8'
      case 'bottom-right':
        return 'bottom-8 right-8'
      default:
        return 'top-8 left-8'
    }
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Social Card Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate branded social media assets for speakers and events.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Controls Panel */}
          <div className="w-full lg:w-1/3 space-y-6 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            {/* Template Selection */}
            <div>
              <label
                htmlFor="card-template"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Template
              </label>
              <select
                id="card-template"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={template.id}
                onChange={(e) =>
                  setTemplate(templates.find((t) => t.id === e.target.value))
                }
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.width}x{t.height})
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Content Input */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content Source
                </span>
                <button
                  onClick={() => setManualMode(!manualMode)}
                  className="text-xs text-primary hover:underline"
                >
                  {manualMode ? 'Use Directory' : 'Manual Entry'}
                </button>
              </div>

              {!manualMode ? (
                <div className="space-y-4">
                  <select
                    aria-label="Select a Speaker"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={selectedSpeakerSlug}
                    onChange={handleSpeakerChange}
                  >
                    <option value="">Select a Speaker...</option>
                    {speakers.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    aria-label="Speaker Name"
                    placeholder="Speaker Name"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                    value={customData.name}
                    onChange={(e) =>
                      setCustomData({ ...customData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    aria-label="Talk Title"
                    placeholder="Talk Title"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                    value={customData.talkTitle}
                    onChange={(e) =>
                      setCustomData({
                        ...customData,
                        talkTitle: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    aria-label="Organization"
                    placeholder="Organization"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
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
                    aria-label="Avatar URL"
                    placeholder="Avatar URL"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                    value={customData.avatarUrl}
                    onChange={(e) =>
                      setCustomData({
                        ...customData,
                        avatarUrl: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Design Options */}
            <div className="space-y-4">
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Background
              </span>
              <div className="grid grid-cols-4 gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    title={bg.name}
                    className={`h-10 w-full rounded-md border-2 ${background.id === bg.id ? 'border-gray-900 dark:border-white' : 'border-transparent'} ${bg.class}`}
                    onClick={() => setBackground(bg)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="card-font-size"
                    className="mb-1 block text-sm text-gray-600 dark:text-gray-400"
                  >
                    Font Size
                  </label>
                  <select
                    id="card-font-size"
                    className="w-full rounded-md border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={designOptions.fontSize}
                    onChange={(e) =>
                      setDesignOptions({
                        ...designOptions,
                        fontSize: e.target.value,
                      })
                    }
                  >
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="card-logo-position"
                    className="mb-1 block text-sm text-gray-600 dark:text-gray-400"
                  >
                    Logo Position
                  </label>
                  <select
                    id="card-logo-position"
                    className="w-full rounded-md border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={designOptions.logoPosition}
                    onChange={(e) =>
                      setDesignOptions({
                        ...designOptions,
                        logoPosition: e.target.value,
                      })
                    }
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={designOptions.showTrack}
                    onChange={(e) =>
                      setDesignOptions({
                        ...designOptions,
                        showTrack: e.target.checked,
                      })
                    }
                    className="rounded text-primary focus:ring-primary"
                  />
                  Show Track
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={designOptions.showYear}
                    onChange={(e) =>
                      setDesignOptions({
                        ...designOptions,
                        showYear: e.target.checked,
                      })
                    }
                    className="rounded text-primary focus:ring-primary"
                  />
                  Show Year
                </label>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-gray-500 italic mb-2">
                Note: Export functionality is coming soon. For now, please
                screenshot the preview.
              </p>
              <button
                disabled
                className="w-full rounded-lg bg-primary px-4 py-2 font-bold text-gray-900 opacity-50 cursor-not-allowed"
              >
                Copy as Image
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-full lg:w-2/3 flex items-center justify-center overflow-auto rounded-2xl bg-gray-100 p-8 dark:bg-gray-900 min-h-[600px]">
            {/* The scaled container to fit within the view */}
            <div
              style={{
                width: template.width,
                height: template.height,
                transform: `scale(${Math.min(1, 800 / template.width, 600 / template.height)})`,
                transformOrigin: 'center center',
              }}
              className={`relative overflow-hidden flex flex-col justify-between p-12 text-white shadow-2xl ${background.class}`}
            >
              {/* Logo */}
              <div
                className={`absolute ${getLogoPositionClass()} flex items-center gap-2 font-bold text-2xl tracking-tight`}
              >
                <span className="text-3xl">🧭</span>
                COMPASS Detroit
              </div>

              {/* Top/Middle Section: Speaker Info */}
              <div className="mt-16 flex flex-col items-center text-center">
                <img
                  src={customData.avatarUrl}
                  alt={customData.name}
                  className="mb-6 size-48 rounded-full border-4 border-white/20 object-cover shadow-xl bg-gray-300"
                />
                <h2
                  className={`${getFontSizeClass('name')} font-bold leading-tight`}
                >
                  {customData.name}
                </h2>
                <p
                  className={`${getFontSizeClass('subtitle')} font-medium opacity-80 mt-2`}
                >
                  {customData.position && <span>{customData.position}</span>}
                  {customData.position && customData.organization && (
                    <span> @ </span>
                  )}
                  {customData.organization && (
                    <span>{customData.organization}</span>
                  )}
                </p>
              </div>

              {/* Lower Section: Talk Info */}
              <div className="mb-10 w-full rounded-2xl bg-black/20 p-8 backdrop-blur-sm border border-white/10 text-center">
                <h1
                  className={`${getFontSizeClass('title')} font-extrabold leading-tight shadow-sm`}
                >
                  &quot;{customData.talkTitle}&quot;
                </h1>

                <div className="mt-6 flex justify-center gap-4">
                  {designOptions.showTrack && customData.track && (
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-lg font-semibold backdrop-blur-md">
                      {customData.track}
                    </span>
                  )}
                  {designOptions.showYear && (
                    <span className="rounded-full bg-primary/80 px-4 py-1.5 text-lg font-semibold text-gray-900 backdrop-blur-md">
                      2026
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="font-bold text-xl opacity-90">
                  {designOptions.eventName}
                </div>
                <div className="font-bold text-xl opacity-90">
                  {designOptions.tagline}
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
