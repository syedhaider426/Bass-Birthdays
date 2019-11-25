import React from "react";
import spotify from "../images/spotify.png";
import bandcamp from "../images/bandcamp.png";
import twitter from "../images/twitter.png";
import instagram from "../images/instagram.png";
import facebook from "../images/facebook.png";
import soundcloud from "../images/soundcloud.png";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    return date.substring(0, 10);
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>
            <span>{item.artist}</span>
          </td>
          <td>{convertISODateToString(item.birthday)}</td>
          <td>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["spotify"]}
            >
              <img src={spotify} alt="Spotify" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["soundcloud"]}
            >
              <img src={soundcloud} alt="SoundCloud" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["facebook"]}
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["twitter"]}
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["instagram"]}
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["bandcamp"]}
            >
              <img src={bandcamp} alt="BandCamp" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
