import { useState } from 'react'
import MemberProfileCard from './MemberProfileCard'

const COMMON_SKILLS = [
  'React',
  'Python',
  'AI/ML',
  'Cloud',
  'Mobile',
  'DevOps',
  'UX/UI',
  'Cybersecurity',
  'Data Science',
  'Blockchain',
  'IoT',
  'Node.js',
  'AWS',
  'TypeScript',
  'Leadership',
  'Product Management',
]

const ProfileCardBuilder = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    organization: '',
    avatar: null,
    bio: '',
    skills: [],
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    email: '',
  })

  const [customSkill, setCustomSkill] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4))
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) }
      }
      return { ...prev, skills: [...prev.skills, skill] }
    })
  }

  const addCustomSkill = (e) => {
    e.preventDefault()
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()],
      }))
      setCustomSkill('')
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email) {
      localStorage.setItem(
        'compass_community_waitlist',
        JSON.stringify(formData)
      )
      setSubmitted(true)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
      {/* Left side: Builder Form */}
      <div className="flex-1 rounded-3xl bg-white/50 p-6 shadow-lg backdrop-blur-md dark:bg-gray-800/50 sm:p-8">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 dark:bg-gray-700 z-0"></div>
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 z-0"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`relative z-10 flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                step >= num
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[350px]">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Basic Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                      placeholder="Jane Doe"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title / Position
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                      placeholder="Senior Software Engineer"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company / Organization
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                      placeholder="Tech Corp"
                    />
                  </label>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Photo
                  </span>
                  <div className="flex w-full items-center justify-center">
                    <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG up to 2MB
                        </p>
                      </div>
                      <input
                        type="file"
                        aria-label="Upload profile photo"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Skills & Interests
              </h2>

              <div className="mb-6 flex flex-wrap gap-2">
                {COMMON_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-primary text-primary-900 shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <form onSubmit={addCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  aria-label="Add custom skill"
                  className="flex-1 rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                  placeholder="Add a custom skill..."
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gray-900 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Add
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Social Links & Bio
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Short Bio / Tagline
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={2}
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white resize-none"
                      placeholder="Passionate about building great products and empowering developers."
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub URL
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                        placeholder="https://github.com/username"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      LinkedIn URL
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Twitter/X URL
                      <input
                        type="url"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                        placeholder="https://twitter.com/username"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Personal Website
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                        placeholder="https://yourwebsite.com"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Love your card?
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Join the waitlist to claim your profile when we launch the full
                community platform.
              </p>

              {submitted ? (
                <div className="rounded-2xl bg-green-50 p-6 text-center border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                    You&apos;re on the list!{' '}
                    <span role="img" aria-label="Party popper">
                      🎉
                    </span>
                  </h3>
                  <p className="text-green-700 dark:text-green-500 text-sm">
                    We&apos;ve saved your profile preview. We&apos;ll email you
                    when the platform goes live!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900/50 dark:text-white"
                        placeholder="jane@example.com"
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-lime-500 px-6 py-3 font-bold text-gray-900 shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Claim My Profile
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`rounded-xl px-6 py-2 font-medium transition-colors ${
              step === 1
                ? 'invisible'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Back
          </button>

          {step < 4 ? (
            <div className="flex gap-3">
              <button
                onClick={handleNext}
                className="rounded-xl px-6 py-2 font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="rounded-xl bg-gray-900 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-md"
              >
                Next Step
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Right side: Live Preview */}
      <div className="flex flex-1 items-center justify-center p-4 lg:p-0">
        <div className="sticky top-24 w-full max-w-[350px]">
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Live Preview
          </h3>
          <MemberProfileCard {...formData} />
        </div>
      </div>
    </div>
  )
}

export default ProfileCardBuilder
