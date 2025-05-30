import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import StartGame from "./pages/Game";
import MapsPage from "./pages/Maps";
import HomePage from "./pages/Home";
import Health from "./pages/Health";
import AccountPage from "./pages/Account";
import NewsPage from "./pages/News";
import BlogPage from "./pages/Blog";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<Health />} />
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
