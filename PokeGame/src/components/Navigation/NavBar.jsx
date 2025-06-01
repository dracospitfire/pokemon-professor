import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../config/authprovider";
import { supabase } from '../../config/supabase';
import axios from "axios";

const NavBar = () => {
  const { user } = useAuth();
  const [sliderValue, setSliderValue] = useState(100);

  const resetDatabase = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "resetdatabase";
      const response = await axios.post(URL);

      if (response.status === 200) {
        alert(response.data.message);
        
      }
    } catch (err) {
      if (err.response) {
        // Backend Responses (300, 400, 404, 406, 500)
        alert(err.response.data.error);
      } else {
        // No Response (Network error or CORS issue)
        alert("No response from server. Network error or CORS issue.");
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
  <>
    <header className="head-nav">
      <div className="logo">
        <Link to="/" className="rest-tool" onClick={resetDatabase}>
          <img src="./PP-logo.png" alt="PokeProfessor Logo" />
          <span className="rest-tool-text">Let's Play</span>
        </Link>
      </div>
      {user && (
        <div className="professor-info">
          <div className="slider-label">
            <strong>Sign: Out</strong>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue={100}
            className="signout-slider"
            onInput={(e) => setSliderValue(parseInt(e.target.value))}
            onMouseUp={() => {
              if (sliderValue === 0) {
                handleSignOut();
              } else {
                setSliderValue(100);
              }
            }}
            onTouchEnd={() => {
              if (sliderValue === 0) {
                handleSignOut();
              } else {
                setSliderValue(100);
              }
            }}
          />
          <div className="slider-label">
            <strong>In the Lab</strong>
          </div>
        </div>
      )}
      <nav className="internal-nav">
        <Link to="/">Home</Link>
        |{user ? (
        <Link to="/useraccount">Account</Link> ) : ( <Link to="/login">Account</Link> )}
        |{user ? (
        <Link to="/startgame">Game</Link> ) : ( <Link to="/login">Game</Link> )}
        |
        <Link to="/gamenews">News</Link>
        |
        <Link to="/companyblog">Blog</Link>
      </nav>
    </header>
  </>
  );
};

export default NavBar;
