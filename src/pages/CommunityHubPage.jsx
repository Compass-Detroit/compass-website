import React, { useState, useEffect } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import ProfileCardBuilder from '@/components/community/ProfileCardBuilder'
import { FaMicrophone, FaUser, FaUsers, FaNewspaper } from 'react-icons/fa6'
import { FaCheckCircle, FaHourglassHalf, FaSync } from 'react-icons/fa'

const CommunityHubPage = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Target date: October 1, 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-01T00:00:00')

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      localStorage.setItem('compass_community_early_access', email)
      setSubscribed(true)
      setEmail('')
    }
  }

  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32 dark:bg-gray-900">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-500/20 via-transparent to-transparent opacity-70"></div>
        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary-900 dark:bg-primary/20 dark:text-primary-300">
            Coming Q3 2026
          </span>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            The Detroit Tech <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-lime-500 bg-clip-text text-transparent">Community Platform</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            A more tailored LinkedIn for the Detroit tech scene and our global reach. Connect, collaborate, and grow your professional identity.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={scrollToDemo}
              className="w-full rounded-xl bg-gray-900 px-8 py-4 font-bold text-white shadow-xl transition-transform hover:scale-105 dark:bg-white dark:text-gray-900 sm:w-auto"
            >
              Try the Interactive Demo
            </button>
            <button
              onClick={scrollToWaitlist}
              className="w-full rounded-xl bg-white px-8 py-4 font-bold text-gray-900 shadow-xl ring-1 ring-inset ring-gray-200 transition-transform hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700 sm:w-auto"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-24 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What We're Building
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A comprehensive ecosystem designed specifically for our community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 dark:bg-gray-900">
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <FaMicrophone className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Speaker Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Permanent profile pages for every speaker who's graced our stage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 dark:bg-gray-900">
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-600 dark:bg-primary/20 dark:text-primary-400">
                <FaUser className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Member Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your professional identity in the Detroit tech ecosystem.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 dark:bg-gray-900">
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400">
                <FaUsers className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Community Spaces</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Subcommittee and team collaboration spaces for members.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 dark:bg-gray-900">
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                <FaNewspaper className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Community updates and insights delivered right to your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="border-y border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 shadow-2xl dark:from-gray-800 dark:to-gray-700 sm:p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Full Platform Launching Q3 2026
              </h2>
              
              {/* Countdown Timer */}
              <div className="mt-8 flex justify-center gap-4 sm:gap-8 text-white">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold sm:text-5xl">{timeLeft.days}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Days</span>
                </div>
                <span className="text-4xl font-bold text-gray-600">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold sm:text-5xl">{timeLeft.hours}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Hours</span>
                </div>
                <span className="text-4xl font-bold text-gray-600">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold sm:text-5xl">{timeLeft.minutes}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Mins</span>
                </div>
                <span className="text-4xl font-bold text-gray-600">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-primary sm:text-5xl">{timeLeft.seconds}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Secs</span>
                </div>
              </div>
            </div>

            {/* Phase Indicators */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center rounded-xl bg-white/10 p-4 text-center">
                <FaCheckCircle className="mb-2 size-6 text-green-400" />
                <span className="text-sm font-semibold text-white">Phase 1</span>
                <span className="text-xs text-gray-300">Speaker Network</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-white/10 p-4 text-center border-b-2 border-primary">
                <FaSync className="mb-2 size-6 text-primary animate-spin-slow" style={{ animationDuration: '3s' }} />
                <span className="text-sm font-semibold text-white">Phase 2</span>
                <span className="text-xs text-primary-300">Profile Cards</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-white/5 p-4 text-center opacity-70">
                <FaHourglassHalf className="mb-2 size-6 text-gray-400" />
                <span className="text-sm font-semibold text-white">Phase 3</span>
                <span className="text-xs text-gray-400">Community Spaces</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-white/5 p-4 text-center opacity-70">
                <FaHourglassHalf className="mb-2 size-6 text-gray-400" />
                <span className="text-sm font-semibold text-white">Phase 4</span>
                <span className="text-xs text-gray-400">Full Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo-section" className="bg-gray-50 py-24 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Build Your Profile Card
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Preview what your community profile will look like when we launch.
            </p>
          </div>
          
          <ProfileCardBuilder />
        </div>
      </section>

      {/* Early Access Section */}
      <section id="waitlist-section" className="bg-white py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Be among the first to join
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Join the waitlist to secure your spot and receive exclusive updates leading up to the launch.
          </p>
          
          <div className="mt-10 mx-auto max-w-md">
            {subscribed ? (
              <div className="rounded-2xl bg-green-50 p-6 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <p className="text-lg font-semibold text-green-800 dark:text-green-400">
                  Thank you for joining the waitlist! We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-8 py-4 font-bold text-gray-900 shadow-md transition-transform hover:scale-105 shrink-0"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
          
          <p className="mt-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            Join <span className="text-gray-900 dark:text-white">1,200+</span> community members across <span className="text-gray-900 dark:text-white">120+</span> companies
          </p>
        </div>
      </section>
    </PageLayout>
  )
}

export default CommunityHubPage
