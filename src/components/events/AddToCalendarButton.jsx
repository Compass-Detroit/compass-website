import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  downloadICS,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
} from '@/utils/generateICS'

const CalendarPlusIcon = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <line x1="12" y1="14" x2="12" y2="18"></line>
    <line x1="10" y1="16" x2="14" y2="16"></line>
  </svg>
)

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const GoogleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
  </svg>
)

const OutlookIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const AddToCalendarButton = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (action, e) => {
    e.stopPropagation()
    action()
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-lg border border-surface px-2 py-1.5 text-xs transition-colors hover:border-primary/40 hover:text-primary"
      >
        <CalendarPlusIcon />
        <span>Add to Calendar</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl border border-surface bg-surface-card shadow-xl backdrop-blur-xl">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={(e) => handleOptionClick(() => downloadICS(event), e)}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-[var(--card-hover-bg)]"
              role="menuitem"
            >
              <DownloadIcon />
              Download .ics
            </button>
            <button
              onClick={(e) =>
                handleOptionClick(
                  () => window.open(getGoogleCalendarUrl(event), '_blank'),
                  e
                )
              }
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-[var(--card-hover-bg)]"
              role="menuitem"
            >
              <GoogleIcon />
              Google Calendar
            </button>
            <button
              onClick={(e) =>
                handleOptionClick(
                  () => window.open(getOutlookCalendarUrl(event), '_blank'),
                  e
                )
              }
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-[var(--card-hover-bg)]"
              role="menuitem"
            >
              <OutlookIcon />
              Outlook
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
AddToCalendarButton.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    location: PropTypes.string,
    desc: PropTypes.string,
  }),
}

export default AddToCalendarButton
