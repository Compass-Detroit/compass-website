import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6'

const INTERESTS = [
  { id: 'events', label: 'Event Updates' },
  { id: 'news', label: 'Tech News' },
  { id: 'community', label: 'Community Highlights' },
  { id: 'jobs', label: 'Job Board' },
]

export default function NewsletterSignup({
  variant = 'card',
  showInterests = true,
  title = 'Subscribe to our Newsletter',
  subtitle = 'Get the latest updates from the COMPASS community.'
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedInterests, setSelectedInterests] = useState([])
  const [status, setStatus] = useState('idle') // idle, loading, success, error, already_subscribed
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Check if already subscribed
    const existing = localStorage.getItem('compass_newsletter_subscribers')
    if (existing) {
      try {
        const subscribers = JSON.parse(existing)
        // For simple demo, if there's any active subscription, we just assume they are subscribed on this machine
        if (subscribers && subscribers.length > 0) {
          setStatus('already_subscribed')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleInterestToggle = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      try {
        const existing = localStorage.getItem('compass_newsletter_subscribers')
        const subscribers = existing ? JSON.parse(existing) : []
        
        const newSubscriber = {
          email,
          name,
          interests: selectedInterests,
          subscribedAt: new Date().toISOString(),
          status: 'active'
        }

        localStorage.setItem('compass_newsletter_subscribers', JSON.stringify([...subscribers, newSubscriber]))
        setStatus('success')
      } catch (err) {
        setErrorMessage('Failed to subscribe. Please try again.')
        setStatus('error')
      }
    }, 1500)
  }

  const containerClasses = {
    card: 'rounded-3xl bg-white/50 p-8 shadow-xl backdrop-blur-xl border border-white/20 dark:bg-gray-900/50 dark:border-gray-700/30',
    inline: 'w-full',
    footer: 'text-sm'
  }

  if (status === 'already_subscribed') {
    return (
      <div className={`${containerClasses[variant]} text-center`}>
        <div className="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <FaCheckCircle className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">You're Subscribed!</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Thanks for being part of our community. Check your inbox for updates.
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={`${containerClasses[variant]} text-center animate-in fade-in zoom-in duration-500`}>
        <div className="mx-auto mb-4 inline-flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary animate-bounce">
          🎉
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome aboard! 🎉</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We've successfully added {email} to our newsletter.
        </p>
      </div>
    )
  }

  return (
    <div className={containerClasses[variant]}>
      {(title || subtitle) && variant !== 'inline' && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {variant !== 'footer' && (
          <input
            type="text"
            placeholder="Your Name (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-white"
          />
        )}
        
        <input
          type="email"
          required
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-white"
        />

        {showInterests && (
          <div className="mt-2">
            <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">I'm interested in:</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {INTERESTS.map((interest) => (
                <label key={interest.id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(interest.id)}
                    onChange={() => handleInterestToggle(interest.id)}
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                  />
                  {interest.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <FaExclamationCircle />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3.5 font-bold text-gray-900 shadow-md transition-all hover:scale-[1.02] active:scale-95 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === 'loading' ? (
            <FaSpinner className="animate-spin size-5" />
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  )
}

NewsletterSignup.propTypes = {
  variant: PropTypes.oneOf(['inline', 'card', 'footer']),
  showInterests: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string
}
