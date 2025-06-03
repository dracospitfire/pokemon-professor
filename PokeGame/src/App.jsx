import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import StartGame from "./pages/Game";
import Transporter from "./pages/TransReceiver";
import Scanner from "./pages/BodyScanner";
import Analyzer from "./pages/MediAnalyzer";
import Sequencer from "./pages/PolySequencer";
import MapsPage from "./pages/Maps";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Account";
import WelcomePage from "./pages/Welcome";
import NewsPage from "./pages/News";
import BlogPage from "./pages/Blog";
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
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/useraccount" element={<AccountPage />} />
        <Route path="/startgame" element={<StartGame />} />
        <Route path="/transporter" element={<Transporter />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/sequencer" element={<Sequencer />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/gamenews" element={<NewsPage />} />
        <Route path="/companyblog" element={<BlogPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
    
  );
};

export default App;
