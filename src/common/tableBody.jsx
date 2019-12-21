import React from "react";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    var dateString = date.substring(0, 10);
    var month = dateString.substring(5, 7);
    date = dateString.substring(8);
    dateString = month + "/" + date + "/" + new Date().getFullYear();
    return dateString;
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>
            <img
              src={item.profileImage}
              className="img-fluid mx-auto"
              alt={item.artist}
            />
          </td>
          <td className="td-artist">{item.artist}</td>
          <td>{convertISODateToString(item.birthday)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
