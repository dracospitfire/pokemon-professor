import "./Welcome.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";

import shoesteps from "../assets/Images/icons/Shoe.svg";

function AnalyzerPage() {
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
        <h1>Pokémon Professor</h1>
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
            <button className="tool active">
              <span className="button-header"><strong>Transporter Receiver</strong></span>
            </button>
            <button className="tool active">
              <span className="button-header"><strong>Computed Scanner</strong></span>
            </button>
          </div>  
          <div className="researcher-tools">
            <button className="tool disabled">
              <span className="button-header"><strong>Medical Analyzer</strong></span>
            </button>
            <button className="tool disabled">
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
              Log In to Save Progress
            </button>
          </>
        )}
      </main>
      <SocialBar />
    </>
  );
}

export default AnalyzerPage;