function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/8 transition-colors duration-300">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
        {icon}
      </div>
      <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white text-base sm:text-lg font-semibold">{value}</p>
    </div>
  );
}

export default function WeatherCard({ weather }) {
  const items = [
    {
      label: "Sunrise",
      value: weather.sunrise,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      ),
    },
    {
      label: "Sunset",
      value: weather.sunset,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
    {
      label: "Min Temp",
      value: `${weather.tempMin}°`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
    },
    {
      label: "Max Temp",
      value: `${weather.tempMax}°`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="glass-card p-6 sm:p-8 animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
      aria-label="Additional weather information"
    >
      <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
        Additional Info
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}
