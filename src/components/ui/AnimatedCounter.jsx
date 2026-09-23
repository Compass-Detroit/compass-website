import PropTypes from 'prop-types'
import useCountUp from '@/hooks/useCountUp'

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className = '',
  duration = 1600,
}) {
  const { ref, count } = useCountUp(value, { duration })

  const displayValue = value >= 1000 ? count.toLocaleString() : count

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
        {prefix && (
          <span className="mr-1 text-2xl md:text-3xl text-primary">
            {prefix}
          </span>
        )}
        <span className="bg-gradient-to-r from-primary via-primary-400 to-amber-300 bg-clip-text text-transparent tabular-nums">
          {displayValue}
        </span>
        {suffix && (
          <span className="ml-1 text-2xl md:text-3xl text-primary">
            {suffix}
          </span>
        )}
      </div>
      {label && (
        <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400 text-center">
          {label}
        </div>
      )}
    </div>
  )
}

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
}
