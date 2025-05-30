import "./Maps.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";

function MapsPage() {
  
  return (
    <>
      <CSSwrapper className="mapspage" />
      <PokeballThrow />
      <NavBar />
      <main className="map">
      </main>
    </>
  );
}

export default MapsPage;
