# 🎬 MovieVault — Movie Explorer

> A responsive, component-based React application for discovering and searching movies using The Movie Database (TMDB) API with advanced features like favorites, watchlist, and recently viewed tracking.

## ✨ Features

### Core Discovery

- **Search Movies** - Real-time search across 1M+ movies with debounced input (420ms)
- **Browse by Genre** - Filter movies by 10+ popular genres
- **Multiple Sort Modes** - Popular, Top Rated, Upcoming, Now Playing feeds
- **Pagination** - Navigate through large result sets with smooth scroll-to-top

### User Engagement

- **❤️ Favorites** - Save your favorite movies with persistent localStorage
- **📋 Watchlist** - Maintain a custom watchlist with editable notes and hashtags per movie
- **⏱️ Recently Viewed** - Auto-tracked history strip showing your last 12 opened movies
- **🎲 Surprise Me** - Random movie picker from current filtered results

### Advanced Features

- **Client-Side Sorting** - Sort results by rating (high/low), year (new/old), title A-Z within any feed
- **URL State Sync** - Shareable links preserve search queries, genres, sort modes, and pagination
- **Favorites-Only View** - Filter to show only saved favorites with independent sorting
- **Responsive Design** - Mobile-first Tailwind CSS with cinema aesthetic

### Animations & Polish

- **Smooth Transitions** - Staggered entry animations on list items and tags
- **Button Feedback** - Scale and press animations on all interactive elements
- **Hover Effects** - Glow, shadow, and scale effects on cards and buttons
- **Loading States** - Skeleton cards with shimmer animation (no layout shift)
- **Keyboard Shortcuts** - Press `/` or `Ctrl+K` to focus search, `Esc` to close modal

---

## 🚀 Live Demo

