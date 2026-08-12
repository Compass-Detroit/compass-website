import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass, FaGrip, FaList, FaFilter } from 'react-icons/fa6';
import { PageLayout } from '@/layouts/PageLayout';
import ProfileCard from '@/components/ui/ProfileCard';
import { 
  getAllSpeakers, 
  getAllTracks, 
  getAllCategories, 
  getYearRange,
  getTotalSpeakerCount
} from '@/utils/speakerRegistry';

export default function SpeakersDirectoryPage() {
  const navigate = useNavigate();
  const allSpeakers = useMemo(() => getAllSpeakers(), []);
  const allTracks = useMemo(() => getAllTracks(), []);
  const allCategories = useMemo(() => getAllCategories(), []);
  const stats = useMemo(() => ({
    count: getTotalSpeakerCount(),
    range: getYearRange()
  }), []);

  const years = [2026, 2025, 2024, 2023];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const toggleYear = (year) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const toggleTrack = (track) => {
    setSelectedTracks(prev => 
      prev.includes(track) ? prev.filter(t => t !== track) : [...prev, track]
    );
  };

  const filteredSpeakers = useMemo(() => {
    return allSpeakers.filter(speaker => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = speaker.name.toLowerCase().includes(q);
        const matchesOrg = speaker.organization?.toLowerCase().includes(q);
        if (!matchesName && !matchesOrg) return false;
      }
      // Year
      if (selectedYears.length > 0) {
        const hasYear = selectedYears.some(y => speaker.yearsActive.includes(y));
        if (!hasYear) return false;
      }
      // Track
      if (selectedTracks.length > 0) {
        const hasTrack = selectedTracks.some(t => 
          speaker.sessions.some(s => s.track === t)
        );
        if (!hasTrack) return false;
      }
      // Category
      if (selectedCategory) {
        if (!speaker.categories.includes(selectedCategory)) return false;
      }
      return true;
    });
  }, [allSpeakers, searchQuery, selectedYears, selectedTracks, selectedCategory]);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-20 dark:bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-gray-900 to-gray-900 dark:from-indigo-900/20 dark:to-black"></div>
          {/* Particle effect simulation via CSS background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Speakers <span className="text-primary-500">Directory</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Discover the amazing voices that have shaped COMPASS Detroit. 
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-400">
            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              {stats.count} Unique Speakers
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              {stats.range.earliest} - {stats.range.latest}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          
          {/* Filters & Search */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1 space-y-6">
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FaMagnifyingGlass className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 py-3 pl-11 pr-4 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
                  placeholder="Search by name or organization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Year Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <FaFilter /> Years
                </span>
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => toggleYear(year)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                      selectedYears.includes(year)
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Track Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tracks
                </span>
                {allTracks.map(track => (
                  <button
                    key={track}
                    onClick={() => toggleTrack(track)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                      selectedTracks.includes(track)
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* View Toggles & Category Select */}
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:items-end">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="">All Categories</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  aria-label="Grid View"
                >
                  <FaGrip />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  aria-label="List View"
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filteredSpeakers.length}</span> speakers
          </div>

          {/* Speakers Grid / List */}
          {filteredSpeakers.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">No speakers found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYears([]);
                  setSelectedTracks([]);
                  setSelectedCategory('');
                }}
                className="mt-6 rounded-lg bg-primary-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSpeakers.map((speaker) => (
                <div key={speaker.slug} className="group relative flex h-full flex-col">
                  {/* Subtle hover effect background */}
                  <div className="absolute -inset-2 rounded-3xl bg-gray-200/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-700/50"></div>
                  <div className="relative z-10 flex h-full flex-col">
                    <ProfileCard
                      avatar={speaker.avatar}
                      name={speaker.name}
                      organization={speaker.organization}
                      position={speaker.position}
                      track={speaker.sessions[0]?.track}
                      twitter={speaker.twitter}
                      linkedin={speaker.linkedIn}
                      github={speaker.github}
                      mastodon={speaker.mastodon}
                      isGDE={speaker.isGDE}
                      isWTM={speaker.isWTM}
                      onViewDetails={() => navigate(`/speakers/${speaker.slug}`)}
                    />
                    {/* Years Badges Overlay */}
                    <div className="mt-2 flex flex-wrap gap-1 px-1">
                      {speaker.yearsActive.map(y => (
                        <span key={y} className="rounded bg-lime-100 px-1.5 py-0.5 text-xs font-semibold text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredSpeakers.map((speaker) => (
                <div key={speaker.slug} className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <div className="h-48 sm:h-auto sm:w-48 flex-shrink-0 relative">
                    <img 
                      src={speaker.avatar} 
                      alt={speaker.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          <Link to={`/speakers/${speaker.slug}`} className="hover:text-primary-500 transition-colors">
                            {speaker.name}
                          </Link>
                        </h3>
                        <div className="flex gap-2">
                          {speaker.yearsActive.map(y => (
                            <span key={y} className="rounded-full bg-lime-100 px-2.5 py-0.5 text-xs font-semibold text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">
                              {y}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-base text-gray-600 dark:text-gray-300">
                        {speaker.position && <span className="font-medium">{speaker.position}</span>}
                        {speaker.position && speaker.organization && <span> at </span>}
                        {speaker.organization && <span className="font-semibold text-indigo-600 dark:text-indigo-400">{speaker.organization}</span>}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {speaker.sessions.slice(0, 2).map((s, idx) => (
                          <span key={idx} className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {s.track}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link 
                        to={`/speakers/${speaker.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
