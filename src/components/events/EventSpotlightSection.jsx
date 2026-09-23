import { useState } from 'react'
import { Link } from 'react-router-dom'
import QRCodeModal from './QRCodeModal'
import {
  LHM_EVENT,
  LHM_SESSIONS,
  SpeakersData as lhmSpeakers,
} from '@/data/2026/lhmSummit'
import { sanityImage } from '@/services/sanity'
import { DEVFEST_2026 } from '@/data/2026/devfest'

const devfestQr = '/assets/qr/devfest-qr.png'
const devfestCfsQr = '/assets/qr/devfest-cfs-qr.png'

export default function EventSpotlightSection() {
  const [activeModal, setActiveModal] = useState(null)

  return (
    <section className="dark-surface relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-surface-card/40 to-black py-20">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-blue-600/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 size-96 rounded-full bg-amber-500/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
            <span className="size-2 rounded-full bg-primary motion-safe:animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              2026 Featured Events Spotlight
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Flagship{' '}
            <span className="bg-gradient-to-r from-primary via-amber-300 to-sky-400 bg-clip-text text-transparent">
              Gatherings
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-400">
            Up next: Michigan DevFest 2026. Just wrapped: our Latin Heritage
            Month Innovation Summit at Wayne State.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* DevFest 2026 Card */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#CD7F32]/50 bg-gradient-to-br from-blue-950 via-blue-900 to-black p-8 shadow-2xl transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[#FFD700]/10">
            <div className="absolute right-0 top-0 size-32 bg-[#1a73e8]/10 blur-2xl group-hover:bg-[#1a73e8]/20 transition-all" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-300">
                  Nov 13–14 · Little Caesars HQ
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 motion-safe:animate-pulse">
                  Registration Open
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
                <strong>Compass Detroit</strong>. Featuring 30+ speakers, an AI
                Hackathon on Nov 13 and a full conference on Nov 14. Tracks to
                be announced.
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
                  <div className="text-xl font-black text-[#FFD700]">300+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Attendees
                  </div>
                </div>
                <div className="border-x border-surface">
                  <div className="text-xl font-black text-[#FFD700]">30+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Speakers
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#FFD700]">TBD</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">
                    Tracks
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-surface">
              <a
                href={DEVFEST_2026.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 text-center rounded-xl bg-gradient-to-r from-[#1a73e8] to-[#CD7F32] px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-blue-600 hover:to-[#b8732d] transition-all hover:scale-[1.02]"
              >
                Register for DevFest 2026 →
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

          {/* LHM Innovation Summit 2026 — just wrapped */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/60 via-stone-950 to-black p-8 shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-amber-400/60 hover:shadow-amber-500/10">
            <div className="absolute right-0 top-0 size-32 bg-amber-500/10 blur-2xl transition-colors group-hover:bg-amber-500/20" />

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-amber-400/30 bg-amber-500/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Sept 19, 2026 · Wayne State
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  Just Wrapped — Gracias, Detroit!
                </span>
              </div>

              <h3 className="mb-3 text-3xl font-black tracking-tight text-white transition-colors group-hover:text-amber-200">
                {LHM_EVENT.name}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-gray-300">
                A full day of talks, a SHPE Detroit lunch talk, an industry
                panel, Engineering Lotería and a fiesta at the WSU Anderson
                Engineering Building — with <strong>SHPE Detroit</strong>,{' '}
                <strong>Techqueria Detroit</strong> and{' '}
                <strong>Wayne State College of Engineering</strong>.
              </p>

              <div className="mb-6 rounded-xl border border-surface bg-black/60 p-4">
                <div className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  On Stage
                </div>
                <ul className="flex -space-x-3" aria-label="Summit speakers">
                  {lhmSpeakers.slice(0, 8).map((speaker) => (
                    <li key={speaker.name}>
                      <img
                        src={sanityImage(speaker.avatar, { w: 96, h: 96 })}
                        alt={speaker.name}
                        title={speaker.name}
                        width="40"
                        height="40"
                        loading="lazy"
                        className="size-10 rounded-full border-2 border-black object-cover transition-transform duration-200 hover:z-10 hover:-translate-y-1"
                      />
                    </li>
                  ))}
                  {lhmSpeakers.length > 8 && (
                    <li className="flex size-10 items-center justify-center rounded-full border-2 border-black bg-amber-500/20 text-xs font-bold text-amber-200">
                      +{lhmSpeakers.length - 8}
                    </li>
                  )}
                </ul>
              </div>

              <div className="mb-6 grid grid-cols-3 gap-3 border-t border-surface pt-4 text-center">
                <div>
                  <div className="text-xl font-black text-white">
                    {lhmSpeakers.length}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-gray-500">
                    Speakers
                  </div>
                </div>
                <div className="border-x border-surface">
                  <div className="text-xl font-black text-white">
                    {LHM_SESSIONS.length}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-gray-500">
                    Sessions
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-white">20+</div>
                  <div className="text-[10px] font-bold uppercase text-gray-500">
                    Orgs Represented
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 border-t border-surface pt-4 sm:flex-row">
              <Link
                to="/events/previous?type=lhm"
                className="w-full flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-center text-sm font-bold text-black shadow-lg transition-transform hover:scale-[1.02] sm:w-auto"
              >
                Relive the Summit →
              </Link>
              <a
                href={LHM_EVENT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-bold text-amber-300 transition-colors hover:bg-amber-500/20 sm:w-auto"
              >
                Summit Site
                <span className="sr-only">(opens in a new tab)</span>
              </a>
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
        qrLink={DEVFEST_2026.cfsUrl}
        subtext="Scan to open the Michigan DevFest 2026 call for speakers — Nov 13 AI Hackathon, Nov 14 Conference at Little Caesars HQ."
      />

      <QRCodeModal
        isOpen={activeModal === 'devfest-cfs'}
        onClose={() => setActiveModal(null)}
        eventName="DevFest 2026 — Call for Speakers"
        qrImage={devfestCfsQr}
        qrLink={DEVFEST_2026.cfsUrl}
        subtext="Scan to submit your talk proposal for Michigan DevFest 2026. Tracks are still being shaped, so pitch the talk you want to give!"
      />
    </section>
  )
}
