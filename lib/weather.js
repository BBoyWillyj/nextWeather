const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5";
const GEOCODING_BASE = "https://api.openweathermap.org/geo/1.0";

export function getApiKey() {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("Missing OPENWEATHER_API_KEY environment variable");
  }
  return key;
}

export async function fetchWeatherByCity(city) {
  const apiKey = getApiKey();
  const url = `${OPENWEATHER_BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  const response = await fetch(url, { next: { revalidate: 300 } });

  if (response.status === 404) {
    throw new WeatherError("City not found. Please check the spelling and try again.", 404);
  }

  if (!response.ok) {
    throw new WeatherError("Unable to fetch weather data. Please try again later.", response.status);
  }

  return response.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const apiKey = getApiKey();
  const url = `${OPENWEATHER_BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const response = await fetch(url, { next: { revalidate: 300 } });

  if (!response.ok) {
    throw new WeatherError("Unable to fetch weather for your location.", response.status);
  }

  return response.json();
}

export async function fetchWeatherByCityId(cityId) {
  const apiKey = getApiKey();
  const url = `${OPENWEATHER_BASE}/weather?id=${cityId}&units=metric&appid=${apiKey}`;

  const response = await fetch(url, { next: { revalidate: 300 } });

  if (!response.ok) {
    throw new WeatherError("Unable to fetch weather data.", response.status);
  }

  return response.json();
}

export function formatWeatherData(data) {
  const sunrise = data.sys?.sunrise
    ? new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

  const sunset = data.sys?.sunset
    ? new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

  return {
    city: data.name,
    country: data.sys?.country || "",
    temperature: Math.round(data.main?.temp ?? 0),
    feelsLike: Math.round(data.main?.feels_like ?? 0),
    tempMin: Math.round(data.main?.temp_min ?? 0),
    tempMax: Math.round(data.main?.temp_max ?? 0),
    humidity: data.main?.humidity ?? 0,
    pressure: data.main?.pressure ?? 0,
    visibility: data.visibility ? Math.round(data.visibility / 1000) : 0,
    windSpeed: data.wind?.speed ?? 0,
    cloudCoverage: data.clouds?.all ?? 0,
    condition: data.weather?.[0]?.description || "Unknown",
    conditionMain: data.weather?.[0]?.main || "Unknown",
    icon: data.weather?.[0]?.icon || "01d",
    sunrise,
    sunset,
    timezone: data.timezone ?? 0,
    dt: data.dt ?? Date.now() / 1000,
  };
}

export function getWeatherIconUrl(iconCode, size = "4x") {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

export function formatDate(timestamp, timezoneOffset = 0) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export class WeatherError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "WeatherError";
    this.status = status;
  }
}

export function createErrorResponse(error, fallbackMessage = "Something went wrong") {
  if (error instanceof WeatherError) {
    return { message: error.message, status: error.status };
  }

  if (error?.name === "AbortError") {
    return { message: "Request timed out. Please try again.", status: 408 };
  }

  if (error?.message?.includes("fetch failed") || error?.code === "ECONNREFUSED") {
    return { message: "Network error. Please check your connection.", status: 503 };
  }

  if (error?.message?.includes("Missing OPENWEATHER_API_KEY")) {
    return { message: "Weather service is not configured.", status: 500 };
  }

  return { message: fallbackMessage, status: 500 };
}
