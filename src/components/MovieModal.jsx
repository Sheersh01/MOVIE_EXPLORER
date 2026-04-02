import { useEffect } from 'react'
import { posterUrl, backdropUrl, formatYear, formatRating, truncate } from '../utils/helpers'

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!movie) return null

  const poster = posterUrl(movie.poster_path, 'w342')
  const backdrop = backdropUrl(movie.backdrop_path, 'w1280')

  const ratingColor =
    movie.vote_average >= 7.5
      ? 'text-green-400 border-green-400/30 bg-green-400/10'
      : movie.vote_average >= 6
      ? 'text-gold-400 border-gold-400/30 bg-gold-400/10'
      : 'text-coral-400 border-coral-400/30 bg-coral-400/10'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={movie.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cinema-950/85 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-cinema-800 sm:rounded-2xl border border-white/10 shadow-2xl animate-fade-up">
        {/* Backdrop image */}
        {backdrop && (
          <div className="relative h-40 sm:h-52 overflow-hidden sm:rounded-t-2xl">
            <img
              src={backdrop}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-800/40 to-cinema-800" />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-cinema-950/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
          aria-label="Close"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex gap-4">
            {/* Poster thumbnail */}
            {poster && (
              <div className="flex-shrink-0 w-20 sm:w-28 -mt-14 sm:-mt-20 rounded-lg overflow-hidden border border-white/10 shadow-xl">
                <img src={poster} alt={movie.title} className="w-full" />
              </div>
            )}

            {/* Title block */}
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wider leading-tight">
                {movie.title.toUpperCase()}
              </h2>
              {movie.original_title && movie.original_title !== movie.title && (
                <p className="text-white/30 text-xs font-mono mt-0.5">{movie.original_title}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-white/40 text-xs font-mono">{formatYear(movie.release_date)}</span>
                {movie.vote_average > 0 && (
                  <span className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded border ${ratingColor}`}>
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {formatRating(movie.vote_average)} / 10
                  </span>
                )}
                {movie.vote_count > 0 && (
                  <span className="text-white/25 text-xs font-mono">
                    {movie.vote_count.toLocaleString()} votes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-5">
            <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Overview</h3>
            <p className="text-white/60 text-sm leading-relaxed font-body">
              {movie.overview || 'No description available for this title.'}
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {movie.release_date && (
              <div className="bg-cinema-700/50 rounded-lg p-3 border border-white/5">
                <div className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-1">Release</div>
                <div className="text-white text-sm font-body">{movie.release_date}</div>
              </div>
            )}
            {movie.original_language && (
              <div className="bg-cinema-700/50 rounded-lg p-3 border border-white/5">
                <div className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-1">Language</div>
                <div className="text-white text-sm font-body uppercase">{movie.original_language}</div>
              </div>
            )}
            {movie.popularity != null && (
              <div className="bg-cinema-700/50 rounded-lg p-3 border border-white/5">
                <div className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-1">Popularity</div>
                <div className="text-white text-sm font-mono">{Math.round(movie.popularity)}</div>
              </div>
            )}
          </div>

          {/* TMDB link */}
          <div className="mt-5 flex justify-end">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-gold-400 transition-colors border border-white/10 hover:border-gold-400/30 rounded-lg px-3 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View on TMDB
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
