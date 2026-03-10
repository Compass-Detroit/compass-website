import PropTypes from 'prop-types'
import SiteNavbar from '@/components/SiteNavbar'
import SiteFooter from '@/components/SiteFooter'
import ScrollProgressButton from '@/components/ui/ScrollProgressButton'

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] transition-colors duration-300">
      <SiteNavbar />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <ScrollProgressButton />
    </div>
  )
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
