import "./Account.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/authprovider";

function AccountPage() {
  const { user, loading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!loading && !user) {
        navigate("/login");
      }
    }, [user, loading, navigate]);
  
  return (
    <>
      <CSSwrapper className="accountpage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>User Profile</h1>
      </main>
      <SocialBar />
    </>
  );
}

export default AccountPage;
