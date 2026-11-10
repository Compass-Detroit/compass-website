import { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import TelemetryProvider from '@/components/TelemetryProvider'
import ScrollToTop from '@/components/ScrollToTop'
import WebVitalsOverlay from '@/components/WebVitalsOverlay'

// Each page loads on first visit, so the initial download only carries the
// shell (theme, router, navbar) and the page being opened.
const Home = lazy(() => import('@/pages/Home'))
const CareersHub = lazy(() => import('@/pages/CareersHub'))
const ConnectionsPage = lazy(() => import('@/pages/connections'))
const MediaPage = lazy(() => import('@/pages/media'))
const PreviousEvents = lazy(() => import('@/pages/PreviousEvents'))
const PreviousEvent = lazy(() => import('@/pages/PreviousEvent'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProgramsPage = lazy(() => import('@/pages/ProgramsPage'))
const CommunityPage = lazy(() => import('@/pages/CommunityPage'))
const EventsPage = lazy(() => import('@/pages/EventsPage'))
const PreviousEventsPage = lazy(() => import('@/pages/PreviousEventsPage'))
const GetInvolvedPage = lazy(() => import('@/pages/GetInvolvedPage'))
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const TeamPage = lazy(() => import('@/pages/TeamPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const PhotographerPage = lazy(() => import('@/pages/PhotographerPage'))
const ImpactReportPage = lazy(() => import('@/pages/ImpactReportPage'))
const SpeakersDirectoryPage = lazy(
  () => import('@/pages/SpeakersDirectoryPage')
)
const SpeakerProfilePage = lazy(() => import('@/pages/SpeakerProfilePage'))
const CommunityHubPage = lazy(() => import('@/pages/CommunityHubPage'))
const NewsletterStudioPage = lazy(() => import('@/pages/NewsletterStudioPage'))
const ToolsPage = lazy(() => import('@/pages/ToolsPage'))
const SocialCardGeneratorPage = lazy(
  () => import('@/pages/SocialCardGeneratorPage')
)
const QRCodeGeneratorPage = lazy(() => import('@/pages/QRCodeGeneratorPage'))
const SubscriberDashboardPage = lazy(
  () => import('@/pages/SubscriberDashboardPage')
)
const MemberDirectoryPage = lazy(() => import('@/pages/MemberDirectoryPage'))
const SpeakerSubmissionPage = lazy(
  () => import('@/pages/SpeakerSubmissionPage')
)
const GalleryManagerPage = lazy(() => import('@/pages/GalleryManagerPage'))
const AnalyticsDashboardPage = lazy(
  () => import('@/pages/AnalyticsDashboardPage')
)
const BrandKitPage = lazy(() => import('@/pages/BrandKitPage'))
const PlatformPage = lazy(() => import('@/pages/PlatformPage'))
const DevFestProgramPage = lazy(() => import('@/pages/DevFestProgramPage'))

// Holds the page's height and colour while its code loads, so the footer
// doesn't jump up and the background doesn't flash
function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="min-h-screen bg-[var(--surface)]"
    />
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div role="document">
          {/* Skip Link - First element for accessibility */}
          <a
            className="absolute left-[6px] top-[-60px] z-[100] bg-white px-2 py-1 text-black focus:top-[6px]"
            href="#main-content"
          >
            Skip to main content
          </a>
          <TelemetryProvider>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* New redesign routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route
                  path="/events/previous"
                  element={<PreviousEventsPage />}
                />
                <Route path="/devfest" element={<DevFestProgramPage />} />
                <Route path="/get-involved" element={<GetInvolvedPage />} />
                <Route path="/sponsor" element={<GetInvolvedPage />} />
                <Route path="/partner" element={<GetInvolvedPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route
                  path="/gallery/photographer"
                  element={<PhotographerPage />}
                />
                <Route path="/impact" element={<ImpactReportPage />} />
                <Route path="/speakers" element={<SpeakersDirectoryPage />} />
                <Route
                  path="/speakers/:slug"
                  element={<SpeakerProfilePage />}
                />
                <Route path="/community-hub" element={<CommunityHubPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route
                  path="/tools/newsletter"
                  element={<NewsletterStudioPage />}
                />
                <Route
                  path="/tools/social-cards"
                  element={<SocialCardGeneratorPage />}
                />
                <Route path="/tools/qr" element={<QRCodeGeneratorPage />} />
                <Route path="/platform" element={<PlatformPage />} />
                <Route
                  path="/tools/subscribers"
                  element={<SubscriberDashboardPage />}
                />
                <Route path="/tools/gallery" element={<GalleryManagerPage />} />
                <Route
                  path="/tools/analytics"
                  element={<AnalyticsDashboardPage />}
                />
                <Route path="/brand" element={<BrandKitPage />} />
                <Route path="/tools/brand-kit" element={<BrandKitPage />} />
                <Route
                  path="/submit-talk"
                  element={<SpeakerSubmissionPage />}
                />
                <Route path="/members" element={<MemberDirectoryPage />} />

                {/* Legacy routes (existing pages still accessible) */}
                <Route path="/legacy" element={<Home />} />
                <Route path="/careers-hub" element={<CareersHub />} />
                <Route path="/connections" element={<ConnectionsPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/previous-events" element={<PreviousEvents />} />
                <Route
                  path="/previous-events/:year"
                  element={<PreviousEvent />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </TelemetryProvider>
          <WebVitalsOverlay />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
