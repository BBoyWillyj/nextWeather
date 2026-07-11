function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer ${className}`}
      aria-hidden="true"
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in" aria-label="Loading weather data" role="status">
      <span className="sr-only">Loading weather data...</span>

      {/* Hero skeleton */}
      <div className="glass-card p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-3 flex-1">
            <SkeletonBlock className="h-4 w-48" />
            <SkeletonBlock className="h-10 w-64" />
            <SkeletonBlock className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <SkeletonBlock className="h-20 w-24" />
            <SkeletonBlock className="h-28 w-28 rounded-full" />
          </div>
        </div>
      </div>

      {/* Details skeleton */}
      <div className="glass-card p-6 sm:p-8">
        <SkeletonBlock className="h-4 w-32 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-16" />
          ))}
        </div>
      </div>

      {/* Additional info skeleton */}
      <div className="glass-card p-6 sm:p-8">
        <SkeletonBlock className="h-4 w-32 mb-5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
