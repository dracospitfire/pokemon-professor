import "./Welcome.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import { useLocation } from "react-router-dom";

function WelcomePage() {
  const location = useLocation()
  const userEmail = location.state?.user || "Trainer";
  const userName = userEmail.split("@")[0];

  return (
    <>
      <CSSwrapper className="welcomepage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Welcome, {userName}!</h1>
        <p>Ready to begin your Pokémon adventure?</p>
      </main>
      <SocialBar />
    </>
  );
}

export default WelcomePage;