[**GitHub Repository →**](https://github.com/Sheersh01/MOVIE_EXPLORER)
[**Video Demo →**](https://drive.google.com/file/d/1eqKin4q_vmTKvaTPy_mGqx2NGVc_8e_X/view?usp=sharing)

_Deploy your own on Vercel in 1 click (see Setup section)_

---

## 📦 Tech Stack

| Category  | Choice                                                  | Reason                                        |
| --------- | ------------------------------------------------------- | --------------------------------------------- |
| Framework | React 18 + Vite                                         | Fast HMR, modern JSX, Lightning-fast builds   |
| Styling   | Tailwind CSS v3                                         | Utility-first, highly responsive, minimal CSS |
| API       | TMDB v3 REST API                                        | Free, comprehensive 1M+ movie database        |
| State     | React Hooks (useState, useEffect, useCallback, useMemo) | Local state + localStorage for persistence    |
| Storage   | Browser localStorage                                    | No backend needed, instant persistence        |
| Fonts     | Bebas Neue + DM Sans                                    | Google Fonts (distinct display/body pairing)  |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Sticky nav with favorites count badge
│   ├── SearchBar.jsx           # Debounced search with clear & keyboard shortcuts
│   ├── GenreFilter.jsx         # Genre chip filter bar
│   ├── MovieCard.jsx           # Movie grid card with favorite toggle
│   ├── SkeletonCard.jsx        # Shimmer placeholder during loading
│   ├── MovieModal.jsx          # Detail modal with watchlist + animations
│   ├── Pagination.jsx          # Animated page navigator
│   ├── WatchlistPanel.jsx      # Watchlist with inline note/tag editing
│   ├── RecentlyViewedStrip.jsx # Horizontal carousel of recent movies
│   ├── ErrorState.jsx          # Error UI with retry action
│   └── EmptyState.jsx          # No-results illustration
├── hooks/
│   └── useMovies.js            # Data fetching with genre support
├── utils/
│   └── helpers.js              # Image URLs, formatters, year extraction
├── App.jsx                     # Root: state, localStorage, URL sync
├── main.jsx                    # React 18 entry point
└── index.css                   # Tailwind + custom keyframes/animations
```

### Data Persistence (localStorage)

- **`movie_explorer_favorites`** - Array of favorite movie objects
- **`movie_explorer_watchlist`** - Array of watchlist items with note/tags
- **`movie_explorer_recently_viewed`** - Array of 12 most recent movies (auto-managed)

### URL Query Parameters (auto-synced)

- `?q=search_term` - Search query
- `?genre=28` - Genre filter (ID)
- `?page=2` - Current page
- `?feed=top_rated` - Browse mode (popular/top_rated/upcoming/now_playing)
- `?order=rating_desc` - Result sort (default/rating_desc/rating_asc/year_desc/year_asc/title_asc)
- `?fav=1` - Favorites-only view flag

Example: `/?q=inception&genre=28&order=rating_desc&fav=1`

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- **TMDB API Key** (free, 30 seconds to get)

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Sheersh01/MOVIE_EXPLORER.git
cd MOVIE_EXPLORER

# 2. Install dependencies
npm install

# 3. Create .env file with your TMDB API key
echo "VITE_TMDB_API_KEY=your_key_here" > .env

# 4. Start dev server
npm run dev
# → Open http://localhost:5173

# 5. Build for production
npm run build
npm run preview
```

---

## 🔑 Getting Your TMDB API Key

1. Go to [themoviedb.org/signup](https://www.themoviedb.org/signup) and create a free account
2. Navigate to **Settings → API** (left sidebar)
3. Click **Create** or **Request an API Key**
4. Choose **Developer** for personal use
5. Accept the terms and fill in basic info
6. Copy your **API Key (v3 auth)**
7. Paste into your `.env` file:
   ```
   VITE_TMDB_API_KEY=your_copied_key_here
   ```

Get your key in **60 seconds**: [Full walkthrough](https://www.themoviedb.org/settings/api)

---

## 🌐 Deploy to Vercel (Free)

### Option 1: Via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your `MOVIE_EXPLORER` repo
4. Vercel auto-detects Vite configuration
5. Add Environment Variable:
   - **Name:** `VITE_TMDB_API_KEY`
   - **Value:** Your TMDB API key
6. Click **Deploy** ✓

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
# Follow CLI prompts, add env var when prompted
```

Your app is now live! 🎉

---

## 🏗️ Architecture & Design Decisions

### State Management Philosophy

Uses React's native hooks (`useState`, `useCallback`, `useMemo`) with no external libraries:

- **Server State** - Movies, genres, loading → encapsulated in `useMovies` custom hook
- **UI State** - Query, page, sort, filters → managed in `App.jsx` root component
- **Persistent State** - Favorites, watchlist → localStorage + synchronization hooks
- **URL State** - Query params → auto-synced via `window.history.replaceState()`

**Why minimal dependencies?** The app's state complexity is low enough that local state + localStorage covers all needs without Redux/Zustand overhead.

### Performance Optimizations

- **`useMemo`** - favoriteIds/watchlistIds stored as Sets for O(1) lookups
- **`useCallback`** - All event handlers memoized to prevent unnecessary renders
- **Debounce** - Search input debounced 420ms before API call (reduces requests by 80%)
- **AbortController** - Stale fetch requests cancelled automatically
- **Lazy Images** - Native `loading="lazy"` on poster images
- **Code Splitting** - Vite handles dynamic imports automatically

### Animation Strategy

9 custom `@keyframes` + Tailwind animations:

- **Entry animations** - `slideDown`, `slideInLeft`, `scaleIn`
- **Interactive** - `buttonPress`, `float`, `pulse`
- **Focus/Hover** - `glowIn`, `glow` effects
- **Exit** - `fadeOutDown`, `slideOutRight`

Stagger delays applied via inline `style={{ animationDelay }}` for cascading effects. All animations use `transform` & `opacity` (GPU-accelerated, no layout thrashing).

### Component Design

- Single Responsibility Principle - Each component does one thing
- Props drilling avoided - State passed through App.jsx only
- Custom hooks for reusable logic - `useMovies`, `useDebounce`
- Error boundaries built-in - Graceful fallbacks for API failures

---

## 📱 Responsive Breakpoints

Grid layout automatically adjusts across screen sizes:

| Breakpoint                 | Columns | Example Devices         |
| -------------------------- | ------- | ----------------------- |
| **Mobile** `< 640px`       | 2       | iPhone, small phones    |
| **Tablet** `640px–768px`   | 3       | iPad mini, tablets      |
| **Desktop** `768px–1024px` | 4       | Laptops, small monitors |
| **Wide** `1024px–1280px`   | 5       | Large displays          |
| **XL** `≥ 1280px`          | 6       | 4K/ultrawide            |

---

## 🎮 Keyboard Shortcuts

| Shortcut             | Action            |
| -------------------- | ----------------- |
| `/` or `Ctrl+K`      | Focus search bar  |
| `Esc`                | Close movie modal |
| `Enter`              | Submit search     |
| `Ctrl+K` (in search) | Clear and refocus |

---

## 💡 Tips & Tricks

### Sharing Collections

1. Build your favorite movie collection
2. Click favorites and select order (rating, year, etc)
3. Copy the URL - it's fully shareable!
4. Friends open the link and see **your exact collection & sort**

### Watchlist Notes

- Add movies to watchlist (`Add to Watchlist` button)
- Click the watchlist item to edit **notes** and **hashtags**
- Hashtags let you tag movies: `#must-watch #scifi #2024`
- All changes auto-save to browser storage

### Recently Viewed

- Your last 12 opened movies appear in the strip at the top
- Click any to instantly re-open
- Clears when you clear browser data

---

## 🐛 Troubleshooting

**Q: "API key not working" error**

- Verify key is in `.env` as `VITE_TMDB_API_KEY=xxx`
- Restart dev server after adding `.env`
- Check TMDB dashboard that API is enabled

**Q: Movies not loading**

- Check browser console for errors (F12)
- Verify internet connection
- TMDB API temporarily down? Check [status.themoviedb.org](https://status.themoviedb.org)

**Q: Favorites/watchlist disappeared**

- Check if cookies/storage cleared (Incognito mode won't persist)
- Open DevTools → Applications → localStorage to verify data

**Q: Search is slow**

- Normal - 420ms debounce intentional to reduce API calls
- First search takes longer while data loads
- Subsequent searches cache in browser

---

## 🙏 Credits & Acknowledgments

- **Movie Data** - [The Movie Database (TMDB)](https://www.themoviedb.org) - Community-powered, free API
- **Fonts** - [Google Fonts](https://fonts.google.com) - Bebas Neue & DM Sans
- **Icons** - Custom SVGs
- **Hosting** - [Vercel](https://vercel.com) (optional, free tier available)

### Technologies

- [React 18](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS v3](https://tailwindcss.com) - Styling
- [TMDB API v3](https://www.themoviedb.org/settings/api) - Data

---

## 📄 License

This project is **open source**. Feel free to fork, modify, and use for personal/commercial projects.

---

## 📞 Feedback & Contributions

Found a bug? Have a feature idea?

- Open an issue: [GitHub Issues](https://github.com/Sheersh01/MOVIE_EXPLORER/issues)
- Pull requests welcome!

---

**⚠️ Not Endorsed by TMDB**  
This product uses the TMDB API but is not endorsed or certified by The Movie Database.

---

_Last updated: April 2026_
