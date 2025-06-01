import "./Welcome.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";

function WelcomePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  const userName = user?.email?.split("@")[0] ?? "Professor";
  return (
    <>
      <CSSwrapper className="welcomepage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Welcome, {userName}!</h1>
        <p>Ready to begin your Pokémon adventure?</p>
        {!user && (
          <button onClick={() => navigate("/login")} className="login-button">
            Log In to Save Progress
          </button>
        )}
      </main>
      <SocialBar />
    </>
  );
}

export default WelcomePage;