import React from "react";
import { Link } from "react-router-dom";

/* Footer contains navigation links to Home/About/Contact.
 * It also contains information about where to get more info on the Spotify
 * Web Api.
 */
const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <p>
        <Link to="/">Home</Link>
        <span className="link-divider"></span>
        <Link to="/about">About</Link>
        <span className="link-divider"></span>
        <Link to="/contact">Contact</Link>
      </p>
      <p className="footer-details">
        Powered by{" "}
        <a
          className="spotify-web-api"
          href="https://developer.spotify.com/documentation/web-api/"
        >
          Spotify Web Api &nbsp;
        </a>
        | © BassBirthdays.com
      </p>
    </footer>
  );
};

export default Footer;
