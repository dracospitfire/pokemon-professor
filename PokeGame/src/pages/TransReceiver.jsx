import "./TransReceiver.css";
import axios from "axios";
import { useState } from "react";
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

  if (loading) return <p>Loading...</p>;

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

  return (
    <>
      <CSSwrapper className="transporter" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Transporter Receiver</h1>
        <section className="transReceiver">
          <div className="user">
            <button className="receiver" onClick={fetchDailyPokemon}>
              <span className="receiver-header"><strong>Daily Pokemon Transfer</strong></span>
            </button>
          </div>
        </section>
        <>
        [TO DO]: When button receiver is clicked we want to fetchDailyPokemon if daily pokmeon succefully returns data when want to set chest to open and display pokemon data from backend. 
        <div className={chestOpened ? "pokemon-reward" : "open-chest"} >
          {chestOpened ? (
            <div className="pokemon-stats">
              <h2 className="recieved">You recieved, Pikachu!</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={Pikachu} alt="Pikachu" width={100} height={100} />
              </button>
              <br></br><strong>Trainer: </strong>Ash Katchum
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
            <>
              <div>Receive Pokémon</div>
              <br />
              <div>Press [R]</div>
              <div>or</div>
              <div>Double Tap</div>
            </>
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