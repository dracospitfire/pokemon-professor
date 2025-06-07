import "./PolySequencer.css";
import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import AmyLupin from "../components/LabAssistant/AmyLupin";

import shoesteps from "../assets/Images/icons/Shoe.svg";

function ScannerPage() {
  const [chest1Opened, setChest1Opened] = useState(false);
  const [chest2Opened, setChest2Opened] = useState(false);
  const [ pokeBody1, setpokeBody1] = useState([]);
  const [ pokeBody2, setpokeBody2] = useState([]);

  const evoPokemon = useRef('');

  const [pokemon, setPokemon] = useState({
    scanPokemon : '', 
  });
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const lastTap = useRef(0)

  const userName = user?.email?.split("@")[0] ?? "Professor";

  const fetchPokemon1 = async (e) => {
    // // Prevent page reload
    // e.preventDefault();
    const pokedexId = Number(evoPokemon.current);
    if (!pokedexId) {
      alert("Please select Pokémon #1 before scanning.");
      return;
    }

    try {
      const pokedexId = Number(evoPokemon.current);
      const URL = import.meta.env.VITE_API_URL + "/api/evoChain_MSD/" + pokedexId;
      const response = await axios.get(URL);
      const pokemon = response.data?.data;
      console.log(response)
      console.log("button pressed");
      if (pokemon) {
        setpokeBody1(pokemon);
        setChest1Opened(true);
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

  const fetchPokemon2 = async (e) => {
    // // Prevent page reload
    // e.preventDefault();

    const pokedexId = Number(evoPokemon.current)
    if (!pokedexId) {
      alert("Please select Pokémon #2 before scanning.");
      return;
    }

    try {
      const pokedexId = Number(evoPokemon.current) + 1
      const URL = import.meta.env.VITE_API_URL + "/api/evoChain_MSD/" + pokedexId;
      const response = await axios.get(URL);
      const pokemon = response.data?.data;
      console.log(response)
      console.log("button pressed");
      if (pokemon) {
        setpokeBody2(pokemon);
        setChest2Opened(true);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "l" && !chest1Opened) {
        fetchPokemon1();
      }
      if (e.key.toLowerCase() === "r" && !chest2Opened) {
        fetchPokemon2();
      }
    };

    const handleDoubleTap = async (e) => {
      const now = Date.now();
      const doubleTap = now - lastTap.current;
      const box = e.target.closest('[data-box]')?.getAttribute('data-box');
      if (doubleTap < 300) {
        if (box === "1" && !chest1Opened) {
          fetchPokemon1();
        } else if (box === "2" && !chest2Opened) {l
          fetchPokemon2();
        }
      }
      lastTap.current = now;
      }

    const handleDoubleClick = async (e) => {
      const box = e.target.closest('[data-box]')?.getAttribute('data-box');
      if (box === "1" && !chest1Opened) {
        fetchPokemon1();
      } else if (box === "2" && !chest2Opened) {
        fetchPokemon2();
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

  }, [chest1Opened, chest2Opened]);

  const handlePokemonChange = (e) => {
    const { name, value } = e.target;
    evoPokemon.current = value;
    setPokemon((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CSSwrapper className="sequencer" />
      <PokeballThrow />
      <NavBar />
      <main>
        <div className="assistant">
          <h1>Phylogenetic Sequencer</h1>
          <AmyLupin message="Click to go to Main Menu" route="/welcome"/>
        </div>
        <section className="polySequencer">
          <div className="user">
            <div className="receiver">
              <span className="receiver-header"><strong>Evolution Chain Matrixs</strong></span>
            </div>
          </div>
        </section>
        <div className="pokeselection">
          <div className="label-select">
            <label htmlFor="pokeBody"><strong>Pokemon: </strong></label>
            <select
              name="scanPokemon"
              value={pokemon.scanPokemon}
              onChange={handlePokemonChange}
              required
            >
              <option value=""></option>
              <option value="84">Doduo</option>
              <option value="77">Ponyta</option>
              <option value="58">Growlithe</option>
              <option value="100">Voltorb</option>
              <option value="88">Grimer</option>
              <option value="109">Koffing</option>
              <option value="86">Seel</option>
              <option value="90">Shellder</option>
              <option value="98">Krabby</option>
              <option value="104">Cubone</option>
              <option value="605">Elgyem</option>
              <option value="517">Munna</option>
              <option value="163">Hoothoot</option>
              <option value="209">Snubbull</option>
              <option value="231">Phanpy</option>
              <option value="322">Numel</option>
              <option value="331">Cacnea</option>
              <option value="309">Electrike</option>
              <option value="333">Swablu</option>
              <option value="216">Teddiursa</option>
            </select>
          </div>
        </div>
        <div className="bodyShapes">
        <div data-box="1" className={chest1Opened ? "pokemon-recieved" : "stand-by"} >
          {chest1Opened ? (
            <div className="pokemon-scan">
              <h2 className="recieved">Stage 1: {pokeBody1.name}</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={pokeBody1.image} alt="Pikachu" width={200} height={200} />
              </button>
              <br></br><strong>Trainer: </strong>{userName}
              <ul>
                <li><strong>Type:</strong> {pokeBody1.type}</li>
                <li><strong>HP:</strong> {pokeBody1.hp}</li>
                <li><strong>Attack:</strong> {pokeBody1.attack}</li>
                <li><strong>Defense:</strong> {pokeBody1.defense}</li>
                <li><strong>Speed:</strong> {pokeBody1.speed}</li>
                <li><strong>Special Attack:</strong> {pokeBody1.special_attack}</li>
                <li><strong>Special Defense:</strong> {pokeBody1.special_defense}</li>
              </ul>
              </div>
          ) : (
            <div className="click-to-receive" onClick={fetchPokemon1}>
              <div>Stage 1 Evolution</div>
              <br />
              <div>Press [L]</div>
              <div>or</div>
              <div>Double Tap</div>
            </div>
          )}
        </div>
        <div data-box="2" className={chest2Opened ? "pokemon-recieved" : "stand-by"} >
          {chest2Opened ? (
            <div className="pokemon-scan">
              <h2 className="recieved">Stage 2: {pokeBody2.name}</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={pokeBody2.image} alt="Pikachu" width={200} height={200} />
              </button>
              <br></br><strong>Trainer: </strong>{userName}
              <ul>
                <li><strong>Type:</strong> {pokeBody2.type}</li>
                <li><strong>HP:</strong> {pokeBody2.hp}</li>
                <li><strong>Attack:</strong> {pokeBody2.attack}</li>
                <li><strong>Defense:</strong> {pokeBody2.defense}</li>
                <li><strong>Speed:</strong> {pokeBody2.speed}</li>
                <li><strong>Special Attack:</strong> {pokeBody2.special_attack}</li>
                <li><strong>Special Defense:</strong> {pokeBody2.special_defense}</li>
              </ul>
              </div>
          ) : (
            <div className="click-to-receive" onClick={fetchPokemon2}>
              <div>Stage 2 Evolution</div>
              <br />
              <div>Press [R]</div>
              <div>or</div>
              <div>Double Tap</div>
            </div>
          )}
          </div>
        </div>
        <div className="reset-scan" >
          <button onClick={() => { setChest1Opened(false); setChest2Opened(false); setPokemon({ scanPokemon: '' }); evoPokemon.current = ''}} className="pokemon1-clear">
            <span className="pokemon1-text"><strong>Clear</strong></span>
          </button>
        </div>
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

export default ScannerPage;