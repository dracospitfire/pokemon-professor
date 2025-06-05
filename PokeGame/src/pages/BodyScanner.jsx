import "./BodyScanner.css";
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

function ScannerPage() {
  const [chest1Opened, setChest1Opened] = useState(false);
  const [chest2Opened, setChest2Opened] = useState(false);
  const [ pokeBody1, setpokeBody1] = useState([]);
  const [ pokeBody2, setpokeBody2] = useState([]);

  const scanPokemon1 = useRef('');
  const scanPokemon2 = useRef('');

  const [pokemon1, setPokemon1] = useState({
    scanPokemon : '', 
  });

  const [pokemon2, setPokemon2] = useState({
    scanPokemon : '', 
  });
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const lastTap = useRef(0)

  const userName = user?.email?.split("@")[0] ?? "Professor";

  const fetchPokemon1 = async (e) => {
    // // Prevent page reload
    // e.preventDefault();
    const name = scanPokemon1.current.trim().toLowerCase();
    if (!name) {
      alert("Please select Pokémon #1 before scanning.");
      return;
    }

    try {
      const name = scanPokemon1.current.trim().toLowerCase();
      const URL = import.meta.env.VITE_API_URL + "/api/pokeBody_MSB/" + name;
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

    const name = scanPokemon2.current.trim().toLowerCase();
    if (!name) {
      alert("Please select Pokémon #2 before scanning.");
      return;
    }

    try {
      const name = scanPokemon2.current.trim().toLowerCase();
      const URL = import.meta.env.VITE_API_URL + "/api/baseStats_MSA/" + name;
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

  const handlePokemonChange1 = (e) => {
    const { name, value } = e.target;
    scanPokemon1.current = value;
    setPokemon1((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };

  const handlePokemonChange2 = (e) => {
    const { name, value } = e.target;
    scanPokemon2.current = value;
    setPokemon2((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CSSwrapper className="scanner" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Computed Scanner</h1>
        <section className="budyScanner">
          <div className="user">
            <div className="receiver">
              <span className="receiver-header"><strong>Full Body Scanner</strong></span>
            </div>
          </div>
        </section>
        <div className="pokeselection">
          <div className="label-select">
            <label htmlFor="pokeBody"><strong>Pokemon #1: </strong></label>
            <select
              name="scanPokemon"
              value={pokemon1.scanPokemon}
              onChange={handlePokemonChange1}
              required
            >
              <option value=""></option>
              <option value="Bulbasaur">Bulbasaur</option>
              <option value="Charmander">Charmander</option>
              <option value="Squirtle">Squirtle</option>
              <option value="Pikachu">Pikachu</option>
              <option value="Eevee">Eevee</option>
              <option value="Snorlax">Snorlax</option>
              <option value="Gengar">Gengar</option>
              <option value="Jigglypuff">Jigglypuff</option>
              <option value="Meowth">Meowth</option>
              <option value="Psyduck">Psyduck</option>
              <option value="Machop">Machop</option>
              <option value="Geodude">Geodude</option>
              <option value="Vulpix">Vulpix</option>
              <option value="Growlithe">Growlithe</option>
              <option value="Abra">Abra</option>
              <option value="Dratini">Dratini</option>
              <option value="Lapras">Lapras</option>
              <option value="Scyther">Scyther</option>
              <option value="Magikarp">Magikarp</option>
              <option value="Mewtwo">Mewtwo</option>
            </select>
          </div>
          <div className="label-select">
            <label htmlFor="pokeBody"><strong>Pokmeon #2: </strong></label>
            <select
              name="scanPokemon"
              value={pokemon2.scanPokemon}
              onChange={handlePokemonChange2}
              required
            >
              <option value=""></option>
              <option value="Chikorita">Chikorita</option>
              <option value="Cyndaquil">Cyndaquil</option>
              <option value="Totodile">Totodile</option>
              <option value="Treecko">Treecko</option>
              <option value="Torchic">Torchic</option>
              <option value="Mudkip">Mudkip</option>
              <option value="Turtwig">Turtwig</option>
              <option value="Chimchar">Chimchar</option>
              <option value="Piplup">Piplup</option>
              <option value="Snivy">Snivy</option>
              <option value="Tepig">Tepig</option>
              <option value="Oshawott">Oshawott</option>
              <option value="Fennekin">Fennekin</option>
              <option value="Froakie">Froakie</option>
              <option value="Rowlet">Rowlet</option>
              <option value="Litten">Litten</option>
              <option value="Popplio">Popplio</option>
              <option value="Grookey">Grookey</option>
              <option value="Scorbunny">Scorbunny</option>
              <option value="Sobble">Sobble</option>
            </select>
          </div>
        </div>
        <div className="bodyShapes">
        <div data-box="1" className={chest1Opened ? "pokemon-recieved" : "stand-by"} >
          {chest1Opened ? (
            <div className="pokemon-scan">
              <h2 className="recieved">You recieved, {pokeBody1.name}</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={pokeBody1.image} alt="Pikachu" width={200} height={200} style={{ filter: "brightness(0%)" }} />
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
              <div>Scan Pokémon</div>
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
              <h2 className="recieved">You recieved, {pokeBody2.name}</h2>
              <button onClick={() => navigate('/maps')} className="pokemon-button">
                <img src={pokeBody2.image} alt="Pikachu" width={200} height={200} style={{ filter: "brightness(0%)" }} />
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
              <div>Scan Pokémon</div>
              <br />
              <div>Press [R]</div>
              <div>or</div>
              <div>Double Tap</div>
            </div>
          )}
          </div>
        </div>
        <div className="reset-scan" >
          <button onClick={() => { setChest1Opened(false); pokemon1.scanPokemon = ''; scanPokemon1.current = '';}} className="pokemon1-clear">
            <span className="pokemon1-text"><strong>Clear</strong></span>
          </button>
          <button onClick={() => { setChest2Opened(false); pokemon2.scanPokemon = ''; scanPokemon2.current = '';}} className="pokemon2-clear">
            <span className="pokemon2-text"><strong>Clear</strong></span>
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