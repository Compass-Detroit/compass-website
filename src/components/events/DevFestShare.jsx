import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from 'react-icons/fa6'
import { FiShare2, FiCheck } from 'react-icons/fi'
import { DEVFEST_2026 } from '@/data/2026/devfest'

const SHARE_TEXT = `I'm going to Michigan DevFest '26 — AI Hackathon + Tech Conference, Nov 13–14 at ${DEVFEST_2026.venue}, Detroit. Grab a ticket and come build with us!`

const shareLinks = (url) => [
  {
    label: 'Share on LinkedIn',
    Icon: FaLinkedinIn,
    href: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams(
      { url }
    )}`,
  },
  {
    label: 'Share on X',
    Icon: FaXTwitter,
    href: `https://twitter.com/intent/tweet?${new URLSearchParams({
      text: SHARE_TEXT,
      url,
      hashtags: 'MIDevFest,DevFest',
    })}`,
  },
  {
    label: 'Share on Facebook',
    Icon: FaFacebookF,
    href: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({
      u: url,
    })}`,
  },
]

// Native share sheet where supported (phones), copy-link fallback elsewhere
export default function DevFestShare({
  url = DEVFEST_2026.registerUrl,
  className = '',
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(id)
  }, [copied])

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: DEVFEST_2026.name,
          text: SHARE_TEXT,
          url,
        })
        return
      } catch (err) {
        if (err.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt('Copy this link to share Michigan DevFest', url)
    }
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {copied ? (
          <FiCheck aria-hidden="true" />
        ) : (
          <FiShare2 aria-hidden="true" />
        )}
        {copied ? 'Link copied' : 'Share DevFest'}
      </button>
      {shareLinks(url).map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid size-9 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
      <span className="sr-only" role="status">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>
  )
}

DevFestShare.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
}
