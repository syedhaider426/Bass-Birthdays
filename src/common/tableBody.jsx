import React from "react";
// import spotify from "../images/spotify.png";
// import bandcamp from "../images/bandcamp.png";
// import twitter from "../images/twitter.png";
// import instagram from "../images/instagram.png";
// import facebook from "../images/facebook.png";
// import soundcloud from "../images/soundcloud.png";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    var dateString = date.substring(0, 10);
    var month = dateString.substring(5, 7);
    var date = dateString.substring(8);
    var dateString = month + "/" + date + "/" + new Date().getFullYear();
    return dateString;
  }

  function convertArrayToString(array) {
    return array.join(", ");
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td className="td-profileImage">
            <img src={item.profileImage} />
          </td>
          <td>{item.artist}</td>
          <td>{convertISODateToString(item.birthday)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
