import { useState } from "react";
import {
  posterUrl,
  formatYear,
  formatRating,
  truncate,
} from "../utils/helpers";

export default function MovieCard({
  movie,
  index,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const poster = posterUrl(movie.poster_path);
  const delayClass = `card-delay-${Math.min(index % 12, 11)}`;

  const ratingColor =
    movie.vote_average >= 7.5
      ? "text-green-400"
      : movie.vote_average >= 6
        ? "text-gold-400"
        : movie.vote_average > 0
          ? "text-coral-400"
          : "text-white/30";

  return (
    <article
      className={`opacity-0 animate-fade-up ${delayClass} card-hover cursor-pointer group`}
      onClick={() => onClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(movie);
        }
      }}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="bg-cinema-800 rounded-xl overflow-hidden border border-white/5">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-cinema-700">
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
              className={`absolute top-2 left-2 z-10 w-8 h-8 rounded-md border backdrop-blur-sm flex items-center justify-center transition-colors ${
                isFavorite
                  ? "bg-gold-400/20 border-gold-400/40 text-gold-400"
                  : "bg-cinema-950/70 border-white/15 text-white/60 hover:text-white hover:border-white/30"
              }`}
              aria-label={
                isFavorite
                  ? `Remove ${movie.title} from favorites`
                  : `Add ${movie.title} to favorites`
              }
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {!imgError && poster ? (
            <>
              {!imgLoaded && <div className="absolute inset-0 shimmer-bg" />}
              <img
                src={poster}
                alt={movie.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cinema-700">
              <svg
                className="w-12 h-12 text-white/10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="2" y="3" width="20" height="18" rx="2" />
              </svg>
              <span className="text-white/20 text-xs font-mono text-center px-4">
                {movie.title}
              </span>
            </div>
          )}

          {/* Rating badge */}
          {movie.vote_average > 0 && (
            <div
              className={`absolute top-2 right-2 flex items-center gap-1 bg-cinema-950/80 backdrop-blur-sm rounded-md px-2 py-1 ${ratingColor}`}
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-mono font-medium">
                {formatRating(movie.vote_average)}
              </span>
            </div>
          )}

          {/* Year tag */}
          <div className="absolute bottom-2 left-2 bg-cinema-950/80 backdrop-blur-sm rounded px-2 py-0.5">
            <span className="text-white/60 text-xs font-mono">
              {formatYear(movie.release_date)}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/95 via-cinema-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white/80 text-xs leading-relaxed font-body">
              {truncate(movie.overview, 100)}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-body font-semibold text-white text-sm leading-snug truncate group-hover:text-gold-400 transition-colors duration-200">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white/30 text-xs font-mono">
              {formatYear(movie.release_date)}
            </span>
            {movie.vote_count > 0 && (
              <span className="text-white/20 text-xs font-mono">
                {movie.vote_count.toLocaleString()} votes
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
