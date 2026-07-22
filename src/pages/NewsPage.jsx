import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SiteLayout from '@/layouts/SiteLayout'
import { newsArticles, newsCategories } from '@/data/2026/newsData'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://')
}

const categoryColors = {
  Events: 'bg-primary/10 text-primary border-primary/20',
  Press: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Community: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Milestones: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ArticleLink({ url, children, className }) {
  if (isExternalUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  )
}

ArticleLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

function FeaturedArticleCard({ article, large }) {
  const colorClass =
    categoryColors[article.category] ||
    'bg-primary/10 text-primary border-primary/20'

  return (
    <ArticleLink
      url={article.url}
      className={`group block rounded-xl border border-surface bg-surface-card transition-colors hover:border-primary/30 ${
        large ? 'md:flex md:items-stretch' : ''
      }`}
    >
      {article.image && (
        <div
          className={`overflow-hidden ${
            large
              ? 'aspect-[16/9] md:aspect-auto md:w-1/2 md:rounded-l-xl'
              : 'aspect-[16/9]'
          } rounded-t-xl ${large ? 'md:rounded-r-none' : ''}`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div
        className={`p-6 ${
          large && article.image
            ? 'md:flex md:w-1/2 md:flex-col md:justify-center md:p-10'
            : ''
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorClass}`}
          >
            {article.category}
          </span>
          <span className="text-[12px] text-gray-600">{article.source}</span>
        </div>
        <h3
          className={`mb-3 font-bold leading-snug tracking-tight ${
            large ? 'text-xl md:text-2xl' : 'text-lg'
          }`}
        >
          {article.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-gray-600">
            {formatDate(article.date)}
          </span>
          {isExternalUrl(article.url) && <ExternalLinkIcon />}
        </div>
      </div>
    </ArticleLink>
  )
}

const articleShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  featured: PropTypes.bool,
}

FeaturedArticleCard.propTypes = {
  article: PropTypes.shape(articleShape).isRequired,
  large: PropTypes.bool,
}

function ArticleCard({ article }) {
  const colorClass =
    categoryColors[article.category] ||
    'bg-primary/10 text-primary border-primary/20'

  return (
    <ArticleLink
      url={article.url}
      className="group flex flex-col rounded-xl border border-surface bg-surface-card p-6 transition-colors hover:border-primary/30"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorClass}`}
        >
          {article.category}
        </span>
        <span className="text-[12px] text-gray-600">{article.source}</span>
      </div>
      <h3 className="mb-3 text-[15px] font-semibold leading-snug">
        {article.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between border-t border-surface pt-4">
        <span className="text-[13px] text-gray-600">
          {formatDate(article.date)}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-primary transition-colors group-hover:text-primary-400">
          Read more
          {isExternalUrl(article.url) ? (
            <ExternalLinkIcon />
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </span>
      </div>
    </ArticleLink>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape(articleShape).isRequired,
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredArticles = newsArticles.filter((a) => a.featured)
  const filteredArticles =
    activeCategory === 'All'
      ? newsArticles.filter((a) => !a.featured)
      : newsArticles.filter((a) => a.category === activeCategory && !a.featured)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-orb-1 absolute -right-32 -top-32 size-[350px] rounded-full bg-gradient-to-br from-primary/[0.06] to-transparent blur-3xl" />
        <div className="hero-orb-2 absolute -bottom-20 left-1/3 size-[250px] rounded-full bg-gradient-to-tr from-emerald-500/[0.04] to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pb-16 pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Latest Updates
            </span>
          </div>
          <h1 className="mb-6 max-w-[700px] text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Stay{' '}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              informed.
            </span>
          </h1>
          <p className="max-w-screen-sm text-lg leading-relaxed text-gray-500">
            News, press coverage, and updates from Compass Detroit and the
            Michigan tech community. See what&apos;s making headlines.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Featured
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Top stories</h2>
          </div>
          {featuredArticles.length > 0 && (
            <div className="flex flex-col gap-6">
              {/* First featured article — large card */}
              <FeaturedArticleCard article={featuredArticles[0]} large />
              {/* Remaining featured articles — 2-column grid */}
              {featuredArticles.length > 1 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredArticles.slice(1).map((article) => (
                    <FeaturedArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* All Articles with Category Filter */}
      <section className="border-t border-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="mb-10">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              All Coverage
            </p>
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Browse by category
            </h2>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-black'
                      : 'border border-surface text-gray-500 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Article grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-surface bg-surface-card p-12 text-center">
              <p className="text-gray-500">
                No articles in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-6 py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
              Have a story?{' '}
              <span className="text-primary">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[500px] leading-relaxed text-gray-500">
              Whether you&apos;re press, a partner, or a Navigator with news to
              share — we&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-involved"
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-primary-400"
              >
                Get in Touch
              </Link>
              <Link
                to="/events"
                className="rounded-lg border border-surface px-8 py-4 text-base font-semibold text-white transition-colors hover:border-gray-500"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
