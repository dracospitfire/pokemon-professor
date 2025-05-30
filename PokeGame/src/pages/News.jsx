import "./News.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";

function NewsPage() {
  
  return (
    <>
      <CSSwrapper className="newspage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>News & Updates</h1>
      </main>
      <SocialBar />
    </>
  );
}

export default NewsPage;
