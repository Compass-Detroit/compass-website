import { Link } from 'react-router-dom'
import { ReactComponent as CompassLogo } from '@/assets/images/compass-logo.svg'

const footerPrograms = [
  { label: 'Innovation Summits', to: '/programs' },
  { label: 'Hack Michigan', to: '/programs' },
  { label: 'Michigan DevFest', to: '/programs' },
  { label: 'Career Pathways', to: '/programs' },
]

const footerCommunity = [
  { label: 'For Navigators', to: '/community' },
  { label: 'For Employers', to: '/community' },
  { label: 'For Partners', to: '/community' },
  { label: 'Our Collective', to: '/about' },
]

export default function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border)] bg-[var(--surface-footer)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <CompassLogo
            className="h-28 w-auto"
            aria-label="Compass Detroit logo"
          />
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="max-w-[280px] text-[13px] leading-relaxed text-gray-600">
              Collective of Minority Professionals and STEAM Societies. A
              501(c)(3) nonprofit building career infrastructure for
              underrepresented tech talent in Michigan.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Programs
            </h3>
            <div className="flex flex-col gap-2.5">
              {footerPrograms.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[13px] text-gray-600 transition-colors hover:text-gray-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Community
            </h3>
            <div className="flex flex-col gap-2.5">
              {footerCommunity.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[13px] text-gray-600 transition-colors hover:text-gray-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Contact
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:jritten@compass-detroit.com"
                className="text-[13px] text-gray-600 transition-colors hover:text-gray-400"
              >
                jritten@compass-detroit.com
              </a>
              <span className="text-[13px] text-gray-600">810-441-3259</span>
              <span className="text-[13px] text-gray-600">
                Detroit, Michigan
              </span>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-8 flex items-center gap-5">
          <a
            href="https://github.com/Compass-Detroit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 transition-colors hover:text-primary"
          >
            <svg
              className="size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/compass-detroit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 transition-colors hover:text-primary"
          >
            <svg
              className="size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
          </a>
          <a
            href="https://x.com/CompassDetroit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-gray-500 transition-colors hover:text-primary"
          >
            <svg
              className="size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-surface pt-6 sm:flex-row">
          <span className="text-xs text-gray-700">
            © {new Date().getFullYear()} COMPASS. All rights reserved.
          </span>
          <span className="text-xs text-gray-700">
            501(c)(3) Nonprofit Organization
          </span>
        </div>
      </div>
    </footer>
  )
}
