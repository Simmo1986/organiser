import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

const apiKey = import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY;
const PLAYLIST_URL =
  "https://www.googleapis.com/youtube/v3/playlistItems?" +
  new URLSearchParams({
    part: "snippet",
    maxResults: "5",
    playlistId: "PLVgXhkNS8506UC_M2N_tEMvRfQ2GJvuwd",
    key: apiKey,
  }).toString();

export function YouTubeFeed() {
  const [videos, setVideos] = useState<{ id: string; title: string }[]>([]);
  const sliderRef = useRef<any>(null);
  const playerRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(PLAYLIST_URL);
      const data = await res.json();
      setVideos(
        data.items.map((it: any) => ({
          id: it.snippet.resourceId.videoId,
          title: it.snippet.title,
        }))
      );
    }
    fetchVideos();
  }, []);

  // Send commands to iframe
  const postToIframe = (index: number, func: "playVideo" | "pauseVideo") => {
    const iframe = playerRefs.current[index];
    iframe?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args: [],
      }),
      "*"
    );
  };

  const handleSlideChange = (index: number) => {
    postToIframe(currentIndexRef.current, "pauseVideo");
    postToIframe(index, "playVideo");
    currentIndexRef.current = index;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    afterChange: handleSlideChange,
    arrows: true,
  };

  // Detect when a video ends and advance to next
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "object" &&
        event.data?.event === "onStateChange" &&
        event.data?.info === 0 // 0 = ended
      ) {
        const current = currentIndexRef.current;
        const next = (current + 1) % videos.length;
        sliderRef.current?.slickGoTo(next);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videos]);

  return (
    <>
      <h1 className="flex items-center text-white justify-center gap-2 text-2xl font-bold mb-6 text-gray-800">
        <span role="img" aria-label="Headphones">
          🎧
        </span>
        Your Songs
      </h1>

      <Slider {...settings} ref={sliderRef}>
        {videos.map((v, i) => (
          <div key={v.id} className="px-2">
            <iframe
              ref={(el) => { playerRefs.current[i] = el; }}
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${v.id}?enablejsapi=1`}
              title={v.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-lg shadow"
            />
            <p className="mt-2 text-gray-100 text-center">{v.title}</p>
          </div>
        ))}
      </Slider>
    </>
  );
}
