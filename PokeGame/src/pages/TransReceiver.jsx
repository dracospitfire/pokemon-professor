import "./TransReceiver.css";
import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";

import shoesteps from "../assets/Images/icons/Shoe.svg";
import Pikachu from "../assets/Images/pokemon/Pikachu.png"

function TransporterPage() {
  const [chestOpened, setChestOpened] = useState(false); 
  const [ dailyPokemon, setDailyPokemon] = useState([]);
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const lastTap = useRef(0)

  const userName = user?.email?.split("@")[0] ?? "Professor";

  const fetchDailyPokemon = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      const URL = import.meta.env.VITE_API_URL + "/api/baseStats_MSA/" + randomNumber;
      const response = await axios.get(URL);
      const pokemon = response.data?.data;
      console.log(response)
      console.log("button pressed");
      if (pokemon) {
        setDailyPokemon(pokemon);
        setChestOpened(true);
      } else {
        alert("No valid Pokémon received.");
        console.warn("Invalid data:", pokemon);
      }
    } catch (error) {
      alert("Error fetching daily Pokémon from the server.");
      console.error("Error fetching DailyPokemon:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "r" && !chestOpened) {
        fetchDailyPokemon();
      }
    };

    const handleDoubleTap = () => {
      const now = Date.now();
      const doubleTap = now - lastTap.current;
      if (doubleTap < 300 && !chestOpened) {
        fetchDailyPokemon();
        }
        lastTap.current = now;
      }

    const handleDoubleClick = () => {
      if (!chestOpened) {
        fetchDailyPokemon();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);            // Keyboard Input
    document.addEventListener("touchend", handleDoubleTap);       // Mobile Touch
    document.addEventListener("dblclick", handleDoubleClick);     // Mouse Click
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);        // Keyboard Input
      document.removeEventListener("touchend", handleDoubleTap);   // Mobile Touch
      document.removeEventListener("dblclick", handleDoubleClick); // Mouse Click
    };

  }, [chestOpened]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CSSwrapper className="transporter" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Transporter Receiver</h1>
        <section className="transReceiver">
          <div className="user">
            <div className="receiver">
              <span className="receiver-header"><strong>Daily Pokemon Transfer</strong></span>
            </div>
          </div>
        </section>
        <>
        <div className={chestOpened ? "pokemon-reward" : "open-chest"} >
          {chestOpened ? (
            <div className="pokemon-stats">
              <h2 className="recieved">You recieved, {dailyPokemon.name}</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={dailyPokemon.image} alt="Pikachu" width={200} height={200} />
              </button>
              <br></br><strong>Trainer: </strong>{userName}
              <ul>
                <li><strong>Type:</strong> {dailyPokemon.type}</li>
                <li><strong>HP:</strong> {dailyPokemon.hp}</li>
                <li><strong>Attack:</strong> {dailyPokemon.attack}</li>
                <li><strong>Defense:</strong> {dailyPokemon.defense}</li>
                <li><strong>Speed:</strong> {dailyPokemon.speed}</li>
                <li><strong>Special Attack:</strong> {dailyPokemon.special_attack}</li>
                <li><strong>Special Defense:</strong> {dailyPokemon.special_defense}</li>
              </ul>
              </div>
          ) : (
            <div className="click-to-receive" onClick={fetchDailyPokemon}>
              <div>Receive Pokémon</div>
              <br />
              <div>Press [R]</div>
              <div>or</div>
              <div>Double Tap</div>
            </div>
          )}
        </div>
        </>
        <section className="researcher">
          <button className="footstep-button" onClick={() => navigate("/startgame")}>
            <span className="side-text left"><strong>Walk the Grounds</strong></span>
            <div className="image-wrapper">
              <img src={shoesteps} alt="Walk to start game" className="footstep-icon" />
            </div>
            <span className="side-text right"><strong>Explore the Lab</strong></span>
          </button>
        </section>
        {!user && (
          <>
            <p>Ready to begin your Pokémon adventure?</p>
            <button onClick={() => navigate("/login")} className="login-button">
              Log in to get started.
            </button>
          </>
        )}
      </main>
      <SocialBar />
    </>
  );
}

export default TransporterPage;