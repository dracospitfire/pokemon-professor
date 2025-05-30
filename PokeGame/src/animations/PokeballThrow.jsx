import "./PokeballThrow.css";
import { useState, useEffect } from "react";
import { motion, time } from "framer-motion";
import { createPortal } from "react-dom";

// Import Poké Ball images
import pokeBall from "../assets/Images/pokeballs/Pokeball.png";
import greatBall from "../assets/Images/pokeballs/Greatball.png";
import ultraBall from "../assets/Images/pokeballs/Ultraball.png";
import masterBall from "../assets/Images/pokeballs/Masterball.png";
import safariBall from "../assets/Images/pokeballs/Safariball.png";
import levelBall from "../assets/Images/pokeballs/Levelball.png";
import moonBall from "../assets/Images/pokeballs/Moonball.png";
import friendBall from "../assets/Images/pokeballs/Friendball.png";
import loveBall from "../assets/Images/pokeballs/Loveball.png";
import heavyBall from "../assets/Images/pokeballs/Heavyball.png";
import fastBall from "../assets/Images/pokeballs/Fastball.png";
import sportBall from "../assets/Images/pokeballs/Sportball.png";
import premierBall from "../assets/Images/pokeballs/Premierball.png";
import repeatBall from "../assets/Images/pokeballs/Repeatball.png";
import timerBall from "../assets/Images/pokeballs/Timerball.png";
import nestBall from "../assets/Images/pokeballs/Nestball.png";
import netBall from "../assets/Images/pokeballs/Netball.png";
import diveBall from "../assets/Images/pokeballs/Diveball.png";
import luxuryBall from "../assets/Images/pokeballs/Luxuryball.png";
import healBall from "../assets/Images/pokeballs/Healball.png";
import quickBall from "../assets/Images/pokeballs/Quickball.png";
import duskBall from "../assets/Images/pokeballs/Duskball.png";
import cherishBall from "../assets/Images/pokeballs/Cherishball.png";
import parkBall from "../assets/Images/pokeballs/Parkball.png";
import dreamBall from "../assets/Images/pokeballs/Dreamball.png";
import beastBall from "../assets/Images/pokeballs/Beastball.png";
import gsBall from "../assets/Images/pokeballs/GSball.png";
import lureBall from "../assets/Images/pokeballs/Lureball.png";
import strangeBall from "../assets/Images/pokeballs/Strangeball.png";


const POKEBALLS = [ pokeBall, greatBall, ultraBall, masterBall, 
                    safariBall, levelBall, moonBall, friendBall, 
                    loveBall, heavyBall, fastBall, sportBall, 
                    premierBall, repeatBall, timerBall, nestBall, 
                    netBall, diveBall, luxuryBall, healBall, 
                    quickBall, duskBall, cherishBall, parkBall, 
                    dreamBall, beastBall, gsBall, lureBall, strangeBall ];

const PokeballThrow = () => {
  const [pokeballs, setPokeballs] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === "A") {
        const newPokeball = {
          id: time.now(),
            // Adjust to center Pokeball  
          x: event.clientX - 20,
          y: event.clientY - 20,              
          image: POKEBALLS[Math.floor(Math.random() * POKEBALLS.length)],
        };

        setPokeballs((prev) => [newPokeball, ...prev]);

        // Clear Pokeball after animation completes
        setTimeout(() => {
          setPokeballs((prev) => prev.filter((p) => p.id !== newPokeball.id));
        }, 2000);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return createPortal(
    <div className="pokeball-container">
      {pokeballs.map((pokeball) => (
        <motion.div key={pokeball.id} className="animated-pokeball"
        initial={{ x: pokeball.x, y: pokeball.y, opacity: 1, rotate: 0 }}
        animate={{ y: window.outerHeight, opacity: 0, rotate: 0 }}
        transition={{ duration: 2, ease: "easeIn" }} >
        <motion.img src={pokeball.image} alt="PokeBall" className="pokeball-image"
          initial={{ rotate: 0 }}
          animate={{ rotate: -720 }}
          transition={{ duration: 2, ease: "easeIn" }} />
      </motion.div>
      ))}
    </div>,
    document.body
  );
};

export default PokeballThrow;