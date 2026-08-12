import { useEffect, useState } from 'react'
import SiteNavbar from '@/components/SiteNavbar'
import SiteFooter from '@/components/SiteFooter'
import { getSessionMetrics } from '@/utils/telemetry'
import PropTypes from 'prop-types'

export default function AnalyticsDashboardPage() {
  const [metrics, setMetrics] = useState(() => getSessionMetrics())

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getSessionMetrics())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <SiteNavbar />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Telemetry Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Session ID: <span className="font-mono">{metrics.sessionId}</span>
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Events" value={metrics.totalEvents} />
            <MetricCard title="Page Views" value={metrics.pageViews} />
            <MetricCard
              title="Unique Pages"
              value={metrics.uniquePages.length}
            />
            <MetricCard
              title="Errors"
              value={metrics.errorCount}
              color="text-red-600 dark:text-red-400"
            />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Web Vitals
              </h2>
              <div className="space-y-4">
                {Object.entries(metrics.vitals).length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No Web Vitals recorded yet.
                  </p>
                ) : (
                  Object.entries(metrics.vitals).map(([metric, data]) => (
                    <div
                      key={metric}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {metric}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {metric === 'CLS'
                          ? data.value.toFixed(3)
                          : `${Math.round(data.value)}ms`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Feature Usage
              </h2>
              <div className="space-y-4">
                {Object.entries(metrics.featureUsage).length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No features tracked yet.
                  </p>
                ) : (
                  Object.entries(metrics.featureUsage).map(
                    ([feature, count]) => (
                      <div key={feature} className="flex items-center gap-4">
                        <span className="w-1/3 truncate text-sm font-medium text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                          <div
                            className="h-2 rounded-full bg-[#efb403]"
                            style={{
                              width: `${Math.min((count / 50) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {count}
                        </span>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Recent Errors
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.errors.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-4 text-center">
                        No errors recorded
                      </td>
                    </tr>
                  ) : (
                    metrics.errors.map((error, i) => (
                      <tr key={i} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3">
                          {new Date(error.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                          {error.type || 'error'}
                        </td>
                        <td className="max-w-md truncate px-4 py-3">
                          {error.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function MetricCard({ title, value, color = 'text-[#6366f1]' }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
}
