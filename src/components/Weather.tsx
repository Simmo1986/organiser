import { useState, useEffect } from "react";

type WeatherData = {
  temp: number; // Temperature in Celsius
  description: string; // Weather description (e.g. clear sky)
  icon: string; // Icon code to show weather icon
};

export default function WeatherFeed() {
  // Replace with your city or use geolocation
  const city = "Sheerness";

  // Your OpenWeatherMap API key (sign up for free on their site)
  const apiKey = "204f4f79dc3908908bfb3b9aa212d008";

  // State for weather data
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");

      try {
        // Fetch current weather from OpenWeatherMap API
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch weather");
        }

        const data = await res.json();

        // Extract useful info
        const weatherData: WeatherData = {
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };

        setWeather(weatherData);
      } catch (err) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, apiKey]);

  return (
    <>
    <h1 className="flex items-center text-white justify-center gap-2 text-2xl font-bold mb-6 text-gray-800">
        <span role="img" aria-label="Weather">
          🌤️
        </span>
        Weather
    </h1>
    <div className="max-w-md mx-auto p-6 bg-black rounded shadow-md text-center">
      <h3 className="text-white font-bold mb-4">Weather in <span className="text-yellow-500">{city}</span></h3>

      {loading && <p className="text-white">Loading weather...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {weather && !loading && !error && (
        <div className="flex flex-col items-center gap-3">
          {/* Weather icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-20 h-20"
          />

          {/* Temperature */}
          <p className="text-4xl font-semibold text-white">{weather.temp}°C</p>

          {/* Description */}
          <p className="capitalize text-gray-100">{weather.description}</p>
        </div>
      )}
    </div>
    </>
  );
}
