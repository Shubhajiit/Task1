import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_YT_API_KEY;

  const categories = [
    { label: "All", id: "" },
    { label: "Gaming", id: "20" },
    { label: "Music", id: "10" },
    { label: "News", id: "25" },
    { label: "Sports", id: "17" },
    { label: "Movies", id: "1" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[1]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_KEY) {
          throw new Error("YouTube API key is missing. Check VITE_YT_API_KEY in .env");
        }

        const params = new URLSearchParams({
          part: "snippet",
          chart: "mostPopular",
          maxResults: "20",
          regionCode: "US",
          key: API_KEY,
        });

        if (selectedCategory?.id) params.set("videoCategoryId", selectedCategory.id);

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch data: ${response.status} ${text}`);
        }

        const data = await response.json();
        setVideos(data?.items || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  if (loading)
    return (
      <div className="app-container">
        <div className="skeleton-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-thumb" />
              <div className="skeleton-meta">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="app-container">
      <h1>Trending {selectedCategory.label} Videos</h1>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`cat-btn ${cat.label === selectedCategory.label ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={video.id || index} className="video-card">
            <div className="thumb">
              <img
                src={
                  video.snippet?.thumbnails?.high?.url ||
                  video.snippet?.thumbnails?.medium?.url ||
                  video.snippet?.thumbnails?.default?.url
                }
                alt={video.snippet?.title}
              />
            </div>
            <div className="meta">
              <h3 className="title">{video.snippet?.title}</h3>
              <p className="channel">{video.snippet?.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
