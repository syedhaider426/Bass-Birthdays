import React from "react";

const TableBody = ({ data }) => {
  function convertISODateToString(date) {
    return date.substring(0, 10);
  }
  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td></td>
          <td>{item.artist}</td>
          <td>{convertISODateToString(item.birthday)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
