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
          <td>{item.artist}</td>
          <td>{convertISODateToString(item.birthday)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
