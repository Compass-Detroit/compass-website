import { useState, useEffect, useMemo } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import {
  FaDownload,
  FaSearch,
  FaFilter,
  FaUsers,
  FaChartLine,
  FaEnvelopeOpenText,
  FaCalendarAlt,
} from 'react-icons/fa'

const generateSampleData = () => {
  const interestsList = [
    'React',
    'AI',
    'Design',
    'Startups',
    'Career',
    'Backend',
    'Events',
  ]
  const names = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Williams',
    'Charlie Brown',
    'David Davis',
    'Eva Garcia',
    'Frank Miller',
    'Grace Lee',
    'Hannah Wilson',
    'Ian Taylor',
    'Julia White',
    'Kevin Harris',
    'Laura Martin',
    'Michael Thompson',
    'Nina Moore',
    'Oscar Clark',
    'Paul Lewis',
    'Quinn Walker',
    'Rachel Hall',
  ]
  const statuses = ['active', 'active', 'active', 'active', 'unsubscribed']

  return Array.from({ length: 20 }).map((_, i) => {
    const numInterests = Math.floor(Math.random() * 3) + 1
    const userInterests = [...interestsList]
      .sort(() => 0.5 - Math.random())
      .slice(0, numInterests)
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 60))

    return {
      id: i,
      name: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@example.com`,
      interests: userInterests,
      subscribedAt: date.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }
  })
}

const SubscriberDashboardPage = () => {
  const [subscribers, setSubscribers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterInterest, setFilterInterest] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('compass_newsletter_subscribers')
    if (stored) {
      try {
        setSubscribers(JSON.parse(stored))
      } catch (e) {
        const sample = generateSampleData()
        setSubscribers(sample)
        localStorage.setItem(
          'compass_newsletter_subscribers',
          JSON.stringify(sample)
        )
      }
    } else {
      const sample = generateSampleData()
      setSubscribers(sample)
      localStorage.setItem(
        'compass_newsletter_subscribers',
        JSON.stringify(sample)
      )
    }
  }, [])

  const filteredSubscribers = useMemo(() => {
    return subscribers
      .filter((sub) => {
        const matchesSearch =
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesInterest = filterInterest
          ? sub.interests.includes(filterInterest)
          : true
        return matchesSearch && matchesInterest
      })
      .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt))
  }, [subscribers, searchTerm, filterInterest])

  const stats = useMemo(() => {
    const active = subscribers.filter((s) => s.status === 'active').length
    const thisMonth = subscribers.filter((s) => {
      const subDate = new Date(s.subscribedAt)
      const now = new Date()
      return (
        subDate.getMonth() === now.getMonth() &&
        subDate.getFullYear() === now.getFullYear()
      )
    }).length

    const interestsCount = {}
    subscribers.forEach((s) => {
      s.interests.forEach((i) => {
        interestsCount[i] = (interestsCount[i] || 0) + 1
      })
    })

    const topInterest =
      Object.entries(interestsCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      'N/A'

    return {
      total: subscribers.length,
      active,
      thisMonth,
      topInterest,
      interestsCount,
    }
  }, [subscribers])

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Status', 'Subscribed Date', 'Interests']
    const csvContent = [
      headers.join(','),
      ...filteredSubscribers.map(
        (s) =>
          `"${s.name}","${s.email}","${s.status}","${new Date(s.subscribedAt).toLocaleDateString()}","${s.interests.join('; ')}"`
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'subscribers_export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const allInterests = Array.from(
    new Set(subscribers.flatMap((s) => s.interests))
  )

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 pb-20 pt-24 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative mb-8 bg-white py-12 shadow-sm dark:bg-gray-800">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/5"></div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Newsletter Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage and analyze your subscriber base.
                </p>
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-primary dark:text-gray-900 dark:hover:bg-[#d6a203]"
              >
                <FaDownload />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats Row */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <FaUsers className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Subscribers
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <FaEnvelopeOpenText className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Active
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.active}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/20 p-3 text-primary-700 dark:bg-primary/20 dark:text-primary-400">
                  <FaChartLine className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Top Interest
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.topInterest}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <FaCalendarAlt className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    +{stats.thisMonth}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Table Area */}
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Subscriber List
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search emails or names..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="relative">
                      <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        value={filterInterest}
                        onChange={(e) => setFilterInterest(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 py-2 pl-10 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                      >
                        <option value="">All Interests</option>
                        {allInterests.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full whitespace-nowrap text-left text-sm">
                    <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-750 dark:text-gray-400">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name & Email</th>
                        <th className="px-4 py-3 font-medium">Interests</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">
                          Subscribed Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSubscribers.length > 0 ? (
                        filteredSubscribers.map((sub, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 dark:hover:bg-gray-750/50"
                          >
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {sub.name}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">
                                {sub.email}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {sub.interests.map((interest) => (
                                  <span
                                    key={interest}
                                    className="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                  sub.status === 'active'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                              {new Date(sub.subscribedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-8 text-center text-gray-500 dark:text-gray-400"
                          >
                            No subscribers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar Charts */}
            <div className="flex flex-col gap-8">
              {/* Interest Breakdown */}
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                  Interest Breakdown
                </h2>
                <div className="space-y-4">
                  {Object.entries(stats.interestsCount)
                    .sort((a, b) => b[1] - a[1])
                    .map(([interest, count]) => (
                      <div key={interest}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {interest}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {count}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-[#EE7D33]"
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Growth Visualization (Mock) */}
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                  Growth Overview
                </h2>
                <div className="flex h-40 items-end gap-2 pb-2">
                  {/* Mock bars for a sparkline-style chart */}
                  {[30, 45, 25, 60, 40, 75, 55, 90, 70, 100].map((val, i) => (
                    <div
                      key={i}
                      className="w-full rounded-t-sm bg-lime-400/80 transition-all hover:bg-lime-500 dark:bg-lime-500/80"
                      style={{ height: `${val}%` }}
                      title={`Value: ${val}`}
                    ></div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Past 10 weeks</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default SubscriberDashboardPage
