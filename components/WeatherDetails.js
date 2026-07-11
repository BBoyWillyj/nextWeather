function DetailItem({ icon, label, value, unit = "" }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors duration-300">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-white text-lg font-semibold truncate">
          {value}
          {unit && <span className="text-white/60 text-sm font-normal ml-0.5">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

export default function WeatherDetails({ weather }) {
  const details = [
    {
      label: "Feels Like",
      value: `${weather.feelsLike}°`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "Humidity",
      value: weather.humidity,
      unit: "%",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-1.5 3-4 5.5-4 9a4 4 0 008 0c0-3.5-2.5-6-4-9z" />
        </svg>
      ),
    },
    {
      label: "Wind Speed",
      value: weather.windSpeed,
      unit: "m/s",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      ),
    },
    {
      label: "Pressure",
      value: weather.pressure,
      unit: "hPa",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "Visibility",
      value: weather.visibility,
      unit: "km",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      label: "Cloud Coverage",
      value: weather.cloudCoverage,
      unit: "%",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="glass-card p-6 sm:p-8 animate-fade-in-up"
      style={{ animationDelay: "0.1s" }}
      aria-label="Weather details"
    >
      <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
        Weather Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {details.map((item) => (
          <DetailItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            unit={item.unit}
          />
        ))}
      </div>
    </section>
  );
}
