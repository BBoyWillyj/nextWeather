"use client";

import { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherCard from "@/components/WeatherCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { useWeather } from "@/lib/useWeather";

export default function WeatherApp() {
  const {
    weather,
    isLoading,
    error,
    locationStatus,
    searchByCity,
    detectLocation,
    clearError,
    retry,
  } = useWeather();

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  const showSkeleton = isLoading && !weather;
  const showWeather = weather && !showSkeleton;

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="text-center space-y-2 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Weather<span className="text-accent">Cast</span>
        </h1>
        <p className="text-white/40 text-sm sm:text-base">
          Real-time weather for any city worldwide
        </p>
      </header>

      <SearchBar onSearch={searchByCity} isLoading={isLoading} />

      {locationStatus === "requesting" && !weather && !error && (
        <p className="text-center text-white/40 text-sm animate-pulse-soft" role="status">
          Detecting your location...
        </p>
      )}

      {locationStatus === "denied" && !weather && (
        <div className="text-center animate-fade-in">
          <button
            onClick={detectLocation}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-accent hover:text-accent-glow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 rounded-lg"
            aria-label="Retry location detection"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Use my location
          </button>
        </div>
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={retry}
          onDismiss={clearError}
        />
      )}

      {showSkeleton && <LoadingSkeleton />}

      {showWeather && (
        <div className="space-y-6 sm:space-y-8" key={weather.city}>
          <CurrentWeather weather={weather} />
          <WeatherDetails weather={weather} />
          <WeatherCard weather={weather} />
        </div>
      )}

      {!weather && !isLoading && !error && locationStatus === "idle" && (
        <div className="glass-card p-8 sm:p-12 text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <p className="text-white/60 text-lg mb-2">Welcome to WeatherCast</p>
          <p className="text-white/40 text-sm">
            Search for a city or allow location access to get started
          </p>
        </div>
      )}
    </div>
  );
}
