import { useState } from 'react'
import QRCodeModal from './QRCodeModal'

import devfestQr from '/assets/qr/devfest-qr.png'
import devfestCfsQr from '/assets/qr/devfest-cfs-qr.png'
import compassQr from '/assets/qr/compass-qr.png'

export default function EventSpotlightSection() {
  const [activeModal, setActiveModal] = useState(null)

  return (
    <section className="relative overflow-hidden border-y border-surface bg-gradient-to-b from-black via-surface-card/40 to-black py-20">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-blue-600/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 size-96 rounded-full bg-amber-500/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
            <span className="size-2 animate-ping rounded-full bg-primary" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              2026 Featured Events Spotlight
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Upcoming Flagship{' '}
            <span className="bg-gradient-to-r from-primary via-amber-300 to-sky-400 bg-clip-text text-transparent">
              Gatherings
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-400">
            Join thousands of developers, designers, and innovators in Detroit.
            Save the dates and scan QR codes for direct access!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* DevFest 2026 Card */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#CD7F32]/50 bg-gradient-to-br from-blue-950 via-blue-900 to-black p-8 shadow-2xl transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[#FFD700]/10">
            <div className="absolute right-0 top-0 size-32 bg-[#1a73e8]/10 blur-2xl group-hover:bg-[#1a73e8]/20 transition-all" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-300">
                  Nov 2026 · MotorCity Casino Hotel
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 animate-pulse">
                  Lineup To Be Announced Soon!
                </span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CD7F32]/50 bg-[#CD7F32]/15 px-3 py-1 text-[11px] font-bold text-[#FFD700]">
                  <svg
                    className="size-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  Call for Speakers — Now Open!
                </span>
              </div>

              <h3 className="text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                Michigan DevFest 2026
              </h3>

              <p className="text-sm leading-relaxed text-gray-300 mb-6">
                Michigan&apos;s 12th annual flagship developer conference —
                co-produced by <strong>GDG Detroit</strong> &{' '}
                <strong>Compass Detroit</strong>. Featuring 50+ speakers across
                6 cutting-edge tracks: Cloud, AI/ML, Mobile, Web, Leadership,
                and Tech Innovation.
              </p>

              {/* Highlights & Partners */}
              <div className="mb-6 rounded-xl border border-surface bg-black/60 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Ecosystem Partners
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-300">
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    DevsCreate313
                  </span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    DTE Energy
                  </span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    NSBE Detroit
                  </span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    Little Caesars
                  </span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    Women Techmakers
                  </span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1">
                    SHPE Detroit
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-surface pt-4 mb-6">
                <div>
                  <div className="text-xl font-black text-[#FFD700]">
                    1,000+
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Attendees
                  </div>
                </div>
                <div className="border-x border-surface">
                  <div className="text-xl font-black text-[#FFD700]">50+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Speakers
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#FFD700]">6</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Tracks
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-surface">
              <a
                href="https://midevfest26.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 text-center rounded-xl bg-gradient-to-r from-[#1a73e8] to-[#CD7F32] px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-blue-600 hover:to-[#b8732d] transition-all hover:scale-[1.02]"
              >
                Visit DevFest 2026 Site →
              </a>
              <button
                onClick={() => setActiveModal('devfest-cfs')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#CD7F32]/50 bg-[#CD7F32]/10 px-4 py-3 text-sm font-bold text-[#FFD700] hover:bg-[#CD7F32]/20 transition-all"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
                Submit to Speak
              </button>
              <button
                onClick={() => setActiveModal('devfest')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-300 hover:bg-blue-500/20 transition-all"
              >
                <img
                  src={devfestQr}
                  alt="DevFest QR"
                  className="size-5 rounded"
                />
                Scan QR
              </button>
            </div>
          </div>

          {/* Hispanic Heritage Month (HHM) Card */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-surface-card to-black p-8 shadow-2xl transition-all duration-300 hover:border-amber-400/60 hover:shadow-amber-500/10">
            <div className="absolute right-0 top-0 size-32 bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="rounded-full border border-amber-400/30 bg-amber-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Sept 2026 · Detroit, MI
                </span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
                  More Info Coming Soon for HHM!
                </span>
              </div>

              <h3 className="text-3xl font-black text-white mb-3 tracking-tight group-hover:text-amber-200 transition-colors">
                Hispanic Heritage Month Innovation Summit (HHM)
              </h3>

              <p className="text-sm leading-relaxed text-gray-300 mb-6">
                Honoring Hispanic and Latinx contributions to technology with
                career-focused programming, mentorship, DEI advocacy, and direct
                employer networking in partnership with{' '}
                <strong>SHPE Detroit</strong> and{' '}
                <strong>Techqueria Detroit</strong>.
              </p>

              {/* Highlights & Focus */}
              <div className="mb-6 rounded-xl border border-surface bg-black/60 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Summit Features
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-300">
                  <span className="rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1">
                    Career Mentorship
                  </span>
                  <span className="rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1">
                    Tech Keynotes
                  </span>
                  <span className="rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1">
                    SHPE & Techqueria
                  </span>
                  <span className="rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1">
                    Employer Connections
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-surface pt-4 mb-6">
                <div>
                  <div className="text-xl font-black text-white">300+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Navigators
                  </div>
                </div>
                <div className="border-x border-surface">
                  <div className="text-xl font-black text-white">30+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Speakers
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-white">5</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Tracks
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-surface">
              <button
                disabled
                className="w-full sm:w-auto flex-1 text-center rounded-xl bg-gray-800/50 border border-gray-700 px-6 py-3 text-sm font-bold text-gray-500 cursor-not-allowed"
              >
                Stay Tuned — Details Coming Soon
              </button>
              <button
                onClick={() => setActiveModal('compass')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                <img
                  src={compassQr}
                  alt="Compass QR"
                  className="size-6 rounded"
                />
                Join COMPASS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modals */}
      <QRCodeModal
        isOpen={activeModal === 'devfest'}
        onClose={() => setActiveModal(null)}
        eventName="Michigan DevFest 2026"
        qrImage={devfestQr}
        qrLink="https://midevfest26.vercel.app/"
        subtext="Scan to visit the official Michigan DevFest 2026 site and stay tuned for the exciting lineup announcement!"
      />

      <QRCodeModal
        isOpen={activeModal === 'devfest-cfs'}
        onClose={() => setActiveModal(null)}
        eventName="DevFest 2026 — Call for Speakers"
        qrImage={devfestCfsQr}
        qrLink="https://midevfest26.vercel.app/"
        subtext="Scan to submit your talk proposal for Michigan DevFest 2026. We're looking for speakers across Cloud, AI/ML, Mobile, Web, Leadership, and Innovation tracks!"
      />

      <QRCodeModal
        isOpen={activeModal === 'compass'}
        onClose={() => setActiveModal(null)}
        eventName="COMPASS Detroit Community Access"
        qrImage={compassQr}
        qrLink="https://compass-detroit.com/get-involved"
        subtext="Scan to join COMPASS Detroit, access technical workshops, and connect with career opportunities."
      />
    </section>
  )
}
