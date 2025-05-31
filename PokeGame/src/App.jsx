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
    const ping = () => {
      axios.get(import.meta.env.VITE_API_URL)
        .then(res => console.log("Backend pinged:", res.data))
        .catch(err => console.error("Ping failed:", err.message));
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
