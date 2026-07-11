# WeatherCast

A modern, production-quality weather web application built with **Next.js 15**, **JavaScript**, and **Tailwind CSS**. Search any city worldwide or use your current location to view real-time weather data.

![Weather App](./weather%20template.jpg)

## Features

- **City Search** — Search for any city worldwide with keyboard Enter support
- **Geolocation** — Automatically detects and displays weather for your current location
- **Secure API** — OpenWeather API key is kept server-side via Next.js API routes
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Glassmorphism UI** — Premium dark theme with subtle animations
- **Error Handling** — Graceful handling of invalid cities, network failures, and permission denials
- **Loading States** — Skeleton loaders and disabled controls during requests
- **Accessibility** — Semantic HTML, ARIA labels, and keyboard navigation

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [OpenWeather API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm
- An [OpenWeather API key](https://openweathermap.org/api) (free tier works)

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd nextWeather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and add your API key:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```env
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextWeather/
├── app/
│   ├── api/weather/route.js   # Secure API proxy to OpenWeather
│   ├── globals.css            # Global styles and animations
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── components/
│   ├── CurrentWeather.js      # Hero section with temperature
│   ├── ErrorMessage.js        # Error state UI
│   ├── LoadingSkeleton.js     # Skeleton loading cards
│   ├── SearchBar.js           # City search input
│   ├── WeatherApp.js          # Main app orchestrator
│   ├── WeatherCard.js         # Sunrise/sunset/min-max temps
│   └── WeatherDetails.js      # Feels like, humidity, wind, etc.
├── lib/
│   ├── useWeather.js          # Client-side weather hook
│   └── weather.js             # Server-side API utilities
├── .env.example
└── README.md
```

## API Routes

The frontend never calls OpenWeather directly. All requests go through:

```
GET /api/weather?city=London
GET /api/weather?lat=51.5074&lon=-0.1278
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Environment Variables

| Variable              | Description                    | Required |
| --------------------- | ------------------------------ | -------- |
| `OPENWEATHER_API_KEY` | Your OpenWeather API key       | Yes      |

> **Never commit `.env.local` to version control.**

## License

This project was created as an academic assignment.
