export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const max = Math.min(totalPages, 500)

  const getPages = () => {
    const pages = []
    const delta = 2
    const left = Math.max(1, page - delta)
    const right = Math.min(max, page + delta)

    if (left > 1) { pages.push(1); if (left > 2) pages.push('...') }
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < max) { if (right < max - 1) pages.push('...'); pages.push(max) }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-body font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-white/20 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-mono font-medium border transition-all ${
              p === page
                ? 'bg-gold-400/15 border-gold-400/40 text-gold-400'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/25'
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === max}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-body font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
