import "./Login.css";
import CSSwrapper from "../components/CSSwrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from '../config/supabase';
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import NewsUpdates from "../components/Updates/NewsUpdates";
import SocialBar from "../components/Navigation/SocialBar";

function LoginPage() {
  const navigate = useNavigate();
  const [showUpdates, setShowUpdates] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    userEmail : '', 
    password  : '',
  });

  const handleSubmit = async (e) => {
      e.preventDefault();

      const { userEmail, password } = userData;

      if (!userEmail || !password) {
        console.error("Missing email or password");
        return;
      }

      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: password,
      });
      setLoading(false);

      if (error) {
        alert(`${error.message}, Please check your email to confirm your account.`);
      } else {
        navigate("/welcome", { state: { user: userEmail } });
      }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <label htmlFor="useremail" className="username"> Username:</label>
            <input autoComplete="off"
              name="userEmail"
              id="useremail"
              type="email"
              value={userData.userEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="userpass">
            <label htmlFor="password" className="password">Password:</label>
            <input autoComplete="off"
              name="password"
              id="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="login" type="submit">Login</button>
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