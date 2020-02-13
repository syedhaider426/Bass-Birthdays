import React from "react";
import convertISODateToString from "../utils/convertISODateToString";

const TableBody = ({ data, isLoaded, handleClick }) => {
  /* When data has not been loaded, show a loading spinner */
  var loadedDiv = (
    <tbody>
      <tr>
        <td></td>
        <td>
          <div className="loader"></div>
        </td>
      </tr>
    </tbody>
  );

  return !isLoaded ? (
    loadedDiv
  ) : (
    <tbody>
      {data.map(item => (
        <tr
          key={item._id}
          onClick={() => handleClick(item.Artist)}
          title={"Click to view " + item.Artist + "'s Profile."}
        >
          <td>
            <img
              src={item.ProfileImage}
              className="mx-auto td-image"
              alt={item.Artist}
            />
          </td>

          <td>{item.Artist}</td>
          <td>{convertISODateToString(item.Birthday)}</td>
          <td>{item.Horoscope}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
