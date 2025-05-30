import "./SocialBar.css";
import { useState } from "react";


const SocialBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const handleExternalClick = (e, url) => {
    e.preventDefault();
    setTargetUrl(url);
    setShowPopup(true);
  };

  const confirmExit = () => {
    window.open(targetUrl, "_blank");
    setShowPopup(false);
    setTargetUrl("");
  };

  const cancelExit = () => {
    setShowPopup(false);
    setTargetUrl("");
  };

  return (
    <>
      <footer className="foot-nav">
        <nav className="external-nav">
          <a href="https://www.facebook.com/" onClick={(e) => handleExternalClick(e, "https://www.facebook.com/")}>Facebook</a> 
          |
          <a href="https://www.instagram.com/" onClick={(e) => handleExternalClick(e, "https://www.instagram.com/")}>Instagram</a> 
          |
          <a href="https://www.youtube.com/" onClick={(e) => handleExternalClick(e, "https://www.youtube.com/")}>YouTube</a> 
          |
          <a href="https://x.com/" onClick={(e) => handleExternalClick(e, "https://x.com/")}>X</a> 
          |
          <a href="https://www.tiktok.com/" onClick={(e) => handleExternalClick(e, "https://www.tiktok.com/")}>TikTok</a>
        </nav>
      </footer>
      {showPopup && (
        <article className={`shadow ${showPopup ? "visible" : "hidden"}`}>
          <div className="confirmation">
            <p><strong>You are about to navigate to another site.</strong></p>
            <p>Are sure you want to leave this website without signing up?</p>
            <section className="options">
              <button onClick={confirmExit} className="exit">Exit</button>
              <button onClick={cancelExit} className="stay">Stay</button>
            </section>
          </div>
        </article>
      )}
    </>
  );
};

export default SocialBar;
