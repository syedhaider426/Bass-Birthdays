import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Powered by{" "}
        <a
          className="spotify-web-api"
          href="https://developer.spotify.com/documentation/web-api/"
        >
          Spotify Web Api
        </a>
      </p>
      <p>© BassBirthdays.com</p>
    </footer>
  );
};

export default Footer;
