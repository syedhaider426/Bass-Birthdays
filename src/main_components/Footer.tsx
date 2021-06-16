import React from "react";

import { Link, useHistory } from "react-router-dom";
/* Footer contains navigation links to Home/About/Contact.
 * It also contains information about where to get more info on the Spotify
 * Web Api.
 */
const Footer: React.FC = (): JSX.Element => {
  /* The history hook is used in order to determine whether to show certain footer
   * links.
   *
   * Ex) If the user is on the home page, do not show the 'Home' page link.
   */
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <footer id="footer" className="footer">
      <p className="mt-2">
        {pathname !== "/" && <Link to="/">Home</Link>}
        <span className="link-divider"></span>
        {pathname !== "/about" && <Link to="/about">About</Link>}
        <span className="link-divider"></span>
        {pathname !== "/contact" && <Link to="/contact">Contact</Link>}
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
