import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Load analytics gracefully — ad blockers may block these
import('@vercel/analytics').then(({ inject }) => inject()).catch(() => {})
import('@vercel/speed-insights')
  .then(({ injectSpeedInsights }) => injectSpeedInsights())
  .catch(() => {})

// Initialize custom telemetry
import { initTelemetry } from './utils/telemetry.js'
initTelemetry({
  endpoint: import.meta.env.VITE_TELEMETRY_ENDPOINT || null,
  debug: import.meta.env.DEV,
})

// Initialize axe-core for accessibility testing in development mode
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
