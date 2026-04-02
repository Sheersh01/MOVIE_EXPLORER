import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import MovieCard from './components/MovieCard'
import SkeletonCard from './components/SkeletonCard'
import ErrorState from './components/ErrorState'
import EmptyState from './components/EmptyState'
import MovieModal from './components/MovieModal'
import Pagination from './components/Pagination'
import { useMovies, useGenres } from './hooks/useMovies'

// Simple debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Now Playing', value: 'now_playing' },
]

export default function App() {
  const [rawQuery, setRawQuery] = useState('')
  const [page, setPage] = useState(1)
  const [activeGenre, setActiveGenre] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortMode, setSortMode] = useState('popular')

  const query = useDebounce(rawQuery, 420)
  const genres = useGenres()

  // Reset to page 1 when query/genre/sort changes
  useEffect(() => { setPage(1) }, [query, activeGenre, sortMode])

  const { movies, loading, error, totalPages, totalResults, refetch } = useMovies(
    query,
    page,
    activeGenre,
    sortMode
  )

  const handleSearch = useCallback((val) => {
    setRawQuery(val)
    setActiveGenre(null)
  }, [])

  const handleGenreSelect = useCallback((id) => {
    setActiveGenre(id)
    setRawQuery('')
  }, [])

  const isSearching = !!query.trim()
  const isFiltering = !!activeGenre

  const activeLabel = isSearching
    ? `Results for "${query}"`
    : isFiltering
    ? genres.find((g) => g.id === activeGenre)?.name || 'Genre'
    : SORT_OPTIONS.find((s) => s.value === sortMode)?.label || 'Popular'

  return (
    <div className="min-h-screen bg-cinema-950 noise-overlay">
      {/* Ambient background orbs */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[100px]" />
        <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-coral-500/4 blur-[100px]" />
      </div>

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Hero section */}
        <section className="text-center mb-10 sm:mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-gold-400 text-xs font-mono tracking-widest uppercase">Discover Cinema</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-wider leading-none mb-4">
            EXPLORE<br />
            <span className="text-gold-400">MOVIES</span>
          </h1>
          <p className="text-white/35 text-base sm:text-lg max-w-md mx-auto font-body leading-relaxed">
            Discover thousands of films from the world's largest movie database.
          </p>
        </section>

        {/* Search */}
        <section className="mb-8 sm:mb-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <SearchBar
            value={rawQuery}
            onChange={handleSearch}
            resultCount={totalResults}
            loading={loading && !!rawQuery}
          />
        </section>

        {/* Sort + Genre filters */}
        {!isSearching && (
          <section className="mb-8 space-y-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
            {/* Sort tabs */}
            <div className="flex gap-2 flex-wrap">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortMode(opt.value); setActiveGenre(null) }}
                  className={`text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                    sortMode === opt.value && !isFiltering
                      ? 'bg-white/10 border-white/25 text-white'
                      : 'border-white/8 text-white/35 hover:text-white/65 hover:border-white/15'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Genre chips */}
            {genres.length > 0 && (
              <GenreFilter
                genres={genres}
                activeGenre={activeGenre}
                onSelect={handleGenreSelect}
              />
            )}
          </section>
        )}

        {/* Section label */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-400 rounded-full" />
            <h2 className="font-display text-xl sm:text-2xl text-white tracking-wider">
              {activeLabel.toUpperCase()}
            </h2>
            {!loading && movies.length > 0 && (
              <span className="text-white/25 text-xs font-mono">
                {isSearching || isFiltering ? `${totalResults.toLocaleString()} total` : ''}
              </span>
            )}
          </div>
          {!loading && !error && movies.length > 0 && (
            <span className="text-white/20 text-xs font-mono hidden sm:block">
              Page {page} of {Math.min(totalPages, 500)}
            </span>
          )}
        </div>

        {/* States */}
        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <>
            {/* Movie grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {movies.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={i}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg text-white/20 tracking-widest">CINESCOPE</span>
          <p className="text-white/20 text-xs font-mono text-center">
            Data provided by{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400/50 hover:text-gold-400 transition-colors"
            >
              The Movie Database
            </a>
            . Not endorsed by TMDB.
          </p>
        </div>
      </footer>

      {/* Movie detail modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}
