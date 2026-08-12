import { Link } from 'react-router-dom'
const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)
const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)
import SiteLayout from '@/layouts/SiteLayout'
import hocLogo from '@/assets/images/sponsors/heartofthecity.jpg'

const photos = [
  '/assets/gallery/iwd26/image0.jpeg',
  '/assets/gallery/iwd26/image1.jpeg',
  '/assets/gallery/iwd26/image2.jpeg',
  '/assets/gallery/iwd26/image3.jpeg',
  '/assets/gallery/iwd26/image4.jpeg',
  '/assets/gallery/iwd26/image5.jpeg',
]

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline-block text-amber-400"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const PhotographerPage = () => {
  return (
    <SiteLayout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-grid-pattern absolute inset-0 pointer-events-none opacity-40" />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center reveal-stagger">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6 backdrop-blur-md">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Official Photography Partner
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              Heart of the City Photography
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent">
              x Shawn Lee Studios
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 mb-8">
            Capturing the energy, unity, and brilliance of Detroit&apos;s tech
            community.
          </p>

          <a
            href="https://www.hocxsls.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex mx-auto max-w-[320px] rounded-2xl border border-surface bg-surface-card/80 p-4 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 items-center justify-center"
          >
            <img
              src={hocLogo}
              alt="HOC x SLS Logo"
              className="w-full h-auto max-h-24 object-contain rounded-lg"
            />
          </a>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-12">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              About the Studio
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Shawn & Tay Lee
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
              <p>
                Heart of the City Photography x Shawn Lee Studios is a Metro
                Detroit-based photography studio led by Shawn and Tay Lee. With
                over 28 years of combined experience, they specialize in event
                photography, corporate portraits, and lifestyle shoots that
                capture authentic moments of connection and celebration.
              </p>
              <p>
                Their work with COMPASS Detroit has been nothing short of
                extraordinary — bringing tremendous energy and artistry to our
                IWD Innovation Summit, capturing the spirit of hundreds of
                attendees, speakers, and community leaders.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-extrabold text-white mb-2">
                  28+
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Years Combined Experience
                </div>
              </div>
              <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-extrabold text-white mb-2">
                  250+
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Event Attendees Captured
                </div>
              </div>
              <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-extrabold text-white mb-2">6</div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Group Photo Sessions
                </div>
              </div>
              <div className="rounded-xl border border-surface bg-surface-card p-6 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-extrabold text-white mb-2">1</div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Amazing Partnership
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gallery Showcase */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-12">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              IWD Summit Photography
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Moments that matter
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {photos.map((src, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-xl border border-surface hover:border-primary/40 transition-colors bg-surface-card aspect-video relative"
              >
                <img
                  src={src}
                  alt={`IWD Summit ${idx + 1}`}
                  className="size-full object-cover img-zoom"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Big Thank You Section */}
      <section className="bg-gradient-to-b from-primary/[0.06] to-transparent border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl flex items-center justify-center gap-3">
            Thank you, Shawn & Tay <HeartIcon />
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 mb-10">
            Your lens captured more than photographs — it captured the energy,
            connection, and shared purpose that makes our community
            extraordinary. COMPASS Detroit is proud to call Heart of the City
            Photography a partner in building pathways for Michigan&apos;s tech
            talent.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.hocxsls.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-colors hover:bg-primary-400 hover-lift"
            >
              Visit HOC x SLS
              <ExternalLinkIcon />
            </a>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-lg border border-surface bg-surface-card px-6 py-3 font-semibold text-white transition-colors hover:border-primary/30 hover:bg-surface hover-lift"
            >
              View Full Gallery
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bottom Navigation */}
      <section className="border-t border-surface pb-20">
        <div className="mx-auto max-w-[1200px] px-6 pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeftIcon />
              Back to Gallery
            </Link>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
            >
              View Upcoming Events
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default PhotographerPage
