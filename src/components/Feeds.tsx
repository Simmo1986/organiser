import { YouTubeFeed } from "./YouTube";
import WeatherData from "./Weather";

export default function Feeds() {
  return (
    <div className="p-6">
        <h1 className="flex items-center justify-center text-white gap-2 text-2xl font-bold mb-6 text-gray-800">
        <span role="img" aria-label="Clapperboard">🎬</span>
        Feeds
        </h1>
        <YouTubeFeed />
        <hr className="my-8 border-t border-gray-300" />
        <WeatherData />
    </div>

  );
}