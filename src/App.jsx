import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'

import Home from '@/pages/Home'
import CareersHub from '@/pages/CareersHub'
import ConnectionsPage from '@/pages/connections'
import MediaPage from '@/pages/media'
import PreviousEvents from '@/pages/PreviousEvents'
import PreviousEvent from '@/pages/PreviousEvent'
import NotFound from '@/pages/NotFound'

// Redesign pages
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ProgramsPage from '@/pages/ProgramsPage'
import CommunityPage from '@/pages/CommunityPage'
import EventsPage from '@/pages/EventsPage'
import PreviousEventsPage from '@/pages/PreviousEventsPage'
import GetInvolvedPage from '@/pages/GetInvolvedPage'
import ResourcesPage from '@/pages/ResourcesPage'
import NewsPage from '@/pages/NewsPage'
import TeamPage from '@/pages/TeamPage'
import GalleryPage from '@/pages/GalleryPage'
import PhotographerPage from '@/pages/PhotographerPage'
import ImpactReportPage from '@/pages/ImpactReportPage'
import SpeakersDirectoryPage from '@/pages/SpeakersDirectoryPage'
import SpeakerProfilePage from '@/pages/SpeakerProfilePage'
import CommunityHubPage from '@/pages/CommunityHubPage'
import NewsletterStudioPage from '@/pages/NewsletterStudioPage'
import ToolsPage from '@/pages/ToolsPage'
import SocialCardGeneratorPage from '@/pages/SocialCardGeneratorPage'
import QRCodeGeneratorPage from '@/pages/QRCodeGeneratorPage'
import SubscriberDashboardPage from '@/pages/SubscriberDashboardPage'
import MemberDirectoryPage from '@/pages/MemberDirectoryPage'
import SpeakerSubmissionPage from '@/pages/SpeakerSubmissionPage'
import GalleryManagerPage from '@/pages/GalleryManagerPage'
import AnalyticsDashboardPage from '@/pages/AnalyticsDashboardPage'
import TelemetryProvider from '@/components/TelemetryProvider'
import WebVitalsOverlay from '@/components/WebVitalsOverlay'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div role="document">
          {/* Skip Link - First element for accessibility */}
          <a
            className="absolute left-[6px] top-[-60px] z-[100] bg-white px-2 py-1 text-black focus:top-[6px]"
            href="#main-content"
          >
            Skip to main content
          </a>
          <TelemetryProvider>
            <Routes>
              {/* New redesign routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/previous" element={<PreviousEventsPage />} />
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
              <Route path="/speakers/:slug" element={<SpeakerProfilePage />} />
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
              <Route
                path="/tools/subscribers"
                element={<SubscriberDashboardPage />}
              />
              <Route path="/tools/gallery" element={<GalleryManagerPage />} />
              <Route
                path="/tools/analytics"
                element={<AnalyticsDashboardPage />}
              />
              <Route path="/submit-talk" element={<SpeakerSubmissionPage />} />
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
          </TelemetryProvider>
          <WebVitalsOverlay />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
