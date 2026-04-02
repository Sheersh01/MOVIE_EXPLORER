import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieCard from "./components/MovieCard";
import SkeletonCard from "./components/SkeletonCard";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import MovieModal from "./components/MovieModal";
import Pagination from "./components/Pagination";
import { useMovies, useGenres } from "./hooks/useMovies";

// Simple debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "now_playing" },
];

const RESULT_SORT_OPTIONS = [
  { label: "Default Order", value: "default" },
  { label: "Rating High to Low", value: "rating_desc" },
  { label: "Rating Low to High", value: "rating_asc" },
  { label: "Newest First", value: "year_desc" },
  { label: "Oldest First", value: "year_asc" },
  { label: "Title A-Z", value: "title_asc" },
];

function getYearValue(releaseDate) {
  if (!releaseDate) return 0;
  const year = Number.parseInt(releaseDate.slice(0, 4), 10);
  return Number.isNaN(year) ? 0 : year;
}

export default function App() {
  const [rawQuery, setRawQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeGenre, setActiveGenre] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortMode, setSortMode] = useState("popular");
  const [resultSortMode, setResultSortMode] = useState("default");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("movie_explorer_favorites");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const query = useDebounce(rawQuery, 420);
  const genres = useGenres();

  // Reset to page 1 when query/genre/sort changes
  useEffect(() => {
    setPage(1);
  }, [query, activeGenre, sortMode]);

  const { movies, loading, error, totalPages, totalResults, refetch } =
    useMovies(query, page, activeGenre, sortMode);

  const handleSearch = useCallback((val) => {
    setRawQuery(val);
    setActiveGenre(null);
  }, []);

  const handleGenreSelect = useCallback((id) => {
    setActiveGenre(id);
    setRawQuery("");
  }, []);

  useEffect(() => {
    localStorage.setItem("movie_explorer_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((movie) => movie.id)),
    [favorites],
  );

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) return prev.filter((item) => item.id !== movie.id);
      return [movie, ...prev];
    });
  }, []);

  const displayedMovies = useMemo(() => {
    const source = showFavoritesOnly ? favorites : movies;
    const sorted = [...source];

    switch (resultSortMode) {
      case "rating_desc":
        sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
      case "rating_asc":
        sorted.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
        break;
      case "year_desc":
        sorted.sort(
          (a, b) => getYearValue(b.release_date) - getYearValue(a.release_date),
        );
        break;
      case "year_asc":
        sorted.sort(
          (a, b) => getYearValue(a.release_date) - getYearValue(b.release_date),
        );
        break;
      case "title_asc":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      default:
        break;
    }

    return sorted;
  }, [movies, favorites, showFavoritesOnly, resultSortMode]);

  const openRandomMovie = useCallback(() => {
    if (displayedMovies.length === 0) return;
    const index = Math.floor(Math.random() * displayedMovies.length);
    setSelectedMovie(displayedMovies[index]);
  }, [displayedMovies]);

  const isSearching = !!query.trim();
  const isFiltering = !!activeGenre;

  const activeLabel = showFavoritesOnly
    ? "Your Favorites"
    : isSearching
      ? `Results for "${query}"`
      : isFiltering
        ? genres.find((g) => g.id === activeGenre)?.name || "Genre"
        : SORT_OPTIONS.find((s) => s.value === sortMode)?.label || "Popular";

  return (
    <div className="min-h-screen bg-cinema-950 noise-overlay">
      {/* Ambient background orbs */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[100px]" />
        <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-coral-500/4 blur-[100px]" />
      </div>

      <Header favoritesCount={favorites.length} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Hero section */}
        <section className="text-center mb-10 sm:mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-gold-400 text-xs font-mono tracking-widest uppercase">
              Discover Cinema
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white tracking-wider leading-none mb-4">
            EXPLORE
            <br />
            <span className="text-gold-400">MOVIES</span>
          </h1>
          <p className="text-white/35 text-base sm:text-lg max-w-md mx-auto font-body leading-relaxed">
            Discover thousands of films from the world's largest movie database.
          </p>
        </section>

        {/* Search */}
        <section
          className="mb-8 sm:mb-10 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <SearchBar
            value={rawQuery}
            onChange={handleSearch}
            resultCount={totalResults}
            loading={loading && !!rawQuery}
          />
        </section>

        {/* Sort + Genre filters */}
        {!isSearching && (
          <section
            className="mb-8 space-y-4 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {/* Sort tabs */}
            <div className="flex gap-2 flex-wrap">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortMode(opt.value);
                    setActiveGenre(null);
                  }}
                  className={`text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                    sortMode === opt.value && !isFiltering
                      ? "bg-white/10 border-white/25 text-white"
                      : "border-white/8 text-white/35 hover:text-white/65 hover:border-white/15"
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

        {/* Controls */}
        <section className="mb-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
              showFavoritesOnly
                ? "bg-gold-400/15 border-gold-400/40 text-gold-400"
                : "border-white/10 text-white/45 hover:text-white hover:border-white/25"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill={showFavoritesOnly ? "currentColor" : "none"}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
          </button>

          <div className="inline-flex items-center gap-2 border border-white/10 rounded-lg px-2.5 py-2">
            <span className="text-[11px] text-white/35 font-mono uppercase tracking-wider">
              Sort
            </span>
            <select
              value={resultSortMode}
              onChange={(e) => setResultSortMode(e.target.value)}
              className="bg-transparent text-xs text-white/80 font-mono focus:outline-none"
              aria-label="Sort current results"
            >
              {RESULT_SORT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-cinema-900 text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openRandomMovie}
            disabled={displayedMovies.length === 0}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-xs font-mono text-white/45 hover:text-white hover:border-white/25 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 3h5v5M4 20l6-6M20 4l-8 8M4 4l5 5M20 20l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Surprise Me
          </button>
        </section>

        {/* Section label */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-400 rounded-full" />
            <h2 className="font-display text-xl sm:text-2xl text-white tracking-wider">
              {activeLabel.toUpperCase()}
            </h2>
            {!loading && displayedMovies.length > 0 && (
              <span className="text-white/25 text-xs font-mono">
                {showFavoritesOnly
                  ? `${displayedMovies.length} saved`
                  : isSearching || isFiltering
                    ? `${totalResults.toLocaleString()} total`
                    : ""}
              </span>
            )}
          </div>
          {!showFavoritesOnly &&
            !loading &&
            !error &&
            displayedMovies.length > 0 && (
              <span className="text-white/20 text-xs font-mono hidden sm:block">
                Page {page} of {Math.min(totalPages, 500)}
              </span>
            )}
        </div>

        {/* States */}
        {showFavoritesOnly ? (
          displayedMovies.length === 0 ? (
            <div className="border border-white/10 rounded-xl p-8 sm:p-10 bg-white/5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-white/35"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white text-lg font-display tracking-wide">
                No Favorites Yet
              </h3>
              <p className="text-white/45 text-sm font-body mt-2">
                Tap the heart icon on any movie card to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {displayedMovies.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={i}
                  onClick={setSelectedMovie}
                  isFavorite={favoriteIds.has(movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedMovies.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <>
            {/* Movie grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {displayedMovies.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={i}
                  onClick={setSelectedMovie}
                  isFavorite={favoriteIds.has(movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg text-white/20 tracking-widest">
            CINESCOPE
          </span>
          <p className="text-white/20 text-xs font-mono text-center">
            Data provided by{" "}
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
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={favoriteIds.has(selectedMovie.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
