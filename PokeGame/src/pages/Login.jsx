import "./Login.css";
import CSSwrapper from "../components/CSSwrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import NewsUpdates from "../components/Updates/NewsUpdates";
import SocialBar from "../components/Navigation/SocialBar";

function LoginPage() {
  const navigate = useNavigate();
  const [showUpdates, setShowUpdates] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/startgame");
  };

  return (
    <>
      <CSSwrapper className="loginpage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Pokémon Professor</h1>
        <button className="updates" onClick={() => setShowUpdates(true)}>Updates</button>
        <form className="passuser"  onSubmit={handleSubmit} autoComplete="off">
          <div className="userpass">
            <label htmlFor="username" className="username"> Username:</label>
            <input autoComplete="off"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="userpass">
            <label htmlFor="password" className="password">Password:</label>
            <input autoComplete="off"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login" onClick={() => navigate("/startgame")}>Login</button>
        </form>
        <article className={`shadow ${showUpdates ? "visible" : "hidden"}`}>
          <div className={`updates-slide ${showUpdates ? "visible" : "hidden"}`}>
            <NewsUpdates cancelForm={() => setShowUpdates(false)} />
          </div>
        </article>
      </main>
      <SocialBar />
    </>
  );
}

export default LoginPage;