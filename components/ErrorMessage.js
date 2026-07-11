const ERROR_ICONS = {
  location: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
    </svg>
  ),
  default: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

function getIconType(message) {
  const lower = message.toLowerCase();
  if (lower.includes("location") || lower.includes("permission") || lower.includes("geolocation")) {
    return "location";
  }
  if (lower.includes("not found") || lower.includes("city")) {
    return "search";
  }
  if (lower.includes("network") || lower.includes("connection") || lower.includes("offline")) {
    return "network";
  }
  return "default";
}

export default function ErrorMessage({ message, onRetry, onDismiss }) {
  const iconType = getIconType(message);

  return (
    <div
      className="glass-card p-5 sm:p-6 border border-red-500/20 animate-fade-in-up"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400">
          {ERROR_ICONS[iconType]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium mb-1">Something went wrong</p>
          <p className="text-white/60 text-sm">{message}</p>
          {(onRetry || onDismiss) && (
            <div className="flex gap-3 mt-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent/80 hover:bg-accent rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  Try again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
