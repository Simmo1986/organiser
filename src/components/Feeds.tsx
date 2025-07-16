import { YouTubeFeed } from "./YouTube";
import WeatherData from "./Weather";
import RadioFeed from "./Radio";

export default function Feeds() {
  return (
    <div className="p-6">
        <YouTubeFeed />
        <hr className="my-8 border-t border-gray-300" />
        <WeatherData />
        <hr className="my-8 border-t border-gray-300" />
        <RadioFeed />
    </div>

  );
}