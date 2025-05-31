import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import StartGame from "./pages/Game.jsx";
import MapsPage from "./pages/Maps.jsx";
import HomePage from "./pages/Home.jsx";
import AccountPage from "./pages/Account.jsx";
import NewsPage from "./pages/News.jsx";
import BlogPage from "./pages/Blog.jsx";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const urls = [
      import.meta.env.VITE_API_URL ?? "http://localhost:2020",
      import.meta.env.VITE_MSA_URL ?? "http://localhost:2121",
      import.meta.env.VITE_MSB_URL ?? "http://localhost:2222",
      import.meta.env.VITE_MSC_URL ?? "http://localhost:2323",
      import.meta.env.VITE_MSD_URL ?? "http://localhost:2424",
    ];

    const ping = () => {
      urls.forEach((url) => {
        axios.get(url)
          .then(res => console.log(`Service ${url} pinged:`, res.data))
          .catch(err => console.error(`Service ${url} ping failed:`, err.message));
      });
    };


    // Initial ping
    ping();

    // Ping every 60 seconds
    const interval = setInterval(ping, 60000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/useraccount" element={<AccountPage />} />
        <Route path="/startgame" element={<StartGame />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/gamenews" element={<NewsPage />} />
        <Route path="/companyblog" element={<BlogPage />} />
      </Routes>
    </>
    
  );
};

export default App;
