import React from "react";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    var dateString = date.substring(0, 10);
    var month = dateString.substring(5, 7);
    date = dateString.substring(8);
    dateString = month + "/" + date;
    return dateString;
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>
            <img
              src={item.profileImage}
              className="mx-auto"
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
