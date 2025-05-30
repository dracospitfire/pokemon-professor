import "./Blog.css";
import CSSwrapper from "../components/CSSwrapper";
import PokeballThrow from "../animations/PokeballThrow";
import NavBar from "../components/Navigation/NavBar";
import SocialBar from "../components/Navigation/SocialBar";

function BlogPage() {
  
  return (
    <>
      <CSSwrapper className="blogpage" />
      <PokeballThrow />
      <NavBar />
      <main>
        <h1>Social Blog</h1>
      </main>
      <SocialBar />
    </>
  );
}

export default BlogPage;
