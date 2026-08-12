import PropTypes from 'prop-types'

export default function QRCodeModal({
  isOpen,
  onClose,
  eventName,
  qrImage,
  qrLink,
  subtext,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
      <div className="relative w-full max-w-md rounded-2xl border border-surface bg-[#0d0d0d] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Close QR Modal"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary mb-3">
            Scan & Direct Access
          </span>
          <h3 className="text-2xl font-black text-white mb-2">{eventName}</h3>
          <p className="text-sm text-gray-400 mb-6">
            {subtext ||
              'Scan with your mobile camera to open event details directly.'}
          </p>

          <div className="relative mx-auto size-64 overflow-hidden rounded-xl border-2 border-primary/40 bg-white p-3 shadow-xl">
            <img
              src={qrImage}
              alt={`${eventName} QR Code`}
              className="size-full object-contain"
            />
          </div>

          {qrLink && (
            <div className="mt-6">
              <a
                href={qrLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black hover:bg-primary-400 transition-all hover:scale-105"
              >
                Open Direct Web Link →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

QRCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventName: PropTypes.string.isRequired,
  qrImage: PropTypes.string.isRequired,
  qrLink: PropTypes.string,
  subtext: PropTypes.string,
}
