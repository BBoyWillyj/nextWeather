import WeatherApp from "@/components/WeatherApp";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1219] via-[#1a1f2e] to-[#0d1526]" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <WeatherApp />
      </div>
    </main>
  );
}
