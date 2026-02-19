import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [videos, setVideos] = useState([]);

  // Read API config from Vite environment variables.
  const API_URL = import.meta.env.VITE_API_URL ||
    "https://youtube-v2.p.rapidapi.com/trending/?lang=en&country=us&section=Gaming";
  const API_KEY = import.meta.env.VITE_API_KEY || "YOUR_API_KEY_HERE";
  const API_HOST = import.meta.env.VITE_API_HOST || "youtube-v2.p.rapidapi.com";

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data.videos || []);
      })
      .catch((err) => console.error(err));
  }, [API_URL, API_KEY, API_HOST]);

  return (
    <div>
      <h1>Trending Gaming Videos</h1>

      {videos.map((video, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <img src={video.thumbnails?.[0]?.url} width="200" />
          <h3>{video.title}</h3>
          <p>{video.author?.title}</p>
        </div>
      ))}
    </div>
  );
}
