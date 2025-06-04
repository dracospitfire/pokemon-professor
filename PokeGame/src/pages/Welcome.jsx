import "./Welcome.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";

import shoesteps from "../assets/Images/icons/Shoe.svg";
import assistant from "../assets/Images/icons/Assistant.svg";

function WelcomePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  const userName = user?.email?.split("@")[0] ?? "Professor";

  const handleNavigation = (e, path) => {
    const isActive = e.currentTarget.classList.contains("active");
    if (isActive) {
      navigate(path);
    }
  };

  const tbd = async () => {
    try {
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

  return (
    <>
      <CSSwrapper className="welcomepage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <div className="assistant">
          <h1>Pokémon Professor</h1>
          <div className="icon">
            <Link to="/" className="icon-assistant" onClick={tbd}>
              <img src={assistant} alt="take notes" className="assistant-icon" />
              <span className="icon-assistant-text">
                <strong>Amy Lupin</strong> - Lab Assistant<br />
                <strong>Notes:</strong> Professor has not been to the lab in a 4 days and has miss the chance to see some rare Pokémon.</span>
            </Link>
          </div>
        </div>
        <section className="welcomeuser">
          <div className="user">
            <button className="useraccount" onClick={() => navigate("/useraccount")}>
              <span className="welcome-header"><strong>Welcome User</strong></span>
              <span className="welcome-name">{user.email.split("@")[0]}</span>
            </button>
          </div>
          <div className="stats">
            <div className="researcher-info">
              <p><strong>Professor Rank:</strong> New Researcher</p>
              <p><strong>Active Since:</strong> March 2025</p>
              <p><strong>Daily Submissions Logged:</strong> 37</p>
              <p><strong>Most Common Type:</strong> Water</p>
            </div>
          </div>
        </section>
        <section className="researcher">
          <div className="researcher-tools">
            <button
              className="tool active"
              onClick={(e) => handleNavigation(e, "/transporter")} >
              <span className="button-header"><strong>Transporter Receiver</strong></span>
            </button>
            <button
              className="tool active"
              onClick={(e) => handleNavigation(e, "/scanner")} >
              <span className="button-header"><strong>Computed Scanner</strong></span>
            </button>
          </div>
          <div className="researcher-tools">
            <button
              className="tool active"
              onClick={(e) => handleNavigation(e, "/analyzer")} >
              <span className="button-header"><strong>Medical Analyzer</strong></span>
            </button>
            <button
              className="tool active"
              onClick={(e) => handleNavigation(e, "/sequencer")} >
              <span className="button-header"><strong>Phylogenetic Sequencer</strong></span>
            </button>
          </div>
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

export default WelcomePage;