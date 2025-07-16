import { useState } from "react";

const stations = [
  {
    name: "BBC Radio 1",
    streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
  },
  {
    name: "BBC Radio 2",
    streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_two",
  },
  {
    name: "Heart FM (London)",
    streamUrl: "https://media-ice.musicradio.com/HeartLondonMP3",
  },
];

export default function RadioPlayer() {
  const [currentStation, setCurrentStation] = useState(stations[0]);

  return (
    <>
    <h1 className="flex items-center text-white justify-center gap-2 text-2xl font-bold mb-6 text-gray-800">
    📻 Live Radio
    </h1>
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">

      <select
        value={currentStation.name}
        onChange={(e) => {
          const selected = stations.find(s => s.name === e.target.value);
          if (selected) setCurrentStation(selected);
        }}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring"
      >
        {stations.map((station) => (
          <option key={station.name} value={station.name}>
            {station.name}
          </option>
        ))}
      </select>

      <audio
        key={currentStation.streamUrl} // reset stream when changed
        controls
        className="w-full"
      >
        <source src={currentStation.streamUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    </>
  );
}
