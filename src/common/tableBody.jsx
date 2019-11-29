import React from "react";
// import spotify from "../images/spotify.png";
// import bandcamp from "../images/bandcamp.png";
// import twitter from "../images/twitter.png";
// import instagram from "../images/instagram.png";
// import facebook from "../images/facebook.png";
// import soundcloud from "../images/soundcloud.png";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    const dateString = date.substring(0, 10);
    //var month = dateString.substring(5, 7);
    //var day = dateString.substring(8, 11);
    /*var year = dateString.substring(0, 4);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];*/
    //month = months[month - 1];
    return dateString;
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>
            <span>{item.artist}</span>
          </td>
          <td>{convertISODateToString(item.birthday)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

/* <td>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["spotify"]}
              className="artist-social"
            >
              <img src={spotify} alt="Spotify" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["soundcloud"]}
              className="artist-social"
            >
              <img src={soundcloud} alt="SoundCloud" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["facebook"]}
              className="artist-social"
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["twitter"]}
              className="artist-social"
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["instagram"]}
              className="artist-social"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.socials["bandcamp"]}
              className="artist-social"
            >
              <img src={bandcamp} alt="BandCamp" />
            </a>
          </td>*/
