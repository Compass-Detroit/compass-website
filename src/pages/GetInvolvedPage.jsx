import SiteLayout from '@/layouts/SiteLayout'

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
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
  )
}

const pathways = [
  {
    audience: 'Tech Professionals & Students',
    tag: 'Navigators',
    title: 'Chart your course in tech',
    desc: "Join COMPASS as a Navigator and gain access to career-building events, professional development, mentorship, and a community that's invested in your success.",
    actions: [
      'Attend Innovation Summits and networking events',
      'Participate in Hack Michigan and Michigan DevFest',
      'Access career workshops, resume reviews, and mock interviews',
      'Connect with employers actively hiring diverse talent',
      'Join our community of 2,200+ tech professionals',
    ],
    cta: 'Become a Navigator',
    ctaHref: 'mailto:jritten@compass-detroit.com?subject=Become a Navigator',
  },
  {
    audience: 'Companies & Hiring Managers',
    tag: 'Employers',
    title: "Hire from Michigan's diverse tech talent pipeline",
    desc: "Access a curated community of prepared, underrepresented tech professionals. Our Navigators aren't just trained — they've been building professional networks, portfolios, and career readiness through COMPASS programming.",
    actions: [
      'Recruit at Innovation Summits and career events',
      'Sponsor Hack Michigan or Michigan DevFest',
      'Co-create co-op and internship pipelines',
      'Participate as industry mentors and panelists',
      'Access talent that reflects the diversity of Detroit',
    ],
    cta: 'Partner as an Employer',
    ctaHref: 'mailto:jritten@compass-detroit.com?subject=Employer Partnership',
  },
  {
    audience: 'Professional Organizations',
    tag: 'Coalition Partners',
    title: 'Build the collective together',
    desc: 'COMPASS operates as a collective — NSBE, SHPE, SWE, MCWT, GDG, Out in Tech, and more. If your organization serves underrepresented professionals in STEAM, join the collective and amplify your impact.',
    actions: [
      'Co-produce Innovation Summits and events',
      'Cross-refer community members and resources',
      'Share programming and professional development',
      'Expand your reach through coalition events',
      'Strengthen the regional ecosystem together',
    ],
    cta: 'Join the Collective',
    ctaHref: 'mailto:jritten@compass-detroit.com?subject=Coalition Partnership',
  },
  {
    audience: 'Corporate & Foundation Partners',
    tag: 'Sponsors',
    title: 'Invest in career infrastructure',
    desc: "Your support funds the programming, events, and resources that create real career outcomes for Navigators. COMPASS sponsorship isn't just brand visibility — it's direct investment in economic mobility.",
    actions: [
      'Fund Innovation Summits and community programming',
      'Sponsor Hack Michigan or Michigan DevFest',
      'Support Navigator scholarships and certifications',
      'Provide venue and technology resources',
      'Gain meaningful engagement with diverse tech talent',
    ],
    cta: 'Sponsor COMPASS',
    ctaHref: 'mailto:jritten@compass-detroit.com?subject=Sponsorship Inquiry',
  },
]

export default function GetInvolvedPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-24">
        <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
          Get Involved
        </p>
        <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
          There&apos;s a place for you at{' '}
          <span className="text-primary">COMPASS.</span>
        </h1>
        <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
          Whether you&apos;re a tech professional, a student, an employer, or a
          community organization — here&apos;s how to get started.
        </p>
      </section>

      {/* Pathways */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="flex flex-col gap-6">
            {pathways.map((pw) => (
              <div
                key={pw.tag}
                className="rounded-xl border border-surface bg-surface-card p-8 md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {pw.tag}
                    </span>
                    <p className="mb-2 text-[13px] font-medium text-gray-600">
                      {pw.audience}
                    </p>
                    <h2 className="mb-4 text-2xl font-bold tracking-tight">
                      {pw.title}
                    </h2>
                    <p className="leading-[1.7] text-gray-500">{pw.desc}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="flex flex-col gap-2.5">
                      {pw.actions.map((action) => (
                        <li
                          key={action}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D4A017"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="mt-0.5 shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-gray-400">{action}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={pw.ctaHref}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-400"
                    >
                      {pw.cta} <ArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
            Not sure where you fit?
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] leading-relaxed text-gray-500">
            Reach out and we&apos;ll help you find the right way to engage with
            COMPASS.
          </p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="mailto:jritten@compass-detroit.com"
              className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-primary-400"
            >
              jritten@compass-detroit.com
            </a>
            <span className="text-sm text-gray-600">810-441-3259</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
