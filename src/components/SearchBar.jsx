import { useState, useEffect, useRef } from "react";

export default function SearchBar({ value, onChange, resultCount, loading }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const handler = (e) => {
      if (
        (e.ctrlKey && e.key === "k") ||
        (e.key === "/" && document.activeElement.tagName !== "INPUT")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") inputRef.current?.blur();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow ring when focused */}
      {focused && (
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-gold-400/20 via-gold-500/10 to-gold-400/20 blur-sm -z-10" />
      )}

      <div className="relative flex items-center">
        {/* Search icon */}
        <div className="absolute left-4 pointer-events-none">
          {loading ? (
            <svg
              className="w-5 h-5 text-gold-400 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="32"
                strokeDashoffset="8"
              />
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${focused ? "text-gold-400" : "text-white/30"}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search movies, directors, genres…"
          className="search-input w-full pl-12 pr-20 py-4 rounded-xl text-white placeholder-white/25 font-body text-base"
          aria-label="Search movies"
        />

        {/* Right side */}
        <div className="absolute right-4 flex items-center gap-2">
          {value && (
            <button
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white/80 transition-all duration-200 hover:scale-110 active:animate-button-press"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          {!value && (
            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-white/20 border border-white/10 rounded">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Result count hint */}
      {value && !loading && (
        <div className="absolute -bottom-6 left-0 text-xs text-white/30 font-mono">
          {resultCount > 0
            ? `${resultCount.toLocaleString()} results`
            : "No results found"}
        </div>
      )}
    </div>
  );
}
