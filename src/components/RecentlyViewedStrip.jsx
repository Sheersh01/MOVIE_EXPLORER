import { posterUrl, formatYear } from "../utils/helpers";

export default function RecentlyViewedStrip({ movies, onOpenMovie, onClear }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section
      className="mb-8 animate-fade-up"
      style={{ animationDelay: "140ms" }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/35 uppercase tracking-widest">
            Recently Viewed
          </span>
          <span className="text-xs font-mono text-white/25">
            {movies.length} {movies.length === 1 ? "movie" : "movies"}
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
        {movies.map((movie, idx) => (
          <button
            key={`${movie.id}-${idx}`}
            onClick={() => onOpenMovie(movie)}
            className={`flex-shrink-0 group cursor-pointer transition-all duration-200 hover:scale-110 animate-scale-in recent-item-${Math.min(idx, 5)}`}
          >
            <div className="relative w-14 h-20 sm:w-16 sm:h-24 rounded-lg overflow-hidden bg-cinema-700 border border-white/10 hover:border-gold-400/40 hover:shadow-lg hover:shadow-gold-400/20 transition-all duration-200 group-hover:animate-pulse-glow">
              {movie.poster_path ? (
                <>
                  <img
                    src={posterUrl(movie.poster_path, "w92")}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white animate-float"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-cinema-700">
                  <svg
                    className="w-6 h-6 text-white/20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-xs text-white/60 mt-1 max-w-[70px] truncate text-center group-hover:text-gold-400 transition-colors duration-200">
              {movie.title}
            </p>
            <p className="text-[10px] text-white/35 text-center">
              {formatYear(movie.release_date)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
