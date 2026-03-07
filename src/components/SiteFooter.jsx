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
    <footer role="contentinfo" className="border-t border-surface bg-[#050505]">
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
