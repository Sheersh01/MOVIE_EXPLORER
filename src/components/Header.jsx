import { useState, useEffect } from "react";

export default function Header({ favoritesCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cinema-950/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gold-400 rounded flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-cinema-950"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 3v18M17 3v18M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="absolute -inset-0.5 bg-gold-400 rounded blur opacity-30 -z-10" />
          </div>
          <div>
            <span className="font-display text-2xl text-white tracking-wider leading-none">
              CINE<span className="text-gold-400">SCOPE</span>
            </span>
            <div className="text-xs text-white/30 font-mono tracking-widest uppercase leading-none">
              Movie Explorer
            </div>
          </div>
        </div>

        {/* Nav badge */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 border border-white/10 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Powered by TMDB
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-gold-400/80 border border-gold-400/30 bg-gold-400/10 rounded-full px-3 py-1.5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z" />
            </svg>
            {favoritesCount} saved
          </div>
        </div>
      </div>
    </header>
  );
}
