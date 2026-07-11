import { getWeatherIconUrl, formatDate } from "@/lib/weather";

export default function CurrentWeather({ weather }) {
  const iconUrl = getWeatherIconUrl(weather.icon, "4x");
  const formattedDate = formatDate(weather.dt, weather.timezone);

  return (
    <section
      className="glass-card p-6 sm:p-8 lg:p-10 animate-fade-in-up"
      aria-label={`Current weather in ${weather.city}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <p className="text-white/50 text-sm font-medium tracking-wide uppercase">
            {formattedDate}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {weather.city}
            {weather.country && (
              <span className="text-white/40 text-2xl sm:text-3xl font-normal ml-2">
                {weather.country}
              </span>
            )}
          </h1>
          <p className="text-white/60 text-lg capitalize">{weather.condition}</p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <p
              className="text-6xl sm:text-7xl lg:text-8xl font-light text-white tracking-tighter"
              aria-label={`Temperature ${weather.temperature} degrees Celsius`}
            >
              {weather.temperature}
              <span className="text-3xl sm:text-4xl text-white/60 align-top">°</span>
            </p>
          </div>
          <img
            src={iconUrl}
            alt={weather.condition}
            width={120}
            height={120}
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 animate-float drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
