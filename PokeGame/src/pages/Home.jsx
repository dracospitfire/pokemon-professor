import "./Home.css";
import CSSwrapper from "../components/CSSwrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import FormSignUp from "../components/Signup/SignupForm";
import SocialBar from "../components/Navigation/SocialBar";

function HomePage() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <>
      <CSSwrapper className="homepage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Pokémon Professor</h1>
        <section className="welcome">
        <h2 className="welcome">Welcome to the Pokémon Professor Simulator</h2>
        <p>
          You’re stepping into the lab as a Pokémon Professor. Your mission? To study Pokémon in the lab, document traits, log trainer submissions, and build the most detailed Pokédex the world has ever seen. Each day, you’ll receive one unique Pokémon, provided by trainers out in the field who are impacted by factors like location, time of day, and weather conditions. Each Pokémon is your research subject and will give you an opportunity to analyze, record, and share findings with the global professor network.
        </p>
        </section>
        <section className="options">
          <button className="signup" id="open-signup" onClick={() => setShowSignup(true)}>Signup</button>
          <button className="login-nav" onClick={() => navigate("/login")}>Login</button>
        </section>
        <article className={`shadow ${showSignup ? "visible" : "hidden"}`}>
          <div className={`signup-slide ${showSignup ? "visible" : "hidden"}`}>
            <FormSignUp cancelForm={() => setShowSignup(false)} />
          </div>
        </article>
        <section className="faq">
          <article className="faq-header">
            <h2 className="faq">FAQ</h2>
            <button onClick={() => setShowFAQ(prev => !prev)}>
              {showFAQ ? "⬇" : "⬆"}
            </button>
          </article>
          <article className="faq-QA">
            {showFAQ && (
              <div className="faq-items">
                <strong>Q. What is the Pokémon Professor Game?</strong>
                <p><strong> A. </strong> It's a strategy and research-based game where you play as a Pokémon Professor discovering, cataloging, and studying Pokémon in various regions.</p>
                <strong>Q. What kind of research can I conduct?</strong>
                <p><strong> A. </strong> You can study Pokémon habitats, evolutions, genetic traits, and even cross-regional variants.</p>
                <strong>Q. Is there a leveling system?</strong>
                <p><strong> A. </strong> Yes, your professor rank increases as you publish to the Pokédex, complete Pokémon research, and catalog each Pokémon received.</p>
              </div>
            )}
          </article>
        </section>
      </main>
      <SocialBar />
      <aside className="social">
        &copy; 2025 Austin Flores
        <strong>GitHub: </strong>
        <a href="https://github.com/dracospitfire/">
          <span className="github">
            dracospitfire 
          </span>
        </a>
      </aside>
    </>
  );
}

export default HomePage;
