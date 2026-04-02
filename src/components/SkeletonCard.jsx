export default function SkeletonCard() {
  return (
    <div className="bg-cinema-800 rounded-xl overflow-hidden border border-white/5">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] shimmer-bg" />
      {/* Info skeleton */}
      <div className="p-3 space-y-2">
        <div className="h-4 rounded shimmer-bg w-4/5" />
        <div className="h-3 rounded shimmer-bg w-2/5" />
      </div>
    </div>
  )
}
