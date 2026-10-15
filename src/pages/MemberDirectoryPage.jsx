import SiteLayout from '@/layouts/SiteLayout'
import { FaCheckCircle, FaComments, FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WAITLIST_URL = `mailto:whatupdoe@compass-detroit.com?${new URLSearchParams(
  {
    subject: 'Member directory waitlist',
    body: 'Please let me know when the Compass Detroit member directory launches.\n\nName:\nCompany / school:\nWhat I would like to connect on:',
  }
)
  .toString()
  .replace(/\+/g, '%20')}`

const MemberDirectoryPage = () => {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gray-50 pb-24 dark:bg-gray-900">
        <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-gray-900 to-gray-900 opacity-40"></div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Community Directory
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-100">
              A place to find and connect with people across Detroit tech.
            </p>
          </div>
        </section>

        {/* Honest status: no member accounts or profiles exist yet */}
        <div className="relative z-20 mx-auto -mt-10 max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              The member directory isn&apos;t live yet
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We&apos;re still building member profiles and sign-in, and
              there&apos;s no launch date yet. Email us to be told when it
              opens. In the meantime, browse our speakers and partner
              communities.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={WAITLIST_URL}
                className="rounded-xl bg-primary px-6 py-3 font-bold text-gray-950 shadow transition-colors hover:bg-primary-400"
              >
                Email me when it launches
              </a>
              <Link
                to="/community-hub"
                className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-900 transition-colors hover:border-primary dark:border-gray-600 dark:text-white"
              >
                Visit the Community Hub
              </Link>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What to expect
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              What we&apos;re planning for the directory.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <FaCheckCircle className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Verified Profiles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Authentic connections with verified professionals working in and
                around the Detroit tech ecosystem.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <FaHandshake className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Skill Matching
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find mentors, mentees, or project collaborators based on exact
                skill matches and availability.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <FaComments className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Direct Messaging
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach out to community members directly, securely, and
                professionally through the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

export default MemberDirectoryPage
