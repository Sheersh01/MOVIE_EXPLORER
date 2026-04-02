export default function GenreFilter({ genres, activeGenre, onSelect }) {
  const topGenres = genres.slice(0, 10)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`genre-chip text-xs font-body font-medium px-3 py-1.5 rounded-full ${
          !activeGenre ? 'active' : 'text-white/50'
        }`}
      >
        All
      </button>
      {topGenres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(activeGenre === g.id ? null : g.id)}
          className={`genre-chip text-xs font-body font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${
            activeGenre === g.id ? 'active' : 'text-white/50'
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  )
}
