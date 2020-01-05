import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ data, isLoaded }) => {
  function convertISODateToString(date) {
    var dateString = date.substring(0, 10);
    var month = dateString.substring(5, 7);
    date = dateString.substring(8);
    dateString = month + "/" + date;
    return dateString;
  }
  console.log("loading", isLoaded);
  var loadedDiv = <tbody className="loader"></tbody>;
  return !isLoaded ? (
    loadedDiv
  ) : (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>
            <Link to={"/profile/" + item.Artist}>
              <img
                src={item.profileImage}
                className="mx-auto"
                alt={item.Artist}
              />
            </Link>
          </td>

          <td>
            {" "}
            <Link to={"/profile/" + item.Artist}>{item.Artist} </Link>
          </td>
          <td>{convertISODateToString(item.Birthday)}</td>
          <td>{item.Genre[0]}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
