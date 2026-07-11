import { NextResponse } from "next/server";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  formatWeatherData,
  createErrorResponse,
} from "@/lib/weather";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!city && (!lat || !lon)) {
      return NextResponse.json(
        { error: "Please provide a city name or coordinates." },
        { status: 400 }
      );
    }

    let data;

    if (city) {
      data = await fetchWeatherByCity(city.trim());
    } else {
      data = await fetchWeatherByCoords(lat, lon);
    }

    return NextResponse.json(formatWeatherData(data));
  } catch (error) {
    const { message, status } = createErrorResponse(error, "Failed to fetch weather data");
    return NextResponse.json({ error: message }, { status });
  }
}
