/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import {
  trackPageView,
  trackEvent,
  trackFeatureUsage,
  trackError,
  getSessionMetrics,
} from '@/utils/telemetry'

export const TelemetryContext = createContext(null)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    trackError(error, {
      type: 'react_error_boundary',
      componentStack: errorInfo.componentStack,
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.hasError &&
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-900">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="rounded-lg bg-[#6366f1] px-6 py-2 text-white transition-colors hover:bg-[#6366f1]/90"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

function ErrorBoundaryWrapper({ children }) {
  const location = useLocation()
  return <ErrorBoundary location={location}>{children}</ErrorBoundary>
}

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export function TelemetryProvider({ children }) {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  const contextValue = {
    trackEvent,
    trackFeature: trackFeatureUsage,
    trackError,
    getSessionMetrics,
  }

  return (
    <TelemetryContext.Provider value={contextValue}>
      <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
    </TelemetryContext.Provider>
  )
}

TelemetryProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useTelemetry() {
  const context = useContext(TelemetryContext)
  if (context === null) {
    throw new Error('useTelemetry must be used within a TelemetryProvider')
  }
  return context
}

export default TelemetryProvider
