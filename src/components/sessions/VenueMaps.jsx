import PropTypes from 'prop-types'

function VenueMaps({ maps = [] }) {
  if (!maps || maps.length === 0) {
    return (
      <section className="w-full py-8" aria-labelledby="venue-maps-heading">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3
            id="venue-maps-heading"
            className="mb-2 text-lg font-semibold text-gray-700"
          >
            Venue Map Coming Soon
          </h3>
          <p className="text-sm text-gray-500">
            We&apos;ll share detailed venue maps closer to the event date.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-8" aria-labelledby="venue-maps-heading">
      <div>
        <h3
          id="venue-maps-heading"
          className="mb-4 text-base font-semibold text-gray-800 md:text-lg dark:text-gray-900"
        >
          {maps[0]?.venueTitle || 'Venue Maps'}
        </h3>
        {maps[0]?.description && (
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-900">
            {maps[0].description}
          </p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          {maps.map((map, index) => (
            <figure key={index} className="overflow-hidden rounded-lg">
              <div
                className="rounded-2xl border-4 border-blue-500 bg-white p-1"
                role="region"
              >
                <img
                  src={map.src}
                  alt={map.alt}
                  className="w-full rounded-xl border-4 border-white bg-blue-50 object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

VenueMaps.propTypes = {
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      venueTitle: PropTypes.string,
      description: PropTypes.string,
    })
  ),
}

export default VenueMaps
