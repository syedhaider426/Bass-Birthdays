import React from "react";
import { Link } from "react-router-dom";

/* Footer contains navigation links to Home/About/Contact.
 * It also contains information about where to get more info on the Spotify
 * Web Api.
 */
const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <p className="mt-2">
        <Link to="/">Home</Link>
        <span className="link-divider"></span>
        <Link to="/about">About</Link>
        <span className="link-divider"></span>
        <Link to="/contact">Contact</Link>
      </p>
      <p className="footer-details">
        <span className="spotify-span">
          Powered by&nbsp;
          <a
            className="spotify-web-api"
            href="https://developer.spotify.com/documentation/web-api/"
          >
            Spotify Web Api &nbsp;|&nbsp;
          </a>
        </span>
        <span>© BassBirthdays.com</span>
      </p>
    </footer>
  );
};

export default Footer;
