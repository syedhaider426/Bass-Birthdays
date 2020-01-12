import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Footer = () => {
  let history = useHistory();
  var position;
  var path = history.location.pathname;
  if (path === "/about" || path === "/contact" || path === "/not-found")
    position = "absolute";
  else position = "relative";
  var positionName = position + " footer";
  return (
    <Fragment>
      <footer id="footer" className={positionName}>
        <div className="foot">
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
              Spotify Web Api{" "}
            </a>
            | © BassBirthdays.com
          </p>{" "}
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
