"use client";

import { useState, useCallback, useRef } from "react";

const REQUEST_TIMEOUT = 15000;

async function fetchWeather(params) {
  const searchParams = new URLSearchParams(params);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`/api/weather?${searchParams.toString()}`, {
      signal: controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch weather data");
    }

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const requestIdRef = useRef(0);

  const loadWeather = useCallback(async (params) => {
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your connection.");
      }

      const data = await fetchWeather(params);

      if (currentRequestId === requestIdRef.current) {
        setWeather(data);
      }
    } catch (err) {
      if (currentRequestId === requestIdRef.current) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const searchByCity = useCallback(
    (city) => {
      if (!city.trim()) {
        setError("Please enter a city name.");
        return;
      }
      loadWeather({ city: city.trim() });
    },
    [loadWeather]
  );

  const loadByCoords = useCallback(
    (lat, lon) => {
      loadWeather({ lat: lat.toString(), lon: lon.toString() });
    },
    [loadWeather]
  );

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("requesting");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("granted");
        loadByCoords(position.coords.latitude, position.coords.longitude);
      },
      (geoError) => {
        setLocationStatus("denied");
        const messages = {
          1: "Location permission denied. Search for a city instead.",
          2: "Unable to determine your location. Please try again.",
          3: "Location request timed out. Please try again.",
        };
        setError(messages[geoError.code] || "Unable to access your location.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, [loadByCoords]);

  const clearError = useCallback(() => setError(null), []);

  const retry = useCallback(() => {
    if (weather) {
      const params = weather.city ? { city: weather.city } : {};
      if (Object.keys(params).length) {
        loadWeather(params);
      }
    } else {
      detectLocation();
    }
  }, [weather, loadWeather, detectLocation]);

  return {
    weather,
    isLoading,
    error,
    locationStatus,
    searchByCity,
    detectLocation,
    loadByCoords,
    clearError,
    retry,
  };
}
