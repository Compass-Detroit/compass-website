import { Link } from 'react-router-dom'
import devfestImg from '@assets/images/generated/devfest-conference.png'
import iwdImg from '@assets/images/generated/women-in-tech.png'
import prideImg from '@assets/images/generated/pride-summit.png'
import hackathonImg from '@assets/images/generated/hackathon-scene.png'
import innovationImg from '@assets/images/generated/innovation-summit.png'

const eventSites = [
  {
    name: 'Michigan DevFest',
    url: 'https://midevfest.com',
    accent: 'bg-blue-500/10 text-blue-400',
    tag: '12th Annual',
    description:
      "Michigan's premier developer conference featuring AI/ML, cloud, mobile, and full-stack tracks",
    date: 'November 2026 · 1,000+ Attendees',
    image: devfestImg,
    live: true,
  },
  {
    name: 'IWD Innovation Summit',
    url: 'https://bit.ly/det-iwd-25-website',
    accent: 'bg-purple-500/10 text-purple-400',
    tag: '4th Annual',
    description:
      "International Women's Day celebration with 8 tracks and 120+ companies",
    date: 'March 2026 · Detroit, MI',
    image: iwdImg,
    live: true,
  },
  {
    name: 'Detroit Pride Innovation Summit',
    url: 'https://www.detroitpridesummit.com/',
    accent: 'bg-amber-500/10 text-amber-400',
    tag: '2nd Annual',
    description:
      "Celebrating LGBTQ+ leaders, technologists, and allies in Michigan's tech ecosystem",
    date: 'June 2026 · IBM Detroit',
    image: prideImg,
    live: true,
  },
  {
    name: 'BHM Innovation Summit',
    url: 'https://bit.ly/bhm-summit-website',
    accent: 'bg-orange-500/10 text-orange-400',
    tag: '4th Annual',
    description:
      'Celebrating Black excellence in technology with keynotes, panels, and networking focused on career advancement',
    date: 'February 2026 · Detroit, MI',
    image: innovationImg,
    live: true,
  },
  {
    name: 'AI Hackathon',
    url: 'http://ibm.biz/agentic-ai-hackathon',
    accent: 'bg-cyan-500/10 text-cyan-400',
    tag: '2nd Annual',
    description:
      'Hands-on agentic AI hackathon building real-world solutions with IBM and partners',
    date: 'Summer 2026 · Detroit, MI',
    image: hackathonImg,
    live: true,
  },
  {
    name: 'Hack Michigan',
    url: '/events',
    accent: 'bg-emerald-500/10 text-emerald-400',
    tag: '3rd Annual',
    description:
      'Team-based hackathon with industry mentorship and portfolio building',
    date: 'Date TBD · Detroit, MI',
    image: hackathonImg,
    live: false,
  },
]

export default function EventWebsitesGallery() {
  return (
    <section className="border-t border-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Event Platforms
          </p>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Our Event Platforms
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-500">
            Each event has its own dedicated experience
          </p>
        </div>

        {/* Cards grid */}
        <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventSites.map((event) => (
            <article
              key={event.name}
              className="hover-lift group rounded-xl border border-surface bg-surface-card transition-colors hover:border-primary/30"
            >
              {/* Image container */}
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={event.image}
                  alt={event.name}
                  className="img-zoom size-full object-cover"
                  loading="lazy"
                />
                {/* Tag pill */}
                <span
                  className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${event.accent}`}
                >
                  {event.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-[15px] font-bold">{event.name}</h3>
                <p className="mb-3 text-[13px] leading-relaxed text-gray-500">
                  {event.description}
                </p>
                <p className="mb-4 text-[12px] font-medium text-gray-600">
                  {event.date}
                </p>

                {/* CTA */}
                <div className="mt-auto">
                  {event.live ? (
                    event.url.startsWith('/') ? (
                      <Link
                        to={event.url}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:text-primary-400"
                      >
                        Learn More
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary transition-colors hover:text-primary-400"
                      >
                        Visit Website
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    )
                  ) : (
                    <span className="text-[13px] font-semibold text-gray-600">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
