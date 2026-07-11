"use client";

import { useState, useCallback, useRef } from "react";

export default function SearchBar({ onSearch, isLoading, autoFocus = true }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed || isLoading) return;
      onSearch(trimmed);
    },
    [query, isLoading, onSearch]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto animate-fade-in"
      role="search"
      aria-label="Search for a city"
    >
      <div className="relative flex items-center gap-2 sm:gap-3">
        <div className="relative flex-1 group">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-accent transition-colors duration-200 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for cities worldwide..."
            autoFocus={autoFocus}
            disabled={isLoading}
            aria-label="City name"
            className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          aria-label="Search weather"
          className="px-5 sm:px-6 py-3.5 sm:py-4 bg-accent hover:bg-accent-glow disabled:bg-accent/40 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
}
