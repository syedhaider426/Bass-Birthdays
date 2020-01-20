import React from "react";

const TableBody = ({ data, isLoaded, handleClick }) => {
  /* Substrings out the ISO date into a readable string */
  function convertISODateToString(date) {
    var dateString = date.substring(0, 10);
    var month = dateString.substring(5, 7);
    date = dateString.substring(8);
    dateString = month + "/" + date;
    return dateString;
  }

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
        <tr key={item._id} onClick={() => handleClick(item.Artist)}>
          <td>
            <img
              src={item.profileImage}
              className="mx-auto td-image"
              alt={item.Artist}
            />
          </td>

          <td>{item.Artist}</td>
          <td>{convertISODateToString(item.Birthday)}</td>
          <td>{item.Genre[0]}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
