import React from 'react'
import PropTypes from 'prop-types'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa6'

const MemberProfileCard = ({
  name,
  title,
  organization,
  avatar,
  bio,
  skills = [],
  github,
  linkedin,
  twitter,
  website,
}) => {
  const visibleSkills = skills.slice(0, 5)
  const remainingSkills = skills.length - 5

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : '??'

  return (
    <div className="relative w-full max-w-[350px] overflow-hidden rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-[rgba(15,15,25,0.7)]">
      {/* Gradient border effect via pseudo element or wrapper */}
      <div className="absolute inset-0 z-0 rounded-3xl border border-transparent bg-gradient-to-br from-primary to-lime-500 opacity-20" style={{ maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)' }}></div>
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gradient-to-br from-[#efb403] to-[#00C605] pointer-events-none z-10 opacity-50 border border-transparent" style={{background: 'linear-gradient(to bottom right, #efb403, #00C605) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude'}}></div>

      <div className="relative z-20 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-4 flex size-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#efb403] to-[#00C605] p-1">
          <div className="flex size-full items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-900">
            {avatar ? (
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="size-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-center text-xl font-bold text-gray-900 dark:text-white">
          {name || 'Your Name'}
        </h3>
        <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-300">
          {title || 'Your Title'} {organization && `at ${organization}`}
        </p>

        {/* Bio */}
        {bio && (
          <p className="mt-4 line-clamp-2 text-center text-sm italic text-gray-700 dark:text-gray-400">
            "{bio}"
          </p>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-5 flex w-full flex-wrap justify-center gap-2">
            {visibleSkills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-900 dark:bg-primary/20 dark:text-primary-100"
              >
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                +{remainingSkills} more
              </span>
            )}
          </div>
        )}

        {/* Social Links */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400"
              aria-label="Twitter"
            >
              <FaTwitter className="size-5" />
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Website"
            >
              <FaGlobe className="size-5" />
            </a>
          )}
        </div>

        {/* Badge */}
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700/50 w-full text-center">
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            🧭 COMPASS Detroit Community
          </p>
        </div>
      </div>
    </div>
  )
}

MemberProfileCard.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  organization: PropTypes.string,
  avatar: PropTypes.string,
  bio: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  github: PropTypes.string,
  linkedin: PropTypes.string,
  twitter: PropTypes.string,
  website: PropTypes.string,
}

export default MemberProfileCard
