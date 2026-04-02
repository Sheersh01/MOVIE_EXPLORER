export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center">
          <svg className="w-9 h-9 text-coral-400" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 7v6M12 17v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute -inset-1 bg-coral-500/5 rounded-2xl blur-lg -z-10" />
      </div>

      <h3 className="font-display text-3xl text-white tracking-wider mb-2">
        SOMETHING WENT WRONG
      </h3>
      <p className="text-white/40 text-sm text-center max-w-sm font-body mb-6 leading-relaxed">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-coral-500/10 hover:bg-coral-500/20 border border-coral-500/30 hover:border-coral-500/50 text-coral-400 px-5 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Try Again
      </button>
    </div>
  )
}
