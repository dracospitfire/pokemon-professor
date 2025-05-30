import "./Account.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";

function AccountPage() {
  
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
