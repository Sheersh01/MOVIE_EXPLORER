export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <svg className="w-9 h-9 text-white/20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <h3 className="font-display text-3xl text-white tracking-wider mb-2">NO RESULTS</h3>
      <p className="text-white/30 text-sm text-center max-w-xs font-body">
        No movies found for{' '}
        <span className="text-gold-400 font-medium">"{query}"</span>.
        <br />Try a different title or keyword.
      </p>
    </div>
  )
}
