import React from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import MemberProfileCard from '@/components/community/MemberProfileCard'
import { FaLock, FaCheckCircle, FaComments, FaHandshake } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SAMPLE_MEMBERS = [
  {
    name: 'Maya Chen',
    title: 'Senior ML Engineer',
    organization: 'Ford Motor Company',
    bio: 'Building autonomous vehicle models and passionate about AI ethics.',
    skills: ['Python', 'TensorFlow', 'MLOps', 'PyTorch'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'DeShawn Williams',
    title: 'Full-Stack Developer',
    organization: 'Rocket Companies',
    bio: 'React and Node enthusiast. Always learning new web technologies.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    github: 'https://github.com',
    twitter: 'https://twitter.com'
  },
  {
    name: 'Fatima Al-Hassan',
    title: 'UX Research Lead',
    organization: 'StockX',
    bio: 'Making e-commerce accessible and delightful for everyone.',
    skills: ['User Research', 'Figma', 'Design Systems', 'A/B Testing'],
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Marcus Thompson',
    title: 'DevOps Engineer',
    organization: 'Ally Financial',
    bio: 'Automating everything. Cloud infrastructure specialist.',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    name: 'Priya Patel',
    title: 'Data Scientist',
    organization: 'Blue Cross Blue Shield',
    bio: 'Turning healthcare data into actionable insights.',
    skills: ['R', 'SQL', 'Tableau', 'Python'],
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'James O\'Brien',
    title: 'iOS Developer',
    organization: 'Quicken Loans',
    bio: 'Crafting beautiful mobile experiences.',
    skills: ['Swift', 'SwiftUI', 'Core Data', 'Objective-C'],
    github: 'https://github.com'
  },
  {
    name: 'Aisha Robinson',
    title: 'Cybersecurity Analyst',
    organization: 'DTE Energy',
    bio: 'Keeping systems secure and monitoring threats.',
    skills: ['Pen Testing', 'SIEM', 'Python', 'Networking'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    name: 'Carlos Rivera',
    title: 'Cloud Architect',
    organization: 'General Motors',
    bio: 'Designing scalable enterprise cloud architectures.',
    skills: ['GCP', 'Microservices', 'Go', 'System Design'],
    website: 'https://example.com'
  }
]

const MemberDirectoryPage = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 pb-24 dark:bg-gray-900">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-gray-900 to-gray-900 opacity-60"></div>
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(239, 180, 3, 0.4), transparent 50%), radial-gradient(circle at 85% 30%, rgba(0, 198, 5, 0.4), transparent 50%)' }}></div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Community Directory
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Connect with the brightest minds in Detroit tech.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-grow group">
                <input 
                  type="text" 
                  disabled
                  placeholder="Search members by name, company, or skills..." 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-900/50"
                />
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Coming Q4 2026
                </div>
              </div>
              <div className="flex gap-2">
                {['Role', 'Skills', 'Availability'].map(filter => (
                  <div key={filter} className="relative group">
                    <button disabled className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700 dark:bg-gray-900/50">
                      {filter}
                    </button>
                    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      Coming Q4 2026
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Preview Area */}
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* The Glassmorphism Overlay */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-3xl bg-white/40 backdrop-blur-[6px] dark:bg-gray-900/60">
              <div className="rounded-3xl bg-white p-8 shadow-2xl text-center dark:bg-gray-800 border border-gray-100 dark:border-gray-700 max-w-md mx-4">
                <FaLock className="mx-auto mb-4 size-12 text-primary" />
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Directory Launching Soon</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  We're building the ultimate platform to connect Detroit's tech professionals. The full directory will be available in Q4 2026.
                </p>
                <Link 
                  to="/community-hub" 
                  className="inline-block w-full rounded-xl bg-gradient-to-r from-primary to-[#EE7D33] px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>

            {/* Background Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pointer-events-none select-none">
              {SAMPLE_MEMBERS.map((member, idx) => (
                <MemberProfileCard key={idx} {...member} />
              ))}
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What to expect</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">The features we're building for the upcoming directory.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <FaCheckCircle className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Verified Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Authentic connections with verified professionals working in and around the Detroit tech ecosystem.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <FaHandshake className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Skill Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find mentors, mentees, or project collaborators based on exact skill matches and availability.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <FaComments className="size-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Direct Messaging</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach out to community members directly, securely, and professionally through the platform.
              </p>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  )
}

export default MemberDirectoryPage
