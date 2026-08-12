import { useState, useEffect } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaHeading,
  FaCheckCircle,
} from 'react-icons/fa'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6'
import { IoInformationCircleOutline } from 'react-icons/io5'

const initialFormData = {
  fullName: '',
  email: '',
  organization: '',
  jobTitle: '',
  bio: '',
  talkTitle: '',
  talkAbstract: '',
  track: '',
  length: '',
  tags: [],
  experience: '',
  twitter: '',
  linkedin: '',
  github: '',
  photoUrl: '', // Using URL instead of actual file for this mockup
  agreed: false,
}

const tracks = [
  'Build with AI',
  'Mobile',
  'Cloud',
  'Web',
  'Leadership',
  'Innovation',
  'Fullstack',
  'Tech+Design',
  'Other',
]
const lengths = ['25 min Lightning', '40 min Standard', '60 min Workshop']
const availableTags = [
  'AI/ML',
  'Cloud',
  'Mobile',
  'Web',
  'DevOps',
  'Security',
  'Career',
  'Design',
  'Data',
  'Leadership',
]

const SpeakerSubmissionPage = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Calculate progress
    let requiredFields = [
      'fullName',
      'email',
      'talkTitle',
      'talkAbstract',
      'track',
      'length',
      'agreed',
    ]
    let filledFields = requiredFields.filter((field) => {
      if (field === 'agreed') return formData[field] === true
      return formData[field].length > 0
    })
    setProgress(Math.round((filledFields.length / requiredFields.length) * 100))
  }, [formData])

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.talkTitle.trim())
      newErrors.talkTitle = 'Talk Title is required'
    if (!formData.talkAbstract.trim())
      newErrors.talkAbstract = 'Talk Abstract is required'
    if (!formData.track) newErrors.track = 'Please select a track'
    if (!formData.length) newErrors.length = 'Please select a length'
    if (!formData.agreed)
      newErrors.agreed = 'You must agree to the Code of Conduct'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleTagToggle = (tag) => {
    setFormData((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
      return { ...prev, tags }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const existing = JSON.parse(
        localStorage.getItem('compass_speaker_submissions') || '[]'
      )
      localStorage.setItem(
        'compass_speaker_submissions',
        JSON.stringify([
          ...existing,
          { ...formData, id: Date.now(), status: 'pending' },
        ])
      )
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 pt-24 pb-32 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Confetti-style background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 size-full pointer-events-none">
              <div className="absolute top-10 left-1/4 size-4 bg-primary rounded-full animate-bounce"></div>
              <div
                className="absolute top-20 right-1/4 size-3 bg-lime-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="absolute top-1/3 left-1/3 size-5 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>

            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Proposal Submitted!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Thank you, {formData.fullName}. We&apos;ve received your proposal
              &quot;{formData.talkTitle}&quot;. Our team will review it and get
              back to you soon.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-left mb-8 shadow-inner">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Submission Details:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    Track:
                  </span>{' '}
                  {formData.track}
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    Length:
                  </span>{' '}
                  {formData.length}
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    Tags:
                  </span>{' '}
                  {formData.tags.join(', ') || 'None'}
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData(initialFormData)
                setProgress(0)
              }}
              className="bg-primary text-gray-900 font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform"
            >
              Submit Another
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"></div>
        <div
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Submit a{' '}
            <span className="bg-gradient-to-r from-primary to-lime-500 bg-clip-text text-transparent">
              Talk Proposal
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Share your expertise at COMPASS Detroit events. We&apos;re looking
            for innovative talks across all areas of tech.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8 sticky top-20 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-gray-700 dark:text-gray-300">
                Form Completion
              </span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Speaker Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Speaker Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="field-fullName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaUser />
                          </div>
                          <input
                            id="field-fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full pl-10 rounded-xl border ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white`}
                            placeholder="Jane Doe"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="field-email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaEnvelope />
                          </div>
                          <input
                            id="field-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 rounded-xl border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white`}
                            placeholder="jane@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="field-organization"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Organization / Company
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaBuilding />
                          </div>
                          <input
                            id="field-organization"
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white"
                            placeholder="Acme Corp"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="field-jobTitle"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Job Title
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaBriefcase />
                          </div>
                          <input
                            id="field-jobTitle"
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white"
                            placeholder="Senior Developer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <label
                          htmlFor="field-bio"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Bio
                        </label>
                        <span
                          className={`text-xs ${formData.bio.length > 500 ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {formData.bio.length}/500
                        </span>
                      </div>
                      <textarea
                        id="field-bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        maxLength="500"
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white resize-none"
                        placeholder="Short professional bio..."
                      />
                    </div>
                  </div>

                  {/* Talk Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Talk Details
                    </h3>

                    <div className="mb-6">
                      <label
                        htmlFor="field-talkTitle"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Talk Title *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <FaHeading />
                        </div>
                        <input
                          id="field-talkTitle"
                          type="text"
                          name="talkTitle"
                          value={formData.talkTitle}
                          onChange={handleChange}
                          className={`w-full pl-10 rounded-xl border ${errors.talkTitle ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white`}
                          placeholder="Catchy title for your talk"
                        />
                      </div>
                      {errors.talkTitle && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.talkTitle}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-1">
                        <label
                          htmlFor="field-talkAbstract"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Talk Abstract *
                        </label>
                        <span
                          className={`text-xs ${formData.talkAbstract.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {formData.talkAbstract.length}/1000
                        </span>
                      </div>
                      <textarea
                        id="field-talkAbstract"
                        name="talkAbstract"
                        value={formData.talkAbstract}
                        onChange={handleChange}
                        rows="6"
                        maxLength="1000"
                        className={`w-full rounded-xl border ${errors.talkAbstract ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white resize-none`}
                        placeholder="What will attendees learn? What is the core message?"
                      />
                      {errors.talkAbstract && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.talkAbstract}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="field-track"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Track *
                        </label>
                        <select
                          id="field-track"
                          name="track"
                          value={formData.track}
                          onChange={handleChange}
                          className={`w-full rounded-xl border ${errors.track ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white appearance-none`}
                        >
                          <option value="">Select a track</option>
                          {tracks.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        {errors.track && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.track}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Length Preference *
                        </span>
                        <div className="space-y-2">
                          {lengths.map((len) => (
                            <label
                              key={len}
                              className="flex items-center space-x-3 cursor-pointer group"
                            >
                              <input
                                type="radio"
                                name="length"
                                value={len}
                                checked={formData.length === len}
                                onChange={handleChange}
                                className="form-radio size-5 text-primary border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                              />
                              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                {len}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.length && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.length}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              formData.tags.includes(tag)
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 ring-1 ring-indigo-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="field-experience"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Previous Speaking Experience
                      </label>
                      <textarea
                        id="field-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white resize-none"
                        placeholder="Links to previous talks, conferences, etc. (Optional)"
                      />
                    </div>
                  </div>

                  {/* Links & Extras */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Links & Assets
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="field-twitter"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Twitter URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaTwitter />
                          </div>
                          <input
                            id="field-twitter"
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="field-linkedin"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          LinkedIn URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaLinkedin />
                          </div>
                          <input
                            id="field-linkedin"
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="field-github"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          GitHub URL
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FaGithub />
                          </div>
                          <input
                            id="field-github"
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label
                        htmlFor="field-photoUrl"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Profile Photo (URL)
                      </label>
                      <input
                        id="field-photoUrl"
                        type="text"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 flex items-start space-x-3">
                      <div className="pt-0.5">
                        <input
                          id="field-agreed"
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleChange}
                          className="form-checkbox size-5 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="field-agreed"
                          className="text-sm text-gray-700 dark:text-gray-300 block font-medium"
                        >
                          I agree to the COMPASS Detroit Code of Conduct *
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          We are committed to providing a safe, inclusive, and
                          welcoming environment for all participants.
                        </p>
                        {errors.agreed && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.agreed}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-primary text-gray-900 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <IoInformationCircleOutline className="text-primary text-2xl" />{' '}
                  Need Help?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  If you need assistance with your submission or have questions
                  about the process, our team is here to help.
                </p>
                <a
                  href="mailto:speakers@compassdetroit.com"
                  className="inline-block text-sm font-semibold text-primary hover:text-white transition-colors"
                >
                  speakers@compassdetroit.com
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Event Stats
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Expected Attendees
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      500+
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Speaking Slots
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      24
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Acceptance Rate
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ~15%
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  What we look for
                </h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>✓ Actionable takeaways for the audience</p>
                  <p>✓ Real-world case studies and examples</p>
                  <p>✓ Diverse perspectives and experiences</p>
                  <p>✓ Technical depth matching the track</p>
                  <p>✗ Sales pitches or vendor promotion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default SpeakerSubmissionPage
